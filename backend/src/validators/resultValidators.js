import { z } from 'zod';

export const startAttemptSchema = z.object({
  testId: z.string().min(1, 'Test ID is required'),
  testCode: z.string().min(1, 'Test code is required'),
  studentName: z.string().min(1).max(100).optional(),
  studentRollNumber: z.string().optional(),
});

export const submitAnswersSchema = z
  .object({
    attemptId: z.string().optional(),
    testId: z.string().optional(), // Can come from URL parameter or body
    testTitle: z.string().optional(),
    userId: z.string().optional().nullable(),
    studentEmail: z.string().optional().nullable(),
    studentName: z.string().max(100).optional(),
    studentRollNumber: z.string().optional().nullable(),
    answers: z.record(z.any()).default({}), // Map of questionId or order -> selectedOption
    markedForReview: z.array(z.any()).default([]),
    autoSubmitted: z.boolean().default(false),
    timeSpentSeconds: z.number().int().nonnegative().optional(),
    startTime: z.union([z.string(), z.number(), z.date()]).optional(),
    score: z.number().optional(),
    rawScore: z.number().optional(),
    maxScore: z.number().optional(),
    accuracy: z.number().optional(),
    percentage: z.number().optional(),
    correct: z.number().optional(),
    wrong: z.number().optional(),
    unattempted: z.number().optional(),
    totalQuestions: z.number().optional(),
    perQuestion: z.array(z.any()).optional(),
    topicPerformance: z.array(z.any()).optional(),
  })
  .passthrough();

export const queryResultsSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
  testId: z.string().optional(),
  userId: z.string().optional(),
});
