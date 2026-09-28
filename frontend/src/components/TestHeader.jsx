import React from 'react';
import { Zap, Layers } from 'lucide-react';
import Timer from './Timer.jsx';

export default function TestHeader({
  title = 'NEET Mock Test',
  endTime,
  onExpire,
  currentIndex,
  total,
  onOpenPalette,
}) {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-[#0D121F]/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        {/* Brand / Test Title */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 text-white font-black text-xs shadow-glow">
            <Zap size={14} className="fill-white text-white" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-xs sm:text-sm font-bold text-white tracking-tight">
              {title}
            </p>
            <p className="text-[11px] text-slate-400 sm:hidden">
              Question {currentIndex + 1} of {total}
            </p>
          </div>
        </div>

        {/* Right Action Chips & Timer */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={onOpenPalette}
            className="hidden rounded-full border border-white/10 bg-[#070A12] px-3.5 py-1.5 text-xs font-bold text-slate-300 transition hover:border-blue-500 hover:text-white sm:inline-flex items-center gap-1.5"
          >
            <Layers size={13} className="text-blue-400" />
            <span>Q {currentIndex + 1} / {total}</span>
          </button>

          <Timer endTime={endTime} onExpire={onExpire} />

          <button
            type="button"
            onClick={onOpenPalette}
            aria-label="Open question palette"
            className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-slate-200 transition hover:bg-white/10 sm:hidden"
          >
            Palette
          </button>
        </div>
      </div>
    </header>
  );
}
