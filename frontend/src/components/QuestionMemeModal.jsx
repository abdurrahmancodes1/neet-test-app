import React, { useEffect, useState } from 'react';
import {
  Sparkles,
  Flame,
  Zap,
  Award,
  ArrowRight,
  Brain,
  CheckCircle2,
  Smile,
  X,
} from 'lucide-react';

const HARD_MEMES = [
  {
    tag: 'GIGABRAIN MOMENT 🧠',
    teacher: 'Physics Guru',
    quote: 'Aare topper sahab! You tackled a Hard Level question without fear! Let\'s see if you cracked it in the final result dashboard! 💙',
    caption: 'Confidence +1000 · Newton is nodding with approval!',
    badge: '🔥 HARD LEVEL TACKLED',
    bgGradient: 'from-blue-600 via-indigo-700 to-slate-900',
  },
  {
    tag: 'TOPPER ENERGY ⚡',
    teacher: 'Sharma Ji Ka Beta Alert',
    quote: 'Sharma ji ke bete ki heartbeat tez ho chuki hai! You took on this beast question like a future AIIMS topper! 🩺',
    caption: 'Result preview: Will it be +4 or -1? Time will tell!',
    badge: '🏆 BRAIN OVER 9000',
    bgGradient: 'from-indigo-600 via-blue-700 to-sky-950',
  },
  {
    tag: 'NEWTON APPROVED 🍎',
    teacher: 'Sir Isaac Newton',
    quote: 'I dropped an apple, but you just dropped a masterclass on Work, Energy and Power! Result verification awaited! 🍏',
    caption: 'Kinetic energy conserved · Brain power maximized!',
    badge: '🚀 FUTURE DOCTOR',
    bgGradient: 'from-blue-700 via-cyan-800 to-ink-950',
  },
  {
    tag: 'CHAD STUDENT MOVE 💪',
    teacher: 'Exam Proctor',
    quote: 'Difficulty: MAXIMUM. Fear: ZERO. Option locked in style! Let\'s see that +4 marks shining in the result summary! ✨',
    caption: 'One giant leap towards your NEET dream!',
    badge: '🎯 FEARLESS ATTEMPT',
    bgGradient: 'from-blue-900 via-indigo-800 to-blue-950',
  },
];

const STANDARD_MEMES = [
  {
    teacher: 'Physics Mentor',
    quote: 'Option locked! 🎯 Speed and precision on point — onto the next conquest! 🚀',
    badge: 'Speed Demon ⚡',
  },
  {
    teacher: 'Classroom Vibe',
    quote: 'Dekh rahe ho Vinod, banda full confidence me bina dare solve kar raha hai! 😄💙',
    badge: 'Locked & Loaded 🔒',
  },
  {
    teacher: 'Study Mode',
    quote: 'Brain neurons firing at supersonic speed! Keep this winning momentum! 🧠',
    badge: 'Focus 100% 🎯',
  },
  {
    teacher: 'NEET Aspirant Club',
    quote: 'Another question in the bag! One step closer to the MBBS white coat! 🩺💙',
    badge: 'Future Doctor 💉',
  },
];

export default function QuestionMemeModal({
  open,
  questionNumber,
  selectedOption,
  isHard = false,
  onClose,
}) {
  const [memeIndex, setMemeIndex] = useState(0);

  useEffect(() => {
    if (open) {
      if (isHard) {
        setMemeIndex(Math.floor(Math.random() * HARD_MEMES.length));
      } else {
        setMemeIndex(Math.floor(Math.random() * STANDARD_MEMES.length));
      }
    }
  }, [open, isHard, questionNumber]);

  // Auto-dismiss standard meme after 2.5s, hard meme after 4s (or on user click)
  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(() => {
      onClose();
    }, isHard ? 4200 : 2500);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, isHard, onClose]);

  if (!open) return null;

  // 1. HARD QUESTION: FULL SCREEN CELEBRATION
  if (isHard) {
    const meme = HARD_MEMES[memeIndex] || HARD_MEMES[0];
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-hidden">
        {/* Animated Backdrop with Blue Glow */}
        <div
          onClick={onClose}
          className="absolute inset-0 bg-ink-950/85 backdrop-blur-md animate-fade-in cursor-pointer"
        />

        {/* Floating Sparkles & Confetti Background Elements */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-10 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl animate-pulse" />
        </div>

        {/* Big Celebration Card */}
        <div className="animate-rise-in relative w-full max-w-xl overflow-hidden rounded-3xl border-2 border-blue-400/50 bg-gradient-to-b from-ink-900 via-blue-950 to-ink-950 p-6 sm:p-8 text-white shadow-pop">
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close celebration"
            className="absolute top-4 right-4 rounded-full p-2 text-blue-200 hover:bg-white/10 hover:text-white transition"
          >
            <X size={20} />
          </button>

          {/* Top Badge */}
          <div className="text-center">
            <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-500 to-indigo-500 shadow-pop ring-4 ring-blue-400/30">
              <Flame size={34} className="text-amber-300 animate-bounce" />
            </div>
            <span className="inline-block rounded-full bg-gradient-to-r from-amber-400 to-orange-400 px-4 py-1 text-xs font-black uppercase tracking-[0.2em] text-ink-950 shadow-xs">
              {meme.tag}
            </span>
            <h2 className="mt-3 font-serif text-2xl font-black tracking-tight text-white sm:text-3xl">
              You Tackled a Hard One! 🔥
            </h2>
            <p className="mt-1 text-xs font-semibold text-blue-200">
              Question #{questionNumber} · Option <strong className="text-amber-300 font-mono text-sm">{selectedOption}</strong> Selected
            </p>
          </div>

          {/* Teacher Meme Box */}
          <div className="mt-6 rounded-2xl border border-blue-400/30 bg-white/10 p-5 backdrop-blur-xs">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-300 mb-2">
              <Sparkles size={16} />
              <span>{meme.teacher} Reaction:</span>
            </div>
            <blockquote className="font-serif text-base font-medium italic text-blue-50 sm:text-lg leading-relaxed">
              "{meme.quote}"
            </blockquote>
            <p className="mt-3 text-xs font-medium text-blue-300">
              {meme.caption}
            </p>
          </div>

          {/* Result Teaser Banner */}
          <div className="mt-5 flex items-center justify-between rounded-xl bg-blue-500/20 px-4 py-2.5 text-xs font-semibold text-blue-100 border border-blue-400/20">
            <span className="flex items-center gap-1.5">
              <Brain size={15} className="text-amber-300" />
              Let's see if it's correct or wrong in result!
            </span>
            <span className="font-mono text-amber-300 font-bold">+4 / -1 Scheme</span>
          </div>

          {/* Action Button & Timer Bar */}
          <div className="mt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 py-4 text-sm font-bold text-white shadow-pop transition hover:from-blue-600 hover:to-indigo-700 active:scale-[0.99]"
            >
              Continue to Next Question <ArrowRight size={16} />
            </button>
            <p className="mt-2 text-center text-[11px] text-blue-300/70">
              Auto-advancing in 4s · Press Space or Enter to continue
            </p>
          </div>
        </div>
      </div>
    );
  }

  // 2. STANDARD / MEDIUM QUESTION: SNAPPY FLOATING CELEBRATION TOAST
  const meme = STANDARD_MEMES[memeIndex] || STANDARD_MEMES[0];
  return (
    <div className="fixed bottom-20 right-4 z-50 max-w-sm animate-rise-in sm:bottom-24 sm:right-8">
      <div
        onClick={onClose}
        className="cursor-pointer overflow-hidden rounded-2xl border-2 border-blue-400/60 bg-ink-900 p-4 text-white shadow-pop ring-4 ring-blue-500/20 transition hover:scale-[1.02]"
      >
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 font-bold text-white shadow-xs">
            <Zap size={20} className="text-amber-300" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-1">
              <span className="rounded-md bg-blue-500/30 px-2 py-0.5 text-[10px] font-black text-amber-300">
                Q{questionNumber} · OPTION {selectedOption}
              </span>
              <span className="text-[10px] text-blue-300 font-bold">{meme.badge}</span>
            </div>
            <p className="mt-1 text-xs font-medium leading-snug text-blue-100">
              {meme.quote}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
