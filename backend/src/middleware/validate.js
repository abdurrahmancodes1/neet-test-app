import { AppError } from '../utils/AppError.js';

/**
 * Middleware factory for validating incoming requests using Zod schemas.
 * @param {import('zod').ZodSchema} schema
 * @param {'body' | 'query' | 'params'} source
 */
export const validate = (schema, source = 'body') => {
  return (req, res, next) => {
    try {
      const parsed = schema.parse(req[source]);
      req[source] = parsed;
      next();
    } catch (error) {
      if (error.errors) {
        const formattedErrors = error.errors.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
        }));
        return next(new AppError('Validation failed', 400, formattedErrors));
      }
      next(error);
    }
  };
};
