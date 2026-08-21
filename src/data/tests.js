import { questions as test1Questions, TEST_DURATION_MINUTES as test1Duration } from './questions.js';
import { test2Questions, TEST2_DURATION_MINUTES as test2Duration } from './test2Questions.js';

export const TESTS = {
  'laws-of-motion': {
    id: 'laws-of-motion',
    title: 'Laws of Motion',
    subtitle: 'A focused chapter practice sheet.',
    subject: 'Physics',
    chapter: 'Laws of Motion',
    difficulty: 'Hard',
    durationMinutes: test1Duration,
    marksCorrect: 4,
    marksWrong: -1,
    testCode: 'NEET-LOM',
    allowedCodes: ['NEET-LOM', 'NEETLOM', 'LOM101', 'NEET2025'],
    questions: test1Questions,
    badgeText: 'Physics',
    syllabus: 'Newton\'s Laws of Motion, Friction, Circular Motion, Momentum & Impulse',
  },
  'neet-test-2': {
    id: 'neet-test-2',
    title: 'All India Test Series [01]',
    subtitle: 'Units, Math Tools, Kinematics & Basic Concepts of Chemistry',
    subject: 'Physics & Chemistry',
    chapter: 'Units, Kinematics & Chemistry',
    difficulty: 'Dropper (NEET)',
    durationMinutes: test2Duration,
    marksCorrect: 4,
    marksWrong: -1,
    testCode: 'AITS-01',
    allowedCodes: ['AITS-01', 'AITS01', 'NEET01', 'NEET-01', 'NEET2025'],
    questions: test2Questions,
    badgeText: 'Physics & Chemistry',
    syllabus: 'Physics: Units and Measurements, Mathematical Tools, Motion in a Straight Line, Motion in a Plane | Chemistry: Some Basic Concepts of Chemistry',
  },
};

export const TEST_LIST = Object.values(TESTS);

export const DEFAULT_TEST_ID = 'laws-of-motion';

export function getTest(testId) {
  return TESTS[testId] || TESTS[DEFAULT_TEST_ID];
}
