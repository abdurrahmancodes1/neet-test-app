import React, { useMemo, useState } from 'react';
import { RotateCcw, FlaskConical } from 'lucide-react';
import { computeResult, formatDuration } from '../utils/scoring.js';
import { computeTopicPerformance, getWeakStrongTopics } from '../utils/analytics.js';
import ResultSummary from '../components/ResultSummary.jsx';
import TopicAnalysis from '../components/TopicAnalysis.jsx';
import QuestionReview from '../components/QuestionReview.jsx';

const TABS = [
  { key: 'overview', label: 'Overview' },
  { key: 'analysis', label: 'Topic Analysis' },
  { key: 'review', label: 'Question Review' },
];

export default function ResultPage({ session, onRetake }) {
  const [tab, setTab] = useState('overview');
  const [confirmRetake, setConfirmRetake] = useState(false);

  const result = useMemo(() => computeResult(session.answers), [session.answers]);
  const topics = useMemo(() => computeTopicPerformance(result.perQuestion), [result.perQuestion]);
  const { weakest, strongest } = useMemo(() => getWeakStrongTopics(topics), [topics]);

  const timeTakenMs = session.submittedAt && session.startTime ? session.submittedAt - session.startTime : 0;
  const timeTakenLabel = formatDuration(timeTakenMs);
  const attempted = result.correct + result.wrong;
  const avgMs = attempted > 0 ? timeTakenMs / attempted : 0;
  const avgTimeLabel = attempted > 0 ? `${Math.round(avgMs / 1000)}s` : '—';

  return (
    <div className="min-h-screen bg-ink-50 pb-16">
      <header className="border-b border-ink-200 bg-white">
        <div className="mx-auto flex max-w-4xl items-center gap-2 px-4 py-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink-900 text-gold-300">
            <FlaskConical size={16} strokeWidth={2.25} />
          </div>
          <p className="text-sm font-semibold text-ink-900">Laws of Motion — Result Dashboard</p>
          {session.autoSubmitted && (
            <span className="ml-auto rounded-full bg-gold-100 px-2.5 py-1 text-[11px] font-semibold text-gold-700">
              Auto-submitted at 00:00
            </span>
          )}
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-4 pt-6">
        <div className="mb-6 flex gap-2 overflow-x-auto">
          {TABS.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setTab(t.key)}
              className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-semibold transition ${
                tab === t.key
                  ? 'border-ink-900 bg-ink-900 text-white'
                  : 'border-ink-200 bg-white text-ink-600 hover:border-ink-400'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'overview' && (
          <div className="space-y-6">
            <ResultSummary result={result} timeTakenLabel={timeTakenLabel} avgTimeLabel={avgTimeLabel} />
            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => setTab('review')}
                className="flex-1 rounded-lg border border-ink-200 bg-white py-3 text-sm font-semibold text-ink-800 shadow-sm transition hover:bg-ink-100"
              >
                Review Answers
              </button>
              <button
                type="button"
                onClick={() => setTab('analysis')}
                className="flex-1 rounded-lg border border-ink-200 bg-white py-3 text-sm font-semibold text-ink-800 shadow-sm transition hover:bg-ink-100"
              >
                View Analysis
              </button>
              <button
                type="button"
                onClick={() => setConfirmRetake(true)}
                className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg bg-ink-900 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-ink-800"
              >
                <RotateCcw size={15} />
                Retake Test
              </button>
            </div>
          </div>
        )}

        {tab === 'analysis' && <TopicAnalysis topics={topics} weakest={weakest} strongest={strongest} />}

        {tab === 'review' && (
          <QuestionReview perQuestion={result.perQuestion} markedForReview={session.markedForReview} />
        )}
      </div>

      {confirmRetake && (
        <div className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-4">
          <button
            aria-label="Close"
            className="absolute inset-0 bg-ink-950/50 animate-fade-in"
            onClick={() => setConfirmRetake(false)}
          />
          <div className="animate-rise-in relative w-full max-w-sm rounded-t-2xl bg-white p-6 shadow-pop sm:rounded-2xl">
            <h2 className="mb-2 text-lg font-bold text-ink-900">Retake the test?</h2>
            <p className="mb-5 text-sm text-ink-600">
              This clears your current answers, timer, and result, and starts a fresh 60-minute attempt from Q1.
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setConfirmRetake(false)}
                className="flex-1 rounded-lg border border-ink-200 py-2.5 text-sm font-semibold text-ink-700 transition hover:bg-ink-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={onRetake}
                className="flex-1 rounded-lg bg-ink-900 py-2.5 text-sm font-semibold text-white transition hover:bg-ink-800"
              >
                Yes, retake
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
