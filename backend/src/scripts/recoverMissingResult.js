import { connectDatabase, closeDatabase } from '../config/database.js';
import { Result, LiveSession, User } from '../models/index.js';

async function recover() {
  try {
    await connectDatabase();
    console.log('--- RECOVERING MISSING LIVE SESSIONS ---');

    // 1. Recover Arshi Nesar's unsubmitted session
    const targetSessionId = 'live_khatoonsaleha775@gmail.com_neet-work-energy-power';
    const session = await LiveSession.findOne({ sessionId: targetSessionId }).lean();

    if (session) {
      console.log(`Found live session: ${session.sessionId}, score: ${session.score}`);
      const userDoc = await User.findOne({ email: session.studentEmail });

      const attemptId = `attempt_recovered_${Date.now()}`;
      const existingResult = await Result.findOne({
        $or: [
          { attemptId: { $regex: 'khatoonsaleha775' } },
          { studentEmail: session.studentEmail, testId: session.testId, score: session.score }
        ]
      });

      if (!existingResult) {
        const newResult = await Result.create({
          testId: session.testId || 'neet-work-energy-power',
          testTitle: 'NEET Practice Test - Work, Energy and Power',
          userId: userDoc?._id || session.userId,
          attemptId: 'attempt_recovered_khatoonsaleha775_neet_wep',
          studentName: session.studentName || 'Arshi Nesar',
          studentEmail: session.studentEmail || 'khatoonsaleha775@gmail.com',
          studentRollNumber: session.studentRollNumber || null,
          status: 'submitted',
          score: session.score ?? 230,
          rawScore: session.rawScore ?? 230,
          maxScore: session.maxScore ?? 240,
          percentage: session.percentage ?? Math.round((230 / 240) * 1000) / 10,
          accuracy: session.accuracy ?? 97,
          correctCount: session.correct ?? 58,
          wrongCount: session.wrong ?? 2,
          unattemptedCount: session.unattempted ?? 0,
          totalQuestions: session.totalQuestions ?? 60,
          answers: session.answers || {},
          perQuestion: session.perQuestion || [],
          topicPerformance: session.topicPerformance || [],
          weakestTopics: session.weakestTopics?.map(t => t.topic || t) || [],
          strongestTopics: session.strongestTopics?.map(t => t.topic || t) || [],
          timeTakenMs: session.timeTakenMs || 0,
          timeSpentSeconds: Math.round((session.timeTakenMs || 0) / 1000),
          startTime: new Date(session.startTime || Date.now() - 3600000),
          endTime: new Date(session.endTime || session.updatedAt || Date.now()),
          submittedAt: new Date(session.updatedAt || '2026-10-08T16:07:56.184Z'),
          autoSubmitted: false,
          metadata: {
            recoveredFromLiveSession: true,
            originalSessionId: session.sessionId,
            testTitle: 'NEET Practice Test - Work, Energy and Power',
          }
        });
        console.log(`Successfully created Result record for Arshi Nesar: ${newResult._id}`);

        // Update live session status
        await LiveSession.updateOne({ _id: session._id }, { status: 'submitted' });
        console.log('Updated live session status to submitted.');
      } else {
        console.log(`Result already recovered: ${existingResult._id}`);
      }
    } else {
      console.log('Target live session not found or already cleaned up.');
    }

    // 2. Fix historical results that have studentEmail: "undefined" or testTitle: "undefined"
    console.log('\n--- SANITIZING HISTORICAL RESULTS ---');
    const undefinedResults = await Result.find({
      $or: [
        { studentEmail: 'undefined' },
        { studentEmail: null },
        { testTitle: 'undefined' },
        { testTitle: null }
      ]
    });

    console.log(`Found ${undefinedResults.length} historical results needing sanitization.`);
    for (const r of undefinedResults) {
      const updates = {};
      
      // Fix email from userId if missing
      if (!r.studentEmail || r.studentEmail === 'undefined') {
        if (r.userId) {
          const user = await User.findById(r.userId).lean();
          if (user?.email) {
            updates.studentEmail = user.email.toLowerCase().trim();
          }
        }
      }

      // Fix testTitle if missing
      if (!r.testTitle || r.testTitle === 'undefined') {
        const titleMap = {
          'neet-work-energy-power': 'NEET - Work, Energy & Power',
          'neet-definite-indefinite-calculus': 'NEET - Definite & Indefinite Calculus',
          'neet-2026-core-mechanics-chemistry': 'NEET 2026 - Core Mechanics & Chemistry',
          'neet-mechanics-chemical-bonding-drill': 'NEET - Mechanics & Chemical Bonding Drill',
          'neet-biology-class11-core-drill': 'NEET - Biology Class 11 Core Drill',
          'jee-2027-periodic-table': 'JEE 2027 - Periodic Table & Classification',
        };
        updates.testTitle = titleMap[r.testId] || (r.testId ? r.testId.replace(/-/g, ' ').toUpperCase() : 'NEET Practice Test');
      }

      if (Object.keys(updates).length > 0) {
        await Result.updateOne({ _id: r._id }, { $set: updates });
        console.log(`Updated Result ${r._id}:`, updates);
      }
    }

    console.log('\n--- RECOVERY COMPLETE ---');
  } catch (err) {
    console.error('Recovery failed:', err);
  } finally {
    await closeDatabase();
  }
}

recover();
