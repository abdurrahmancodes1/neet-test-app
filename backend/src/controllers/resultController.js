import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ResultService } from '../services/resultService.js';
import { SyncStore } from '../services/syncStore.js';
import { AppError } from '../utils/AppError.js';
import { User, Result, LiveSession } from '../models/index.js';
import mongoose from 'mongoose';

export class ResultController {
  /**
   * POST /api/results/live-sync - Real-time auto-save of in-progress test sessions
   */
  static syncLiveSession = asyncHandler(async (req, res) => {
    const sessionData = req.body;
    if (!sessionData || !sessionData.testId) {
      throw new AppError('Live session testId and data are required', 400);
    }

    const cleanEmail = (sessionData.studentEmail || req.user?.email || '').toLowerCase().trim();
    const sessionId = sessionData.sessionId || `${cleanEmail || 'guest'}_${sessionData.testId}`;

    const cleanLiveSession = {
      sessionId,
      testId: sessionData.testId,
      testTitle: sessionData.testTitle || 'NEET Practice Test',
      studentEmail: cleanEmail || null,
      studentName: sessionData.studentName || req.user?.name || 'Candidate',
      studentRollNumber: sessionData.studentRollNumber || req.user?.rollNumber || null,
      status: 'in_progress',
      answers: sessionData.answers || {},
      markedForReview: sessionData.markedForReview || [],
      visited: sessionData.visited || [],
      currentQuestion: sessionData.currentQuestion || 0,
      durationMinutes: sessionData.durationMinutes || 120,
      startTime: sessionData.startTime || Date.now(),
      endTime: sessionData.endTime || Date.now() + 120 * 60 * 1000,
      lastActiveAt: new Date(),
      answeredCount: sessionData.answeredCount || Object.keys(sessionData.answers || {}).length,
      score: sessionData.score ?? 0,
      rawScore: sessionData.rawScore ?? 0,
      maxScore: sessionData.maxScore ?? 240,
      percentage: sessionData.percentage ?? 0,
      accuracy: sessionData.accuracy ?? 0,
      correct: sessionData.correct ?? 0,
      wrong: sessionData.wrong ?? 0,
      unattempted: sessionData.unattempted ?? 0,
      totalQuestions: sessionData.totalQuestions ?? 0,
      perQuestion: sessionData.perQuestion || [],
      topicPerformance: sessionData.topicPerformance || [],
      weakestTopics: sessionData.weakestTopics || [],
      strongestTopics: sessionData.strongestTopics || [],
      timeTakenMs: sessionData.timeTakenMs || 0,
      autoSubmitted: false,
    };

    // 1. Save to SyncStore
    SyncStore.saveLiveSession(cleanLiveSession);

    // 2. Save to MongoDB if connected
    if (mongoose.connection.readyState === 1) {
      try {
        let effectiveUserId = req.user?._id || null;
        if (!effectiveUserId && cleanEmail) {
          const userDoc = await User.findOne({ email: cleanEmail });
          if (userDoc) {
            effectiveUserId = userDoc._id;
          }
        }

        await LiveSession.findOneAndUpdate(
          { sessionId },
          {
            ...cleanLiveSession,
            userId: effectiveUserId,
          },
          { upsert: true, new: true, setDefaultsOnInsert: true }
        );
      } catch (err) {
        console.warn('Could not sync live session directly to MongoDB, saved to memory store:', err.message);
      }
    }

    return ApiResponse.success(res, 'Live session synchronized', cleanLiveSession, 200);
  });

  /**
   * GET /api/results/live-session/:testId - Fetch active live test session for resumption
   */
  static getLiveSession = asyncHandler(async (req, res) => {
    const { testId } = req.params;
    const studentEmail = (req.query.email || req.user?.email || '').toLowerCase().trim();

    if (!studentEmail) {
      return ApiResponse.success(res, 'No student email provided', null, 200);
    }

    let activeSession = null;

    if (mongoose.connection.readyState === 1) {
      try {
        activeSession = await LiveSession.findOne({
          studentEmail,
          testId,
          status: 'in_progress',
        }).lean();
      } catch (err) {
        console.warn('Failed to fetch live session from MongoDB:', err.message);
      }
    }

    if (!activeSession) {
      activeSession = SyncStore.findLiveSession(studentEmail, testId);
    }

    return ApiResponse.success(res, 'Live session retrieved', activeSession, 200);
  });

  /**
   * DELETE /api/results/live-session/:testId - Clear live session upon manual retake or cancel
   */
  static clearLiveSession = asyncHandler(async (req, res) => {
    const { testId } = req.params;
    const studentEmail = (req.query.email || req.user?.email || '').toLowerCase().trim();

    if (studentEmail) {
      SyncStore.removeLiveSession(studentEmail, testId);
      if (mongoose.connection.readyState === 1) {
        try {
          await LiveSession.deleteMany({ studentEmail, testId });
        } catch (err) {
          console.warn('Could not delete live session from MongoDB:', err.message);
        }
      }
    }

    return ApiResponse.success(res, 'Live session cleared', null, 200);
  });

  /**
   * POST /api/results/sync - Sync completed test attempt from frontend directly
   */
  static syncResult = asyncHandler(async (req, res) => {
    const attempt = req.body;
    if (!attempt) {
      throw new AppError('Attempt data is required for sync', 400);
    }

    const cleanEmail = (attempt.studentEmail || req.user?.email || attempt.email || '').toLowerCase().trim();
    const cleanAttempt = {
      id: attempt.id || `sync_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      attemptId: attempt.id || attempt.attemptId,
      studentName: attempt.studentName || req.user?.name || 'Anonymous Student',
      studentEmail: cleanEmail || null,
      studentRollNumber: attempt.studentRollNumber || req.user?.rollNumber || null,
      testId: attempt.testId || 'neet-work-energy-power',
      testTitle: attempt.testTitle || 'NEET Practice Test',
      score: attempt.score ?? 0,
      rawScore: attempt.rawScore ?? attempt.score ?? 0,
      maxScore: attempt.maxScore ?? 240,
      accuracy: attempt.accuracy ?? 0,
      percentage: attempt.percentage ?? 0,
      correct: attempt.correct ?? attempt.correctCount ?? 0,
      wrong: attempt.wrong ?? attempt.wrongCount ?? 0,
      unattempted: attempt.unattempted ?? attempt.unattemptedCount ?? 0,
      totalQuestions: attempt.totalQuestions ?? 60,
      topicPerformance: attempt.topicPerformance || [],
      perQuestion: attempt.perQuestion || [],
      answers: attempt.answers || {},
      weakestTopics: attempt.weakestTopics || [],
      strongestTopics: attempt.strongestTopics || [],
      timeSpentSeconds: attempt.timeSpentSeconds || 0,
      timeTakenMs: attempt.timeTakenMs || (attempt.timeSpentSeconds ? attempt.timeSpentSeconds * 1000 : 0),
      timestamp: attempt.timestamp || new Date().toISOString(),
      autoSubmitted: Boolean(attempt.autoSubmitted),
    };

    // 1. Save to SyncStore
    SyncStore.saveResult(cleanAttempt);

    // 2. Clear any active live session in SyncStore
    if (cleanEmail && cleanAttempt.testId) {
      SyncStore.removeLiveSession(cleanEmail, cleanAttempt.testId);
    }

    // 3. Save to MongoDB if connected
    if (mongoose.connection.readyState === 1) {
      try {
        let effectiveUserId = req.user?._id || null;
        if (!effectiveUserId && cleanAttempt.studentEmail) {
          const userDoc = await User.findOne({ email: cleanAttempt.studentEmail });
          if (userDoc) {
            effectiveUserId = userDoc._id;
          }
        }

        // Upsert Result document
        await Result.findOneAndUpdate(
          { attemptId: cleanAttempt.attemptId },
          {
            testId: cleanAttempt.testId,
            testTitle: cleanAttempt.testTitle,
            userId: effectiveUserId,
            attemptId: cleanAttempt.attemptId,
            studentName: cleanAttempt.studentName,
            studentEmail: cleanAttempt.studentEmail,
            studentRollNumber: cleanAttempt.studentRollNumber,
            status: 'submitted',
            score: cleanAttempt.score,
            rawScore: cleanAttempt.rawScore,
            maxScore: cleanAttempt.maxScore,
            percentage: cleanAttempt.percentage,
            accuracy: cleanAttempt.accuracy,
            correctCount: cleanAttempt.correct,
            wrongCount: cleanAttempt.wrong,
            unattemptedCount: cleanAttempt.unattempted,
            totalQuestions: cleanAttempt.totalQuestions,
            answers: cleanAttempt.answers,
            perQuestion: cleanAttempt.perQuestion,
            topicPerformance: cleanAttempt.topicPerformance,
            weakestTopics: cleanAttempt.weakestTopics,
            strongestTopics: cleanAttempt.strongestTopics,
            timeTakenMs: cleanAttempt.timeTakenMs,
            timeSpentSeconds: cleanAttempt.timeSpentSeconds,
            startTime: new Date(Date.now() - (cleanAttempt.timeTakenMs || 0)),
            endTime: new Date(),
            submittedAt: new Date(cleanAttempt.timestamp),
            autoSubmitted: cleanAttempt.autoSubmitted,
            metadata: {
              testTitle: cleanAttempt.testTitle,
              answers: cleanAttempt.answers,
              perQuestion: cleanAttempt.perQuestion,
              topicPerformance: cleanAttempt.topicPerformance,
              timeTakenMs: cleanAttempt.timeTakenMs,
            },
          },
          { upsert: true, new: true, setDefaultsOnInsert: true }
        );

        // Remove live session from MongoDB
        if (cleanEmail && cleanAttempt.testId) {
          await LiveSession.deleteMany({
            studentEmail: cleanEmail,
            testId: cleanAttempt.testId,
          });
        }
      } catch (err) {
        console.warn('Could not sync result directly to MongoDB, saved to fallback store:', err.message);
      }
    }

    return ApiResponse.success(res, 'Attempt synchronized successfully', cleanAttempt, 201);
  });

  /**
   * GET /api/results/all - List all submitted results across all students
   */
  static getAllResults = asyncHandler(async (req, res) => {
    const isMongoConnected = mongoose.connection.readyState === 1;
    let results = [];

    if (isMongoConnected) {
      try {
        const dbResults = await Result.find({ status: 'submitted' })
          .populate('userId', 'name email rollNumber')
          .sort({ createdAt: -1 })
          .limit(100)
          .lean();

        results = dbResults.map((r) => ({
          id: r._id.toString(),
          attemptId: r.attemptId,
          studentName: r.studentName || r.userId?.name || 'Anonymous Student',
          studentEmail: r.studentEmail || r.userId?.email || null,
          rollNumber: r.studentRollNumber || r.userId?.rollNumber || null,
          testId: r.testId,
          testTitle: r.testTitle || r.metadata?.testTitle || 'NEET Practice Test',
          score: r.score,
          maxScore: r.maxScore || 240,
          accuracy: Math.round(r.accuracy || 0),
          correct: r.correctCount || 0,
          wrong: r.wrongCount || 0,
          unattempted: r.unattemptedCount || 0,
          totalQuestions: r.totalQuestions || 60,
          timeTakenMs: r.timeTakenMs || r.metadata?.timeTakenMs || 0,
          answers: r.answers || r.metadata?.answers || {},
          perQuestion: r.perQuestion || r.metadata?.perQuestion || [],
          topicPerformance: r.topicPerformance || r.metadata?.topicPerformance || [],
          submittedAt: r.submittedAt || r.createdAt,
        }));
      } catch (err) {
        console.error('Failed to query all results from MongoDB:', err);
      }
    }

    if (results.length === 0) {
      results = SyncStore.getResults().map((r) => ({
        id: r.id,
        attemptId: r.attemptId,
        studentName: r.studentName || 'Anonymous Student',
        studentEmail: r.studentEmail || null,
        rollNumber: r.studentRollNumber || null,
        testId: r.testId,
        testTitle: r.testTitle || 'NEET Practice Test',
        score: r.score,
        maxScore: r.maxScore || 240,
        accuracy: Math.round(r.accuracy || 0),
        correct: r.correct || r.correctCount || 0,
        wrong: r.wrong || r.wrongCount || 0,
        unattempted: r.unattempted || r.unattemptedCount || 0,
        totalQuestions: r.totalQuestions || 60,
        timeTakenMs: r.timeTakenMs || 0,
        answers: r.answers || {},
        perQuestion: r.perQuestion || [],
        topicPerformance: r.topicPerformance || [],
        submittedAt: r.timestamp || r.submittedAt,
      }));
    }

    return ApiResponse.success(res, 'All submitted results retrieved', results, 200, {
      total: results.length,
    });
  });

  /**
   * GET /api/results/:resultId - Get result details by ID with access authorization check
   */
  static getResult = asyncHandler(async (req, res) => {
    const { resultId } = req.params;
    const result = await ResultService.getResultById(resultId);

    // Private result authorization check
    if (result.userId) {
      const requester = req.user;
      const isOwner = requester && requester._id?.toString() === result.userId?.toString();
      const isAdmin = requester && requester.role === 'admin';

      if (!isOwner && !isAdmin) {
        throw new AppError('Access denied: You do not have permission to view this private result', 403);
      }
    }

  /**
   * GET /api/results/student/:email - Get all attempts for a specific student from server
   */
  static getStudentAttempts = asyncHandler(async (req, res) => {
    const { email } = req.params;
    const cleanEmail = (email || req.user?.email || '').toLowerCase().trim();
    if (!cleanEmail) {
      return ApiResponse.success(res, 'No email specified', []);
    }

    let results = [];
    if (mongoose.connection.readyState === 1) {
      try {
        const userDoc = await User.findOne({ email: cleanEmail });
        const query = userDoc
          ? { $or: [{ userId: userDoc._id }, { studentEmail: cleanEmail }] }
          : { studentEmail: cleanEmail };

        const dbResults = await Result.find(query).sort({ createdAt: -1 }).lean();
        results = dbResults.map((r) => ({
          id: r._id.toString(),
          attemptId: r.attemptId,
          studentName: r.studentName || userDoc?.name || 'Student',
          studentEmail: cleanEmail,
          testId: r.testId,
          testTitle: r.testTitle || r.metadata?.testTitle || 'NEET Practice Test',
          score: r.score,
          rawScore: r.rawScore ?? r.score,
          maxScore: r.maxScore || 240,
          accuracy: Math.round(r.accuracy || 0),
          percentage: r.percentage || 0,
          correct: r.correctCount || 0,
          wrong: r.wrongCount || 0,
          unattempted: r.unattemptedCount || 0,
          totalQuestions: r.totalQuestions || 60,
          timeTakenMs: r.timeTakenMs || r.metadata?.timeTakenMs || 0,
          answers: r.answers || r.metadata?.answers || {},
          perQuestion: r.perQuestion || r.metadata?.perQuestion || [],
          topicPerformance: r.topicPerformance || r.metadata?.topicPerformance || [],
          weakestTopics: r.weakestTopics || r.metadata?.weakestTopics || [],
          strongestTopics: r.strongestTopics || r.metadata?.strongestTopics || [],
          submittedAt: r.submittedAt || r.createdAt,
          timestamp: r.submittedAt || r.createdAt,
        }));
      } catch (err) {
        console.error('Failed to get student attempts from MongoDB:', err);
      }
    }

    if (results.length === 0) {
      results = SyncStore.getResults()
        .filter((r) => (r.studentEmail || '').toLowerCase() === cleanEmail)
        .map((r) => ({
          id: r.id,
          attemptId: r.attemptId,
          studentName: r.studentName || 'Student',
          studentEmail: cleanEmail,
          testId: r.testId,
          testTitle: r.testTitle || 'NEET Practice Test',
          score: r.score,
          rawScore: r.rawScore ?? r.score,
          maxScore: r.maxScore || 240,
          accuracy: Math.round(r.accuracy || 0),
          percentage: r.percentage || 0,
          correct: r.correct || r.correctCount || 0,
          wrong: r.wrong || r.wrongCount || 0,
          unattempted: r.unattempted || r.unattemptedCount || 0,
          totalQuestions: r.totalQuestions || 60,
          timeTakenMs: r.timeTakenMs || 0,
          answers: r.answers || {},
          perQuestion: r.perQuestion || [],
          topicPerformance: r.topicPerformance || [],
          weakestTopics: r.weakestTopics || [],
          strongestTopics: r.strongestTopics || [],
          submittedAt: r.timestamp || r.submittedAt,
          timestamp: r.timestamp || r.submittedAt,
        }));
    }

    return ApiResponse.success(res, 'Student attempts retrieved', results);
  });
}
