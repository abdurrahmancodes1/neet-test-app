import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { env } from './config/env.js';
import { globalLimiter } from './middleware/rateLimiter.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import apiRouter from './routes/index.js';

const app = express();

// Security Headers
app.use(helmet());

// CORS Configuration
const allowedOrigins = (env.CORS_ORIGIN || '').split(',').map((origin) => origin.trim());
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes('*') || allowedOrigins.includes(origin) || origin.endsWith('.vercel.app') || origin.includes('localhost')) {
        return callback(null, true);
      }
      return callback(null, true); // Allow all for seamless mobile & cross-origin test access
    },
    credentials: true,
  })
);

// Cookie Parser
app.use(cookieParser());

// Rate Limiting
app.use('/api', globalLimiter);

// Body Parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// API Routes
app.use('/api', apiRouter);

// 404 Catch-all
app.use(notFoundHandler);

// Centralized Error Handling
app.use(errorHandler);

export default app;
