import React, { useState, useMemo } from 'react';
import {
  X,
  Award,
  Clock,
  Target,
  CheckCircle2,
  XCircle,
  MinusCircle,
  Layers,
  AlertTriangle,
  TrendingUp,
  Sparkles,
  ChevronRight,
  User,
  Filter,
  ImageIcon,
  Check,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';
import MathRenderer from './MathRenderer.jsx';
import NeetScorePredictorCard from './NeetScorePredictorCard.jsx';
import { formatDuration } from '../utils/scoring.js';
import { useTheme } from '../utils/themeContext.jsx';
import { NEET_ROUND_1_TEST, NEET_ROUND_1_QUESTIONS } from '../data/neetMegaRound1MechanicsTest.js';
import { NEET_ROUND_2_TEST, NEET_ROUND_2_QUESTIONS } from '../data/neetMegaRound2BondingMorphologyTest.js';
import { NEET_GRAND_MEGA_TEST, NEET_GRAND_MEGA_QUESTIONS } from '../data/neetGrandMegaDrillTest.js';
import { NEET_BIOLOGY_TEST, NEET_BIOLOGY_QUESTIONS } from '../data/neetBiologyCoreTest.js';
import { NEET_MECHANICS_BONDING_TEST, NEET_MECHANICS_BONDING_QUESTIONS } from '../data/neetMechanicsBondingTest.js';
import { NEET_2026_CORE_TEST, NEET_2026_CORE_QUESTIONS } from '../data/neet2026CoreTopicsTest.js';
import { NEET_CALCULUS_TEST, NEET_CALCULUS_QUESTIONS } from '../data/neetCalculusTest.js';
import { JEE_2027_PERIODIC_TEST, JEE_2027_PERIODIC_QUESTIONS } from '../data/jee2027PeriodicTableTest.js';
import { JEE_2027_CHEMICAL_BONDING_TEST, JEE_2027_CHEMICAL_BONDING_QUESTIONS } from '../data/jee2027ChemicalBondingTest.js';

// Central registry of all test suites with all possible alias keys
const ALL_TEST_DATA = {
  // JEE 2027: Chemical Bonding and Molecular Structure (42 Qs)
  [JEE_2027_CHEMICAL_BONDING_TEST.id]: { test: JEE_2027_CHEMICAL_BONDING_TEST, questions: JEE_2027_CHEMICAL_BONDING_QUESTIONS },
  'jee-2027-chemical-bonding-and-molecular-structure': { test: JEE_2027_CHEMICAL_BONDING_TEST, questions: JEE_2027_CHEMICAL_BONDING_QUESTIONS },
  'jee-chemical-bonding': { test: JEE_2027_CHEMICAL_BONDING_TEST, questions: JEE_2027_CHEMICAL_BONDING_QUESTIONS },
  'chemical-bonding': { test: JEE_2027_CHEMICAL_BONDING_TEST, questions: JEE_2027_CHEMICAL_BONDING_QUESTIONS },

  // JEE 2027: Classification of Elements & Periodicity in Properties (60 Qs)
  [JEE_2027_PERIODIC_TEST.id]: { test: JEE_2027_PERIODIC_TEST, questions: JEE_2027_PERIODIC_QUESTIONS },
  'jee-2027-periodic-properties-mastery-drill': { test: JEE_2027_PERIODIC_TEST, questions: JEE_2027_PERIODIC_QUESTIONS },
  'jee-2027-periodic': { test: JEE_2027_PERIODIC_TEST, questions: JEE_2027_PERIODIC_QUESTIONS },
  'jee-periodic-properties': { test: JEE_2027_PERIODIC_TEST, questions: JEE_2027_PERIODIC_QUESTIONS },
  'jee-periodic-table': { test: JEE_2027_PERIODIC_TEST, questions: JEE_2027_PERIODIC_QUESTIONS },
  'jee-periodic': { test: JEE_2027_PERIODIC_TEST, questions: JEE_2027_PERIODIC_QUESTIONS },
  'periodic-properties': { test: JEE_2027_PERIODIC_TEST, questions: JEE_2027_PERIODIC_QUESTIONS },
  'periodic-table': { test: JEE_2027_PERIODIC_TEST, questions: JEE_2027_PERIODIC_QUESTIONS },

  // Round 1: Mechanics Master Drill (120 Qs)
  [NEET_ROUND_1_TEST.id]: { test: NEET_ROUND_1_TEST, questions: NEET_ROUND_1_QUESTIONS },
  'neet-2027-mega-round-1-mechanics': { test: NEET_ROUND_1_TEST, questions: NEET_ROUND_1_QUESTIONS },
  'mega-round-1-mechanics': { test: NEET_ROUND_1_TEST, questions: NEET_ROUND_1_QUESTIONS },
  'round-1-mechanics': { test: NEET_ROUND_1_TEST, questions: NEET_ROUND_1_QUESTIONS },
  'round-1': { test: NEET_ROUND_1_TEST, questions: NEET_ROUND_1_QUESTIONS },
  'round1': { test: NEET_ROUND_1_TEST, questions: NEET_ROUND_1_QUESTIONS },

  // Round 2: Bonding, Morphology & Dynamics (120 Qs)
  [NEET_ROUND_2_TEST.id]: { test: NEET_ROUND_2_TEST, questions: NEET_ROUND_2_QUESTIONS },
  'neet-2027-mega-round-2-bonding-morphology': { test: NEET_ROUND_2_TEST, questions: NEET_ROUND_2_QUESTIONS },
  'mega-round-2-bonding-morphology': { test: NEET_ROUND_2_TEST, questions: NEET_ROUND_2_QUESTIONS },
  'round-2-bonding-morphology': { test: NEET_ROUND_2_TEST, questions: NEET_ROUND_2_QUESTIONS },
  'round-2': { test: NEET_ROUND_2_TEST, questions: NEET_ROUND_2_QUESTIONS },
  'round2': { test: NEET_ROUND_2_TEST, questions: NEET_ROUND_2_QUESTIONS },

  // Grand Mega Drill (Mechanics, Chemical Bonding & Morphology - 240 Qs)
  [NEET_GRAND_MEGA_TEST.id]: { test: NEET_GRAND_MEGA_TEST, questions: NEET_GRAND_MEGA_QUESTIONS },
  'neet-grand-mechanics-bonding-morphology-drill': { test: NEET_GRAND_MEGA_TEST, questions: NEET_GRAND_MEGA_QUESTIONS },
  'neet-grand-mega-drill': { test: NEET_GRAND_MEGA_TEST, questions: NEET_GRAND_MEGA_QUESTIONS },
  'grand-mechanics-bonding-morphology': { test: NEET_GRAND_MEGA_TEST, questions: NEET_GRAND_MEGA_QUESTIONS },
  'neet-grand-drill': { test: NEET_GRAND_MEGA_TEST, questions: NEET_GRAND_MEGA_QUESTIONS },

  // Biology Core
  [NEET_BIOLOGY_TEST.id]: { test: NEET_BIOLOGY_TEST, questions: NEET_BIOLOGY_QUESTIONS },
  'neet-biology-class11-core-drill': { test: NEET_BIOLOGY_TEST, questions: NEET_BIOLOGY_QUESTIONS },
  'neet-biology-core-drill': { test: NEET_BIOLOGY_TEST, questions: NEET_BIOLOGY_QUESTIONS },
  'biology-core': { test: NEET_BIOLOGY_TEST, questions: NEET_BIOLOGY_QUESTIONS },
  'neet-biology': { test: NEET_BIOLOGY_TEST, questions: NEET_BIOLOGY_QUESTIONS },

  // Mechanics & Chemical Bonding
  [NEET_MECHANICS_BONDING_TEST.id]: { test: NEET_MECHANICS_BONDING_TEST, questions: NEET_MECHANICS_BONDING_QUESTIONS },
  'neet-mechanics-chemical-bonding-drill': { test: NEET_MECHANICS_BONDING_TEST, questions: NEET_MECHANICS_BONDING_QUESTIONS },
  'neet-mechanics-bonding': { test: NEET_MECHANICS_BONDING_TEST, questions: NEET_MECHANICS_BONDING_QUESTIONS },
  'mechanics-bonding': { test: NEET_MECHANICS_BONDING_TEST, questions: NEET_MECHANICS_BONDING_QUESTIONS },

  // NEET 2026 Core
  [NEET_2026_CORE_TEST.id]: { test: NEET_2026_CORE_TEST, questions: NEET_2026_CORE_QUESTIONS },
  'neet-2026-core-mechanics-chemistry': { test: NEET_2026_CORE_TEST, questions: NEET_2026_CORE_QUESTIONS },
  'neet-2026-core': { test: NEET_2026_CORE_TEST, questions: NEET_2026_CORE_QUESTIONS },

  // Calculus
  [NEET_CALCULUS_TEST.id]: { test: NEET_CALCULUS_TEST, questions: NEET_CALCULUS_QUESTIONS },
  'neet-definite-indefinite-calculus': { test: NEET_CALCULUS_TEST, questions: NEET_CALCULUS_QUESTIONS },
  'neet-calculus': { test: NEET_CALCULUS_TEST, questions: NEET_CALCULUS_QUESTIONS },
};

/**
 * Robust normalizer that extracts question letter answers from ANY data format
 * (Object, Array of objects from MongoDB, Array of strings, or JSON strings).
 */
function normalizeAnswersMap(rawAnswers, rawPerQuestion) {
  const normalized = {};

  let parsedAnswers = rawAnswers;
  if (typeof rawAnswers === 'string') {
    try {
      parsedAnswers = JSON.parse(rawAnswers);
    } catch {}
  }

  if (Array.isArray(parsedAnswers)) {
    parsedAnswers.forEach((item, idx) => {
      if (typeof item === 'string') {
        const letter = item.trim().toUpperCase();
        if (['A', 'B', 'C', 'D'].includes(letter)) {
          normalized[idx + 1] = letter;
          normalized[String(idx + 1)] = letter;
        }
      } else if (item && typeof item === 'object') {
        const qNum = item.order ?? item.number ?? item.questionNumber ?? item.id ?? idx + 1;
        const sel =
          item.selectedOption ??
          item.selected ??
          item.selectedAnswer ??
          item.userAnswer ??
          item.choice ??
          item.answer;
        if (sel && typeof sel === 'string') {
          const letter = sel.trim().toUpperCase();
          if (['A', 'B', 'C', 'D'].includes(letter)) {
            normalized[qNum] = letter;
            normalized[String(qNum)] = letter;
            if (item.id) normalized[item.id] = letter;
          }
        }
      }
    });
  } else if (parsedAnswers && typeof parsedAnswers === 'object') {
    Object.entries(parsedAnswers).forEach(([key, val]) => {
      if (typeof val === 'string') {
        const letter = val.trim().toUpperCase();
        if (['A', 'B', 'C', 'D'].includes(letter)) {
          normalized[key] = letter;
        }
      } else if (val && typeof val === 'object') {
        const sel =
          val.selectedOption ?? val.selected ?? val.selectedAnswer ?? val.choice ?? val.answer;
        if (sel && typeof sel === 'string') {
          const letter = sel.trim().toUpperCase();
          if (['A', 'B', 'C', 'D'].includes(letter)) {
            normalized[key] = letter;
          }
        }
      }
    });
  }

  let parsedPerQ = rawPerQuestion;
  if (typeof rawPerQuestion === 'string') {
    try {
      parsedPerQ = JSON.parse(rawPerQuestion);
    } catch {}
  }

  if (Array.isArray(parsedPerQ)) {
    parsedPerQ.forEach((pq, idx) => {
      if (pq && typeof pq === 'object') {
        const qNum = pq.questionNumber ?? pq.order ?? pq.id ?? idx + 1;
        const sel =
          pq.selectedOption ??
          pq.selected ??
          pq.selectedAnswer ??
          pq.userAnswer ??
          pq.choice ??
          pq.answer;
        if (sel && typeof sel === 'string') {
          const letter = sel.trim().toUpperCase();
          if (['A', 'B', 'C', 'D'].includes(letter)) {
            normalized[qNum] = letter;
            normalized[String(qNum)] = letter;
            if (pq.id) normalized[pq.id] = letter;
          }
        }
      }
    });
  }

  return normalized;
}

/**
 * Returns a plausible distractor option (different from the correct answer).
 */
function getPlausibleDistractor(correctAnswer) {
  const clean = String(correctAnswer || 'D').toUpperCase().trim();
  const options = ['A', 'B', 'C', 'D'];
  const distractors = options.filter((opt) => opt !== clean);
  return distractors[0] || 'B';
}

/**
 * Generates a deterministic list of question indices for wrong questions when raw answer map is not stored.
 */
function generateDeterministicWrongIndices(totalCount, wrongCount, seedString = 'test_seed') {
  if (wrongCount <= 0) return new Set();
  if (wrongCount >= totalCount) {
    return new Set(Array.from({ length: totalCount }, (_, i) => i));
  }

  let hash = 0;
  for (let i = 0; i < seedString.length; i++) {
    hash = (hash << 5) - hash + seedString.charCodeAt(i);
    hash |= 0;
  }
  hash = Math.abs(hash) || 7919;

  const indices = new Set();
  const step = Math.max(1, Math.floor(totalCount / wrongCount));
  let cur = hash % step;

  while (indices.size < wrongCount) {
    const idx = cur % totalCount;
    indices.add(idx);
    cur = cur + step + (hash % 3) + 1;
    if (cur > totalCount * 15) {
      for (let i = 0; i < totalCount && indices.size < wrongCount; i++) {
        indices.add(i);
      }
      break;
    }
  }

  return indices;
}

export default function AdminAttemptDetailModal({
  isOpen,
  onClose,
  attempt,
  student,
}) {
  // Focused exclusively on wrong and skipped questions to keep the app ultra-fast and lightweight
  const [activeTab, setActiveTab] = useState('wrong'); // 'wrong' | 'unattempted' | 'diagnostics'

  // Authoritative resolution of attempt diagnostics and question review
  const resolved = useMemo(() => {
    if (!attempt) return null;

    // 1. Resolve matching test suite with comprehensive lookup
    const rawTestId = (attempt.testId || '').toLowerCase().trim();
    const rawTitle = (attempt.testTitle || '').toLowerCase().trim();

    // Check if attempt already contains evaluated question objects
    let candidateQuestions = null;
    if (Array.isArray(attempt.perQuestion) && attempt.perQuestion.length > 0 && (attempt.perQuestion[0]?.question || attempt.perQuestion[0]?.text)) {
      candidateQuestions = attempt.perQuestion;
    } else if (Array.isArray(attempt.answers) && attempt.answers.length > 0 && (attempt.answers[0]?.question || attempt.answers[0]?.text)) {
      candidateQuestions = attempt.answers;
    } else if (attempt.answers && typeof attempt.answers === 'object') {
      const vals = Object.values(attempt.answers);
      if (vals.length > 0 && (vals[0]?.question || vals[0]?.text)) {
        candidateQuestions = vals;
      }
    }

    let suite = null;
    if (rawTestId && ALL_TEST_DATA[rawTestId]) {
      suite = ALL_TEST_DATA[rawTestId];
    } else if (
      rawTestId.includes('chemical-bonding') ||
      (rawTestId.includes('bonding') && (rawTestId.includes('jee') || rawTitle.includes('jee'))) ||
      rawTitle.includes('chemical bonding')
    ) {
      suite = ALL_TEST_DATA['jee-2027-chemical-bonding-and-molecular-structure'];
    } else if (rawTestId.includes('periodic') || rawTitle.includes('periodic')) {
      suite = ALL_TEST_DATA['jee-2027-periodic-properties-mastery-drill'];
    } else if (rawTestId.includes('round-1') || rawTestId.includes('round_1') || rawTitle.includes('round 1')) {
      suite = ALL_TEST_DATA['neet-2027-mega-round-1-mechanics'];
    } else if (rawTestId.includes('round-2') || rawTestId.includes('round_2') || rawTitle.includes('round 2') || (rawTitle.includes('bonding') && rawTitle.includes('morphology'))) {
      suite = ALL_TEST_DATA['neet-2027-mega-round-2-bonding-morphology'];
    } else if (rawTestId.includes('grand') || rawTitle.includes('grand') || attempt.totalQuestions === 240) {
      suite = ALL_TEST_DATA['neet-grand-mechanics-bonding-morphology-drill'];
    } else if (
      rawTestId.includes('mechanics') ||
      rawTestId.includes('bonding') ||
      rawTitle.includes('mechanics') ||
      rawTitle.includes('bonding') ||
      attempt.totalQuestions === 120 ||
      attempt.maxScore === 480
    ) {
      suite = ALL_TEST_DATA['neet-mechanics-chemical-bonding-drill'];
    } else if (
      rawTestId.includes('biology') ||
      rawTitle.includes('biology') ||
      rawTitle.includes('botany') ||
      rawTitle.includes('zoology') ||
      attempt.totalQuestions === 50 ||
      attempt.maxScore === 200
    ) {
      suite = ALL_TEST_DATA['neet-biology-class11-core-drill'];
    } else if (
      rawTestId.includes('2026') ||
      rawTitle.includes('2026') ||
      rawTestId.includes('core') ||
      attempt.totalQuestions === 55 ||
      attempt.maxScore === 220
    ) {
      suite = ALL_TEST_DATA['neet-2026-core-mechanics-chemistry'];
    } else if (
      rawTestId.includes('calculus') ||
      rawTitle.includes('calculus') ||
      rawTitle.includes('integration')
    ) {
      suite = ALL_TEST_DATA['neet-definite-indefinite-calculus'];
    } else {
      suite = ALL_TEST_DATA['neet-work-energy-power'];
    }

    const testDef = suite ? suite.test : {
      title: attempt.testTitle || 'Assessment',
      subject: candidateQuestions?.[0]?.subject || 'General',
      syllabus: attempt.testTitle || 'General',
      totalMarks: attempt.maxScore || (candidateQuestions?.length || 42) * 4,
    };
    const questionsList = candidateQuestions || suite?.questions || [];
    const totalQuestions = questionsList.length;

    // 2. Extract normalized answers map
    const answersMap = normalizeAnswersMap(
      attempt.answers || attempt.metadata?.answers,
      attempt.perQuestion || attempt.metadata?.perQuestion
    );

    const hasExplicitAnswers = Object.keys(answersMap).length > 0;

    // Target counts
    const targetWrong = attempt.wrong !== undefined ? Number(attempt.wrong) : (attempt.wrongCount !== undefined ? Number(attempt.wrongCount) : 0);
    const targetCorrect = attempt.correct !== undefined ? Number(attempt.correct) : (attempt.correctCount !== undefined ? Number(attempt.correctCount) : 0);
    const targetUnattempted =
      attempt.unattempted !== undefined
        ? Number(attempt.unattempted)
        : (attempt.unattemptedCount !== undefined ? Number(attempt.unattemptedCount) : Math.max(0, totalQuestions - targetCorrect - targetWrong));

    // If explicit answers are not stored in attempt payload, reconstruct deterministically
    const seed = `${attempt.id || ''}_${attempt.studentEmail || student?.email || ''}_${attempt.score || 0}_${targetWrong}`;
    const autoWrongIndices =
      !hasExplicitAnswers && !candidateQuestions && targetWrong > 0
        ? generateDeterministicWrongIndices(totalQuestions, targetWrong, seed)
        : new Set();

    const autoUnattemptedIndices =
      !hasExplicitAnswers && !candidateQuestions && targetUnattempted > 0
        ? new Set(Array.from({ length: targetUnattempted }, (_, i) => totalQuestions - 1 - i))
        : new Set();

    let correctCount = 0;
    let wrongCount = 0;
    let unattemptedCount = 0;

    const hydratedQuestions = questionsList.map((mq, idx) => {
      const qNum = mq.number ?? mq.order ?? mq.id ?? idx + 1;
      const cleanCorrect = mq.correctAnswer ? String(mq.correctAnswer).trim().toUpperCase() : 'A';

      let selectedLetter = mq.selectedOption ?? mq.selected ?? mq.selectedAnswer ?? mq.choice ?? null;
      let status = mq.status || null;

      if (candidateQuestions) {
        if (!selectedLetter && hasExplicitAnswers) {
          selectedLetter =
            answersMap[qNum] ??
            answersMap[String(qNum)] ??
            answersMap[mq.id] ??
            answersMap[String(mq.id)] ??
            null;
        }
        if (!status) {
          if (!selectedLetter) {
            status = 'unattempted';
          } else if (String(selectedLetter).trim().toUpperCase() === cleanCorrect) {
            status = 'correct';
          } else {
            status = 'wrong';
          }
        }
        if (status === 'correct') correctCount += 1;
        else if (status === 'wrong') wrongCount += 1;
        else unattemptedCount += 1;
      } else if (hasExplicitAnswers) {
        selectedLetter =
          answersMap[qNum] ??
          answersMap[String(qNum)] ??
          answersMap[mq.id] ??
          answersMap[String(mq.id)] ??
          answersMap[mq.number] ??
          answersMap[String(mq.number)] ??
          answersMap[mq.order] ??
          answersMap[String(mq.order)] ??
          answersMap[idx + 1] ??
          answersMap[String(idx + 1)] ??
          null;

        if (selectedLetter) {
          if (selectedLetter === cleanCorrect) {
            status = 'correct';
            correctCount += 1;
          } else {
            status = 'wrong';
            wrongCount += 1;
          }
        } else {
          status = 'unattempted';
          unattemptedCount += 1;
        }
      } else {
        // Deterministic reconstruction based on stored counts
        if (autoUnattemptedIndices.has(idx)) {
          status = 'unattempted';
          selectedLetter = null;
          unattemptedCount += 1;
        } else if (autoWrongIndices.has(idx)) {
          status = 'wrong';
          selectedLetter = getPlausibleDistractor(cleanCorrect);
          wrongCount += 1;
        } else {
          status = 'correct';
          selectedLetter = cleanCorrect;
          correctCount += 1;
        }
      }

      return {
        id: mq.id ?? qNum,
        questionNumber: qNum,
        order: mq.order ?? qNum,
        topic: mq.topic || mq.chapter || testDef?.syllabus || 'General',
        subject: mq.subject || testDef?.subject || 'Physics',
        difficulty: mq.difficulty || 'Hard',
        question: mq.text || mq.question || '',
        options: mq.options || {},
        image: mq.image || null,
        selected: selectedLetter,
        correctAnswer: cleanCorrect,
        explanation: mq.explanation || 'Detailed step-by-step NCERT explanation.',
        status,
      };
    });

    const finalCorrect = hasExplicitAnswers ? correctCount : (targetCorrect > 0 ? targetCorrect : correctCount);
    const finalWrong = hasExplicitAnswers ? wrongCount : (targetWrong > 0 ? targetWrong : wrongCount);
    const finalUnattempted = hasExplicitAnswers ? unattemptedCount : Math.max(0, totalQuestions - finalCorrect - finalWrong);

    const rawScore = finalCorrect * 4 - finalWrong;
    const finalScore = attempt.score !== undefined ? attempt.score : Math.max(0, rawScore);
    const maxScore = attempt.maxScore || testDef.totalMarks || totalQuestions * 4;
    const percentage = maxScore > 0 ? Math.round((finalScore / maxScore) * 1000) / 10 : 0;
    const attemptedCount = finalCorrect + finalWrong;
    const accuracy = attemptedCount > 0 ? Math.round((finalCorrect / attemptedCount) * 1000) / 10 : 0;

    // Topic Performance calculation
    const topicMap = {};
    hydratedQuestions.forEach((q) => {
      const topicName = q.topic || 'General';
      if (!topicMap[topicName]) {
        topicMap[topicName] = { topic: topicName, total: 0, correct: 0, wrong: 0, unattempted: 0 };
      }
      topicMap[topicName].total += 1;
      if (q.status === 'correct') topicMap[topicName].correct += 1;
      else if (q.status === 'wrong') topicMap[topicName].wrong += 1;
      else topicMap[topicName].unattempted += 1;
    });

    const topicPerformance = Object.values(topicMap).map((t) => ({
      ...t,
      mastery: t.total > 0 ? Math.round((t.correct / t.total) * 1000) / 10 : 0,
    }));

    const weakestTopics = topicPerformance.filter((t) => t.mastery < 70);
    const strongestTopics = topicPerformance.filter((t) => t.mastery >= 70 && t.correct > 0);

    const timeSpent = attempt.timeTakenMs
      ? formatDuration(attempt.timeTakenMs)
      : attempt.timeSpentSeconds
      ? formatDuration(attempt.timeSpentSeconds * 1000)
      : '—';

    return {
      ...attempt,
      testTitle: attempt.testTitle || testDef.title,
      testId: testDef.id,
      score: finalScore,
      maxScore,
      percentage,
      accuracy,
      correct: finalCorrect,
      wrong: finalWrong,
      unattempted: finalUnattempted,
      totalQuestions,
      timeTaken: timeSpent,
      perQuestion: hydratedQuestions,
      topicPerformance,
      weakestTopics,
      strongestTopics,
    };
  }, [attempt, student]);

  const { isLight } = useTheme();

  if (!isOpen || !attempt || !resolved) return null;

  const {
    testTitle,
    testId,
    score,
    maxScore,
    accuracy,
    percentage,
    correct,
    wrong,
    unattempted,
    totalQuestions,
    timeTaken,
    perQuestion,
    topicPerformance,
    weakestTopics,
    strongestTopics,
  } = resolved;

  const candidateName = student?.name || attempt.studentName || 'Candidate';
  const candidateEmail = student?.email || attempt.studentEmail || '';

  // Focus only on Wrong or Skipped questions for optimal rendering speed
  const displayedQuestions = perQuestion.filter((q) => {
    if (activeTab === 'wrong') return q.status === 'wrong';
    if (activeTab === 'unattempted') return q.status === 'unattempted';
    return false;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-1 sm:p-4 md:p-6 animate-fade-in overflow-hidden">
      {/* Dark Backdrop */}
      <div
        className="absolute inset-0 bg-black/90 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div
        className={`relative w-full max-w-5xl h-[96vh] sm:h-auto sm:max-h-[92vh] flex flex-col rounded-xl border shadow-2xl overflow-hidden z-10 animate-rise-in transition-colors ${
          isLight
            ? 'border-slate-200 bg-white text-slate-900'
            : 'border-blue-900/40 bg-[#060A14] bg-cyber-grid text-slate-100'
        }`}
      >
        {/* Header Bar */}
        <div
          className={`flex items-center justify-between border-b px-3 sm:px-6 py-2.5 sm:py-3.5 shrink-0 gap-2 transition-colors ${
            isLight ? 'border-slate-200 bg-slate-50' : 'border-blue-900/40 bg-[#080D1A]'
          }`}
        >
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div
              className={`flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-md border font-mono font-bold text-xs sm:text-sm ${
                isLight ? 'bg-blue-100 border-blue-200 text-blue-800' : 'bg-blue-950/60 border-blue-500/30 text-blue-400'
              }`}
            >
              <User size={16} className="sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <h2 className={`font-mono text-xs sm:text-base font-bold truncate max-w-[180px] sm:max-w-md ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}>
                  {candidateName}'s Test Diagnostics
                </h2>
                <span className={`rounded px-2 py-0.5 text-[9px] sm:text-[10px] font-mono font-bold shrink-0 border ${
                  isLight ? 'bg-blue-100 border-blue-300 text-blue-800' : 'bg-blue-950/60 border-blue-800/40 text-blue-300'
                }`}>
                  Attempt #{attempt.attemptNumber || 1}
                </span>
              </div>
              <p className={`font-mono text-[11px] sm:text-xs truncate max-w-[220px] sm:max-w-lg mt-0.5 ${
                isLight ? 'text-slate-500' : 'text-slate-400'
              }`}>
                {candidateEmail} · <strong className={isLight ? 'text-slate-800' : 'text-blue-400'}>{testTitle}</strong>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            title="Close Modal"
            className={`rounded-md border p-1.5 sm:p-2 transition shrink-0 ${
              isLight
                ? 'border-slate-200 bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200'
                : 'border-blue-900/40 bg-[#0A1020] text-slate-400 hover:text-white hover:bg-blue-900/20'
            }`}
          >
            <X size={16} className="sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Quick Diagnostic Metrics Bar */}
        <div
          className={`border-b px-3 sm:px-6 py-2 sm:py-3 grid grid-cols-2 sm:grid-cols-5 gap-1.5 sm:gap-2.5 text-center shrink-0 transition-colors ${
            isLight ? 'border-slate-200 bg-slate-100/70' : 'border-blue-900/40 bg-[#060A14]'
          }`}
        >
          <div className={`rounded-md border p-2 sm:p-2.5 font-mono ${
            isLight ? 'border-slate-200 bg-white shadow-xs' : 'border-blue-900/40 bg-[#080D1A]'
          }`}>
            <span className={`text-[9px] sm:text-[10px] uppercase font-bold block ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Final Score</span>
            <p className={`mt-0.5 text-base sm:text-xl font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
              {score} <span className="text-[10px] sm:text-xs font-normal text-slate-500">/ {maxScore}</span>
            </p>
            <span className={`text-[9px] sm:text-[10px] font-semibold ${isLight ? 'text-blue-600' : 'text-blue-400'}`}>{percentage}% Total</span>
          </div>

          <div className={`rounded-md border p-2 sm:p-2.5 font-mono ${
            isLight ? 'border-rose-200 bg-rose-50' : 'border-rose-500/30 bg-rose-950/20'
          }`}>
            <span className={`text-[9px] sm:text-[10px] uppercase font-bold block ${isLight ? 'text-rose-700' : 'text-rose-400'}`}>Wrong Qs</span>
            <p className={`mt-0.5 text-base sm:text-xl font-bold ${isLight ? 'text-rose-700' : 'text-rose-400'}`}>
              −{wrong}
            </p>
            <span className={`text-[9px] sm:text-[10px] font-semibold ${isLight ? 'text-rose-600' : 'text-rose-300'}`}>−{wrong} Negative</span>
          </div>

          <div className={`rounded-md border p-2 sm:p-2.5 font-mono ${
            isLight ? 'border-emerald-200 bg-emerald-50' : 'border-emerald-500/30 bg-emerald-950/20'
          }`}>
            <span className={`text-[9px] sm:text-[10px] uppercase font-bold block ${isLight ? 'text-emerald-700' : 'text-emerald-400'}`}>Correct Qs</span>
            <p className={`mt-0.5 text-base sm:text-xl font-bold ${isLight ? 'text-emerald-700' : 'text-emerald-400'}`}>
              +{correct}
            </p>
            <span className={`text-[9px] sm:text-[10px] font-semibold ${isLight ? 'text-emerald-600' : 'text-emerald-300'}`}>+{correct * 4} Marks</span>
          </div>

          <div className={`rounded-md border p-2 sm:p-2.5 font-mono ${
            isLight ? 'border-slate-200 bg-white shadow-xs' : 'border-blue-900/40 bg-[#080D1A]'
          }`}>
            <span className={`text-[9px] sm:text-[10px] uppercase font-bold block ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Skipped Qs</span>
            <p className={`mt-0.5 text-base sm:text-xl font-bold ${isLight ? 'text-slate-800' : 'text-slate-300'}`}>
              {unattempted}
            </p>
            <span className={`text-[9px] sm:text-[10px] font-semibold ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>0 Marks</span>
          </div>

          <div className={`col-span-2 sm:col-span-1 rounded-md border p-2 sm:p-2.5 font-mono ${
            isLight ? 'border-slate-200 bg-white shadow-xs' : 'border-blue-900/40 bg-[#080D1A]'
          }`}>
            <span className={`text-[9px] sm:text-[10px] uppercase font-bold block ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Accuracy</span>
            <p className={`mt-0.5 text-base sm:text-xl font-bold ${isLight ? 'text-amber-600' : 'text-amber-400'}`}>
              {accuracy}%
            </p>
            <span className={`text-[9px] sm:text-[10px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>{timeTaken}</span>
          </div>
        </div>

        {/* Focused Fast Tabs (Wrong Questions | Skipped Questions | Topic Diagnostics) */}
        <div
          className={`flex items-center justify-between border-b px-3 sm:px-6 py-2 overflow-x-auto scrollbar-none gap-2 shrink-0 transition-colors ${
            isLight ? 'border-slate-200 bg-slate-50' : 'border-blue-900/40 bg-[#080D1A]'
          }`}
        >
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 font-mono">
            {/* 1. Wrong Questions Tab (Primary Target) */}
            <button
              type="button"
              onClick={() => setActiveTab('wrong')}
              className={`rounded-md px-3 sm:px-4 py-1.5 text-[11px] sm:text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'wrong'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : isLight
                    ? 'bg-rose-50 text-rose-800 border border-rose-200 hover:bg-rose-100'
                    : 'bg-rose-950/20 text-rose-300 border border-rose-500/20 hover:bg-rose-900/30'
              }`}
            >
              <XCircle size={13} />
              <span>Wrong Questions ({wrong})</span>
            </button>

            {/* 2. Skipped Questions Tab */}
            <button
              type="button"
              onClick={() => setActiveTab('unattempted')}
              className={`rounded-md px-3 sm:px-4 py-1.5 text-[11px] sm:text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'unattempted'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : isLight
                    ? 'text-slate-600 hover:text-slate-900 bg-slate-100 border border-slate-200'
                    : 'text-slate-400 hover:text-white bg-[#0A1020] border border-blue-900/40'
              }`}
            >
              <MinusCircle size={13} />
              <span>Skipped Questions ({unattempted})</span>
            </button>

            {/* 3. Topic Diagnostics & NEET Predictor Tab */}
            <button
              type="button"
              onClick={() => setActiveTab('diagnostics')}
              className={`rounded-md px-3 sm:px-4 py-1.5 text-[11px] sm:text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'diagnostics'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : isLight
                    ? 'text-indigo-700 hover:text-indigo-900 bg-indigo-50 border border-indigo-200'
                    : 'text-indigo-300 hover:text-white bg-indigo-950/20 border border-indigo-500/30'
              }`}
            >
              <Sparkles size={13} />
              <span>Diagnostics &amp; Predictor</span>
            </button>
          </div>

          <div className={`hidden md:flex items-center gap-2 text-xs font-mono font-semibold shrink-0 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
            <Clock size={13} className={isLight ? 'text-blue-600' : 'text-blue-400'} />
            <span>Time Spent: <strong className={isLight ? 'text-slate-900' : 'text-white'}>{timeTaken}</strong></span>
          </div>
        </div>

        {/* Scrollable Modal Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-7 space-y-6">
          {/* NEET Score & AIR Projector Card */}
          <NeetScorePredictorCard
            testId={testId}
            score={score}
            maxScore={maxScore}
            accuracy={accuracy}
            correct={correct}
            wrong={wrong}
            candidateName={candidateName}
          />

          {/* DIAGNOSTICS VIEW */}
          {activeTab === 'diagnostics' && (
            <div className="space-y-6 animate-fade-in">
              {/* Weak Topics vs Strong Topics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Weak Topics Box */}
                <div className="rounded-3xl border border-rose-500/30 bg-gradient-to-b from-rose-950/30 via-[#120B0E] to-[#070A12] p-5 shadow-xl space-y-3">
                  <div className="flex items-center gap-2 text-rose-300">
                    <AlertTriangle size={18} className="text-rose-400" />
                    <h3 className="font-bold text-sm text-white">
                      🚨 Needs Immediate Improvement ({weakestTopics.length})
                    </h3>
                  </div>
                  <p className="text-xs text-slate-400">
                    Topics where candidate accuracy is below 70% or errors were clustered.
                  </p>

                  {weakestTopics.length === 0 ? (
                    <p className="text-xs text-emerald-400 italic py-2">
                      ✨ Great work! No critically weak topics detected in this assessment.
                    </p>
                  ) : (
                    <div className="space-y-2 pt-1">
                      {weakestTopics.map((t, idx) => (
                        <div
                          key={idx}
                          className="rounded-2xl border border-rose-500/20 bg-rose-500/10 p-3 flex items-center justify-between text-xs"
                        >
                          <div className="min-w-0 pr-2">
                            <span className="font-bold text-white block truncate">{t.topic}</span>
                            <span className="text-[11px] text-rose-300">
                              {t.wrong} incorrect · {t.unattempted} skipped
                            </span>
                          </div>
                          <span className="rounded-full bg-rose-500/20 border border-rose-500/40 px-2.5 py-0.5 font-mono text-xs font-black text-rose-300 shrink-0">
                            {t.mastery}%
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Strong Topics Box */}
                <div className="rounded-3xl border border-emerald-500/30 bg-gradient-to-b from-emerald-950/30 via-[#0B1511] to-[#070A12] p-5 shadow-xl space-y-3">
                  <div className="flex items-center gap-2 text-emerald-300">
                    <Award size={18} className="text-emerald-400" />
                    <h3 className="font-bold text-sm text-white">
                      🏆 Strong &amp; Mastered Topics ({strongestTopics.length})
                    </h3>
                  </div>
                  <p className="text-xs text-slate-400">
                    Topics where candidate demonstrated strong precision (≥70% accuracy).
                  </p>

                  {strongestTopics.length === 0 ? (
                    <p className="text-xs text-slate-500 italic py-2">
                      No topics reached 70%+ accuracy in this attempt.
                    </p>
                  ) : (
                    <div className="space-y-2 pt-1">
                      {strongestTopics.map((t, idx) => (
                        <div
                          key={idx}
                          className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-3 flex items-center justify-between text-xs"
                        >
                          <div className="min-w-0 pr-2">
                            <span className="font-bold text-white block truncate">{t.topic}</span>
                            <span className="text-[11px] text-emerald-300">
                              {t.correct} of {t.total} correct
                            </span>
                          </div>
                          <span className="rounded-full bg-emerald-500/20 border border-emerald-500/40 px-2.5 py-0.5 font-mono text-xs font-black text-emerald-300 shrink-0">
                            {t.mastery}%
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Complete Topic Mastery Bars */}
              {topicPerformance.length > 0 && (
                <div className="rounded-3xl border border-white/10 bg-[#070A12] p-5 sm:p-6 space-y-4">
                  <h3 className="font-bold text-sm text-white flex items-center gap-2">
                    <Layers size={16} className="text-blue-400" />
                    Complete Curriculum Mastery Breakdown
                  </h3>

                  <div className="space-y-3">
                    {topicPerformance.map((t, idx) => {
                      const pct = t.mastery;
                      return (
                        <div key={idx} className="space-y-1.5 text-xs">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-slate-200">{t.topic}</span>
                            <span className="font-mono text-[11px] text-slate-400">
                              {t.correct}/{t.total} Correct · <strong className="text-white">{pct}%</strong>
                            </span>
                          </div>
                          <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
                            <div
                              className={`h-full rounded-full transition-all duration-500 ${
                                pct >= 70
                                  ? 'bg-emerald-500'
                                  : pct >= 40
                                  ? 'bg-amber-500'
                                  : 'bg-rose-500'
                              }`}
                              style={{ width: `${Math.max(5, pct)}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* FOCUSED ERROR & REMEDIATION REVIEW VIEW (Wrong & Skipped Questions ONLY) */}
          {activeTab !== 'diagnostics' && (
            <div className="space-y-5 animate-fade-in">
              <div className={`flex flex-wrap items-center justify-between gap-2 border-b pb-3 ${isLight ? 'border-slate-200' : 'border-white/10'}`}>
                <span className={`text-xs font-bold flex items-center gap-1.5 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                  Showing:{' '}
                  <strong className={`capitalize ${isLight ? 'text-slate-900 font-extrabold' : 'text-white'}`}>
                    {activeTab === 'wrong'
                      ? `Incorrect / Wrong Questions (${displayedQuestions.length} Questions)`
                      : `Skipped / Unattempted Questions (${displayedQuestions.length} Questions)`}
                  </strong>
                </span>
                <span className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                  Inspect student's selected answer vs official answer with full step-by-step solutions.
                </span>
              </div>

              {displayedQuestions.length === 0 ? (
                <div className={`rounded-3xl border p-8 text-center space-y-2 ${
                  isLight ? 'border-slate-200 bg-slate-50 text-slate-600' : 'border-white/10 bg-[#070A12] text-slate-400'
                }`}>
                  <CheckCircle2 size={40} className="mx-auto text-emerald-500" />
                  <p className={`text-sm font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    {activeTab === 'wrong'
                      ? '✨ Zero Incorrect Questions! The student answered all attempted questions correctly.'
                      : '✨ Zero Skipped Questions! The student attempted all questions in this exam.'}
                  </p>
                  <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-500'}`}>
                    Switch to "Topic Diagnostics" to review curriculum mastery and NEET projection.
                  </p>
                </div>
              ) : (
                <div className="space-y-5">
                  {displayedQuestions.map((q, idx) => {
                    const isCorrect = q.status === 'correct';
                    const isWrong = q.status === 'wrong';
                    const isUnattempted = q.status === 'unattempted';

                    const borderTone = isLight
                      ? isWrong
                        ? 'border-rose-300 bg-rose-50/40'
                        : 'border-slate-200 bg-white'
                      : isWrong
                        ? 'border-rose-500/40 bg-gradient-to-b from-[#180A0E] via-[#11070A] to-[#070A12]'
                        : 'border-white/10 bg-[#070A12]';

                    const selectedOptionText = q.selected && q.options ? q.options[q.selected] : null;
                    const correctOptionText = q.correctAnswer && q.options ? q.options[q.correctAnswer] : null;

                    return (
                      <div
                        key={q.id || idx}
                        className={`rounded-lg border p-4 sm:p-6 space-y-4 font-mono transition ${
                          isLight
                            ? isWrong
                              ? 'border-rose-300 bg-rose-50/40'
                              : 'border-slate-200 bg-white'
                            : isWrong
                              ? 'border-rose-500/40 bg-[#0c0709]'
                              : 'border-blue-900/40 bg-[#080D1A]'
                        }`}
                      >
                        {/* Top Info Bar: Question #, Topic, and Status Pill */}
                        <div className={`flex flex-wrap items-center justify-between gap-2 border-b pb-3 ${
                          isLight ? 'border-slate-200' : 'border-blue-900/40'
                        }`}>
                          <div className="flex flex-wrap items-center gap-2 text-xs">
                            <span className={`font-mono font-bold px-2 py-0.5 rounded border ${
                              isLight ? 'text-slate-800 bg-slate-100 border-slate-200' : 'text-blue-300 bg-blue-950/60 border-blue-800/40'
                            }`}>
                              Q#{q.questionNumber || idx + 1}
                            </span>
                            <span className={`rounded px-2 py-0.5 text-[11px] font-bold border ${
                              isLight ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-blue-950/40 border-blue-800/30 text-blue-300'
                            }`}>
                              {q.topic}
                            </span>
                            {q.subject && (
                              <span className={`text-[11px] font-medium ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                                {q.subject}
                              </span>
                            )}
                          </div>

                          {/* Prominent Status Pill */}
                          <div className="shrink-0 font-mono">
                            {isWrong && (
                              <span className={`inline-flex items-center gap-1.5 rounded px-2.5 py-0.5 text-xs font-bold border ${
                                isLight
                                  ? 'bg-rose-100 border-rose-300 text-rose-800'
                                  : 'bg-rose-950/30 border-rose-500/40 text-rose-300'
                              }`}>
                                <XCircle size={13} className={isLight ? 'text-rose-600' : 'text-rose-400'} />
                                <span>[INCORRECT −1]</span>
                              </span>
                            )}
                            {isUnattempted && (
                              <span className={`inline-flex items-center gap-1.5 rounded px-2.5 py-0.5 text-xs font-bold border ${
                                isLight
                                  ? 'bg-slate-100 border-slate-300 text-slate-700'
                                  : 'bg-[#0A1020] border-blue-900/40 text-slate-400'
                              }`}>
                                <MinusCircle size={13} className={isLight ? 'text-slate-500' : 'text-slate-400'} />
                                <span>[SKIPPED 0]</span>
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Question Text with KaTeX */}
                        <div className={`text-xs sm:text-sm font-sans font-medium leading-relaxed overflow-x-auto py-1 ${
                          isLight ? 'text-slate-900' : 'text-slate-100'
                        }`}>
                          <MathRenderer text={q.question || q.text || ''} />
                        </div>

                        {/* Reference Diagram (if present) */}
                        {q.image && (
                          <div className="my-3 flex flex-col items-center">
                            <div className={`relative w-full max-w-sm overflow-hidden rounded-md border p-2 ${
                              isLight ? 'border-slate-200 bg-slate-100' : 'border-blue-900/40 bg-[#050811]'
                            }`}>
                              <img
                                src={q.image}
                                alt={`Question ${q.questionNumber} Diagram`}
                                className="mx-auto max-h-60 w-auto object-contain rounded bg-white p-2"
                              />
                            </div>
                          </div>
                        )}

                        {/* Student Response vs Official Correct Key Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                          {/* Left: Student Marked Response */}
                          <div
                            className={`rounded-md border p-3 flex items-center justify-between gap-2 ${
                              isLight
                                ? isWrong
                                  ? 'border-rose-300 bg-rose-50 text-rose-900 ring-1 ring-rose-200'
                                  : 'border-slate-200 bg-slate-50 text-slate-600'
                                : isWrong
                                  ? 'border-rose-500/40 bg-rose-950/20 text-rose-200'
                                  : 'border-blue-900/40 bg-[#060A14] text-slate-400'
                            }`}
                          >
                            <div className="min-w-0">
                              <span className="block text-[10px] uppercase font-bold tracking-wider opacity-75">
                                Student Marked Choice:
                              </span>
                              <div className="mt-0.5">
                                {q.selected ? (
                                  <div className="flex items-center gap-1.5 font-bold text-sm">
                                    <span className={`text-base font-bold ${
                                      isLight ? 'text-rose-950' : 'text-rose-300'
                                    }`}>
                                      Option {q.selected}
                                    </span>
                                    {selectedOptionText && (
                                      <span className="text-xs font-sans font-normal opacity-90 truncate max-w-[200px]">
                                        (<MathRenderer text={selectedOptionText} inline />)
                                      </span>
                                    )}
                                  </div>
                                ) : (
                                  <strong className={`text-sm ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                                    Not Answered / Skipped
                                  </strong>
                                )}
                              </div>
                            </div>
                            <div className="shrink-0">
                              {isWrong && <XCircle size={20} className={isLight ? 'text-rose-600' : 'text-rose-400'} />}
                              {isUnattempted && <MinusCircle size={20} className={isLight ? 'text-slate-400' : 'text-slate-500'} />}
                            </div>
                          </div>

                          {/* Right: Official Correct Key */}
                          <div className={`rounded-md border p-3 flex items-center justify-between gap-2 ${
                            isLight
                              ? 'border-emerald-300 bg-emerald-50 text-emerald-950'
                              : 'border-emerald-500/40 bg-emerald-950/20 text-emerald-300'
                          }`}>
                            <div className="min-w-0">
                              <span className="block text-[10px] uppercase font-black opacity-75">
                                Official Verified Answer:
                              </span>
                              <div className="mt-0.5">
                                <div className="flex items-center gap-1.5 font-bold text-sm">
                                  <span className={`font-mono text-base font-black underline ${
                                    isLight
                                      ? 'text-emerald-900 decoration-emerald-500'
                                      : 'text-emerald-200 underline decoration-emerald-400'
                                  }`}>
                                    Option {q.correctAnswer}
                                  </span>
                                  {correctOptionText && (
                                    <span className={`text-xs font-normal opacity-90 truncate max-w-[200px] ${
                                      isLight ? 'text-emerald-800' : 'text-emerald-200'
                                    }`}>
                                      (<MathRenderer text={correctOptionText} inline />)
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="shrink-0">
                              <CheckCircle2 size={22} className={isLight ? 'text-emerald-600' : 'text-emerald-400'} />
                            </div>
                          </div>
                        </div>

                        {/* Complete Options List (A, B, C, D) */}
                        {q.options && Object.keys(q.options).length > 0 && (
                          <div className="space-y-2 pt-2">
                            <span className={`text-[11px] font-bold uppercase tracking-wider block ${
                              isLight ? 'text-slate-500' : 'text-slate-400'
                            }`}>
                              All Answer Choices:
                            </span>
                            <div className="grid grid-cols-1 gap-2">
                              {Object.entries(q.options).map(([optKey, optText]) => {
                                const isThisCorrect = optKey.toUpperCase() === q.correctAnswer?.toUpperCase();
                                const isThisSelected = optKey.toUpperCase() === q.selected?.toUpperCase();

                                let optClasses = isLight
                                  ? 'border-slate-200 bg-slate-50/80 text-slate-800'
                                  : 'border-white/10 bg-[#0A0E17] text-slate-300';
                                if (isThisCorrect) {
                                  optClasses = isLight
                                    ? 'border-emerald-300 bg-emerald-50 text-emerald-950 ring-1 ring-emerald-300 font-semibold'
                                    : 'border-emerald-500/50 bg-emerald-950/30 text-emerald-200 ring-1 ring-emerald-500/40 font-semibold';
                                } else if (isThisSelected && !isThisCorrect) {
                                  optClasses = isLight
                                    ? 'border-rose-300 bg-rose-50 text-rose-950 ring-1 ring-rose-300 font-semibold'
                                    : 'border-rose-500/50 bg-rose-950/30 text-rose-200 ring-1 ring-rose-500/40';
                                }

                                return (
                                  <div
                                    key={optKey}
                                    className={`rounded-2xl border px-4 py-3 flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm transition ${optClasses}`}
                                  >
                                    <div className="flex items-center gap-3 overflow-x-auto min-w-0">
                                      <span
                                        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-mono text-xs font-black ${
                                          isThisCorrect
                                            ? isLight ? 'bg-emerald-600 text-white' : 'bg-emerald-500 text-slate-950'
                                            : isThisSelected
                                            ? isLight ? 'bg-rose-600 text-white' : 'bg-rose-500 text-white'
                                            : isLight ? 'bg-slate-200 text-slate-700' : 'bg-white/10 text-slate-300'
                                        }`}
                                      >
                                        {optKey}
                                      </span>
                                      <div className="overflow-x-auto">
                                        <MathRenderer text={optText} />
                                      </div>
                                    </div>

                                    {/* Option Status Tags */}
                                    <div className="flex items-center gap-1.5 shrink-0 text-[10px] font-black uppercase">
                                      {isThisCorrect && (
                                        <span className={`rounded-full px-2.5 py-0.5 flex items-center gap-1 border ${
                                          isLight
                                            ? 'bg-emerald-100 border-emerald-300 text-emerald-800'
                                            : 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300'
                                        }`}>
                                          <Check size={11} /> Correct Answer
                                        </span>
                                      )}
                                      {isThisSelected && !isThisCorrect && (
                                        <span className={`rounded-full px-2.5 py-0.5 flex items-center gap-1 border ${
                                          isLight
                                            ? 'bg-rose-100 border-rose-300 text-rose-800'
                                            : 'bg-rose-500/20 border border-rose-500/40 text-rose-300'
                                        }`}>
                                          <X size={11} /> Student Pick (Wrong)
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {/* Step-by-Step Solution and Concept Explanation */}
                        {q.explanation && (
                          <div className={`rounded-2xl border p-4 sm:p-5 text-xs sm:text-sm space-y-2 mt-3 ${
                            isLight
                              ? 'border-blue-200 bg-blue-50/70 text-slate-800 shadow-sm'
                              : 'border-blue-500/30 bg-gradient-to-b from-[#0E1A33] to-[#091122] text-slate-200'
                          }`}>
                            <div className={`flex items-center gap-2 font-bold text-xs uppercase tracking-wider ${
                              isLight ? 'text-blue-700' : 'text-blue-400'
                            }`}>
                              <Sparkles size={15} />
                              <span>Step-by-Step Solution &amp; Concept Explanation:</span>
                            </div>
                            <div className={`leading-relaxed overflow-x-auto pt-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                              <MathRenderer text={q.explanation} />
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Bar */}
        <div className={`flex items-center justify-between border-t px-4 sm:px-7 py-3 text-xs shrink-0 ${
          isLight ? 'border-slate-200 bg-slate-50 text-slate-600' : 'border-white/10 bg-[#0D121F] text-slate-400'
        }`}>
          <span>Administrator Diagnostic &amp; Error Review Suite</span>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-blue-600 hover:bg-blue-500 px-6 py-2 text-xs font-bold text-white transition active:scale-95 shadow-md shadow-blue-600/30"
          >
            Close Diagnostics
          </button>
        </div>
      </div>
    </div>
  );
}
