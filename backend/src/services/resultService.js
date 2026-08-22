import mongoose from 'mongoose';
import { Result, Test, Question } from '../models/index.js';
import { AppError } from '../utils/AppError.js';
import { ScoringService } from './scoringService.js';

export class ResultService {
  /**
   * Evaluates student answers, creates and stores the Result record
   */
  static async submitExam({
    testIdOrSlug,
    answers = {},
    markedForReview = [],
    studentName = 'Anonymous Student',
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

    // Check for duplicate submission if attemptId is present
    if (attemptId) {
      const existing = await Result.findOne({ attemptId }).lean();
      if (existing) {
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

    const now = new Date();
    const start = startTime ? new Date(startTime) : new Date(now.getTime() - (timeSpentSeconds || 0) * 1000);
    const end = new Date(start.getTime() + (test.durationMinutes || 60) * 60 * 1000);

    // Persist verified result record in database
    const resultDoc = await Result.create({
      testId: test._id,
      userId: userId || null,
      attemptId: attemptId || null,
      studentName: studentName || 'Anonymous Student',
      studentRollNumber: studentRollNumber || null,
      status: 'submitted',
      answers: evaluation.evaluatedAnswers,
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
    });

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
    return {
      resultId: id,
      _id: id,
      test: {
        id: test._id?.toString(),
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
      autoSubmitted: Boolean(resultDoc.autoSubmitted),
      submittedAt: resultDoc.submittedAt,
      startTime: resultDoc.startTime,
      endTime: resultDoc.endTime,
    };
  }
}
