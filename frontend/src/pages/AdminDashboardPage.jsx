import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Users,
  UserCheck,
  Zap,
  Target,
  Search,
  ChevronDown,
  ChevronUp,
  Award,
  Clock,
  Calendar,
  Eye,
  LogOut,
  ArrowLeft,
  Sparkles,
  TrendingUp,
  RefreshCw,
  Layers,
} from 'lucide-react';
import { getAdminOverview } from '../utils/auth.js';
import { formatDuration } from '../utils/scoring.js';

export default function AdminDashboardPage({
  user,
  onGoToStudentDashboard,
  onLogout,
}) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all'); // 'all' | 'active' | 'inactive'
  const [expandedStudentId, setExpandedStudentId] = useState(null);

  const fetchOverview = async () => {
    setLoading(true);
    const res = await getAdminOverview();
    if (res) {
      setData(res);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOverview();
  }, []);

  const students = data?.students || [];
  const totalUsers = data?.totalUsers ?? students.length;
  const activeUsers = data?.activeUsers ?? students.filter((s) => s.totalAttempts > 0).length;
  const totalAttempts = data?.totalAttempts ?? 0;
  const averageScore = data?.averageScore ?? 0;

  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      (s.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (s.email || '').toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;
    if (filterType === 'active') return s.totalAttempts > 0;
    if (filterType === 'inactive') return s.totalAttempts === 0;
    return true;
  });

  return (
    <main className="min-h-screen bg-[#05070B] text-slate-100 px-4 py-4 sm:py-8 relative overflow-hidden selection:bg-blue-600 selection:text-white">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[480px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-600/15 via-indigo-900/5 to-transparent blur-2xl" />

      <div className="mx-auto max-w-5xl space-y-8 relative z-10 animate-fade-in">
        {/* Navigation Header */}
        <header className="rounded-full border border-white/10 bg-[#0D121F]/90 backdrop-blur-md px-4 sm:px-6 py-2.5 shadow-2xl flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 text-white shadow-glow">
              <ShieldCheck size={16} />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-sans text-sm sm:text-base font-bold text-white">
                Admin<span className="text-blue-500">Portal</span>
              </span>
              <span className="rounded-full bg-blue-500/20 border border-blue-500/30 px-2 py-0.5 text-[10px] font-bold text-blue-300">
                Administrator
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={fetchOverview}
              disabled={loading}
              title="Refresh Data"
              className="rounded-full border border-white/10 bg-white/5 p-2 text-slate-400 hover:text-white hover:bg-white/10 transition"
            >
              <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
            </button>

            <button
              type="button"
              onClick={onGoToStudentDashboard}
              className="rounded-full border border-blue-500/30 bg-blue-600/10 hover:bg-blue-600/20 text-blue-300 px-4 py-1.5 text-xs font-semibold transition flex items-center gap-1.5"
            >
              <ArrowLeft size={13} />
              <span>Student View</span>
            </button>

            {onLogout && (
              <button
                type="button"
                onClick={onLogout}
                title="Sign Out"
                className="rounded-full border border-white/10 bg-white/5 p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition"
              >
                <LogOut size={14} />
              </button>
            )}
          </div>
        </header>

        {/* Hero Title */}
        <section className="text-left space-y-1">
          <div className="flex items-center gap-2">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-blue-400">
              National Examination Control Center
            </p>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <h1 className="font-serif italic text-3xl sm:text-4xl text-white">
            Candidates &amp; Performance Overview
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Real-time analytics for all registered users, test attempts, and student learning progressions.
          </p>
        </section>

        {/* 4 Key Admin Stats Cards */}
        <section className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {/* Total Users */}
          <div className="rounded-2xl border border-white/10 bg-[#0B0F19] p-4 sm:p-5 shadow-xl">
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-400">
              <span>Total Users</span>
              <Users size={16} className="text-blue-400" />
            </div>
            <p className="mt-2 font-serif text-2xl sm:text-3xl font-bold text-white">
              {totalUsers}
            </p>
            <p className="mt-1 text-xs text-slate-400 font-medium">Registered Aspirants</p>
          </div>

          {/* Active Users */}
          <div className="rounded-2xl border border-white/10 bg-[#0B0F19] p-4 sm:p-5 shadow-xl">
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-400">
              <span>Active Users</span>
              <UserCheck size={16} className="text-emerald-400" />
            </div>
            <p className="mt-2 font-serif text-2xl sm:text-3xl font-bold text-emerald-400">
              {activeUsers}
            </p>
            <p className="mt-1 text-xs text-slate-400 font-medium">
              {totalUsers > 0 ? `${Math.round((activeUsers / totalUsers) * 100)}% Participation` : '0% Participation'}
            </p>
          </div>

          {/* Tests Submitted */}
          <div className="rounded-2xl border border-white/10 bg-[#0B0F19] p-4 sm:p-5 shadow-xl">
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-400">
              <span>Tests Taken</span>
              <Zap size={16} className="text-indigo-400" />
            </div>
            <p className="mt-2 font-serif text-2xl sm:text-3xl font-bold text-white">
              {totalAttempts}
            </p>
            <p className="mt-1 text-xs text-slate-400 font-medium">Completed 2-Hr Exams</p>
          </div>

          {/* Platform Average Score */}
          <div className="rounded-2xl border border-white/10 bg-[#0B0F19] p-4 sm:p-5 shadow-xl">
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-400">
              <span>Platform Avg</span>
              <Target size={16} className="text-amber-400" />
            </div>
            <p className="mt-2 font-serif text-2xl sm:text-3xl font-bold text-amber-400">
              {averageScore} <span className="text-xs text-slate-500 font-normal">/ 240</span>
            </p>
            <p className="mt-1 text-xs text-slate-400 font-medium">Mean Score Metric</p>
          </div>
        </section>

        {/* Students Directory & Progress Section */}
        <section className="rounded-3xl border border-white/10 bg-[#0B0F19] p-5 sm:p-8 shadow-xl space-y-5">
          {/* Header with Search and Filter */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div>
              <h2 className="font-sans text-lg sm:text-xl font-bold text-white">
                Student Progress Directory
              </h2>
              <p className="text-xs text-slate-400">
                Track each candidate's test attempts, latest score, peak performance, and accuracy.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {/* Filter Tabs */}
              <div className="flex items-center rounded-full bg-[#070A12] border border-white/10 p-1 text-xs">
                <button
                  type="button"
                  onClick={() => setFilterType('all')}
                  className={`rounded-full px-3 py-1 font-bold transition ${
                    filterType === 'all' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  All ({students.length})
                </button>
                <button
                  type="button"
                  onClick={() => setFilterType('active')}
                  className={`rounded-full px-3 py-1 font-bold transition ${
                    filterType === 'active' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Active ({activeUsers})
                </button>
                <button
                  type="button"
                  onClick={() => setFilterType('inactive')}
                  className={`rounded-full px-3 py-1 font-bold transition ${
                    filterType === 'inactive' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Inactive ({students.length - activeUsers})
                </button>
              </div>

              {/* Search Bar */}
              <div className="relative min-w-[200px]">
                <Search size={14} className="absolute left-3.5 top-2.5 text-slate-500" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search student name or email..."
                  className="w-full rounded-full border border-white/10 bg-[#070A12] py-1.5 pl-9 pr-3 text-xs text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Student List */}
          {loading ? (
            <div className="py-12 text-center text-slate-400">
              <RefreshCw size={24} className="mx-auto animate-spin text-blue-400 mb-2" />
              <p className="text-xs">Loading candidate directory from database...</p>
            </div>
          ) : filteredStudents.length === 0 ? (
            <div className="py-12 text-center text-slate-400">
              <Users size={32} className="mx-auto text-slate-600 mb-2" />
              <p className="text-sm font-semibold text-white">No candidates match your search.</p>
              <p className="text-xs text-slate-500">Registered students will appear here in real time.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredStudents.map((student) => {
                const isExpanded = expandedStudentId === student.id;
                const hasAttempts = student.totalAttempts > 0;

                return (
                  <div
                    key={student.id}
                    className="rounded-2xl border border-white/10 bg-[#0D121F] hover:border-white/20 transition overflow-hidden"
                  >
                    {/* Main Student Row */}
                    <div
                      onClick={() => setExpandedStudentId(isExpanded ? null : student.id)}
                      className="p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 cursor-pointer"
                    >
                      {/* Left: Name, Email & Role */}
                      <div className="flex items-center gap-3 min-w-[220px]">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-blue-600/20 border border-blue-500/30 text-blue-400 font-bold text-sm">
                          {student.name ? student.name.charAt(0).toUpperCase() : 'S'}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-white text-sm">{student.name}</h3>
                            {student.role === 'admin' ? (
                              <span className="rounded-full bg-amber-500/20 border border-amber-500/30 px-2 py-0.5 text-[10px] font-bold text-amber-300">
                                Admin
                              </span>
                            ) : (
                              <span className="rounded-full bg-blue-500/20 border border-blue-500/30 px-2 py-0.5 text-[10px] font-bold text-blue-300">
                                Student
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-400">{student.email}</p>
                        </div>
                      </div>

                      {/* Middle: Metrics */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs sm:text-right">
                        <div>
                          <span className="text-[10px] uppercase font-semibold text-slate-500 block">Tests</span>
                          <span className="font-mono font-bold text-white">{student.totalAttempts}</span>
                        </div>
                        <div>
                          <span className="text-[10px] uppercase font-semibold text-slate-500 block">Latest Score</span>
                          <span className="font-mono font-bold text-blue-400">
                            {student.latestScore !== null ? `${student.latestScore} / 240` : '—'}
                          </span>
                        </div>
                        <div>
                          <span className="text-[10px] uppercase font-semibold text-slate-500 block">Best Score</span>
                          <span className="font-mono font-bold text-amber-400">
                            {student.bestScore !== null ? `${student.bestScore} / 240` : '—'}
                          </span>
                        </div>
                        <div>
                          <span className="text-[10px] uppercase font-semibold text-slate-500 block">Avg Accuracy</span>
                          <span className="font-mono font-bold text-emerald-400">
                            {student.averageAccuracy !== null ? `${student.averageAccuracy}%` : '—'}
                          </span>
                        </div>
                      </div>

                      {/* Right: Expand Toggle */}
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          className="rounded-full border border-white/10 bg-white/5 p-1.5 text-slate-400 hover:text-white"
                        >
                          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                      </div>
                    </div>

                    {/* Expandable Attempts Drawer */}
                    {isExpanded && (
                      <div className="border-t border-white/10 bg-[#070A12] p-4 sm:p-5 space-y-3 animate-fade-in">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-white flex items-center gap-1.5">
                            <Layers size={14} className="text-blue-400" />
                            Attempt History for {student.name}
                          </span>
                          <span className="text-slate-400 text-[11px]">
                            Registered: {new Date(student.registeredAt).toLocaleDateString()}
                          </span>
                        </div>

                        {!hasAttempts ? (
                          <p className="text-xs text-slate-500 italic py-2">
                            This candidate has not taken any practice tests yet.
                          </p>
                        ) : (
                          <div className="overflow-x-auto rounded-xl border border-white/10">
                            <table className="w-full text-left text-xs">
                              <thead>
                                <tr className="border-b border-white/10 bg-[#0B0F19] text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                                  <th className="px-3.5 py-2.5">Attempt</th>
                                  <th className="px-3.5 py-2.5">Date</th>
                                  <th className="px-3.5 py-2.5">Score / 240</th>
                                  <th className="px-3.5 py-2.5">Accuracy</th>
                                  <th className="px-3.5 py-2.5">Correct / Wrong / Left</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-white/5 bg-[#090D17]">
                                {student.attempts.map((att, idx) => (
                                  <tr key={att.id || idx} className="hover:bg-white/[0.02]">
                                    <td className="px-3.5 py-2.5 font-mono font-bold text-white">
                                      #{student.attempts.length - idx}
                                    </td>
                                    <td className="px-3.5 py-2.5 text-slate-400">
                                      {new Date(att.submittedAt).toLocaleDateString(undefined, {
                                        month: 'short',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                      })}
                                    </td>
                                    <td className="px-3.5 py-2.5 font-bold text-white">
                                      <span className="text-blue-400">{att.score}</span> / {att.maxScore || 240}
                                    </td>
                                    <td className="px-3.5 py-2.5 font-semibold text-emerald-400">
                                      {att.accuracy}%
                                    </td>
                                    <td className="px-3.5 py-2.5 font-mono text-[11px]">
                                      <span className="text-emerald-400 font-bold">+{att.correct}</span>
                                      <span className="text-slate-600"> / </span>
                                      <span className="text-rose-400 font-bold">-{att.wrong}</span>
                                      <span className="text-slate-600"> / </span>
                                      <span className="text-slate-400">0({att.unattempted})</span>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
