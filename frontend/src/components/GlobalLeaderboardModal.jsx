import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import {
  X,
  Trophy,
  Users,
  Sparkles,
  Target,
  Zap,
  Globe,
  Search,
  CheckCircle2,
} from 'lucide-react';
import { useTheme } from '../utils/themeContext.jsx';

export default function GlobalLeaderboardModal({
  open,
  onClose,
  stats,
  currentUserEmail,
  isAdmin = false,
}) {
  const { isLight } = useTheme();
  const [activeTab, setActiveTab] = useState('leaderboard'); // 'leaderboard' | 'candidates'
  const [searchTerm, setSearchTerm] = useState('');
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);

  // Lock background scrolling while modal is open
  useEffect(() => {
    if (!open) return;

    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    // Auto-focus close button or modal container for accessibility
    setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, [open]);

  // Support Escape key to close
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

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
    (isAdmin && (item.email || '').toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredCandidates = allCandidates.filter((c) =>
    (c.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (isAdmin && (c.email || '').toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const modalContent = (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="global-leaderboard-title"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-md transition-opacity duration-200 sm:p-4 md:p-6"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className={`relative flex h-[100dvh] max-h-[100dvh] w-full flex-col overflow-hidden transition-all duration-200 sm:h-auto sm:max-h-[88vh] sm:max-w-4xl sm:rounded-3xl lg:max-w-5xl shadow-2xl ${
          isLight
            ? 'border-slate-200 bg-white text-slate-900 shadow-2xl sm:border'
            : 'border-white/10 bg-[#0B0F19] text-slate-100 sm:border'
        }`}
      >
        {/* Compact Header */}
        <div
          className={`flex shrink-0 items-center justify-between gap-3 border-b px-4 py-3 sm:px-6 sm:py-3.5 transition-colors ${
            isLight ? 'border-slate-200 bg-slate-50' : 'border-white/10 bg-[#070A12]'
          }`}
        >
          <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white shadow-md">
              <Globe size={18} />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2
                  id="global-leaderboard-title"
                  className={`truncate font-sans text-base sm:text-lg font-bold tracking-tight ${
                    isLight ? 'text-slate-900' : 'text-white'
                  }`}
                >
                  Global Candidates &amp; Scores
                </h2>
                <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:text-emerald-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-700 dark:bg-emerald-400 animate-pulse" />
                  Live Sync
                </span>
              </div>
              <p className={`hidden xs:block truncate text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                Verified candidate rankings across all nationwide mock drills
              </p>
            </div>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close global leaderboard"
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition active:scale-95 ${
              isLight
                ? 'border-slate-200 bg-white text-slate-500 hover:bg-slate-100 hover:text-slate-900 shadow-xs'
                : 'border-white/10 bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
            }`}
          >
            <X size={18} />
          </button>
        </div>

        {/* Compact Statistics Grid */}
        <div
          className={`grid shrink-0 grid-cols-2 gap-2 p-3 sm:grid-cols-4 sm:gap-3 sm:px-6 sm:py-3 border-b transition-colors ${
            isLight ? 'bg-slate-100/70 border-slate-200' : 'bg-[#090D17] border-white/10'
          }`}
        >
          <div
            className={`rounded-xl border p-2 sm:p-2.5 text-center ${
              isLight ? 'border-slate-200 bg-white shadow-xs' : 'border-white/10 bg-[#0B0F19]'
            }`}
          >
            <p
              className={`text-[10px] font-semibold uppercase tracking-wider flex items-center justify-center gap-1 ${
                isLight ? 'text-slate-500' : 'text-slate-400'
              }`}
            >
              <Users size={11} className={isLight ? 'text-blue-600' : 'text-blue-400'} /> Total Users
            </p>
            <p className={`mt-0.5 font-serif text-lg sm:text-2xl font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
              {totalUsers}
            </p>
          </div>

          <div
            className={`rounded-xl border p-2 sm:p-2.5 text-center ${
              isLight ? 'border-slate-200 bg-white shadow-xs' : 'border-white/10 bg-[#0B0F19]'
            }`}
          >
            <p
              className={`text-[10px] font-semibold uppercase tracking-wider flex items-center justify-center gap-1 ${
                isLight ? 'text-slate-500' : 'text-slate-400'
              }`}
            >
              <Zap size={11} className={isLight ? 'text-indigo-600' : 'text-indigo-400'} /> Tests Given
            </p>
            <p className={`mt-0.5 font-serif text-lg sm:text-2xl font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
              {totalAttempts}
            </p>
          </div>

          <div
            className={`rounded-xl border p-2 sm:p-2.5 text-center ${
              isLight ? 'border-slate-200 bg-white shadow-xs' : 'border-white/10 bg-[#0B0F19]'
            }`}
          >
            <p
              className={`text-[10px] font-semibold uppercase tracking-wider flex items-center justify-center gap-1 ${
                isLight ? 'text-slate-500' : 'text-slate-400'
              }`}
            >
              <Sparkles size={11} className={isLight ? 'text-amber-600' : 'text-amber-400'} /> Top Score
            </p>
            <p className={`mt-0.5 font-serif text-lg sm:text-2xl font-bold ${isLight ? 'text-amber-600' : 'text-amber-400'}`}>
              {highestScore} <span className="text-[10px] text-slate-500 font-normal">/ 240</span>
            </p>
          </div>

          <div
            className={`rounded-xl border p-2 sm:p-2.5 text-center ${
              isLight ? 'border-slate-200 bg-white shadow-xs' : 'border-white/10 bg-[#0B0F19]'
            }`}
          >
            <p
              className={`text-[10px] font-semibold uppercase tracking-wider flex items-center justify-center gap-1 ${
                isLight ? 'text-slate-500' : 'text-slate-400'
              }`}
            >
              <Target size={11} className={isLight ? 'text-emerald-600' : 'text-emerald-400'} /> Average
            </p>
            <p className={`mt-0.5 font-serif text-lg sm:text-2xl font-bold ${isLight ? 'text-emerald-600' : 'text-emerald-400'}`}>
              {avgScore} <span className="text-[10px] text-slate-500 font-normal">pts</span>
            </p>
          </div>
        </div>

        {/* Toolbar: Navigation Tabs & Search Box */}
        <div
          className={`flex shrink-0 flex-col gap-2.5 p-3 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-3 border-b transition-colors ${
            isLight ? 'bg-white border-slate-200' : 'bg-[#0B0F19] border-white/10'
          }`}
        >
          {/* Tabs */}
          <div
            className={`flex items-center gap-1 rounded-full p-1 border w-full sm:w-auto ${
              isLight ? 'bg-slate-100 border-slate-200' : 'bg-[#070A12] border-white/10'
            }`}
          >
            <button
              type="button"
              onClick={() => setActiveTab('leaderboard')}
              className={`flex-1 sm:flex-none justify-center rounded-full px-3.5 py-1.5 text-xs font-bold transition flex items-center gap-1.5 ${
                activeTab === 'leaderboard'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : isLight
                    ? 'text-slate-600 hover:text-slate-900'
                    : 'text-slate-400 hover:text-white'
              }`}
            >
              <Trophy size={13} />
              Leaderboard ({leaderboard.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('candidates')}
              className={`flex-1 sm:flex-none justify-center rounded-full px-3.5 py-1.5 text-xs font-bold transition flex items-center gap-1.5 ${
                activeTab === 'candidates'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : isLight
                    ? 'text-slate-600 hover:text-slate-900'
                    : 'text-slate-400 hover:text-white'
              }`}
            >
              <Users size={13} />
              All Candidates ({allCandidates.length || totalUsers})
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative w-full sm:w-60 lg:w-72">
            <Search size={14} className="absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search candidate name..."
              className={`w-full rounded-full border py-1.5 pl-8 pr-3 text-xs focus:border-blue-500 focus:outline-none transition ${
                isLight
                  ? 'border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400'
                  : 'border-white/10 bg-[#070A12] text-white placeholder:text-slate-500'
              }`}
            />
          </div>
        </div>

        {/* Scrollable Results Area */}
        <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-3 sm:p-6 space-y-3 pb-[calc(1rem+env(safe-area-inset-bottom,0px))]">
          {activeTab === 'leaderboard' ? (
            filteredLeaderboard.length === 0 ? (
              <div className="py-12 text-center text-slate-400">
                <Trophy size={36} className="mx-auto text-slate-400 mb-2 opacity-60" />
                <p className={`text-sm font-semibold ${isLight ? 'text-slate-800' : 'text-white'}`}>
                  No test submissions match your search.
                </p>
                <p className={`text-xs mt-1 ${isLight ? 'text-slate-500' : 'text-slate-500'}`}>
                  Submit an examination attempt to earn a spot on the national leaderboard!
                </p>
              </div>
            ) : (
              <>
                {/* Mobile View (< sm): Responsive Compact Cards (No Horizontal Clipping) */}
                <div className="block sm:hidden space-y-2">
                  {filteredLeaderboard.map((item, index) => {
                    const isCurrentUser =
                      currentUserEmail &&
                      item.email &&
                      item.email.toLowerCase() === currentUserEmail.toLowerCase();
                    const rank = item.rank || index + 1;
                    const maxScore = item.maxScore || 240;
                    const pct = Math.round(((item.score || 0) / maxScore) * 100);

                    return (
                      <div
                        key={item.id || index}
                        className={`rounded-2xl border p-3 transition space-y-2 ${
                          isCurrentUser
                            ? isLight
                              ? 'border-blue-400 bg-blue-50/80 shadow-xs'
                              : 'border-blue-500/50 bg-blue-900/15'
                            : isLight
                              ? 'border-slate-200 bg-white hover:border-slate-300 shadow-xs'
                              : 'border-white/10 bg-[#0D121F] hover:border-white/20'
                        }`}
                      >
                        {/* Top: Rank, Candidate Name, and Score */}
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2 min-w-0">
                            <span
                              className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-black font-mono shadow-xs ${
                                rank === 1
                                  ? 'bg-amber-400 text-slate-950 font-black'
                                  : rank === 2
                                    ? 'bg-slate-200 text-slate-900 font-black'
                                    : rank === 3
                                      ? 'bg-amber-700 text-white font-black'
                                      : isLight
                                        ? 'bg-slate-100 text-slate-700'
                                        : 'bg-white/10 text-slate-300'
                              }`}
                            >
                              {rank === 1 ? '1' : rank === 2 ? '2' : rank === 3 ? '3' : rank}
                            </span>
                            <div className="min-w-0">
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <span className={`text-xs font-bold truncate max-w-[140px] xs:max-w-[180px] ${
                                  isLight ? 'text-slate-900' : 'text-white'
                                }`}>
                                  {item.studentName || 'Anonymous Student'}
                                </span>
                                {isCurrentUser && (
                                  <span className={`rounded-full px-1.5 py-0.2 text-[9px] font-bold ${
                                    isLight ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'
                                  }`}>
                                    You
                                  </span>
                                )}
                              </div>
                              {isAdmin && item.email && (
                                <p className="text-[10px] text-slate-500 truncate">{item.email}</p>
                              )}
                            </div>
                          </div>

                          <div className="text-right shrink-0">
                            <div className="flex items-baseline justify-end gap-1">
                              <span className={`font-serif font-black text-sm ${isLight ? 'text-slate-900' : 'text-white'}`}>
                                {item.score}
                              </span>
                              <span className="text-[10px] text-slate-500">/ {maxScore}</span>
                            </div>
                            <span className={`block font-mono text-[10px] font-bold ${isLight ? 'text-blue-700' : 'text-blue-400'}`}>
                              {pct}%
                            </span>
                          </div>
                        </div>

                        {/* Bottom: Accuracy Pill, Question Breakdown, and Submission Date */}
                        <div
                          className={`flex items-center justify-between border-t pt-2 text-[11px] ${
                            isLight ? 'border-slate-100 text-slate-600' : 'border-white/5 text-slate-400'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span
                              className={`rounded-full border px-2 py-0.5 text-[10px] font-bold ${
                                isLight
                                  ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
                                  : 'border-emerald-500/30 bg-emerald-500/15 text-emerald-300'
                              }`}
                            >
                              {item.accuracy ? `${item.accuracy}% Acc` : '—'}
                            </span>
                            <span className="font-mono text-[10px]">
                              <span className={`font-bold ${isLight ? 'text-emerald-700' : 'text-emerald-400'}`}>
                                +{item.correctCount || item.correct || 0}
                              </span>
                              <span className="text-slate-400 mx-0.5">/</span>
                              <span className={`font-bold ${isLight ? 'text-rose-700' : 'text-rose-400'}`}>
                                -{item.wrongCount || item.wrong || 0}
                              </span>
                            </span>
                          </div>
                          <span className="text-[10px] text-slate-500">{formatDateSafe(item.submittedAt)}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Desktop View (>= sm): Standard Responsive Table */}
                <div
                  className={`hidden sm:block overflow-x-auto rounded-2xl border ${
                    isLight ? 'border-slate-200 bg-white shadow-xs' : 'border-white/10 bg-[#0B0F19]'
                  }`}
                >
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr
                        className={`border-b text-[11px] font-semibold uppercase tracking-wider ${
                          isLight
                            ? 'border-slate-200 bg-slate-100 text-slate-700'
                            : 'border-white/10 bg-[#070A12] text-slate-400'
                        }`}
                      >
                        <th className="px-4 py-3">Rank</th>
                        <th className="px-4 py-3">Candidate Name</th>
                        <th className="px-4 py-3">Score / 240</th>
                        <th className="px-4 py-3">Accuracy</th>
                        <th className="px-4 py-3">Breakdown</th>
                        <th className="px-4 py-3">Submission Date</th>
                      </tr>
                    </thead>
                    <tbody
                      className={`divide-y ${
                        isLight ? 'divide-slate-100 bg-white' : 'divide-white/5 bg-[#0D121F]'
                      }`}
                    >
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
                                ? isLight
                                  ? 'bg-blue-50/80 border-l-2 border-l-blue-600'
                                  : 'bg-blue-600/10 border-l-2 border-l-blue-500'
                                : isLight
                                  ? 'hover:bg-slate-50'
                                  : 'hover:bg-white/[0.02]'
                            }`}
                          >
                            <td className="px-4 py-3.5">
                              <div className="flex items-center gap-1.5 font-mono font-black">
                                {rank === 1 ? (
                                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-400 text-slate-950 text-xs font-black shadow-xs">
                                    🥇
                                  </span>
                                ) : rank === 2 ? (
                                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-200 text-slate-900 text-xs font-black">
                                    🥈
                                  </span>
                                ) : rank === 3 ? (
                                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-700 text-white text-xs font-black">
                                    🥉
                                  </span>
                                ) : (
                                  <span className={`pl-1 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                                    #{rank}
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="px-4 py-3.5">
                              <div
                                className={`font-semibold flex items-center gap-2 ${
                                  isLight ? 'text-slate-900' : 'text-white'
                                }`}
                              >
                                <span>{item.studentName || 'Anonymous Student'}</span>
                                {isCurrentUser && (
                                  <span
                                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                                      isLight
                                        ? 'bg-blue-100 border border-blue-300 text-blue-800'
                                        : 'bg-blue-500/20 border border-blue-500/30 text-blue-300'
                                    }`}
                                  >
                                    You
                                  </span>
                                )}
                              </div>
                              {isAdmin && item.email && (
                                <p className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-slate-500'}`}>
                                  {item.email}
                                </p>
                              )}
                            </td>
                            <td className="px-4 py-3.5">
                              <span
                                className={`font-serif text-sm font-black ${
                                  isLight ? 'text-slate-900' : 'text-white'
                                }`}
                              >
                                {item.score}
                              </span>
                              <span className="text-[11px] text-slate-500"> / {item.maxScore || 240}</span>
                              <span
                                className={`ml-1.5 font-mono text-[11px] ${
                                  isLight ? 'text-blue-700' : 'text-blue-400'
                                }`}
                              >
                                ({Math.round(((item.score || 0) / (item.maxScore || 240)) * 100)}%)
                              </span>
                            </td>
                            <td
                              className={`px-4 py-3.5 font-semibold ${
                                isLight ? 'text-emerald-700' : 'text-emerald-400'
                              }`}
                            >
                              {item.accuracy ? `${item.accuracy}%` : '—'}
                            </td>
                            <td className="px-4 py-3.5">
                              <div className="flex items-center gap-1 font-mono text-[11px]">
                                <span className={`font-bold ${isLight ? 'text-emerald-700' : 'text-emerald-400'}`}>
                                  +{item.correctCount || item.correct || 0}
                                </span>
                                <span className="text-slate-400">/</span>
                                <span className={`font-bold ${isLight ? 'text-rose-700' : 'text-rose-400'}`}>
                                  -{item.wrongCount || item.wrong || 0}
                                </span>
                              </div>
                            </td>
                            <td
                              className={`px-4 py-3.5 text-[11px] ${
                                isLight ? 'text-slate-500' : 'text-slate-400'
                              }`}
                            >
                              {formatDateSafe(item.submittedAt)}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </>
            )
          ) : (
            /* CANDIDATES DIRECTORY TAB */
            filteredCandidates.length === 0 ? (
              <div className="py-12 text-center text-slate-400">
                <Users size={36} className="mx-auto text-slate-400 mb-2 opacity-60" />
                <p className={`text-sm font-semibold ${isLight ? 'text-slate-800' : 'text-white'}`}>
                  No registered candidates found.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {filteredCandidates.map((cand, idx) => {
                  const isCurrent =
                    currentUserEmail &&
                    cand.email &&
                    cand.email.toLowerCase() === currentUserEmail.toLowerCase();

                  return (
                    <div
                      key={cand.id || idx}
                      className={`rounded-2xl border p-3.5 sm:p-4 transition ${
                        isCurrent
                          ? isLight
                            ? 'border-blue-300 bg-blue-50/70 shadow-xs'
                            : 'border-blue-500/40 bg-blue-900/10'
                          : isLight
                            ? 'border-slate-200 bg-white hover:border-slate-300 shadow-xs'
                            : 'border-white/10 bg-[#0D121F] hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <h4 className={`font-bold text-xs sm:text-sm truncate ${isLight ? 'text-slate-900' : 'text-white'}`}>
                              {cand.name}
                            </h4>
                            {isCurrent && (
                              <span
                                className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                                  isLight
                                    ? 'bg-blue-100 border border-blue-300 text-blue-800'
                                    : 'bg-blue-500/20 border border-blue-500/30 text-blue-300'
                                }`}
                              >
                                You
                              </span>
                            )}
                          </div>
                          {isAdmin && cand.email && (
                            <p className={`text-xs mt-0.5 truncate ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                              {cand.email}
                            </p>
                          )}
                        </div>
                        <span
                          className={`shrink-0 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold ${
                            isLight
                              ? 'border-slate-200 bg-slate-100 text-slate-700'
                              : 'border-white/10 bg-white/5 text-slate-300'
                          }`}
                        >
                          {cand.targetExam || 'NEET 2027'}
                        </span>
                      </div>
                      <div
                        className={`mt-3 flex items-center justify-between border-t pt-2.5 text-[11px] ${
                          isLight ? 'border-slate-100 text-slate-500' : 'border-white/5 text-slate-500'
                        }`}
                      >
                        <span>
                          {isAdmin && cand.registeredAt
                            ? `Joined: ${formatDateSafe(cand.registeredAt)}`
                            : 'Verified Candidate'}
                        </span>
                        <span className={`font-semibold flex items-center gap-1 ${
                          isLight ? 'text-emerald-700' : 'text-emerald-400'
                        }`}>
                          <CheckCircle2 size={12} />
                          Active
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )
          )}
        </div>

        {/* Modal Footer (Desktop only, minimal) */}
        <div
          className={`hidden sm:flex shrink-0 items-center justify-between border-t px-6 py-3 text-xs transition-colors ${
            isLight ? 'border-slate-200 bg-slate-50 text-slate-600' : 'border-white/10 bg-[#070A12] text-slate-400'
          }`}
        >
          <span className="text-[11px] text-slate-500">
            Leaderboard rankings reflect verified examination attempts.
          </span>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-blue-600 hover:bg-blue-500 px-5 py-1.5 text-xs font-bold text-white transition shadow-xs active:scale-95"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );

  // Render modal inside document.body portal to guarantee full-viewport stacking over entire app
  return typeof document !== 'undefined' ? createPortal(modalContent, document.body) : null;
}
