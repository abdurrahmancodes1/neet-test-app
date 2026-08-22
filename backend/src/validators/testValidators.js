import { z } from 'zod';

export const createTestSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').max(200),
  slug: z.string().min(2).max(100).regex(/^[a-z0-9-]+$/, 'Slug must contain only lowercase letters, numbers, and hyphens').optional(),
  subtitle: z.string().max(300).optional(),
  description: z.string().optional(),
  testCode: z.string().min(2, 'Test code must be at least 2 characters').toUpperCase(),
  allowedCodes: z.array(z.string()).optional(),
  type: z.enum(['chapter', 'full_mock', 'aits', 'quiz']).default('chapter'),
  subjects: z.array(z.string()).min(1, 'At least one subject is required'),
  chapters: z.array(z.string()).default([]),
  syllabus: z.string().optional(),
  difficulty: z.enum(['Easy', 'Medium', 'Hard', 'Dropper (NEET)']).default('Hard'),
  durationMinutes: z.number().int().min(1).max(360).default(60),
  markingScheme: z
    .object({
      correct: z.number().default(4),
      wrong: z.number().default(-1),
      unattempted: z.number().default(0),
    })
    .default({ correct: 4, wrong: -1, unattempted: 0 }),
  status: z.enum(['draft', 'published', 'archived']).default('draft'),
});

export const updateTestSchema = createTestSchema.partial();

export const queryTestsSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
  subject: z.string().optional(),
  type: z.enum(['chapter', 'full_mock', 'aits', 'quiz']).optional(),
  status: z.enum(['draft', 'published', 'archived']).optional(),
  search: z.string().optional(),
});

export const verifyTestCodeSchema = z.object({
  testId: z.string().optional(),
  testCode: z.string().min(1, 'Please enter a test access code'),
});
