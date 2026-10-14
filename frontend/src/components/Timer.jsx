import React, { useEffect, useRef, useState } from 'react';
import { Clock, AlertTriangle } from 'lucide-react';
import { formatClock } from '../utils/scoring.js';
import { useTheme } from '../utils/themeContext.jsx';

export default function Timer({ endTime, onExpire, compact = false }) {
  const { isLight } = useTheme();
  const [remaining, setRemaining] = useState(() => Math.max(0, endTime - Date.now()));
  const expiredRef = useRef(false);

  useEffect(() => {
    expiredRef.current = false;
    const tick = () => {
      const rem = Math.max(0, endTime - Date.now());
      setRemaining(rem);
      if (rem <= 0 && !expiredRef.current) {
        expiredRef.current = true;
        onExpire?.();
      }
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [endTime, onExpire]);

  const minutesLeft = remaining / 60000;
  const isCritical = minutesLeft <= 5;
  const isWarning = minutesLeft <= 10 && !isCritical;

  const colorClasses = isCritical
    ? isLight
      ? 'bg-rose-50 text-rose-800 border-rose-300 shadow-rose-500/10'
      : 'bg-rose-500/20 text-rose-300 border-rose-500/40 shadow-rose-500/10'
    : isWarning
      ? isLight
        ? 'bg-amber-50 text-amber-900 border-amber-300'
        : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
      : isLight
        ? 'bg-slate-100 text-slate-800 border-slate-200'
        : 'bg-[#070A12] text-slate-200 border-white/10';

  return (
    <div
      role="timer"
      aria-live="polite"
      aria-label={`Time remaining ${formatClock(remaining)}`}
      className={`flex items-center gap-1.5 rounded-full border px-3 sm:px-3.5 py-1.5 font-mono font-bold tabular-nums shadow-xs transition-colors ${colorClasses} ${
        compact ? 'text-xs' : 'text-xs sm:text-sm'
      } ${isCritical ? 'animate-pulse-soft' : ''}`}
    >
      {isCritical ? (
        <AlertTriangle
          size={compact ? 13 : 15}
          className={isLight ? 'text-rose-600' : 'text-rose-400'}
          strokeWidth={2.5}
        />
      ) : (
        <Clock
          size={compact ? 13 : 15}
          className={isLight ? 'text-blue-600' : 'text-blue-400'}
          strokeWidth={2.5}
        />
      )}
      <span>{formatClock(remaining)}</span>
    </div>
  );
}
