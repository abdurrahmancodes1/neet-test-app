import { env } from '../config/env.js';
import { getDatabaseStatus } from '../config/database.js';
import { ApiResponse } from '../utils/ApiResponse.js';

export const getHealth = (req, res) => {
  const data = {
    status: 'healthy',
    environment: env.NODE_ENV,
    timestamp: new Date().toISOString(),
    uptime: `${Math.floor(process.uptime())}s`,
    database: getDatabaseStatus(),
  };

  return ApiResponse.success(res, 'API is running', data, 200);
};
