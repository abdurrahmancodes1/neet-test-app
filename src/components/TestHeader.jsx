import React from 'react';
import { FlaskConical } from 'lucide-react';
import Timer from './Timer.jsx';

export default function TestHeader({ endTime, onExpire, currentIndex, total, onOpenPalette }) {
  return (
    <header className="sticky top-0 z-30 border-b border-ink-200 bg-ink-50/95 backdrop-blur supports-[backdrop-filter]:bg-ink-50/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <div className="flex items-center gap-2 min-w-0">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-ink-900 text-gold-300">
            <FlaskConical size={16} strokeWidth={2.25} />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-ink-900 sm:text-base">
              Chemical Bonding <span className="hidden sm:inline">Mock Test</span>
            </p>
            <p className="text-xs text-ink-500 sm:hidden">Q {currentIndex + 1} / {total}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <button
            type="button"
            onClick={onOpenPalette}
            className="hidden rounded-full border border-ink-200 bg-white px-3 py-1.5 text-sm font-medium text-ink-700 shadow-sm transition hover:border-ink-300 hover:bg-ink-100 sm:inline-flex"
          >
            Q {currentIndex + 1} / {total}
          </button>
          <Timer endTime={endTime} onExpire={onExpire} />
          <button
            type="button"
            onClick={onOpenPalette}
            aria-label="Open question palette"
            className="inline-flex items-center justify-center rounded-full border border-ink-200 bg-white px-3 py-1.5 text-xs font-semibold text-ink-700 shadow-sm transition hover:bg-ink-100 sm:hidden"
          >
            Palette
          </button>
        </div>
      </div>
    </header>
  );
}
