import mongoose from 'mongoose';
import { Result, Test, Question, User, LiveSession } from '../models/index.js';
import { AppError } from '../utils/AppError.js';
import { ScoringService } from './scoringService.js';

export class ResultService {
  /**
   * Evaluates student answers, creates and stores the Result record
   */
  static async submitExam({
    testIdOrSlug,
    testTitle = null,
    answers = {},
    markedForReview = [],
    studentName = 'Anonymous Student',
    studentEmail = null,
    studentRollNumber = null,
    userId = null,
    attemptId = null,
    autoSubmitted = false,
    timeSpentSeconds = 0,
    startTime = null,
  }) {
    let test;
    if (mongoose.Types.ObjectId.isValid(testIdOrSlug)) {
      test = await Test.findById(testIdOrSlug).lean();
    } else {
      test = await Test.findOne({ slug: testIdOrSlug.toLowerCase() }).lean();
    }

    if (!test) {
      throw new AppError('Test not found', 404);
    }

    const cleanEmail = (studentEmail || '').toLowerCase().trim();
    let effectiveUserId = userId || null;
    let effectiveStudentEmail = cleanEmail || null;

    if (!effectiveUserId && effectiveStudentEmail) {
      const userDoc = await User.findOne({ email: effectiveStudentEmail }).lean();
      if (userDoc) {
        effectiveUserId = userDoc._id;
        if (!studentName || studentName === 'Anonymous Student') {
          studentName = userDoc.name;
        }
      }
    } else if (effectiveUserId && !effectiveStudentEmail) {
      const userDoc = await User.findById(effectiveUserId).lean();
      if (userDoc) {
        effectiveStudentEmail = userDoc.email.toLowerCase().trim();
        if (!studentName || studentName === 'Anonymous Student') {
          studentName = userDoc.name;
        }
      }
    }

    const effectiveAttemptId =
      attemptId || `attempt_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;

    // 1. Primary Idempotency Check: if attemptId is already recorded, return the existing result
    if (attemptId) {
      const existing = await Result.findOne({ attemptId }).lean();
      if (existing) {
        // Ownership guard: prevent student hijacking another student's attempt
        if (
          effectiveUserId &&
          existing.userId &&
          existing.userId.toString() !== effectiveUserId.toString()
        ) {
          throw new AppError('Access denied: attempt ID belongs to another student', 403);
        }
        return this.formatResultResponse(existing, test);
      }
    }

    // Retrieve questions WITH protected correctAnswer and explanation
    const questions = await Question.find({ testId: test._id, status: 'active' })
      .select('+correctAnswer +explanation')
      .sort({ order: 1 })
      .lean();

    if (questions.length === 0) {
      throw new AppError('Cannot submit exam for a test with 0 questions', 400);
    }

    // Evaluate answers securely on server
    const evaluation = ScoringService.evaluateSubmission(
      questions,
      answers,
      test.markingScheme || { correct: 4, wrong: -1, unattempted: 0 }
    );

    // 2. Burst Duplicate Guard: check for an identical recent submission (same student, test, answers, and score within last 90 seconds)
    if (effectiveUserId || effectiveStudentEmail) {
      const recentFilter = {
        testId: { $in: [test.slug, test._id, testIdOrSlug] },
        status: 'submitted',
        createdAt: { $gte: new Date(Date.now() - 90 * 1000) },
      };
      if (effectiveUserId) {
        recentFilter.userId = effectiveUserId;
      } else {
        recentFilter.studentEmail = effectiveStudentEmail;
      }

      const recentMatches = await Result.find(recentFilter).sort({ createdAt: -1 }).limit(5).lean();
      for (const rm of recentMatches) {
        if (rm.attemptId === effectiveAttemptId) {
          return this.formatResultResponse(rm, test);
        }
        if (rm.score === evaluation.score && (rm.correctCount ?? 0) === evaluation.correctCount) {
          const rmAnswers = rm.answers;
          const evalAnswers = evaluation.evaluatedAnswers;
          let matched = false;

          if (Array.isArray(rmAnswers) && Array.isArray(evalAnswers)) {
            if (rmAnswers.length === evalAnswers.length) {
              matched = evalAnswers.every((item, idx) => {
                const rmItem = rmAnswers[idx];
                return (item.selectedOption || null) === (rmItem?.selectedOption || null);
              });
            }
          } else if (rmAnswers && evalAnswers && typeof rmAnswers === 'object' && typeof evalAnswers === 'object') {
            const rmKeys = Object.keys(rmAnswers);
            const evalKeys = Object.keys(evalAnswers);
            matched = rmKeys.length === evalKeys.length && evalKeys.every((k) => evalAnswers[k] === rmAnswers[k]);
          }

          if (matched) {
            console.warn(`Idempotency guard: duplicate submission detected for attempt ${effectiveAttemptId}, returning existing result ${rm._id}`);
            return this.formatResultResponse(rm, test);
          }
        }
      }
    }

    const now = new Date();
    const start = startTime ? new Date(startTime) : new Date(now.getTime() - (timeSpentSeconds || 0) * 1000);
    const end = new Date(start.getTime() + (test.durationMinutes || 60) * 60 * 1000);
    const resolvedTitle = testTitle || test.title || 'NEET Practice Test';

    // 3. Persist verified result record with concurrency race protection
    let resultDoc;
    try {
      resultDoc = await Result.create({
        testId: test.slug || test._id,
        testTitle: resolvedTitle,
        userId: effectiveUserId,
        attemptId: effectiveAttemptId,
        studentName: studentName || 'Anonymous Student',
        studentEmail: effectiveStudentEmail,
        studentRollNumber: studentRollNumber || null,
        status: 'submitted',
        answers: evaluation.evaluatedAnswers,
        perQuestion: evaluation.evaluatedAnswers,
        markedForReview: markedForReview || [],
        score: evaluation.score,
        rawScore: evaluation.rawScore,
        maxScore: evaluation.maxScore,
        percentage: evaluation.percentage,
        accuracy: evaluation.accuracy,
        correctCount: evaluation.correctCount,
        wrongCount: evaluation.wrongCount,
        unattemptedCount: evaluation.unattemptedCount,
        totalQuestions: evaluation.totalQuestions,
        subjectPerformance: evaluation.subjectPerformance,
        chapterPerformance: evaluation.chapterPerformance,
        topicPerformance: evaluation.topicPerformance,
        weakestTopics: evaluation.weakestTopics,
        strongestTopics: evaluation.strongestTopics,
        startTime: start,
        endTime: end,
        submittedAt: now,
        autoSubmitted: Boolean(autoSubmitted),
        timeSpentSeconds: timeSpentSeconds || Math.round((now.getTime() - start.getTime()) / 1000),
        timeTakenMs: (timeSpentSeconds || 0) * 1000,
        metadata: {
          testTitle: resolvedTitle,
          examType: test.examType,
          category: test.category,
          perQuestion: evaluation.evaluatedAnswers,
        },
      });
    } catch (err) {
      // 4. Handle MongoDB duplicate key collision on attemptId gracefully
      if (err.code === 11000 && (err.keyPattern?.attemptId || err.message?.includes('attemptId'))) {
        console.warn(`Concurrent race detected on attemptId ${effectiveAttemptId}. Returning existing result.`);
        const existing = await Result.findOne({ attemptId: effectiveAttemptId }).lean();
        if (existing) {
          return this.formatResultResponse(existing, test);
        }
      }
      throw err;
    }

    // Clean up corresponding live session if any exists
    if (effectiveStudentEmail) {
      try {
        await LiveSession.deleteMany({
          studentEmail: effectiveStudentEmail,
          testId: { $in: [test.slug, test._id.toString(), testIdOrSlug] },
        });
      } catch (err) {
        console.warn('Could not remove live session on submission:', err.message);
      }
    }

    return this.formatResultResponse(resultDoc, test);
  }

  /**
   * Get single result by ID
   */
  static async getResultById(resultId) {
    if (!mongoose.Types.ObjectId.isValid(resultId)) {
      throw new AppError('Invalid Result ID format', 400);
    }

    const result = await Result.findById(resultId)
      .populate('testId', 'title subtitle testCode subjects chapters durationMinutes markingScheme')
      .lean();

    if (!result) {
      throw new AppError('Result not found', 404);
    }

    return result;
  }

  static formatResultResponse(resultDoc, test) {
    const id = resultDoc._id?.toString();
    const evaluatedQuestions =
      resultDoc.perQuestion && Array.isArray(resultDoc.perQuestion) && resultDoc.perQuestion.length > 0
        ? resultDoc.perQuestion
        : Array.isArray(resultDoc.answers) && resultDoc.answers.length > 0
        ? resultDoc.answers
        : [];

    return {
      resultId: id,
      _id: id,
      attemptId: resultDoc.attemptId || null,
      test: {
        id: test._id?.toString(),
        slug: test.slug,
        title: test.title,
        subtitle: test.subtitle,
        testCode: test.testCode,
        durationMinutes: test.durationMinutes,
        subjects: test.subjects,
      },
      score: resultDoc.score,
      rawScore: resultDoc.rawScore,
      maxScore: resultDoc.maxScore,
      percentage: resultDoc.percentage,
      accuracy: resultDoc.accuracy,
      correctCount: resultDoc.correctCount,
      wrongCount: resultDoc.wrongCount,
      unattemptedCount: resultDoc.unattemptedCount,
      totalQuestions: resultDoc.totalQuestions,
      subjectPerformance: resultDoc.subjectPerformance || [],
      chapterPerformance: resultDoc.chapterPerformance || [],
      topicPerformance: resultDoc.topicPerformance || [],
      weakestTopics: resultDoc.weakestTopics || [],
      strongestTopics: resultDoc.strongestTopics || [],
      answers: resultDoc.answers,
      perQuestion: evaluatedQuestions,
      autoSubmitted: Boolean(resultDoc.autoSubmitted),
      submittedAt: resultDoc.submittedAt,
      startTime: resultDoc.startTime,
      endTime: resultDoc.endTime,
    };
  }
}
