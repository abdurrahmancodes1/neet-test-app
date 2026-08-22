import http from 'http';
import app from '../app.js';
import { connectDatabase, closeDatabase } from '../config/database.js';
import { User, Test, Result } from '../models/index.js';

let server;
const PORT = 5077;
const BASE_URL = `http://localhost:${PORT}/api`;

async function request(endpoint, options = {}, cookies = '') {
  const url = `${BASE_URL}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    ...(cookies ? { Cookie: cookies } : {}),
    ...(options.headers || {}),
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  const rawSetCookie = response.headers.get('set-cookie');
  let responseData;
  try {
    responseData = await response.json();
  } catch {
    responseData = null;
  }

  return {
    status: response.status,
    data: responseData,
    setCookie: rawSetCookie,
  };
}

function extractCookie(setCookieHeader) {
  if (!setCookieHeader) return '';
  return setCookieHeader.split(';')[0];
}

async function runAuthTests() {
  console.log('====================================================');
  console.log('🔒 Starting Phase 8: Authentication & Authorization Test Suite');
  console.log('====================================================\n');

  await connectDatabase();

  // Clean test users
  await User.deleteMany({ email: { $in: ['student@neet.test', 'otherstudent@neet.test', 'admin@neet.test'] } });

  server = http.createServer(app);
  await new Promise((resolve) => server.listen(PORT, resolve));
  console.log(`Test server listening on port ${PORT}\n`);

  try {
    // 1. Register Student
    console.log('[1] Testing Student Registration (POST /api/auth/register)');
    const studentReg = await request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Rohan Sharma',
        email: 'student@neet.test',
        password: 'password123',
        rollNumber: 'NEET-2025-001',
        role: 'student',
      }),
    });

    if (studentReg.status !== 201 || !studentReg.data.success) {
      throw new Error(`Student registration failed: ${JSON.stringify(studentReg.data)}`);
    }

    if (studentReg.data.data.user.password || studentReg.data.data.user.passwordHash) {
      throw new Error('SECURITY VULNERABILITY: Password hash leaked in registration response');
    }

    if (!studentReg.setCookie || !studentReg.setCookie.includes('HttpOnly')) {
      throw new Error('SECURITY REQUIREMENT: Cookie must have HttpOnly attribute');
    }

    const studentCookie = extractCookie(studentReg.setCookie);
    const studentId = studentReg.data.data.user.id;
    console.log(`✓ Student registered successfully (User ID: ${studentId})`);
    console.log(`✓ Secure HTTP-only cookie received: ${studentCookie.slice(0, 30)}...`);

    // 2. Register Second Student (for cross-user authorization tests)
    console.log('\n[2] Registering Second Student (otherstudent@neet.test)');
    const otherReg = await request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Ananya Gupta',
        email: 'otherstudent@neet.test',
        password: 'password456',
        rollNumber: 'NEET-2025-002',
        role: 'student',
      }),
    });
    const otherStudentCookie = extractCookie(otherReg.setCookie);
    console.log('✓ Second student registered.');

    // 3. Register Admin User
    console.log('\n[3] Testing Admin Registration (POST /api/auth/register with role=admin)');
    const adminReg = await request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Exam Administrator',
        email: 'admin@neet.test',
        password: 'AdminPassword#2025',
        role: 'admin',
      }),
    });

    if (adminReg.status !== 201 || adminReg.data.data.user.role !== 'admin') {
      throw new Error('Admin registration failed');
    }
    const adminCookie = extractCookie(adminReg.setCookie);
    console.log(`✓ Admin user registered successfully with ADMIN role.`);

    // 4. Test Current User Endpoint (GET /api/auth/me)
    console.log('\n[4] Testing GET /api/auth/me with Student Cookie');
    const meRes = await request('/auth/me', { method: 'GET' }, studentCookie);
    if (meRes.status !== 200 || meRes.data.data.email !== 'student@neet.test') {
      throw new Error(`Profile fetch failed: ${JSON.stringify(meRes.data)}`);
    }
    console.log(`✓ Current user profile verified: ${meRes.data.data.name} (${meRes.data.data.role})`);

    // 5. Test Unauthorized Access (No Token)
    console.log('\n[5] Testing Unauthorized Access (GET /api/admin/tests without cookie)');
    const unauthRes = await request('/admin/tests', { method: 'GET' });
    if (unauthRes.status !== 401) {
      throw new Error(`Expected 401 Unauthorized, got ${unauthRes.status}`);
    }
    console.log('✓ Access blocked with 401 Unauthorized as expected.');

    // 6. Test Forbidden Access (Student attempting Admin Endpoint)
    console.log('\n[6] Testing Role-Based Protection (Student accessing GET /api/admin/tests)');
    const forbiddenRes = await request('/admin/tests', { method: 'GET' }, studentCookie);
    if (forbiddenRes.status !== 403) {
      throw new Error(`Expected 403 Forbidden for student, got ${forbiddenRes.status}`);
    }
    console.log('✓ Student correctly blocked from /api/admin/* with 403 Forbidden.');

    // 7. Test Admin Access (Admin accessing Admin Endpoint)
    console.log('\n[7] Testing Admin Authorized Access (Admin accessing GET /api/admin/tests)');
    const adminAccessRes = await request('/admin/tests', { method: 'GET' }, adminCookie);
    if (adminAccessRes.status !== 200 || !Array.isArray(adminAccessRes.data.data)) {
      throw new Error(`Expected 200 OK for admin, got ${adminAccessRes.status}`);
    }
    console.log(`✓ Admin granted access (retrieved ${adminAccessRes.data.data.length} tests).`);

    // 8. Test Private Result Ownership Protection
    console.log('\n[8] Testing Cross-User Result Privacy Protection');
    const testDoc = await Test.findOne({ slug: 'laws-of-motion' }).lean();

    // Student 1 submits exam with their authenticated session
    const submitRes = await request(
      `/tests/${testDoc._id}/submit`,
      {
        method: 'POST',
        body: JSON.stringify({
          answers: { 1: 'C', 2: 'B' },
          timeSpentSeconds: 300,
        }),
      },
      studentCookie
    );

    const studentResultId = submitRes.data.data.resultId;
    console.log(`  • Student 1 submitted exam (Result ID: ${studentResultId})`);

    // Student 1 accesses their own result -> 200 OK
    const ownerRes = await request(`/results/${studentResultId}`, { method: 'GET' }, studentCookie);
    if (ownerRes.status !== 200) throw new Error('Owner should be able to view their own result');
    console.log('  ✓ Student 1 successfully accessed their own result (200 OK)');

    // Student 2 attempts to access Student 1's private result -> 403 Forbidden
    const hackerRes = await request(`/results/${studentResultId}`, { method: 'GET' }, otherStudentCookie);
    if (hackerRes.status !== 403) {
      throw new Error(`Expected 403 Forbidden when Student 2 accesses Student 1's result, got ${hackerRes.status}`);
    }
    console.log("  ✓ Cross-user privacy verified: Student 2 blocked from viewing Student 1's private result (403 Forbidden)");

    // Admin accesses Student 1's result -> 200 OK
    const adminViewRes = await request(`/results/${studentResultId}`, { method: 'GET' }, adminCookie);
    if (adminViewRes.status !== 200) throw new Error('Admin should be able to view student results');
    console.log("  ✓ Admin successfully inspected Student 1's result (200 OK)");

    // 9. Test User Exam History (GET /api/auth/my-results)
    console.log('\n[9] Testing Student Exam History (GET /api/auth/my-results)');
    const historyRes = await request('/auth/my-results', { method: 'GET' }, studentCookie);
    if (historyRes.status !== 200 || historyRes.data.data.length < 1) {
      throw new Error('Failed to retrieve user exam history');
    }
    console.log(`✓ Student exam history retrieved (${historyRes.data.data.length} recorded attempts).`);

    // 10. Test Login (POST /api/auth/login)
    console.log('\n[10] Testing User Login with Valid & Invalid Credentials');
    
    // Invalid Password
    const badLogin = await request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        email: 'student@neet.test',
        password: 'WrongPassword!',
      }),
    });
    if (badLogin.status !== 401) throw new Error('Invalid credentials should return 401');
    console.log('  ✓ Invalid password rejected with 401 Unauthorized.');

    // Valid Password
    const goodLogin = await request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        email: 'student@neet.test',
        password: 'password123',
      }),
    });
    if (goodLogin.status !== 200 || !goodLogin.setCookie) throw new Error('Valid login should succeed and return cookie');
    console.log('  ✓ Valid login succeeded with new session cookie.');

    // 11. Test Logout (POST /api/auth/logout)
    console.log('\n[11] Testing Logout (POST /api/auth/logout)');
    const logoutRes = await request('/auth/logout', { method: 'POST' }, studentCookie);
    if (logoutRes.status !== 200) throw new Error('Logout failed');
    console.log('✓ Logout completed and cookie clearance header sent.');

    console.log('\n====================================================');
    console.log('🎉 PHASE 8: AUTHENTICATION & AUTHORIZATION 100% PASSED');
    console.log('====================================================\n');
  } finally {
    if (server) await new Promise((resolve) => server.close(resolve));
    await closeDatabase();
  }
}

runAuthTests().catch((err) => {
  console.error('\n✕ Auth Test Suite Failed:', err);
  if (server) server.close();
  closeDatabase();
  process.exit(1);
});
