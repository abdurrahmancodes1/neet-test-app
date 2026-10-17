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
import SafeSvgRenderer from '../components/SafeSvgRenderer.jsx';
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

    const testDef = suite ? suite.test : {
      title: attempt.testTitle || 'Assessment',
      subject: candidateQuestions?.[0]?.subject || 'General',
      syllabus: attempt.testTitle || 'General',
      totalMarks: attempt.maxScore || (candidateQuestions?.length || 42) * 4,
    };
    const questionsList = candidateQuestions || suite?.questions || [];
    const totalQuestions = questionsList.length;

    const answersMap = normalizeAnswersMap(
      attempt.answers || attempt.metadata?.answers,
      attempt.perQuestion || attempt.metadata?.perQuestion
    );

    const hasExplicitAnswers = Object.keys(answersMap).length > 0;

    const targetWrong = attempt.wrong !== undefined ? Number(attempt.wrong) : (attempt.wrongCount !== undefined ? Number(attempt.wrongCount) : 0);
    const targetCorrect = attempt.correct !== undefined ? Number(attempt.correct) : (attempt.correctCount !== undefined ? Number(attempt.correctCount) : 0);
    const targetUnattempted =
      attempt.unattempted !== undefined
        ? Number(attempt.unattempted)
        : (attempt.unattemptedCount !== undefined ? Number(attempt.unattemptedCount) : Math.max(0, totalQuestions - targetCorrect - targetWrong));

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
        questionImage: mq.questionImage || null,
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
        isLight ? 'bg-[#F8FAFC] text-slate-900' : 'bg-[#050811] text-slate-100'
      }`}
    >
      {/* Background technical cyber grid overlay */}
      <div
        className={`pointer-events-none fixed inset-0 z-0 ${
          isLight ? 'bg-cyber-grid opacity-60' : 'bg-cyber-grid opacity-80'
        }`}
      />

      {/* Ambient Radial Blue Glow */}
      <div
        className={`pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[450px] blur-3xl z-0 ${
          isLight
            ? 'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-500/10 via-indigo-500/5 to-transparent'
            : 'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-600/15 via-blue-950/20 to-transparent'
        }`}
      />

      {/* Floating Sticky Navigation Bar */}
      <header
        className={`sticky top-0 z-40 border-b backdrop-blur-md px-4 sm:px-8 py-3 transition-colors ${
          isLight
            ? 'bg-white/90 border-slate-200 shadow-xs'
            : 'bg-[#080D1A]/95 border-blue-900/40 shadow-lg'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          {/* Left: Back button & Breadcrumbs */}
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={onBack}
              className={`rounded-md px-3.5 py-1.5 text-xs font-mono font-bold transition flex items-center gap-1.5 shrink-0 ${
                isLight
                  ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300'
                  : 'bg-[#0A1020] hover:bg-blue-900/20 text-slate-300 border border-blue-900/40'
              }`}
            >
              <ArrowLeft size={14} />
              <span>Back to Admin</span>
            </button>

            <div className="h-4 w-px bg-slate-300 dark:bg-blue-900/40 hidden sm:block" />

            <div className="truncate min-w-0 hidden md:block font-mono text-xs">
              <span className="text-slate-500">DIAGNOSING:</span>{' '}
              <strong className="font-bold truncate text-blue-600 dark:text-blue-400">
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
                className={`rounded-md p-2 text-xs transition border ${
                  isLight
                    ? 'border-slate-200 text-slate-500 hover:text-rose-600 hover:bg-rose-50'
                    : 'border-blue-900/40 bg-[#0A1020] text-slate-400 hover:text-rose-400'
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
          className={`rounded-xl border p-6 sm:p-8 shadow-xl relative overflow-hidden transition-colors ${
            isLight
              ? 'bg-white border-slate-200 ring-1 ring-blue-600/10'
              : 'bg-[#080D1A] border-blue-900/40 bg-cyber-grid'
          }`}
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
            {/* Candidate Identity */}
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded border border-blue-800/40 bg-blue-950/60 px-2.5 py-1 text-xs font-mono font-bold text-blue-400 flex items-center gap-1.5 uppercase tracking-wider">
                  <ShieldCheck size={14} /> Comprehensive Student Diagnosis
                </span>
                <span
                  className={`rounded px-2.5 py-0.5 text-xs font-mono font-bold border ${
                    isLight
                      ? 'bg-slate-100 text-slate-700 border-slate-200'
                      : 'bg-white/5 text-slate-300 border-blue-900/40'
                  }`}
                >
                  Attempt #{attempt.attemptNumber || 1}
                </span>
                {attempt.createdAt && (
                  <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                    <Calendar size={12} className="text-blue-400" />
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
                <h1 className="font-mono text-2xl sm:text-3xl font-bold tracking-tight text-white">
                  {candidateName}
                </h1>
                <p className="font-mono text-xs sm:text-sm text-slate-400 mt-1">
                  Email: <strong className="text-slate-300">{candidateEmail}</strong>
                  {' · '}Exam: <strong className="text-blue-400">{testTitle}</strong>
                </p>
              </div>
            </div>

            {/* Primary Score Ring / Badge */}
            <div
              className={`rounded-lg border p-4 sm:p-5 flex items-center gap-4 shrink-0 shadow-lg font-mono ${
                isLight
                  ? 'bg-blue-50/60 border-blue-200'
                  : 'bg-[#0A1020] border-blue-900/40'
              }`}
            >
              <div className="h-14 w-14 rounded-md bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400 font-bold text-xl shrink-0">
                {percentage}%
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-blue-400 block tracking-wider">
                  Candidate Score
                </span>
                <div className="text-2xl sm:text-3xl font-bold">
                  <span className="text-blue-400">{score}</span>
                  <span className="text-sm font-normal text-slate-400"> / {maxScore}</span>
                </div>
                <span className="text-[11px] font-semibold text-slate-400 block">
                  Accuracy: <strong className="text-emerald-400">{accuracy}%</strong>
                </span>
              </div>
            </div>
          </div>

          {/* KPI Metrics Strip */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5 text-center font-mono">
            {/* 1. Score */}
            <div
              className={`rounded-md border p-3 ${
                isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#060A14] border-blue-900/40'
              }`}
            >
              <span className="text-[10px] uppercase font-semibold text-slate-400 block">Total Score</span>
              <strong className="text-lg font-bold text-blue-400 block mt-0.5">
                {score} / {maxScore}
              </strong>
              <span className="text-[9px] text-slate-400 block">{percentage}% Mark</span>
            </div>

            {/* 2. Accuracy */}
            <div
              className={`rounded-md border p-3 ${
                isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#060A14] border-blue-900/40'
              }`}
            >
              <span className="text-[10px] uppercase font-semibold text-slate-400 block">Accuracy</span>
              <strong className="text-lg font-bold text-emerald-400 block mt-0.5">
                {accuracy}%
              </strong>
              <span className="text-[9px] text-slate-400 block">Precision</span>
            </div>

            {/* 3. Correct */}
            <div
              className={`rounded-md border p-3 ${
                isLight
                  ? 'bg-emerald-50/50 border-emerald-200'
                  : 'bg-emerald-950/20 border-emerald-500/30'
              }`}
            >
              <span className="text-[10px] uppercase font-semibold text-emerald-400 block">
                Correct
              </span>
              <strong className="text-lg font-bold text-emerald-300 block mt-0.5">
                +{correct} Qs
              </strong>
              <span className="text-[9px] text-emerald-400/80 block font-semibold">
                +{correct * 4} Marks
              </span>
            </div>

            {/* 4. Wrong */}
            <div
              className={`rounded-md border p-3 ${
                isLight
                  ? 'bg-rose-50/50 border-rose-200'
                  : 'bg-rose-950/20 border-rose-500/30'
              }`}
            >
              <span className="text-[10px] uppercase font-semibold text-rose-400 block">
                Incorrect
              </span>
              <strong className="text-lg font-bold text-rose-300 block mt-0.5">
                −{wrong} Qs
              </strong>
              <span className="text-[9px] text-rose-400/80 block font-semibold">
                −{wrong} Negative
              </span>
            </div>

            {/* 5. Skipped */}
            <div
              className={`rounded-md border p-3 ${
                isLight
                  ? 'bg-amber-50/50 border-amber-200'
                  : 'bg-amber-950/20 border-amber-500/30'
              }`}
            >
              <span className="text-[10px] uppercase font-semibold text-amber-400 block">
                Skipped
              </span>
              <strong className="text-lg font-bold text-amber-300 block mt-0.5">
                {unattempted} Qs
              </strong>
              <span className="text-[9px] text-amber-400/80 block">0 Marks</span>
            </div>

            {/* 6. Time Spent */}
            <div
              className={`rounded-md border p-3 ${
                isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#060A14] border-blue-900/40'
              }`}
            >
              <span className="text-[10px] uppercase font-semibold text-slate-400 block">Time Spent</span>
              <strong className="text-lg font-bold block mt-0.5 text-white">
                {timeTaken}
              </strong>
              <span className="text-[9px] text-slate-400 block">CBT Clock</span>
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
        <section className="space-y-3 font-mono">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            {/* Tab switchers */}
            <div
              className={`p-1 rounded-md border flex flex-wrap items-center gap-1 ${
                isLight ? 'bg-white border-slate-300 shadow-xs' : 'bg-[#080D1A] border-blue-900/40'
              }`}
            >
              {/* Tab 1: Wrong Questions */}
              <button
                type="button"
                onClick={() => setActiveTab('wrong')}
                className={`px-3 py-1.5 rounded text-xs font-mono font-bold transition flex items-center gap-2 uppercase tracking-wider ${
                  activeTab === 'wrong'
                    ? 'bg-rose-600/25 text-rose-300 border border-rose-500/60 shadow-xs'
                    : isLight
                    ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-transparent'
                    : 'text-slate-400 hover:text-white hover:bg-blue-900/20 border border-transparent'
                }`}
              >
                <XCircle size={13} />
                <span>Wrong</span>
                <span
                  className={`rounded px-1.5 py-0.5 text-[10px] font-mono font-bold ${
                    activeTab === 'wrong'
                      ? 'bg-rose-500/30 text-rose-200 border border-rose-500/40'
                      : 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                  }`}
                >
                  {wrong}
                </span>
              </button>

              {/* Tab 2: Skipped Questions */}
              <button
                type="button"
                onClick={() => setActiveTab('unattempted')}
                className={`px-3 py-1.5 rounded text-xs font-mono font-bold transition flex items-center gap-2 uppercase tracking-wider ${
                  activeTab === 'unattempted'
                    ? 'bg-amber-600/25 text-amber-300 border border-amber-500/60 shadow-xs'
                    : isLight
                    ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-transparent'
                    : 'text-slate-400 hover:text-white hover:bg-blue-900/20 border border-transparent'
                }`}
              >
                <MinusCircle size={13} />
                <span>Skipped</span>
                <span
                  className={`rounded px-1.5 py-0.5 text-[10px] font-mono font-bold ${
                    activeTab === 'unattempted'
                      ? 'bg-amber-500/30 text-amber-200 border border-amber-500/40'
                      : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                  }`}
                >
                  {unattempted}
                </span>
              </button>

              {/* Tab 3: Topic Diagnostics */}
              <button
                type="button"
                onClick={() => setActiveTab('diagnostics')}
                className={`px-3 py-1.5 rounded text-xs font-mono font-bold transition flex items-center gap-2 uppercase tracking-wider ${
                  activeTab === 'diagnostics'
                    ? 'bg-blue-600/25 text-blue-300 border border-blue-500/60 shadow-xs'
                    : isLight
                    ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-transparent'
                    : 'text-slate-400 hover:text-white hover:bg-blue-900/20 border border-transparent'
                }`}
              >
                <BarChart3 size={13} />
                <span>Diagnostics</span>
                <span
                  className={`rounded px-1.5 py-0.5 text-[10px] font-mono font-bold ${
                    activeTab === 'diagnostics'
                      ? 'bg-blue-500/30 text-blue-200 border border-blue-500/40'
                      : 'bg-blue-500/15 text-blue-400 border border-blue-500/30'
                  }`}
                >
                  {topicPerformance.length}
                </span>
              </button>

              {/* Tab 4: All Questions */}
              <button
                type="button"
                onClick={() => setActiveTab('all')}
                className={`px-3 py-1.5 rounded text-xs font-mono font-bold transition flex items-center gap-2 uppercase tracking-wider ${
                  activeTab === 'all'
                    ? 'bg-slate-700/50 text-white border border-slate-500/60 shadow-xs'
                    : isLight
                    ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-transparent'
                    : 'text-slate-400 hover:text-white hover:bg-blue-900/20 border border-transparent'
                }`}
              >
                <Layers size={13} />
                <span>All Qs</span>
                <span
                  className={`rounded px-1.5 py-0.5 text-[10px] font-mono font-bold ${
                    activeTab === 'all'
                      ? 'bg-white/20 text-white border border-white/20'
                      : 'bg-slate-500/15 text-slate-400 border border-slate-500/30'
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
                  placeholder="FILTER BY TOPIC/TEXT..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full rounded-md px-3 py-1.5 text-xs font-mono border outline-none transition uppercase ${
                    isLight
                      ? 'bg-white border-slate-300 text-slate-900 focus:border-blue-500 shadow-xs placeholder-slate-400'
                      : 'bg-[#060A14] border-blue-900/40 text-slate-200 focus:border-blue-500 placeholder-slate-600'
                  }`}
                />
              </div>
            )}
          </div>

          {/* Quick Question Jump Pill Bar */}
          {activeTab !== 'diagnostics' && filteredQuestions.length > 0 && (
            <div
              className={`p-2.5 rounded-lg border flex items-center gap-2 overflow-x-auto scrollbar-thin ${
                isLight ? 'bg-white border-slate-300' : 'bg-[#080D1A] border-blue-900/40'
              }`}
            >
              <span className="text-[10px] uppercase font-mono font-bold text-slate-400 tracking-wider shrink-0 flex items-center gap-1 pl-1">
                <Target size={12} /> JUMP:
              </span>
              <div className="flex items-center gap-1.5">
                {filteredQuestions.map((q) => {
                  const statusColors =
                    q.status === 'wrong'
                      ? 'border-rose-500/50 bg-rose-500/15 text-rose-300 hover:bg-rose-500/25'
                      : q.status === 'unattempted'
                      ? 'border-amber-500/50 bg-amber-500/15 text-amber-300 hover:bg-amber-500/25'
                      : 'border-emerald-500/50 bg-emerald-500/15 text-emerald-300 hover:bg-emerald-500/25';

                  return (
                    <button
                      key={q.questionNumber}
                      type="button"
                      onClick={() => scrollToQuestion(q.questionNumber)}
                      className={`rounded px-2 py-0.5 text-xs font-mono font-bold border shrink-0 transition active:scale-95 ${statusColors}`}
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
          <section className="space-y-4 animate-fade-in font-mono">
            {/* Weak Topics Warning Alert */}
            {weakestTopics.length > 0 && (
              <div
                className={`rounded-lg border p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                  isLight
                    ? 'bg-rose-50 border-rose-300 text-rose-950 border-l-4 border-l-rose-500'
                    : 'bg-[#12080d] border-rose-900/50 border-l-4 border-l-rose-500'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-md bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400 shrink-0">
                    <AlertTriangle size={18} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-rose-300">
                      Identified Knowledge Gaps // {weakestTopics.length} Topics Below 70% Mastery
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Candidate committed concentrated errors in these specific concepts. Recommend targeted revision.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab('wrong')}
                  className="rounded-md bg-rose-600/30 hover:bg-rose-600/40 text-rose-200 border border-rose-500/50 text-xs font-mono font-bold uppercase tracking-wider px-4 py-2 transition active:scale-95 shrink-0"
                >
                  Review Wrong Qs &rarr;
                </button>
              </div>
            )}

            {/* Topic Performance Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {topicPerformance.map((tp) => {
                const isWeak = tp.mastery < 70;
                return (
                  <div
                    key={tp.topic}
                    className={`rounded-lg border p-4 transition-colors ${
                      isLight
                        ? 'bg-white border-slate-300 shadow-xs'
                        : 'bg-[#080D1A] border-blue-900/40 hover:border-blue-700/60'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="min-w-0">
                        <span className="text-[10px] uppercase font-mono text-slate-400 block tracking-wider">TOPIC</span>
                        <h4 className="text-sm font-bold truncate text-slate-100">{tp.topic}</h4>
                      </div>
                      <span
                        className={`rounded px-2 py-0.5 text-xs font-mono font-bold border ${
                          isWeak
                            ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                            : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                        }`}
                      >
                        {tp.mastery}%
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-3 h-1.5 w-full rounded bg-slate-800 overflow-hidden">
                      <div
                        className={`h-full rounded transition-all duration-500 ${
                          isWeak
                            ? 'bg-rose-500'
                            : 'bg-emerald-500'
                        }`}
                        style={{ width: `${Math.min(100, tp.mastery)}%` }}
                      />
                    </div>

                    {/* Counts */}
                    <div className="mt-2.5 flex items-center justify-between text-xs font-mono text-slate-400">
                      <span>TOTAL: <strong className="text-slate-200">{tp.total}</strong></span>
                      <div className="flex items-center gap-2.5">
                        <span className="text-emerald-400">+{tp.correct} COR</span>
                        <span className="text-rose-400">−{tp.wrong} WRG</span>
                        <span>{tp.unattempted} SKP</span>
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
          <section className="space-y-4">
            {filteredQuestions.length === 0 ? (
              <div
                className={`rounded-lg border p-12 text-center font-mono ${
                  isLight ? 'bg-white border-slate-300 shadow-xs' : 'bg-[#080D1A] border-blue-900/40'
                }`}
              >
                <CheckCircle2 size={36} className="mx-auto text-emerald-400 mb-3" />
                <h3 className="text-base font-bold uppercase tracking-wider text-slate-200">
                  {activeTab === 'wrong'
                    ? 'No Incorrect Answers Registered'
                    : activeTab === 'unattempted'
                    ? 'No Skipped Questions Registered'
                    : 'No Questions Match Search Query'}
                </h3>
                <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
                  {activeTab === 'wrong'
                    ? 'Candidate achieved 100% precision on attempted questions. Zero errors detected.'
                    : activeTab === 'unattempted'
                    ? 'Candidate attempted all questions without skipping.'
                    : 'Clear query to view all questions.'}
                </p>
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="mt-4 px-3 py-1.5 rounded-md bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono font-bold uppercase tracking-wider transition"
                  >
                    Clear Filter
                  </button>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredQuestions.map((q) => {
                  const isWrong = q.status === 'wrong';
                  const isUnattempted = q.status === 'unattempted';
                  const isCorrect = q.status === 'correct';

                  return (
                    <article
                      key={q.questionNumber}
                      id={`diagnosis-q-${q.questionNumber}`}
                      className={`rounded-lg border p-5 sm:p-6 transition-colors relative overflow-hidden scroll-mt-24 ${
                        isLight
                          ? isWrong
                            ? 'bg-white border-rose-300 border-l-4 border-l-rose-500 shadow-xs'
                            : isUnattempted
                            ? 'bg-white border-amber-300 border-l-4 border-l-amber-500 shadow-xs'
                            : 'bg-white border-emerald-300 border-l-4 border-l-emerald-500 shadow-xs'
                          : isWrong
                          ? 'bg-[#0C070B] border-rose-900/50 border-l-4 border-l-rose-500 shadow-sm'
                          : isUnattempted
                          ? 'bg-[#0C0B06] border-amber-900/50 border-l-4 border-l-amber-500 shadow-sm'
                          : 'bg-[#060D0A] border-emerald-900/50 border-l-4 border-l-emerald-500 shadow-sm'
                      }`}
                    >
                      {/* Top Question Tag Bar */}
                      <div className="flex flex-wrap items-center justify-between gap-2.5 border-b pb-3 border-slate-200 dark:border-blue-900/30 font-mono">
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={`rounded px-2 py-0.5 font-mono text-xs font-bold uppercase tracking-wider ${
                              isWrong
                                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                                : isUnattempted
                                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                                : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                            }`}
                          >
                            Q#{q.questionNumber}
                          </span>

                          <span className="rounded bg-blue-500/15 border border-blue-500/40 px-2 py-0.5 text-xs font-bold text-blue-300 uppercase tracking-wider">
                            {q.subject}
                          </span>

                          <span
                            className={`rounded px-2 py-0.5 text-xs font-mono border ${
                              isLight
                                ? 'bg-slate-100 text-slate-700 border-slate-300'
                                : 'bg-[#080D1A] text-slate-300 border-blue-900/40'
                            }`}
                          >
                            TOPIC: <strong className="font-semibold">{q.topic}</strong>
                          </span>
                        </div>

                        {/* Status Label */}
                        <div className="flex items-center gap-2">
                          {isWrong && (
                            <span className="rounded bg-rose-500/20 border border-rose-500/40 px-2 py-0.5 text-xs font-bold text-rose-300 flex items-center gap-1.5 uppercase tracking-wider">
                              <XCircle size={13} /> INCORRECT (MARKED: {q.selected})
                            </span>
                          )}
                          {isUnattempted && (
                            <span className="rounded bg-amber-500/20 border border-amber-500/40 px-2 py-0.5 text-xs font-bold text-amber-300 flex items-center gap-1.5 uppercase tracking-wider">
                              <MinusCircle size={13} /> SKIPPED (CORRECT: {q.correctAnswer})
                            </span>
                          )}
                          {isCorrect && (
                            <span className="rounded bg-emerald-500/20 border border-emerald-500/40 px-2 py-0.5 text-xs font-bold text-emerald-300 flex items-center gap-1.5 uppercase tracking-wider">
                              <CheckCircle2 size={13} /> CORRECT (+4)
                            </span>
                          )}
                          <span className="text-xs font-mono font-bold text-slate-500">
                            +4 / −1
                          </span>
                        </div>
                      </div>

                      {/* Question Text */}
                      <div className="mt-4 text-sm sm:text-base leading-relaxed text-slate-200 font-sans">
                        <MathRenderer text={q.question} />
                      </div>

                      {/* Optional Diagram / Inline SVG or Legacy Image */}
                      {q.questionImage?.data ? (
                        <SafeSvgRenderer
                          svgData={q.questionImage.data}
                          title={`Diagram for Question #${q.questionNumber}`}
                        />
                      ) : q.image ? (
                        <div className="mt-4 flex justify-center">
                          <img
                            src={q.image}
                            alt={`Question ${q.questionNumber}`}
                            className={`max-h-72 rounded-md object-contain p-2 ${
                              isLight ? 'border border-slate-300 bg-white shadow-xs' : 'border border-blue-900/40 bg-[#060A14] shadow-sm'
                            }`}
                          />
                        </div>
                      ) : null}

                      {/* Four Options Grid */}
                      <div className="mt-4 space-y-2 font-mono">
                        {['A', 'B', 'C', 'D'].map((letter) => {
                          const optionText = q.options?.[letter] || q.options?.[letter.toLowerCase()] || '';
                          const isCandidateChoice = q.selected === letter;
                          const isOfficialCorrect = q.correctAnswer === letter;

                          let optionStyle = isLight
                            ? 'bg-slate-50 border-slate-300 text-slate-700'
                            : 'bg-[#060A14] border-blue-900/40 text-slate-300';

                          if (isOfficialCorrect) {
                            optionStyle = isLight
                              ? 'bg-emerald-50 border-emerald-500 text-emerald-950 ring-1 ring-emerald-500/40'
                              : 'bg-emerald-950/30 border-emerald-500/60 text-emerald-200 ring-1 ring-emerald-500/30';
                          } else if (isCandidateChoice && isWrong) {
                            optionStyle = isLight
                              ? 'bg-rose-50 border-rose-500 text-rose-950 ring-1 ring-rose-500/40'
                              : 'bg-rose-950/30 border-rose-500/60 text-rose-200 ring-1 ring-rose-500/30';
                          }

                          return (
                            <div
                              key={letter}
                              className={`rounded-md border p-3 flex items-start gap-3 transition ${optionStyle}`}
                            >
                              {/* Option Letter Indicator */}
                              <div
                                className={`h-7 w-7 rounded flex items-center justify-center font-mono font-bold text-xs shrink-0 ${
                                  isOfficialCorrect
                                    ? 'bg-emerald-600 text-white shadow-xs'
                                    : isCandidateChoice && isWrong
                                    ? 'bg-rose-600 text-white shadow-xs'
                                    : isLight
                                    ? 'bg-slate-200 text-slate-700'
                                    : 'bg-[#0B1020] text-slate-300 border border-blue-900/40'
                                }`}
                              >
                                {letter}
                              </div>

                              {/* Option Content & Badges */}
                              <div className="flex-1 min-w-0">
                                <div className="text-xs sm:text-sm leading-relaxed font-sans">
                                  <MathRenderer text={optionText} />
                                </div>

                                <div className="mt-1.5 flex flex-wrap items-center gap-2">
                                  {isCandidateChoice && isWrong && (
                                    <span className="rounded bg-rose-600/20 border border-rose-500/40 px-1.5 py-0.5 text-[10px] font-mono font-bold text-rose-300 flex items-center gap-1 uppercase tracking-wider">
                                      <XCircle size={11} /> SELECTED WRONG
                                    </span>
                                  )}
                                  {isCandidateChoice && isCorrect && (
                                    <span className="rounded bg-emerald-600/20 border border-emerald-500/40 px-1.5 py-0.5 text-[10px] font-mono font-bold text-emerald-300 flex items-center gap-1 uppercase tracking-wider">
                                      <Check size={11} /> SELECTED CORRECT
                                    </span>
                                  )}
                                  {isOfficialCorrect && (
                                    <span className="rounded bg-emerald-600/20 border border-emerald-500/40 px-1.5 py-0.5 text-[10px] font-mono font-bold text-emerald-300 flex items-center gap-1 uppercase tracking-wider">
                                      <Check size={11} /> OFFICIAL KEY
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
                        className={`mt-4 rounded-lg border p-4 relative overflow-hidden font-mono ${
                          isLight
                            ? 'bg-blue-50/70 border-blue-300 text-slate-800'
                            : 'bg-[#070F1E] border-blue-900/40 text-slate-200'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <div className="h-5 w-5 rounded bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                            <Sparkles size={12} />
                          </div>
                          <span className="font-mono text-xs font-bold uppercase tracking-wider text-blue-400">
                            VERIFIED STEP-BY-STEP SOLUTION
                          </span>
                        </div>
                        <div className="text-xs sm:text-sm leading-relaxed text-slate-300 font-sans">
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
