import { z } from 'zod';

export const startAttemptSchema = z.object({
  testId: z.string().min(1, 'Test ID is required'),
  testCode: z.string().min(1, 'Test code is required'),
  studentName: z.string().min(1).max(100).optional(),
  studentRollNumber: z.string().optional(),
});

export const submitAnswersSchema = z.object({
  attemptId: z.string().optional(),
  testId: z.string().optional(), // Can come from URL parameter or body
  answers: z.record(z.string().nullable()).default({}), // Map of questionId or order -> selectedOption
  markedForReview: z.array(z.number()).default([]),
  studentName: z.string().max(100).optional(),
  studentRollNumber: z.string().optional(),
  autoSubmitted: z.boolean().default(false),
  timeSpentSeconds: z.number().int().nonnegative().optional(),
  startTime: z.union([z.string(), z.number(), z.date()]).optional(),
});

export const queryResultsSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
  testId: z.string().optional(),
  userId: z.string().optional(),
});
