import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDatabase, closeDatabase } from '../config/database.js';
import { Result, User } from '../models/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  const isApply = process.argv.includes('--apply');
  console.log(`=== DEDUPLICATION AUDIT & CLEANUP (Mode: ${isApply ? 'APPLY' : 'DRY RUN'}) ===\n`);

  await connectDatabase();

  const studentEmail = 'arshiyanesar26@gmail.com';
  const studentUserId = new mongoose.Types.ObjectId('6acfb0340fbcc460cd14b3ce');
  const testId = 'jee-2027-chemical-bonding-and-molecular-structure';

  // 1. Fetch all records for Arshiya and this test
  const records = await Result.find({
    $and: [
      { $or: [{ studentEmail }, { userId: studentUserId }] },
      { testId },
    ],
  })
    .sort({ createdAt: 1 })
    .lean();

  console.log(`Examined ${records.length} records matching student "${studentEmail}" and test "${testId}".`);

  if (records.length === 0) {
    console.log('No records found.');
    await closeDatabase();
    return;
  }

  // Ensure backup directory exists
  const backupDir = path.resolve(__dirname, '../../data');
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }

  const backupFilePath = path.join(
    backupDir,
    `backup_arshiya_results_${Date.now()}.json`
  );

  // 2. Create full backup of all examined records
  fs.writeFileSync(backupFilePath, JSON.stringify(records, null, 2), 'utf8');
  console.log(`✓ Full backup of all ${records.length} records saved to:`);
  console.log(`  ${backupFilePath}\n`);

  // 3. Classify records
  const primaryRecord = records[0];
  console.log('--- PRIMARY LEGITIMATE ATTEMPT TO RETAIN ---');
  console.log(`ID: ${primaryRecord._id}`);
  console.log(`Attempt ID: ${primaryRecord.attemptId}`);
  console.log(`Submitted At: ${primaryRecord.submittedAt || primaryRecord.createdAt}`);
  console.log(`Score: ${primaryRecord.score} / ${primaryRecord.maxScore}`);
  console.log(`Accuracy: ${primaryRecord.accuracy}% (${primaryRecord.correctCount} correct, ${primaryRecord.wrongCount} wrong, ${primaryRecord.unattemptedCount} skipped)`);
  console.log(`Answer Keys: ${Object.keys(primaryRecord.answers || {}).length}`);

  const primaryAnswersStr = JSON.stringify(primaryRecord.answers || {});

  const confirmedDuplicates = [];
  const differentRecords = [];

  for (let i = 1; i < records.length; i++) {
    const r = records[i];
    const isSameTest = r.testId === primaryRecord.testId;
    const isSameScore = r.score === primaryRecord.score && r.maxScore === primaryRecord.maxScore;
    const isSameCounts = r.correctCount === primaryRecord.correctCount && r.wrongCount === primaryRecord.wrongCount;
    const isSameAnswers = JSON.stringify(r.answers || {}) === primaryAnswersStr;
    const timeDiffMs = new Date(r.createdAt).getTime() - new Date(primaryRecord.createdAt).getTime();

    // Must match test, score, question breakdown, exact answers, and be within the burst window
    if (isSameTest && isSameScore && isSameCounts && isSameAnswers && timeDiffMs < 300000) {
      confirmedDuplicates.push(r);
    } else {
      differentRecords.push(r);
    }
  }

  console.log('\n--- CLASSIFICATION RESULTS ---');
  console.log(`Total Records Examined:    ${records.length}`);
  console.log(`Primary Records Retained:  1`);
  console.log(`Confirmed Burst Duplicates: ${confirmedDuplicates.length}`);
  console.log(`Different/Separate Tests:   ${differentRecords.length}`);

  if (differentRecords.length > 0) {
    console.warn(`WARNING: Found ${differentRecords.length} records that do NOT match duplicate criteria:`);
    differentRecords.forEach((dr) => {
      console.log(`  ID: ${dr._id}, Test: ${dr.testId}, Score: ${dr.score}, Created: ${dr.createdAt}`);
    });
  }

  if (isApply) {
    if (confirmedDuplicates.length > 0) {
      const duplicateIds = confirmedDuplicates.map((d) => d._id);
      const deleteResult = await Result.deleteMany({ _id: { $in: duplicateIds } });
      console.log(`\n✓ SUCCESS: Deleted ${deleteResult.deletedCount} duplicate records from MongoDB.`);

      const remaining = await Result.countDocuments({ studentEmail });
      console.log(`✓ Verified: Remaining results for ${studentEmail}: ${remaining}`);
    } else {
      console.log('\nNo duplicate records to delete.');
    }
  } else {
    console.log('\n[DRY RUN ONLY] No records were deleted.');
    console.log('To execute cleanup, run: node backend/src/scripts/deduplicateResults.js --apply');
  }

  await closeDatabase();
}

main().catch((err) => {
  console.error('Deduplication failed:', err);
  process.exit(1);
});
