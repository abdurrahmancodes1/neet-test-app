import React from 'react';
import { Bookmark, BookmarkCheck, RotateCcw } from 'lucide-react';
import OptionButton from './OptionButton.jsx';

export default function QuestionCard({
  question,
  index,
  total,
  selected,
  marked,
  onSelect,
  onToggleMark,
  onClear,
}) {
  return (
    <div className="animate-fade-in rounded-xl2 border border-ink-200 bg-white p-5 shadow-card sm:p-7">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="rounded-md bg-ink-900 px-2.5 py-1 font-mono text-xs font-bold text-gold-300">
            Q{index + 1}
          </span>
          <span className="text-xs font-medium uppercase tracking-wide text-ink-400">
            {index + 1} of {total}
          </span>
        </div>
        <button
          type="button"
          onClick={onToggleMark}
          className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
            marked
              ? 'border-gold-500 bg-gold-100 text-gold-700'
              : 'border-ink-200 text-ink-500 hover:border-ink-400 hover:text-ink-700'
          }`}
        >
          {marked ? <BookmarkCheck size={14} /> : <Bookmark size={14} />}
          {marked ? 'Marked' : 'Mark for review'}
        </button>
      </div>

      <p className="chem mb-6 whitespace-pre-line text-[15px] font-medium leading-relaxed text-ink-900 sm:text-lg">
        {question.question}
      </p>

      {question.image && (
        <img
          src={question.image}
          alt={`Source diagram for question ${index + 1}`}
          className="mb-6 max-h-[26rem] w-full rounded-lg border border-ink-200 bg-white object-contain p-2"
        />
      )}

      <div role="radiogroup" aria-label={`Options for question ${index + 1}`} className="flex flex-col gap-3">
        {Object.entries(question.options).map(([letter, text]) => (
          <OptionButton
            key={letter}
            letter={letter}
            text={text}
            selected={selected === letter}
            onSelect={onSelect}
          />
        ))}
      </div>

      {selected && (
        <button
          type="button"
          onClick={onClear}
          className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-ink-500 transition hover:text-bad-600"
        >
          <RotateCcw size={13} />
          Clear response
        </button>
      )}
    </div>
  );
}
