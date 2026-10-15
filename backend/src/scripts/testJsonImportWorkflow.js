import http from 'http';
import jwt from 'jsonwebtoken';
import app from '../app.js';
import { connectDatabase, closeDatabase } from '../config/database.js';
import { Test, Question, User } from '../models/index.js';
import { env } from '../config/env.js';
import { SAMPLE_IMPORT_TEMPLATE } from '../fixtures/sampleImportTemplate.js';

let server;
const PORT = 5092;
const BASE_URL = `http://localhost:${PORT}/api`;

function generateToken(payload) {
  return jwt.sign(payload, env.JWT_SECRET || 'neet-jwt-secret-key-production-grade', {
    expiresIn: '1h',
  });
}

async function request(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });
  let data;
  try {
    data = await response.json();
  } catch {
    data = null;
  }
  return { status: response.status, data };
}

async function runAllTests() {
  console.log('================================================================');
  console.log('🧪 Automated Question Paper Import & SVG Security Test Suite');
  console.log('================================================================\n');

  await connectDatabase();
  server = http.createServer(app);
  await new Promise((resolve) => server.listen(PORT, resolve));
  console.log(`✓ Test server running on port ${PORT}\n`);

  // Ensure test users exist in MongoDB for authMiddleware lookup
  await User.deleteMany({
    email: { $in: ['admin.import@neet.test', 'student.import@neet.test'] },
  });

  const adminUser = await User.create({
    name: 'Admin Tester',
    email: 'admin.import@neet.test',
    password: 'Password123!',
    role: 'admin',
    status: 'active',
  });

  const studentUser = await User.create({
    name: 'Student Tester',
    email: 'student.import@neet.test',
    password: 'Password123!',
    role: 'student',
    status: 'active',
  });

  const adminToken = generateToken({
    id: adminUser._id.toString(),
    email: adminUser.email,
    role: 'admin',
  });

  const studentToken = generateToken({
    id: studentUser._id.toString(),
    email: studentUser.email,
    role: 'student',
  });

  const adminHeaders = { Authorization: `Bearer ${adminToken}` };
  const studentHeaders = { Authorization: `Bearer ${studentToken}` };

  let passedTests = 0;
  let totalTests = 0;

  function assert(condition, message) {
    totalTests++;
    if (!condition) {
      console.error(`✕ FAILED [${totalTests}]: ${message}`);
      throw new Error(message);
    }
    passedTests++;
    console.log(`✓ PASSED [${totalTests}]: ${message}`);
  }

  try {
    // 1. Sample Template Endpoint
    console.log('\n--- 1. Testing Sample Template Retrieval ---');
    const templateRes = await request('/admin/tests/sample-template', { headers: adminHeaders });
    assert(templateRes.status === 200, 'GET /api/admin/tests/sample-template returns 200');
    assert(templateRes.data?.data?.schemaVersion === '1.0', 'Template includes schemaVersion 1.0');
    assert(templateRes.data?.data?.questions?.length >= 3, 'Template includes sample questions with inline SVG');

    // 2. Validate & Dry-Run Preview of Valid Test with KaTeX & Inline SVG
    console.log('\n--- 2. Testing Import Preview with KaTeX & Inline SVG ---');
    const previewRes = await request('/admin/tests/import-preview', {
      method: 'POST',
      headers: adminHeaders,
      body: JSON.stringify(SAMPLE_IMPORT_TEMPLATE),
    });
    if (previewRes.status !== 200) {
      console.error('previewRes debug:', previewRes.status, JSON.stringify(previewRes.data));
    }
    assert(previewRes.status === 200, 'POST /api/admin/tests/import-preview returns 200');
    assert(previewRes.data?.data?.isValid === true, 'Preview validation reports isValid = true');
    assert(previewRes.data?.data?.test?.totalQuestions === 3, 'Derived totalQuestions matches question count (3)');
    assert(previewRes.data?.data?.test?.totalMarks === 12, 'Derived totalMarks is calculated accurately (12 marks)');
    assert(
      previewRes.data?.data?.questions[0]?.questionImage?.type === 'svg',
      'Inline SVG diagram is parsed and preserved in preview'
    );

    // 3. Confirm Full Test Import into MongoDB
    console.log('\n--- 3. Testing Test Import & MongoDB Persistence ---');
    const importRes = await request('/admin/tests/import', {
      method: 'POST',
      headers: adminHeaders,
      body: JSON.stringify(SAMPLE_IMPORT_TEMPLATE),
    });
    assert(importRes.status === 201, 'POST /api/admin/tests/import creates test with 201 Created');
    assert(importRes.data?.data?.test?.slug === 'jee-2027-physics-mechanics-drill', 'Test created with correct slug');
    assert(importRes.data?.data?.insertedCount === 3, 'All 3 questions inserted into MongoDB collection');

    // Verify directly in MongoDB
    const testDoc = await Test.findOne({ slug: 'jee-2027-physics-mechanics-drill' });
    assert(Boolean(testDoc), 'Test document confirmed in MongoDB');
    const questionsCount = await Question.countDocuments({ testId: testDoc._id });
    assert(questionsCount === 3, `Confirmed 3 Question documents linked to testId in MongoDB`);

    // 4. Test Idempotent Repeated Submission (Re-importing same slug updates test cleanly)
    console.log('\n--- 4. Testing Idempotent Re-Import / Update ---');
    const reImportRes = await request('/admin/tests/import', {
      method: 'POST',
      headers: adminHeaders,
      body: JSON.stringify(SAMPLE_IMPORT_TEMPLATE),
    });
    assert(reImportRes.status === 201, 'Re-import succeeds with 201 without throwing unique key errors');
    const questionsAfterReimport = await Question.countDocuments({ testId: testDoc._id });
    assert(questionsAfterReimport === 3, 'Question documents replaced cleanly without duplication');

    // 5. Anti-Cheat Security: Student Question Feed Must Contain SVG Diagram But ZERO Answer Leaks
    console.log('\n--- 5. Testing Student-Facing Answer Protection & Diagram Delivery ---');
    const studentQRes = await request(`/tests/${testDoc.slug}/questions`);
    assert(studentQRes.status === 200, 'GET /api/tests/:slug/questions returns 200 for candidates');
    assert(studentQRes.data?.data?.length === 3, 'Student questions array has 3 items');

    const firstQ = studentQRes.data.data[0];
    assert(firstQ.questionImage?.type === 'svg', 'Candidate receives questionImage SVG diagram during CBT exam');
    assert(Boolean(firstQ.questionImage?.data), 'SVG markup data is delivered to student for visual rendering');
    assert(firstQ.correctAnswer === undefined, 'CRITICAL SECURITY: correctAnswer is completely HIDDEN from student');
    assert(firstQ.explanation === undefined, 'CRITICAL SECURITY: explanation is completely HIDDEN from student');

    // 6. Test CBT Submission and Authoritative Scoring on Newly Imported Test
    console.log('\n--- 6. Testing Exam Submission and Scoring ---');
    const submitRes = await request(`/tests/${testDoc.slug}/submit`, {
      method: 'POST',
      body: JSON.stringify({
        answers: {
          1: 'A', // Correct (+4)
          2: 'B', // Correct (+4)
          3: 'C', // Wrong (-1, correct is B)
        },
        studentName: 'Aarav Sharma',
        timeSpentSeconds: 240,
      }),
    });
    assert(submitRes.status === 201, 'Submission accepted with 201 Created');
    assert(submitRes.data?.data?.score === 7, 'Score correctly evaluated (+4 + 4 - 1 = 7 marks)');
    assert(submitRes.data?.data?.correctCount === 2, 'Evaluated correct count is 2');
    assert(submitRes.data?.data?.wrongCount === 1, 'Evaluated wrong count is 1');

    // 7. Validation: Reject Invalid JSON / Missing Title / Empty Questions
    console.log('\n--- 7. Testing Schema Validation: Missing Required Fields ---');
    const invalidPayload = {
      title: 'X', // Too short (min 3)
      questions: [], // Empty
    };
    const badPreviewRes = await request('/admin/tests/import-preview', {
      method: 'POST',
      headers: adminHeaders,
      body: JSON.stringify(invalidPayload),
    });
    assert(badPreviewRes.status === 400, 'Payload with missing/short fields rejected with 400 Bad Request');
    assert(badPreviewRes.data?.success === false, 'success is false');
    assert(Array.isArray(badPreviewRes.data?.errors), 'Validation errors array returned');

    // 8. Validation: Reject Duplicate Question Identifiers
    console.log('\n--- 8. Testing Validation: Duplicate Question Identifiers ---');
    const dupIdPayload = {
      ...SAMPLE_IMPORT_TEMPLATE,
      slug: 'test-dup-id',
      questions: [
        { ...SAMPLE_IMPORT_TEMPLATE.questions[0], id: 'q1', order: 1 },
        { ...SAMPLE_IMPORT_TEMPLATE.questions[1], id: 'q1', order: 2 }, // Duplicate id "q1"
      ],
    };
    const dupRes = await request('/admin/tests/import-preview', {
      method: 'POST',
      headers: adminHeaders,
      body: JSON.stringify(dupIdPayload),
    });
    assert(dupRes.status === 400, 'Duplicate question id rejected with 400');
    const hasDupMsg = dupRes.data?.errors?.some((e) => (typeof e === 'string' ? e : e.message)?.includes('Duplicate question identifier'));
    assert(hasDupMsg, 'Validation error specifically cites duplicate question identifier');

    // 9. Validation: Reject Invalid Correct Answer Key (Not in Options)
    console.log('\n--- 9. Testing Validation: Invalid Correct Answer Key ---');
    const badAnswerPayload = {
      ...SAMPLE_IMPORT_TEMPLATE,
      slug: 'test-bad-answer',
      questions: [
        {
          ...SAMPLE_IMPORT_TEMPLATE.questions[0],
          id: 'q1',
          options: { A: 'First', B: 'Second', C: 'Third' },
          correctAnswer: 'Z', // Invalid: Z not in [A, B, C]
        },
      ],
    };
    const badAnsRes = await request('/admin/tests/import-preview', {
      method: 'POST',
      headers: adminHeaders,
      body: JSON.stringify(badAnswerPayload),
    });
    assert(badAnsRes.status === 400, 'Option mismatch rejected with 400');
    const hasAnsMsg = badAnsRes.data?.errors?.some((e) => (typeof e === 'string' ? e : e.message)?.includes('does not match any provided options'));
    assert(hasAnsMsg, 'Error specifies that correctAnswer does not match options');

    // 10. Security: Reject SVG with Executable Script Tags
    console.log('\n--- 10. Security Testing: Malicious SVG Script Injection ---');
    const maliciousScriptPayload = {
      ...SAMPLE_IMPORT_TEMPLATE,
      slug: 'test-xss-script',
      questions: [
        {
          ...SAMPLE_IMPORT_TEMPLATE.questions[0],
          id: 'q1',
          questionImage: {
            type: 'svg',
            data: '<svg viewBox="0 0 100 100"><script>alert("hacked")</script><circle cx="50" cy="50" r="40"/></svg>',
          },
        },
      ],
    };
    const scriptRes = await request('/admin/tests/import-preview', {
      method: 'POST',
      headers: adminHeaders,
      body: JSON.stringify(maliciousScriptPayload),
    });
    assert(scriptRes.status === 400, 'SVG with <script> tag rejected with 400');
    const hasScriptSecurityMsg = scriptRes.data?.errors?.some((e) => (typeof e === 'string' ? e : e.message)?.includes('Security violation'));
    assert(hasScriptSecurityMsg, 'Error explicitly reports security violation for forbidden tags');

    // 11. Security: Reject SVG with Event Handlers (onload, onerror)
    console.log('\n--- 11. Security Testing: Prohibited SVG Event Handlers ---');
    const maliciousEventPayload = {
      ...SAMPLE_IMPORT_TEMPLATE,
      slug: 'test-xss-event',
      questions: [
        {
          ...SAMPLE_IMPORT_TEMPLATE.questions[0],
          id: 'q1',
          questionImage: {
            type: 'svg',
            data: '<svg viewBox="0 0 100 100" onload="document.location=\'http://evil.com\'"><circle cx="50" cy="50" r="40"/></svg>',
          },
        },
      ],
    };
    const eventRes = await request('/admin/tests/import-preview', {
      method: 'POST',
      headers: adminHeaders,
      body: JSON.stringify(maliciousEventPayload),
    });
    assert(eventRes.status === 400, 'SVG with onload attribute rejected with 400');

    // 12. Security: Reject SVG with External Links / Hyperlinks
    console.log('\n--- 12. Security Testing: External Hyperlinks in SVG ---');
    const maliciousLinkPayload = {
      ...SAMPLE_IMPORT_TEMPLATE,
      slug: 'test-xss-link',
      questions: [
        {
          ...SAMPLE_IMPORT_TEMPLATE.questions[0],
          id: 'q1',
          questionImage: {
            type: 'svg',
            data: '<svg viewBox="0 0 100 100"><a href="https://phishing.site"><circle cx="50" cy="50" r="40"/></a></svg>',
          },
        },
      ],
    };
    const linkRes = await request('/admin/tests/import-preview', {
      method: 'POST',
      headers: adminHeaders,
      body: JSON.stringify(maliciousLinkPayload),
    });
    assert(linkRes.status === 400, 'SVG with external href rejected with 400');

    // 13. Security: Role Authorization Check (Non-Admin & Anonymous Blocked)
    console.log('\n--- 13. Security Testing: Admin Authorization Guard ---');
    const unauthRes = await request('/admin/tests/import-preview', {
      method: 'POST',
      body: JSON.stringify(SAMPLE_IMPORT_TEMPLATE),
    });
    assert(unauthRes.status === 401, 'Anonymous request to admin import rejected with 401 Unauthorized');

    const studentForbiddenRes = await request('/admin/tests/import-preview', {
      method: 'POST',
      headers: studentHeaders,
      body: JSON.stringify(SAMPLE_IMPORT_TEMPLATE),
    });
    assert(studentForbiddenRes.status === 403, 'Student account forbidden from admin import with 403 Forbidden');

    console.log('\n================================================================');
    console.log(`🎉 ALL ${passedTests} TEST CASES PASSED SUCCESSFULLY! (0 Failures)`);
    console.log('================================================================\n');
  } finally {
    try {
      await User.deleteMany({
        email: { $in: ['admin.import@neet.test', 'student.import@neet.test'] },
      });
      const test = await Test.findOne({ slug: 'jee-2027-physics-mechanics-drill' });
      if (test) {
        await Question.deleteMany({ testId: test._id });
        await Test.findByIdAndDelete(test._id);
      }
    } catch {}
    if (server) await new Promise((resolve) => server.close(resolve));
    await closeDatabase();
  }
}

runAllTests().catch((err) => {
  console.error('\n✕ Test Suite Terminated with Error:', err);
  if (server) server.close();
  closeDatabase();
  process.exit(1);
});
