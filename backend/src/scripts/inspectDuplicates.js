import mongoose from 'mongoose';
import { connectDatabase, closeDatabase } from '../config/database.js';
import { User, Result, LiveSession } from '../models/index.js';

async function main() {
  console.log('Connecting to database...');
  await connectDatabase();

  const studentEmail = 'arshiyanesar26@gmail.com';
  const studentUserId = new mongoose.Types.ObjectId('6acfb0340fbcc460cd14b3ce');

  console.log(`\nQuerying results for userId: ${studentUserId} or email: ${studentEmail}`);

  // Count documents
  const count = await Result.countDocuments({
    $or: [{ userId: studentUserId }, { studentEmail: studentEmail }],
  });
  console.log(`TOTAL Result documents in MongoDB for Arshiya Nesar: ${count}`);

  // Fetch with lean projection
  const results = await Result.find({
    $or: [{ userId: studentUserId }, { studentEmail: studentEmail }],
  })
    .select(
      '_id userId attemptId testId testTitle score maxScore accuracy correctCount wrongCount unattemptedCount submittedAt createdAt updatedAt autoSubmitted timeSpentSeconds'
    )
    .sort({ createdAt: 1 })
    .lean();

  console.log(`Fetched ${results.length} records.`);

  // Group by testId and testTitle
  const byTest = {};
  for (const r of results) {
    const key = `${r.testId} || ${r.testTitle}`;
    if (!byTest[key]) {
      byTest[key] = [];
    }
    byTest[key].push(r);
  }

  for (const [key, list] of Object.entries(byTest)) {
    console.log(`\n========================================`);
    console.log(`Test: ${key}`);
    console.log(`Count of records: ${list.length}`);

    // Analyze uniqueness
    const attemptIds = new Set(list.map((r) => r.attemptId));
    const createdAts = new Set(list.map((r) => r.createdAt?.toISOString()));
    const submittedAts = new Set(list.map((r) => r.submittedAt?.toISOString()));
    const scores = new Set(list.map((r) => `${r.score}/${r.maxScore} (acc: ${r.accuracy}%, cor: ${r.correctCount}, wrg: ${r.wrongCount})`));

    console.log(`Distinct attemptIds (${attemptIds.size}):`, Array.from(attemptIds).slice(0, 10));
    console.log(`Distinct createdAts (${createdAts.size}):`, Array.from(createdAts).slice(0, 5));
    console.log(`Distinct submittedAts (${submittedAts.size}):`, Array.from(submittedAts).slice(0, 5));
    console.log(`Distinct score/counts (${scores.size}):`, Array.from(scores));

    // First record:
    console.log('\n--- First Record ---');
    console.log(list[0]);

    // Second record:
    if (list.length > 1) {
      console.log('\n--- Second Record ---');
      console.log(list[1]);
    }

    // Last record:
    if (list.length > 2) {
      console.log('\n--- Last Record ---');
      console.log(list[list.length - 1]);
    }

    // Check time diff between records
    if (list.length >= 2) {
      const t0 = new Date(list[0].createdAt).getTime();
      const t1 = new Date(list[1].createdAt).getTime();
      const tLast = new Date(list[list.length - 1].createdAt).getTime();
      console.log(`\nTime delta t1 - t0: ${t1 - t0} ms`);
      console.log(`Total timespan across all ${list.length} records: ${(tLast - t0) / 1000} seconds (${((tLast - t0) / 60000).toFixed(2)} minutes)`);
      
      // Calculate rate of creation
      const avgIntervalMs = (tLast - t0) / (list.length - 1);
      console.log(`Average creation interval: ${avgIntervalMs.toFixed(1)} ms between records!`);
    }
  }

  // Check one full record to see if answers are identical
  if (results.length >= 2) {
    const full1 = await Result.findById(results[0]._id).select('answers perQuestion metadata').lean();
    const full2 = await Result.findById(results[1]._id).select('answers perQuestion metadata').lean();
    const fullLast = await Result.findById(results[results.length - 1]._id).select('answers perQuestion metadata').lean();

    console.log('\n========================================');
    console.log('Comparing full answers and perQuestion between records:');
    console.log('Record 0 answers count:', Object.keys(full1.answers || {}).length);
    console.log('Record 1 answers count:', Object.keys(full2.answers || {}).length);
    console.log('Record Last answers count:', Object.keys(fullLast.answers || {}).length);

    const is1And2Same = JSON.stringify(full1.answers) === JSON.stringify(full2.answers);
    const is1AndLastSame = JSON.stringify(full1.answers) === JSON.stringify(fullLast.answers);
    console.log('Are answers in Record 0 and Record 1 strictly IDENTICAL?:', is1And2Same);
    console.log('Are answers in Record 0 and Record Last strictly IDENTICAL?:', is1AndLastSame);
    console.log('Metadata sample:', results[0].metadata);
  }

  await closeDatabase();
}

main().catch((err) => {
  console.error('Inspection error:', err);
  process.exit(1);
});
