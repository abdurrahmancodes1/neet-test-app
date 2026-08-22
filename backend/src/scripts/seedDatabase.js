import { connectDatabase, closeDatabase } from '../config/database.js';
import { Test, Question, Result, User } from '../models/index.js';
import { questions as test1Questions, TEST_DURATION_MINUTES as test1Duration } from '../../../src/data/questions.js';
import { test2Questions, TEST2_DURATION_MINUTES as test2Duration } from '../../../src/data/test2Questions.js';

export async function seedDatabase() {
  await connectDatabase();
  console.log('Seeding database with initial NEET tests...');

  // Clean existing collections if needed
  await Promise.all([
    Test.deleteMany({}),
    Question.deleteMany({}),
    Result.deleteMany({}),
  ]);

  // Seed Test 1: Laws of Motion
  const test1 = await Test.create({
    title: 'Laws of Motion',
    slug: 'laws-of-motion',
    subtitle: 'A focused chapter practice sheet.',
    description: 'Newton\'s Laws of Motion, Friction, Circular Motion, Momentum & Impulse',
    testCode: 'NEET-LOM',
    allowedCodes: ['NEET-LOM', 'NEETLOM', 'LOM101', 'NEET2025'],
    type: 'chapter',
    subjects: ['Physics'],
    chapters: ['Laws of Motion'],
    syllabus: 'Newton\'s Laws of Motion, Friction, Circular Motion, Momentum & Impulse',
    difficulty: 'Hard',
    durationMinutes: test1Duration || 60,
    totalQuestions: test1Questions.length,
    totalMarks: test1Questions.length * 4,
    markingScheme: { correct: 4, wrong: -1, unattempted: 0 },
    status: 'published',
    publishedAt: new Date(),
  });

  const test1Docs = test1Questions.map((q) => ({
    testId: test1._id,
    order: q.id,
    sourceQuestionNumber: q.sourceQuestionNumber,
    subject: q.subject || 'Physics',
    chapter: q.chapter || 'Laws of Motion',
    topic: q.topic,
    difficulty: q.difficulty || 'Hard',
    type: q.type || 'mcq',
    question: q.question,
    options: q.options,
    correctAnswer: q.correctAnswer,
    image: q.image || null,
    marks: 4,
    negativeMarks: -1,
  }));
  await Question.insertMany(test1Docs);
  console.log(`✓ Seeded Test 1: "${test1.title}" (${test1Docs.length} questions)`);

  // Seed Test 2: All India Test Series [01]
  const test2 = await Test.create({
    title: 'All India Test Series [01]',
    slug: 'aits-01-physics-chemistry',
    subtitle: 'Units, Math Tools, Kinematics & Basic Concepts of Chemistry',
    description: 'Dropper NEET Test Series covering Physics and Chemistry fundamentals.',
    testCode: 'AITS-01',
    allowedCodes: ['AITS-01', 'AITS01', 'NEET01', 'NEET-01', 'NEET2025'],
    type: 'aits',
    subjects: ['Physics', 'Chemistry'],
    chapters: ['Units and Measurements', 'Mathematical Tools', 'Motion in a Straight Line', 'Motion in a Plane', 'Some Basic Concepts of Chemistry'],
    syllabus: 'Physics: Units and Measurements, Mathematical Tools, Motion in a Straight Line, Motion in a Plane | Chemistry: Some Basic Concepts of Chemistry',
    difficulty: 'Dropper (NEET)',
    durationMinutes: test2Duration || 67,
    totalQuestions: test2Questions.length,
    totalMarks: test2Questions.length * 4,
    markingScheme: { correct: 4, wrong: -1, unattempted: 0 },
    status: 'published',
    publishedAt: new Date(),
  });

  const test2Docs = test2Questions.map((q) => ({
    testId: test2._id,
    order: q.id,
    sourceQuestionNumber: q.sourceQuestionNumber,
    subject: q.subject,
    chapter: q.chapter,
    topic: q.topic,
    difficulty: q.difficulty || 'Hard',
    type: q.type || 'mcq',
    question: q.question,
    options: q.options,
    correctAnswer: q.correctAnswer,
    image: q.image || null,
    marks: 4,
    negativeMarks: -1,
  }));
  await Question.insertMany(test2Docs);
  console.log(`✓ Seeded Test 2: "${test2.title}" (${test2Docs.length} questions)`);

  console.log('\n✓ Database successfully seeded!');
}

if (process.argv[1]?.includes('seedDatabase')) {
  seedDatabase()
    .then(() => closeDatabase())
    .catch((err) => {
      console.error('Seeding failed:', err);
      process.exit(1);
    });
}
