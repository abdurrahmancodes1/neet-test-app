import http from 'http';
import app from '../app.js';
import { connectDatabase, closeDatabase } from '../config/database.js';
import { AuthService } from '../services/authService.js';
import { User, Result } from '../models/index.js';


let server;
const PORT = 5099;
const BASE_URL = `http://localhost:${PORT}/api`;

async function request(endpoint, options = {}, cookie = '') {
  const url = `${BASE_URL}${endpoint}`;
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...(cookie ? { Cookie: cookie } : {}),
      ...(options.headers || {}),
    },
    ...options,
  });
  const data = await response.json();
  return { status: response.status, data };
}

async function runAuditTests() {
  console.log('====================================================');
  console.log('🧪 Production Audit & Regression Test Suite');
  console.log('====================================================\n');

  await connectDatabase();
  server = http.createServer(app);
  await new Promise((resolve) => server.listen(PORT, resolve));
  console.log(`Test server running on port ${PORT}\n`);

  const testEmail = `audit_student_${Date.now()}@neet.test`;
  let studentCookie = '';
  let studentId = '';

  try {
    // 1. Create a test student and obtain token
    console.log('[1] Creating temporary student for profile & submission audit');
    const studentUser = await User.create({
      name: 'Audit Candidate',
      email: testEmail,
      password: 'AuditPassword123',
      role: 'student',
      targetExam: 'neet-2027',
    });
    studentId = studentUser._id.toString();
    const studentToken = AuthService.generateToken(studentUser);
    studentCookie = `neet_auth_token=${studentToken}`;
    console.log(`✓ Student created: ${testEmail} (ID: ${studentId})`);

    // 2. Test Profile Update: Permitted partial updates
    console.log('\n[2] Testing Profile Update (PUT /api/auth/profile)');
    const updateRes = await request(
      '/auth/profile',
      {
        method: 'PUT',
        body: JSON.stringify({
          name: 'Audit Candidate Updated',
          targetExam: 'jee-2027',
          rollNumber: 'ROLL-AUDIT-99',
        }),
      },
      studentCookie
    );
    if (updateRes.status !== 200 || !updateRes.data.success) {
      throw new Error(`Profile update failed: ${JSON.stringify(updateRes.data)}`);
    }
    const updatedUser = updateRes.data.data;
    if (updatedUser.name !== 'Audit Candidate Updated' || updatedUser.targetExam !== 'jee-2027') {
      throw new Error(`Profile update fields mismatch: ${JSON.stringify(updatedUser)}`);
    }
    console.log('✓ Permitted profile updates (name, targetExam, rollNumber) succeeded.');

    // 3. Test Security: Prevent Privilege Escalation
    console.log('\n[3] Testing Security: Prevent Privilege Escalation (attempting role change)');
    const hackRes = await request(
      '/auth/profile',
      {
        method: 'PUT',
        body: JSON.stringify({
          role: 'admin',
        }),
      },
      studentCookie
    );
    if (hackRes.status !== 400) {
      throw new Error(`Privilege escalation was not blocked! Status: ${hackRes.status}`);
    }
    console.log('✓ Role tampering strictly blocked with 400 Bad Request.');

    // 4. Test Submission Fallback for Built-in Tests
    console.log('\n[4] Testing Submission Fallback for Built-in Test (POST /api/tests/:testId/submit)');
    const fallbackAttemptId = `audit_attempt_${Date.now()}`;
    const submitRes = await request(
      '/tests/built-in-neet-mock-sample/submit',
      {
        method: 'POST',
        body: JSON.stringify({
          attemptId: fallbackAttemptId,
          testId: 'built-in-neet-mock-sample',
          testTitle: 'NEET Foundation Sample Mock',
          studentEmail: testEmail,
          studentName: 'Audit Candidate Updated',
          score: 160,
          maxScore: 200,
          accuracy: 80,
          totalQuestions: 50,
          correctCount: 40,
          wrongCount: 0,
          unattemptedCount: 10,
          timeSpentSeconds: 1800,
          answers: {},
        }),
      },
      studentCookie
    );

    if (submitRes.status !== 201 && submitRes.status !== 200) {
      throw new Error(`Submission failed with status ${submitRes.status}: ${JSON.stringify(submitRes.data)}`);
    }
    console.log(`✓ Submission fallback saved successfully (Result ID: ${submitRes.data.data.resultId || submitRes.data.data._id})`);

    // Verify stored result in MongoDB
    const storedResult = await Result.findOne({ attemptId: fallbackAttemptId }).lean();
    if (!storedResult) throw new Error('Stored result not found in MongoDB');
    if (storedResult.studentEmail !== testEmail) {
      throw new Error(`studentEmail not persisted: expected ${testEmail}, got ${storedResult.studentEmail}`);
    }
    if (storedResult.testTitle !== 'NEET Foundation Sample Mock') {
      throw new Error(`testTitle not persisted: expected 'NEET Foundation Sample Mock', got ${storedResult.testTitle}`);
    }
    console.log('✓ Authoritative MongoDB record verified: studentEmail and testTitle persisted accurately.');

    // 5. Test Admin Overview
    console.log('\n[5] Testing Admin Overview (AuthService.getAdminOverview)');
    const overview = await AuthService.getAdminOverview();
    if (!overview || !Array.isArray(overview.students)) {
      throw new Error('Admin overview failed to return students array');
    }
    console.log(`✓ Admin overview returned ${overview.students.length} students, totalAttempts: ${overview.totalAttempts}`);
    const foundAuditStudent = overview.students.find((s) => s.email === testEmail);
    if (!foundAuditStudent) throw new Error('Audit student not found in overview');
    if (foundAuditStudent.totalAttempts < 1) throw new Error('Attempt count not reflected in overview');
    console.log(`✓ Overview properly calculated attempts (${foundAuditStudent.totalAttempts}) and scores.`);

    // 6. Verify Recovered Missing Student Result
    console.log('\n[6] Verifying Recovered Missing Result for Arshi Nesar (khatoonsaleha775@gmail.com)');
    const recoveredResult = await Result.findOne({
      studentEmail: 'khatoonsaleha775@gmail.com',
      testId: 'neet-work-energy-power',
    }).lean();
    if (!recoveredResult) {
      throw new Error('Recovered result for Arshi Nesar not found in DB!');
    }
    console.log(`✓ Recovered result verified: Score ${recoveredResult.score}/${recoveredResult.maxScore}, Accuracy: ${recoveredResult.accuracy}%, Status: ${recoveredResult.status}`);

    // 7. Verify Registered Student Arshiya Nesar
    console.log('\n[7] Verifying Registered Student: Arshiya Nesar (arshiyanesar26@gmail.com)');
    const arshiyaDoc = await User.findOne({ email: 'arshiyanesar26@gmail.com' }).lean();
    if (!arshiyaDoc) {
      throw new Error('Student Arshiya Nesar not found in User collection!');
    }
    console.log(`✓ Arshiya Nesar verified in DB: Registered on ${arshiyaDoc.createdAt.toISOString()}`);

    console.log('\n====================================================');
    console.log('🎉 ALL AUDIT & REGRESSION TESTS PASSED 100%');
    console.log('====================================================\n');
  } finally {
    try {
      if (studentId) await User.deleteOne({ _id: studentId });
      await Result.deleteMany({ studentEmail: testEmail });
    } catch (_) {}
    if (server) await new Promise((resolve) => server.close(resolve));
    await closeDatabase();
  }
}

runAuditTests().catch((err) => {
  console.error('\n✕ Audit Test Failed:', err);
  if (server) server.close();
  closeDatabase();
  process.exit(1);
});
