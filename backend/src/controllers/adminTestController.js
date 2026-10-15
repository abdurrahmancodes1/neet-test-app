import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { TestService } from '../services/testService.js';
import { QuestionService } from '../services/questionService.js';
import { TestImportService } from '../services/testImportService.js';
import { SAMPLE_IMPORT_TEMPLATE } from '../fixtures/sampleImportTemplate.js';

export class AdminTestController {
  /**
   * POST /api/admin/tests/import-preview - Dry-run validation and visual preview of JSON test payload
   */
  static previewImport = asyncHandler(async (req, res) => {
    const preview = await TestImportService.validateAndPreview(req.body);
    if (!preview.isValid) {
      return ApiResponse.error(res, preview.summary, 400, preview.errors);
    }
    return ApiResponse.success(res, 'Test import validated and ready for review', preview);
  });

  /**
   * POST /api/admin/tests/import - Validate and persist test & questions into MongoDB
   */
  static importTest = asyncHandler(async (req, res) => {
    const { publishImmediately, overrideExisting } = req.query;
    const adminUserId = req.user?._id || null;
    const result = await TestImportService.importTest(req.body, {
      publishImmediately:
        publishImmediately === 'true' ||
        publishImmediately === true ||
        req.body.status === 'published',
      overrideExisting: overrideExisting !== 'false',
      adminUserId,
    });
    return ApiResponse.success(res, 'Test successfully imported and created', result, 201);
  });

  /**
   * GET /api/admin/tests/sample-template - Get standard JSON import schema template with inline SVG
   */
  static getSampleTemplate = asyncHandler(async (req, res) => {
    return ApiResponse.success(
      res,
      'Sample test import template retrieved',
      SAMPLE_IMPORT_TEMPLATE
    );
  });

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
