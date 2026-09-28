import React from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

export function AttemptComparisonChart({ scoreTrend = [] }) {
  if (!scoreTrend || scoreTrend.length === 0) {
    return (
      <div className="flex h-56 items-center justify-center rounded-xl bg-ink-50 p-6 text-center text-xs text-ink-500">
        No attempt data available yet. Complete your first test to view performance analytics.
      </div>
    );
  }

  const data = scoreTrend.map((d) => ({
    name: d.attempt,
    shortDate: d.shortDate,
    Score: d.score,
    Accuracy: d.accuracy,
    Correct: d.correct,
    Wrong: d.wrong,
    Unattempted: d.unattempted,
  }));

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#EAF1F4" vertical={false} />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 12, fill: '#16232F', fontWeight: 600 }}
            tickLine={false}
          />
          <YAxis
            yAxisId="left"
            domain={[0, 240]}
            tick={{ fontSize: 11, fill: '#557A92' }}
            tickLine={false}
            unit="m"
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            domain={[0, 100]}
            tick={{ fontSize: 11, fill: '#33A177' }}
            tickLine={false}
            unit="%"
          />
          <Tooltip
            contentStyle={{
              borderRadius: 12,
              border: '1px solid #D4E2E9',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              fontSize: 12,
            }}
          />
          <Legend wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
          <Bar yAxisId="left" dataKey="Score" fill="#16232F" radius={[6, 6, 0, 0]} maxBarSize={36} />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="Accuracy"
            stroke="#33A177"
            strokeWidth={3}
            dot={{ r: 4, fill: '#33A177' }}
            activeDot={{ r: 6 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

export function AttemptAccuracyChart({ scoreTrend = [] }) {
  if (!scoreTrend || scoreTrend.length === 0) return null;

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={scoreTrend} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#EAF1F4" vertical={false} />
          <XAxis dataKey="attempt" tick={{ fontSize: 11, fill: '#16232F' }} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: '#557A92' }} tickLine={false} />
          <Tooltip
            contentStyle={{
              borderRadius: 12,
              border: '1px solid #D4E2E9',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              fontSize: 12,
            }}
          />
          <Legend wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
          <Bar dataKey="correct" name="Correct (+4)" fill="#33A177" stackId="a" />
          <Bar dataKey="wrong" name="Wrong (-1)" fill="#C64848" stackId="a" />
          <Bar dataKey="unattempted" name="Unattempted (0)" fill="#ACC5D2" stackId="a" radius={[6, 6, 0, 0]} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
