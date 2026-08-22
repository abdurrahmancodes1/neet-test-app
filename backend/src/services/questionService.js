import mongoose from 'mongoose';
import { Question, Test } from '../models/index.js';
import { AppError } from '../utils/AppError.js';
import { TestService } from './testService.js';

export class QuestionService {
  /**
   * Get student questions for a test
   * CRITICAL: correctAnswer and explanation are NEVER returned to students
   */
  static async getQuestionsForStudent(testIdOrSlug) {
    let testId = testIdOrSlug;
    if (!mongoose.Types.ObjectId.isValid(testIdOrSlug)) {
      const test = await Test.findOne({ slug: testIdOrSlug.toLowerCase(), status: 'published' }).lean();
      if (!test) {
        throw new AppError('Test not found or not published', 404);
      }
      testId = test._id;
    } else {
      const test = await Test.findOne({ _id: testId, status: 'published' }).lean();
      if (!test) {
        throw new AppError('Test not found or not published', 404);
      }
    }

    const questions = await Question.find({ testId, status: 'active' })
      .select('order sourceQuestionNumber subject chapter topic difficulty type question options image marks negativeMarks')
      .sort({ order: 1 })
      .lean();

    return questions;
  }

  /**
   * Get admin questions for a test (includes correctAnswer and explanation)
   */
  static async getQuestionsForAdmin(testId) {
    if (!mongoose.Types.ObjectId.isValid(testId)) {
      throw new AppError('Invalid Test ID format', 400);
    }

    const questions = await Question.find({ testId })
      .select('+correctAnswer +explanation')
      .sort({ order: 1 })
      .lean();

    return questions;
  }

  /**
   * Add single or bulk questions to a test (Admin)
   */
  static async addQuestionsToTest(testId, questionsData) {
    if (!mongoose.Types.ObjectId.isValid(testId)) {
      throw new AppError('Invalid Test ID format', 400);
    }

    const test = await Test.findById(testId);
    if (!test) {
      throw new AppError('Test not found', 404);
    }

    const items = Array.isArray(questionsData) ? questionsData : [questionsData];

    // Find current max order
    const lastQuestion = await Question.findOne({ testId }).sort({ order: -1 }).lean();
    let currentOrder = lastQuestion ? lastQuestion.order : 0;

    const docsToInsert = items.map((q) => {
      currentOrder += 1;
      return {
        ...q,
        testId,
        order: q.order || currentOrder,
      };
    });

    const inserted = await Question.insertMany(docsToInsert);
    await TestService.updateTestStats(testId);

    return inserted;
  }

  /**
   * Update a question (Admin)
   */
  static async updateQuestion(questionId, updateData) {
    if (!mongoose.Types.ObjectId.isValid(questionId)) {
      throw new AppError('Invalid Question ID format', 400);
    }

    const question = await Question.findByIdAndUpdate(questionId, updateData, {
      new: true,
      runValidators: true,
    }).select('+correctAnswer +explanation');

    if (!question) {
      throw new AppError('Question not found', 404);
    }

    return question;
  }

  /**
   * Delete a question (Admin)
   */
  static async deleteQuestion(questionId) {
    if (!mongoose.Types.ObjectId.isValid(questionId)) {
      throw new AppError('Invalid Question ID format', 400);
    }

    const question = await Question.findByIdAndDelete(questionId);
    if (!question) {
      throw new AppError('Question not found', 404);
    }

    await TestService.updateTestStats(question.testId);

    return question;
  }
}
