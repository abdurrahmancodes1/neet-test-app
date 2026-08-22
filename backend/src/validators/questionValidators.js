import { z } from 'zod';

export const createQuestionSchema = z.object({
  testId: z.string().min(1, 'Test ID is required'),
  order: z.number().int().positive('Order must be a positive integer'),
  sourceQuestionNumber: z.number().int().positive().optional(),
  subject: z.enum(['Physics', 'Chemistry', 'Botany', 'Zoology', 'Biology', 'General']),
  chapter: z.string().min(1, 'Chapter is required'),
  topic: z.string().min(1, 'Topic is required'),
  difficulty: z.enum(['Easy', 'Medium', 'Hard']).default('Hard'),
  type: z.enum(['mcq', 'assertion_reason', 'match_list', 'numerical', 'diagram']).default('mcq'),
  question: z.string().min(1, 'Question text is required'),
  options: z.record(z.string()).refine((opts) => Object.keys(opts).length >= 2, {
    message: 'At least 2 options are required',
  }),
  correctAnswer: z.string().min(1, 'Correct answer is required'),
  explanation: z.string().optional(),
  image: z.string().nullable().optional(),
  marks: z.number().default(4),
  negativeMarks: z.number().default(-1),
});

export const bulkCreateQuestionsSchema = z.object({
  testId: z.string().min(1, 'Test ID is required'),
  questions: z.array(createQuestionSchema.omit({ testId: true })).min(1, 'At least one question is required'),
});

export const updateQuestionSchema = createQuestionSchema.partial();
