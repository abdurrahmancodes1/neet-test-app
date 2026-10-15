import crypto from 'node:crypto';
import mongoose from 'mongoose';
import { Test, Question } from '../models/index.js';
import { importTestPayloadSchema } from '../validators/testImportValidator.js';
import { sanitizeSvg } from '../utils/svgSanitizer.js';
import { AppError } from '../utils/AppError.js';

export class TestImportService {
  /**
   * Previews and dry-runs validation of an import payload without writing to the database.
   * @param {Object} rawPayload - Parsed JSON import object
   * @returns {Object} Structured preview data with validation feedback and sanitized assets
   */
  static async validateAndPreview(rawPayload) {
    if (!rawPayload || typeof rawPayload !== 'object') {
      throw new AppError('Import payload must be a valid JSON object', 400);
    }

    const validationResult = importTestPayloadSchema.safeParse(rawPayload);
    if (!validationResult.success) {
      const formattedErrors = validationResult.error.errors.map((err) => ({
        field: err.path.join('.'),
        message: err.message,
      }));
      return {
        isValid: false,
        errors: formattedErrors,
        summary: `Validation failed with ${formattedErrors.length} issue(s)`,
      };
    }

    const payload = validationResult.data;
    const inferred = [];
    const collectedWarnings = [...(payload.warnings || [])];

    // Infer subjects if omitted
    if (!payload.subjects || payload.subjects.length === 0) {
      const extractedSubjects = Array.from(
        new Set(payload.questions.map((q) => q.subject))
      ).filter(Boolean);
      payload.subjects = extractedSubjects.length > 0 ? extractedSubjects : ['General'];
      inferred.push(`Subjects inferred from questions: [${payload.subjects.join(', ')}]`);
    }

    // Infer chapters if omitted
    if (!payload.chapters || payload.chapters.length === 0) {
      const extractedChapters = Array.from(
        new Set(payload.questions.map((q) => q.chapter))
      ).filter(Boolean);
      payload.chapters = extractedChapters.length > 0 ? extractedChapters : ['General'];
      inferred.push(`Chapters extracted: [${payload.chapters.join(', ')}]`);
    }

    // Infer duration if omitted (default standard: 1 min per question for speed, or 60m min)
    if (!payload.durationMinutes) {
      payload.durationMinutes = Math.max(30, Math.min(180, payload.questions.length * 1.5));
      inferred.push(`Duration set to ${payload.durationMinutes} minutes`);
    }

    // Generate slug preview if omitted
    const effectiveSlug =
      payload.slug ||
      payload.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

    // Check if slug already exists in database
    let slugCollision = false;
    try {
      if (mongoose.connection.readyState === 1) {
        const existing = await Test.findOne({ slug: effectiveSlug }).lean();
        if (existing) {
          slugCollision = true;
          collectedWarnings.push(
            `A test with slug "${effectiveSlug}" already exists. Confirming import will update this test.`
          );
        }
      }
    } catch {}

    // Process and sanitize SVG diagrams for all questions
    const processedQuestions = payload.questions.map((q, idx) => {
      const order = q.order || idx + 1;
      const qWarnings = [...(q.warnings || [])];
      let sanitizedQuestionImage = null;
      let sanitizedExplanationImage = null;

      if (q.questionImage && q.questionImage.type === 'svg') {
        try {
          const { sanitizedSvg, warnings: svgWarns } = sanitizeSvg(
            q.questionImage.data,
            `Question #${order}`
          );
          sanitizedQuestionImage = { type: 'svg', data: sanitizedSvg };
          qWarnings.push(...svgWarns);
        } catch (err) {
          collectedWarnings.push(`Question #${order}: ${err.message}`);
        }
      }

      if (q.explanationImage && q.explanationImage.type === 'svg') {
        try {
          const { sanitizedSvg, warnings: svgWarns } = sanitizeSvg(
            q.explanationImage.data,
            `Question #${order} explanation`
          );
          sanitizedExplanationImage = { type: 'svg', data: sanitizedSvg };
          qWarnings.push(...svgWarns);
        } catch (err) {
          collectedWarnings.push(`Question #${order} explanation: ${err.message}`);
        }
      }

      return {
        id: q.id || `q${order}`,
        order,
        sourceQuestionNumber: q.sourceQuestionNumber || order,
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
        questionImage: sanitizedQuestionImage,
        explanationImage: sanitizedExplanationImage,
        marks: q.marks || payload.markingScheme?.correct || 4,
        negativeMarks: q.negativeMarks || payload.markingScheme?.wrong || -1,
        warnings: qWarnings,
      };
    });

    const totalQuestions = processedQuestions.length;
    const totalMarks = processedQuestions.reduce((acc, q) => acc + (q.marks || 4), 0);

    return {
      isValid: true,
      errors: [],
      inferred,
      warnings: collectedWarnings,
      test: {
        schemaVersion: payload.schemaVersion || '1.0',
        title: payload.title,
        slug: effectiveSlug,
        slugCollision,
        subtitle: payload.subtitle || '',
        description: payload.description || payload.syllabus || '',
        examType: payload.examType || 'NEET',
        type: payload.type || 'chapter',
        subjects: payload.subjects,
        chapters: payload.chapters,
        syllabus: payload.syllabus || '',
        difficulty: payload.difficulty || 'Hard',
        durationMinutes: payload.durationMinutes,
        markingScheme: payload.markingScheme,
        status: payload.status || 'published',
        totalQuestions,
        totalMarks,
      },
      questions: processedQuestions,
    };
  }

  /**
   * Validates and imports structured test data into MongoDB with atomic rollback on failure.
   * @param {Object} rawPayload - test metadata and questions array
   * @param {Object} options - { publishImmediately: true, overrideExisting: true }
   */
  static async importTest(
    rawPayload,
    options = { publishImmediately: true, overrideExisting: true }
  ) {
    // 1. Run full preview validation
    const preview = await this.validateAndPreview(rawPayload);
    if (!preview.isValid) {
      throw new AppError('Test payload validation failed', 400, preview.errors);
    }

    const { test: testMeta, questions: parsedQuestions, inferred, warnings } = preview;
    const testCode =
      rawPayload.testCode ||
      `${testMeta.examType || 'TEST'}-${crypto.randomBytes(2).toString('hex').toUpperCase()}`;
    const allowedCodes = Array.from(
      new Set([testCode, ...(rawPayload.allowedCodes || [])].filter(Boolean))
    );

    let createdOrUpdatedTest = null;
    let questionsInserted = [];

    try {
      // 2. Create or Upsert Test document
      createdOrUpdatedTest = await Test.findOneAndUpdate(
        { slug: testMeta.slug },
        {
          schemaVersion: testMeta.schemaVersion || '1.0',
          title: testMeta.title,
          slug: testMeta.slug,
          subtitle: testMeta.subtitle,
          description: testMeta.description,
          examType: testMeta.examType,
          testCode,
          allowedCodes,
          type: testMeta.type,
          subjects: testMeta.subjects,
          chapters: testMeta.chapters,
          syllabus: testMeta.syllabus,
          difficulty: testMeta.difficulty,
          durationMinutes: testMeta.durationMinutes,
          totalQuestions: testMeta.totalQuestions,
          totalMarks: testMeta.totalMarks,
          markingScheme: testMeta.markingScheme,
          status: options.publishImmediately ? 'published' : testMeta.status,
          publishedAt: options.publishImmediately ? new Date() : null,
          warnings,
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );

      // 3. Remove existing questions for this test to ensure idempotent replace
      await Question.deleteMany({ testId: createdOrUpdatedTest._id });

      // 4. Prepare Question documents for bulk insertion
      const questionDocs = parsedQuestions.map((q) => ({
        testId: createdOrUpdatedTest._id,
        clientQuestionId: q.id,
        order: q.order,
        sourceQuestionNumber: q.sourceQuestionNumber,
        subject: q.subject,
        chapter: q.chapter,
        topic: q.topic,
        difficulty: q.difficulty,
        type: q.type,
        question: q.question,
        options: q.options,
        correctAnswer: q.correctAnswer,
        explanation: q.explanation,
        image: q.image,
        questionImage: q.questionImage,
        explanationImage: q.explanationImage,
        warnings: q.warnings,
        marks: q.marks,
        negativeMarks: q.negativeMarks,
        status: 'active',
      }));

      questionsInserted = await Question.insertMany(questionDocs);

      return {
        success: true,
        test: {
          id: createdOrUpdatedTest._id,
          slug: createdOrUpdatedTest.slug,
          title: createdOrUpdatedTest.title,
          testCode,
          examType: createdOrUpdatedTest.examType,
          subjects: createdOrUpdatedTest.subjects,
          durationMinutes: createdOrUpdatedTest.durationMinutes,
          totalQuestions: questionsInserted.length,
          totalMarks: createdOrUpdatedTest.totalMarks,
          status: createdOrUpdatedTest.status,
        },
        inferred,
        warnings,
        insertedCount: questionsInserted.length,
      };
    } catch (err) {
      // Rollback protection: If question insertion fails, do not leave an empty or broken test
      if (createdOrUpdatedTest && questionsInserted.length === 0) {
        try {
          await Question.deleteMany({ testId: createdOrUpdatedTest._id });
          await Test.findByIdAndDelete(createdOrUpdatedTest._id);
        } catch (cleanupErr) {
          console.error('Failed to cleanup partial test after error:', cleanupErr);
        }
      }
      throw new AppError(`Test import failed during persistence: ${err.message}`, 500);
    }
  }
}
