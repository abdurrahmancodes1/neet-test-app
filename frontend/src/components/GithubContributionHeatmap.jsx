import React, { useMemo, useState } from 'react';
import { Flame, Calendar, Award, CheckCircle2, Zap } from 'lucide-react';
import { useTheme } from '../utils/themeContext.jsx';

/**
 * Format a Date to YYYY-MM-DD in local time
 */
function toDateKey(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function GithubContributionHeatmap({ attempts = [] }) {
  const { isLight } = useTheme();
  const [hoveredCell, setHoveredCell] = useState(null);

  // Process attempt counts and test metadata per date key
  const { dateMap, totalTests, activeDays, currentStreak, longestStreak, weeks, monthHeaders } =
    useMemo(() => {
      const map = {};
      let total = 0;

      attempts.forEach((att) => {
        const rawTs = att.submittedAt || att.timestamp || att.createdAt;
        if (!rawTs) return;
        const d = new Date(rawTs);
        if (isNaN(d.getTime())) return;

        const key = toDateKey(d);
        if (!map[key]) {
          map[key] = {
            count: 0,
            tests: [],
          };
        }
        map[key].count += 1;
        map[key].tests.push({
          title: att.testTitle || att.test?.title || 'Mock Assessment',
          score: att.score ?? 0,
          maxScore: att.maxScore || 240,
          accuracy: att.accuracy ?? 0,
        });
        total += 1;
      });

      // Generate the calendar grid for past 24 weeks (~6 months) ending on today's week
      const today = new Date();
      today.setHours(23, 59, 59, 999);

      // Start on a Sunday ~24 weeks ago
      const dayOfWeek = today.getDay(); // 0 is Sun, 6 is Sat
      const totalDays = 24 * 7 + (dayOfWeek + 1); // 24 full weeks + current partial week
      const startDate = new Date(today);
      startDate.setDate(today.getDate() - totalDays + 1);
      startDate.setHours(0, 0, 0, 0);

      // Align startDate to Sunday
      const startDayOfWeek = startDate.getDay();
      startDate.setDate(startDate.getDate() - startDayOfWeek);

      const generatedWeeks = [];
      const mHeaders = [];
      let currentWeek = [];
      let lastMonth = -1;

      const cursor = new Date(startDate);
      let dayIndex = 0;

      while (cursor <= today || currentWeek.length > 0) {
        const key = toDateKey(cursor);
        const cellData = map[key] || { count: 0, tests: [] };
        const isFuture = cursor > today;

        if (cursor.getDay() === 0) {
          // New week started
          const month = cursor.getMonth();
          if (month !== lastMonth) {
            mHeaders.push({
              weekIndex: generatedWeeks.length,
              monthName: MONTH_NAMES[month],
            });
            lastMonth = month;
          }
        }

        currentWeek.push({
          date: new Date(cursor),
          dateKey: key,
          count: isFuture ? 0 : cellData.count,
          tests: cellData.tests,
          isFuture,
          isToday: key === toDateKey(today),
        });

        if (currentWeek.length === 7) {
          generatedWeeks.push(currentWeek);
          currentWeek = [];
        }

        cursor.setDate(cursor.getDate() + 1);
        dayIndex += 1;
        if (dayIndex > 300) break; // safety boundary
      }

      // Calculate streaks
      let current = 0;
      let longest = 0;
      let tempStreak = 0;

      // Scan day-by-day backwards from today for current streak
      const streakCursor = new Date(today);
      let isCurrentStreakActive = true;

      for (let i = 0; i < 365; i++) {
        const k = toDateKey(streakCursor);
        const hasActivity = (map[k]?.count || 0) > 0;

        if (isCurrentStreakActive) {
          if (hasActivity) {
            current += 1;
          } else {
            // If today has no activity yet, allow yesterday to continue the streak
            if (i > 0) {
              isCurrentStreakActive = false;
            }
          }
        }

        streakCursor.setDate(streakCursor.getDate() - 1);
      }

      // Scan all recorded dates in chronological order for longest streak
      const allKeys = Object.keys(map).sort();
      let prevDate = null;

      allKeys.forEach((key) => {
        const d = new Date(key);
        if (prevDate) {
          const diffDays = Math.round((d - prevDate) / (1000 * 60 * 60 * 24));
          if (diffDays === 1) {
            tempStreak += 1;
          } else {
            tempStreak = 1;
          }
        } else {
          tempStreak = 1;
        }
        if (tempStreak > longest) longest = tempStreak;
        prevDate = d;
      });

      return {
        dateMap: map,
        totalTests: total,
        activeDays: Object.keys(map).length,
        currentStreak: current,
        longestStreak: Math.max(current, longest),
        weeks: generatedWeeks,
        monthHeaders: mHeaders,
      };
    }, [attempts]);

  // Color scale mapping (GitHub terminal style with blue/emerald palette)
  const getCellColor = (count, isFuture) => {
    if (isFuture) return 'opacity-0 pointer-events-none';
    if (count === 0) {
      return isLight
        ? 'bg-slate-100 hover:border-slate-400'
        : 'bg-[#0F172A]/70 hover:border-blue-500/40 border border-white/5';
    }
    if (count === 1) {
      return isLight
        ? 'bg-blue-300 border border-blue-400 hover:brightness-95'
        : 'bg-blue-900/80 border border-blue-700/60 hover:brightness-125';
    }
    if (count === 2) {
      return isLight
        ? 'bg-blue-500 border border-blue-600 hover:brightness-95'
        : 'bg-blue-600 border border-blue-400 hover:brightness-125';
    }
    if (count === 3) {
      return isLight
        ? 'bg-indigo-600 border border-indigo-700 hover:brightness-95'
        : 'bg-indigo-500 border border-indigo-300 hover:brightness-125';
    }
    return isLight
      ? 'bg-emerald-600 border border-emerald-700 hover:brightness-95'
      : 'bg-emerald-400 border border-emerald-200 shadow-glow hover:brightness-125';
  };

  return (
    <div
      className={`rounded-xl border font-mono transition-colors ${
        isLight
          ? 'border-slate-300 bg-white text-slate-900 shadow-xs'
          : 'border-blue-900/40 bg-[#0B0F19] text-white shadow-xl'
      }`}
    >
      {/* Terminal Titlebar */}
      <div
        className={`flex flex-wrap items-center justify-between gap-3 border-b px-4 py-3 sm:px-6 sm:py-3.5 ${
          isLight ? 'border-slate-200 bg-slate-50' : 'border-blue-900/40 bg-[#070A14]'
        }`}
      >
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded bg-blue-500/10 text-blue-400 border border-blue-500/30">
            <Calendar size={15} />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] sm:text-xs font-mono font-bold tracking-wider uppercase text-blue-400">
                [ACTIVITY MATRIX]
              </span>
              <span className="text-xs sm:text-sm font-bold tracking-tight text-slate-100">
                TEST CONTRIBUTION HEATMAP
              </span>
            </div>
            <p className={`text-[11px] font-sans ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              Daily mock assessment cadence and drill consistency
            </p>
          </div>
        </div>

        {/* Quick Streak Stats */}
        <div className="flex items-center gap-3 text-xs">
          <div className={`flex items-center gap-1.5 rounded px-2.5 py-1 border ${
            isLight ? 'border-amber-200 bg-amber-50 text-amber-800' : 'border-amber-500/30 bg-amber-500/10 text-amber-300'
          }`}>
            <Flame size={13} className="text-amber-500" />
            <span className="text-[11px] font-bold">{currentStreak} Day Streak</span>
          </div>
          <div className={`hidden sm:flex items-center gap-1.5 rounded px-2.5 py-1 border ${
            isLight ? 'border-blue-200 bg-blue-50 text-blue-800' : 'border-blue-500/30 bg-blue-500/10 text-blue-300'
          }`}>
            <Award size={13} className="text-blue-400" />
            <span className="text-[11px] font-bold">{totalTests} Tests Recorded</span>
          </div>
        </div>
      </div>

      {/* Heatmap Body */}
      <div className="p-4 sm:p-6 space-y-4">
        {/* Metric Badges */}
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3 text-xs">
          <div className={`rounded border p-2.5 ${isLight ? 'border-slate-200 bg-slate-50' : 'border-white/10 bg-[#070A12]'}`}>
            <span className={`text-[10px] uppercase font-bold block ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Total Attempts</span>
            <span className={`text-base font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>{totalTests}</span>
          </div>
          <div className={`rounded border p-2.5 ${isLight ? 'border-slate-200 bg-slate-50' : 'border-white/10 bg-[#070A12]'}`}>
            <span className={`text-[10px] uppercase font-bold block ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Active Drill Days</span>
            <span className={`text-base font-black ${isLight ? 'text-blue-600' : 'text-blue-400'}`}>{activeDays}</span>
          </div>
          <div className={`rounded border p-2.5 ${isLight ? 'border-slate-200 bg-slate-50' : 'border-white/10 bg-[#070A12]'}`}>
            <span className={`text-[10px] uppercase font-bold block ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Current Streak</span>
            <span className={`text-base font-black ${isLight ? 'text-amber-600' : 'text-amber-400'}`}>{currentStreak}d</span>
          </div>
          <div className={`rounded border p-2.5 ${isLight ? 'border-slate-200 bg-slate-50' : 'border-white/10 bg-[#070A12]'}`}>
            <span className={`text-[10px] uppercase font-bold block ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Max Consecutive</span>
            <span className={`text-base font-black ${isLight ? 'text-emerald-600' : 'text-emerald-400'}`}>{longestStreak}d</span>
          </div>
        </div>

        {/* Heatmap Canvas */}
        <div className="overflow-x-auto pb-2">
          <div className="inline-block min-w-full">
            {/* Month labels */}
            <div className="flex text-[10px] font-bold text-slate-400 mb-1 ml-7">
              {weeks.map((_, wIdx) => {
                const header = monthHeaders.find((h) => h.weekIndex === wIdx);
                return (
                  <div key={wIdx} className="w-3.5 sm:w-4 text-center shrink-0">
                    {header ? header.monthName : ''}
                  </div>
                );
              })}
            </div>

            {/* Grid rows (7 days: Mon-Sun) */}
            <div className="flex gap-1 items-start">
              {/* Day of week labels */}
              <div className="flex flex-col gap-1 text-[9px] font-mono text-slate-500 pr-1 shrink-0 select-none">
                <span className="h-3.5 sm:h-4 leading-[14px]">S</span>
                <span className="h-3.5 sm:h-4 leading-[14px]">M</span>
                <span className="h-3.5 sm:h-4 leading-[14px]">T</span>
                <span className="h-3.5 sm:h-4 leading-[14px]">W</span>
                <span className="h-3.5 sm:h-4 leading-[14px]">T</span>
                <span className="h-3.5 sm:h-4 leading-[14px]">F</span>
                <span className="h-3.5 sm:h-4 leading-[14px]">S</span>
              </div>

              {/* Weeks columns */}
              <div className="flex gap-1">
                {weeks.map((week, wIdx) => (
                  <div key={wIdx} className="flex flex-col gap-1">
                    {week.map((cell) => {
                      const isHovered = hoveredCell?.dateKey === cell.dateKey;
                      return (
                        <div
                          key={cell.dateKey}
                          onMouseEnter={() => !cell.isFuture && setHoveredCell(cell)}
                          onMouseLeave={() => setHoveredCell(null)}
                          className={`h-3.5 w-3.5 sm:h-4 sm:w-4 rounded-xs transition-all duration-150 cursor-pointer ${getCellColor(
                            cell.count,
                            cell.isFuture
                          )} ${isHovered ? 'ring-2 ring-white scale-125 z-20' : ''} ${
                            cell.isToday ? 'ring-1 ring-blue-400' : ''
                          }`}
                          title={
                            cell.isFuture
                              ? ''
                              : `${cell.dateKey}: ${cell.count} test${cell.count === 1 ? '' : 's'}`
                          }
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Floating Cell Inspector / Tooltip Bar */}
        <div
          className={`min-h-[38px] flex items-center justify-between rounded border px-3 py-1.5 text-[11px] transition-colors ${
            isLight ? 'border-slate-200 bg-slate-50 text-slate-700' : 'border-blue-900/30 bg-[#070A14] text-slate-300'
          }`}
        >
          {hoveredCell ? (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-blue-400">
                {hoveredCell.date.toLocaleDateString(undefined, {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
              <span>—</span>
              {hoveredCell.count > 0 ? (
                <span>
                  <strong className="text-emerald-400 font-bold">{hoveredCell.count}</strong> test
                  {hoveredCell.count === 1 ? '' : 's'} completed:{' '}
                  <span className="opacity-90">
                    {hoveredCell.tests.map((t, idx) => (
                      <span key={idx} className="mr-2">
                        {t.title} ({t.score}/{t.maxScore})
                      </span>
                    ))}
                  </span>
                </span>
              ) : (
                <span className="text-slate-400">No mock tests attempted on this day</span>
              )}
            </div>
          ) : (
            <span className="text-slate-400">
              Hover over any day square in the matrix to inspect attempts, scores, and activity logs.
            </span>
          )}

          {/* Legend */}
          <div className="flex items-center gap-1.5 shrink-0 ml-auto pl-3 text-[10px] text-slate-400 select-none">
            <span>Less</span>
            <div className={`h-2.5 w-2.5 rounded-xs ${isLight ? 'bg-slate-200' : 'bg-[#0F172A]'}`} />
            <div className={`h-2.5 w-2.5 rounded-xs ${isLight ? 'bg-blue-300' : 'bg-blue-900'}`} />
            <div className={`h-2.5 w-2.5 rounded-xs ${isLight ? 'bg-blue-500' : 'bg-blue-600'}`} />
            <div className={`h-2.5 w-2.5 rounded-xs ${isLight ? 'bg-indigo-600' : 'bg-indigo-500'}`} />
            <div className={`h-2.5 w-2.5 rounded-xs ${isLight ? 'bg-emerald-500' : 'bg-emerald-400'}`} />
            <span>More</span>
          </div>
        </div>
      </div>
    </div>
  );
}
