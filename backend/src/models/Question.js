import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema(
  {
    testId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Test',
      required: [true, 'Test reference is required'],
      index: true,
    },
    order: {
      type: Number,
      required: [true, 'Question order/number in test is required'],
      min: 1,
    },
    sourceQuestionNumber: {
      type: Number,
      default: null,
    },
    subject: {
      type: String,
      required: [true, 'Subject is required'],
      enum: {
        values: ['Physics', 'Chemistry', 'Botany', 'Zoology', 'Biology', 'General'],
        message: '{VALUE} is not a valid subject',
      },
      index: true,
    },
    chapter: {
      type: String,
      required: [true, 'Chapter name is required'],
      trim: true,
      index: true,
    },
    topic: {
      type: String,
      required: [true, 'Topic name is required'],
      trim: true,
      index: true,
    },
    difficulty: {
      type: String,
      enum: ['Easy', 'Medium', 'Hard'],
      default: 'Hard',
    },
    type: {
      type: String,
      enum: ['mcq', 'assertion_reason', 'match_list', 'numerical', 'diagram'],
      default: 'mcq',
    },
    question: {
      type: String,
      required: [true, 'Question content/text is required'],
      trim: true,
    },
    options: {
      type: Map,
      of: String,
      required: [true, 'Question options are required'],
      validate: {
        validator: function (v) {
          return v && v.size >= 2;
        },
        message: 'A question must have at least 2 options',
      },
    },
    correctAnswer: {
      type: String,
      required: [true, 'Correct answer key is required'],
      select: false, // CRITICAL: Excluded from student queries by default
    },
    explanation: {
      type: String,
      default: null,
      select: false, // Excluded from active exam queries by default
    },
    image: {
      type: String,
      default: null,
    },
    marks: {
      type: Number,
      default: 4,
    },
    negativeMarks: {
      type: Number,
      default: -1,
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'review_pending'],
      default: 'active',
      index: true,
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
questionSchema.index({ testId: 1, order: 1 }, { unique: true });
questionSchema.index({ testId: 1, subject: 1 });
questionSchema.index({ subject: 1, chapter: 1, topic: 1 });

export const Question = mongoose.model('Question', questionSchema);
