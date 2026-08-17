import React, { useMemo, useState } from 'react';
import { CheckCircle2, XCircle, MinusCircle } from 'lucide-react';
import { questions } from '../data/questions.js';

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'wrong', label: 'Wrong' },
  { key: 'correct', label: 'Correct' },
  { key: 'unattempted', label: 'Unattempted' },
  { key: 'marked', label: 'Marked' },
];

const STATUS_BADGE = {
  correct: { label: 'Correct', className: 'bg-good-100 text-good-700', icon: CheckCircle2 },
  wrong: { label: 'Incorrect', className: 'bg-bad-100 text-bad-700', icon: XCircle },
  unattempted: { label: 'Not Attempted', className: 'bg-ink-100 text-ink-600', icon: MinusCircle },
};

export default function QuestionReview({ perQuestion, markedForReview }) {
  const [filter, setFilter] = useState('all');
  const markedSet = useMemo(() => new Set(markedForReview), [markedForReview]);

  const items = useMemo(() => {
    return perQuestion
      .map((r) => ({ ...r, q: questions.find((q) => q.id === r.id) }))
      .filter((r) => {
        if (filter === 'all') return true;
        if (filter === 'marked') return markedSet.has(r.id);
        return r.status === filter;
      });
  }, [perQuestion, filter, markedSet]);

  return (
    <div className="animate-rise-in rounded-xl2 border border-ink-200 bg-white p-6 shadow-card sm:p-8">
      <h2 className="mb-1 font-serif text-xl font-bold text-ink-900">Question Review</h2>
      <p className="mb-4 text-sm text-ink-500">Walk through every question with the correct answer shown.</p>

      <div className="mb-6 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => setFilter(f.key)}
            className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition ${
              filter === f.key
                ? 'border-ink-900 bg-ink-900 text-white'
                : 'border-ink-200 text-ink-600 hover:border-ink-400'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {items.length === 0 ? (
        <p className="py-8 text-center text-sm text-ink-400">No questions match this filter.</p>
      ) : (
        <div className="space-y-5">
          {items.map((r) => {
            const badge = STATUS_BADGE[r.status];
            const Icon = badge.icon;
            return (
              <div key={r.id} className="rounded-xl border border-ink-200 p-4 sm:p-5">
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <span className="rounded-md bg-ink-900 px-2 py-0.5 font-mono text-xs font-bold text-gold-300">
                    Q{r.id}
                  </span>
                  <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${badge.className}`}>
                    <Icon size={12} /> {badge.label}
                  </span>
                  {markedSet.has(r.id) && (
                    <span className="rounded-full bg-gold-100 px-2.5 py-0.5 text-xs font-semibold text-gold-700">
                      Marked
                    </span>
                  )}
                  <span className="ml-auto rounded-full bg-ink-100 px-2.5 py-0.5 text-xs font-medium text-ink-600">
                    {r.topic}
                  </span>
                </div>

                <p className="chem mb-3 whitespace-pre-line text-sm font-medium leading-relaxed text-ink-900">
                  {r.q.question}
                </p>

                <div className="grid gap-2 text-sm sm:grid-cols-2">
                  <div
                    className={`rounded-lg px-3 py-2 ${
                      r.status === 'wrong' ? 'bg-bad-100' : r.status === 'unattempted' ? 'bg-ink-100' : 'bg-good-100'
                    }`}
                  >
                    <p className="text-xs font-semibold uppercase tracking-wide opacity-70">Your answer</p>
                    <p className="chem font-medium">
                      {r.selected ? `${r.selected}. ${r.q.options[r.selected]}` : 'Not attempted'}
                    </p>
                  </div>
                  <div className="rounded-lg bg-good-100 px-3 py-2">
                    <p className="text-xs font-semibold uppercase tracking-wide opacity-70">Correct answer</p>
                    <p className="chem font-medium">
                      {r.correctAnswer}. {r.q.options[r.correctAnswer]}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
