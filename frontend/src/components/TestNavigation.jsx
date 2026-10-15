import React from 'react';
import { ChevronLeft, ChevronRight, Send, Bookmark, BookmarkCheck, RotateCcw } from 'lucide-react';
import { useTheme } from '../utils/themeContext.jsx';

export default function TestNavigation({
  onPrev,
  onNext,
  onSubmit,
  isFirst,
  isLast,
  marked = false,
  onToggleMark,
  hasAnswer = false,
  onClearAnswer,
}) {
  const { isLight } = useTheme();

  return (
    <div
      className={`sticky bottom-0 z-20 border-t backdrop-blur-md transition-colors ${
        isLight ? 'border-slate-200 bg-white/95 shadow-xs' : 'border-white/10 bg-[#0D121F]/90'
      }`}
    >
      <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-2.5 px-4 py-3">
        {/* Left: Previous */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onPrev}
            disabled={isFirst}
            className={`inline-flex items-center gap-1 rounded-full border px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold transition disabled:cursor-not-allowed ${
              isLight
                ? 'border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900 disabled:opacity-40'
                : 'border-white/10 bg-[#070A12] text-slate-300 hover:border-white/20 hover:text-white disabled:opacity-30'
            }`}
          >
            <ChevronLeft size={16} />
            <span>Previous</span>
          </button>
        </div>

        {/* Center: Mark & Clear Actions */}
        <div className="flex items-center gap-2">
          {onToggleMark && (
            <button
              type="button"
              onClick={onToggleMark}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 sm:px-4 py-2 text-xs font-semibold transition ${
                marked
                  ? isLight
                    ? 'border-amber-300 bg-amber-50 text-amber-900 shadow-xs'
                    : 'border-amber-500/40 bg-amber-500/20 text-amber-300 shadow-xs'
                  : isLight
                  ? 'border-slate-200 bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                  : 'border-white/10 bg-white/5 text-slate-400 hover:border-white/20 hover:text-white'
              }`}
            >
              {marked ? <BookmarkCheck size={14} className="text-amber-500" /> : <Bookmark size={14} />}
              <span>{marked ? 'Marked' : 'Mark for Review'}</span>
            </button>
          )}

          {hasAnswer && onClearAnswer && (
            <button
              type="button"
              onClick={onClearAnswer}
              className={`inline-flex items-center gap-1 rounded-full border px-3 py-2 text-xs font-semibold transition ${
                isLight
                  ? 'border-slate-200 bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  : 'border-white/10 bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              <RotateCcw size={13} />
              <span className="hidden sm:inline">Clear Response</span>
            </button>
          )}
        </div>

        {/* Right: Next & Submit */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onSubmit}
            className="inline-flex items-center gap-1.5 rounded-full bg-rose-600 hover:bg-rose-500 px-4 sm:px-5 py-2 text-xs sm:text-sm font-bold text-white shadow-lg shadow-rose-600/20 transition active:scale-95"
          >
            <Send size={13} />
            <span>Submit</span>
          </button>

          {isLast ? (
            <button
              type="button"
              onClick={onSubmit}
              className="inline-flex items-center gap-1 rounded-full bg-blue-600 hover:bg-blue-500 px-4 sm:px-5 py-2 text-xs sm:text-sm font-bold text-white shadow-lg shadow-blue-600/25 transition active:scale-95"
            >
              <span>Finish</span>
              <ChevronRight size={16} />
            </button>
          ) : (
            <button
              type="button"
              onClick={onNext}
              className="inline-flex items-center gap-1 rounded-full bg-blue-600 hover:bg-blue-500 px-4 sm:px-5 py-2 text-xs sm:text-sm font-bold text-white shadow-lg shadow-blue-600/25 transition active:scale-95"
            >
              <span>Next</span>
              <ChevronRight size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

