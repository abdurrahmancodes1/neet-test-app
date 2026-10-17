import { z } from 'zod';

const questionObjectSchema = z.object({
  testId: z.string().min(1, 'Test ID is required'),
  order: z.number().int().positive('Order must be a positive integer'),
  sourceQuestionNumber: z.number().int().positive().optional(),
  subject: z.enum([
    'Physics',
    'Chemistry',
    'Mathematics',
    'Maths',
    'Botany',
    'Zoology',
    'Biology',
    'General',
  ]),
  chapter: z.string().min(1, 'Chapter is required'),
  topic: z.string().min(1, 'Topic is required'),
  difficulty: z.enum(['Easy', 'Medium', 'Hard', 'Dropper (NEET)']).default('Hard'),
  type: z.enum(['mcq', 'assertion_reason', 'match_list', 'numerical', 'diagram']).default('mcq'),
  question: z.string().min(1, 'Question text is required'),
  options: z.record(z.string()).optional().default({}),
  correctAnswer: z.union([z.string(), z.number()]).transform((val) => String(val).trim().toUpperCase()),
  explanation: z.string().optional(),
  image: z.string().nullable().optional(),
  marks: z.number().default(4),
  negativeMarks: z.number().default(-1),
});

const validateQuestionOptions = (q, ctx) => {
  if (q.type !== 'numerical') {
    const keys = Object.keys(q.options || {});
    if (keys.length < 2) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'At least 2 options are required for multiple-choice questions',
        path: ['options'],
      });
    }
  }
};

export const createQuestionSchema = questionObjectSchema.superRefine(validateQuestionOptions);

export const bulkCreateQuestionsSchema = z.object({
  testId: z.string().min(1, 'Test ID is required'),
  questions: z
    .array(questionObjectSchema.omit({ testId: true }).superRefine(validateQuestionOptions))
    .min(1, 'At least one question is required'),
});

export const updateQuestionSchema = questionObjectSchema.partial();
