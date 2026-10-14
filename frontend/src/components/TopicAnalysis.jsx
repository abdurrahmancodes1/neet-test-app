import React from 'react';
import { TrendingDown, TrendingUp, BarChart3 } from 'lucide-react';
import { TopicBarChart } from './Charts.jsx';
import { useTheme } from '../utils/themeContext.jsx';

function ProgressRow({ topic, isLight }) {
  const pct = Math.round(topic.mastery);
  return (
    <div className="py-3">
      <div className="mb-1.5 flex items-center justify-between text-xs sm:text-sm">
        <span className={`font-semibold ${isLight ? 'text-slate-900' : 'text-slate-200'}`}>{topic.topic}</span>
        <span className={`font-mono text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
          {topic.correct}/{topic.total} correct · {pct}%
        </span>
      </div>
      <div className={`h-2 w-full overflow-hidden rounded-full ${isLight ? 'bg-slate-200' : 'bg-[#070A12]'}`}>
        <div
          className={`h-full rounded-full transition-all duration-500 ${
            pct >= 70 ? 'bg-emerald-500' : pct >= 40 ? 'bg-blue-500' : 'bg-rose-500'
          }`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export default function TopicAnalysis({ topics = [], weakest = [], strongest = [] }) {
  const { isLight } = useTheme();

  return (
    <div className="animate-rise-in space-y-6">
      <div
        className={`rounded-3xl border p-6 sm:p-8 transition-colors ${
          isLight ? 'border-slate-200 bg-white shadow-xl text-slate-900' : 'border-white/10 bg-[#0B0F19] shadow-2xl text-white'
        }`}
      >
        <h2 className="mb-1 font-sans text-lg sm:text-xl font-bold flex items-center gap-2">
          <BarChart3 size={18} className={isLight ? 'text-blue-600' : 'text-blue-400'} /> Topic Performance
        </h2>
        <p className={`mb-4 text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
          Accuracy across every topic covered in this examination.
        </p>
        <TopicBarChart topics={topics} />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div
          className={`rounded-3xl border p-6 transition-colors ${
            isLight
              ? 'border-rose-200 bg-rose-50/40 text-slate-900 shadow-sm'
              : 'border-rose-500/20 bg-[#0B0F19] text-white shadow-xl'
          }`}
        >
          <h3 className={`mb-4 flex items-center gap-2 font-sans text-base font-bold ${
            isLight ? 'text-rose-700' : 'text-rose-400'
          }`}>
            <TrendingDown size={18} /> Weakest Areas
          </h3>
          {weakest.length === 0 ? (
            <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              No weak spots identified — excellent work!
            </p>
          ) : (
            <ol className="space-y-3">
              {weakest.map((t, i) => (
                <li key={t.topic} className="flex items-start gap-3">
                  <span
                    className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                      isLight ? 'bg-rose-100 text-rose-800' : 'bg-rose-500/20 text-rose-300'
                    }`}
                  >
                    {i + 1}
                  </span>
                  <div>
                    <p className={`text-xs sm:text-sm font-semibold ${isLight ? 'text-slate-900' : 'text-slate-200'}`}>
                      {t.topic}
                    </p>
                    <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                      {Math.round(t.mastery)}% accuracy · {t.correct}/{t.total} correct
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          )}
        </div>

        <div
          className={`rounded-3xl border p-6 transition-colors ${
            isLight
              ? 'border-emerald-200 bg-emerald-50/40 text-slate-900 shadow-sm'
              : 'border-emerald-500/20 bg-[#0B0F19] text-white shadow-xl'
          }`}
        >
          <h3 className={`mb-4 flex items-center gap-2 font-sans text-base font-bold ${
            isLight ? 'text-emerald-700' : 'text-emerald-400'
          }`}>
            <TrendingUp size={18} /> Strongest Areas
          </h3>
          {strongest.length === 0 ? (
            <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              Attempt more questions to surface your strengths.
            </p>
          ) : (
            <ul className="space-y-3">
              {strongest.map((t) => (
                <li key={t.topic} className="flex items-center justify-between">
                  <span className={`text-xs sm:text-sm font-semibold ${isLight ? 'text-slate-900' : 'text-slate-200'}`}>
                    ✓ {t.topic}
                  </span>
                  <span className={`font-mono text-xs font-bold ${isLight ? 'text-emerald-700' : 'text-emerald-400'}`}>
                    {Math.round(t.mastery)}%
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div
        className={`rounded-3xl border p-6 sm:p-8 transition-colors ${
          isLight ? 'border-slate-200 bg-white shadow-xl text-slate-900' : 'border-white/10 bg-[#0B0F19] shadow-xl text-white'
        }`}
      >
        <h3 className="mb-2 font-sans text-base font-bold">All Topics Breakdown</h3>
        <div className={`divide-y ${isLight ? 'divide-slate-100' : 'divide-white/5'}`}>
          {topics.map((t) => (
            <ProgressRow key={t.topic} topic={t} isLight={isLight} />
          ))}
        </div>
      </div>
    </div>
  );
}
