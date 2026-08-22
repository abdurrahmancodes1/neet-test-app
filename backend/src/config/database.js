import mongoose from 'mongoose';
import { env } from './env.js';

let isConnected = false;

export async function connectDatabase() {
  if (isConnected) {
    return mongoose.connection;
  }

  const options = {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  };

  try {
    const conn = await mongoose.connect(env.MONGODB_URI, options);
    isConnected = true;
    console.log(`✓ MongoDB Connected: ${conn.connection.host}/${conn.connection.name}`);

    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      isConnected = false;
      console.warn('MongoDB disconnected. Attempting reconnection...');
    });

    mongoose.connection.on('reconnected', () => {
      isConnected = true;
      console.log('MongoDB reconnected.');
    });

    return conn;
  } catch (error) {
    isConnected = false;
    console.error(`✕ MongoDB connection failed: ${error.message}`);
    if (env.isProd) {
      process.exit(1);
    }
    // In dev, allow the server to start even if local Mongo isn't up yet
    console.warn('⚠️ Server running without active MongoDB connection (development mode).');
    return null;
  }
}

export function getDatabaseStatus() {
  const states = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting',
  };
  return {
    state: states[mongoose.connection.readyState] || 'unknown',
    isConnected: mongoose.connection.readyState === 1,
    database: mongoose.connection.name || null,
  };
}

export async function closeDatabase() {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.close();
    isConnected = false;
    console.log('MongoDB connection closed.');
  }
}
