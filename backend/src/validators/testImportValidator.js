import { z } from 'zod';
import { sanitizeSvg } from '../utils/svgSanitizer.js';

export const svgImageSchema = z
  .object({
    type: z.enum(['svg', 'none']).default('svg'),
    data: z.string().min(1, 'SVG data cannot be empty'),
  })
  .nullable()
  .optional();

export const importQuestionSchema = z.object({
  id: z.union([z.string(), z.number()]).optional(),
  order: z.number().int().positive().optional(),
  sourceQuestionNumber: z.number().int().positive().optional(),
  subject: z
    .enum([
      'Physics',
      'Chemistry',
      'Mathematics',
      'Maths',
      'Botany',
      'Zoology',
      'Biology',
      'General',
    ])
    .default('General'),
  chapter: z.string().min(1, 'Chapter is required').default('General'),
  topic: z.string().min(1, 'Topic is required').default('General'),
  difficulty: z.enum(['Easy', 'Medium', 'Hard', 'Dropper (NEET)']).default('Hard'),
  type: z.enum(['mcq', 'assertion_reason', 'match_list', 'numerical', 'diagram']).default('mcq'),
  question: z.string().min(1, 'Question text cannot be empty'),
  options: z
    .record(z.string())
    .refine((opts) => Object.keys(opts).length >= 2, {
      message: 'A question must have at least 2 options (e.g. A, B, C, D)',
    }),
  correctAnswer: z
    .string()
    .min(1, 'Correct answer is required')
    .transform((val) => val.trim().toUpperCase()),
  explanation: z.string().nullable().optional(),
  image: z.string().nullable().optional(),
  questionImage: svgImageSchema,
  explanationImage: svgImageSchema,
  warnings: z.array(z.string()).optional().default([]),
  marks: z.number().default(4),
  negativeMarks: z.number().default(-1),
});

export const importTestPayloadSchema = z
  .object({
    schemaVersion: z.string().default('1.0'),
    title: z.string().min(3, 'Test title must be at least 3 characters'),
    slug: z
      .string()
      .min(2)
      .regex(/^[a-z0-9-]+$/, 'Slug must contain only lowercase letters, numbers, and hyphens')
      .optional(),
    subtitle: z.string().optional(),
    description: z.string().optional(),
    category: z.string().optional(),
    examType: z
      .string()
      .optional()
      .default('NEET')
      .transform((val) => {
        const u = (val || 'NEET').toUpperCase().trim().replace(/[-\s]/g, '_');
        if (u === 'JEE' || u === 'JEE_MAIN') return 'JEE_MAIN';
        if (u === 'JEE_ADVANCED' || u === 'ADVANCED') return 'JEE_ADVANCED';
        if (['NEET', 'JEE_MAIN', 'JEE_ADVANCED', 'FOUNDATION', 'GENERAL'].includes(u)) return u;
        return 'NEET';
      }),
    isPublic: z.boolean().default(true),
    testCode: z.string().min(2, 'Test code must be at least 2 characters').toUpperCase().optional(),
    allowedCodes: z.array(z.string()).optional(),
    type: z.enum(['chapter', 'full_mock', 'aits', 'quiz']).default('chapter'),
    subjects: z.array(z.string()).min(1, 'At least one subject is required').optional(),
    chapters: z.array(z.string()).optional(),
    syllabus: z.string().optional(),
    difficulty: z.enum(['Easy', 'Medium', 'Hard', 'Dropper (NEET)']).default('Hard'),
    durationMinutes: z.number().int().min(1).max(360).optional(),
    markingScheme: z
      .object({
        correct: z.number().default(4),
        wrong: z.number().default(-1),
        unattempted: z.number().default(0),
      })
      .default({ correct: 4, wrong: -1, unattempted: 0 }),
    status: z.enum(['draft', 'published', 'archived']).default('published'),
    warnings: z.array(z.string()).optional().default([]),
    questions: z.array(importQuestionSchema).min(1, 'At least one question is required'),
  })
  .superRefine((data, ctx) => {
    // 1. Check for duplicate stable question IDs or orders
    const seenIds = new Set();
    const seenOrders = new Set();

    data.questions.forEach((q, idx) => {
      const qIndex = idx + 1;

      // Check stable ID uniqueness if provided
      if (q.id !== undefined && q.id !== null) {
        const strId = String(q.id).trim().toLowerCase();
        if (seenIds.has(strId)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Duplicate question identifier detected: "${q.id}" at question #${qIndex}`,
            path: ['questions', idx, 'id'],
          });
        }
        seenIds.add(strId);
      }

      // Check order uniqueness if provided
      if (q.order !== undefined) {
        if (seenOrders.has(q.order)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Duplicate question order detected: #${q.order} at question #${qIndex}`,
            path: ['questions', idx, 'order'],
          });
        }
        seenOrders.add(q.order);
      }

      // 2. Validate MCQ option identifiers & correct answer match
      const optionKeys = Object.keys(q.options || {});
      const cleanAnswer = (q.correctAnswer || '').trim().toUpperCase();

      if (q.type !== 'numerical') {
        if (!optionKeys.map((k) => k.toUpperCase()).includes(cleanAnswer)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Question #${q.order || qIndex}: Correct answer "${cleanAnswer}" does not match any provided options [${optionKeys.join(', ')}]`,
            path: ['questions', idx, 'correctAnswer'],
          });
        }
      }

      // 3. Validate inline SVG diagrams
      if (q.questionImage && q.questionImage.type === 'svg') {
        try {
          sanitizeSvg(q.questionImage.data, `Question #${q.order || qIndex} diagram`);
        } catch (svgErr) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: svgErr.message,
            path: ['questions', idx, 'questionImage'],
          });
        }
      }

      if (q.explanationImage && q.explanationImage.type === 'svg') {
        try {
          sanitizeSvg(q.explanationImage.data, `Question #${q.order || qIndex} explanation diagram`);
        } catch (svgErr) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: svgErr.message,
            path: ['questions', idx, 'explanationImage'],
          });
        }
      }
    });
  });
