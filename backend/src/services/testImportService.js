import crypto from 'node:crypto';
import { Test, Question } from '../models/index.js';
import { importTestPayloadSchema } from '../validators/testImportValidator.js';
import { AppError } from '../utils/AppError.js';

export class TestImportService {
  /**
   * Validates and imports structured test data into MongoDB.
   * @param {Object} rawPayload - test metadata and questions array
   * @param {Object} options - { publishImmediately: true, overrideExisting: true }
   */
  static async importTest(rawPayload, options = { publishImmediately: true, overrideExisting: true }) {
    // 1. Zod Schema Validation
    const validationResult = importTestPayloadSchema.safeParse(rawPayload);
    if (!validationResult.success) {
      const formattedErrors = validationResult.error.errors.map((err) => ({
        field: err.path.join('.'),
        message: err.message,
      }));
      throw new AppError('Test payload validation failed', 400, formattedErrors);
    }

    const payload = validationResult.data;
    const inferred = [];

    // 2. Auto-infer Metadata if not explicitly provided
    const questionCount = payload.questions.length;

    // Inferred Subjects
    if (!payload.subjects || payload.subjects.length === 0) {
      const extractedSubjects = Array.from(new Set(payload.questions.map((q) => q.subject))).filter(Boolean);
      payload.subjects = extractedSubjects.length > 0 ? extractedSubjects : ['NEET'];
      inferred.push(`Subjects inferred from questions: [${payload.subjects.join(', ')}]`);
    }

    // Inferred Chapters
    if (!payload.chapters || payload.chapters.length === 0) {
      const extractedChapters = Array.from(new Set(payload.questions.map((q) => q.chapter))).filter(Boolean);
      payload.chapters = extractedChapters;
      inferred.push(`Chapters extracted: [${payload.chapters.join(', ')}]`);
    }

    // Inferred Duration (Standard NEET strategy: 1 min per question)
    if (!payload.durationMinutes) {
      payload.durationMinutes = Math.max(15, questionCount);
      inferred.push(`Duration set to ${payload.durationMinutes} minutes (1 min/question NEET standard)`);
    }

    // Inferred Slug
    if (!payload.slug) {
      payload.slug = payload.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      inferred.push(`Slug generated: "${payload.slug}"`);
    }

    // Inferred Test Code (Private access passcode)
    if (!payload.testCode) {
      const randomSuffix = crypto.randomBytes(2).toString('hex').toUpperCase();
      payload.testCode = `NEET-${randomSuffix}`;
      inferred.push(`Private test code auto-generated: "${payload.testCode}"`);
    }

    const allowedCodes = Array.from(
      new Set([payload.testCode, ...(payload.allowedCodes || [])].filter(Boolean))
    );

    // 3. Question Data Integrity Checks
    const malformedQuestions = [];
    payload.questions.forEach((q, idx) => {
      const order = q.order || idx + 1;
      const optionKeys = Object.keys(q.options || {});
      if (optionKeys.length < 2) {
        malformedQuestions.push(`Question ${order}: has less than 2 options (${optionKeys.length} provided)`);
      }
      if (!optionKeys.includes(q.correctAnswer)) {
        malformedQuestions.push(
          `Question ${order}: correctAnswer "${q.correctAnswer}" is not in options [${optionKeys.join(', ')}]`
        );
      }
    });

    if (malformedQuestions.length > 0) {
      throw new AppError('Malformed question data detected in import payload', 400, malformedQuestions);
    }

    // 4. Upsert Test Document into MongoDB
    const testDoc = await Test.findOneAndUpdate(
      { slug: payload.slug },
      {
        title: payload.title,
        slug: payload.slug,
        subtitle: payload.subtitle || '',
        description: payload.description || payload.syllabus || '',
        testCode: payload.testCode,
        allowedCodes,
        type: payload.type || (questionCount > 45 ? 'aits' : 'chapter'),
        subjects: payload.subjects,
        chapters: payload.chapters,
        syllabus: payload.syllabus || '',
        difficulty: payload.difficulty || 'Hard',
        durationMinutes: payload.durationMinutes,
        totalQuestions: questionCount,
        totalMarks: questionCount * (payload.markingScheme?.correct || 4),
        markingScheme: payload.markingScheme || { correct: 4, wrong: -1, unattempted: 0 },
        status: options.publishImmediately ? 'published' : (payload.status || 'draft'),
        publishedAt: options.publishImmediately ? new Date() : null,
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    // 5. Clean & Re-insert Question Documents for this Test (Idempotent)
    await Question.deleteMany({ testId: testDoc._id });

    const questionDocs = payload.questions.map((q, idx) => ({
      testId: testDoc._id,
      order: q.order || idx + 1,
      sourceQuestionNumber: q.sourceQuestionNumber || q.order || idx + 1,
      subject: q.subject || payload.subjects[0] || 'General',
      chapter: q.chapter || 'General',
      topic: q.topic || 'General',
      difficulty: q.difficulty || payload.difficulty || 'Hard',
      type: q.type || 'mcq',
      question: q.question,
      options: q.options,
      correctAnswer: q.correctAnswer,
      explanation: q.explanation || null,
      image: q.image || null,
      marks: q.marks || payload.markingScheme?.correct || 4,
      negativeMarks: q.negativeMarks || payload.markingScheme?.wrong || -1,
      status: 'active',
    }));

    const insertedQuestions = await Question.insertMany(questionDocs);

    return {
      success: true,
      test: {
        id: testDoc._id,
        slug: testDoc.slug,
        title: testDoc.title,
        testCode: payload.testCode, // Displayed in CLI import summary
        subjects: testDoc.subjects,
        durationMinutes: testDoc.durationMinutes,
        totalQuestions: insertedQuestions.length,
        totalMarks: testDoc.totalMarks,
        status: testDoc.status,
      },
      inferred,
      insertedCount: insertedQuestions.length,
    };
  }
}
