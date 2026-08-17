import React from 'react';

export default function OptionButton({ letter, text, selected, onSelect, disabled }) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      disabled={disabled}
      onClick={() => onSelect(letter)}
      className={`chem flex w-full items-start gap-3 rounded-xl border px-4 py-3.5 text-left text-[15px] leading-relaxed transition-all focus-visible:outline-2 focus-visible:outline-offset-2 sm:text-base ${
        selected
          ? 'border-ink-800 bg-ink-800 text-white shadow-card'
          : 'border-ink-200 bg-white text-ink-800 hover:border-ink-400 hover:bg-ink-100'
      } ${disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer active:scale-[0.99]'}`}
    >
      <span
        className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-bold ${
          selected ? 'border-gold-300 bg-gold-300 text-ink-900' : 'border-ink-300 text-ink-500'
        }`}
      >
        {letter}
      </span>
      <span className="whitespace-pre-line">{text}</span>
    </button>
  );
}
