import http from 'http';
import app from '../app.js';
import { connectDatabase, closeDatabase } from '../config/database.js';
import { Test, Question } from '../models/index.js';

let server;
const PORT = 5066;
const BASE_URL = `http://localhost:${PORT}/api`;

async function request(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  const response = await fetch(url, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  });
  const data = await response.json();
  return { status: response.status, data };
}

async function runScoringTests() {
  console.log('====================================================');
  console.log('🧪 Starting Phase 7: Server-Side Scoring Test Suite');
  console.log('====================================================\n');

  await connectDatabase();
  server = http.createServer(app);
  await new Promise((resolve) => server.listen(PORT, resolve));
  console.log(`Test server listening on port ${PORT}\n`);

  try {
    // 1. Fetch Test 2 (AITS-01: 67 questions covering Physics & Chemistry)
    const test2Doc = await Test.findOne({ slug: 'neet-test-2' }).lean();
    if (!test2Doc) throw new Error('Test 2 not found in database');

    const test2Questions = await Question.find({ testId: test2Doc._id })
      .select('+correctAnswer')
      .sort({ order: 1 })
      .lean();

    console.log(`[Test Target] "${test2Doc.title}" (${test2Questions.length} questions in DB)`);

    // 2. Prepare precise test scenario:
    // - 20 Physics questions correct (+80)
    // - 5 Physics questions wrong (-5)
    // - 20 Physics questions unattempted (0)
    // - 15 Chemistry questions correct (+60)
    // - 5 Chemistry questions wrong (-5)
    // - 2 Chemistry questions unattempted (0)
    // Expected Total Attempted: 25 Physics + 20 Chemistry = 45 attempted
    // Expected Correct: 35 (+140)
    // Expected Wrong: 10 (-10)
    // Expected Unattempted: 22 (0)
    // Expected Raw Score: 140 - 10 = 130
    // Expected Max Score: 67 * 4 = 268
    // Expected Accuracy: (35 / 45) * 100 = 77.8%

    const submittedAnswers = {};
    const physicsQ = test2Questions.filter((q) => q.subject === 'Physics');
    const chemistryQ = test2Questions.filter((q) => q.subject === 'Chemistry');

    physicsQ.slice(0, 20).forEach((q) => {
      submittedAnswers[q.order] = q.correctAnswer;
    });
    physicsQ.slice(20, 25).forEach((q) => {
      submittedAnswers[q.order] = q.correctAnswer === 'A' ? 'B' : 'A';
    });

    chemistryQ.slice(0, 15).forEach((q) => {
      submittedAnswers[q.order] = q.correctAnswer;
    });
    chemistryQ.slice(15, 20).forEach((q) => {
      submittedAnswers[q.order] = q.correctAnswer === 'A' ? 'B' : 'A';
    });

    const uniqueAttemptId = `attempt_${Date.now()}`;

    console.log('\n[1] Submitting student exam to POST /api/tests/:testId/submit');
    const submitRes = await request(`/tests/${test2Doc._id}/submit`, {
      method: 'POST',
      body: JSON.stringify({
        attemptId: uniqueAttemptId,
        answers: submittedAnswers,
        markedForReview: [1, 2, 46],
        studentName: 'Priya Patel',
        autoSubmitted: false,
        timeSpentSeconds: 2400,
      }),
    });

    if (submitRes.status !== 201 || !submitRes.data.success) {
      throw new Error(`Submit failed: ${JSON.stringify(submitRes.data)}`);
    }

    const resData = submitRes.data.data;
    console.log('✓ Server evaluated and stored submission successfully.');

    // 3. Validate Scores
    console.log('\n[2] Verifying Score and Mark Calculations:');
    console.log(`  • Correct Count:    ${resData.correctCount} (Expected: 35)`);
    console.log(`  • Wrong Count:      ${resData.wrongCount} (Expected: 10)`);
    console.log(`  • Unattempted Count:${resData.unattemptedCount} (Expected: 22)`);
    console.log(`  • Total Questions:  ${resData.totalQuestions} (Expected: 67)`);
    console.log(`  • Score:            ${resData.score}/${resData.maxScore} (Expected: 130/268)`);
    console.log(`  • Accuracy:         ${resData.accuracy}% (Expected: 77.8%)`);

    if (resData.correctCount !== 35) throw new Error(`Wrong correctCount: ${resData.correctCount}`);
    if (resData.wrongCount !== 10) throw new Error(`Wrong wrongCount: ${resData.wrongCount}`);
    if (resData.unattemptedCount !== 22) throw new Error(`Wrong unattemptedCount: ${resData.unattemptedCount}`);
    if (resData.score !== 130) throw new Error(`Wrong score: ${resData.score}`);
    if (resData.accuracy !== 77.8) throw new Error(`Wrong accuracy: ${resData.accuracy}`);
    console.log('  ✓ All score and accuracy assertions passed!');

    // 4. Validate Subject-Wise Breakdown
    console.log('\n[3] Verifying Subject-Wise Performance Breakdown:');
    for (const sub of resData.subjectPerformance) {
      console.log(`  • ${sub.subject}: ${sub.correct} correct, ${sub.wrong} wrong, ${sub.unattempted} unattempted -> ${sub.marks}/${sub.maxMarks} marks (Accuracy: ${sub.accuracy}%)`);
    }
    const physicsSub = resData.subjectPerformance.find((s) => s.subject === 'Physics');
    const chemSub = resData.subjectPerformance.find((s) => s.subject === 'Chemistry');

    if (!physicsSub || physicsSub.correct !== 20 || physicsSub.wrong !== 5 || physicsSub.marks !== 75) {
      throw new Error('Physics subject breakdown calculation failed');
    }
    if (!chemSub || chemSub.correct !== 15 || chemSub.wrong !== 5 || chemSub.marks !== 55) {
      throw new Error('Chemistry subject breakdown calculation failed');
    }
    console.log('  ✓ Subject performance breakdown verified accurately!');

    // 5. Test Duplicate Submission Prevention (Idempotency)
    console.log('\n[4] Testing Duplicate Submission Prevention:');
    const duplicateRes = await request(`/tests/${test2Doc._id}/submit`, {
      method: 'POST',
      body: JSON.stringify({
        attemptId: uniqueAttemptId, // Same attemptId
        answers: submittedAnswers,
      }),
    });

    if (duplicateRes.status !== 201 || duplicateRes.data.data.resultId !== resData.resultId) {
      throw new Error('Duplicate submission check failed');
    }
    console.log('  ✓ Duplicate submission recognized and returned existing result without duplicate record creation.');

    // 6. Test Result Retrieval
    console.log(`\n[5] Testing GET /api/results/${resData.resultId}`);
    const getRes = await request(`/results/${resData.resultId}`);
    if (getRes.status !== 200 || getRes.data.data.score !== 130) {
      throw new Error('Result retrieval failed');
    }
    console.log(`  ✓ Verified result retrieved from database with full per-question review (${getRes.data.data.answers.length} items).`);

    console.log('\n====================================================');
    console.log('🎉 PHASE 7: SERVER-SIDE SCORING 100% VERIFIED');
    console.log('====================================================\n');
  } finally {
    if (server) await new Promise((resolve) => server.close(resolve));
    await closeDatabase();
  }
}

runScoringTests().catch((err) => {
  console.error('\n✕ Server Scoring Test Suite Failed:', err);
  if (server) server.close();
  closeDatabase();
  process.exit(1);
});
