import assert from 'node:assert/strict';
import { TestImportService } from '../services/testImportService.js';
import { ScoringService } from '../services/scoringService.js';

async function runVerification() {
  console.log('Testing JSON import duration modes and question explanation aliases...\n');

  // Test 1: Auto time limit mode
  const autoPayload = {
    title: 'Auto Duration Benchmark Test',
    examType: 'NEET',
    timeLimitMode: 'auto',
    questions: [
      {
        order: 1,
        question: 'What is $2 + 2$?',
        options: { A: '3', B: '4' },
        correctAnswer: 'B',
        solution: 'Direct arithmetic: $2 + 2 = 4$.',
      },
      {
        order: 2,
        question: 'What is $3 \\times 3$?',
        options: { A: '6', B: '9' },
        correctAnswer: 'B',
        explanation: 'Multiplication: $3 \\times 3 = 9$.',
      },
    ],
  };

  const preview1 = await TestImportService.validateAndPreview(autoPayload);
  assert.equal(preview1.isValid, true, 'Auto payload should be valid');
  assert.equal(preview1.test.timeLimitMode, 'auto', 'timeLimitMode should be auto');
  assert(preview1.test.durationMinutes >= 10, 'Auto duration should be at least min duration');
  assert.equal(
    preview1.questions[0].explanation,
    'Direct arithmetic: $2 + 2 = 4$.',
    'Solution alias should be mapped to explanation'
  );
  assert.equal(
    preview1.questions[1].explanation,
    'Multiplication: $3 \\times 3 = 9$.',
    'Standard explanation should be mapped'
  );
  console.log('✓ Test 1 Passed: Auto duration mode and solution alias correctly handled');

  // Test 2: Custom time limit with max cap
  const customPayload = {
    title: 'Custom Duration Strict Cap Test',
    examType: 'JEE_MAIN',
    timeLimitMode: 'custom',
    allowCustomDuration: true,
    maxDurationMinutes: 75,
    minDurationMinutes: 20,
    durationMinutes: 90, // higher than max cap - should be clamped!
    questions: [
      {
        order: 1,
        question: 'Force unit?',
        options: { A: 'Joule', B: 'Newton' },
        correctAnswer: 'B',
        solutionText: 'Newton (N) is the SI unit of force.',
      },
    ],
  };

  const preview2 = await TestImportService.validateAndPreview(customPayload);
  assert.equal(preview2.isValid, true, 'Custom payload should be valid');
  assert.equal(preview2.test.allowCustomDuration, true, 'allowCustomDuration should be true');
  assert.equal(preview2.test.maxCustomDurationMinutes, 75, 'maxCustomDurationMinutes should be 75');
  assert.equal(preview2.test.durationMinutes, 75, 'duration should be clamped to 75');
  assert.equal(
    preview2.questions[0].explanation,
    'Newton (N) is the SI unit of force.',
    'solutionText alias should be mapped to explanation'
  );
  console.log('✓ Test 2 Passed: Custom duration with strict max cap clamp and solutionText alias');

  // Test 3: Scoring evaluation preserves explanation and solution
  const evaluation = ScoringService.evaluateSubmission(
    [
      {
        _id: 'q1',
        order: 1,
        question: 'What is 2+2?',
        options: { A: '3', B: '4' },
        correctAnswer: 'B',
        solution: 'Direct arithmetic: $2 + 2 = 4$.',
      },
      {
        _id: 'q2',
        order: 2,
        question: 'What is 3*3?',
        options: { A: '6', B: '9' },
        correctAnswer: 'B',
        explanation: 'Multiplication: $3 \\times 3 = 9$.',
      },
    ],
    { q1: 'B', q2: 'A' }, // student got q2 wrong
    { correct: 4, wrong: -1, unattempted: 0 }
  );

  assert.equal(evaluation.evaluatedAnswers.length, 2);
  assert.equal(evaluation.evaluatedAnswers[0].status, 'correct');
  assert.equal(evaluation.evaluatedAnswers[0].explanation, 'Direct arithmetic: $2 + 2 = 4$.');
  assert.equal(evaluation.evaluatedAnswers[1].status, 'wrong');
  assert.equal(evaluation.evaluatedAnswers[1].explanation, 'Multiplication: $3 \\times 3 = 9$.');
  console.log('✓ Test 3 Passed: Scoring evaluation preserves explanations for wrong and correct questions');

  // Test 4: JEE Numerical Integer Questions Validation & Evaluation
  const jeePayload = {
    title: 'JEE Main 2027 Numerical Mock Test',
    examType: 'JEE_MAIN',
    questions: [
      {
        order: 1,
        question: 'Section A MCQ: Force unit?',
        options: { A: 'Joule', B: 'Newton' },
        correctAnswer: 'B',
      },
      {
        order: 2,
        type: 'numerical',
        question: 'Section B Numerical: Total bonding electrons in O2^2-?',
        options: {}, // empty options
        correctAnswer: '10', // integer answer
        solution: 'Bonding electrons = 10.',
      },
    ],
  };

  const previewJee = await TestImportService.validateAndPreview(jeePayload);
  assert.equal(previewJee.isValid, true, 'JEE payload with numerical question should be valid');
  assert.equal(previewJee.questions[1].type, 'numerical');
  assert.equal(previewJee.questions[1].correctAnswer, '10');
  console.log('✓ Test 4a Passed: JEE Numerical questions validated without requiring options');

  // Verify scoring of numerical questions with integer equivalence
  const jeeEval = ScoringService.evaluateSubmission(
    [
      {
        _id: 'q1',
        order: 1,
        type: 'mcq',
        options: { A: 'Joule', B: 'Newton' },
        correctAnswer: 'B',
      },
      {
        _id: 'q2',
        order: 2,
        type: 'numerical',
        options: {},
        correctAnswer: '10',
      },
      {
        _id: 'q3',
        order: 3,
        type: 'numerical',
        options: {},
        correctAnswer: '25',
      },
    ],
    {
      q1: 'B',    // Correct MCQ (+4)
      q2: '10.0', // Correct numerical equivalence (+4)
      q3: '14',   // Wrong numerical (-1)
    },
    { correct: 4, wrong: -1, unattempted: 0 }
  );

  assert.equal(jeeEval.correctCount, 2, 'q1 and q2 (10.0 == 10) must be evaluated as correct');
  assert.equal(jeeEval.wrongCount, 1, 'q3 must be evaluated as wrong');
  assert.equal(jeeEval.score, 7, 'Score should be 4 + 4 - 1 = 7');
  console.log('✓ Test 4b Passed: Numerical equivalence matching correctly graded');

  console.log('\n🎉 ALL CUSTOM DURATION & JEE NUMERICAL VERIFICATIONS PASSED!\n');
}

runVerification().catch((err) => {
  console.error('❌ Test failed:', err);
  process.exit(1);
});
