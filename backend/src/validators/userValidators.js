import { z } from 'zod';

export const createUserSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address').optional(),
  rollNumber: z.string().optional(),
  role: z.enum(['student', 'admin', 'instructor']).default('student'),
});

export const updateUserSchema = createUserSchema.partial();
