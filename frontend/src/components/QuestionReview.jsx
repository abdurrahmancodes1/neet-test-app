import React, { useMemo, useState } from 'react';
import { CheckCircle2, XCircle, MinusCircle, BookOpen } from 'lucide-react';
import MathRenderer from './MathRenderer.jsx';
import SafeSvgRenderer from './SafeSvgRenderer.jsx';
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
    const baseList = perQuestion.length > 0 ? perQuestion : questions;
    return baseList
      .map((r, idx) => {
        const id = r.order ?? r.id ?? r.questionNumber ?? idx + 1;
        const matchingQ =
          questions.find((q) => (q.order ?? q.id ?? q.questionNumber) === id) ||
          perQuestion.find((q) => (q.order ?? q.id ?? q.questionNumber) === id) ||
          {};

        const questionText =
          r.question ||
          r.text ||
          matchingQ.question ||
          matchingQ.text ||
          `Question ${id}`;

        const options =
          r.options && Object.keys(r.options).length > 0
            ? r.options
            : matchingQ.options && Object.keys(matchingQ.options).length > 0
            ? matchingQ.options
            : {};

        const selected = r.selectedOption || r.selected || matchingQ.selectedOption || matchingQ.selected || null;
        const correctAnswer = r.correctAnswer || matchingQ.correctAnswer || null;
        const explanation =
          r.explanation ||
          r.solution ||
          r.explanationText ||
          r.solutionText ||
          matchingQ.explanation ||
          matchingQ.solution ||
          matchingQ.explanationText ||
          matchingQ.solutionText ||
          null;

        const isNumerical =
          r.type === 'numerical' ||
          matchingQ.type === 'numerical' ||
          Object.keys(options).length === 0;

        let status = r.status || matchingQ.status;
        if (!status) {
          if (!selected) {
            status = 'unattempted';
          } else if (correctAnswer) {
            const selTrim = String(selected).trim().toUpperCase();
            const corTrim = String(correctAnswer).trim().toUpperCase();
            if (selTrim === corTrim) {
              status = 'correct';
            } else if (isNumerical) {
              const numSel = parseFloat(selTrim);
              const numCor = parseFloat(corTrim);
              status =
                !isNaN(numSel) && !isNaN(numCor) && Math.abs(numSel - numCor) < 0.001
                  ? 'correct'
                  : 'wrong';
            } else {
              status = 'wrong';
            }
          } else {
            status = 'wrong';
          }
        }

        return {
          ...matchingQ,
          ...r,
          id,
          questionNumber: id,
          order: id,
          question: questionText,
          options,
          isNumerical,
          image: r.image || matchingQ.image || null,
          questionImage: r.questionImage || matchingQ.questionImage || null,
          explanationImage: r.explanationImage || matchingQ.explanationImage || null,
          subject: r.subject || matchingQ.subject || 'General',
          topic: r.topic || matchingQ.topic || 'General',
          selected,
          correctAnswer,
          explanation,
          status,
        };
      })
      .filter((r) => {
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
                  {r.isNumerical && (
                    <span
                      className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase ${
                        isLight
                          ? 'bg-blue-100 border-blue-300 text-blue-800'
                          : 'bg-blue-600/20 border-blue-500/40 text-blue-300'
                      }`}
                    >
                      Section B · Numerical
                    </span>
                  )}
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

                {/* Question Diagram / Inline SVG or Legacy Image */}
                {r.questionImage?.data ? (
                  <SafeSvgRenderer
                    svgData={r.questionImage.data}
                    title={`Diagram for Question #${r.id}`}
                  />
                ) : r.image ? (
                  <div className="my-3 flex justify-center">
                    <img
                      src={r.image}
                      alt={`Diagram for question ${r.id}`}
                      className="max-h-64 rounded-xl border border-slate-200 bg-white object-contain p-2"
                    />
                  </div>
                ) : null}

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
                    <p className="text-[10px] font-semibold uppercase tracking-wider opacity-70">
                      {r.isNumerical ? 'Your numerical value' : 'Your answer'}
                    </p>
                    <div className="mt-1 font-semibold text-sm">
                      {r.selected ? (
                        r.isNumerical ? (
                          <span className="font-mono text-base font-bold">{r.selected}</span>
                        ) : (
                          <span>
                            <strong className="font-mono mr-1">{r.selected}.</strong>
                            <MathRenderer text={selectedText || ''} inline />
                          </span>
                        )
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
                    <p className="text-[10px] font-semibold uppercase tracking-wider opacity-70">
                      {r.isNumerical ? 'Correct numerical value' : 'Correct answer'}
                    </p>
                    <div className="mt-1 font-semibold text-sm">
                      {r.correctAnswer ? (
                        r.isNumerical ? (
                          <span className="font-mono text-base font-bold text-emerald-600 dark:text-emerald-400">
                            {r.correctAnswer}
                          </span>
                        ) : (
                          <span>
                            <strong className="font-mono mr-1">{r.correctAnswer}.</strong>
                            <MathRenderer text={correctText || ''} inline />
                          </span>
                        )
                      ) : (
                        '—'
                      )}
                    </div>
                  </div>
                </div>

                {r.explanation ? (
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
                    {r.explanationImage?.data && (
                      <SafeSvgRenderer
                        svgData={r.explanationImage.data}
                        title={`Solution Diagram #${r.id}`}
                        maxHeight="max-h-56"
                      />
                    )}
                  </div>
                ) : (
                  <div
                    className={`mt-3 rounded-xl border p-3.5 text-xs leading-relaxed ${
                      r.status === 'wrong'
                        ? isLight
                          ? 'border-rose-200 bg-rose-50/60 text-slate-800'
                          : 'border-rose-500/20 bg-rose-950/20 text-slate-300'
                        : isLight
                        ? 'border-slate-200 bg-slate-50/70 text-slate-700'
                        : 'border-white/10 bg-white/5 text-slate-400'
                    }`}
                  >
                    <p
                      className={`font-bold mb-1 flex items-center gap-1.5 ${
                        r.status === 'wrong'
                          ? isLight
                            ? 'text-rose-700'
                            : 'text-rose-400'
                          : isLight
                          ? 'text-blue-700'
                          : 'text-blue-400'
                      }`}
                    >
                      💡 Solution &amp; Revision Guidance:
                    </p>
                    <div className="text-[11px] leading-relaxed">
                      {r.correctAnswer ? (
                        r.isNumerical ? (
                          <span>
                            The verified correct numerical value is{' '}
                            <strong className="font-mono text-emerald-600 dark:text-emerald-400">
                              {r.correctAnswer}
                            </strong>
                            .
                          </span>
                        ) : (
                          <span>
                            The verified correct answer is Option{' '}
                            <strong className="font-mono text-emerald-600 dark:text-emerald-400">
                              {r.correctAnswer}
                            </strong>
                            .
                          </span>
                        )
                      ) : (
                        <span>Verified standard answer recorded.</span>
                      )}{' '}
                      Review standard NCERT concepts under{' '}
                      <strong>{r.chapter || r.subject}</strong>
                      {r.topic ? ` (${r.topic})` : ''} for the theoretical principles governing this problem.
                    </div>
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
