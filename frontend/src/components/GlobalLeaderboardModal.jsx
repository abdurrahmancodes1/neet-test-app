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
        className={`relative flex h-[100dvh] max-h-[100dvh] w-full flex-col overflow-hidden transition-all duration-200 sm:h-auto sm:max-h-[88vh] sm:max-w-4xl sm:rounded-lg lg:max-w-5xl shadow-2xl font-mono ${
          isLight
            ? 'border-slate-300 bg-white text-slate-900 sm:border'
            : 'border-blue-900/40 bg-[#080D1A] text-slate-100 sm:border'
        }`}
      >
        {/* Compact Cyber Header */}
        <div
          className={`flex shrink-0 items-center justify-between gap-3 border-b px-4 py-3 sm:px-6 sm:py-3.5 transition-colors ${
            isLight ? 'border-slate-300 bg-slate-50' : 'border-blue-900/40 bg-[#060A14]'
          }`}
        >
          <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-blue-600/20 text-blue-400 border border-blue-500/30">
              <Globe size={16} />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2
                  id="global-leaderboard-title"
                  className={`truncate font-mono text-sm sm:text-base font-bold uppercase tracking-wider ${
                    isLight ? 'text-slate-900' : 'text-slate-100'
                  }`}
                >
                  GLOBAL CANDIDATES &amp; SCORES
                </h2>
                <span className="inline-flex shrink-0 items-center gap-1 rounded bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-mono font-bold uppercase text-emerald-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  LIVE SYNC
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
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded border transition active:scale-95 ${
              isLight
                ? 'border-slate-300 bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                : 'border-blue-900/40 bg-[#0B1020] text-slate-400 hover:bg-blue-900/20 hover:text-white'
            }`}
          >
            <X size={16} />
          </button>
        </div>

        {/* Compact Statistics Grid */}
        <div
          className={`grid shrink-0 grid-cols-2 gap-2 p-3 sm:grid-cols-4 sm:gap-2.5 sm:px-6 sm:py-3 border-b transition-colors font-mono ${
            isLight ? 'bg-slate-100/70 border-slate-300' : 'bg-[#060A14] border-blue-900/40'
          }`}
        >
          <div
            className={`rounded border p-2 sm:p-2.5 text-center ${
              isLight ? 'border-slate-300 bg-white shadow-xs' : 'border-blue-900/40 bg-[#080D1A]'
            }`}
          >
            <p
              className={`text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-1 ${
                isLight ? 'text-slate-500' : 'text-slate-400'
              }`}
            >
              <Users size={11} className="text-blue-400" /> TOTAL USERS
            </p>
            <p className={`mt-0.5 font-mono text-lg sm:text-xl font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
              {totalUsers}
            </p>
          </div>

          <div
            className={`rounded border p-2 sm:p-2.5 text-center ${
              isLight ? 'border-slate-300 bg-white shadow-xs' : 'border-blue-900/40 bg-[#080D1A]'
            }`}
          >
            <p
              className={`text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-1 ${
                isLight ? 'text-slate-500' : 'text-slate-400'
              }`}
            >
              <Zap size={11} className="text-indigo-400" /> TESTS SUBMITTED
            </p>
            <p className={`mt-0.5 font-mono text-lg sm:text-xl font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
              {totalAttempts}
            </p>
          </div>

          <div
            className={`rounded border p-2 sm:p-2.5 text-center ${
              isLight ? 'border-slate-300 bg-white shadow-xs' : 'border-blue-900/40 bg-[#080D1A]'
            }`}
          >
            <p
              className={`text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-1 ${
                isLight ? 'text-slate-500' : 'text-slate-400'
              }`}
            >
              <Sparkles size={11} className="text-amber-400" /> TOP SCORE
            </p>
            <p className={`mt-0.5 font-mono text-lg sm:text-xl font-bold ${isLight ? 'text-amber-600' : 'text-amber-300'}`}>
              {highestScore} <span className="text-[10px] text-slate-500 font-normal">/ 240</span>
            </p>
          </div>

          <div
            className={`rounded border p-2 sm:p-2.5 text-center ${
              isLight ? 'border-slate-300 bg-white shadow-xs' : 'border-blue-900/40 bg-[#080D1A]'
            }`}
          >
            <p
              className={`text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-1 ${
                isLight ? 'text-slate-500' : 'text-slate-400'
              }`}
            >
              <Target size={11} className="text-emerald-400" /> AVERAGE
            </p>
            <p className={`mt-0.5 font-mono text-lg sm:text-xl font-bold ${isLight ? 'text-emerald-600' : 'text-emerald-300'}`}>
              {avgScore} <span className="text-[10px] text-slate-500 font-normal">pts</span>
            </p>
          </div>
        </div>

        {/* Toolbar: Navigation Tabs & Search Box */}
        <div
          className={`flex shrink-0 flex-col gap-2.5 p-3 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-2.5 border-b transition-colors font-mono ${
            isLight ? 'bg-white border-slate-300' : 'bg-[#080D1A] border-blue-900/40'
          }`}
        >
          {/* Tabs */}
          <div
            className={`flex items-center gap-1 rounded p-1 border w-full sm:w-auto ${
              isLight ? 'bg-slate-100 border-slate-300' : 'bg-[#060A14] border-blue-900/40'
            }`}
          >
            <button
              type="button"
              onClick={() => setActiveTab('leaderboard')}
              className={`flex-1 sm:flex-none justify-center rounded px-3 py-1.5 text-xs font-mono font-bold uppercase tracking-wider transition flex items-center gap-1.5 ${
                activeTab === 'leaderboard'
                  ? 'bg-blue-600/30 text-blue-200 border border-blue-500/50 shadow-xs'
                  : isLight
                    ? 'text-slate-600 hover:text-slate-900 border border-transparent'
                    : 'text-slate-400 hover:text-white border border-transparent'
              }`}
            >
              <Trophy size={13} />
              Leaderboard ({leaderboard.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('candidates')}
              className={`flex-1 sm:flex-none justify-center rounded px-3 py-1.5 text-xs font-mono font-bold uppercase tracking-wider transition flex items-center gap-1.5 ${
                activeTab === 'candidates'
                  ? 'bg-blue-600/30 text-blue-200 border border-blue-500/50 shadow-xs'
                  : isLight
                    ? 'text-slate-600 hover:text-slate-900 border border-transparent'
                    : 'text-slate-400 hover:text-white border border-transparent'
              }`}
            >
              <Users size={13} />
              Candidates ({allCandidates.length || totalUsers})
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative w-full sm:w-60 lg:w-72">
            <Search size={13} className="absolute left-2.5 top-2.5 text-slate-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="SEARCH CANDIDATE..."
              className={`w-full rounded border py-1.5 pl-8 pr-3 text-xs font-mono uppercase focus:border-blue-500 focus:outline-none transition ${
                isLight
                  ? 'border-slate-300 bg-white text-slate-900 placeholder:text-slate-400'
                  : 'border-blue-900/40 bg-[#060A14] text-slate-100 placeholder:text-slate-600'
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
                        className={`rounded-md border p-3 transition space-y-2 font-mono ${
                          isCurrentUser
                            ? isLight
                              ? 'border-blue-400 bg-blue-50/80 shadow-xs'
                              : 'border-blue-500/50 bg-blue-900/15'
                            : isLight
                              ? 'border-slate-300 bg-white hover:border-slate-400 shadow-xs'
                              : 'border-blue-900/40 bg-[#060A14] hover:border-blue-700/60'
                        }`}
                      >
                        {/* Top: Rank, Candidate Name, and Score */}
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2 min-w-0">
                            <span
                              className={`flex h-6 w-6 shrink-0 items-center justify-center rounded text-xs font-mono font-bold ${
                                rank === 1
                                  ? 'bg-amber-400 text-slate-950'
                                  : rank === 2
                                    ? 'bg-slate-300 text-slate-900'
                                    : rank === 3
                                      ? 'bg-amber-700 text-white'
                                      : isLight
                                        ? 'bg-slate-100 text-slate-700 border border-slate-300'
                                        : 'bg-[#0B1020] text-slate-300 border border-blue-900/40'
                              }`}
                            >
                              {rank === 1 ? '1' : rank === 2 ? '2' : rank === 3 ? '3' : rank}
                            </span>
                            <div className="min-w-0">
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <span className={`text-xs font-bold truncate max-w-[140px] xs:max-w-[180px] ${
                                  isLight ? 'text-slate-900' : 'text-slate-100'
                                }`}>
                                  {item.studentName || 'Anonymous Student'}
                                </span>
                                {isCurrentUser && (
                                  <span className="rounded px-1.5 py-0.2 text-[9px] font-mono font-bold uppercase bg-blue-600 text-white">
                                    YOU
                                  </span>
                                )}
                              </div>
                              {isAdmin && item.email && (
                                <p className="text-[10px] text-slate-500 truncate font-mono">{item.email}</p>
                              )}
                            </div>
                          </div>

                          <div className="text-right shrink-0 font-mono">
                            <div className="flex items-baseline justify-end gap-1">
                              <span className={`font-mono font-bold text-sm ${isLight ? 'text-slate-900' : 'text-slate-100'}`}>
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
                          className={`flex items-center justify-between border-t pt-2 text-[11px] font-mono ${
                            isLight ? 'border-slate-200 text-slate-600' : 'border-blue-900/30 text-slate-400'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span
                              className={`rounded border px-1.5 py-0.5 text-[10px] font-mono font-bold uppercase ${
                                isLight
                                  ? 'border-emerald-300 bg-emerald-50 text-emerald-800'
                                  : 'border-emerald-500/40 bg-emerald-500/15 text-emerald-300'
                              }`}
                            >
                              {item.accuracy ? `${item.accuracy}% ACC` : '—'}
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
                          <span className="text-[10px] text-slate-500 font-mono">{formatDateSafe(item.submittedAt)}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Desktop View (>= sm): Standard Responsive Table */}
                <div
                  className={`hidden sm:block overflow-x-auto rounded-md border font-mono ${
                    isLight ? 'border-slate-300 bg-white shadow-xs' : 'border-blue-900/40 bg-[#080D1A]'
                  }`}
                >
                  <table className="w-full text-left text-xs font-mono">
                    <thead>
                      <tr
                        className={`border-b text-[10px] font-bold uppercase tracking-wider ${
                          isLight
                            ? 'border-slate-300 bg-slate-100 text-slate-700'
                            : 'border-blue-900/40 bg-[#060A14] text-slate-400'
                        }`}
                      >
                        <th className="px-4 py-3">RANK</th>
                        <th className="px-4 py-3">CANDIDATE NAME</th>
                        <th className="px-4 py-3">SCORE / 240</th>
                        <th className="px-4 py-3">ACCURACY</th>
                        <th className="px-4 py-3">BREAKDOWN</th>
                        <th className="px-4 py-3">SUBMITTED</th>
                      </tr>
                    </thead>
                    <tbody
                      className={`divide-y ${
                        isLight ? 'divide-slate-200 bg-white' : 'divide-blue-900/20 bg-[#080D1A]'
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
                                  : 'hover:bg-blue-900/10'
                            }`}
                          >
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-1.5 font-mono font-bold">
                                {rank === 1 ? (
                                  <span className="flex h-5 w-5 items-center justify-center rounded bg-amber-400 text-slate-950 text-xs font-bold">
                                    1
                                  </span>
                                ) : rank === 2 ? (
                                  <span className="flex h-5 w-5 items-center justify-center rounded bg-slate-300 text-slate-900 text-xs font-bold">
                                    2
                                  </span>
                                ) : rank === 3 ? (
                                  <span className="flex h-5 w-5 items-center justify-center rounded bg-amber-700 text-white text-xs font-bold">
                                    3
                                  </span>
                                ) : (
                                  <span className={`pl-1 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                                    #{rank}
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <div
                                className={`font-semibold flex items-center gap-2 ${
                                  isLight ? 'text-slate-900' : 'text-slate-200'
                                }`}
                              >
                                <span>{item.studentName || 'Anonymous Student'}</span>
                                {isCurrentUser && (
                                  <span
                                    className="rounded px-1.5 py-0.2 text-[9px] font-mono font-bold uppercase bg-blue-600 text-white"
                                  >
                                    YOU
                                  </span>
                                )}
                              </div>
                              {isAdmin && item.email && (
                                <p className="text-[11px] text-slate-500 font-mono">
                                  {item.email}
                                </p>
                              )}
                            </td>
                            <td className="px-4 py-3">
                              <span
                                className={`font-mono text-sm font-bold ${
                                  isLight ? 'text-slate-900' : 'text-white'
                                }`}
                              >
                                {item.score}
                              </span>
                              <span className="text-[11px] text-slate-500"> / {item.maxScore || 240}</span>
                              <span
                                className={`ml-1.5 font-mono text-[11px] font-bold ${
                                  isLight ? 'text-blue-700' : 'text-blue-400'
                                }`}
                              >
                                ({Math.round(((item.score || 0) / (item.maxScore || 240)) * 100)}%)
                              </span>
                            </td>
                            <td
                              className={`px-4 py-3 font-mono font-bold ${
                                isLight ? 'text-emerald-700' : 'text-emerald-400'
                              }`}
                            >
                              {item.accuracy ? `${item.accuracy}%` : '—'}
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-1 font-mono text-[11px]">
                                <span className={`font-bold ${isLight ? 'text-emerald-700' : 'text-emerald-400'}`}>
                                  +{item.correctCount || item.correct || 0}
                                </span>
                                <span className="text-slate-500">/</span>
                                <span className={`font-bold ${isLight ? 'text-rose-700' : 'text-rose-400'}`}>
                                  -{item.wrongCount || item.wrong || 0}
                                </span>
                              </div>
                            </td>
                            <td
                              className={`px-4 py-3 text-[11px] font-mono ${
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
              <div className="py-12 text-center text-slate-400 font-mono">
                <Users size={36} className="mx-auto text-slate-400 mb-2 opacity-60" />
                <p className={`text-sm font-bold uppercase tracking-wider ${isLight ? 'text-slate-800' : 'text-white'}`}>
                  NO REGISTERED CANDIDATES FOUND
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 font-mono">
                {filteredCandidates.map((cand, idx) => {
                  const isCurrent =
                    currentUserEmail &&
                    cand.email &&
                    cand.email.toLowerCase() === currentUserEmail.toLowerCase();

                  return (
                    <div
                      key={cand.id || idx}
                      className={`rounded-md border p-3.5 transition font-mono ${
                        isCurrent
                          ? isLight
                            ? 'border-blue-400 bg-blue-50/70 shadow-xs'
                            : 'border-blue-500/40 bg-blue-900/15'
                          : isLight
                            ? 'border-slate-300 bg-white hover:border-slate-400 shadow-xs'
                            : 'border-blue-900/40 bg-[#060A14] hover:border-blue-700/60'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <h4 className={`font-bold text-xs sm:text-sm truncate uppercase tracking-wider ${isLight ? 'text-slate-900' : 'text-slate-100'}`}>
                              {cand.name}
                            </h4>
                            {isCurrent && (
                              <span
                                className="rounded px-1.5 py-0.2 text-[9px] font-mono font-bold uppercase bg-blue-600 text-white"
                              >
                                YOU
                              </span>
                            )}
                          </div>
                          {isAdmin && cand.email && (
                            <p className="text-xs mt-0.5 truncate text-slate-400 font-mono">
                              {cand.email}
                            </p>
                          )}
                        </div>
                        <span
                          className={`shrink-0 rounded border px-2 py-0.5 text-[10px] font-mono font-bold uppercase ${
                            isLight
                              ? 'border-slate-300 bg-slate-100 text-slate-700'
                              : 'border-blue-900/40 bg-[#0B1020] text-blue-300'
                          }`}
                        >
                          {cand.targetExam || 'NEET 2027'}
                        </span>
                      </div>
                      <div
                        className={`mt-3 flex items-center justify-between border-t pt-2 text-[11px] font-mono ${
                          isLight ? 'border-slate-200 text-slate-500' : 'border-blue-900/30 text-slate-400'
                        }`}
                      >
                        <span>
                          {isAdmin && cand.registeredAt
                            ? `JOINED: ${formatDateSafe(cand.registeredAt)}`
                            : 'VERIFIED CANDIDATE'}
                        </span>
                        <span className={`font-bold flex items-center gap-1 uppercase tracking-wider ${
                          isLight ? 'text-emerald-700' : 'text-emerald-400'
                        }`}>
                          <CheckCircle2 size={12} />
                          ACTIVE
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
          className={`hidden sm:flex shrink-0 items-center justify-between border-t px-6 py-2.5 text-xs transition-colors font-mono ${
            isLight ? 'border-slate-300 bg-slate-50 text-slate-600' : 'border-blue-900/40 bg-[#060A14] text-slate-400'
          }`}
        >
          <span className="text-[11px] text-slate-500">
            Leaderboard rankings reflect verified examination attempts.
          </span>
          <button
            type="button"
            onClick={onClose}
            className="rounded bg-blue-600 hover:bg-blue-500 px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-wider text-white transition shadow-xs active:scale-95"
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );

  // Render modal inside document.body portal to guarantee full-viewport stacking over entire app
  return typeof document !== 'undefined' ? createPortal(modalContent, document.body) : null;
}
