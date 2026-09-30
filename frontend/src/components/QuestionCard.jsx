import React from 'react';
import { Bookmark, BookmarkCheck, RotateCcw, ImageIcon, Zap } from 'lucide-react';
import OptionButton from './OptionButton.jsx';
import MathRenderer from './MathRenderer.jsx';

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
    <div className="animate-fade-in rounded-3xl border border-white/10 bg-[#0B0F19] p-5 sm:p-8 shadow-2xl relative overflow-hidden">
      {/* Top subtle ambient glow */}
      <div className="pointer-events-none absolute -top-10 right-0 w-64 h-32 bg-blue-600/10 rounded-full blur-3xl" />

      {/* Question Header Bar */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-blue-600/20 border border-blue-500/30 px-3 py-1 font-mono text-xs font-bold text-blue-300 shadow-xs">
            Question {index + 1}
          </span>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            of {total}
          </span>
          <span className="rounded-full bg-white/5 border border-white/10 px-2.5 py-0.5 text-xs font-semibold text-slate-300">
            {question.subject || 'Physics'}
          </span>
          <span className="hidden sm:inline-block rounded-full bg-white/5 border border-white/10 px-2.5 py-0.5 text-xs font-semibold text-slate-400">
            {qTopic}
          </span>
          <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-extrabold uppercase border ${
            qDifficulty === 'Hard'
              ? 'bg-rose-500/15 text-rose-300 border-rose-500/30'
              : 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
          }`}>
            {qDifficulty}
          </span>
        </div>

        <button
          type="button"
          onClick={onToggleMark}
          className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-bold transition ${
            marked
              ? 'border-amber-500/40 bg-amber-500/20 text-amber-300 shadow-xs'
              : 'border-white/10 bg-white/5 text-slate-400 hover:border-white/20 hover:text-white'
          }`}
        >
          {marked ? <BookmarkCheck size={14} /> : <Bookmark size={14} />}
          {marked ? 'Marked for Review' : 'Mark for Review'}
        </button>
      </div>

      {/* Question Text */}
      <div className="mb-6 text-base font-medium leading-relaxed text-slate-100 sm:text-lg">
        <MathRenderer text={qText} />
      </div>

      {/* Question Diagram / Image */}
      {question.image && (
        <div className="my-6 flex flex-col items-center">
          <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-[#070A12] p-4 shadow-xl">
            <div className="mb-2.5 flex items-center gap-1.5 text-xs font-semibold text-blue-400">
              <ImageIcon size={14} /> Reference Diagram
            </div>
            <img
              src={question.image}
              alt={`Diagram for Question ${index + 1}`}
              className="mx-auto max-h-72 w-auto object-contain rounded-lg bg-white p-2"
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
        <div className="mt-6 flex justify-end border-t border-white/10 pt-4">
          <button
            type="button"
            onClick={onClear}
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold text-rose-400 transition hover:bg-rose-500/10"
          >
            <RotateCcw size={13} /> Clear Response
          </button>
        </div>
      )}
    </div>
  );
}
