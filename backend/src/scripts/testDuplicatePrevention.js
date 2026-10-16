import mongoose from 'mongoose';
import { Result, User, Test, Question } from '../models/index.js';
import { ResultService } from '../services/resultService.js';
import { AuthService } from '../services/authService.js';
import { filterBurstDuplicates } from '../utils/burstDeduplicator.js';
import { env } from '../config/env.js';

async function runTests() {
  console.log('=== DUPLICATE PREVENTION & IDEMPOTENCY REGRESSION SUITE ===\n');

  if (mongoose.connection.readyState !== 1) {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(env.MONGODB_URI);
    console.log('MongoDB connected successfully.\n');
  }

  // 1. Find or create a test user
  let testUser = await User.findOne({ email: 'test_regression_student@example.com' });
  if (!testUser) {
    testUser = await User.create({
      name: 'Regression Student',
      email: 'test_regression_student@example.com',
      password: 'TestPassword123!',
      role: 'student',
    });
    console.log('Created temporary test user:', testUser.email);
  }

  // 2. Find a test that has active questions in Question collection
  const allTests = await Test.find({ isActive: { $ne: false } }).lean();
  let testDoc = null;
  let testQuestions = [];
  for (const t of allTests) {
    const qs = await Question.find({ testId: t._id, status: { $ne: 'inactive' } }).select('+correctAnswer').lean();
    if (qs.length > 0) {
      testDoc = t;
      testQuestions = qs;
      break;
    }
  }

  if (!testDoc || testQuestions.length === 0) {
    throw new Error('No active test with questions found in database to run regression');
  }
  console.log(`Using test: "${testDoc.title}" (${testDoc.slug || testDoc._id}), Questions: ${testQuestions.length}`);

  // Clean up any old regression results for this test user
  await Result.deleteMany({ userId: testUser._id });

  // Test Case 1: Normal exam submission creates exactly 1 result
  console.log('\n[Test 1] Normal submission with stable attemptId');
  const stableAttemptId1 = `attempt_reg_${Date.now()}_abc1`;
  const sampleAnswers = {};
  testQuestions.forEach((q, idx) => {
    if (idx < 5) sampleAnswers[q.order || q._id] = q.correctAnswer;
  });

  const res1 = await ResultService.submitExam({
    testIdOrSlug: testDoc.slug || testDoc._id,
    attemptId: stableAttemptId1,
    studentName: testUser.name,
    studentEmail: testUser.email,
    userId: testUser._id,
    answers: sampleAnswers,
    markedForReview: [],
    timeSpentSeconds: 120,
    startTime: new Date(Date.now() - 120000),
    autoSubmitted: false,
  });

  const countAfter1 = await Result.countDocuments({ attemptId: stableAttemptId1 });
  if (countAfter1 !== 1) {
    throw new Error(`Expected exactly 1 result for attemptId ${stableAttemptId1}, found ${countAfter1}`);
  }
  console.log(`✓ Test 1 Passed: Result created successfully (ID: ${res1.resultId || res1._id})`);

  // Test Case 2: Idempotent repeat submission with same attemptId
  console.log('\n[Test 2] Idempotent repeat submission with same attemptId');
  const res2 = await ResultService.submitExam({
    testIdOrSlug: testDoc.slug || testDoc._id,
    attemptId: stableAttemptId1,
    studentName: testUser.name,
    studentEmail: testUser.email,
    userId: testUser._id,
    answers: sampleAnswers,
    markedForReview: [],
    timeSpentSeconds: 120,
    startTime: new Date(Date.now() - 120000),
    autoSubmitted: true, // even if autoSubmitted flag differed
  });

  const countAfter2 = await Result.countDocuments({ attemptId: stableAttemptId1 });
  if (countAfter2 !== 1) {
    throw new Error(`Expected still 1 result after repeat submission, found ${countAfter2}`);
  }
  if ((res1.resultId || res1._id).toString() !== (res2.resultId || res2._id).toString()) {
    throw new Error('Expected same result ID on repeat submission');
  }
  console.log(`✓ Test 2 Passed: Returned existing result (${res2.resultId || res2._id}), no duplicate created`);

  // Test Case 3: Concurrent submissions with same attemptId
  console.log('\n[Test 3] Concurrent parallel submissions with same attemptId (race simulation)');
  const raceAttemptId = `attempt_race_${Date.now()}_xyz9`;
  const raceAnswers = {};
  testQuestions.forEach((q, idx) => {
    if (idx < 2) raceAnswers[q.order || q._id] = q.correctAnswer === 'A' ? 'B' : 'A';
  });

  const [raceResA, raceResB, raceResC] = await Promise.all([
    ResultService.submitExam({
      testIdOrSlug: testDoc.slug || testDoc._id,
      attemptId: raceAttemptId,
      studentName: testUser.name,
      studentEmail: testUser.email,
      userId: testUser._id,
      answers: raceAnswers,
      markedForReview: [],
      timeSpentSeconds: 60,
      startTime: new Date(Date.now() - 60000),
    }),
    ResultService.submitExam({
      testIdOrSlug: testDoc.slug || testDoc._id,
      attemptId: raceAttemptId,
      studentName: testUser.name,
      studentEmail: testUser.email,
      userId: testUser._id,
      answers: raceAnswers,
      markedForReview: [],
      timeSpentSeconds: 60,
      startTime: new Date(Date.now() - 60000),
    }),
    ResultService.submitExam({
      testIdOrSlug: testDoc.slug || testDoc._id,
      attemptId: raceAttemptId,
      studentName: testUser.name,
      studentEmail: testUser.email,
      userId: testUser._id,
      answers: raceAnswers,
      markedForReview: [],
      timeSpentSeconds: 60,
      startTime: new Date(Date.now() - 60000),
    }),
  ]);

  const countRace = await Result.countDocuments({ attemptId: raceAttemptId });
  if (countRace !== 1) {
    throw new Error(`Race condition created duplicate documents! Count: ${countRace}`);
  }
  const idA = (raceResA.resultId || raceResA._id).toString();
  const idB = (raceResB.resultId || raceResB._id).toString();
  const idC = (raceResC.resultId || raceResC._id).toString();
  if (idA !== idB || idB !== idC) {
    throw new Error(`Race condition returned mismatched result IDs: ${idA}, ${idB}, ${idC}`);
  }
  console.log(`✓ Test 3 Passed: 3 concurrent requests safely resolved to single result ${idA}`);

  // Test Case 4: Burst duplicate guard (different attemptId, same answers/score within 5 minutes)
  console.log('\n[Test 4] Burst duplicate guard with newly generated attemptId within 5 minutes');
  const burstAttemptId = `attempt_burst_${Date.now()}_differentId`;
  const burstRes = await ResultService.submitExam({
    testIdOrSlug: testDoc.slug || testDoc._id,
    attemptId: burstAttemptId,
    studentName: testUser.name,
    studentEmail: testUser.email,
    userId: testUser._id,
    answers: sampleAnswers,
    markedForReview: [],
    timeSpentSeconds: 60,
    startTime: new Date(Date.now() - 60000),
  });

  const countBurst = await Result.countDocuments({ attemptId: burstAttemptId });
  if (countBurst !== 0) {
    throw new Error(`Expected burst submission not to create a new document with attemptId ${burstAttemptId}`);
  }
  console.log(`✓ Test 4 Passed: Burst submission intercepted by 5-min idempotency guard, returned result ${burstRes.resultId || burstRes._id}`);

  // Test Case 5: In-memory burst deduplication utility
  console.log('\n[Test 5] filterBurstDuplicates utility test');
  const dummyResults = [
    { _id: '1', studentEmail: 'test@example.com', testId: 't1', score: 50, createdAt: new Date(1000000) },
    { _id: '2', studentEmail: 'test@example.com', testId: 't1', score: 50, createdAt: new Date(1000500) }, // 500ms later - duplicate
    { _id: '3', studentEmail: 'test@example.com', testId: 't1', score: 50, createdAt: new Date(1001200) }, // 1.2s later - duplicate
    { _id: '4', studentEmail: 'test@example.com', testId: 't1', score: 60, createdAt: new Date(1001500) }, // different score - distinct
    { _id: '5', studentEmail: 'test@example.com', testId: 't1', score: 50, createdAt: new Date(2000000) }, // 16 minutes later - legitimate retake
  ];
  const deduped = filterBurstDuplicates(dummyResults);
  if (deduped.length !== 3) {
    throw new Error(`Expected 3 unique results from burst list of 5, got ${deduped.length}`);
  }
  console.log(`✓ Test 5 Passed: Successfully filtered 5 entries down to 3 unique attempts`);

  // Clean up test user's results
  await Result.deleteMany({ userId: testUser._id });
  await User.deleteOne({ _id: testUser._id });
  console.log('\nCleaned up regression test data.');

  console.log('\n=== ALL REGRESSION TESTS PASSED SUCCESSFULLY! ===');
  await mongoose.disconnect();
}

runTests().catch((err) => {
  console.error('\n❌ REGRESSION TEST FAILED:', err);
  process.exit(1);
});
