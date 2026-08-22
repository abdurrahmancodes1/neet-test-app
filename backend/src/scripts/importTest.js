import fs from 'node:fs';
import path from 'node:path';
import { connectDatabase, closeDatabase } from '../config/database.js';
import { TestImportService } from '../services/testImportService.js';
import { Test, Question } from '../models/index.js';

async function runImport(filePath) {
  const absolutePath = path.resolve(process.cwd(), filePath);
  console.log('====================================================');
  console.log(`📥 Importing NEET Test from: ${absolutePath}`);
  console.log('====================================================\n');

  if (!fs.existsSync(absolutePath)) {
    console.error(`✕ Error: Payload file not found at ${absolutePath}`);
    process.exit(1);
  }

  let rawContent;
  let jsonPayload;
  try {
    rawContent = fs.readFileSync(absolutePath, 'utf8');
    jsonPayload = JSON.parse(rawContent);
  } catch (err) {
    console.error(`✕ Failed to read or parse JSON payload: ${err.message}`);
    process.exit(1);
  }

  await connectDatabase();

  try {
    const report = await TestImportService.importTest(jsonPayload, {
      publishImmediately: true,
      overrideExisting: true,
    });

    console.log('\n✓ Test Successfully Imported into MongoDB!');
    console.log('----------------------------------------------------');
    console.log(`  • Test Title:     ${report.test.title}`);
    console.log(`  • Test ID:        ${report.test.id}`);
    console.log(`  • Slug:           ${report.test.slug}`);
    console.log(`  • Private Passcode: ${report.test.testCode}`);
    console.log(`  • Subjects:       ${report.test.subjects.join(', ')}`);
    console.log(`  • Questions:      ${report.test.totalQuestions}`);
    console.log(`  • Duration:       ${report.test.durationMinutes} minutes`);
    console.log(`  • Total Marks:    ${report.test.totalMarks}`);
    console.log(`  • Status:         ${report.test.status}`);

    if (report.inferred.length > 0) {
      console.log('\nInferred Metadata Defaults:');
      report.inferred.forEach((msg) => console.log(`  ℹ ${msg}`));
    }

    // Verify insertion in database
    const verifyDoc = await Test.findById(report.test.id).lean();
    const qCount = await Question.countDocuments({ testId: report.test.id });
    console.log(`\n✓ Verified in MongoDB: Test "${verifyDoc.title}" with ${qCount} questions.`);
    console.log('====================================================\n');
  } catch (error) {
    console.error(`\n✕ Import Failed: ${error.message}`);
    if (error.errors) {
      console.error('Details:', error.errors);
    }
    process.exit(1);
  } finally {
    await closeDatabase();
  }
}

const targetFile = process.argv[2];
if (!targetFile) {
  console.log('Usage: node src/scripts/importTest.js <path-to-test-json>');
  process.exit(1);
}

runImport(targetFile);
