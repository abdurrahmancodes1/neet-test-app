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
} from 'lucide-react';
import MathRenderer from './MathRenderer.jsx';
import NeetScorePredictorCard from './NeetScorePredictorCard.jsx';
import { formatDuration } from '../utils/scoring.js';

export default function AdminAttemptDetailModal({
  isOpen,
  onClose,
  attempt,
  student,
}) {
  const [filter, setFilter] = useState('all'); // 'all' | 'correct' | 'wrong' | 'unattempted'
  const [activeTab, setActiveTab] = useState('diagnostics'); // 'diagnostics' | 'questions'

  if (!isOpen || !attempt) return null;

  const testTitle = attempt.testTitle || 'NEET CBT Examination';
  const testId = attempt.testId || '';
  const score = attempt.score ?? 0;
  const maxScore = attempt.maxScore || 240;
  const accuracy = attempt.accuracy ?? 0;
  const percentage = attempt.percentage ?? 0;
  const correct = attempt.correct ?? 0;
  const wrong = attempt.wrong ?? 0;
  const unattempted = attempt.unattempted ?? 0;
  const totalQuestions = attempt.totalQuestions || (correct + wrong + unattempted) || 60;
  const timeTaken = attempt.timeTakenMs ? formatDuration(attempt.timeTakenMs) : '—';
  const candidateName = student?.name || attempt.studentName || 'Candidate';
  const candidateEmail = student?.email || attempt.studentEmail || '';

  const perQuestion = attempt.perQuestion || [];
  const topicPerformance = attempt.topicPerformance || [];
  const weakestTopics = attempt.weakestTopics || topicPerformance.filter((t) => (t.mastery ?? 0) < 70);
  const strongestTopics = attempt.strongestTopics || topicPerformance.filter((t) => (t.mastery ?? 0) >= 70);

  const filteredQuestions = useMemo(() => {
    if (filter === 'correct') return perQuestion.filter((q) => q.status === 'correct');
    if (filter === 'wrong') return perQuestion.filter((q) => q.status === 'wrong');
    if (filter === 'unattempted') return perQuestion.filter((q) => q.status === 'unattempted');
    return perQuestion;
  }, [perQuestion, filter]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      {/* Dark backdrop */}
      <div
        className="absolute inset-0 bg-black/85 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl border border-white/10 bg-[#0B0F19] shadow-2xl overflow-hidden text-slate-100 z-10 animate-rise-in">
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-white/10 bg-[#0D121F] px-5 sm:px-7 py-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-blue-600/20 border border-blue-500/30 text-blue-400 font-bold text-sm">
              <User size={18} />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="font-sans text-base sm:text-lg font-black text-white truncate">
                  {candidateName}'s Test Diagnostics
                </h2>
                <span className="rounded-full bg-blue-500/20 border border-blue-500/30 px-2 py-0.5 text-[10px] font-bold text-blue-300">
                  Attempt #{attempt.attemptNumber || 1}
                </span>
              </div>
              <p className="text-xs text-slate-400 truncate">
                {candidateEmail} · {testTitle}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-white/10 bg-white/5 p-2 text-slate-400 hover:text-white hover:bg-white/10 transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center justify-between border-b border-white/10 bg-[#070A12] px-5 sm:px-7 py-2.5">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('diagnostics')}
              className={`rounded-full px-4 py-1.5 text-xs font-bold transition ${
                activeTab === 'diagnostics'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Performance &amp; Weak/Strong Topics
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('questions')}
              className={`rounded-full px-4 py-1.5 text-xs font-bold transition ${
                activeTab === 'questions'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Question-by-Question Review ({perQuestion.length})
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-slate-400">
            <Clock size={13} className="text-blue-400" />
            <span>Time Spent: <strong className="text-white font-mono">{timeTaken}</strong></span>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6">
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="rounded-2xl border border-white/10 bg-[#070A12] p-3">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Final Score</span>
              <p className="mt-1 font-mono text-xl sm:text-2xl font-black text-white">
                {score} <span className="text-xs font-normal text-slate-500">/ {maxScore}</span>
              </p>
              <span className="text-[10px] text-blue-400 font-semibold">{percentage}% Total</span>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#070A12] p-3">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Accuracy</span>
              <p className="mt-1 font-mono text-xl sm:text-2xl font-black text-emerald-400">
                {accuracy.toFixed(1)}%
              </p>
              <span className="text-[10px] text-slate-400 font-medium">{correct} of {correct + wrong} attempted</span>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#070A12] p-3">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Correct / Wrong</span>
              <div className="mt-1 flex items-center justify-center gap-1.5 font-mono text-lg font-black">
                <span className="text-emerald-400">+{correct}</span>
                <span className="text-slate-600">/</span>
                <span className="text-rose-400">-{wrong}</span>
              </div>
              <span className="text-[10px] text-slate-400">{unattempted} Unattempted</span>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#070A12] p-3">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Exam Date</span>
              <p className="mt-1 text-xs font-bold text-white">
                {new Date(attempt.timestamp || attempt.submittedAt || Date.now()).toLocaleDateString(undefined, {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </p>
              <span className="text-[10px] text-slate-500 font-mono">{timeTaken} Duration</span>
            </div>
          </div>

          {/* NEET 2027 Score & AIR Projector (Only for the 2 newly added tests) */}
          <NeetScorePredictorCard
            testId={testId}
            score={score}
            maxScore={maxScore}
            accuracy={accuracy}
            correct={correct}
            wrong={wrong}
            candidateName={candidateName}
          />

          {activeTab === 'diagnostics' && (
            <div className="space-y-6">
              {/* Weak & Strong Topics Highlights */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Weak Topics (Where Improvement is Needed) */}
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
                          <div>
                            <span className="font-bold text-white block">{t.topic}</span>
                            <span className="text-[11px] text-rose-300">
                              {t.wrong} incorrect · {t.unattempted} skipped
                            </span>
                          </div>
                          <span className="rounded-full bg-rose-500/20 border border-rose-500/40 px-2.5 py-0.5 font-mono text-xs font-black text-rose-300">
                            {t.mastery ?? Math.round((t.correct / (t.total || 1)) * 100)}%
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Strong Topics (Mastered Areas) */}
                <div className="rounded-3xl border border-emerald-500/30 bg-gradient-to-b from-emerald-950/30 via-[#0B1511] to-[#070A12] p-5 shadow-xl space-y-3">
                  <div className="flex items-center gap-2 text-emerald-300">
                    <Award size={18} className="text-emerald-400" />
                    <h3 className="font-bold text-sm text-white">
                      🏆 Strong &amp; Mastered Topics ({strongestTopics.length})
                    </h3>
                  </div>
                  <p className="text-xs text-slate-400">
                    Topics where candidate demonstrated strong retention and high precision.
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
                          <div>
                            <span className="font-bold text-white block">{t.topic}</span>
                            <span className="text-[11px] text-emerald-300">
                              {t.correct} of {t.total} correct
                            </span>
                          </div>
                          <span className="rounded-full bg-emerald-500/20 border border-emerald-500/40 px-2.5 py-0.5 font-mono text-xs font-black text-emerald-300">
                            {t.mastery ?? Math.round((t.correct / (t.total || 1)) * 100)}%
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Complete Topic Breakdown Bar Charts */}
              {topicPerformance.length > 0 && (
                <div className="rounded-3xl border border-white/10 bg-[#070A12] p-5 sm:p-6 space-y-4">
                  <h3 className="font-bold text-sm text-white flex items-center gap-2">
                    <Layers size={16} className="text-blue-400" />
                    Complete Curriculum Mastery Breakdown
                  </h3>

                  <div className="space-y-3">
                    {topicPerformance.map((t, idx) => {
                      const pct = t.mastery ?? Math.round((t.correct / (t.total || 1)) * 100);
                      return (
                        <div key={idx} className="space-y-1.5 text-xs">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-slate-200">{t.topic}</span>
                            <span className="font-mono text-[11px] text-slate-400">
                              {t.correct}/{t.total} Qs · <strong className="text-white">{pct}%</strong>
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

          {activeTab === 'questions' && (
            <div className="space-y-5">
              {/* Question Filters */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
                <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <Filter size={14} className="text-blue-400" /> Filter Questions:
                </span>
                <div className="flex items-center gap-1.5 text-xs">
                  <button
                    type="button"
                    onClick={() => setFilter('all')}
                    className={`rounded-full px-3 py-1 font-bold transition ${
                      filter === 'all'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white/5 text-slate-400 hover:text-white'
                    }`}
                  >
                    All ({perQuestion.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setFilter('correct')}
                    className={`rounded-full px-3 py-1 font-bold transition ${
                      filter === 'correct'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-white/5 text-emerald-400 hover:text-white'
                    }`}
                  >
                    Correct ({correct})
                  </button>
                  <button
                    type="button"
                    onClick={() => setFilter('wrong')}
                    className={`rounded-full px-3 py-1 font-bold transition ${
                      filter === 'wrong'
                        ? 'bg-rose-600 text-white'
                        : 'bg-white/5 text-rose-400 hover:text-white'
                    }`}
                  >
                    Wrong ({wrong})
                  </button>
                  <button
                    type="button"
                    onClick={() => setFilter('unattempted')}
                    className={`rounded-full px-3 py-1 font-bold transition ${
                      filter === 'unattempted'
                        ? 'bg-slate-600 text-white'
                        : 'bg-white/5 text-slate-400 hover:text-white'
                    }`}
                  >
                    Skipped ({unattempted})
                  </button>
                </div>
              </div>

              {/* Question Cards List */}
              {filteredQuestions.length === 0 ? (
                <p className="text-center text-xs text-slate-500 py-8 italic">
                  No questions match the selected filter.
                </p>
              ) : (
                <div className="space-y-4">
                  {filteredQuestions.map((q, idx) => {
                    const isCorrect = q.status === 'correct';
                    const isWrong = q.status === 'wrong';
                    const isUnattempted = q.status === 'unattempted';

                    const borderTone = isCorrect
                      ? 'border-emerald-500/30 bg-[#081510]'
                      : isWrong
                      ? 'border-rose-500/30 bg-[#14080B]'
                      : 'border-white/10 bg-[#070A12]';

                    return (
                      <div
                        key={q.id || idx}
                        className={`rounded-2xl border p-4 sm:p-5 shadow-lg space-y-4 transition ${borderTone}`}
                      >
                        {/* Status bar */}
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 pb-2.5">
                          <div className="flex items-center gap-2 text-xs">
                            <span className="font-mono font-bold text-white bg-white/10 px-2 py-0.5 rounded-md">
                              Q{q.questionNumber || idx + 1}
                            </span>
                            <span className="text-[11px] text-slate-400 font-semibold">{q.topic}</span>
                          </div>

                          <span
                            className={`rounded-full px-2.5 py-0.5 text-[10px] font-extrabold uppercase border ${
                              isCorrect
                                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                                : isWrong
                                ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                                : 'bg-slate-500/20 text-slate-300 border-slate-500/40'
                            }`}
                          >
                            {isCorrect ? '✓ Correct (+4)' : isWrong ? '✗ Incorrect (−1)' : '○ Skipped (0)'}
                          </span>
                        </div>

                        {/* Question Text with KaTeX */}
                        <div className="text-xs sm:text-sm font-medium text-slate-100 leading-relaxed overflow-x-auto">
                          <MathRenderer text={q.question || q.text || ''} />
                        </div>

                        {/* Reference Diagram */}
                        {q.image && (
                          <div className="my-3 flex flex-col items-center">
                            <div className="relative w-full max-w-sm overflow-hidden rounded-xl border border-white/10 bg-[#05070B] p-2">
                              <img
                                src={q.image}
                                alt={`Question ${q.questionNumber} Diagram`}
                                className="mx-auto max-h-56 w-auto object-contain rounded bg-white p-1"
                              />
                            </div>
                          </div>
                        )}

                        {/* Candidate Selected Option vs Correct Answer */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          <div
                            className={`rounded-xl border p-2.5 ${
                              isCorrect
                                ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
                                : isWrong
                                ? 'border-rose-500/40 bg-rose-500/10 text-rose-300'
                                : 'border-white/10 bg-white/5 text-slate-400'
                            }`}
                          >
                            <span className="block text-[10px] uppercase font-bold opacity-80">
                              Candidate Response:
                            </span>
                            <strong className="font-mono text-sm">
                              {q.selected ? `Option ${q.selected}` : 'Not Answered'}
                            </strong>
                          </div>

                          <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-2.5 text-emerald-300">
                            <span className="block text-[10px] uppercase font-bold opacity-80">
                              Official Correct Answer:
                            </span>
                            <strong className="font-mono text-sm">
                              Option {q.correctAnswer}
                            </strong>
                          </div>
                        </div>

                        {/* Options List */}
                        {q.options && (
                          <div className="space-y-1.5 pt-1 text-xs">
                            {Object.entries(q.options).map(([optKey, optText]) => {
                              const isThisCorrect = optKey === q.correctAnswer;
                              const isThisSelected = optKey === q.selected;

                              let optBorder = 'border-white/5 bg-white/[0.02] text-slate-400';
                              if (isThisCorrect) optBorder = 'border-emerald-500/40 bg-emerald-500/15 text-emerald-200 font-semibold';
                              else if (isThisSelected && !isThisCorrect) optBorder = 'border-rose-500/40 bg-rose-500/15 text-rose-200';

                              return (
                                <div
                                  key={optKey}
                                  className={`rounded-xl border px-3 py-2 flex items-center justify-between gap-2 ${optBorder}`}
                                >
                                  <div className="flex items-center gap-2 overflow-x-auto">
                                    <strong className="font-mono text-xs text-white">{optKey}.</strong>
                                    <span><MathRenderer text={optText} /></span>
                                  </div>
                                  {isThisCorrect && <span className="text-[10px] font-bold text-emerald-400 uppercase">Correct</span>}
                                  {isThisSelected && !isThisCorrect && <span className="text-[10px] font-bold text-rose-400 uppercase">Marked</span>}
                                </div>
                              );
                            })}
                          </div>
                        )}

                        {/* Step-by-Step Explanation */}
                        {q.explanation && (
                          <div className="rounded-xl border border-blue-500/20 bg-blue-950/20 p-3.5 text-xs text-slate-300 space-y-1">
                            <span className="font-bold text-blue-400 text-[11px] block">
                              📘 Step-by-Step Solution &amp; Explanation:
                            </span>
                            <div className="text-slate-300 leading-relaxed overflow-x-auto pt-1">
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

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-white/10 bg-[#0D121F] px-5 sm:px-7 py-3 text-xs text-slate-400">
          <span>Administrator Diagnostic View</span>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-blue-600 hover:bg-blue-500 px-5 py-1.5 text-xs font-bold text-white transition"
          >
            Close Diagnostics
          </button>
        </div>
      </div>
    </div>
  );
}
