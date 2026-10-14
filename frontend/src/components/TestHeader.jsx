import React from 'react';
import { Zap, Layers } from 'lucide-react';
import Timer from './Timer.jsx';
import { useTheme } from '../utils/themeContext.jsx';

export default function TestHeader({
  title = 'NEET Mock Test',
  endTime,
  onExpire,
  currentIndex,
  total,
  onOpenPalette,
}) {
  const { isLight } = useTheme();

  return (
    <header
      className={`sticky top-0 z-30 border-b backdrop-blur-md transition-colors ${
        isLight
          ? 'border-slate-200 bg-white/95 text-slate-900 shadow-xs'
          : 'border-white/10 bg-[#0D121F]/95 text-white'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        {/* Brand / Test Title */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 text-white font-black text-xs shadow-glow">
            <Zap size={14} className="fill-white text-white" />
          </div>
          <div className="min-w-0">
            <p
              className={`truncate text-xs sm:text-sm font-bold tracking-tight ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}
            >
              {title}
            </p>
            <p
              className={`text-[11px] sm:hidden ${
                isLight ? 'text-slate-500' : 'text-slate-400'
              }`}
            >
              Question {currentIndex + 1} of {total}
            </p>
          </div>
        </div>

        {/* Right Action Chips & Timer */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={onOpenPalette}
            className={`hidden rounded-full border px-3.5 py-1.5 text-xs font-bold transition sm:inline-flex items-center gap-1.5 ${
              isLight
                ? 'border-slate-200 bg-slate-100 text-slate-700 hover:border-blue-400 hover:text-blue-600'
                : 'border-white/10 bg-[#070A12] text-slate-300 hover:border-blue-500 hover:text-white'
            }`}
          >
            <Layers size={13} className={isLight ? 'text-blue-600' : 'text-blue-400'} />
            <span>
              Q {currentIndex + 1} / {total}
            </span>
          </button>

          <Timer endTime={endTime} onExpire={onExpire} />

          <button
            type="button"
            onClick={onOpenPalette}
            aria-label="Open question palette"
            className={`inline-flex items-center justify-center rounded-full border px-3 py-1.5 text-xs font-semibold transition sm:hidden ${
              isLight
                ? 'border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200'
                : 'border-white/10 bg-white/5 text-slate-200 hover:bg-white/10'
            }`}
          >
            Palette
          </button>
        </div>
      </div>
    </header>
  );
}
