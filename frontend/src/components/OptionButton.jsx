import React from 'react';
import MathRenderer from './MathRenderer.jsx';

export default function OptionButton({ letter, text, selected, onSelect, disabled }) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      disabled={disabled}
      onClick={() => onSelect(letter)}
      className={`group flex w-full items-start gap-3.5 rounded-2xl border-2 p-4 text-left text-sm leading-relaxed transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 sm:text-base ${
        selected
          ? 'border-blue-500 bg-gradient-to-r from-blue-950/70 to-[#0B1528] text-white shadow-lg shadow-blue-500/15 ring-1 ring-blue-500 scale-[1.005]'
          : 'border-white/10 bg-[#070A12] text-slate-200 hover:border-blue-500/40 hover:bg-[#0D121F]'
      } ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer active:scale-[0.995]'}`}
    >
      <span
        className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-xl font-mono text-xs font-black transition-all ${
          selected
            ? 'bg-blue-600 text-white shadow-glow'
            : 'border border-white/10 bg-white/5 text-slate-400 group-hover:border-blue-400 group-hover:text-blue-300'
        }`}
      >
        {letter}
      </span>
      <span className="flex-1 font-medium tracking-tight text-slate-100">
        <MathRenderer text={text} inline />
      </span>
    </button>
  );
}
