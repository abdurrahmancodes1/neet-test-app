import mongoose from 'mongoose';

const answerItemSchema = new mongoose.Schema(
  {
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question',
      required: true,
    },
    order: {
      type: Number,
      required: true,
    },
    subject: {
      type: String,
      default: 'General',
    },
    chapter: {
      type: String,
      default: 'General',
    },
    topic: {
      type: String,
      default: 'General',
    },
    question: {
      type: String,
      default: null,
    },
    options: {
      type: Map,
      of: String,
      default: {},
    },
    image: {
      type: String,
      default: null,
    },
    selectedOption: {
      type: String,
      default: null,
    },
    correctAnswer: {
      type: String,
      default: null, // Populated securely upon grading
    },
    explanation: {
      type: String,
      default: null,
    },
    isCorrect: {
      type: Boolean,
      default: null,
    },
    marksAwarded: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ['correct', 'wrong', 'unattempted'],
      default: 'unattempted',
    },
    timeSpentSeconds: {
      type: Number,
      default: 0,
    },
  },
  { _id: false }
);

const topicStatSchema = new mongoose.Schema(
  {
    topic: { type: String, required: true },
    total: { type: Number, default: 0 },
    correct: { type: Number, default: 0 },
    wrong: { type: Number, default: 0 },
    unattempted: { type: Number, default: 0 },
    accuracy: { type: Number, default: 0 },
    mastery: { type: Number, default: 0 },
  },
  { _id: false }
);

const subjectStatSchema = new mongoose.Schema(
  {
    subject: { type: String, required: true },
    total: { type: Number, default: 0 },
    correct: { type: Number, default: 0 },
    wrong: { type: Number, default: 0 },
    unattempted: { type: Number, default: 0 },
    marks: { type: Number, default: 0 },
    maxMarks: { type: Number, default: 0 },
    accuracy: { type: Number, default: 0 },
    percentage: { type: Number, default: 0 },
  },
  { _id: false }
);

const chapterStatSchema = new mongoose.Schema(
  {
    chapter: { type: String, required: true },
    subject: { type: String, default: 'General' },
    total: { type: Number, default: 0 },
    correct: { type: Number, default: 0 },
    wrong: { type: Number, default: 0 },
    unattempted: { type: Number, default: 0 },
    accuracy: { type: Number, default: 0 },
    mastery: { type: Number, default: 0 },
  },
  { _id: false }
);

const resultSchema = new mongoose.Schema(
  {
    testId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Test',
      required: [true, 'Test ID reference is required'],
      index: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
      index: true,
    },
    attemptId: {
      type: String,
      default: null,
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
    status: {
      type: String,
      enum: ['in_progress', 'submitted', 'abandoned', 'expired'],
      default: 'in_progress',
      index: true,
    },
    answers: {
      type: [answerItemSchema],
      default: [],
    },
    markedForReview: {
      type: [Number],
      default: [],
    },
    currentQuestionIndex: {
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
      default: 0,
    },
    percentage: {
      type: Number,
      default: 0,
    },
    accuracy: {
      type: Number,
      default: 0,
    },
    correctCount: {
      type: Number,
      default: 0,
    },
    wrongCount: {
      type: Number,
      default: 0,
    },
    unattemptedCount: {
      type: Number,
      default: 0,
    },
    totalQuestions: {
      type: Number,
      default: 0,
    },
    subjectPerformance: {
      type: [subjectStatSchema],
      default: [],
    },
    chapterPerformance: {
      type: [chapterStatSchema],
      default: [],
    },
    topicPerformance: {
      type: [topicStatSchema],
      default: [],
    },
    weakestTopics: {
      type: [String],
      default: [],
    },
    strongestTopics: {
      type: [String],
      default: [],
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
    submittedAt: {
      type: Date,
      default: null,
    },
    autoSubmitted: {
      type: Boolean,
      default: false,
    },
    metadata: {
      type: Map,
      of: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
resultSchema.index({ testId: 1, userId: 1, status: 1 });
resultSchema.index({ testId: 1, score: -1 });
resultSchema.index({ userId: 1, createdAt: -1 });
resultSchema.index({ attemptId: 1 }, { sparse: true });
resultSchema.index({ createdAt: -1 });

export const Result = mongoose.model('Result', resultSchema);
