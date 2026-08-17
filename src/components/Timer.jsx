import React, { useEffect, useRef, useState } from 'react';
import { Clock, AlertTriangle } from 'lucide-react';
import { formatClock } from '../utils/scoring.js';

/**
 * Timestamp-based countdown timer. Recomputes remaining time from endTime vs
 * Date.now() on every tick, so it stays accurate even if the tab was inactive.
 */
export default function Timer({ endTime, onExpire, compact = false }) {
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
    ? 'bg-bad-100 text-bad-700 border-bad-500/30'
    : isWarning
      ? 'bg-gold-100 text-gold-700 border-gold-500/40'
      : 'bg-ink-100 text-ink-800 border-ink-200';

  return (
    <div
      role="timer"
      aria-live="polite"
      aria-label={`Time remaining ${formatClock(remaining)}`}
      className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 font-mono font-semibold tabular-nums transition-colors ${colorClasses} ${
        compact ? 'text-sm' : 'text-base'
      } ${isCritical ? 'animate-pulse-soft' : ''}`}
    >
      {isCritical ? (
        <AlertTriangle size={compact ? 14 : 16} strokeWidth={2.5} />
      ) : (
        <Clock size={compact ? 14 : 16} strokeWidth={2.5} />
      )}
      <span>{formatClock(remaining)}</span>
    </div>
  );
}
