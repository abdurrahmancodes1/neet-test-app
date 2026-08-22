import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { TestService } from '../services/testService.js';
import { QuestionService } from '../services/questionService.js';

export class AdminTestController {
  /**
   * GET /api/admin/tests - List all tests (including drafts and archived)
   */
  static listAllTests = asyncHandler(async (req, res) => {
    const { page, limit, subject, type, status, search } = req.query;
    const result = await TestService.listTests({
      page: page ? parseInt(page, 10) : 1,
      limit: limit ? parseInt(limit, 10) : 20,
      subject,
      type,
      status: status || null, // null fetches all statuses
      search,
    });

    return ApiResponse.success(res, 'Admin tests retrieved successfully', result.tests, 200, result.pagination);
  });

  /**
   * POST /api/admin/tests - Create a new test
   */
  static createTest = asyncHandler(async (req, res) => {
    const test = await TestService.createTest(req.body);
    return ApiResponse.success(res, 'Test created successfully', test, 201);
  });

  /**
   * PATCH /api/admin/tests/:testId - Update test metadata
   */
  static updateTest = asyncHandler(async (req, res) => {
    const { testId } = req.params;
    const test = await TestService.updateTest(testId, req.body);
    return ApiResponse.success(res, 'Test updated successfully', test);
  });

  /**
   * DELETE /api/admin/tests/:testId - Delete test & its questions
   */
  static deleteTest = asyncHandler(async (req, res) => {
    const { testId } = req.params;
    const result = await TestService.deleteTest(testId);
    return ApiResponse.success(res, 'Test and associated questions deleted successfully', result);
  });

  /**
   * POST /api/admin/tests/:testId/publish - Publish a test
   */
  static publishTest = asyncHandler(async (req, res) => {
    const { testId } = req.params;
    const test = await TestService.publishTest(testId);
    return ApiResponse.success(res, 'Test published successfully', test);
  });

  /**
   * POST /api/admin/tests/:testId/unpublish - Unpublish a test
   */
  static unpublishTest = asyncHandler(async (req, res) => {
    const { testId } = req.params;
    const test = await TestService.unpublishTest(testId);
    return ApiResponse.success(res, 'Test unpublished successfully', test);
  });

  /**
   * GET /api/admin/tests/:testId/questions - Get all questions including correct answers (Admin)
   */
  static getAdminQuestions = asyncHandler(async (req, res) => {
    const { testId } = req.params;
    const questions = await QuestionService.getQuestionsForAdmin(testId);
    return ApiResponse.success(res, 'Admin questions retrieved successfully', questions, 200, {
      count: questions.length,
    });
  });

  /**
   * POST /api/admin/tests/:testId/questions - Add single or bulk questions
   */
  static addQuestions = asyncHandler(async (req, res) => {
    const { testId } = req.params;
    const questionsData = req.body.questions || req.body;
    const inserted = await QuestionService.addQuestionsToTest(testId, questionsData);
    return ApiResponse.success(res, 'Questions added successfully', inserted, 201, {
      count: inserted.length,
    });
  });

  /**
   * PATCH /api/admin/questions/:questionId - Update a question
   */
  static updateQuestion = asyncHandler(async (req, res) => {
    const { questionId } = req.params;
    const question = await QuestionService.updateQuestion(questionId, req.body);
    return ApiResponse.success(res, 'Question updated successfully', question);
  });

  /**
   * DELETE /api/admin/questions/:questionId - Delete a question
   */
  static deleteQuestion = asyncHandler(async (req, res) => {
    const { questionId } = req.params;
    const question = await QuestionService.deleteQuestion(questionId);
    return ApiResponse.success(res, 'Question deleted successfully', question);
  });
}
