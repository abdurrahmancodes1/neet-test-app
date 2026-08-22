import mongoose from 'mongoose';

const testSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Test title is required'],
      trim: true,
      minlength: [3, 'Title must be at least 3 characters'],
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    slug: {
      type: String,
      required: [true, 'Test slug is required'],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    subtitle: {
      type: String,
      trim: true,
      maxlength: [300, 'Subtitle cannot exceed 300 characters'],
    },
    description: {
      type: String,
      trim: true,
    },
    testCode: {
      type: String,
      required: [true, 'Test code is required'],
      uppercase: true,
      trim: true,
      select: false, // CRITICAL SECURITY: Excluded from public/student queries
    },
    allowedCodes: {
      type: [String],
      default: [],
      select: false, // CRITICAL SECURITY: Excluded from public/student queries
    },
    type: {
      type: String,
      enum: {
        values: ['chapter', 'full_mock', 'aits', 'quiz'],
        message: '{VALUE} is not a valid test type',
      },
      default: 'chapter',
      index: true,
    },
    subjects: {
      type: [String],
      required: [true, 'At least one subject is required'],
      validate: {
        validator: (v) => Array.isArray(v) && v.length > 0,
        message: 'A test must have at least one subject',
      },
      index: true,
    },
    chapters: {
      type: [String],
      default: [],
    },
    syllabus: {
      type: String,
      trim: true,
    },
    difficulty: {
      type: String,
      enum: ['Easy', 'Medium', 'Hard', 'Dropper (NEET)'],
      default: 'Hard',
    },
    durationMinutes: {
      type: Number,
      required: [true, 'Duration in minutes is required'],
      min: [1, 'Duration must be at least 1 minute'],
      max: [360, 'Duration cannot exceed 360 minutes'],
      default: 60,
    },
    totalQuestions: {
      type: Number,
      default: 0,
      min: 0,
    },
    totalMarks: {
      type: Number,
      default: 0,
      min: 0,
    },
    markingScheme: {
      correct: {
        type: Number,
        default: 4,
      },
      wrong: {
        type: Number,
        default: -1,
      },
      unattempted: {
        type: Number,
        default: 0,
      },
    },
    status: {
      type: String,
      enum: ['draft', 'published', 'archived'],
      default: 'draft',
      index: true,
    },
    publishedAt: {
      type: Date,
      default: null,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    metadata: {
      type: Map,
      of: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual for question count population
testSchema.virtual('questions', {
  ref: 'Question',
  localField: '_id',
  foreignField: 'testId',
});

// Indexes for fast lookup & filtering
testSchema.index({ status: 1, type: 1 });
testSchema.index({ subjects: 1, status: 1 });
testSchema.index({ createdAt: -1 });

export const Test = mongoose.model('Test', testSchema);
