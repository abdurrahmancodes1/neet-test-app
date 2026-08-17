import React from 'react';
import { TrendingDown, TrendingUp } from 'lucide-react';
import { TopicBarChart } from './Charts.jsx';

function ProgressRow({ topic }) {
  const pct = Math.round(topic.mastery);
  return (
    <div className="py-2.5">
      <div className="mb-1.5 flex items-center justify-between text-sm">
        <span className="font-medium text-ink-800">{topic.topic}</span>
        <span className="font-mono text-xs text-ink-500">
          {topic.correct}/{topic.total} correct
        </span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-ink-100">
        <div
          className={`h-full rounded-full ${pct >= 70 ? 'bg-good-500' : pct >= 40 ? 'bg-gold-500' : 'bg-bad-500'}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export default function TopicAnalysis({ topics, weakest, strongest }) {
  return (
    <div className="animate-rise-in space-y-6">
      <div className="rounded-xl2 border border-ink-200 bg-white p-6 shadow-card sm:p-8">
        <h2 className="mb-1 font-serif text-xl font-bold text-ink-900">Topic Performance</h2>
        <p className="mb-4 text-sm text-ink-500">Accuracy across every topic covered in this test.</p>
        <TopicBarChart topics={topics} />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="rounded-xl2 border border-bad-500/20 bg-white p-6 shadow-card">
          <h3 className="mb-4 flex items-center gap-2 font-serif text-lg font-bold text-bad-700">
            <TrendingDown size={18} /> Your Weakest Areas
          </h3>
          {weakest.length === 0 ? (
            <p className="text-sm text-ink-500">No weak spots identified yet — nice work.</p>
          ) : (
            <ol className="space-y-3">
              {weakest.map((t, i) => (
                <li key={t.topic} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-bad-100 text-xs font-bold text-bad-700">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-ink-800">{t.topic}</p>
                    <p className="text-xs text-ink-500">
                      {Math.round(t.mastery)}% accuracy · {t.correct}/{t.total} correct
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          )}
        </div>

        <div className="rounded-xl2 border border-good-500/20 bg-white p-6 shadow-card">
          <h3 className="mb-4 flex items-center gap-2 font-serif text-lg font-bold text-good-700">
            <TrendingUp size={18} /> Strongest Areas
          </h3>
          {strongest.length === 0 ? (
            <p className="text-sm text-ink-500">Attempt more questions to surface your strengths.</p>
          ) : (
            <ul className="space-y-3">
              {strongest.map((t) => (
                <li key={t.topic} className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-ink-800">✓ {t.topic}</span>
                  <span className="font-mono text-xs font-bold text-good-700">{Math.round(t.mastery)}%</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="rounded-xl2 border border-ink-200 bg-white p-6 shadow-card sm:p-8">
        <h3 className="mb-2 font-serif text-lg font-bold text-ink-900">All Topics</h3>
        <div className="divide-y divide-ink-100">
          {topics.map((t) => (
            <ProgressRow key={t.topic} topic={t} />
          ))}
        </div>
      </div>
    </div>
  );
}
