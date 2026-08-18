import { existsSync } from 'node:fs';
import { questions } from '../src/data/questions.js';

const fail = (message) => { throw new Error(message); };
const answerKey = {
  1:'C', 3:'C', 5:'D', 6:'D', 8:'B', 10:'B', 12:'D', 14:'B', 15:'A', 18:'C',
  19:'B', 21:'C', 22:'C', 24:'A', 25:'C', 28:'C', 29:'C', 30:'B', 31:'C', 32:'C',
  33:'D', 36:'B', 38:'C', 39:'C', 40:'C', 41:'C', 42:'A', 43:'D', 44:'A', 45:'A',
  46:'D', 47:'D', 48:'A', 49:'C', 50:'A', 51:'B', 52:'A', 53:'A', 54:'B', 55:'D',
  56:'D', 57:'D', 58:'D', 59:'C', 60:'A',
};
if (questions.length !== 45) fail(`Expected 45 questions, found ${questions.length}.`);
if (new Set(questions.map((q) => q.id)).size !== 45) fail('Question IDs must be unique.');
if (new Set(questions.map((q) => q.sourceQuestionNumber)).size !== 45) fail('Source question numbers must be unique.');
for (const question of questions) {
  if (!question.sourceQuestionNumber || Object.keys(question.options).length !== 4) fail(`Invalid options for Q${question.id}.`);
  if (!question.options[question.correctAnswer]) fail(`Invalid answer for Q${question.id}.`);
  if (answerKey[question.sourceQuestionNumber] !== question.correctAnswer) fail(`Answer-key mismatch for PDF Q${question.sourceQuestionNumber}.`);
  if (question.image && !existsSync(`public${question.image}`)) fail(`Missing image: ${question.image}`);
}
console.log(`Validated ${questions.length} Laws of Motion questions.`);
