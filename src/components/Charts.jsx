import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';

const STATUS_COLORS = {
  Correct: '#33A177',
  Wrong: '#C64848',
  Unattempted: '#ACC5D2',
};

export function ScoreDonut({ correct, wrong, unattempted }) {
  const data = [
    { name: 'Correct', value: correct },
    { name: 'Wrong', value: wrong },
    { name: 'Unattempted', value: unattempted },
  ].filter((d) => d.value > 0);

  if (data.length === 0) {
    return <p className="py-8 text-center text-sm text-ink-400">No data to display.</p>;
  }

  return (
    <div className="h-56 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius="62%"
            outerRadius="90%"
            paddingAngle={2}
            stroke="none"
          >
            {data.map((entry) => (
              <Cell key={entry.name} fill={STATUS_COLORS[entry.name]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ borderRadius: 10, border: '1px solid #D4E2E9', fontSize: 13 }}
            formatter={(value, name) => [`${value} questions`, name]}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export function TopicBarChart({ topics }) {
  const data = topics.map((t) => ({
    topic: t.topic.length > 18 ? `${t.topic.slice(0, 17)}…` : t.topic,
    fullTopic: t.topic,
    accuracy: Math.round(t.mastery),
  }));

  const height = Math.max(220, data.length * 34);

  return (
    <div style={{ height }} className="w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 4, right: 24, left: 4, bottom: 4 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#EAF1F4" horizontal={false} />
          <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11, fill: '#557A92' }} tickFormatter={(v) => `${v}%`} />
          <YAxis
            type="category"
            dataKey="topic"
            width={140}
            tick={{ fontSize: 12, fill: '#16232F' }}
          />
          <Tooltip
            contentStyle={{ borderRadius: 10, border: '1px solid #D4E2E9', fontSize: 13 }}
            formatter={(value) => [`${value}%`, 'Accuracy']}
            labelFormatter={(_, payload) => payload?.[0]?.payload?.fullTopic ?? ''}
          />
          <Bar dataKey="accuracy" radius={[0, 6, 6, 0]} fill="#2A4356" maxBarSize={18} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
