import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { TestService } from '../services/testService.js';
import { QuestionService } from '../services/questionService.js';
import { ResultService } from '../services/resultService.js';

export class TestController {
  /**
   * GET /api/tests - List all published tests (student view: private codes hidden)
   */
  static listTests = asyncHandler(async (req, res) => {
    const { page, limit, subject, type, search } = req.query;
    const result = await TestService.listTests({
      page: page ? parseInt(page, 10) : 1,
      limit: limit ? parseInt(limit, 10) : 20,
      subject,
      type,
      status: 'published',
      search,
    });

    return ApiResponse.success(res, 'Tests retrieved successfully', result.tests, 200, result.pagination);
  });

  /**
   * GET /api/tests/:testId - Get single test details (student view: private codes hidden)
   */
  static getTest = asyncHandler(async (req, res) => {
    const { testId } = req.params;
    const test = await TestService.getTestByIdOrSlug(testId, { requirePublished: true });
    return ApiResponse.success(res, 'Test retrieved successfully', test);
  });

  /**
   * POST /api/tests/access - Secure test code verification endpoint
   */
  static verifyTestAccess = asyncHandler(async (req, res) => {
    const { testId, testCode } = req.body;
    const unlockedData = await TestService.verifyTestAccess({ testId, testCode });
    return ApiResponse.success(res, 'Test access granted successfully', unlockedData);
  });

  /**
   * GET /api/tests/:testId/questions - Get questions for a test (WITHOUT correct answers or private codes)
   */
  static getTestQuestions = asyncHandler(async (req, res) => {
    const { testId } = req.params;
    const questions = await QuestionService.getQuestionsForStudent(testId);
    return ApiResponse.success(res, 'Test questions retrieved successfully', questions, 200, {
      count: questions.length,
    });
  });

  /**
   * POST /api/tests/:testId/submit - Submit answers and calculate score on server
   */
  static submitTest = asyncHandler(async (req, res) => {
    const { testId } = req.params;
    const {
      attemptId,
      answers,
      markedForReview,
      studentName,
      studentRollNumber,
      autoSubmitted,
      timeSpentSeconds,
      startTime,
    } = req.body;

    const authenticatedUser = req.user;
    const effectiveUserId = authenticatedUser?._id || req.body.userId || null;
    const effectiveStudentName = authenticatedUser?.name || studentName || 'Anonymous Student';
    const effectiveRollNumber = authenticatedUser?.rollNumber || studentRollNumber || null;

    const result = await ResultService.submitExam({
      testIdOrSlug: testId,
      attemptId,
      userId: effectiveUserId,
      answers,
      markedForReview,
      studentName: effectiveStudentName,
      studentRollNumber: effectiveRollNumber,
      autoSubmitted,
      timeSpentSeconds,
      startTime,
    });

    return ApiResponse.success(res, 'Test submitted and graded successfully', result, 201);
  });
}
