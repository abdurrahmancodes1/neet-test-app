import React, { useState } from 'react';
import {
  X,
  Trophy,
  Users,
  Award,
  Target,
  Sparkles,
  Calendar,
  CheckCircle2,
  XCircle,
  Clock,
  Search,
  Zap,
  Globe,
} from 'lucide-react';

export default function GlobalLeaderboardModal({
  open,
  onClose,
  stats,
  currentUserEmail,
}) {
  const [activeTab, setActiveTab] = useState('leaderboard'); // 'leaderboard' | 'candidates'
  const [searchTerm, setSearchTerm] = useState('');

  if (!open) return null;

  const leaderboard = stats?.leaderboard || [];
  const allCandidates = stats?.allCandidates || [];
  const totalUsers = stats?.totalUsers || allCandidates.length || 1;
  const totalAttempts = stats?.totalAttempts || leaderboard.length || 0;
  const avgScore = stats?.averageScore || 0;
  const highestScore = stats?.highestScore || (leaderboard[0]?.score ?? 0);

  const formatDateSafe = (ts) => {
    if (!ts) return '—';
    try {
      const d = new Date(ts);
      return isNaN(d.getTime())
        ? '—'
        : d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
    } catch {
      return '—';
    }
  };

  const filteredLeaderboard = leaderboard.filter((item) =>
    (item.studentName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.email || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCandidates = allCandidates.filter((c) =>
    (c.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (c.email || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-3 sm:p-6 backdrop-blur-md animate-fade-in">
      <div className="relative flex max-h-[90vh] w-full max-w-4xl flex-col rounded-3xl border border-white/10 bg-[#0B0F19] text-slate-100 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-[#070A12] px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white shadow-glow">
              <Globe size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-sans text-lg sm:text-xl font-bold text-white">
                  Global Candidates &amp; Scores
                </h2>
                <span className="rounded-full bg-emerald-500/20 border border-emerald-500/30 px-2.5 py-0.5 text-[10px] font-bold text-emerald-300">
                  {stats?.isLive ? '🟢 Live Backend Synced' : '🟡 Cloud Synced'}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                View all registered candidates and national drill examination ranks.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-white/10 bg-white/5 p-2 text-slate-400 hover:text-white hover:bg-white/10 transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Global Summary Stats Cards */}
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3 p-4 sm:px-6 bg-[#090D17] border-b border-white/10">
          <div className="rounded-2xl border border-white/10 bg-[#0B0F19] p-3 text-center">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 flex items-center justify-center gap-1">
              <Users size={12} className="text-blue-400" /> Total Users
            </p>
            <p className="mt-1 font-serif text-xl sm:text-2xl font-bold text-white">
              {totalUsers}
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-[#0B0F19] p-3 text-center">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 flex items-center justify-center gap-1">
              <Zap size={12} className="text-indigo-400" /> Tests Submitted
            </p>
            <p className="mt-1 font-serif text-xl sm:text-2xl font-bold text-white">
              {totalAttempts}
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-[#0B0F19] p-3 text-center">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 flex items-center justify-center gap-1">
              <Sparkles size={12} className="text-amber-400" /> Top Platform Score
            </p>
            <p className="mt-1 font-serif text-xl sm:text-2xl font-bold text-amber-400">
              {highestScore} <span className="text-xs text-slate-500 font-normal">/ 240</span>
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-[#0B0F19] p-3 text-center">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 flex items-center justify-center gap-1">
              <Target size={12} className="text-emerald-400" /> Platform Average
            </p>
            <p className="mt-1 font-serif text-xl sm:text-2xl font-bold text-emerald-400">
              {avgScore} <span className="text-xs text-slate-500 font-normal">pts</span>
            </p>
          </div>
        </div>

        {/* Tab & Search Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-4 sm:px-6 bg-[#0B0F19] border-b border-white/10">
          <div className="flex items-center gap-1 rounded-full bg-[#070A12] border border-white/10 p-1">
            <button
              type="button"
              onClick={() => setActiveTab('leaderboard')}
              className={`rounded-full px-4 py-1.5 text-xs font-bold transition flex items-center gap-1.5 ${
                activeTab === 'leaderboard'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Trophy size={13} />
              Global Leaderboard ({leaderboard.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('candidates')}
              className={`rounded-full px-4 py-1.5 text-xs font-bold transition flex items-center gap-1.5 ${
                activeTab === 'candidates'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Users size={13} />
              All Registered Candidates ({allCandidates.length || totalUsers})
            </button>
          </div>

          <div className="relative min-w-[220px]">
            <Search size={14} className="absolute left-3.5 top-2.5 text-slate-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search candidate name or email..."
              className="w-full rounded-full border border-white/10 bg-[#070A12] py-1.5 pl-9 pr-3 text-xs text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {activeTab === 'leaderboard' ? (
            filteredLeaderboard.length === 0 ? (
              <div className="py-12 text-center text-slate-400">
                <Trophy size={32} className="mx-auto text-slate-600 mb-2" />
                <p className="text-sm font-semibold text-white">No test submissions match your search.</p>
                <p className="text-xs text-slate-500">Take the 2-hour exam to be the first on the global leaderboard!</p>
              </div>
            ) : (
              <div className="overflow-x-auto rounded-2xl border border-white/10">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-white/10 bg-[#070A12] text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                      <th className="px-4 py-3">Rank</th>
                      <th className="px-4 py-3">Candidate Name</th>
                      <th className="px-4 py-3">Score / 240</th>
                      <th className="px-4 py-3">Accuracy</th>
                      <th className="px-4 py-3">Breakdown</th>
                      <th className="px-4 py-3">Submission Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 bg-[#0D121F]">
                    {filteredLeaderboard.map((item, index) => {
                      const isCurrentUser =
                        currentUserEmail &&
                        item.email &&
                        item.email.toLowerCase() === currentUserEmail.toLowerCase();
                      const rank = item.rank || index + 1;

                      return (
                        <tr
                          key={item.id || index}
                          className={`transition ${
                            isCurrentUser
                              ? 'bg-blue-600/10 border-l-2 border-l-blue-500'
                              : 'hover:bg-white/[0.02]'
                          }`}
                        >
                          <td className="px-4 py-3.5">
                            <div className="flex items-center gap-1.5 font-mono font-black">
                              {rank === 1 ? (
                                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-500 text-black text-xs font-black shadow-glow">
                                  🥇
                                </span>
                              ) : rank === 2 ? (
                                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-300 text-black text-xs font-black">
                                  🥈
                                </span>
                              ) : rank === 3 ? (
                                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-700 text-white text-xs font-black">
                                  🥉
                                </span>
                              ) : (
                                <span className="text-slate-400 pl-1">#{rank}</span>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-3.5">
                            <div className="font-semibold text-white flex items-center gap-2">
                              <span>{item.studentName || 'Anonymous Student'}</span>
                              {isCurrentUser && (
                                <span className="rounded-full bg-blue-500/20 border border-blue-500/30 px-2 py-0.5 text-[10px] font-bold text-blue-300">
                                  You
                                </span>
                              )}
                            </div>
                            {item.email && (
                              <p className="text-[11px] text-slate-500">{item.email}</p>
                            )}
                          </td>
                          <td className="px-4 py-3.5">
                            <span className="font-serif text-sm font-black text-white">{item.score}</span>
                            <span className="text-[11px] text-slate-500"> / {item.maxScore || 240}</span>
                            <span className="ml-1.5 font-mono text-[11px] text-blue-400">
                              ({Math.round(((item.score || 0) / (item.maxScore || 240)) * 100)}%)
                            </span>
                          </td>
                          <td className="px-4 py-3.5 font-semibold text-emerald-400">
                            {item.accuracy ? `${item.accuracy}%` : '—'}
                          </td>
                          <td className="px-4 py-3.5">
                            <div className="flex items-center gap-1 font-mono text-[11px]">
                              <span className="text-emerald-400 font-bold">+{item.correctCount || item.correct || 0}</span>
                              <span className="text-slate-600">/</span>
                              <span className="text-rose-400 font-bold">-{item.wrongCount || item.wrong || 0}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3.5 text-slate-400 text-[11px]">
                            {formatDateSafe(item.submittedAt)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )
          ) : (
            /* CANDIDATES DIRECTORY TAB */
            filteredCandidates.length === 0 ? (
              <div className="py-12 text-center text-slate-400">
                <Users size={32} className="mx-auto text-slate-600 mb-2" />
                <p className="text-sm font-semibold text-white">No registered candidates found.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {filteredCandidates.map((cand, idx) => {
                  const isCurrent =
                    currentUserEmail &&
                    cand.email &&
                    cand.email.toLowerCase() === currentUserEmail.toLowerCase();

                  return (
                    <div
                      key={cand.id || idx}
                      className={`rounded-2xl border p-4 transition ${
                        isCurrent
                          ? 'border-blue-500/40 bg-blue-900/10'
                          : 'border-white/10 bg-[#0D121F] hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h4 className="font-bold text-white text-sm">{cand.name}</h4>
                            {isCurrent && (
                              <span className="rounded-full bg-blue-500/20 border border-blue-500/30 px-2 py-0.5 text-[10px] font-bold text-blue-300">
                                You
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-400 mt-0.5">{cand.email}</p>
                        </div>
                        <span className="rounded-full bg-white/5 border border-white/10 px-2.5 py-0.5 text-[10px] font-semibold text-slate-300">
                          {cand.targetExam || 'NEET 2027'}
                        </span>
                      </div>
                      <div className="mt-3 flex items-center justify-between border-t border-white/5 pt-2.5 text-[11px] text-slate-500">
                        <span>Joined: {cand.registeredAt ? formatDateSafe(cand.registeredAt) : 'Active'}</span>
                        <span className="text-emerald-400 font-semibold">● Registered Candidate</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between border-t border-white/10 bg-[#070A12] px-6 py-3.5 text-xs text-slate-400">
          <span>Synced across all candidate browser sessions and database.</span>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-blue-600 hover:bg-blue-500 px-5 py-1.5 text-xs font-bold text-white transition shadow-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
