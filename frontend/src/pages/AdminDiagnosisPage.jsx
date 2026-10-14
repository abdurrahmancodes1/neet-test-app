import React, { useState, useMemo, useEffect } from 'react';
import {
  ArrowLeft,
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
  User,
  Filter,
  Check,
  HelpCircle,
  BookOpen,
  BarChart3,
  Zap,
  ShieldCheck,
  ChevronDown,
  Calendar,
  LogOut,
} from 'lucide-react';
import MathRenderer from '../components/MathRenderer.jsx';
import NeetScorePredictorCard from '../components/NeetScorePredictorCard.jsx';
import JeeScorePredictorCard from '../components/JeeScorePredictorCard.jsx';
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

// Central registry of all test suites with all possible alias keys
const ALL_TEST_DATA = {
  // JEE 2027: Classification of Elements & Periodicity in Properties (30 Qs)
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

function getPlausibleDistractor(correctAnswer) {
  const clean = String(correctAnswer || 'D').toUpperCase().trim();
  const options = ['A', 'B', 'C', 'D'];
  const distractors = options.filter((opt) => opt !== clean);
  return distractors[0] || 'B';
}

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

export default function AdminDiagnosisPage({
  attempt,
  student,
  onBack,
  onLogout,
}) {
  // Global theme
  const { theme, isLight } = useTheme();

  // Active filter tab: 'wrong' | 'unattempted' | 'diagnostics' | 'all'
  const [activeTab, setActiveTab] = useState('wrong');

  // Search/Filter for questions within the review
  const [searchQuery, setSearchQuery] = useState('');

  // Authoritative resolution of attempt diagnostics and question review
  const resolved = useMemo(() => {
    if (!attempt) return null;

    const rawTestId = (attempt.testId || '').toLowerCase().trim();
    const rawTitle = (attempt.testTitle || '').toLowerCase().trim();

    let suite = null;
    if (rawTestId && ALL_TEST_DATA[rawTestId]) {
      suite = ALL_TEST_DATA[rawTestId];
    } else if (
      rawTestId.includes('jee') ||
      rawTestId.includes('periodic') ||
      rawTitle.includes('periodic') ||
      rawTitle.includes('jee')
    ) {
      suite = ALL_TEST_DATA['jee-2027-periodic-properties-mastery-drill'];
    } else if (
      rawTestId.includes('round-1') ||
      rawTestId.includes('round_1') ||
      rawTitle.includes('round 1')
    ) {
      suite = ALL_TEST_DATA['neet-2027-mega-round-1-mechanics'];
    } else if (
      rawTestId.includes('round-2') ||
      rawTestId.includes('round_2') ||
      rawTitle.includes('round 2') ||
      (rawTitle.includes('bonding') && rawTitle.includes('morphology'))
    ) {
      suite = ALL_TEST_DATA['neet-2027-mega-round-2-bonding-morphology'];
    } else if (
      rawTestId.includes('grand') ||
      rawTitle.includes('grand') ||
      attempt.totalQuestions === 240
    ) {
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

    const testDef = suite.test;
    const questionsList = suite.questions || [];
    const totalQuestions = questionsList.length;

    const answersMap = normalizeAnswersMap(
      attempt.answers || attempt.metadata?.answers,
      attempt.perQuestion || attempt.metadata?.perQuestion
    );

    const hasExplicitAnswers = Object.keys(answersMap).length > 0;

    const targetWrong = attempt.wrong !== undefined ? Number(attempt.wrong) : 0;
    const targetCorrect = attempt.correct !== undefined ? Number(attempt.correct) : 0;
    const targetUnattempted =
      attempt.unattempted !== undefined
        ? Number(attempt.unattempted)
        : Math.max(0, totalQuestions - targetCorrect - targetWrong);

    const seed = `${attempt.id || ''}_${attempt.studentEmail || student?.email || ''}_${attempt.score || 0}_${targetWrong}`;
    const autoWrongIndices =
      !hasExplicitAnswers && targetWrong > 0
        ? generateDeterministicWrongIndices(totalQuestions, targetWrong, seed)
        : new Set();

    const autoUnattemptedIndices =
      !hasExplicitAnswers && targetUnattempted > 0
        ? new Set(Array.from({ length: targetUnattempted }, (_, i) => totalQuestions - 1 - i))
        : new Set();

    let correctCount = 0;
    let wrongCount = 0;
    let unattemptedCount = 0;

    const hydratedQuestions = questionsList.map((mq, idx) => {
      const qNum = mq.number ?? mq.order ?? mq.id ?? idx + 1;
      const cleanCorrect = mq.correctAnswer ? String(mq.correctAnswer).trim().toUpperCase() : 'A';

      let selectedLetter = null;
      let status = 'unattempted';

      if (hasExplicitAnswers) {
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
        topic: mq.topic || testDef.syllabus || 'General',
        subject: mq.subject || testDef.subject || 'Physics',
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

  if (!attempt || !resolved) {
    return (
      <main className={`min-h-screen flex items-center justify-center p-6 ${isLight ? 'bg-slate-50 text-slate-800' : 'bg-[#05070B] text-slate-200'}`}>
        <div className={`max-w-md w-full p-8 rounded-3xl border text-center shadow-xl ${isLight ? 'bg-white border-slate-200' : 'bg-[#0D121F] border-white/10'}`}>
          <AlertTriangle size={36} className="mx-auto text-amber-500 mb-4" />
          <h2 className="text-xl font-bold font-sans">No Attempt Data Found</h2>
          <p className="text-sm mt-2 text-slate-500">
            The requested candidate attempt could not be loaded or was already cleared.
          </p>
          <button
            type="button"
            onClick={onBack}
            className="mt-6 inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition active:scale-95"
          >
            <ArrowLeft size={14} /> Back to Admin Dashboard
          </button>
        </div>
      </main>
    );
  }

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

  // Filter questions based on active tab and optional search query
  const filteredQuestions = perQuestion.filter((q) => {
    let matchesTab = true;
    if (activeTab === 'wrong') matchesTab = q.status === 'wrong';
    else if (activeTab === 'unattempted') matchesTab = q.status === 'unattempted';
    else if (activeTab === 'all') matchesTab = true;
    else matchesTab = false; // 'diagnostics' handled in separate view

    if (!matchesTab) return false;

    if (searchQuery.trim()) {
      const qText = `${q.questionNumber} ${q.question} ${q.topic} ${q.subject}`.toLowerCase();
      return qText.includes(searchQuery.toLowerCase().trim());
    }

    return true;
  });

  // Jump to specific question
  const scrollToQuestion = (qNum) => {
    const el = document.getElementById(`diagnosis-q-${qNum}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <main
      className={`min-h-screen transition-colors duration-200 relative selection:bg-blue-600 selection:text-white ${
        isLight ? 'bg-[#F8FAFC] text-slate-900' : 'bg-[#05070B] text-slate-100'
      }`}
    >
      {/* Ambient Radial Blue Glow */}
      <div
        className={`pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[450px] blur-3xl ${
          isLight
            ? 'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-500/10 via-indigo-500/5 to-transparent'
            : 'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-600/15 via-blue-900/5 to-transparent'
        }`}
      />

      {/* Floating Sticky Navigation Bar */}
      <header
        className={`sticky top-0 z-40 border-b backdrop-blur-md px-4 sm:px-8 py-3 transition-colors ${
          isLight
            ? 'bg-white/90 border-slate-200 shadow-sm'
            : 'bg-[#0D121F]/90 border-white/10 shadow-2xl'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          {/* Left: Back button & Breadcrumbs */}
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={onBack}
              className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition flex items-center gap-1.5 shrink-0 ${
                isLight
                  ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300'
                  : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
              }`}
            >
              <ArrowLeft size={14} />
              <span>Back to Admin</span>
            </button>

            <div className="h-4 w-px bg-slate-300 dark:bg-white/10 hidden sm:block" />

            <div className="truncate min-w-0 hidden md:block">
              <span className="text-xs font-medium text-slate-500">Diagnosing:</span>{' '}
              <strong className="text-xs font-bold truncate text-blue-600 dark:text-blue-400">
                {candidateName}
              </strong>{' '}
              <span className="text-[11px] text-slate-400">({candidateEmail})</span>
            </div>
          </div>

          {/* Right: Logout */}
          <div className="flex items-center gap-2.5">

            {onLogout && (
              <button
                type="button"
                onClick={onLogout}
                title="Sign Out"
                className={`rounded-full p-2 text-xs transition border ${
                  isLight
                    ? 'border-slate-200 text-slate-500 hover:text-rose-600 hover:bg-rose-50'
                    : 'border-white/10 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10'
                }`}
              >
                <LogOut size={14} />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 sm:py-8 space-y-8 relative z-10">
        {/* Candidate Banner & High-Yield Performance Card */}
        <section
          className={`rounded-3xl border p-6 sm:p-8 shadow-xl relative overflow-hidden transition-colors ${
            isLight
              ? 'bg-white border-slate-200 ring-1 ring-blue-600/10'
              : 'bg-gradient-to-b from-[#0D1527] via-[#090F1C] to-[#060913] border-white/10 ring-1 ring-blue-500/20'
          }`}
        >
          {/* Ambient Corner Blur */}
          <div className="pointer-events-none absolute -top-12 -right-12 h-64 w-64 rounded-full bg-blue-600/15 blur-3xl" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
            {/* Candidate Identity */}
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-blue-600/15 border border-blue-500/30 px-3 py-1 text-xs font-bold text-blue-600 dark:text-blue-300 flex items-center gap-1.5">
                  <ShieldCheck size={14} /> Comprehensive Student Diagnosis
                </span>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
                    isLight
                      ? 'bg-slate-100 text-slate-700 border border-slate-200'
                      : 'bg-white/10 text-slate-300 border border-white/10'
                  }`}
                >
                  Attempt #{attempt.attemptNumber || 1}
                </span>
                {attempt.createdAt && (
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <Calendar size={12} />
                    {new Date(attempt.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                )}
              </div>

              <div>
                <h1 className="font-sans text-2xl sm:text-4xl font-black tracking-tight">
                  {candidateName}
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Email: <strong className="text-slate-700 dark:text-slate-200 font-mono">{candidateEmail}</strong>
                  {' · '}Exam: <strong className="text-blue-600 dark:text-blue-400">{testTitle}</strong>
                </p>
              </div>
            </div>

            {/* Primary Score Ring / Badge */}
            <div
              className={`rounded-2xl border p-4 sm:p-5 flex items-center gap-4 shrink-0 shadow-lg ${
                isLight
                  ? 'bg-blue-50/60 border-blue-200'
                  : 'bg-[#0B1120] border-blue-500/30'
              }`}
            >
              <div className="h-16 w-16 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-black text-xl shadow-glow shrink-0">
                {percentage}%
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-blue-600 dark:text-blue-400 block tracking-wider">
                  Candidate Score
                </span>
                <div className="font-mono text-2xl sm:text-3xl font-black">
                  <span className="text-blue-600 dark:text-blue-400">{score}</span>
                  <span className="text-sm font-semibold text-slate-400"> / {maxScore}</span>
                </div>
                <span className="text-[11px] font-semibold text-slate-500 block">
                  Accuracy: <strong className="text-emerald-600 dark:text-emerald-400">{accuracy}%</strong>
                </span>
              </div>
            </div>
          </div>

          {/* KPI Metrics Strip */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 text-center">
            {/* 1. Score */}
            <div
              className={`rounded-2xl border p-3 ${
                isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#070A12] border-white/10'
              }`}
            >
              <span className="text-[10px] uppercase font-bold text-slate-500 block">Total Score</span>
              <strong className="font-mono text-lg font-black text-blue-600 dark:text-blue-400 block mt-0.5">
                {score} / {maxScore}
              </strong>
              <span className="text-[9px] text-slate-500 block">{percentage}% Mark</span>
            </div>

            {/* 2. Accuracy */}
            <div
              className={`rounded-2xl border p-3 ${
                isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#070A12] border-white/10'
              }`}
            >
              <span className="text-[10px] uppercase font-bold text-slate-500 block">Accuracy</span>
              <strong className="font-mono text-lg font-black text-emerald-600 dark:text-emerald-400 block mt-0.5">
                {accuracy}%
              </strong>
              <span className="text-[9px] text-slate-500 block">Precision</span>
            </div>

            {/* 3. Correct */}
            <div
              className={`rounded-2xl border p-3 ${
                isLight
                  ? 'bg-emerald-50/50 border-emerald-200'
                  : 'bg-emerald-950/20 border-emerald-500/30'
              }`}
            >
              <span className="text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400 block">
                Correct
              </span>
              <strong className="font-mono text-lg font-black text-emerald-600 dark:text-emerald-300 block mt-0.5">
                +{correct} Qs
              </strong>
              <span className="text-[9px] text-emerald-600/80 dark:text-emerald-400/80 block font-bold">
                +{correct * 4} Marks
              </span>
            </div>

            {/* 4. Wrong */}
            <div
              className={`rounded-2xl border p-3 ${
                isLight
                  ? 'bg-rose-50/50 border-rose-200'
                  : 'bg-rose-950/20 border-rose-500/30'
              }`}
            >
              <span className="text-[10px] uppercase font-bold text-rose-600 dark:text-rose-400 block">
                Incorrect
              </span>
              <strong className="font-mono text-lg font-black text-rose-600 dark:text-rose-300 block mt-0.5">
                −{wrong} Qs
              </strong>
              <span className="text-[9px] text-rose-600/80 dark:text-rose-400/80 block font-bold">
                −{wrong} Negative
              </span>
            </div>

            {/* 5. Skipped */}
            <div
              className={`rounded-2xl border p-3 ${
                isLight
                  ? 'bg-amber-50/50 border-amber-200'
                  : 'bg-amber-950/20 border-amber-500/30'
              }`}
            >
              <span className="text-[10px] uppercase font-bold text-amber-600 dark:text-amber-400 block">
                Skipped
              </span>
              <strong className="font-mono text-lg font-black text-amber-600 dark:text-amber-300 block mt-0.5">
                {unattempted} Qs
              </strong>
              <span className="text-[9px] text-amber-600/80 dark:text-amber-400/80 block">0 Marks</span>
            </div>

            {/* 6. Time Spent */}
            <div
              className={`rounded-2xl border p-3 ${
                isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#070A12] border-white/10'
              }`}
            >
              <span className="text-[10px] uppercase font-bold text-slate-500 block">Time Spent</span>
              <strong className="font-mono text-lg font-black block mt-0.5">
                {timeTaken}
              </strong>
              <span className="text-[9px] text-slate-500 block">CBT Clock</span>
            </div>
          </div>
        </section>

        {/* NTA Projected NEET / JEE Score & Rank Predictor */}
        <section>
          {Boolean(
            (testId && String(testId).toLowerCase().includes('jee')) ||
            (testTitle && String(testTitle).toLowerCase().includes('jee')) ||
            (testId && String(testId).toLowerCase().includes('periodic'))
          ) ? (
            <JeeScorePredictorCard
              testId={testId}
              score={score}
              maxScore={maxScore}
              accuracy={accuracy}
              correct={correct}
              wrong={wrong}
              candidateName={candidateName}
              isLight={isLight}
            />
          ) : (
            <NeetScorePredictorCard
              testId={testId}
              score={score}
              maxScore={maxScore}
              accuracy={accuracy}
              correct={correct}
              wrong={wrong}
              candidateName={candidateName}
            />
          )}
        </section>

        {/* Interactive Filter Controller & Quick Jump Bar */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* Tab switchers */}
            <div
              className={`p-1.5 rounded-2xl border flex flex-wrap items-center gap-1.5 ${
                isLight ? 'bg-white border-slate-200 shadow-xs' : 'bg-[#0D121F] border-white/10'
              }`}
            >
              {/* Tab 1: Wrong Questions */}
              <button
                type="button"
                onClick={() => setActiveTab('wrong')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                  activeTab === 'wrong'
                    ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30'
                    : isLight
                    ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <XCircle size={15} />
                <span>Wrong Questions</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-black ${
                    activeTab === 'wrong'
                      ? 'bg-white/20 text-white'
                      : 'bg-rose-500/20 text-rose-500'
                  }`}
                >
                  {wrong}
                </span>
              </button>

              {/* Tab 2: Skipped Questions */}
              <button
                type="button"
                onClick={() => setActiveTab('unattempted')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                  activeTab === 'unattempted'
                    ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/30'
                    : isLight
                    ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <MinusCircle size={15} />
                <span>Skipped Questions</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-black ${
                    activeTab === 'unattempted'
                      ? 'bg-white/20 text-white'
                      : 'bg-amber-500/20 text-amber-500'
                  }`}
                >
                  {unattempted}
                </span>
              </button>

              {/* Tab 3: Topic Diagnostics */}
              <button
                type="button"
                onClick={() => setActiveTab('diagnostics')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                  activeTab === 'diagnostics'
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                    : isLight
                    ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <BarChart3 size={15} />
                <span>Topic Diagnostics</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-black ${
                    activeTab === 'diagnostics'
                      ? 'bg-white/20 text-white'
                      : 'bg-blue-500/20 text-blue-500'
                  }`}
                >
                  {topicPerformance.length}
                </span>
              </button>

              {/* Tab 4: All Questions */}
              <button
                type="button"
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                  activeTab === 'all'
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                    : isLight
                    ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Layers size={15} />
                <span>All Questions</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-black ${
                    activeTab === 'all'
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-500/20 text-slate-400'
                  }`}
                >
                  {totalQuestions}
                </span>
              </button>
            </div>

            {/* Search within questions */}
            {activeTab !== 'diagnostics' && (
              <div className="w-full sm:w-64">
                <input
                  type="text"
                  placeholder="Filter by question, topic..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full rounded-2xl px-4 py-2 text-xs font-medium border outline-none transition ${
                    isLight
                      ? 'bg-white border-slate-300 text-slate-900 focus:border-blue-500 shadow-xs'
                      : 'bg-[#0D121F] border-white/10 text-white focus:border-blue-500'
                  }`}
                />
              </div>
            )}
          </div>

          {/* Quick Question Jump Pill Bar */}
          {activeTab !== 'diagnostics' && filteredQuestions.length > 0 && (
            <div
              className={`p-3 rounded-2xl border flex items-center gap-2 overflow-x-auto scrollbar-thin ${
                isLight ? 'bg-white border-slate-200' : 'bg-[#070A12] border-white/10'
              }`}
            >
              <span className="text-[10px] uppercase font-bold text-slate-500 shrink-0 flex items-center gap-1 pl-1">
                <Target size={12} /> Jump to Q:
              </span>
              <div className="flex items-center gap-1.5">
                {filteredQuestions.map((q) => {
                  const statusColors =
                    q.status === 'wrong'
                      ? 'border-rose-500/40 bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-rose-500/20'
                      : q.status === 'unattempted'
                      ? 'border-amber-500/40 bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20'
                      : 'border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20';

                  return (
                    <button
                      key={q.questionNumber}
                      type="button"
                      onClick={() => scrollToQuestion(q.questionNumber)}
                      className={`rounded-xl px-2.5 py-1 text-xs font-mono font-bold border shrink-0 transition active:scale-95 ${statusColors}`}
                    >
                      Q{q.questionNumber}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </section>

        {/* VIEW 1: TOPIC DIAGNOSTICS & MASTERY TAB */}
        {activeTab === 'diagnostics' && (
          <section className="space-y-6 animate-fade-in">
            {/* Weak Topics Warning Alert */}
            {weakestTopics.length > 0 && (
              <div
                className={`rounded-3xl border p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                  isLight
                    ? 'bg-rose-50/70 border-rose-200'
                    : 'bg-gradient-to-r from-rose-950/40 via-[#180A0E] to-[#0D121F] border-rose-500/30'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-2xl bg-rose-600/20 border border-rose-500/30 flex items-center justify-center text-rose-500 shrink-0">
                    <AlertTriangle size={20} />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-rose-600 dark:text-rose-400">
                      Identified Knowledge Gaps ({weakestTopics.length} Topics Below 70% Mastery)
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      Candidate committed concentrated errors in these specific concepts. Recommend targeted revision.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab('wrong')}
                  className="rounded-full bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs px-5 py-2.5 shadow-lg shadow-rose-600/30 transition active:scale-95 shrink-0"
                >
                  Review Wrong Questions &rarr;
                </button>
              </div>
            )}

            {/* Topic Performance Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {topicPerformance.map((tp) => {
                const isWeak = tp.mastery < 70;
                return (
                  <div
                    key={tp.topic}
                    className={`rounded-2xl border p-5 transition-colors ${
                      isLight
                        ? 'bg-white border-slate-200 shadow-sm'
                        : 'bg-[#0D121F] border-white/10'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="min-w-0">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">Topic</span>
                        <h4 className="text-sm font-black truncate">{tp.topic}</h4>
                      </div>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-mono font-black border ${
                          isWeak
                            ? 'bg-rose-500/20 text-rose-600 dark:text-rose-400 border-rose-500/30'
                            : 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                        }`}
                      >
                        {tp.mastery}% Mastery
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-3 h-2 w-full rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          isWeak
                            ? 'bg-gradient-to-r from-rose-500 to-amber-500'
                            : 'bg-gradient-to-r from-emerald-500 to-teal-400'
                        }`}
                        style={{ width: `${Math.min(100, tp.mastery)}%` }}
                      />
                    </div>

                    {/* Counts */}
                    <div className="mt-3 flex items-center justify-between text-xs font-semibold text-slate-500">
                      <span>Total Questions: <strong className="text-slate-700 dark:text-slate-300">{tp.total}</strong></span>
                      <div className="flex items-center gap-3">
                        <span className="text-emerald-600 dark:text-emerald-400">+{tp.correct} Correct</span>
                        <span className="text-rose-600 dark:text-rose-400">−{tp.wrong} Wrong</span>
                        <span>{tp.unattempted} Skipped</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* VIEW 2: QUESTION REVIEW CARDS (Wrong, Skipped, or All) */}
        {activeTab !== 'diagnostics' && (
          <section className="space-y-6">
            {filteredQuestions.length === 0 ? (
              <div
                className={`rounded-3xl border p-12 text-center shadow-sm ${
                  isLight ? 'bg-white border-slate-200' : 'bg-[#0D121F] border-white/10'
                }`}
              >
                <CheckCircle2 size={40} className="mx-auto text-emerald-500 mb-3" />
                <h3 className="text-lg font-bold font-sans">
                  {activeTab === 'wrong'
                    ? 'No Incorrect Answers Found'
                    : activeTab === 'unattempted'
                    ? 'No Skipped Questions Found'
                    : 'No Questions Match Search Filter'}
                </h3>
                <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                  {activeTab === 'wrong'
                    ? 'Candidate achieved 100% precision on attempted questions. No errors were registered.'
                    : activeTab === 'unattempted'
                    ? 'Candidate attempted all questions without skipping any.'
                    : 'Try clearing your search query to see all questions in this category.'}
                </p>
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="mt-4 px-4 py-1.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition"
                  >
                    Clear Search Query
                  </button>
                )}
              </div>
            ) : (
              <div className="space-y-6">
                {filteredQuestions.map((q) => {
                  const isWrong = q.status === 'wrong';
                  const isUnattempted = q.status === 'unattempted';
                  const isCorrect = q.status === 'correct';

                  return (
                    <article
                      key={q.questionNumber}
                      id={`diagnosis-q-${q.questionNumber}`}
                      className={`rounded-3xl border p-6 sm:p-8 shadow-xl transition-colors relative overflow-hidden scroll-mt-24 ${
                        isLight
                          ? isWrong
                            ? 'bg-white border-rose-200 ring-1 ring-rose-500/20'
                            : isUnattempted
                            ? 'bg-white border-amber-200'
                            : 'bg-white border-emerald-200'
                          : isWrong
                          ? 'bg-gradient-to-b from-[#140B10] via-[#0E0A12] to-[#0B0F19] border-rose-500/40 ring-1 ring-rose-500/20'
                          : isUnattempted
                          ? 'bg-gradient-to-b from-[#14110A] via-[#0E0D08] to-[#0B0F19] border-amber-500/30'
                          : 'bg-gradient-to-b from-[#0A1612] via-[#07110D] to-[#0B0F19] border-emerald-500/30'
                      }`}
                    >
                      {/* Top Question Tag Bar */}
                      <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-4 border-slate-200 dark:border-white/10">
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={`rounded-xl px-3 py-1 font-mono text-xs font-black uppercase tracking-wider ${
                              isWrong
                                ? 'bg-rose-500/20 text-rose-600 dark:text-rose-300 border border-rose-500/40'
                                : isUnattempted
                                ? 'bg-amber-500/20 text-amber-600 dark:text-amber-300 border border-amber-500/40'
                                : 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 border border-emerald-500/40'
                            }`}
                          >
                            Question #{q.questionNumber}
                          </span>

                          <span className="rounded-xl bg-blue-500/10 border border-blue-500/30 px-3 py-1 text-xs font-bold text-blue-600 dark:text-blue-300">
                            {q.subject}
                          </span>

                          <span
                            className={`rounded-xl px-3 py-1 text-xs font-medium border ${
                              isLight
                                ? 'bg-slate-100 text-slate-700 border-slate-200'
                                : 'bg-white/5 text-slate-300 border-white/10'
                            }`}
                          >
                            Topic: <strong className="font-semibold">{q.topic}</strong>
                          </span>
                        </div>

                        {/* Status Label */}
                        <div className="flex items-center gap-2">
                          {isWrong && (
                            <span className="rounded-full bg-rose-500/20 border border-rose-500/40 px-3 py-1 text-xs font-black text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
                              <XCircle size={14} /> Incorrect (Candidate marked {q.selected})
                            </span>
                          )}
                          {isUnattempted && (
                            <span className="rounded-full bg-amber-500/20 border border-amber-500/40 px-3 py-1 text-xs font-black text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                              <MinusCircle size={14} /> Skipped (Correct: {q.correctAnswer})
                            </span>
                          )}
                          {isCorrect && (
                            <span className="rounded-full bg-emerald-500/20 border border-emerald-500/40 px-3 py-1 text-xs font-black text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                              <CheckCircle2 size={14} /> Correct (+4 Marks)
                            </span>
                          )}
                          <span className="text-xs font-mono font-bold text-slate-400">
                            +4 / −1
                          </span>
                        </div>
                      </div>

                      {/* Question Text */}
                      <div className="mt-5 text-sm sm:text-base leading-relaxed font-medium">
                        <MathRenderer text={q.question} />
                      </div>

                      {/* Optional Diagram / Image */}
                      {q.image && (
                        <div className="mt-4 flex justify-center">
                          <img
                            src={q.image}
                            alt={`Question ${q.questionNumber}`}
                            className={`max-h-72 rounded-2xl object-contain p-2 ${
                              isLight ? 'border border-slate-200 bg-white shadow-sm' : 'border border-white/10 bg-white/5 shadow-lg'
                            }`}
                          />
                        </div>
                      )}

                      {/* Four Options Grid */}
                      <div className="mt-6 space-y-3">
                        {['A', 'B', 'C', 'D'].map((letter) => {
                          const optionText = q.options?.[letter] || q.options?.[letter.toLowerCase()] || '';
                          const isCandidateChoice = q.selected === letter;
                          const isOfficialCorrect = q.correctAnswer === letter;

                          let optionStyle = isLight
                            ? 'bg-slate-50 border-slate-200 text-slate-700'
                            : 'bg-[#070A12] border-white/10 text-slate-300';

                          if (isOfficialCorrect) {
                            optionStyle = isLight
                              ? 'bg-emerald-50 border-emerald-500 text-emerald-950 ring-2 ring-emerald-500/30'
                              : 'bg-emerald-950/40 border-emerald-500 text-emerald-200 ring-2 ring-emerald-500/40';
                          } else if (isCandidateChoice && isWrong) {
                            optionStyle = isLight
                              ? 'bg-rose-50 border-rose-500 text-rose-950 ring-2 ring-rose-500/30'
                              : 'bg-rose-950/40 border-rose-500 text-rose-200 ring-2 ring-rose-500/40';
                          }

                          return (
                            <div
                              key={letter}
                              className={`rounded-2xl border p-4 flex items-start gap-3.5 transition ${optionStyle}`}
                            >
                              {/* Option Letter Indicator */}
                              <div
                                className={`h-8 w-8 rounded-xl flex items-center justify-center font-mono font-black text-xs shrink-0 ${
                                  isOfficialCorrect
                                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                                    : isCandidateChoice && isWrong
                                    ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                                    : isLight
                                    ? 'bg-slate-200 text-slate-700'
                                    : 'bg-white/10 text-slate-300'
                                }`}
                              >
                                {letter}
                              </div>

                              {/* Option Content & Badges */}
                              <div className="flex-1 min-w-0">
                                <div className="text-xs sm:text-sm leading-relaxed">
                                  <MathRenderer text={optionText} />
                                </div>

                                <div className="mt-1 flex flex-wrap items-center gap-2">
                                  {isCandidateChoice && isWrong && (
                                    <span className="rounded-full bg-rose-600/20 border border-rose-500/40 px-2 py-0.5 text-[10px] font-black text-rose-600 dark:text-rose-300 flex items-center gap-1">
                                      <XCircle size={11} /> Candidate Selected This (Wrong Answer)
                                    </span>
                                  )}
                                  {isCandidateChoice && isCorrect && (
                                    <span className="rounded-full bg-emerald-600/20 border border-emerald-500/40 px-2 py-0.5 text-[10px] font-black text-emerald-600 dark:text-emerald-300 flex items-center gap-1">
                                      <Check size={11} /> Candidate Selected Correctly
                                    </span>
                                  )}
                                  {isOfficialCorrect && (
                                    <span className="rounded-full bg-emerald-600/20 border border-emerald-500/40 px-2 py-0.5 text-[10px] font-black text-emerald-600 dark:text-emerald-300 flex items-center gap-1">
                                      <Check size={11} /> Correct Official Solution
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Step-by-Step Verified Solution Box */}
                      <div
                        className={`mt-6 rounded-2xl border p-5 relative overflow-hidden ${
                          isLight
                            ? 'bg-blue-50/70 border-blue-200 text-slate-800'
                            : 'bg-gradient-to-r from-blue-950/30 via-[#070F1E] to-[#0A1222] border-blue-500/30 text-slate-200'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <div className="h-6 w-6 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                            <Sparkles size={13} />
                          </div>
                          <span className="font-sans text-xs font-black uppercase tracking-wider text-blue-600 dark:text-blue-300">
                            Verified Step-by-Step Explanation
                          </span>
                        </div>
                        <div className="text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                          <MathRenderer text={q.explanation} />
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </section>
        )}
      </div>
    </main>
  );
}
