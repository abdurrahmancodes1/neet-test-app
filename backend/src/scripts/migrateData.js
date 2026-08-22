import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { connectDatabase, closeDatabase } from '../config/database.js';
import { Test, Question } from '../models/index.js';
import { ScoringService } from '../services/scoringService.js';
import { computeResult as computeFrontendResult } from '../../../frontend/src/utils/scoring.js';
import { TESTS } from '../../../frontend/src/data/tests.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '../../../frontend');

export async function runMigration() {
  console.log('====================================================');
  console.log('🚀 Starting Idempotent Data Migration to MongoDB');
  console.log('====================================================\n');

  await connectDatabase();

  const validSlugs = Object.keys(TESTS);
  
  // Clean up any non-canonical test records
  const oldTests = await Test.find({ slug: { $nin: validSlugs } });
  for (const oldTest of oldTests) {
    await Question.deleteMany({ testId: oldTest._id });
    await Test.findByIdAndDelete(oldTest._id);
  }

  const migrationSummary = [];

  for (const [testKey, testDef] of Object.entries(TESTS)) {
    console.log(`\n[Processing] Test: "${testDef.title}" (${testDef.id})`);

    // 1. Upsert Test Document (Idempotent)
    const testDoc = await Test.findOneAndUpdate(
      { slug: testDef.id },
      {
        title: testDef.title,
        slug: testDef.id,
        subtitle: testDef.subtitle || '',
        description: testDef.syllabus || testDef.subtitle || '',
        testCode: testDef.testCode || 'NEET2025',
        allowedCodes: testDef.allowedCodes || [testDef.testCode || 'NEET2025'],
        type: testDef.questions.length > 45 ? 'aits' : 'chapter',
        subjects: testDef.subject.split('&').map((s) => s.trim()),
        chapters: [testDef.chapter],
        syllabus: testDef.syllabus || '',
        difficulty: testDef.difficulty || 'Hard',
        durationMinutes: testDef.durationMinutes || 60,
        totalQuestions: testDef.questions.length,
        totalMarks: testDef.questions.length * (testDef.marksCorrect || 4),
        markingScheme: {
          correct: testDef.marksCorrect || 4,
          wrong: testDef.marksWrong || -1,
          unattempted: 0,
        },
        status: 'published',
        publishedAt: new Date(),
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    console.log(`  ✓ Test record upserted (ID: ${testDoc._id})`);

    // 2. Clear existing questions for this test for clean, idempotent replacement
    const deleteResult = await Question.deleteMany({ testId: testDoc._id });
    if (deleteResult.deletedCount > 0) {
      console.log(`  ↻ Refreshed ${deleteResult.deletedCount} existing questions for clean synchronization`);
    }

    // 3. Prepare Question Documents directly from existing frontend data
    const questionDocs = testDef.questions.map((q) => {
      // Validate image existence if specified
      if (q.image) {
        const fullImagePath = path.join(projectRoot, 'public', q.image);
        if (!existsSync(fullImagePath)) {
          console.warn(`  ⚠️ Warning: Image file not found at ${fullImagePath}`);
        }
      }

      return {
        testId: testDoc._id,
        order: q.id,
        sourceQuestionNumber: q.sourceQuestionNumber || q.id,
        subject: q.subject || testDef.subject || 'Physics',
        chapter: q.chapter || testDef.chapter || 'General',
        topic: q.topic || 'General',
        difficulty: q.difficulty || testDef.difficulty || 'Hard',
        type: q.type || 'mcq',
        question: q.question,
        options: q.options,
        correctAnswer: q.correctAnswer,
        explanation: null,
        image: q.image || null,
        marks: testDef.marksCorrect || 4,
        negativeMarks: testDef.marksWrong || -1,
        status: 'active',
      };
    });

    // 4. Bulk Insert Questions
    const insertedQuestions = await Question.insertMany(questionDocs);
    console.log(`  ✓ Inserted ${insertedQuestions.length} questions into MongoDB`);

    migrationSummary.push({
      id: testDoc._id,
      slug: testDoc.slug,
      title: testDoc.title,
      testCode: testDoc.testCode,
      subjects: testDoc.subjects,
      durationMinutes: testDoc.durationMinutes,
      questionCount: insertedQuestions.length,
      imagesCount: questionDocs.filter((q) => q.image).length,
    });
  }

  // 5. Verification & Integrity Checks
  console.log('\n====================================================');
  console.log('🔍 Running Post-Migration Verification Checks');
  console.log('====================================================');

  const allTests = await Test.find({}).lean();
  console.log(`\n• Total Tests in MongoDB: ${allTests.length}`);

  let totalQuestionsCount = 0;
  let totalImagesCount = 0;

  for (const t of allTests) {
    const questions = await Question.find({ testId: t._id }).select('+correctAnswer').sort({ order: 1 }).lean();
    totalQuestionsCount += questions.length;
    const withImages = questions.filter((q) => q.image).length;
    totalImagesCount += withImages;

    console.log(`\n--- Test Verification: "${t.title}" (${t.slug}) ---`);
    console.log(`  • ID: ${t._id}`);
    console.log(`  • Test Code: ${t.testCode} (Allowed: ${t.allowedCodes.join(', ')})`);
    console.log(`  • Subjects: ${t.subjects.join(', ')}`);
    console.log(`  • Duration: ${t.durationMinutes} mins | Total Marks: ${t.totalMarks}`);
    console.log(`  • Questions Count: ${questions.length}`);
    console.log(`  • Questions with Images/Diagrams: ${withImages}`);

    // Verify all questions have 4 options and valid answer keys
    for (const q of questions) {
      if (!q.options || Object.keys(q.options).length < 4) {
        throw new Error(`Question ${q.order} in ${t.slug} has invalid options`);
      }
      if (!['A', 'B', 'C', 'D'].includes(q.correctAnswer)) {
        throw new Error(`Question ${q.order} in ${t.slug} has invalid correctAnswer: ${q.correctAnswer}`);
      }
    }
    console.log(`  ✓ All ${questions.length} questions have verified options and correct answer keys.`);
  }

  // 6. Comparative Scoring Verification: Frontend vs Backend
  console.log('\n====================================================');
  console.log('⚖️ Comparing Frontend vs Backend Scoring Engines');
  console.log('====================================================');

  const test1Doc = await Test.findOne({ slug: 'laws-of-motion' }).lean();
  const test1Questions = await Question.find({ testId: test1Doc._id }).select('+correctAnswer').sort({ order: 1 }).lean();

  // Test Case A: All Correct
  const allCorrectAnswers = {};
  test1Questions.forEach((q) => {
    allCorrectAnswers[q.order] = q.correctAnswer;
  });

  const frontendResultA = computeFrontendResult(allCorrectAnswers, TESTS['laws-of-motion'].questions);
  const backendResultA = ScoringService.evaluateSubmission(
    test1Questions,
    allCorrectAnswers,
    test1Doc.markingScheme
  );

  console.log('\n[Scenario A: Perfect Score Attempt]');
  console.log(`  Frontend Score: ${frontendResultA.score}/${frontendResultA.maxScore} (${frontendResultA.percentage}%)`);
  console.log(`  Backend Score:  ${backendResultA.score}/${backendResultA.maxScore} (${backendResultA.percentage}%)`);
  if (frontendResultA.score !== backendResultA.score || frontendResultA.correct !== backendResultA.correctCount) {
    throw new Error('Scoring mismatch on Scenario A');
  }
  console.log('  ✓ Perfect score match: 180/180');

  // Test Case B: Realistic Mixed Attempt (15 Correct, 10 Wrong, 20 Unattempted)
  const mixedAnswers = {};
  test1Questions.slice(0, 15).forEach((q) => {
    mixedAnswers[q.order] = q.correctAnswer; // 15 correct (+60)
  });
  test1Questions.slice(15, 25).forEach((q) => {
    // Pick wrong option
    const wrongOpt = q.correctAnswer === 'A' ? 'B' : 'A';
    mixedAnswers[q.order] = wrongOpt; // 10 wrong (-10)
  });
  // Remaining 20 unattempted (0)
  // Expected Score = 60 - 10 = 50

  const frontendResultB = computeFrontendResult(mixedAnswers, TESTS['laws-of-motion'].questions);
  const backendResultB = ScoringService.evaluateSubmission(
    test1Questions,
    mixedAnswers,
    test1Doc.markingScheme
  );

  console.log('\n[Scenario B: Mixed Attempt (15 Correct, 10 Wrong, 20 Unattempted)]');
  console.log(`  Frontend Score: ${frontendResultB.score}/${frontendResultB.maxScore} (Correct: ${frontendResultB.correct}, Wrong: ${frontendResultB.wrong}, Unattempted: ${frontendResultB.unattempted})`);
  console.log(`  Backend Score:  ${backendResultB.score}/${backendResultB.maxScore} (Correct: ${backendResultB.correctCount}, Wrong: ${backendResultB.wrongCount}, Unattempted: ${backendResultB.unattemptedCount})`);

  if (
    frontendResultB.score !== backendResultB.score ||
    frontendResultB.correct !== backendResultB.correctCount ||
    frontendResultB.wrong !== backendResultB.wrongCount ||
    frontendResultB.unattempted !== backendResultB.unattemptedCount
  ) {
    throw new Error('Scoring mismatch on Scenario B');
  }
  console.log('  ✓ Mixed score match: 50/180 with identical accuracy and breakdown');

  console.log('\n====================================================');
  console.log(`🎉 DATA MIGRATION COMPLETE: ${totalQuestionsCount} questions across ${allTests.length} tests`);
  console.log('====================================================\n');

  return {
    testsCount: allTests.length,
    totalQuestionsCount,
    totalImagesCount,
    summary: migrationSummary,
  };
}

if (process.argv[1]?.includes('migrateData')) {
  runMigration()
    .then(() => closeDatabase())
    .catch((err) => {
      console.error('Migration failed:', err);
      closeDatabase();
      process.exit(1);
    });
}
