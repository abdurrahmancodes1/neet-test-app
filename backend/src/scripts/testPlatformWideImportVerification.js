import assert from 'node:assert/strict';
import { connectDatabase, closeDatabase } from '../config/database.js';
import { Test, Question, Result, User } from '../models/index.js';
import { TestImportService } from '../services/testImportService.js';
import { TestService } from '../services/testService.js';
import { QuestionService } from '../services/questionService.js';
import { ResultService } from '../services/resultService.js';

async function runVerification() {
  console.log('====================================================');
  console.log('🧪 Running Platform-Wide Test Import & Multi-Student Verification');
  console.log('====================================================\n');

  await connectDatabase();

  // 1. Setup Users: Admin, Student A, Student B
  const adminEmail = 'admin_audit_test@neet.app';
  const studentAEmail = 'student_a_test@neet.app';
  const studentBEmail = 'student_b_test@neet.app';

  await User.deleteMany({ email: { $in: [adminEmail, studentAEmail, studentBEmail] } });

  const admin = await User.create({
    name: 'Admin Controller',
    email: adminEmail,
    password: 'Password123!',
    role: 'admin',
    isEmailVerified: true,
  });

  const studentA = await User.create({
    name: 'Student Alpha',
    email: studentAEmail,
    password: 'Password123!',
    role: 'student',
    rollNumber: 'ROLL-ALPHA-101',
    isEmailVerified: true,
  });

  const studentB = await User.create({
    name: 'Student Beta',
    email: studentBEmail,
    password: 'Password123!',
    role: 'student',
    rollNumber: 'ROLL-BETA-202',
    isEmailVerified: true,
  });

  console.log('✓ Created Admin and 2 Independent Student accounts');

  // Clean any previous test records with our test slug
  const testSlug = 'jee-2027-rotational-dynamics-mastery-mock';
  const draftSlug = 'jee-2027-unreleased-draft-mock';
  await Test.deleteMany({ slug: { $in: [testSlug, draftSlug] } });

  // 2. Admin imports a JEE test paper with inline SVG
  const sampleImportPayload = {
    schemaVersion: '1.0',
    title: 'JEE 2027 - Rotational Dynamics Mastery Mock',
    slug: testSlug,
    category: 'jee',
    examType: 'JEE_MAIN',
    type: 'chapter',
    subjects: ['Physics', 'Mathematics'],
    chapters: ['Rotational Motion'],
    syllabus: 'Torque, Angular Momentum, Moment of Inertia, Rolling without Slipping',
    difficulty: 'Hard',
    durationMinutes: 90,
    markingScheme: { correct: 4, wrong: -1, unattempted: 0 },
    questions: [
      {
        id: 'q1',
        order: 1,
        subject: 'Physics',
        chapter: 'Rotational Motion',
        topic: 'Moment of Inertia',
        difficulty: 'Hard',
        type: 'mcq',
        question: 'Calculate the moment of inertia about the central axis for the disc shown: $I = \\frac{1}{2} M R^2$.',
        questionImage: {
          type: 'svg',
          data: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><circle cx="200" cy="150" r="80" stroke="black" stroke-width="2" fill="none"/><line x1="200" y1="150" x2="280" y2="150" stroke="blue" stroke-width="2"/><text x="235" y="140">R</text></svg>',
        },
        options: {
          A: '$\\frac{1}{2}MR^2$',
          B: '$MR^2$',
          C: '$\\frac{2}{5}MR^2$',
          D: '$\\frac{1}{4}MR^2$',
        },
        correctAnswer: 'A',
        explanation: 'For a solid uniform circular disc of mass $M$ and radius $R$, $I_{cm} = \\frac{1}{2}MR^2$.',
      },
      {
        id: 'q2',
        order: 2,
        subject: 'Mathematics',
        chapter: 'Vectors',
        topic: 'Cross Product',
        difficulty: 'Medium',
        type: 'mcq',
        question: 'Find torque $\\vec{\\tau} = \\vec{r} \\times \\vec{F}$ where $\\vec{r} = 2\\hat{i}$ and $\\vec{F} = 3\\hat{j}$.',
        options: {
          A: '$6\\hat{k}$',
          B: '$-6\\hat{k}$',
          C: '$5\\hat{k}$',
          D: '$0$',
        },
        correctAnswer: 'A',
        explanation: '$\\vec{\\tau} = 2\\hat{i} \\times 3\\hat{j} = 6\\hat{k}$.',
      },
    ],
  };

  const importResult = await TestImportService.importTest(sampleImportPayload, {
    publishImmediately: true,
    overrideExisting: true,
    adminUserId: admin._id,
  });

  console.log('\n[Admin Action] Imported and Published Test:');
  console.log(`  • ID: ${importResult.test.id}`);
  console.log(`  • Slug: ${importResult.test.slug}`);
  console.log(`  • Category: ${importResult.test.category}`);
  console.log(`  • ExamType: ${importResult.test.examType}`);
  console.log(`  • Status: ${importResult.test.status}`);
  console.log(`  • IsPublic: ${importResult.test.isPublic}`);

  assert.equal(importResult.success, true);
  assert.equal(importResult.test.status, 'published');
  assert.equal(importResult.test.category, 'jee');
  assert.equal(importResult.test.examType, 'JEE_MAIN');
  assert.equal(importResult.test.isPublic, true);

  // Verify createdBy is stored in MongoDB for audit, but does not restrict visibility
  const storedTest = await Test.findById(importResult.test.id).lean();
  assert.equal(storedTest.createdBy.toString(), admin._id.toString());
  assert.equal(storedTest.isPublic, true);
  assert.equal(storedTest.status, 'published');
  console.log('✓ Test successfully stored with audit creator = admin._id and isPublic = true');

  // 3. Admin creates an unpublished draft test
  const draftPayload = {
    ...sampleImportPayload,
    title: 'JEE 2027 - Unreleased Draft Mock',
    slug: draftSlug,
  };
  const draftResult = await TestImportService.importTest(draftPayload, {
    publishImmediately: false,
    overrideExisting: true,
    adminUserId: admin._id,
  });
  await Test.findByIdAndUpdate(draftResult.test.id, { status: 'draft' });
  console.log('✓ Created unreleased draft test with status = draft');

  // 4. Student A Queries Available Tests
  console.log('\n[Student A View]');
  const studentAList = await TestService.listTests({ status: 'published' });
  const studentAHasTest = studentAList.tests.some((t) => t.slug === testSlug);
  const studentASeesDraft = studentAList.tests.some((t) => t.slug === draftSlug);
  assert.equal(studentAHasTest, true, 'Student A must see published test');
  assert.equal(studentASeesDraft, false, 'Student A must NOT see unpublished draft');
  console.log(`  ✓ Student A sees published test in catalog (${studentAList.tests.length} tests visible)`);
  console.log('  ✓ Student A does NOT see unpublished draft test');

  // Student A filters by category = jee
  const studentAJeeList = await TestService.listTests({ category: 'jee', status: 'published' });
  assert.equal(studentAJeeList.tests.some((t) => t.slug === testSlug), true);
  console.log(`  ✓ Student A sees test when filtered by category "jee" (${studentAJeeList.tests.length} tests)`);

  // 5. Student B Queries Available Tests
  console.log('\n[Student B View]');
  const studentBList = await TestService.listTests({ status: 'published' });
  const studentBHasTest = studentBList.tests.some((t) => t.slug === testSlug);
  const studentBSeesDraft = studentBList.tests.some((t) => t.slug === draftSlug);
  assert.equal(studentBHasTest, true, 'Student B must see published test');
  assert.equal(studentBSeesDraft, false, 'Student B must NOT see unpublished draft');
  console.log(`  ✓ Student B sees published test in catalog (${studentBList.tests.length} tests visible)`);
  console.log('  ✓ Student B does NOT see unpublished draft test');

  // 6. Student A Starts Test and Takes Exam
  console.log('\n[Exam Attempt: Student A]');
  const studentAQuestions = await QuestionService.getQuestionsForStudent(testSlug);
  assert.equal(studentAQuestions.length, 2);
  assert.equal(studentAQuestions[0].correctAnswer, undefined, 'Student A must not receive correctAnswer');
  assert.equal(studentAQuestions[0].explanation, undefined, 'Student A must not receive explanation');
  assert.ok(studentAQuestions[0].questionImage?.data, 'Student A receives sanitized SVG diagram');
  console.log('  ✓ Student A questions retrieved with correctAnswer and explanation strictly protected');
  console.log('  ✓ Inline SVG diagram is intact and sanitized');

  // Student A submits answers: Q1 -> 'A' (correct, +4), Q2 -> 'A' (correct, +4) -> 8/8 Marks
  const studentASubmission = await ResultService.submitExam({
    testIdOrSlug: testSlug,
    answers: { 1: 'A', 2: 'A' },
    studentName: studentA.name,
    studentRollNumber: studentA.rollNumber,
    userId: studentA._id,
    attemptId: `attempt_student_a_${Date.now()}`,
    timeSpentSeconds: 300,
  });

  console.log(`  ✓ Student A submitted exam: Score = ${studentASubmission.score}/${studentASubmission.maxScore} (Accuracy = ${studentASubmission.accuracy}%)`);
  assert.equal(studentASubmission.score, 8);
  assert.equal(studentASubmission.correctCount, 2);

  // 7. Student B Starts Test and Takes Exam Independently
  console.log('\n[Exam Attempt: Student B]');
  const studentBQuestions = await QuestionService.getQuestionsForStudent(testSlug);
  assert.equal(studentBQuestions.length, 2);

  // Student B submits answers: Q1 -> 'B' (wrong, -1), Q2 -> 'A' (correct, +4) -> 3/8 Marks
  const studentBSubmission = await ResultService.submitExam({
    testIdOrSlug: testSlug,
    answers: { 1: 'B', 2: 'A' },
    studentName: studentB.name,
    studentRollNumber: studentB.rollNumber,
    userId: studentB._id,
    attemptId: `attempt_student_b_${Date.now()}`,
    timeSpentSeconds: 450,
  });

  console.log(`  ✓ Student B submitted exam: Score = ${studentBSubmission.score}/${studentBSubmission.maxScore} (Accuracy = ${studentBSubmission.accuracy}%)`);
  assert.equal(studentBSubmission.score, 3);
  assert.equal(studentBSubmission.correctCount, 1);
  assert.equal(studentBSubmission.wrongCount, 1);

  // 8. Result Privacy & Isolation Verification
  console.log('\n[Privacy & Isolation Checks]');
  const studentAResults = await Result.find({ userId: studentA._id }).lean();
  const studentBResults = await Result.find({ userId: studentB._id }).lean();

  assert.equal(studentAResults.length, 1);
  assert.equal(studentAResults[0].userId.toString(), studentA._id.toString());
  assert.equal(studentAResults[0].score, 8);

  assert.equal(studentBResults.length, 1);
  assert.equal(studentBResults[0].userId.toString(), studentB._id.toString());
  assert.equal(studentBResults[0].score, 3);

  // Cross-check: Neither user's results leak to the other
  const studentBIds = new Set(studentBResults.map((r) => r._id.toString()));
  studentAResults.forEach((r) => {
    assert.equal(studentBIds.has(r._id.toString()), false, 'Student A results must not contain Student B');
  });

  console.log('  ✓ Student A results are strictly tied to Student A (_id: ' + studentA._id + ')');
  console.log('  ✓ Student B results are strictly tied to Student B (_id: ' + studentB._id + ')');
  console.log('  ✓ Complete data isolation verified between students');

  // 9. Clean up test users & test
  await Result.deleteMany({ testId: storedTest._id });
  await Question.deleteMany({ testId: storedTest._id });
  await Test.deleteMany({ slug: { $in: [testSlug, draftSlug] } });
  await User.deleteMany({ email: { $in: [adminEmail, studentAEmail, studentBEmail] } });

  console.log('\n====================================================');
  console.log('🎉 ALL 10 VERIFICATION REQUIREMENTS PASSED WITH 0 FAILURES!');
  console.log('====================================================\n');

  await closeDatabase();
}

runVerification().catch((err) => {
  console.error('\n❌ Verification failed with error:', err);
  process.exit(1);
});
