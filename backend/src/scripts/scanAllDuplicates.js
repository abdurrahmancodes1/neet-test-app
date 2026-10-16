import mongoose from 'mongoose';
import { connectDatabase, closeDatabase } from '../config/database.js';
import { User, Result } from '../models/index.js';

async function main() {
  console.log('Connecting to database...');
  await connectDatabase();

  const totalResults = await Result.countDocuments();
  console.log(`Total results in database: ${totalResults}`);

  // Group by studentEmail + testId, or userId + testId
  const allResults = await Result.find()
    .select('_id userId studentEmail studentName testId testTitle score accuracy correctCount wrongCount submittedAt createdAt attemptId autoSubmitted')
    .sort({ createdAt: 1 })
    .lean();

  const clusters = {};
  for (const r of allResults) {
    const email = (r.studentEmail || r.userId?.toString() || 'unknown').toLowerCase().trim();
    const test = r.testId || r.testTitle;
    const key = `${email} || ${test}`;
    if (!clusters[key]) {
      clusters[key] = [];
    }
    clusters[key].push(r);
  }

  console.log(`\nFound ${Object.keys(clusters).length} student-test pairs:`);
  for (const [key, records] of Object.entries(clusters)) {
    if (records.length > 1) {
      console.log(`\n[MULTIPLE RECORDS] ${key}: ${records.length} records`);
      // Check if they have identical scores/accuracy/counts within a tight window
      const first = records[0];
      const last = records[records.length - 1];
      const timespanSec = (new Date(last.createdAt) - new Date(first.createdAt)) / 1000;
      console.log(`  Timespan: ${timespanSec.toFixed(1)}s, Score: ${first.score}, autoSubmitted: ${first.autoSubmitted}`);
    } else {
      console.log(`[OK] ${key}: 1 record`);
    }
  }

  await closeDatabase();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
