import { connectDatabase, closeDatabase } from '../config/database.js';
import { User, Test, Question, Result } from '../models/index.js';
import { createTestSchema } from '../validators/testValidators.js';
import { createQuestionSchema } from '../validators/questionValidators.js';
import { submitAnswersSchema } from '../validators/resultValidators.js';

async function runModelValidation() {
  console.log('--- Step 1: Validating Zod Schemas ---');
  
  // Test valid test schema
  const sampleTest = {
    title: 'NEET Practice Test 01',
    testCode: 'AITS-01',
    type: 'aits',
    subjects: ['Physics', 'Chemistry'],
    durationMinutes: 90,
  };
  const parsedTest = createTestSchema.parse(sampleTest);
  console.log('✓ createTestSchema parsed successfully:', parsedTest.title);

  // Test valid question schema
  const sampleQuestion = {
    testId: '507f1f77bcf86cd799439011',
    order: 1,
    subject: 'Physics',
    chapter: 'Units and Measurements',
    topic: 'Vernier Caliper',
    question: 'What is the least count?',
    options: { A: '0.1 mm', B: '0.01 mm', C: '1 mm', D: '0.001 mm' },
    correctAnswer: 'B',
  };
  const parsedQuestion = createQuestionSchema.parse(sampleQuestion);
  console.log('✓ createQuestionSchema parsed successfully (Q1)');

  // Test submit answers schema
  const sampleSubmission = {
    testId: '507f1f77bcf86cd799439011',
    answers: { '1': 'B', '2': 'C' },
    markedForReview: [1],
  };
  const parsedSubmission = submitAnswersSchema.parse(sampleSubmission);
  console.log('✓ submitAnswersSchema parsed successfully');

  console.log('\n--- Step 2: Validating Mongoose Models & Indexes ---');
  await connectDatabase();

  console.log('User model indexes:', User.schema.indexes());
  console.log('Test model indexes:', Test.schema.indexes());
  console.log('Question model indexes:', Question.schema.indexes());
  console.log('Result model indexes:', Result.schema.indexes());

  await closeDatabase();
  console.log('\n✓ All Model & Schema Validations Passed Successfully!');
}

runModelValidation().catch((err) => {
  console.error('Validation failed:', err);
  process.exit(1);
});
