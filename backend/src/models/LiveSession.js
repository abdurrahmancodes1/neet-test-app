import mongoose from 'mongoose';

const liveSessionSchema = new mongoose.Schema(
  {
    sessionId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
      index: true,
    },
    studentEmail: {
      type: String,
      trim: true,
      lowercase: true,
      index: true,
    },
    studentName: {
      type: String,
      trim: true,
      default: 'Anonymous Student',
    },
    studentRollNumber: {
      type: String,
      trim: true,
      default: null,
    },
    testId: {
      type: String,
      required: true,
      index: true,
    },
    testTitle: {
      type: String,
      default: 'NEET Practice Test',
    },
    status: {
      type: String,
      enum: ['in_progress', 'submitted', 'abandoned', 'expired'],
      default: 'in_progress',
      index: true,
    },
    answers: {
      type: mongoose.Schema.Types.Mixed, // Key-value map: { [qKey]: 'A' | 'B' | 'C' | 'D' }
      default: {},
    },
    markedForReview: {
      type: [mongoose.Schema.Types.Mixed],
      default: [],
    },
    visited: {
      type: [mongoose.Schema.Types.Mixed],
      default: [],
    },
    currentQuestion: {
      type: Number,
      default: 0,
    },
    durationMinutes: {
      type: Number,
      default: 120,
    },
    startTime: {
      type: Number,
      default: () => Date.now(),
    },
    endTime: {
      type: Number,
      default: () => Date.now() + 120 * 60 * 1000,
    },
    lastActiveAt: {
      type: Date,
      default: Date.now,
    },
    answeredCount: {
      type: Number,
      default: 0,
    },
    score: {
      type: Number,
      default: 0,
    },
    rawScore: {
      type: Number,
      default: 0,
    },
    maxScore: {
      type: Number,
      default: 240,
    },
    percentage: {
      type: Number,
      default: 0,
    },
    accuracy: {
      type: Number,
      default: 0,
    },
    correct: {
      type: Number,
      default: 0,
    },
    wrong: {
      type: Number,
      default: 0,
    },
    unattempted: {
      type: Number,
      default: 0,
    },
    totalQuestions: {
      type: Number,
      default: 0,
    },
    perQuestion: {
      type: [mongoose.Schema.Types.Mixed],
      default: [],
    },
    topicPerformance: {
      type: [mongoose.Schema.Types.Mixed],
      default: [],
    },
    weakestTopics: {
      type: [mongoose.Schema.Types.Mixed],
      default: [],
    },
    strongestTopics: {
      type: [mongoose.Schema.Types.Mixed],
      default: [],
    },
    timeTakenMs: {
      type: Number,
      default: 0,
    },
    autoSubmitted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

liveSessionSchema.index({ studentEmail: 1, testId: 1 });
liveSessionSchema.index({ status: 1, updatedAt: -1 });

export const LiveSession = mongoose.model('LiveSession', liveSessionSchema);
