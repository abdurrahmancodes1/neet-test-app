import http from 'http';
import app from '../app.js';
import { connectDatabase, closeDatabase } from '../config/database.js';
import { AuthService } from '../services/authService.js';
import { User } from '../models/index.js';

let server;
const PORT = 5055;
const BASE_URL = `http://localhost:${PORT}/api`;

async function request(endpoint, options = {}, cookies = '') {
  const url = `${BASE_URL}${endpoint}`;
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...(cookies ? { Cookie: cookies } : {}),
      ...(options.headers || {}),
    },
    ...options,
  });
  const data = await response.json();
  return { status: response.status, data };
}

async function runApiTests() {
  console.log('--- Starting API Integration Tests ---');
  await connectDatabase();

  server = http.createServer(app);
  await new Promise((resolve) => server.listen(PORT, resolve));
  console.log(`Test server listening on port ${PORT}`);

  try {
    // Generate admin session for protected admin route tests
    await User.deleteMany({ email: 'testadmin@neet.local' });
    const adminUser = await User.create({
      name: 'Test Admin',
      email: 'testadmin@neet.local',
      password: 'AdminPassword123',
      role: 'admin',
    });
    const adminToken = AuthService.generateToken(adminUser);
    const adminCookie = `neet_auth_token=${adminToken}`;

    // 1. Health Endpoint
    console.log('\n[1] Testing GET /api/health');
    const health = await request('/health');
    if (health.status !== 200 || !health.data.success) throw new Error('Health check failed');
    console.log('✓ GET /api/health passed (200 OK)');

    // 2. List Tests
    console.log('\n[2] Testing GET /api/tests');
    const testList = await request('/tests');
    if (testList.status !== 200 || !Array.isArray(testList.data.data) || testList.data.data.length < 2) {
      throw new Error(`List tests failed. Found ${testList.data?.data?.length} tests.`);
    }
    console.log(`✓ GET /api/tests passed (200 OK) — returned ${testList.data.data.length} tests`);
    const test1 = testList.data.data[0];

    // 3. Filter Tests
    console.log('\n[3] Testing GET /api/tests?subject=Chemistry');
    const filtered = await request('/tests?subject=Chemistry');
    if (filtered.status !== 200 || !filtered.data.data.every((t) => t.subjects.includes('Chemistry'))) {
      throw new Error('Filtering by subject failed');
    }
    console.log(`✓ GET /api/tests?subject=Chemistry passed (${filtered.data.data.length} match)`);

    // 4. Get Single Test Details
    console.log(`\n[4] Testing GET /api/tests/${test1._id}`);
    const singleTest = await request(`/tests/${test1._id}`);
    if (singleTest.status !== 200 || singleTest.data.data._id !== test1._id) {
      throw new Error('Get single test failed');
    }
    console.log(`✓ GET /api/tests/:testId passed (200 OK) — ${singleTest.data.data.title}`);

    // 5. Get Student Questions (Security Check: NO correctAnswer exposed)
    console.log(`\n[5] Testing GET /api/tests/${test1._id}/questions (Security Verification)`);
    const studentQuestions = await request(`/tests/${test1._id}/questions`);
    if (studentQuestions.status !== 200 || !Array.isArray(studentQuestions.data.data)) {
      throw new Error('Get student questions failed');
    }

    // CRITICAL SECURITY ASSERTION
    for (const q of studentQuestions.data.data) {
      if (q.correctAnswer !== undefined) {
        throw new Error(`SECURITY VULNERABILITY: Question ${q.order} leaked correctAnswer: ${q.correctAnswer}`);
      }
      if (q.explanation !== undefined) {
        throw new Error(`SECURITY VULNERABILITY: Question ${q.order} leaked explanation`);
      }
      if (!q.question || !q.options || !q.subject) {
        throw new Error(`Question ${q.order} missing required student fields`);
      }
    }
    console.log(`✓ Security Check Passed: ${studentQuestions.data.data.length} questions returned with ZERO correctAnswer leaks!`);

    // 6. Submit Exam & Grade on Server
    console.log(`\n[6] Testing POST /api/tests/${test1._id}/submit`);
    const sampleAnswers = {
      1: 'C',
      2: 'A',
      3: 'D',
    };

    const submitRes = await request(`/tests/${test1._id}/submit`, {
      method: 'POST',
      body: JSON.stringify({
        answers: sampleAnswers,
        markedForReview: [1, 5],
        studentName: 'Test Student',
        autoSubmitted: false,
        timeSpentSeconds: 120,
      }),
    });

    if (submitRes.status !== 201 || !submitRes.data.data.resultId) {
      throw new Error(`Submit test failed: ${JSON.stringify(submitRes.data)}`);
    }
    const resultId = submitRes.data.data.resultId;
    console.log(`✓ POST /api/tests/:testId/submit passed (201 Created) — Result ID: ${resultId}`);

    // 7. Get Result By ID
    console.log(`\n[7] Testing GET /api/results/${resultId}`);
    const resultCheck = await request(`/results/${resultId}`);
    if (resultCheck.status !== 200 || resultCheck.data.data._id !== resultId) {
      throw new Error('Get result failed');
    }
    console.log(`✓ GET /api/results/:resultId passed (200 OK)`);

    // 8. Admin Lifecycle (Protected Admin Routes with Admin Cookie)
    console.log('\n[8] Testing Protected Admin Lifecycle:');
    
    // Create Draft Test
    const newTestRes = await request(
      '/admin/tests',
      {
        method: 'POST',
        body: JSON.stringify({
          title: 'Temporary Mock Test',
          testCode: 'TEMP-999',
          type: 'quiz',
          subjects: ['Physics'],
          durationMinutes: 15,
        }),
      },
      adminCookie
    );
    if (newTestRes.status !== 201) throw new Error(`Admin create test failed: ${JSON.stringify(newTestRes.data)}`);
    const tempTestId = newTestRes.data.data._id;
    console.log(`✓ POST /api/admin/tests passed — Created temp test ID: ${tempTestId}`);

    // Add Question to Test
    const addQRes = await request(
      `/admin/tests/${tempTestId}/questions`,
      {
        method: 'POST',
        body: JSON.stringify({
          order: 1,
          subject: 'Physics',
          chapter: 'Kinematics',
          topic: 'Speed and Velocity',
          question: 'What is instantaneous velocity?',
          options: { A: 'dx/dt', B: 'dv/dt', C: 'x/t', D: 'v/t' },
          correctAnswer: 'A',
          explanation: 'Instantaneous velocity is the derivative of position with respect to time.',
        }),
      },
      adminCookie
    );
    if (addQRes.status !== 201) throw new Error('Admin add question failed');
    console.log('✓ POST /api/admin/tests/:testId/questions passed');

    // Admin view includes correctAnswer
    const adminQuestions = await request(`/admin/tests/${tempTestId}/questions`, {}, adminCookie);
    if (adminQuestions.data.data[0].correctAnswer !== 'A') {
      throw new Error('Admin questions should include correctAnswer');
    }
    console.log('✓ GET /api/admin/tests/:testId/questions passed (includes correctAnswer)');

    // Publish Test
    const pubRes = await request(`/admin/tests/${tempTestId}/publish`, { method: 'POST' }, adminCookie);
    if (pubRes.status !== 200 || pubRes.data.data.status !== 'published') throw new Error('Publish test failed');
    console.log('✓ POST /api/admin/tests/:testId/publish passed');

    // Unpublish Test
    const unpubRes = await request(`/admin/tests/${tempTestId}/unpublish`, { method: 'POST' }, adminCookie);
    if (unpubRes.status !== 200 || unpubRes.data.data.status !== 'draft') throw new Error('Unpublish test failed');
    console.log('✓ POST /api/admin/tests/:testId/unpublish passed');

    // Delete Test (Cascade)
    const delRes = await request(`/admin/tests/${tempTestId}`, { method: 'DELETE' }, adminCookie);
    if (delRes.status !== 200 || delRes.data.data.deletedQuestionsCount !== 1) throw new Error('Delete test failed');
    console.log(`✓ DELETE /api/admin/tests/:testId passed (Cascade deleted ${delRes.data.data.deletedQuestionsCount} questions)`);

    console.log('\n========================================');
    console.log('🎉 ALL REST API ENDPOINTS TESTED & PASSED 100%');
    console.log('========================================\n');
  } finally {
    if (server) {
      await new Promise((resolve) => server.close(resolve));
    }
    await closeDatabase();
  }
}

runApiTests().catch((err) => {
  console.error('\n✕ API Test Suite Failed:', err);
  if (server) server.close();
  closeDatabase();
  process.exit(1);
});
