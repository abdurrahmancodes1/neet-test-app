import React from 'react';
import { Bookmark, BookmarkCheck, RotateCcw, ImageIcon, Zap } from 'lucide-react';
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
  const qText = question.question || question.text || '';
  const qTopic = question.topic || 'Work, Energy and Power';
  const qDifficulty = question.difficulty || 'Medium';

  return (
    <div className="animate-fade-in rounded-2xl border border-ink-200 bg-white p-5 shadow-card sm:p-8">
      {/* Question Header Bar */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-ink-100 pb-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-xl bg-ink-900 px-3 py-1 font-mono text-xs font-black text-gold-300 shadow-xs">
            Question {index + 1}
          </span>
          <span className="text-xs font-semibold uppercase tracking-wider text-ink-400">
            of {total}
          </span>
          <span className="rounded-full bg-ink-100 px-2.5 py-0.5 text-xs font-bold text-ink-700">
            {question.subject || 'Physics'}
          </span>
          <span className="hidden sm:inline-block rounded-full bg-gold-100/70 px-2.5 py-0.5 text-xs font-bold text-gold-800">
            {qTopic}
          </span>
          <span className={`rounded-full px-2 py-0.5 text-[10px] font-extrabold uppercase ${
            qDifficulty === 'Hard' ? 'bg-bad-100 text-bad-700' : 'bg-good-100 text-good-700'
          }`}>
            {qDifficulty}
          </span>
        </div>

        <button
          type="button"
          onClick={onToggleMark}
          className={`inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-1.5 text-xs font-bold transition ${
            marked
              ? 'border-gold-500 bg-gold-400 text-ink-950 shadow-xs'
              : 'border-ink-200 text-ink-600 hover:border-ink-400 hover:bg-ink-50'
          }`}
        >
          {marked ? <BookmarkCheck size={15} /> : <Bookmark size={15} />}
          {marked ? 'Marked for Review' : 'Mark for Review'}
        </button>
      </div>

      {/* Question Text */}
      <p className="mb-6 whitespace-pre-line text-base font-semibold leading-relaxed text-ink-900 sm:text-lg">
        {qText}
      </p>

      {/* Question Diagram / Image */}
      {question.image && (
        <div className="my-6 flex flex-col items-center">
          <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border-2 border-ink-200/80 bg-ink-50/50 p-4 shadow-sm transition hover:border-ink-400">
            <div className="mb-2 flex items-center gap-1.5 text-xs font-bold text-ink-500">
              <ImageIcon size={14} className="text-gold-600" /> Reference Diagram
            </div>
            <img
              src={question.image}
              alt={`Diagram for Question ${index + 1}`}
              className="mx-auto max-h-72 w-auto object-contain rounded-lg"
              loading="eager"
            />
          </div>
        </div>
      )}

      {/* Options Radio Group */}
      <div role="radiogroup" aria-label={`Options for question ${index + 1}`} className="space-y-3 pt-2">
        {question.options &&
          Object.entries(question.options).map(([letter, text]) => (
            <OptionButton
              key={letter}
              letter={letter}
              text={text}
              selected={selected === letter}
              onSelect={onSelect}
            />
          ))}
      </div>

      {/* Footer Clear Response Button */}
      {selected && (
        <div className="mt-6 flex justify-end border-t border-ink-100 pt-4">
          <button
            type="button"
            onClick={onClear}
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold text-bad-600 transition hover:bg-bad-50"
          >
            <RotateCcw size={13} /> Clear Response
          </button>
        </div>
      )}
    </div>
  );
}
