import { z } from 'zod';

export const importQuestionSchema = z.object({
  order: z.number().int().positive().optional(),
  sourceQuestionNumber: z.number().int().positive().optional(),
  subject: z.enum(['Physics', 'Chemistry', 'Botany', 'Zoology', 'Biology', 'General']).default('General'),
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
  marks: z.number().default(4),
  negativeMarks: z.number().default(-1),
});

export const importTestPayloadSchema = z.object({
  title: z.string().min(3, 'Test title must be at least 3 characters'),
  slug: z
    .string()
    .min(2)
    .regex(/^[a-z0-9-]+$/, 'Slug must contain only lowercase letters, numbers, and hyphens')
    .optional(),
  subtitle: z.string().optional(),
  description: z.string().optional(),
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
  questions: z.array(importQuestionSchema).min(1, 'At least one question is required'),
});
