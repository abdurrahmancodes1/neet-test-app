import React from 'react';
import { X } from 'lucide-react';

function statusOf(q, answers, marked) {
  const isAnswered = Boolean(answers[q.id]);
  const isMarked = marked.includes(q.id);
  if (isAnswered && isMarked) return 'answered-marked';
  if (isMarked) return 'marked';
  if (isAnswered) return 'answered';
  return 'unanswered';
}

const STYLES = {
  answered: 'bg-good-500 text-white border-good-600',
  unanswered: 'bg-white text-ink-700 border-ink-300',
  marked: 'bg-gold-500 text-white border-gold-600',
  'answered-marked': 'bg-ink-800 text-white border-ink-900',
  current: 'ring-2 ring-offset-2 ring-ink-800',
};

const LEGEND = [
  { key: 'answered', label: 'Answered', className: 'bg-good-500' },
  { key: 'unanswered', label: 'Not answered', className: 'bg-white border border-ink-300' },
  { key: 'marked', label: 'Marked for review', className: 'bg-gold-500' },
  { key: 'answered-marked', label: 'Answered + marked', className: 'bg-ink-800' },
];

function Grid({ questions, answers, marked, currentIndex, onJump }) {
  return (
    <div className="grid grid-cols-5 gap-2 sm:grid-cols-6">
      {questions.map((q, idx) => {
        const status = statusOf(q, answers, marked);
        const isCurrent = idx === currentIndex;
        return (
          <button
            key={q.id}
            type="button"
            onClick={() => onJump(idx)}
            aria-label={`Go to question ${idx + 1}, ${status.replace('-', ' ')}${isCurrent ? ', current question' : ''}`}
            aria-current={isCurrent ? 'true' : undefined}
            className={`flex h-10 w-full items-center justify-center rounded-lg border font-mono text-sm font-semibold transition active:scale-95 ${STYLES[status]} ${
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
    <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-ink-600">
      {LEGEND.map((item) => (
        <div key={item.key} className="flex items-center gap-1.5">
          <span className={`h-3 w-3 rounded ${item.className}`} />
          {item.label}
        </div>
      ))}
    </div>
  );
}

export function PaletteSummary({ questions, answers, marked }) {
  const answeredCount = questions.filter((q) => answers[q.id]).length;
  const markedCount = marked.length;
  const unansweredCount = questions.length - answeredCount;
  return (
    <div className="grid grid-cols-3 gap-2 text-center">
      <div className="rounded-lg bg-good-100 py-2">
        <p className="text-lg font-bold text-good-700">{answeredCount}</p>
        <p className="text-[11px] font-medium text-good-700/80">Answered</p>
      </div>
      <div className="rounded-lg bg-ink-100 py-2">
        <p className="text-lg font-bold text-ink-700">{unansweredCount}</p>
        <p className="text-[11px] font-medium text-ink-600">Unanswered</p>
      </div>
      <div className="rounded-lg bg-gold-100 py-2">
        <p className="text-lg font-bold text-gold-700">{markedCount}</p>
        <p className="text-[11px] font-medium text-gold-700/80">Marked</p>
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
        <div className="sticky top-20 rounded-xl2 border border-ink-200 bg-white p-4 shadow-card">
          <h2 className="mb-3 text-sm font-bold text-ink-900">Question Palette</h2>
          <PaletteSummary questions={questions} answers={answers} marked={marked} />
          <div className="my-4 max-h-[46vh] overflow-y-auto pr-1">
            <Grid
              questions={questions}
              answers={answers}
              marked={marked}
              currentIndex={currentIndex}
              onJump={onJump}
            />
          </div>
          <PaletteLegend />
          <button
            type="button"
            onClick={onSubmit}
            className="mt-4 w-full rounded-lg bg-ink-900 py-2.5 text-sm font-semibold text-white transition hover:bg-ink-800"
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
            className="absolute inset-0 bg-ink-950/40 animate-fade-in"
            onClick={onClose}
          />
          <div className="animate-rise-in absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto rounded-t-2xl bg-white p-4 shadow-pop">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-base font-bold text-ink-900">Question Palette</h2>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="rounded-full p-1.5 text-ink-500 hover:bg-ink-100"
              >
                <X size={20} />
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
            <PaletteLegend />
            <button
              type="button"
              onClick={onSubmit}
              className="mt-4 w-full rounded-lg bg-ink-900 py-3 text-sm font-semibold text-white transition hover:bg-ink-800"
            >
              Submit Test
            </button>
          </div>
        </div>
      )}
    </>
  );
}
