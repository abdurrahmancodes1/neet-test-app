import { existsSync } from 'node:fs';
import { questions as test1Questions } from '../src/data/questions.js';
import { test2Questions } from '../src/data/test2Questions.js';

const fail = (message) => { throw new Error(message); };

// Validate Test 1
const test1AnswerKey = {
  1:'C', 3:'C', 5:'D', 6:'D', 8:'B', 10:'B', 12:'D', 14:'B', 15:'A', 18:'C',
  19:'B', 21:'C', 22:'C', 24:'A', 25:'C', 28:'C', 29:'C', 30:'B', 31:'C', 32:'C',
  33:'D', 36:'B', 38:'C', 39:'C', 40:'C', 41:'C', 42:'A', 43:'D', 44:'A', 45:'A',
  46:'D', 47:'D', 48:'A', 49:'C', 50:'A', 51:'B', 52:'A', 53:'A', 54:'B', 55:'D',
  56:'D', 57:'D', 58:'D', 59:'C', 60:'A',
};

if (test1Questions.length !== 45) fail(`Expected 45 questions in Test 1, found ${test1Questions.length}.`);
if (new Set(test1Questions.map((q) => q.id)).size !== 45) fail('Test 1 Question IDs must be unique.');
if (new Set(test1Questions.map((q) => q.sourceQuestionNumber)).size !== 45) fail('Test 1 source question numbers must be unique.');
for (const question of test1Questions) {
  if (!question.sourceQuestionNumber || Object.keys(question.options).length !== 4) fail(`Invalid options for Q${question.id}.`);
  if (!question.options[question.correctAnswer]) fail(`Invalid answer for Q${question.id}.`);
  if (test1AnswerKey[question.sourceQuestionNumber] !== question.correctAnswer) fail(`Answer-key mismatch for PDF Q${question.sourceQuestionNumber}.`);
  if (question.image && !existsSync(`public${question.image}`)) fail(`Missing image: ${question.image}`);
}
console.log(`✓ Validated ${test1Questions.length} Laws of Motion questions.`);

// Validate Test 2
if (test2Questions.length !== 67) fail(`Expected 67 questions in Test 2, found ${test2Questions.length}.`);
if (new Set(test2Questions.map((q) => q.id)).size !== 67) fail('Test 2 Question IDs must be unique.');
if (new Set(test2Questions.map((q) => q.sourceQuestionNumber)).size !== 67) fail('Test 2 source question numbers must be unique.');

for (const question of test2Questions) {
  if (!question.sourceQuestionNumber || Object.keys(question.options).length !== 4) {
    fail(`Invalid options for Test 2 Q${question.id}.`);
  }
  if (!question.options[question.correctAnswer]) {
    fail(`Invalid answer for Test 2 Q${question.id}.`);
  }
  if (!question.subject || !question.chapter || !question.topic) {
    fail(`Missing metadata for Test 2 Q${question.id}.`);
  }
  if (question.image && !existsSync(`public${question.image}`)) {
    fail(`Missing image for Test 2: ${question.image}`);
  }
}
console.log(`✓ Validated ${test2Questions.length} NEET Test 2 questions (Physics + Chemistry).`);
