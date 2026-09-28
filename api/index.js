import app from '../backend/src/app.js';
import { connectDatabase } from '../backend/src/config/database.js';

export default async function handler(req, res) {
  try {
    await connectDatabase();
  } catch (err) {
    console.warn('MongoDB connection issue in serverless handler:', err.message);
  }
  return app(req, res);
}
