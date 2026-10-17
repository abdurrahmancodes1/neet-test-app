import mongoose from 'mongoose';
import { connectDatabase, closeDatabase } from '../config/database.js';
import { Result, LiveSession } from '../models/index.js';

const historicalRecords = [
  {
    _id: new mongoose.Types.ObjectId('6ac0f70c6eb3a7971e4e8e45'),
    attemptId: 'attempt_1791029780323_09iv_arshi',
    testId: 'neet-2026-core-mechanics-chemistry',
    testTitle: 'NEET 2026 - Core Mechanics & Chemistry',
    userId: new mongoose.Types.ObjectId('6ac0dabe4fa4be5f895ec264'),
    studentName: 'Arshi Nesar',
    studentEmail: 'khatoonsaleha775@gmail.com',
    status: 'submitted',
    score: 170,
    rawScore: 170,
    maxScore: 220,
    accuracy: 85,
    percentage: 77.3,
    correctCount: 43,
    wrongCount: 3,
    unattemptedCount: 9,
    totalQuestions: 55,
    answers: {},
    perQuestion: [],
    topicPerformance: [],
    weakestTopics: [],
    strongestTopics: [],
    submittedAt: new Date('2026-10-03T12:37:08.000Z'),
    createdAt: new Date('2026-10-03T12:37:32.000Z'),
    updatedAt: new Date('2026-10-03T12:37:32.000Z'),
  },
  {
    _id: new mongoose.Types.ObjectId('6ac3e7986eb3a7971e5045bd'),
    attemptId: 'attempt_1791223679766_tqo5',
    testId: 'neet-mechanics-chemical-bonding-drill',
    testTitle: 'NEET - Mechanics & Chemical Bonding Drill',
    userId: new mongoose.Types.ObjectId('6ac0dabe4fa4be5f895ec264'),
    studentName: 'Arshi Nesar',
    studentEmail: 'khatoonsaleha775@gmail.com',
    status: 'submitted',
    score: 320,
    rawScore: 320,
    maxScore: 480,
    accuracy: 80,
    percentage: 66.7,
    correctCount: 84,
    wrongCount: 16,
    unattemptedCount: 20,
    totalQuestions: 120,
    answers: {},
    perQuestion: [],
    topicPerformance: [],
    weakestTopics: [],
    strongestTopics: [],
    submittedAt: new Date('2026-10-05T18:07:59.000Z'),
    createdAt: new Date('2026-10-05T18:08:24.000Z'),
    updatedAt: new Date('2026-10-05T18:08:24.000Z'),
  },
  {
    _id: new mongoose.Types.ObjectId('6ac4d0f26eb3a7971e511b75'),
    attemptId: 'attempt_1791283438769_dhyk',
    testId: 'neet-mechanics-chemical-bonding-drill',
    testTitle: 'NEET - Mechanics & Chemical Bonding Drill',
    userId: new mongoose.Types.ObjectId('6ac0dabe4fa4be5f895ec264'),
    studentName: 'Arshi Nesar',
    studentEmail: 'khatoonsaleha775@gmail.com',
    status: 'submitted',
    score: 4,
    rawScore: 4,
    maxScore: 480,
    accuracy: 100,
    percentage: 0.8,
    correctCount: 1,
    wrongCount: 0,
    unattemptedCount: 119,
    totalQuestions: 120,
    answers: {},
    perQuestion: [],
    topicPerformance: [],
    weakestTopics: [],
    strongestTopics: [],
    submittedAt: new Date('2026-10-06T10:43:58.000Z'),
    createdAt: new Date('2026-10-06T10:44:02.000Z'),
    updatedAt: new Date('2026-10-06T10:44:02.000Z'),
  },
  {
    _id: new mongoose.Types.ObjectId('6ac4d1296eb3a7971e511b9f'),
    attemptId: 'attempt_1791283494025_qjii',
    testId: 'neet-mechanics-chemical-bonding-drill',
    testTitle: 'NEET - Mechanics & Chemical Bonding Drill',
    userId: new mongoose.Types.ObjectId('6ac0dabe4fa4be5f895ec264'),
    studentName: 'Arshi Nesar',
    studentEmail: 'khatoonsaleha775@gmail.com',
    status: 'submitted',
    score: 4,
    rawScore: 4,
    maxScore: 480,
    accuracy: 100,
    percentage: 0.8,
    correctCount: 1,
    wrongCount: 0,
    unattemptedCount: 119,
    totalQuestions: 120,
    answers: {},
    perQuestion: [],
    topicPerformance: [],
    weakestTopics: [],
    strongestTopics: [],
    submittedAt: new Date('2026-10-06T10:44:54.000Z'),
    createdAt: new Date('2026-10-06T10:44:56.000Z'),
    updatedAt: new Date('2026-10-06T10:44:56.000Z'),
  },
  {
    _id: new mongoose.Types.ObjectId('6ad08ad97c383530b4cf52a9'),
    attemptId: 'attempt_recovered_khatoonsaleha775_neet_wep',
    testId: 'neet-work-energy-power',
    testTitle: 'NEET Practice Test - Work, Energy and Power',
    userId: new mongoose.Types.ObjectId('6ac0dabe4fa4be5f895ec264'),
    studentName: 'Arshi Nesar',
    studentEmail: 'khatoonsaleha775@gmail.com',
    status: 'submitted',
    score: 230,
    rawScore: 230,
    maxScore: 240,
    accuracy: 96.7,
    percentage: 95.8,
    correctCount: 58,
    wrongCount: 2,
    unattemptedCount: 0,
    totalQuestions: 60,
    answers: {
      '1': 'D', '2': 'B', '3': 'B', '4': 'B', '5': 'B', '6': 'A', '7': 'D', '8': 'B', '9': 'C', '10': 'B',
      '11': 'D', '12': 'D', '13': 'C', '14': 'A', '15': 'C', '16': 'A', '17': 'C', '18': 'A', '19': 'C', '20': 'D',
      '21': 'B', '22': 'C', '23': 'B', '24': 'A', '25': 'B', '26': 'D', '27': 'C', '28': 'A', '29': 'B', '30': 'C',
      '31': 'A', '32': 'B', '33': 'D', '34': 'D', '35': 'A', '36': 'D', '37': 'C', '38': 'D', '39': 'D', '40': 'A',
      '41': 'C', '42': 'D', '43': 'D', '44': 'D', '45': 'B', '46': 'C', '47': 'B', '48': 'D', '49': 'A', '50': 'A',
      '51': 'A', '52': 'A', '53': 'D', '54': 'D', '55': 'A', '56': 'B', '57': 'B', '58': 'D', '59': 'D', '60': 'A'
    },
    markedForReview: [46],
    perQuestion: [],
    topicPerformance: [],
    weakestTopics: [],
    strongestTopics: [],
    timeTakenMs: 4568267,
    timeSpentSeconds: 4568,
    startTime: new Date('2026-10-08T14:51:45.507Z'),
    endTime: new Date('2026-10-08T16:07:56.184Z'),
    submittedAt: new Date('2026-10-08T16:07:56.184Z'),
    createdAt: new Date('2026-10-08T14:51:45.886Z'),
    updatedAt: new Date('2026-10-15T08:12:09.884Z'),
  },
  {
    _id: new mongoose.Types.ObjectId('6ac4f9226eb3a7971e5176b3'),
    attemptId: 'attempt_1791293706362_cgyo',
    testId: 'neet-definite-indefinite-calculus',
    testTitle: 'NEET - Definite & Indefinite Calculus',
    userId: new mongoose.Types.ObjectId('6ac1a079a762d04f514a86ce'),
    studentName: 'Aru',
    studentEmail: 'nesaruddinmd24@gmail.com',
    status: 'submitted',
    score: 6,
    rawScore: 6,
    maxScore: 240,
    accuracy: 50,
    percentage: 2.5,
    correctCount: 2,
    wrongCount: 2,
    unattemptedCount: 56,
    totalQuestions: 60,
    answers: {},
    perQuestion: [],
    topicPerformance: [],
    weakestTopics: [],
    strongestTopics: [],
    submittedAt: new Date('2026-10-06T13:35:06.000Z'),
    createdAt: new Date('2026-10-06T13:35:30.000Z'),
    updatedAt: new Date('2026-10-06T13:35:30.000Z'),
  },
  {
    _id: new mongoose.Types.ObjectId('6ac5003e6eb3a7971e517d9e'),
    attemptId: 'attempt_1791295525422_jbob',
    testId: 'neet-biology-class11-core-drill',
    testTitle: 'NEET - Biology Class 11 Core Drill',
    userId: new mongoose.Types.ObjectId('6ac1a079a762d04f514a86ce'),
    studentName: 'Aru',
    studentEmail: 'nesaruddinmd24@gmail.com',
    status: 'submitted',
    score: 145,
    rawScore: 145,
    maxScore: 200,
    accuracy: 76.3,
    percentage: 72.5,
    correctCount: 38,
    wrongCount: 7,
    unattemptedCount: 5,
    totalQuestions: 50,
    answers: {},
    perQuestion: [],
    topicPerformance: [],
    weakestTopics: [],
    strongestTopics: [],
    submittedAt: new Date('2026-10-06T14:05:25.000Z'),
    createdAt: new Date('2026-10-06T14:05:49.000Z'),
    updatedAt: new Date('2026-10-06T14:05:49.000Z'),
  },
];

async function main() {
  await connectDatabase();
  console.log('--- RESTORING HISTORICAL TEST RESULTS ---');

  let restoredCount = 0;
  for (const record of historicalRecords) {
    const existing = await Result.findById(record._id);
    if (!existing) {
      // Also ensure attemptId does not collide
      const existingAttempt = await Result.findOne({ attemptId: record.attemptId });
      if (existingAttempt) {
        console.log(`Record with attemptId ${record.attemptId} already exists as ${existingAttempt._id}, skipping.`);
        continue;
      }
      await Result.create(record);
      restoredCount++;
      console.log(`✓ Restored: ${record._id} | ${record.studentName} (${record.studentEmail}) | ${record.testId} | Score: ${record.score}/${record.maxScore}`);
    } else {
      console.log(`Record ${record._id} already exists in DB.`);
    }
  }

  console.log(`\nTotal restored: ${restoredCount}`);

  // Also ensure LiveSession for khatoonsaleha775 is in submitted status
  await LiveSession.updateOne(
    { sessionId: 'live_khatoonsaleha775@gmail.com_neet-work-energy-power' },
    { status: 'submitted' }
  );

  const totalResults = await Result.countDocuments();
  console.log(`Current total results in MongoDB: ${totalResults}`);
  await closeDatabase();
}

main().catch((err) => {
  console.error('Restoration failed:', err);
  process.exit(1);
});
