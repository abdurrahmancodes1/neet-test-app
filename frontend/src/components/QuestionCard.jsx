import React from 'react';
import { Bookmark, BookmarkCheck, RotateCcw, ImageIcon } from 'lucide-react';
import OptionButton from './OptionButton.jsx';
import MathRenderer from './MathRenderer.jsx';
import { useTheme } from '../utils/themeContext.jsx';

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
  const { isLight } = useTheme();
  const qText = question.question || question.text || '';
  const qTopic = question.topic || 'Work, Energy and Power';
  const qDifficulty = question.difficulty || 'Medium';

  return (
    <div
      className={`animate-fade-in rounded-3xl border p-5 sm:p-8 relative overflow-hidden transition-colors ${
        isLight
          ? 'border-slate-200 bg-white text-slate-900 shadow-xl ring-1 ring-blue-100'
          : 'border-white/10 bg-[#0B0F19] text-slate-100 shadow-2xl'
      }`}
    >
      {/* Top subtle ambient glow */}
      <div
        className={`pointer-events-none absolute -top-10 right-0 w-64 h-32 rounded-full blur-3xl ${
          isLight ? 'bg-blue-500/5' : 'bg-blue-600/10'
        }`}
      />

      {/* Question Header Bar */}
      <div
        className={`mb-6 flex flex-wrap items-center justify-between gap-3 border-b pb-4 ${
          isLight ? 'border-slate-200' : 'border-white/10'
        }`}
      >
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`rounded-full border px-3 py-1 font-mono text-xs font-bold shadow-xs ${
              isLight
                ? 'bg-blue-50 border-blue-200 text-blue-700'
                : 'bg-blue-600/20 border-blue-500/30 text-blue-300'
            }`}
          >
            Question {index + 1}
          </span>
          <span
            className={`text-xs font-semibold uppercase tracking-wider ${
              isLight ? 'text-slate-500' : 'text-slate-500'
            }`}
          >
            of {total}
          </span>
          <span
            className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
              isLight
                ? 'border-slate-200 bg-slate-100 text-slate-700'
                : 'border-white/10 bg-white/5 text-slate-300'
            }`}
          >
            {question.subject || 'Physics'}
          </span>
          <span
            className={`hidden sm:inline-block rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
              isLight
                ? 'border-slate-200 bg-slate-100 text-slate-600'
                : 'border-white/10 bg-white/5 text-slate-400'
            }`}
          >
            {qTopic}
          </span>
          <span
            className={`rounded-full px-2.5 py-0.5 text-[10px] font-extrabold uppercase border ${
              qDifficulty === 'Hard'
                ? isLight
                  ? 'bg-rose-50 text-rose-800 border-rose-200'
                  : 'bg-rose-500/15 text-rose-300 border-rose-500/30'
                : isLight
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  : 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
            }`}
          >
            {qDifficulty}
          </span>
        </div>

        <button
          type="button"
          onClick={onToggleMark}
          className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-bold transition ${
            marked
              ? isLight
                ? 'border-amber-300 bg-amber-50 text-amber-900 shadow-xs'
                : 'border-amber-500/40 bg-amber-500/20 text-amber-300 shadow-xs'
              : isLight
                ? 'border-slate-200 bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                : 'border-white/10 bg-white/5 text-slate-400 hover:border-white/20 hover:text-white'
          }`}
        >
          {marked ? <BookmarkCheck size={14} /> : <Bookmark size={14} />}
          {marked ? 'Marked for Review' : 'Mark for Review'}
        </button>
      </div>

      {/* Question Text */}
      <div
        className={`mb-6 text-base font-medium leading-relaxed sm:text-lg ${
          isLight ? 'text-slate-900' : 'text-slate-100'
        }`}
      >
        <MathRenderer text={qText} />
      </div>

      {/* Question Diagram / Image */}
      {question.image && (
        <div className="my-6 flex flex-col items-center">
          <div
            className={`relative w-full max-w-lg overflow-hidden rounded-2xl border p-4 shadow-xl ${
              isLight ? 'border-slate-200 bg-slate-50' : 'border-white/10 bg-[#070A12]'
            }`}
          >
            <div
              className={`mb-2.5 flex items-center gap-1.5 text-xs font-semibold ${
                isLight ? 'text-blue-700' : 'text-blue-400'
              }`}
            >
              <ImageIcon size={14} /> Reference Diagram
            </div>
            <img
              src={question.image}
              alt={`Diagram for Question ${index + 1}`}
              className="mx-auto max-h-72 w-auto object-contain rounded-lg bg-white p-2 border border-slate-200"
              loading="eager"
            />
          </div>
        </div>
      )}

      {/* Options Radio Group */}
      <div
        role="radiogroup"
        aria-label={`Options for question ${index + 1}`}
        className="space-y-3 pt-2"
      >
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
        <div
          className={`mt-6 flex justify-end border-t pt-4 ${
            isLight ? 'border-slate-200' : 'border-white/10'
          }`}
        >
          <button
            type="button"
            onClick={onClear}
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition ${
              isLight
                ? 'text-rose-600 hover:bg-rose-50'
                : 'text-rose-400 hover:bg-rose-500/10'
            }`}
          >
            <RotateCcw size={13} /> Clear Response
          </button>
        </div>
      )}
    </div>
  );
}
