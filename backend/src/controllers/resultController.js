import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ResultService } from '../services/resultService.js';
import { SyncStore } from '../services/syncStore.js';
import { AppError } from '../utils/AppError.js';
import { Result } from '../models/index.js';
import mongoose from 'mongoose';

export class ResultController {
  /**
   * POST /api/results/sync - Sync a test attempt from frontend directly
   */
  static syncResult = asyncHandler(async (req, res) => {
    const attempt = req.body;
    if (!attempt) {
      throw new AppError('Attempt data is required for sync', 400);
    }

    const cleanAttempt = {
      id: attempt.id || `sync_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      attemptId: attempt.id || attempt.attemptId,
      studentName: attempt.studentName || req.user?.name || 'Anonymous Student',
      studentEmail: attempt.studentEmail || req.user?.email || attempt.email || null,
      studentRollNumber: attempt.studentRollNumber || req.user?.rollNumber || null,
      testId: attempt.testId || 'neet-work-energy-power',
      testTitle: attempt.testTitle || 'NEET 2027: Work, Energy and Power',
      score: attempt.score ?? 0,
      maxScore: attempt.maxScore ?? 240,
      accuracy: attempt.accuracy ?? 0,
      percentage: attempt.percentage ?? 0,
      correct: attempt.correct ?? attempt.correctCount ?? 0,
      wrong: attempt.wrong ?? attempt.wrongCount ?? 0,
      unattempted: attempt.unattempted ?? attempt.unattemptedCount ?? 0,
      totalQuestions: attempt.totalQuestions ?? 60,
      topicPerformance: attempt.topicPerformance || [],
      answers: attempt.answers || {},
      timeSpentSeconds: attempt.timeSpentSeconds || 0,
      timestamp: attempt.timestamp || new Date().toISOString(),
    };

    // Save to SyncStore
    SyncStore.saveResult(cleanAttempt);

    // Save to MongoDB if connected
    if (mongoose.connection.readyState === 1) {
      try {
        await Result.findOneAndUpdate(
          { attemptId: cleanAttempt.attemptId },
          {
            testId: mongoose.Types.ObjectId.isValid(cleanAttempt.testId)
              ? cleanAttempt.testId
              : new mongoose.Types.ObjectId('000000000000000000000001'),
            userId: req.user?._id || null,
            attemptId: cleanAttempt.attemptId,
            studentName: cleanAttempt.studentName,
            studentRollNumber: cleanAttempt.studentRollNumber,
            status: 'submitted',
            score: cleanAttempt.score,
            maxScore: cleanAttempt.maxScore,
            percentage: cleanAttempt.percentage,
            accuracy: cleanAttempt.accuracy,
            correctCount: cleanAttempt.correct,
            wrongCount: cleanAttempt.wrong,
            unattemptedCount: cleanAttempt.unattempted,
            totalQuestions: cleanAttempt.totalQuestions,
            startTime: new Date(Date.now() - (cleanAttempt.timeSpentSeconds || 0) * 1000),
            endTime: new Date(),
            submittedAt: new Date(cleanAttempt.timestamp),
          },
          { upsert: true, new: true }
        );
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
          studentEmail: r.userId?.email || null,
          rollNumber: r.studentRollNumber || r.userId?.rollNumber || null,
          score: r.score,
          maxScore: r.maxScore || 240,
          accuracy: Math.round(r.accuracy || 0),
          correct: r.correctCount || 0,
          wrong: r.wrongCount || 0,
          unattempted: r.unattemptedCount || 0,
          totalQuestions: r.totalQuestions || 60,
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
        score: r.score,
        maxScore: r.maxScore || 240,
        accuracy: Math.round(r.accuracy || 0),
        correct: r.correct || r.correctCount || 0,
        wrong: r.wrong || r.wrongCount || 0,
        unattempted: r.unattempted || r.unattemptedCount || 0,
        totalQuestions: r.totalQuestions || 60,
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

    return ApiResponse.success(res, 'Result retrieved successfully', result);
  });
}
