import React from 'react';
import { X, Layers } from 'lucide-react';

function getQuestionKey(q) {
  return q.order ?? q.id ?? q._id;
}

function statusOf(q, answers, marked) {
  const key = getQuestionKey(q);
  const isAnswered = Boolean(
    answers[key] ??
    (q._id && answers[q._id]) ??
    (q.order && answers[q.order]) ??
    (q.id && answers[q.id])
  );
  const isMarked =
    marked.includes(key) ||
    (q._id && marked.includes(q._id)) ||
    (q.order && marked.includes(q.order)) ||
    (q.id && marked.includes(q.id));

  if (isAnswered && isMarked) return 'answered-marked';
  if (isMarked) return 'marked';
  if (isAnswered) return 'answered';
  return 'unanswered';
}

const STYLES = {
  answered: 'bg-emerald-600 text-white border-emerald-500 shadow-xs',
  unanswered: 'bg-[#070A12] text-slate-400 border-white/10 hover:border-white/20 hover:text-white',
  marked: 'bg-amber-500 text-slate-950 border-amber-400 font-bold',
  'answered-marked': 'bg-blue-600 text-white border-blue-400 font-bold',
  current: 'ring-2 ring-offset-2 ring-blue-500 ring-offset-[#0B0F19] scale-105',
};

const LEGEND = [
  { key: 'answered', label: 'Answered', className: 'bg-emerald-500' },
  { key: 'unanswered', label: 'Not answered', className: 'bg-[#070A12] border border-white/20' },
  { key: 'marked', label: 'Marked for review', className: 'bg-amber-500' },
  { key: 'answered-marked', label: 'Answered + marked', className: 'bg-blue-600' },
];

function Grid({ questions, answers, marked, currentIndex, onJump }) {
  return (
    <div className="grid grid-cols-5 gap-2 sm:grid-cols-6">
      {questions.map((q, idx) => {
        const status = statusOf(q, answers, marked);
        const isCurrent = idx === currentIndex;
        const key = getQuestionKey(q) || idx;
        return (
          <button
            key={key}
            type="button"
            onClick={() => onJump(idx)}
            aria-label={`Go to question ${idx + 1}, ${status.replace('-', ' ')}${isCurrent ? ', current question' : ''}`}
            aria-current={isCurrent ? 'true' : undefined}
            className={`flex h-10 w-full items-center justify-center rounded-xl border font-mono text-xs font-bold transition active:scale-95 ${STYLES[status]} ${
              isCurrent ? STYLES.current : ''
            }`}
          >
            {idx + 1}
          </button>
        );
      })}
    </div>
  );
}

export function PaletteLegend() {
  return (
    <div className="flex flex-wrap gap-x-3.5 gap-y-2 text-xs text-slate-400 pt-2">
      {LEGEND.map((item) => (
        <div key={item.key} className="flex items-center gap-1.5">
          <span className={`h-2.5 w-2.5 rounded-full ${item.className}`} />
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
}

export function PaletteSummary({ questions, answers, marked }) {
  const answeredCount = questions.filter((q) => {
    const key = getQuestionKey(q);
    return Boolean(
      answers[key] ??
      (q._id && answers[q._id]) ??
      (q.order && answers[q.order]) ??
      (q.id && answers[q.id])
    );
  }).length;
  const markedCount = marked.length;
  const unansweredCount = questions.length - answeredCount;
  return (
    <div className="grid grid-cols-3 gap-2 text-center">
      <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 py-2">
        <p className="text-base font-bold text-emerald-400 font-mono">{answeredCount}</p>
        <p className="text-[10px] font-semibold text-emerald-300/80 uppercase">Answered</p>
      </div>
      <div className="rounded-xl border border-white/10 bg-[#070A12] py-2">
        <p className="text-base font-bold text-slate-200 font-mono">{unansweredCount}</p>
        <p className="text-[10px] font-semibold text-slate-400 uppercase">Left</p>
      </div>
      <div className="rounded-xl border border-amber-500/20 bg-amber-500/10 py-2">
        <p className="text-base font-bold text-amber-400 font-mono">{markedCount}</p>
        <p className="text-[10px] font-semibold text-amber-300/80 uppercase">Marked</p>
      </div>
    </div>
  );
}

/** Desktop: fixed sidebar. Mobile: slide-over drawer, controlled by `open`. */
export default function QuestionPalette({
  questions,
  answers,
  marked,
  currentIndex,
  onJump,
  open,
  onClose,
  onSubmit,
}) {
  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden w-72 shrink-0 lg:block">
        <div className="sticky top-20 rounded-3xl border border-white/10 bg-[#0B0F19] p-5 shadow-2xl space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <Layers size={14} className="text-blue-400" /> Question Palette
            </h2>
            <span className="text-[11px] font-mono text-slate-500">{questions.length} Total</span>
          </div>

          <PaletteSummary questions={questions} answers={answers} marked={marked} />

          <div className="my-3 max-h-[44vh] overflow-y-auto pr-1">
            <Grid
              questions={questions}
              answers={answers}
              marked={marked}
              currentIndex={currentIndex}
              onJump={onJump}
            />
          </div>

          <div className="border-t border-white/10 pt-2">
            <PaletteLegend />
          </div>

          <button
            type="button"
            onClick={onSubmit}
            className="w-full rounded-full bg-blue-600 hover:bg-blue-500 py-3 text-xs font-bold text-white shadow-lg shadow-blue-600/25 transition active:scale-95"
          >
            Submit Test
          </button>
        </div>
      </aside>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            aria-label="Close palette"
            className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-fade-in"
            onClick={onClose}
          />
          <div className="animate-rise-in absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto rounded-t-3xl border-t border-white/10 bg-[#0B0F19] p-6 shadow-2xl space-y-4 text-white">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
                <Layers size={16} className="text-blue-400" /> Question Palette
              </h2>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="rounded-full p-2 text-slate-400 hover:bg-white/10 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <PaletteSummary questions={questions} answers={answers} marked={marked} />

            <div className="my-4">
              <Grid
                questions={questions}
                answers={answers}
                marked={marked}
                currentIndex={currentIndex}
                onJump={(idx) => {
                  onJump(idx);
                  onClose();
                }}
              />
            </div>

            <div className="border-t border-white/10 pt-2">
              <PaletteLegend />
            </div>

            <button
              type="button"
              onClick={onSubmit}
              className="w-full rounded-full bg-blue-600 hover:bg-blue-500 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/30 transition"
            >
              Submit Test
            </button>
          </div>
        </div>
      )}
    </>
  );
}
