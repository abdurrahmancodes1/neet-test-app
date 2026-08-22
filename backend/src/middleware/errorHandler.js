import { env } from '../config/env.js';

export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.isOperational ? err.message : (statusCode === 500 ? 'Internal server error' : err.message);

  const response = {
    success: false,
    message,
  };

  if (err.errors) {
    response.errors = err.errors;
  }

  if (env.isDev) {
    response.stack = err.stack;
    if (!err.isOperational) {
      console.error('Unhandled Error:', err);
    }
  }

  res.status(statusCode).json(response);
};
