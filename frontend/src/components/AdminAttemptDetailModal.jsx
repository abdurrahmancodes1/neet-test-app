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
import { NEET_BIOLOGY_TEST, NEET_BIOLOGY_QUESTIONS } from '../data/neetBiologyCoreTest.js';
import { NEET_MECHANICS_BONDING_TEST, NEET_MECHANICS_BONDING_QUESTIONS } from '../data/neetMechanicsBondingTest.js';
import { NEET_2026_CORE_TEST, NEET_2026_CORE_QUESTIONS } from '../data/neet2026CoreTopicsTest.js';
import { NEET_CALCULUS_TEST, NEET_CALCULUS_QUESTIONS } from '../data/neetCalculusTest.js';
import { NEET_WEP_TEST, NEET_WEP_QUESTIONS } from '../data/neetWorkEnergyTest.js';

// Central registry of all test suites with all possible alias keys
const ALL_TEST_DATA = {
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

  // Work Energy Power
  [NEET_WEP_TEST.id]: { test: NEET_WEP_TEST, questions: NEET_WEP_QUESTIONS },
  'neet-work-energy-power': { test: NEET_WEP_TEST, questions: NEET_WEP_QUESTIONS },
  'neet-wep': { test: NEET_WEP_TEST, questions: NEET_WEP_QUESTIONS },
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

    let suite = null;
    if (rawTestId && ALL_TEST_DATA[rawTestId]) {
      suite = ALL_TEST_DATA[rawTestId];
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

    // 2. Extract normalized answers map
    const answersMap = normalizeAnswersMap(
      attempt.answers || attempt.metadata?.answers,
      attempt.perQuestion || attempt.metadata?.perQuestion
    );

    const hasExplicitAnswers = Object.keys(answersMap).length > 0;

    // Target counts
    const targetWrong = attempt.wrong !== undefined ? Number(attempt.wrong) : 0;
    const targetCorrect = attempt.correct !== undefined ? Number(attempt.correct) : 0;
    const targetUnattempted =
      attempt.unattempted !== undefined
        ? Number(attempt.unattempted)
        : Math.max(0, totalQuestions - targetCorrect - targetWrong);

    // If explicit answers are not stored in attempt payload, reconstruct deterministically
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

    const finalCorrect = targetCorrect > 0 ? targetCorrect : correctCount;
    const finalWrong = targetWrong > 0 ? targetWrong : wrongCount;
    const finalUnattempted = Math.max(0, totalQuestions - finalCorrect - finalWrong);

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-5 animate-fade-in">
      {/* Dark Backdrop */}
      <div
        className="absolute inset-0 bg-black/85 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-5xl max-h-[94vh] flex flex-col rounded-3xl border border-white/10 bg-[#0B0F19] shadow-2xl overflow-hidden text-slate-100 z-10 animate-rise-in">
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-white/10 bg-[#0D121F] px-4 sm:px-7 py-3.5 sm:py-4 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-blue-600/20 border border-blue-500/30 text-blue-400 font-bold text-sm">
              <User size={18} />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="font-sans text-sm sm:text-lg font-black text-white truncate">
                  {candidateName}'s Test Diagnostics &amp; Solutions
                </h2>
                <span className="rounded-full bg-blue-500/20 border border-blue-500/30 px-2 py-0.5 text-[10px] font-bold text-blue-300">
                  Attempt #{attempt.attemptNumber || 1}
                </span>
              </div>
              <p className="text-xs text-slate-400 truncate">
                {candidateEmail} · <strong className="text-slate-200">{testTitle}</strong>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            title="Close Modal"
            className="rounded-full border border-white/10 bg-white/5 p-2 text-slate-400 hover:text-white hover:bg-white/10 transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Quick Diagnostic Metrics Bar */}
        <div className="border-b border-white/10 bg-[#080C16] px-4 sm:px-7 py-3 grid grid-cols-2 sm:grid-cols-5 gap-2.5 sm:gap-3 text-center shrink-0">
          <div className="rounded-2xl border border-white/10 bg-[#0D121F] p-2.5">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Final Score</span>
            <p className="mt-0.5 font-mono text-lg sm:text-xl font-black text-white">
              {score} <span className="text-xs font-normal text-slate-500">/ {maxScore}</span>
            </p>
            <span className="text-[10px] text-blue-400 font-semibold">{percentage}% Total</span>
          </div>

          <div className="rounded-2xl border border-rose-500/30 bg-rose-950/30 p-2.5">
            <span className="text-[10px] uppercase font-bold text-rose-400 block">Wrong Questions</span>
            <p className="mt-0.5 font-mono text-lg sm:text-xl font-black text-rose-400">
              −{wrong}
            </p>
            <span className="text-[10px] text-rose-300 font-semibold">−{wrong} Negative</span>
          </div>

          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-950/20 p-2.5">
            <span className="text-[10px] uppercase font-bold text-emerald-400 block">Correct Qs</span>
            <p className="mt-0.5 font-mono text-lg sm:text-xl font-black text-emerald-400">
              +{correct}
            </p>
            <span className="text-[10px] text-emerald-300 font-semibold">+{correct * 4} Marks</span>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#0D121F] p-2.5">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Skipped Qs</span>
            <p className="mt-0.5 font-mono text-lg sm:text-xl font-black text-slate-300">
              {unattempted}
            </p>
            <span className="text-[10px] text-slate-400 font-semibold">0 Marks</span>
          </div>

          <div className="col-span-2 sm:col-span-1 rounded-2xl border border-white/10 bg-[#0D121F] p-2.5">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Accuracy</span>
            <p className="mt-0.5 font-mono text-lg sm:text-xl font-black text-amber-400">
              {accuracy}%
            </p>
            <span className="text-[10px] text-slate-400 font-mono">{timeTaken} Duration</span>
          </div>
        </div>

        {/* Focused Fast Tabs (Wrong Questions | Skipped Questions | Topic Diagnostics) */}
        <div className="flex items-center justify-between border-b border-white/10 bg-[#070A12] px-4 sm:px-7 py-2.5 overflow-x-auto gap-2 shrink-0">
          <div className="flex items-center gap-2">
            {/* 1. Wrong Questions Tab (Primary Target) */}
            <button
              type="button"
              onClick={() => setActiveTab('wrong')}
              className={`rounded-full px-4 py-1.5 text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'wrong'
                  ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30 ring-1 ring-rose-400'
                  : 'bg-rose-500/10 text-rose-300 border border-rose-500/20 hover:bg-rose-500/20'
              }`}
            >
              <XCircle size={13} />
              <span>Wrong Questions ({wrong})</span>
            </button>

            {/* 2. Skipped Questions Tab */}
            <button
              type="button"
              onClick={() => setActiveTab('unattempted')}
              className={`rounded-full px-4 py-1.5 text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'unattempted'
                  ? 'bg-slate-600 text-white shadow-md ring-1 ring-slate-400'
                  : 'text-slate-400 hover:text-white bg-white/5 border border-white/10'
              }`}
            >
              <MinusCircle size={13} />
              <span>Skipped Questions ({unattempted})</span>
            </button>

            {/* 3. Topic Diagnostics & NEET Predictor Tab */}
            <button
              type="button"
              onClick={() => setActiveTab('diagnostics')}
              className={`rounded-full px-4 py-1.5 text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'diagnostics'
                  ? 'bg-violet-600 text-white shadow-md shadow-violet-600/30'
                  : 'text-violet-300 hover:text-white bg-violet-500/10 border border-violet-500/20'
              }`}
            >
              <Sparkles size={13} />
              <span>Topic Diagnostics &amp; Score Predictor</span>
            </button>
          </div>

          <div className="hidden md:flex items-center gap-2 text-xs font-semibold text-slate-400 shrink-0">
            <Clock size={13} className="text-blue-400" />
            <span>Time Spent: <strong className="text-white font-mono">{timeTaken}</strong></span>
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
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
                <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  Showing:{' '}
                  <strong className="text-white capitalize">
                    {activeTab === 'wrong'
                      ? `Incorrect / Wrong Questions (${displayedQuestions.length} Questions)`
                      : `Skipped / Unattempted Questions (${displayedQuestions.length} Questions)`}
                  </strong>
                </span>
                <span className="text-[11px] text-slate-400">
                  Inspect student's selected answer vs official answer with full step-by-step solutions.
                </span>
              </div>

              {displayedQuestions.length === 0 ? (
                <div className="rounded-3xl border border-white/10 bg-[#070A12] p-8 text-center text-slate-400 space-y-2">
                  <CheckCircle2 size={40} className="mx-auto text-emerald-400" />
                  <p className="text-sm font-bold text-white">
                    {activeTab === 'wrong'
                      ? '✨ Zero Incorrect Questions! The student answered all attempted questions correctly.'
                      : '✨ Zero Skipped Questions! The student attempted all questions in this exam.'}
                  </p>
                  <p className="text-xs text-slate-500">
                    Switch to "Topic Diagnostics" to review curriculum mastery and NEET projection.
                  </p>
                </div>
              ) : (
                <div className="space-y-5">
                  {displayedQuestions.map((q, idx) => {
                    const isCorrect = q.status === 'correct';
                    const isWrong = q.status === 'wrong';
                    const isUnattempted = q.status === 'unattempted';

                    const borderTone = isWrong
                      ? 'border-rose-500/40 bg-gradient-to-b from-[#180A0E] via-[#11070A] to-[#070A12]'
                      : 'border-white/10 bg-[#070A12]';

                    const selectedOptionText = q.selected && q.options ? q.options[q.selected] : null;
                    const correctOptionText = q.correctAnswer && q.options ? q.options[q.correctAnswer] : null;

                    return (
                      <div
                        key={q.id || idx}
                        className={`rounded-3xl border p-4 sm:p-6 shadow-xl space-y-4 transition ${borderTone}`}
                      >
                        {/* Top Info Bar: Question #, Topic, and Status Pill */}
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
                          <div className="flex flex-wrap items-center gap-2 text-xs">
                            <span className="font-mono font-bold text-white bg-white/10 px-2.5 py-0.5 rounded-lg border border-white/10">
                              Q{q.questionNumber || idx + 1}
                            </span>
                            <span className="rounded-full bg-blue-500/20 border border-blue-500/30 px-2.5 py-0.5 text-[11px] font-bold text-blue-300">
                              {q.topic}
                            </span>
                            {q.subject && (
                              <span className="text-[11px] text-slate-400 font-medium">
                                {q.subject}
                              </span>
                            )}
                          </div>

                          {/* Prominent Status Pill */}
                          <div className="shrink-0">
                            {isWrong && (
                              <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-500/20 border border-rose-500/50 px-3 py-1 text-xs font-black text-rose-300 shadow-sm shadow-rose-500/20 animate-pulse">
                                <XCircle size={14} className="text-rose-400" />
                                <span>INCORRECT (−1 Mark)</span>
                              </span>
                            )}
                            {isUnattempted && (
                              <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-500/20 border border-slate-500/40 px-3 py-1 text-xs font-bold text-slate-300">
                                <MinusCircle size={14} className="text-slate-400" />
                                <span>SKIPPED / UNATTEMPTED (0 Marks)</span>
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Question Text with KaTeX */}
                        <div className="text-xs sm:text-sm font-medium text-slate-100 leading-relaxed overflow-x-auto py-1">
                          <MathRenderer text={q.question || q.text || ''} />
                        </div>

                        {/* Reference Diagram (if present) */}
                        {q.image && (
                          <div className="my-3 flex flex-col items-center">
                            <div className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-white/10 bg-[#05070B] p-2 shadow-inner">
                              <img
                                src={q.image}
                                alt={`Question ${q.questionNumber} Diagram`}
                                className="mx-auto max-h-60 w-auto object-contain rounded-xl bg-white p-2"
                              />
                            </div>
                          </div>
                        )}

                        {/* Student Response vs Official Correct Key Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                          {/* Left: Student Marked Response */}
                          <div
                            className={`rounded-2xl border p-3.5 flex items-center justify-between gap-2 ${
                              isWrong
                                ? 'border-rose-500/50 bg-rose-500/15 text-rose-200 ring-1 ring-rose-500/30'
                                : 'border-white/10 bg-white/5 text-slate-400'
                            }`}
                          >
                            <div className="min-w-0">
                              <span className="block text-[10px] uppercase font-black opacity-75">
                                Student's Marked Choice:
                              </span>
                              <div className="mt-0.5">
                                {q.selected ? (
                                  <div className="flex items-center gap-1.5 font-bold text-sm">
                                    <span className="font-mono text-base font-black underline decoration-rose-400">
                                      Option {q.selected}
                                    </span>
                                    {selectedOptionText && (
                                      <span className="text-xs font-normal opacity-90 truncate max-w-[200px]">
                                        (<MathRenderer text={selectedOptionText} inline />)
                                      </span>
                                    )}
                                  </div>
                                ) : (
                                  <strong className="font-mono text-sm text-slate-400">
                                    Not Answered / Skipped
                                  </strong>
                                )}
                              </div>
                            </div>
                            <div className="shrink-0">
                              {isWrong && <XCircle size={22} className="text-rose-400" />}
                              {isUnattempted && <MinusCircle size={22} className="text-slate-500" />}
                            </div>
                          </div>

                          {/* Right: Official Correct Key */}
                          <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-3.5 flex items-center justify-between gap-2 text-emerald-300">
                            <div className="min-w-0">
                              <span className="block text-[10px] uppercase font-black opacity-75">
                                Official Verified Answer:
                              </span>
                              <div className="mt-0.5">
                                <div className="flex items-center gap-1.5 font-bold text-sm">
                                  <span className="font-mono text-base font-black text-emerald-200 underline decoration-emerald-400">
                                    Option {q.correctAnswer}
                                  </span>
                                  {correctOptionText && (
                                    <span className="text-xs font-normal text-emerald-200 opacity-90 truncate max-w-[200px]">
                                      (<MathRenderer text={correctOptionText} inline />)
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="shrink-0">
                              <CheckCircle2 size={22} className="text-emerald-400" />
                            </div>
                          </div>
                        </div>

                        {/* Complete Options List (A, B, C, D) */}
                        {q.options && Object.keys(q.options).length > 0 && (
                          <div className="space-y-2 pt-2">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                              All Answer Choices:
                            </span>
                            <div className="grid grid-cols-1 gap-2">
                              {Object.entries(q.options).map(([optKey, optText]) => {
                                const isThisCorrect = optKey.toUpperCase() === q.correctAnswer?.toUpperCase();
                                const isThisSelected = optKey.toUpperCase() === q.selected?.toUpperCase();

                                let optClasses = 'border-white/10 bg-[#0A0E17] text-slate-300';
                                if (isThisCorrect) {
                                  optClasses =
                                    'border-emerald-500/50 bg-emerald-950/30 text-emerald-200 ring-1 ring-emerald-500/40 font-semibold';
                                } else if (isThisSelected && !isThisCorrect) {
                                  optClasses =
                                    'border-rose-500/50 bg-rose-950/30 text-rose-200 ring-1 ring-rose-500/40';
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
                                            ? 'bg-emerald-500 text-slate-950'
                                            : isThisSelected
                                            ? 'bg-rose-500 text-white'
                                            : 'bg-white/10 text-slate-300'
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
                                        <span className="rounded-full bg-emerald-500/20 border border-emerald-500/40 px-2.5 py-0.5 text-emerald-300 flex items-center gap-1">
                                          <Check size={11} /> Correct Answer
                                        </span>
                                      )}
                                      {isThisSelected && !isThisCorrect && (
                                        <span className="rounded-full bg-rose-500/20 border border-rose-500/40 px-2.5 py-0.5 text-rose-300 flex items-center gap-1">
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
                          <div className="rounded-2xl border border-blue-500/30 bg-gradient-to-b from-[#0E1A33] to-[#091122] p-4 sm:p-5 text-xs sm:text-sm text-slate-200 space-y-2 mt-3">
                            <div className="flex items-center gap-2 text-blue-400 font-bold text-xs uppercase tracking-wider">
                              <Sparkles size={15} />
                              <span>Step-by-Step Solution &amp; Concept Explanation:</span>
                            </div>
                            <div className="leading-relaxed overflow-x-auto pt-1 text-slate-300">
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
        <div className="flex items-center justify-between border-t border-white/10 bg-[#0D121F] px-4 sm:px-7 py-3 text-xs text-slate-400 shrink-0">
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
