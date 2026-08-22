import mongoose from 'mongoose';
import { Test, Question } from '../models/index.js';
import { AppError } from '../utils/AppError.js';

export class TestService {
  /**
   * List tests with pagination and filtering (for students: testCode is excluded)
   */
  static async listTests({
    page = 1,
    limit = 20,
    subject,
    type,
    status = 'published',
    search,
  } = {}) {
    const filter = {};

    if (status) {
      filter.status = status;
    }
    if (type) {
      filter.type = type;
    }
    if (subject) {
      filter.subjects = subject;
    }
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { subtitle: { $regex: search, $options: 'i' } },
        { syllabus: { $regex: search, $options: 'i' } },
      ];
    }

    const skip = (page - 1) * limit;
    const [tests, total] = await Promise.all([
      Test.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Test.countDocuments(filter),
    ]);

    return {
      tests,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit) || 1,
      },
    };
  }

  /**
   * Get single test by ID or slug (student view: testCode is excluded)
   */
  static async getTestByIdOrSlug(idOrSlug, { requirePublished = true } = {}) {
    const isObjectId = mongoose.Types.ObjectId.isValid(idOrSlug);
    const filter = isObjectId ? { _id: idOrSlug } : { slug: idOrSlug.toLowerCase() };

    if (requirePublished) {
      filter.status = 'published';
    }

    const test = await Test.findOne(filter).lean();
    if (!test) {
      throw new AppError('Test not found', 404);
    }
    return test;
  }

  /**
   * Secure test code verification endpoint (POST /api/tests/access)
   * Validates access code on the server and returns start-token without leaking the actual code
   */
  static async verifyTestAccess({ testId, testCode }) {
    if (!testCode || typeof testCode !== 'string') {
      throw new AppError('Please provide a test access code', 400);
    }

    const cleanInput = testCode.trim().toUpperCase().replace(/[-\s]/g, '');

    let test;
    if (testId) {
      const isObjectId = mongoose.Types.ObjectId.isValid(testId);
      const filter = isObjectId ? { _id: testId } : { slug: testId.toLowerCase() };
      filter.status = 'published';
      test = await Test.findOne(filter).select('+testCode +allowedCodes').lean();
    } else {
      // Find published test matching code directly across database
      test = await Test.findOne({ status: 'published' }).select('+testCode +allowedCodes').lean();
    }

    if (!test) {
      throw new AppError('Test not found or currently unavailable', 404);
    }

    const allAllowed = [
      test.testCode,
      ...(test.allowedCodes || []),
    ].filter(Boolean);

    const isMatch = allAllowed.some(
      (c) => c.toUpperCase().replace(/[-\s]/g, '') === cleanInput
    );

    if (!isMatch) {
      throw new AppError('Invalid test access code. Please check your passcode and try again.', 400);
    }

    // Return ONLY what is required to start the test (NEVER return the code itself)
    return {
      unlocked: true,
      testId: test._id,
      slug: test.slug,
      title: test.title,
      durationMinutes: test.durationMinutes,
      totalQuestions: test.totalQuestions,
      totalMarks: test.totalMarks,
    };
  }

  /**
   * Create a new test (Admin)
   */
  static async createTest(testData) {
    if (!testData.slug) {
      testData.slug = testData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
    }

    const existing = await Test.findOne({ slug: testData.slug });
    if (existing) {
      testData.slug = `${testData.slug}-${Date.now().toString().slice(-4)}`;
    }

    const test = await Test.create(testData);
    return test;
  }

  /**
   * Update test details (Admin)
   */
  static async updateTest(testId, updateData) {
    if (!mongoose.Types.ObjectId.isValid(testId)) {
      throw new AppError('Invalid Test ID format', 400);
    }

    const test = await Test.findByIdAndUpdate(testId, updateData, {
      new: true,
      runValidators: true,
    }).select('+testCode +allowedCodes');

    if (!test) {
      throw new AppError('Test not found', 404);
    }

    return test;
  }

  /**
   * Delete test and all associated questions (Admin)
   */
  static async deleteTest(testId) {
    if (!mongoose.Types.ObjectId.isValid(testId)) {
      throw new AppError('Invalid Test ID format', 400);
    }

    const test = await Test.findByIdAndDelete(testId);
    if (!test) {
      throw new AppError('Test not found', 404);
    }

    const deleteResult = await Question.deleteMany({ testId });

    return {
      deletedTest: test,
      deletedQuestionsCount: deleteResult.deletedCount,
    };
  }

  /**
   * Publish a test (Admin)
   */
  static async publishTest(testId) {
    if (!mongoose.Types.ObjectId.isValid(testId)) {
      throw new AppError('Invalid Test ID format', 400);
    }

    const questionCount = await Question.countDocuments({ testId, status: 'active' });
    if (questionCount === 0) {
      throw new AppError('Cannot publish a test with 0 questions', 400);
    }

    const test = await Test.findByIdAndUpdate(
      testId,
      {
        status: 'published',
        publishedAt: new Date(),
        totalQuestions: questionCount,
        totalMarks: questionCount * 4,
      },
      { new: true }
    );

    if (!test) {
      throw new AppError('Test not found', 404);
    }

    return test;
  }

  /**
   * Unpublish a test (Admin)
   */
  static async unpublishTest(testId) {
    if (!mongoose.Types.ObjectId.isValid(testId)) {
      throw new AppError('Invalid Test ID format', 400);
    }

    const test = await Test.findByIdAndUpdate(
      testId,
      { status: 'draft' },
      { new: true }
    );

    if (!test) {
      throw new AppError('Test not found', 404);
    }

    return test;
  }

  /**
   * Recalculate and update test question count and total marks
   */
  static async updateTestStats(testId) {
    const questionCount = await Question.countDocuments({ testId, status: 'active' });
    const test = await Test.findById(testId);
    if (test) {
      const correctMarks = test.markingScheme?.correct || 4;
      test.totalQuestions = questionCount;
      test.totalMarks = questionCount * correctMarks;
      await test.save();
    }
  }
}
