import React, { useEffect, useCallback } from 'react';
import { Delete, RotateCcw, Hash, HelpCircle } from 'lucide-react';
import { useTheme } from '../utils/themeContext.jsx';

export default function NumericalInputPad({
  value = '',
  onChange,
  onClear,
  disabled = false,
}) {
  const { isLight } = useTheme();

  const handleKeyPress = useCallback(
    (key) => {
      if (disabled) return;
      let current = String(value || '');

      if (key === 'BACKSPACE') {
        const next = current.slice(0, -1);
        onChange(next);
        return;
      }

      if (key === 'CLEAR') {
        onClear?.();
        return;
      }

      if (key === '-') {
        // Toggle negative sign at the beginning
        if (current.startsWith('-')) {
          onChange(current.slice(1));
        } else {
          onChange('-' + current);
        }
        return;
      }

      if (key === '.') {
        // Only allow one decimal point
        if (!current.includes('.')) {
          onChange(current ? current + '.' : '0.');
        }
        return;
      }

      // Digits 0-9
      if (/^[0-9]$/.test(key)) {
        if (current.length < 12) {
          onChange(current + key);
        }
      }
    },
    [value, onChange, onClear, disabled]
  );

  // Listen for physical keyboard input
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (disabled) return;
      // Do not intercept if user is typing in an active text input or textarea elsewhere
      const tag = document.activeElement?.tagName?.toLowerCase();
      if (tag === 'input' && document.activeElement?.dataset?.numericalInput !== 'true') return;
      if (tag === 'textarea') return;

      if (/^[0-9]$/.test(e.key)) {
        e.preventDefault();
        handleKeyPress(e.key);
      } else if (e.key === '.') {
        e.preventDefault();
        handleKeyPress('.');
      } else if (e.key === '-' || e.key === 'Subtract') {
        e.preventDefault();
        handleKeyPress('-');
      } else if (e.key === 'Backspace') {
        e.preventDefault();
        handleKeyPress('BACKSPACE');
      } else if (e.key === 'Escape' || e.key === 'Delete') {
        e.preventDefault();
        handleKeyPress('CLEAR');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyPress, disabled]);

  const KEYPAD_ROWS = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['.', '0', '-'],
  ];

  return (
    <div
      className={`rounded-2xl border p-5 sm:p-7 space-y-4 max-w-md mx-auto transition-colors shadow-lg ${
        isLight
          ? 'border-blue-200 bg-gradient-to-b from-blue-50/40 via-white to-slate-50 text-slate-800 ring-1 ring-blue-100'
          : 'border-blue-900/40 bg-gradient-to-b from-[#080D1A] to-[#040711] text-slate-100'
      }`}
    >
      {/* Header Info */}
      <div className="flex items-center justify-between border-b pb-3 border-blue-900/20 dark:border-blue-900/40">
        <div className="flex items-center gap-2">
          <div
            className={`flex h-7 w-7 items-center justify-center rounded-lg border ${
              isLight
                ? 'border-blue-300 bg-blue-100 text-blue-700'
                : 'border-blue-500/40 bg-blue-600/20 text-blue-300'
            }`}
          >
            <Hash size={15} />
          </div>
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              JEE Section B · Numerical Value Input
            </h2>
            <p className="text-[10px] text-slate-400">
              Enter integer or decimal value (e.g. 10, -4, 2.5)
            </p>
          </div>
        </div>
        <span
          className={`rounded-full px-2 py-0.5 text-[10px] font-mono font-bold border ${
            value
              ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400'
              : 'border-slate-300 dark:border-white/10 bg-slate-100 dark:bg-white/5 text-slate-400'
          }`}
        >
          {value ? 'ANSWER RECORDED' : 'AWAITING INPUT'}
        </span>
      </div>

      {/* Numerical Display Box */}
      <div className="space-y-1.5">
        <label
          htmlFor="jee-numerical-input"
          className="block text-[11px] font-mono uppercase tracking-wider text-slate-400"
        >
          Your Numerical Response:
        </label>
        <div
          className={`flex items-center justify-between rounded-xl border px-4 py-3 font-mono text-xl sm:text-2xl font-bold transition shadow-inner ${
            isLight
              ? 'border-blue-300 bg-white text-slate-900 ring-2 ring-blue-500/10'
              : 'border-blue-500/40 bg-[#060913] text-white ring-2 ring-blue-500/20'
          }`}
        >
          <input
            id="jee-numerical-input"
            data-numerical-input="true"
            type="text"
            inputMode="decimal"
            value={value}
            onChange={(e) => {
              const val = e.target.value.trim();
              if (/^-?[0-9]*\.?[0-9]*$/.test(val)) {
                onChange(val);
              }
            }}
            placeholder="Enter value..."
            disabled={disabled}
            className="w-full bg-transparent font-mono text-xl sm:text-2xl font-bold tracking-wider outline-none placeholder:text-slate-400/50"
          />
          {value && (
            <button
              type="button"
              onClick={() => handleKeyPress('BACKSPACE')}
              aria-label="Backspace"
              className={`ml-2 rounded-lg p-1.5 transition ${
                isLight
                  ? 'text-slate-400 hover:bg-slate-100 hover:text-slate-700'
                  : 'text-slate-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Delete size={18} />
            </button>
          )}
        </div>
      </div>

      {/* On-Screen Numerical Virtual Keypad (JEE NTA Standard) */}
      <div className="space-y-2 pt-1">
        {KEYPAD_ROWS.map((row, rIdx) => (
          <div key={rIdx} className="grid grid-cols-3 gap-2">
            {row.map((btn) => (
              <button
                key={btn}
                type="button"
                disabled={disabled}
                onClick={() => handleKeyPress(btn)}
                className={`flex h-11 items-center justify-center rounded-xl border font-mono text-base font-bold transition active:scale-95 ${
                  isLight
                    ? 'border-slate-200 bg-white text-slate-800 shadow-xs hover:border-blue-400 hover:bg-blue-50'
                    : 'border-white/10 bg-[#0B1020] text-slate-200 shadow-xs hover:border-blue-500/50 hover:bg-blue-900/30 hover:text-white'
                }`}
              >
                {btn === '-' ? '− (Minus)' : btn}
              </button>
            ))}
          </div>
        ))}

        {/* Action Row: Backspace & Clear */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            type="button"
            disabled={disabled || !value}
            onClick={() => handleKeyPress('BACKSPACE')}
            className={`flex h-11 items-center justify-center gap-1.5 rounded-xl border font-mono text-xs font-bold transition active:scale-95 ${
              isLight
                ? 'border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200 disabled:opacity-40'
                : 'border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 disabled:opacity-40'
            }`}
          >
            <Delete size={15} /> Backspace
          </button>
          <button
            type="button"
            disabled={disabled || !value}
            onClick={() => handleKeyPress('CLEAR')}
            className={`flex h-11 items-center justify-center gap-1.5 rounded-xl border font-mono text-xs font-bold transition active:scale-95 ${
              isLight
                ? 'border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100 disabled:opacity-40'
                : 'border-rose-500/30 bg-rose-950/20 text-rose-300 hover:bg-rose-900/30 disabled:opacity-40'
            }`}
          >
            <RotateCcw size={14} /> Clear Response
          </button>
        </div>
      </div>

      {/* Educational Guidelines */}
      <div
        className={`flex items-start gap-2 rounded-xl border p-2.5 text-[11px] leading-relaxed ${
          isLight
            ? 'border-blue-100 bg-blue-50/70 text-slate-600'
            : 'border-blue-900/30 bg-blue-950/20 text-slate-400'
        }`}
      >
        <HelpCircle size={14} className="mt-0.5 shrink-0 text-blue-500" />
        <p>
          You can use the on-screen buttons or your physical keyboard. Enter the integer
          or decimal value as requested by the question.
        </p>
      </div>
    </div>
  );
}
