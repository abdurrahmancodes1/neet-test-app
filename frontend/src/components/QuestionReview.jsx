import React, { useMemo, useState } from 'react';
import { CheckCircle2, XCircle, MinusCircle, BookOpen } from 'lucide-react';

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'wrong', label: 'Wrong' },
  { key: 'correct', label: 'Correct' },
  { key: 'unattempted', label: 'Unattempted' },
  { key: 'marked', label: 'Marked' },
];

const STATUS_BADGE = {
  correct: { label: 'Correct', className: 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30', icon: CheckCircle2 },
  wrong: { label: 'Incorrect', className: 'bg-rose-500/15 text-rose-300 border border-rose-500/30', icon: XCircle },
  unattempted: { label: 'Not Attempted', className: 'bg-white/5 text-slate-400 border border-white/10', icon: MinusCircle },
};

export default function QuestionReview({
  perQuestion = [],
  markedForReview = [],
  questions = [],
}) {
  const [filter, setFilter] = useState('all');
  const markedSet = useMemo(() => new Set(markedForReview), [markedForReview]);

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
    <div className="animate-rise-in rounded-3xl border border-white/10 bg-[#0B0F19] p-6 sm:p-8 shadow-2xl space-y-6">
      <div>
        <h2 className="mb-1 font-sans text-xl font-bold text-white flex items-center gap-2">
          <BookOpen size={20} className="text-blue-400" /> Question Review &amp; Solutions
        </h2>
        <p className="text-xs text-slate-400">Walk through every question with full verified solutions and explanations.</p>
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
              <div key={r.id} className="rounded-2xl border border-white/10 bg-[#070A12] p-5 sm:p-6 space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-blue-600/20 border border-blue-500/30 px-2.5 py-0.5 font-mono text-xs font-bold text-blue-300">
                    Q{r.id}
                  </span>
                  <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${badge.className}`}>
                    <Icon size={12} /> {badge.label}
                  </span>
                  {markedSet.has(r.id) && (
                    <span className="rounded-full bg-amber-500/20 border border-amber-500/30 px-2.5 py-0.5 text-xs font-semibold text-amber-300">
                      Marked
                    </span>
                  )}
                  {r.subject && (
                    <span className="rounded-full bg-white/5 border border-white/10 px-2.5 py-0.5 text-xs font-medium text-slate-400">
                      {r.subject}
                    </span>
                  )}
                  {r.topic && (
                    <span className="ml-auto rounded-full bg-white/5 border border-white/10 px-2.5 py-0.5 text-xs font-medium text-slate-400">
                      {r.topic}
                    </span>
                  )}
                </div>

                <p className="chem whitespace-pre-line text-sm sm:text-base font-medium leading-relaxed text-slate-100">
                  {r.question}
                </p>

                {r.image && (
                  <div className="my-3 flex justify-center">
                    <img
                      src={r.image}
                      alt={`Diagram for question ${r.id}`}
                      className="max-h-64 rounded-xl border border-white/10 bg-white object-contain p-2"
                    />
                  </div>
                )}

                <div className="grid gap-2 text-xs sm:grid-cols-2">
                  <div
                    className={`rounded-xl border p-3 ${
                      r.status === 'wrong'
                        ? 'bg-rose-500/10 border-rose-500/20 text-rose-300'
                        : r.status === 'unattempted'
                          ? 'bg-white/5 border-white/10 text-slate-300'
                          : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300'
                    }`}
                  >
                    <p className="text-[10px] font-semibold uppercase tracking-wider opacity-70">Your answer</p>
                    <p className="chem mt-1 font-semibold text-sm">
                      {r.selected ? `${r.selected}${selectedText ? `. ${selectedText}` : ''}` : 'Not attempted'}
                    </p>
                  </div>
                  <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-3 text-emerald-300">
                    <p className="text-[10px] font-semibold uppercase tracking-wider opacity-70">Correct answer</p>
                    <p className="chem mt-1 font-semibold text-sm">
                      {r.correctAnswer ? `${r.correctAnswer}${correctText ? `. ${correctText}` : ''}` : '—'}
                    </p>
                  </div>
                </div>

                {r.explanation && (
                  <div className="mt-3 rounded-xl border border-blue-500/20 bg-blue-950/20 p-4 text-xs leading-relaxed text-slate-300">
                    <p className="font-bold text-blue-400 mb-1">💡 Step-by-Step Solution &amp; Concept:</p>
                    <p className="whitespace-pre-line text-slate-300">{r.explanation}</p>
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
