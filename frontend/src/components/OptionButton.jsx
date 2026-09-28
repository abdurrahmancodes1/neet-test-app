import React from 'react';

export default function OptionButton({ letter, text, selected, onSelect, disabled }) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      disabled={disabled}
      onClick={() => onSelect(letter)}
      className={`group flex w-full items-start gap-3.5 rounded-2xl border-2 p-4 text-left text-sm leading-relaxed transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-900 sm:text-base ${
        selected
          ? 'border-ink-900 bg-ink-900 text-white shadow-pop ring-2 ring-ink-900/10 scale-[1.005]'
          : 'border-ink-200/80 bg-white text-ink-900 hover:border-ink-400 hover:bg-ink-50/60 shadow-xs'
      } ${disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer active:scale-[0.995]'}`}
    >
      <span
        className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-xl font-mono text-xs font-black transition-all ${
          selected
            ? 'bg-gold-400 text-ink-950 shadow-xs'
            : 'border-2 border-ink-300 bg-ink-50 text-ink-700 group-hover:border-ink-500 group-hover:bg-white'
        }`}
      >
        {letter}
      </span>
      <span className="flex-1 font-medium whitespace-pre-line tracking-tight">{text}</span>
    </button>
  );
}
