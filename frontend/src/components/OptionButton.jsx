import React from 'react';
import MathRenderer from './MathRenderer.jsx';
import { useTheme } from '../utils/themeContext.jsx';

export default function OptionButton({ letter, text, selected, onSelect, disabled }) {
  const { isLight } = useTheme();

  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      disabled={disabled}
      onClick={() => onSelect(letter)}
      className={`group flex w-full items-start gap-3.5 rounded-2xl border-2 p-4 text-left text-sm leading-relaxed transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 sm:text-base ${
        selected
          ? isLight
            ? 'border-blue-600 bg-blue-50/90 text-blue-950 shadow-md ring-2 ring-blue-500 scale-[1.005]'
            : 'border-blue-500 bg-gradient-to-r from-blue-950/70 to-[#0B1528] text-white shadow-lg shadow-blue-500/15 ring-1 ring-blue-500 scale-[1.005]'
          : isLight
            ? 'border-slate-200 bg-white text-slate-800 hover:border-blue-300 hover:bg-slate-50/80 shadow-xs'
            : 'border-white/10 bg-[#070A12] text-slate-200 hover:border-blue-500/40 hover:bg-[#0D121F]'
      } ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer active:scale-[0.995]'}`}
    >
      <span
        className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-xl font-mono text-xs font-black transition-all ${
          selected
            ? 'bg-blue-600 text-white shadow-glow'
            : isLight
              ? 'border border-slate-300 bg-slate-100 text-slate-700 group-hover:border-blue-500 group-hover:text-blue-700'
              : 'border border-white/10 bg-white/5 text-slate-400 group-hover:border-blue-400 group-hover:text-blue-300'
        }`}
      >
        {letter}
      </span>
      <span
        className={`flex-1 font-medium tracking-tight ${
          isLight
            ? selected
              ? 'text-blue-950 font-semibold'
              : 'text-slate-800'
            : selected
              ? 'text-white'
              : 'text-slate-100'
        }`}
      >
        <MathRenderer text={text} inline />
      </span>
    </button>
  );
}
