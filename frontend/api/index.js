import app from '../../backend/src/app.js';
import { connectDatabase } from '../../backend/src/config/database.js';

let isConnected = false;

export default async function handler(req, res) {
  if (!isConnected) {
    try {
      await connectDatabase();
      isConnected = true;
    } catch (err) {
      console.warn('MongoDB connection error in serverless handler:', err.message);
    }
  }
  return app(req, res);
}
