import React, { useMemo, useState } from 'react';
import { CheckCircle2, XCircle, MinusCircle, BookOpen } from 'lucide-react';
import MathRenderer from './MathRenderer.jsx';
import { useTheme } from '../utils/themeContext.jsx';

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'wrong', label: 'Wrong' },
  { key: 'correct', label: 'Correct' },
  { key: 'unattempted', label: 'Unattempted' },
  { key: 'marked', label: 'Marked' },
];

export default function QuestionReview({
  perQuestion = [],
  markedForReview = [],
  questions = [],
}) {
  const { isLight } = useTheme();
  const [filter, setFilter] = useState('all');
  const markedSet = useMemo(() => new Set(markedForReview), [markedForReview]);

  const STATUS_BADGE = {
    correct: {
      label: 'Correct',
      className: isLight
        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
        : 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30',
      icon: CheckCircle2,
    },
    wrong: {
      label: 'Incorrect',
      className: isLight
        ? 'bg-rose-100 text-rose-800 border border-rose-300'
        : 'bg-rose-500/15 text-rose-300 border border-rose-500/30',
      icon: XCircle,
    },
    unattempted: {
      label: 'Not Attempted',
      className: isLight
        ? 'bg-slate-200 text-slate-700 border border-slate-300'
        : 'bg-white/5 text-slate-400 border border-white/10',
      icon: MinusCircle,
    },
  };

  const items = useMemo(() => {
    return perQuestion
      .map((r, idx) => {
        const matchingQ = questions.find((q) => (q.order ?? q.id) === (r.order ?? r.id ?? r.questionNumber)) || {};
        return {
          ...matchingQ,
          ...r,
          id: r.order ?? r.id ?? r.questionNumber ?? idx + 1,
          question: r.question || matchingQ.question,
          options: r.options || matchingQ.options || {},
          image: r.image || matchingQ.image || null,
          subject: r.subject || matchingQ.subject,
          selected: r.selectedOption || r.selected,
        };
      })
      .filter((r) => {
        if (!r.question) return false;
        if (filter === 'all') return true;
        if (filter === 'marked') return markedSet.has(r.id);
        return r.status === filter;
      });
  }, [perQuestion, questions, filter, markedSet]);

  return (
    <div
      className={`animate-rise-in rounded-3xl border p-6 sm:p-8 space-y-6 transition-colors ${
        isLight
          ? 'border-slate-200 bg-white text-slate-900 shadow-xl'
          : 'border-white/10 bg-[#0B0F19] text-slate-100 shadow-2xl'
      }`}
    >
      <div>
        <h2 className="mb-1 font-sans text-xl font-bold flex items-center gap-2">
          <BookOpen size={20} className={isLight ? 'text-blue-600' : 'text-blue-400'} /> Question Review &amp; Solutions
        </h2>
        <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
          Walk through every question with full verified solutions and explanations.
        </p>
      </div>

      {/* Filter Chips */}
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => setFilter(f.key)}
            className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition ${
              filter === f.key
                ? 'border-blue-500 bg-blue-600 text-white shadow-sm'
                : isLight
                  ? 'border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900'
                  : 'border-white/10 bg-[#070A12] text-slate-400 hover:border-white/20 hover:text-white'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {items.length === 0 ? (
        <p className="py-8 text-center text-sm text-slate-500">No questions match this filter.</p>
      ) : (
        <div className="space-y-4">
          {items.map((r) => {
            const badge = STATUS_BADGE[r.status] || STATUS_BADGE.unattempted;
            const Icon = badge.icon;
            const selectedText = r.selected && r.options ? r.options[r.selected] : null;
            const correctText = r.correctAnswer && r.options ? r.options[r.correctAnswer] : null;

            return (
              <div
                key={r.id}
                className={`rounded-2xl border p-5 sm:p-6 space-y-3 transition-colors ${
                  isLight
                    ? 'border-slate-200 bg-slate-50/80 text-slate-900'
                    : 'border-white/10 bg-[#070A12] text-slate-100'
                }`}
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`rounded-full border px-2.5 py-0.5 font-mono text-xs font-bold ${
                      isLight
                        ? 'bg-blue-100 border-blue-200 text-blue-800'
                        : 'bg-blue-600/20 border-blue-500/30 text-blue-300'
                    }`}
                  >
                    Q{r.id}
                  </span>
                  <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${badge.className}`}>
                    <Icon size={12} /> {badge.label}
                  </span>
                  {markedSet.has(r.id) && (
                    <span
                      className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
                        isLight
                          ? 'bg-amber-100 border-amber-300 text-amber-900'
                          : 'bg-amber-500/20 border-amber-500/30 text-amber-300'
                      }`}
                    >
                      Marked
                    </span>
                  )}
                  {r.subject && (
                    <span
                      className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${
                        isLight
                          ? 'bg-slate-200 border-slate-300 text-slate-700'
                          : 'bg-white/5 border-white/10 text-slate-400'
                      }`}
                    >
                      {r.subject}
                    </span>
                  )}
                  {r.topic && (
                    <span
                      className={`ml-auto rounded-full border px-2.5 py-0.5 text-xs font-medium ${
                        isLight
                          ? 'bg-slate-200 border-slate-300 text-slate-700'
                          : 'bg-white/5 border-white/10 text-slate-400'
                      }`}
                    >
                      {r.topic}
                    </span>
                  )}
                </div>

                <div
                  className={`text-sm sm:text-base font-medium leading-relaxed ${
                    isLight ? 'text-slate-900' : 'text-slate-100'
                  }`}
                >
                  <MathRenderer text={r.question} />
                </div>

                {r.image && (
                  <div className="my-3 flex justify-center">
                    <img
                      src={r.image}
                      alt={`Diagram for question ${r.id}`}
                      className="max-h-64 rounded-xl border border-slate-200 bg-white object-contain p-2"
                    />
                  </div>
                )}

                <div className="grid gap-2 text-xs sm:grid-cols-2">
                  <div
                    className={`rounded-xl border p-3 ${
                      r.status === 'wrong'
                        ? isLight
                          ? 'bg-rose-50 border-rose-200 text-rose-900'
                          : 'bg-rose-500/10 border-rose-500/20 text-rose-300'
                        : r.status === 'unattempted'
                          ? isLight
                            ? 'bg-slate-100 border-slate-200 text-slate-700'
                            : 'bg-white/5 border-white/10 text-slate-300'
                          : isLight
                            ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                            : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300'
                    }`}
                  >
                    <p className="text-[10px] font-semibold uppercase tracking-wider opacity-70">Your answer</p>
                    <div className="mt-1 font-semibold text-sm">
                      {r.selected ? (
                        <span>
                          <strong className="font-mono mr-1">{r.selected}.</strong>
                          <MathRenderer text={selectedText || ''} inline />
                        </span>
                      ) : (
                        'Not attempted'
                      )}
                    </div>
                  </div>
                  <div
                    className={`rounded-xl border p-3 ${
                      isLight
                        ? 'border-emerald-200 bg-emerald-50 text-emerald-900'
                        : 'border-emerald-500/20 bg-emerald-500/10 text-emerald-300'
                    }`}
                  >
                    <p className="text-[10px] font-semibold uppercase tracking-wider opacity-70">Correct answer</p>
                    <div className="mt-1 font-semibold text-sm">
                      {r.correctAnswer ? (
                        <span>
                          <strong className="font-mono mr-1">{r.correctAnswer}.</strong>
                          <MathRenderer text={correctText || ''} inline />
                        </span>
                      ) : (
                        '—'
                      )}
                    </div>
                  </div>
                </div>

                {r.explanation && (
                  <div
                    className={`mt-3 rounded-xl border p-4 text-xs leading-relaxed ${
                      isLight
                        ? 'border-blue-200 bg-blue-50/70 text-slate-800'
                        : 'border-blue-500/20 bg-blue-950/20 text-slate-300'
                    }`}
                  >
                    <p className={`font-bold mb-1 ${isLight ? 'text-blue-800' : 'text-blue-400'}`}>
                      💡 Step-by-Step Solution &amp; Concept:
                    </p>
                    <MathRenderer text={r.explanation} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
