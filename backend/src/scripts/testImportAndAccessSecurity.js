import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import http from 'http';
import app from '../app.js';
import { connectDatabase, closeDatabase } from '../config/database.js';
import { TestImportService } from '../services/testImportService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fixturePath = path.resolve(__dirname, '../../tests/fixtures/sampleNeetTest.json');
const samplePayload = JSON.parse(fs.readFileSync(fixturePath, 'utf8'));

let server;
const PORT = 5088;
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

async function runImportAndSecurityTests() {
  console.log('====================================================');
  console.log('🛡️ Starting Phase 9: Dynamic Import & Access Security Verification');
  console.log('====================================================\n');

  await connectDatabase();
  server = http.createServer(app);
  await new Promise((resolve) => server.listen(PORT, resolve));
  console.log(`Test server listening on port ${PORT}\n`);

  try {
    // 1. Import Test via Reusable Import Pipeline
    console.log('[1] Importing Test via TestImportService Pipeline');
    const importReport = await TestImportService.importTest(samplePayload, {
      publishImmediately: true,
      overrideExisting: true,
    });

    console.log(`✓ Test imported: "${importReport.test.title}" (Passcode: ${importReport.test.testCode})`);

    // 2. Fetch Public Test Listing (GET /api/tests)
    console.log('\n[2] Testing Public Test Listing (GET /api/tests)');
    const listRes = await request('/tests');
    if (listRes.status !== 200 || !Array.isArray(listRes.data.data)) {
      throw new Error('Failed to retrieve tests list');
    }

    console.log(`✓ Retrieved ${listRes.data.data.length} published tests from API.`);

    // 3. SECURITY AUDIT: Verify Absence of Sensitive Fields Across All Tests
    console.log('\n[3] Security Audit: Inspecting Public Tests Payload');
    for (const test of listRes.data.data) {
      if (test.testCode !== undefined) {
        throw new Error(`SECURITY LEAK: Test "${test.title}" exposed testCode: "${test.testCode}"`);
      }
      if (test.allowedCodes !== undefined) {
        throw new Error(`SECURITY LEAK: Test "${test.title}" exposed allowedCodes`);
      }
    }
    console.log('✓ Security Check Passed: Private testCode and allowedCodes are 100% ABSENT from public test listings!');

    // 4. Inspect Single Test Endpoint (GET /api/tests/:testId)
    const importedSlug = importReport.test.slug;
    console.log(`\n[4] Security Audit: Inspecting Single Test (GET /api/tests/${importedSlug})`);
    const singleTestRes = await request(`/tests/${importedSlug}`);
    if (singleTestRes.status !== 200) throw new Error('Failed to get single test');

    if (singleTestRes.data.data.testCode !== undefined || singleTestRes.data.data.allowedCodes !== undefined) {
      throw new Error('SECURITY LEAK: Single test endpoint leaked private test codes');
    }
    console.log('✓ Security Check Passed: Single test endpoint does NOT contain private test codes.');

    // 5. Inspect Student Questions Endpoint (GET /api/tests/:testId/questions)
    console.log(`\n[5] Security Audit: Inspecting Student Questions Feed`);
    const questionsRes = await request(`/tests/${importedSlug}/questions`);
    if (questionsRes.status !== 200 || questionsRes.data.data.length !== 3) {
      throw new Error('Failed to get student questions');
    }

    for (const q of questionsRes.data.data) {
      if (q.correctAnswer !== undefined) {
        throw new Error(`SECURITY LEAK: Question ${q.order} leaked correctAnswer`);
      }
      if (q.explanation !== undefined) {
        throw new Error(`SECURITY LEAK: Question ${q.order} leaked explanation`);
      }
    }
    console.log('✓ Security Check Passed: Student questions feed contains ZERO correctAnswer leaks.');

    // 6. Test Secure Passcode Unlock (POST /api/tests/access)
    console.log('\n[6] Testing Secure Passcode Unlock (POST /api/tests/access)');

    // Invalid passcode test
    const badCodeRes = await request('/tests/access', {
      method: 'POST',
      body: JSON.stringify({
        testId: importedSlug,
        testCode: 'WRONG-PASSCODE',
      }),
    });
    if (badCodeRes.status !== 400 || badCodeRes.data.success !== false) {
      throw new Error('Invalid test code should return 400 error');
    }
    console.log('✓ Invalid passcode rejected with 400 Bad Request.');

    // Valid passcode test
    const validCodeRes = await request('/tests/access', {
      method: 'POST',
      body: JSON.stringify({
        testId: importedSlug,
        testCode: 'NEET-THERMO',
      }),
    });

    if (validCodeRes.status !== 200 || !validCodeRes.data.data.unlocked) {
      throw new Error(`Valid passcode unlock failed: ${JSON.stringify(validCodeRes.data)}`);
    }

    if (validCodeRes.data.data.testCode !== undefined) {
      throw new Error('SECURITY LEAK: Unlock endpoint echoed back the private passcode');
    }
    console.log('✓ Valid passcode accepted and unlocked exam without echoing private code.');

    // 7. Test Student Exam Submission & Grading
    console.log('\n[7] Testing Exam Submission on Newly Imported Test (POST /api/tests/:testId/submit)');
    const submitRes = await request(`/tests/${importedSlug}/submit`, {
      method: 'POST',
      body: JSON.stringify({
        answers: {
          1: 'A', // Correct (+4)
          2: 'B', // Correct (+4)
          3: 'C', // Wrong (-1)
        },
        studentName: 'Vivek Kumar',
        timeSpentSeconds: 180,
      }),
    });

    if (submitRes.status !== 201 || !submitRes.data.success) {
      throw new Error(`Submit failed: ${JSON.stringify(submitRes.data)}`);
    }

    const subData = submitRes.data.data;
    console.log(`✓ Submission graded by server: Score ${subData.score}/${subData.maxScore} (Expected: 7/12 marks, 66.7% accuracy)`);
    if (subData.score !== 7 || subData.correctCount !== 2 || subData.wrongCount !== 1) {
      throw new Error(`Grading error: got score ${subData.score}`);
    }

    console.log('\n====================================================');
    console.log('🎉 DYNAMIC IMPORT & ACCESS SECURITY VERIFIED 100%');
    console.log('====================================================\n');
  } finally {
    if (server) await new Promise((resolve) => server.close(resolve));
    await closeDatabase();
  }
}

runImportAndSecurityTests().catch((err) => {
  console.error('\n✕ Security Verification Failed:', err);
  if (server) server.close();
  closeDatabase();
  process.exit(1);
});
