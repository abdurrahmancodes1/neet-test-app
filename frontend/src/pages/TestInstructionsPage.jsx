import React, { useState } from 'react';
import {
  Clock,
  BookOpen,
  Award,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Zap,
  Sliders,
  AlertCircle,
  Timer,
  Sparkles,
} from 'lucide-react';
import { useTheme } from '../utils/themeContext.jsx';

export default function TestInstructionsPage({ test, onBack, onStart }) {
  // Global theme
  const { theme, isLight } = useTheme();

  const qCount = test?.totalQuestions || test?.questions?.length || 60;
  const defaultDuration = test?.durationMinutes || 120;
  const isCustomizable = Boolean(
    test?.allowCustomDuration === true ||
    test?.timeLimitMode === 'custom' ||
    test?.timeLimitMode === 'user'
  );
  const maxDuration =
    test?.maxCustomDurationMinutes || test?.maxDurationMinutes || 180; // strict maximum limit
  const minDuration =
    test?.minCustomDurationMinutes || test?.minDurationMinutes || 10;

  const [selectedDuration, setSelectedDuration] = useState(
    Math.min(maxDuration, Math.max(minDuration, defaultDuration))
  );
  const [durationInput, setDurationInput] = useState(
    String(Math.min(maxDuration, Math.max(minDuration, defaultDuration)))
  );

  const title = test?.title || 'NEET 2027 Practice Test';
  const badge = test?.subject ? `${test.subject}` : 'Physics · NEET 2027';

  const handleDurationChange = (val) => {
    const num = Number(val);
    if (isNaN(num)) return;
    const clamped = Math.max(minDuration, Math.min(maxDuration, num));
    setSelectedDuration(clamped);
    setDurationInput(String(clamped));
  };

  const handleInputChange = (e) => {
    const raw = e.target.value;
    setDurationInput(raw);
    const num = Number(raw);
    if (!isNaN(num) && num > 0) {
      const clamped = Math.min(maxDuration, num);
      setSelectedDuration(clamped);
    }
  };

  const handleInputBlur = () => {
    const num = Number(durationInput);
    if (isNaN(num) || num < minDuration) {
      setSelectedDuration(minDuration);
      setDurationInput(String(minDuration));
    } else if (num > maxDuration) {
      setSelectedDuration(maxDuration);
      setDurationInput(String(maxDuration));
    } else {
      setSelectedDuration(num);
      setDurationInput(String(num));
    }
  };

  const formatHours = (mins) => {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    if (h > 0 && m > 0) return `${h}h ${m}m`;
    if (h > 0) return `${h} Hour${h > 1 ? 's' : ''}`;
    return `${m} Mins`;
  };

  const effectiveDuration = isCustomizable ? selectedDuration : defaultDuration;
  const pacingSec = ((effectiveDuration * 60) / qCount).toFixed(0);

  const allCandidatePresets = [
    { label: '15 Mins', value: 15, desc: '15m · Quick Drill' },
    { label: '30 Mins', value: 30, desc: '30m · Speed Drill' },
    { label: '45 Mins', value: 45, desc: '45m · Rapid Practice' },
    { label: '60 Mins', value: 60, desc: '1h · Standard' },
    { label: '75 Mins', value: 75, desc: '1h 15m · Paced' },
    { label: '90 Mins', value: 90, desc: '1.5h · Deep Practice' },
    { label: '120 Mins', value: 120, desc: '2h · Standard Mock' },
    { label: '150 Mins', value: 150, desc: '2.5h · Extended' },
    { label: '180 Mins', value: 180, desc: '3h · Full 3 Hours' },
  ];

  let presets = allCandidatePresets.filter(
    (p) => p.value >= minDuration && p.value <= maxDuration
  );

  if (!presets.some((p) => p.value === maxDuration)) {
    presets.push({
      label: `${maxDuration} Mins (Max)`,
      value: maxDuration,
      desc: `${formatHours(maxDuration)} · Max Allowed`,
    });
  }

  if (presets.length > 5) {
    const step = Math.floor(presets.length / 4);
    presets = [
      presets[0],
      presets[step],
      presets[step * 2],
      presets[step * 3],
      presets[presets.length - 1],
    ].filter((v, i, a) => a.findIndex((t) => t.value === v.value) === i);
  }

  return (
    <main
      className={`min-h-screen px-4 py-6 sm:py-10 relative overflow-hidden selection:bg-blue-600 selection:text-white transition-colors duration-200 ${
        isLight ? 'bg-[#F8FAFC] text-slate-900' : 'bg-[#05070B] text-slate-100'
      }`}
    >
      {/* Background Ambient Radial Glow */}
      <div
        className={`pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-96 blur-2xl ${
          isLight
            ? 'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent'
            : 'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-600/15 via-transparent to-transparent'
        }`}
      />

      <div className="mx-auto max-w-2xl animate-rise-in relative z-10 space-y-6">
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onBack}
            className={`inline-flex items-center gap-1.5 text-xs font-semibold transition rounded-full border px-4 py-2 ${
              isLight
                ? 'border-slate-200 bg-white text-slate-700 hover:text-slate-900 shadow-xs hover:bg-slate-50'
                : 'border-white/10 bg-white/5 text-slate-400 hover:text-white'
            }`}
          >
            <ArrowLeft size={14} /> Back to Dashboard
          </button>
        </div>

        <section
          className={`rounded-3xl border p-6 sm:p-8 shadow-2xl relative overflow-hidden transition-colors ${
            isLight
              ? 'border-slate-200 bg-white text-slate-900 shadow-sm'
              : 'border-white/10 bg-gradient-to-b from-[#0D1322] to-[#0B0F19] text-white'
          }`}
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="rounded-full bg-blue-500/15 border border-blue-500/30 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-300">
              {badge}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-300">
              <CheckCircle2 size={13} /> CBT Mode Active
            </span>
          </div>

          <h1 className={`mt-3 font-sans text-2xl sm:text-3xl font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>
            {title}
          </h1>
          <p className="mt-1 text-sm text-slate-400 font-normal">
            National Standard Examination Guidelines &amp; Strategy
          </p>

          {/* Metrics overview */}
          <div className="my-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className={`rounded-2xl border p-3.5 text-center transition ${
              isLight ? 'border-slate-200 bg-slate-50' : 'border-white/10 bg-[#070A12]'
            }`}>
              <p className={`font-mono text-xl sm:text-2xl font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>{qCount}</p>
              <p className={`mt-1 text-[11px] font-semibold ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Questions</p>
            </div>
            <div className={`rounded-2xl border p-3.5 text-center transition ${
              isLight ? 'border-slate-200 bg-slate-50' : 'border-white/10 bg-[#070A12]'
            }`}>
              <p className="font-mono text-xl sm:text-2xl font-black text-amber-500">
                {effectiveDuration}m
              </p>
              <p className={`mt-1 text-[11px] font-semibold ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                Duration ({formatHours(effectiveDuration)})
              </p>
            </div>
            <div className={`rounded-2xl border p-3.5 text-center transition ${
              isLight ? 'border-slate-200 bg-slate-50' : 'border-white/10 bg-[#070A12]'
            }`}>
              <p className={`font-mono text-xl sm:text-2xl font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>{qCount * 4}</p>
              <p className={`mt-1 text-[11px] font-semibold ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Total Marks</p>
            </div>
            <div className={`rounded-2xl border p-3.5 text-center transition ${
              isLight ? 'border-slate-200 bg-slate-50' : 'border-white/10 bg-[#070A12]'
            }`}>
              <p className="font-mono text-lg sm:text-xl font-black text-emerald-500">+4 / −1</p>
              <p className={`mt-1 text-[11px] font-semibold ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Marking</p>
            </div>
          </div>

          {/* Student Custom Time Limit Modifier (Only for customizable tests) */}
          {isCustomizable && (
            <div className={`my-6 rounded-2xl border p-5 shadow-xl space-y-4 transition ${
              isLight
                ? 'border-violet-200 bg-gradient-to-br from-violet-50/70 via-purple-50/40 to-white text-slate-800'
                : 'border-violet-500/30 bg-gradient-to-br from-violet-950/40 via-[#0B0F1E] to-[#070A12]'
            }`}>
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className={`flex h-7 w-7 items-center justify-center rounded-lg border ${
                    isLight
                      ? 'bg-violet-100 text-violet-700 border-violet-200'
                      : 'bg-violet-600/30 text-violet-300 border-violet-500/40'
                  }`}>
                    <Sliders size={15} />
                  </div>
                  <div>
                    <h2 className={`text-sm font-bold flex items-center gap-1.5 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                      Student Time Limit Customizer
                      <span className={`rounded-full px-2 py-0.2 text-[10px] font-bold border ${
                        isLight
                          ? 'bg-violet-100 border-violet-200 text-violet-800'
                          : 'bg-violet-500/20 border-violet-500/40 text-violet-300'
                      }`}>
                        Max {formatHours(maxDuration)} ({maxDuration} Mins)
                      </span>
                    </h2>
                    <p className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                      Customize your examination duration as needed (Capped at {formatHours(maxDuration)} / {maxDuration} mins).
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className={`font-mono text-lg font-black ${isLight ? 'text-violet-700' : 'text-violet-300'}`}>
                    {effectiveDuration} Mins
                  </span>
                  <span className={`block text-[10px] font-medium ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                    ({formatHours(effectiveDuration)})
                  </span>
                </div>
              </div>

              {/* Quick Preset Buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-1">
                {presets.map((p) => {
                  const isSelected = selectedDuration === p.value;
                  return (
                    <button
                      key={p.value}
                      type="button"
                      onClick={() => handleDurationChange(p.value)}
                      className={`rounded-xl border p-2 text-center transition ${
                        isSelected
                          ? 'border-violet-600 bg-violet-600 text-white font-bold shadow-md shadow-violet-600/30'
                          : isLight
                          ? 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                          : 'border-white/10 bg-white/5 text-slate-300 hover:border-white/20 hover:bg-white/10'
                      }`}
                    >
                      <span className="block text-xs font-bold">{p.label}</span>
                      <span className={`block text-[10px] ${
                        isSelected ? 'text-violet-100' : isLight ? 'text-slate-500' : 'text-slate-400'
                      }`}>
                        {p.desc}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Slider & Custom Input Row */}
              <div className={`space-y-2 pt-2 border-t ${isLight ? 'border-violet-100' : 'border-white/5'}`}>
                <div className={`flex items-center justify-between text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                  <span>Custom Duration Slider ({minDuration}m – {maxDuration}m):</span>
                  <div className="flex items-center gap-1.5">
                    <span>Enter Minutes:</span>
                    <input
                      type="number"
                      min={minDuration}
                      max={maxDuration}
                      value={durationInput}
                      onChange={handleInputChange}
                      onBlur={handleInputBlur}
                      className={`w-16 rounded-lg border px-2 py-1 font-mono text-xs font-bold text-center focus:border-violet-500 focus:outline-none ${
                        isLight
                          ? 'border-slate-300 bg-white text-slate-900'
                          : 'border-white/10 bg-[#05070B] text-white'
                      }`}
                    />
                    <span className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-slate-500'}`}>mins</span>
                  </div>
                </div>

                <input
                  type="range"
                  min={minDuration}
                  max={maxDuration}
                  step={5}
                  value={selectedDuration}
                  onChange={(e) => handleDurationChange(e.target.value)}
                  className={`w-full accent-violet-600 h-2 rounded-lg cursor-pointer ${
                    isLight ? 'bg-slate-200' : 'bg-slate-800'
                  }`}
                />

                <div className={`flex items-center justify-between text-[11px] pt-1 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                  <span>⚡ Pacing: <strong className={`font-mono ${isLight ? 'text-violet-700' : 'text-violet-300'}`}>~{pacingSec}s</strong> per question</span>
                  <span className={`flex items-center gap-1 font-semibold ${isLight ? 'text-amber-700' : 'text-amber-400/90'}`}>
                    <ShieldCheck size={12} /> Limit: Maximum 3.0 Hours (180 mins)
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Marking & Rules Info */}
          <div className={`space-y-4 rounded-2xl border p-5 text-xs leading-relaxed transition ${
            isLight
              ? 'border-slate-200 bg-slate-50 text-slate-700'
              : 'border-white/10 bg-[#070A12] text-slate-300'
          }`}>
            <div>
              <h2 className={`font-bold uppercase tracking-wider text-xs ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Marking Scheme &amp; Scoring System :
              </h2>
              <p className={`mt-2 text-xs sm:text-sm leading-relaxed ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                • <strong className="text-emerald-600 dark:text-emerald-400 font-bold">+4 Marks</strong> for each correct answer.
                <br />
                • <strong className="text-rose-600 dark:text-rose-400 font-bold">−1 Mark</strong> for each incorrect answer (Negative Marking).
                <br />
                • <strong className={`font-medium ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>0 Marks</strong> for unattempted questions.
              </p>
            </div>

            <div className={`border-t pt-3 ${isLight ? 'border-slate-200' : 'border-white/10'}`}>
              <h2 className={`font-bold uppercase tracking-wider text-xs ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Examination Rules &amp; CBT Navigation :
              </h2>
              <ul className={`mt-2 space-y-1.5 text-xs sm:text-sm leading-relaxed ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                <li>• <strong className={isLight ? 'text-slate-900 font-semibold' : 'text-white'}>Continuous Timer ({effectiveDuration} Mins):</strong> The countdown timer will run continuously for {effectiveDuration} minutes. Refreshing will restore your active session.</li>
                <li>• <strong className={isLight ? 'text-slate-900 font-semibold' : 'text-white'}>Question Palette:</strong> Use the sidebar palette to jump between questions and toggle review flags.</li>
                <li>• <strong className={isLight ? 'text-slate-900 font-semibold' : 'text-white'}>Auto-Submission:</strong> The examination will automatically submit when the countdown reaches zero.</li>
                <li>• <strong className={isLight ? 'text-slate-900 font-semibold' : 'text-white'}>Instant Results &amp; Solutions:</strong> Complete breakdown and step-by-step KaTeX explanations will appear immediately upon submission.</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => onStart(effectiveDuration)}
              className="flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 py-4 text-center text-sm font-bold text-white shadow-lg shadow-blue-600/30 transition active:scale-95"
            >
              Begin Timed Examination ({effectiveDuration}m · {formatHours(effectiveDuration)}) <ArrowRight size={16} />
            </button>
            <button
              type="button"
              onClick={onBack}
              className={`rounded-full border px-6 py-4 text-sm font-semibold transition ${
                isLight
                  ? 'border-slate-300 bg-white hover:bg-slate-100 text-slate-700 shadow-xs'
                  : 'border-white/10 bg-white/5 hover:bg-white/10 text-slate-300'
              }`}
            >
              Cancel
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
