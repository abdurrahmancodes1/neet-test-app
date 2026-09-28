import React from 'react';
import { ChevronLeft, ChevronRight, Send } from 'lucide-react';

export default function TestNavigation({ onPrev, onNext, onSubmit, isFirst, isLast }) {
  return (
    <div className="sticky bottom-0 z-20 border-t border-white/10 bg-[#0D121F]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-2 px-4 py-3">
        <button
          type="button"
          onClick={onPrev}
          disabled={isFirst}
          className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-[#070A12] px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-semibold text-slate-300 transition hover:border-white/20 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ChevronLeft size={16} />
          <span>Previous</span>
        </button>

        <button
          type="button"
          onClick={onSubmit}
          className="inline-flex items-center gap-1.5 rounded-full bg-rose-600 hover:bg-rose-500 px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-lg shadow-rose-600/20 transition active:scale-95"
        >
          <Send size={13} />
          Submit
        </button>

        {isLast ? (
          <button
            type="button"
            onClick={onSubmit}
            className="inline-flex items-center gap-1 rounded-full bg-blue-600 hover:bg-blue-500 px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-lg shadow-blue-600/25 transition active:scale-95"
          >
            Finish
            <ChevronRight size={16} />
          </button>
        ) : (
          <button
            type="button"
            onClick={onNext}
            className="inline-flex items-center gap-1 rounded-full bg-blue-600 hover:bg-blue-500 px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-lg shadow-blue-600/25 transition active:scale-95"
          >
            <span>Next</span>
            <ChevronRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
