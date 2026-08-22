import app from './app.js';
import { env } from './config/env.js';
import { connectDatabase, closeDatabase } from './config/database.js';

let server;

async function startServer() {
  // Connect to Database
  await connectDatabase();

  // Start HTTP Server
  server = app.listen(env.PORT, () => {
    console.log(`========================================`);
    console.log(`🚀 Server running in ${env.NODE_ENV} mode`);
    console.log(`📡 URL: http://localhost:${env.PORT}`);
    console.log(`🩺 Health: http://localhost:${env.PORT}/api/health`);
    console.log(`========================================`);
  });
}

// Graceful Shutdown
async function shutdown(signal) {
  console.log(`\nReceived ${signal}. Shutting down gracefully...`);
  if (server) {
    server.close(async () => {
      console.log('HTTP server closed.');
      await closeDatabase();
      process.exit(0);
    });

    // Force shutdown after 10s if stuck
    setTimeout(() => {
      console.error('Could not close connections in time, forcefully shutting down.');
      process.exit(1);
    }, 10000);
  } else {
    process.exit(0);
  }
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

startServer();
