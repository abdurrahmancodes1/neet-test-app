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
  CheckCircle2,
  AlertTriangle,
  FileCode,
  ArrowUpDown,
} from 'lucide-react';
import { getAdminOverview, formatISTDateTime } from '../utils/auth.js';
import { formatDuration } from '../utils/scoring.js';
import { useTheme } from '../utils/themeContext.jsx';
import AdminAttemptDetailModal from '../components/AdminAttemptDetailModal.jsx';
import AdminJsonImportSection from '../components/AdminJsonImportSection.jsx';

export default function AdminDashboardPage({
  user,
  onGoToStudentDashboard,
  onLogout,
  onDiagnoseAttempt,
  onTestCreated,
  onStartTest,
}) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all'); // 'all' | 'active' | 'inactive'
  const [sortBy, setSortBy] = useState('newest_registered'); // 'newest_registered' | 'oldest_registered' | 'most_attempts' | 'best_score' | 'name'
  const [activeAdminTab, setActiveAdminTab] = useState('candidates'); // 'candidates' | 'import'
  const [expandedStudentId, setExpandedStudentId] = useState(null);

  // Selected attempt for detailed diagnostics modal
  const [selectedAttempt, setSelectedAttempt] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Unified global theme
  const { theme, isLight } = useTheme();

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
  const activeUsers = data?.activeUsers ?? students.filter((s) => (s.totalAttempts || 0) > 0).length;
  const totalAttempts = data?.totalAttempts ?? 0;
  const averageScore = data?.averageScore ?? 0;

  const filteredStudents = students
    .filter((s) => {
      const matchesSearch =
        (s.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (s.email || '').toLowerCase().includes(searchTerm.toLowerCase());

      if (!matchesSearch) return false;
      if (filterType === 'active') return (s.totalAttempts || 0) > 0;
      if (filterType === 'inactive') return (s.totalAttempts || 0) === 0;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'newest_registered') {
        const tA = new Date(a.registeredAt || a.createdAt || 0).getTime() || 0;
        const tB = new Date(b.registeredAt || b.createdAt || 0).getTime() || 0;
        return tB - tA;
      }
      if (sortBy === 'oldest_registered') {
        const tA = new Date(a.registeredAt || a.createdAt || 0).getTime() || 0;
        const tB = new Date(b.registeredAt || b.createdAt || 0).getTime() || 0;
        return tA - tB;
      }
      if (sortBy === 'most_attempts') {
        return (b.totalAttempts || 0) - (a.totalAttempts || 0);
      }
      if (sortBy === 'best_score') {
        return (b.bestScore ?? -1) - (a.bestScore ?? -1);
      }
      if (sortBy === 'name') {
        return (a.name || '').localeCompare(b.name || '');
      }
      return 0;
    });

  const formatDateSafe = (ts) => {
    if (!ts) return 'Recent';
    try {
      const d = new Date(ts);
      return isNaN(d.getTime()) ? 'Recent' : d.toLocaleDateString();
    } catch {
      return 'Recent';
    }
  };

  const formatDateTimeSafe = (ts) => {
    if (!ts) return 'Recent';
    try {
      const d = new Date(ts);
      return isNaN(d.getTime())
        ? 'Recent'
        : d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    } catch {
      return 'Recent';
    }
  };

  const formatAcc = (val) => {
    const num = Number(val);
    return isNaN(num) ? '0' : num.toFixed(1);
  };

  const handleInspectAttempt = (att, student) => {
    if (onDiagnoseAttempt) {
      onDiagnoseAttempt(att, student);
    } else {
      setSelectedAttempt(att);
      setSelectedStudent(student);
    }
  };

  return (
    <main
      className={`min-h-screen px-3 sm:px-6 py-4 sm:py-8 relative overflow-hidden selection:bg-blue-600 selection:text-white transition-colors duration-200 ${
        isLight ? 'bg-[#F8FAFC] text-slate-900' : 'bg-[#050811] text-slate-100'
      }`}
    >
      {/* Background technical cyber grid overlay */}
      <div
        className={`pointer-events-none fixed inset-0 z-0 ${
          isLight ? 'bg-cyber-grid opacity-60' : 'bg-cyber-grid opacity-80'
        }`}
      />

      {/* Ambient background glow */}
      <div
        className={`pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[480px] blur-3xl z-0 ${
          isLight
            ? 'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-500/10 via-indigo-500/5 to-transparent'
            : 'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-600/15 via-blue-950/20 to-transparent'
        }`}
      />

      <div className="mx-auto max-w-5xl space-y-6 sm:space-y-8 relative z-10 animate-fade-in">
        {/* Navigation Header */}
        <header
          className={`rounded-xl border backdrop-blur-md px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 transition-colors ${
            isLight
              ? 'bg-white/95 border-slate-200 text-slate-900 shadow-xs'
              : 'bg-[#080D1A]/95 border-blue-900/40 text-white shadow-lg shadow-black/40'
          }`}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-blue-600/20 border border-blue-500/40 text-blue-400">
              <ShieldCheck size={18} />
            </div>
            <div className="flex items-center gap-2 min-w-0">
              <span className="font-mono text-sm sm:text-base font-bold tracking-tight text-white">
                Admin<span className="text-blue-500">Portal</span>
              </span>
              <span className="rounded border border-blue-800/50 bg-blue-950/60 px-2 py-0.5 text-[10px] font-mono font-semibold text-blue-300 uppercase tracking-wider">
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
              className={`rounded-md border p-2 transition ${
                isLight
                  ? 'border-slate-200 bg-slate-100 hover:bg-slate-200 text-slate-600'
                  : 'border-blue-900/40 bg-[#0A1020] hover:bg-blue-900/20 text-slate-400 hover:text-white'
              }`}
            >
              <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
            </button>

            <button
              type="button"
              onClick={onGoToStudentDashboard}
              className={`rounded-md border px-3.5 sm:px-4 py-1.5 text-xs font-mono font-semibold transition flex items-center gap-1.5 ${
                isLight
                  ? 'border-blue-300 bg-blue-50 hover:bg-blue-100 text-blue-700'
                  : 'border-blue-900/40 bg-[#0A1020] hover:bg-blue-900/20 hover:border-blue-500/40 text-slate-300'
              }`}
            >
              <ArrowLeft size={13} />
              <span>Student View</span>
            </button>

            {onLogout && (
              <button
                type="button"
                onClick={onLogout}
                title="Sign Out"
                className={`rounded-md border p-2 transition ${
                  isLight
                    ? 'border-slate-200 bg-slate-100 text-slate-500 hover:text-rose-600 hover:bg-rose-50'
                    : 'border-blue-900/40 bg-[#0A1020] hover:bg-rose-950/30 hover:border-rose-500/40 text-slate-400 hover:text-rose-400'
                }`}
              >
                <LogOut size={14} />
              </button>
            )}
          </div>
        </header>

        {/* Hero Title */}
        <section className="text-left space-y-1.5">
          <div className="flex items-center gap-2">
            <p className="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-blue-500 dark:text-blue-400">
              National Examination Control Center
            </p>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <div className="flex items-center gap-2.5 sm:gap-3">
            <span className="w-1.5 h-6 sm:h-7 bg-blue-500 shrink-0" />
            <h1 className={`font-mono text-xl sm:text-3xl font-bold tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
              Candidates &amp; Performance Overview
            </h1>
          </div>
          <p className={`font-mono text-xs sm:text-sm ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
            Real-time diagnostics for candidate attempts, weak/strong topics, and projected NEET scores.
          </p>
        </section>

        {/* 4 Key Admin Stats Cards */}
        <section className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {/* Total Users */}
          <div
            className={`rounded-lg border p-4 sm:p-5 relative overflow-hidden transition-colors ${
              isLight
                ? 'border-slate-200 border-l-2 border-l-blue-600 bg-white shadow-xs'
                : 'border-blue-900/40 border-l-2 border-l-blue-500 bg-[#080D1A] bg-cyber-grid shadow-lg'
            }`}
          >
            <div className="flex items-center justify-between font-mono text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              <span>Total Users</span>
              <Users size={16} className="text-blue-400" />
            </div>
            <p className={`mt-2 font-mono text-2xl sm:text-3xl font-bold tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
              {totalUsers}
            </p>
            <p className="mt-1 font-mono text-[11px] text-slate-400 font-medium">Registered Aspirants</p>
          </div>

          {/* Active Users */}
          <div
            className={`rounded-lg border p-4 sm:p-5 relative overflow-hidden transition-colors ${
              isLight
                ? 'border-slate-200 border-l-2 border-l-emerald-600 bg-white shadow-xs'
                : 'border-blue-900/40 border-l-2 border-l-emerald-500 bg-[#080D1A] bg-cyber-grid shadow-lg'
            }`}
          >
            <div className="flex items-center justify-between font-mono text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              <span>Active Users</span>
              <UserCheck size={16} className="text-emerald-400" />
            </div>
            <p className="mt-2 font-mono text-2xl sm:text-3xl font-bold tracking-tight text-emerald-600 dark:text-emerald-400">
              {activeUsers}
            </p>
            <p className="mt-1 font-mono text-[11px] text-slate-400 font-medium truncate">
              {totalUsers > 0 ? `${Math.round((activeUsers / totalUsers) * 100)}% Participation` : '0% Participation'}
            </p>
          </div>

          {/* Tests Taken */}
          <div
            className={`rounded-lg border p-4 sm:p-5 relative overflow-hidden transition-colors ${
              isLight
                ? 'border-slate-200 border-l-2 border-l-indigo-600 bg-white shadow-xs'
                : 'border-blue-900/40 border-l-2 border-l-blue-400 bg-[#080D1A] bg-cyber-grid shadow-lg'
            }`}
          >
            <div className="flex items-center justify-between font-mono text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              <span>Tests Taken</span>
              <Zap size={16} className="text-blue-400" />
            </div>
            <p className={`mt-2 font-mono text-2xl sm:text-3xl font-bold tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
              {totalAttempts}
            </p>
            <p className="mt-1 font-mono text-[11px] text-slate-400 font-medium">Completed CBT Exams</p>
          </div>

          {/* Platform Average Score */}
          <div
            className={`rounded-lg border p-4 sm:p-5 relative overflow-hidden transition-colors ${
              isLight
                ? 'border-slate-200 border-l-2 border-l-amber-600 bg-white shadow-xs'
                : 'border-blue-900/40 border-l-2 border-l-amber-500 bg-[#080D1A] bg-cyber-grid shadow-lg'
            }`}
          >
            <div className="flex items-center justify-between font-mono text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              <span>Platform Avg</span>
              <Target size={16} className="text-amber-400" />
            </div>
            <p className="mt-2 font-mono text-2xl sm:text-3xl font-bold tracking-tight text-amber-500 dark:text-amber-400">
              {averageScore}
            </p>
            <p className="mt-1 font-mono text-[11px] text-slate-400 font-medium">Mean Score Metric</p>
          </div>
        </section>

        {/* Navigation Tabs: Candidates Directory vs JSON Test Import */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-4 border-slate-200 dark:border-blue-900/40">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveAdminTab('candidates')}
              className={`rounded-md px-4 sm:px-5 py-2 text-xs font-mono font-bold transition flex items-center gap-2 shadow-xs ${
                activeAdminTab === 'candidates'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : isLight
                  ? 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-100'
                  : 'border border-blue-900/40 bg-[#080D1A] text-slate-300 hover:bg-blue-950/40 hover:border-blue-700/50'
              }`}
            >
              <Users size={14} />
              <span>Candidate Directory ({students.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveAdminTab('import')}
              className={`rounded-md px-4 sm:px-5 py-2 text-xs font-mono font-bold transition flex items-center gap-2 shadow-xs ${
                activeAdminTab === 'import'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : isLight
                  ? 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-100'
                  : 'border border-blue-900/40 bg-[#080D1A] text-slate-300 hover:bg-blue-950/40 hover:border-blue-700/50'
              }`}
            >
              <FileCode size={14} className={activeAdminTab === 'import' ? 'text-white' : 'text-blue-400'} />
              <span>Import Test via JSON (Inline SVG)</span>
            </button>
          </div>
        </div>

        {/* TAB CONTENT: Candidate Directory vs JSON Import */}
        {activeAdminTab === 'candidates' ? (
        /* Students Directory & Progress Section */
        <section
          className={`rounded-xl border p-4 sm:p-6 shadow-xl space-y-5 relative transition-colors ${
            isLight
              ? 'border-slate-200 bg-white shadow-sm'
              : 'border-blue-900/40 bg-[#060A14] bg-cyber-grid'
          }`}
        >
          {/* Header with Search and Filter */}
          <div
            className={`flex flex-wrap items-center justify-between gap-3 border-b pb-4 ${
              isLight ? 'border-slate-200' : 'border-blue-900/40'
            }`}
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-5 bg-blue-500 shrink-0" />
                <h2 className={`font-mono text-sm sm:text-base font-bold uppercase tracking-wider ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  STUDENT PROGRESS DIRECTORY
                </h2>
              </div>
              <p className={`font-mono text-xs mt-1 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                Click on any candidate to inspect attempt diagnostics, weak topics, and answers.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              {/* Filter Tabs Segmented Group */}
              <div
                className={`inline-flex rounded-md border text-xs font-mono overflow-hidden ${
                  isLight ? 'bg-slate-100 border-slate-200' : 'bg-[#080D1A] border-blue-900/40'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setFilterType('all')}
                  className={`px-3 py-1.5 font-bold transition text-[11px] sm:text-xs ${
                    filterType === 'all'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : isLight
                      ? 'text-slate-600 hover:text-slate-900'
                      : 'text-slate-400 hover:text-white hover:bg-blue-950/30'
                  }`}
                >
                  All ({students.length})
                </button>
                <button
                  type="button"
                  onClick={() => setFilterType('active')}
                  className={`px-3 py-1.5 font-bold transition text-[11px] sm:text-xs border-l ${
                    isLight ? 'border-slate-200' : 'border-blue-900/40'
                  } ${
                    filterType === 'active'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : isLight
                      ? 'text-slate-600 hover:text-slate-900'
                      : 'text-slate-400 hover:text-white hover:bg-blue-950/30'
                  }`}
                >
                  Active ({activeUsers})
                </button>
                <button
                  type="button"
                  onClick={() => setFilterType('inactive')}
                  className={`px-3 py-1.5 font-bold transition text-[11px] sm:text-xs border-l ${
                    isLight ? 'border-slate-200' : 'border-blue-900/40'
                  } ${
                    filterType === 'inactive'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : isLight
                      ? 'text-slate-600 hover:text-slate-900'
                      : 'text-slate-400 hover:text-white hover:bg-blue-950/30'
                  }`}
                >
                  Inactive ({students.length - activeUsers})
                </button>
              </div>

              {/* Search Bar */}
              <div className="relative flex-1 sm:w-60 min-w-[180px]">
                <Search size={14} className={`absolute left-3 top-2.5 ${isLight ? 'text-slate-400' : 'text-slate-500'}`} />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search student or email..."
                  className={`w-full rounded-md border py-1.5 pl-8 pr-3 text-xs font-mono focus:border-blue-500 focus:outline-none transition ${
                    isLight
                      ? 'border-slate-300 bg-slate-50 text-slate-900 placeholder:text-slate-400'
                      : 'border-blue-900/40 bg-[#080D1A] text-white placeholder:text-slate-500'
                  }`}
                />
              </div>

              {/* Sort Selector */}
              <div
                className={`flex items-center rounded-md border px-3 py-1.5 text-xs font-mono ${
                  isLight ? 'bg-slate-100 border-slate-200' : 'bg-[#080D1A] border-blue-900/40'
                }`}
              >
                <ArrowUpDown size={12} className="text-blue-400 mr-1.5 shrink-0" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  aria-label="Sort candidates by"
                  className={`bg-transparent text-xs font-mono font-medium focus:outline-none cursor-pointer ${
                    isLight ? 'text-slate-800' : 'text-slate-200'
                  }`}
                >
                  <option value="newest_registered" className={isLight ? 'bg-white' : 'bg-[#080D1A]'}>
                    Registered: Newest First
                  </option>
                  <option value="oldest_registered" className={isLight ? 'bg-white' : 'bg-[#080D1A]'}>
                    Registered: Oldest First
                  </option>
                  <option value="most_attempts" className={isLight ? 'bg-white' : 'bg-[#080D1A]'}>
                    Most Tests Taken
                  </option>
                  <option value="best_score" className={isLight ? 'bg-white' : 'bg-[#080D1A]'}>
                    Highest Score
                  </option>
                  <option value="name" className={isLight ? 'bg-white' : 'bg-[#080D1A]'}>
                    Candidate Name (A-Z)
                  </option>
                </select>
              </div>
            </div>
          </div>

          {/* Student List */}
          {loading ? (
            <div className={`py-12 text-center ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              <RefreshCw size={24} className="mx-auto animate-spin text-blue-500 mb-2" />
              <p className="font-mono text-xs">Loading candidate directory...</p>
            </div>
          ) : filteredStudents.length === 0 ? (
            <div className={`py-12 text-center ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              <Users size={32} className={`mx-auto mb-2 ${isLight ? 'text-slate-300' : 'text-slate-600'}`} />
              <p className={`font-mono text-sm font-semibold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                No candidates match your search.
              </p>
              <p className={`font-mono text-xs ${isLight ? 'text-slate-500' : 'text-slate-500'}`}>
                Registered candidates will appear here.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredStudents.map((student) => {
                const isExpanded = expandedStudentId === student.id;
                const hasAttempts = (student.totalAttempts || 0) > 0;

                return (
                  <div
                    key={student.id}
                    className={`rounded-lg border transition overflow-hidden ${
                      isLight
                        ? 'border-slate-200 bg-white hover:border-slate-300 shadow-xs'
                        : 'border-blue-900/40 bg-[#080D1A] hover:border-blue-700/50 shadow-md'
                    }`}
                  >
                    {/* Main Student Row */}
                    <div
                      onClick={() => setExpandedStudentId(isExpanded ? null : student.id)}
                      className="p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 cursor-pointer"
                    >
                      {/* Left: Name, Email & Role */}
                      <div className="flex items-center gap-3 min-w-[200px]">
                        <div
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-mono font-bold text-sm border ${
                            isLight
                              ? 'bg-blue-100 border-blue-200 text-blue-700'
                              : 'bg-blue-950/60 border-blue-500/30 text-blue-400'
                          }`}
                        >
                          {student.name ? student.name.charAt(0).toUpperCase() : 'S'}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className={`font-mono font-bold text-sm truncate ${isLight ? 'text-slate-900' : 'text-white'}`}>
                              {student.name}
                            </h3>
                            {student.role === 'admin' ? (
                              <span
                                className={`rounded px-1.5 py-0.5 text-[9px] font-mono font-bold border uppercase tracking-wider ${
                                  isLight
                                    ? 'bg-amber-100 border-amber-300 text-amber-800'
                                    : 'bg-amber-500/10 border-amber-500/40 text-amber-300'
                                }`}
                              >
                                Admin
                              </span>
                            ) : (
                              <span
                                className={`rounded px-1.5 py-0.5 text-[9px] font-mono font-semibold border uppercase tracking-wider ${
                                  isLight
                                    ? 'bg-blue-100 border-blue-200 text-blue-800'
                                    : 'bg-blue-950/60 border-blue-800/40 text-blue-300'
                                }`}
                              >
                                Student
                              </span>
                            )}
                          </div>
                          <p className={`font-mono text-xs truncate mt-0.5 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                            {student.email}
                          </p>
                          <div className="mt-1 flex items-center gap-1.5 font-mono text-[10px] text-slate-400">
                            <Calendar size={11} className="text-blue-400 shrink-0" />
                            <span className="text-slate-500 uppercase tracking-wider text-[9px]">Registered on</span>
                            <span className={`font-medium ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                              {formatISTDateTime(student.registeredAt || student.createdAt)}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Right: Metrics + Chevron */}
                      <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-right">
                        <div>
                          <span className="font-mono text-[9px] uppercase tracking-wider text-slate-400 block font-semibold">TESTS</span>
                          <span className={`font-mono font-bold text-sm sm:text-base ${isLight ? 'text-slate-900' : 'text-white'}`}>
                            {student.totalAttempts}
                          </span>
                        </div>
                        <div>
                          <span className="font-mono text-[9px] uppercase tracking-wider text-slate-400 block font-semibold">LATEST SCORE</span>
                          <span className="font-mono font-bold text-sm sm:text-base text-blue-600 dark:text-blue-400">
                            {student.latestScore !== null ? student.latestScore : '—'}
                          </span>
                        </div>
                        <div>
                          <span className="font-mono text-[9px] uppercase tracking-wider text-slate-400 block font-semibold">BEST SCORE</span>
                          <span className="font-mono font-bold text-sm sm:text-base text-amber-600 dark:text-amber-400">
                            {student.bestScore !== null ? student.bestScore : '—'}
                          </span>
                        </div>
                        <div>
                          <span className="font-mono text-[9px] uppercase tracking-wider text-slate-400 block font-semibold">AVG ACCURACY</span>
                          <span className="font-mono font-bold text-sm sm:text-base text-emerald-600 dark:text-emerald-400">
                            {student.averageAccuracy !== null ? `${student.averageAccuracy}%` : '—'}
                          </span>
                        </div>

                        {/* Right: Expand Toggle */}
                        <div
                          className={`flex items-center justify-center w-8 h-8 rounded border transition ${
                            isLight
                              ? 'border-slate-200 bg-slate-100 text-slate-600 hover:text-slate-900'
                              : 'border-blue-900/40 bg-[#0A1020] text-slate-400 hover:text-white'
                          }`}
                        >
                          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </div>
                      </div>
                    </div>

                    {/* Expandable Attempts Drawer */}
                    {isExpanded && (
                      <div
                        className={`border-t p-4 sm:p-5 space-y-3.5 animate-fade-in ${
                          isLight ? 'border-slate-200 bg-slate-50/60' : 'border-blue-900/40 bg-[#050811]'
                        }`}
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                          <span className={`font-bold flex items-center gap-1.5 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                            <Layers size={14} className="text-blue-500" />
                            RECORDED ATTEMPTS FOR {student.name?.toUpperCase()} ({student.attempts?.length || 0})
                          </span>
                          <span className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                            Registered: {formatISTDateTime(student.registeredAt || student.createdAt)}
                          </span>
                        </div>

                        {!hasAttempts || !student.attempts || student.attempts.length === 0 ? (
                          <p className="font-mono text-xs text-slate-500 italic py-2">
                            This candidate has not taken any practice tests yet.
                          </p>
                        ) : (
                          <div className="space-y-3">
                            {student.attempts.map((att, idx) => {
                              return (
                                <div
                                  key={att.id || idx}
                                  className={`rounded-md border p-3.5 sm:p-4 flex flex-wrap items-center justify-between gap-3 transition ${
                                    isLight
                                      ? 'border-slate-200 bg-white hover:border-slate-300'
                                      : 'border-blue-900/40 bg-[#080D1A] hover:border-blue-700/40'
                                  }`}
                                >
                                  {/* Left: Test Title & Date */}
                                  <div className="space-y-1 min-w-[200px]">
                                    <div className="flex flex-wrap items-center gap-2">
                                      <span
                                        className={`font-mono text-xs font-bold rounded px-2 py-0.5 border ${
                                          isLight
                                            ? 'text-slate-800 bg-slate-200 border-slate-300'
                                            : 'text-blue-300 bg-blue-950/60 border-blue-800/40'
                                        }`}
                                      >
                                        #{att.attemptNumber || student.attempts.length - idx}
                                      </span>
                                      <h4
                                        className={`font-mono font-semibold text-sm truncate max-w-xs sm:max-w-md ${
                                          isLight ? 'text-slate-900' : 'text-white'
                                        }`}
                                      >
                                        {att.testTitle || 'NEET Standard CBT Mock'}
                                      </h4>
                                      {att.isLiveSession || att.status === 'in_progress' ? (
                                        <span
                                          className={`rounded px-2 py-0.5 text-[10px] font-mono font-bold flex items-center gap-1 border animate-pulse ${
                                            isLight
                                              ? 'bg-amber-100 border-amber-300 text-amber-800'
                                              : 'bg-amber-500/10 border-amber-500/40 text-amber-300'
                                          }`}
                                        >
                                          <Zap size={10} className="text-amber-400" /> [LIVE / IN PROGRESS]
                                        </span>
                                      ) : (
                                        <span
                                          className={`rounded px-2 py-0.5 text-[10px] font-mono font-bold border ${
                                            isLight
                                              ? 'bg-emerald-100 border-emerald-300 text-emerald-800'
                                              : 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
                                          }`}
                                        >
                                          [SUBMITTED]
                                        </span>
                                      )}
                                    </div>
                                    <div
                                      className={`flex items-center gap-2 font-mono text-[11px] ${
                                        isLight ? 'text-slate-500' : 'text-slate-400'
                                      }`}
                                    >
                                      <Calendar size={12} className={isLight ? 'text-slate-400' : 'text-blue-400'} />
                                      <span>{formatDateTimeSafe(att.timestamp || att.submittedAt)}</span>
                                      {att.timeTakenMs && (
                                        <>
                                          <span>·</span>
                                          <span>{formatDuration(att.timeTakenMs)}</span>
                                        </>
                                      )}
                                    </div>
                                  </div>

                                  {/* Middle: Scores & Breakdown */}
                                  <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs">
                                    <div
                                      className={`rounded-md px-3 py-1 text-center border font-mono ${
                                        isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#0A1020] border-blue-900/40'
                                      }`}
                                    >
                                      <span
                                        className={`text-[9px] uppercase font-bold block ${
                                          isLight ? 'text-slate-500' : 'text-slate-400'
                                        }`}
                                      >
                                        Score
                                      </span>
                                      <span className={`font-bold ${isLight ? 'text-slate-800' : 'text-white'}`}>
                                        <strong className="text-sm font-black text-blue-600 dark:text-blue-400">
                                          {att.score ?? 0}
                                        </strong>{' '}
                                        / {att.maxScore || 240}
                                      </span>
                                    </div>
                                    <div
                                      className={`rounded-md px-3 py-1 text-center border font-mono ${
                                        isLight
                                          ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                                          : 'bg-emerald-950/20 border-emerald-500/30 text-emerald-400'
                                      }`}
                                    >
                                      <span className="text-[9px] uppercase font-bold block text-emerald-600 dark:text-emerald-400">
                                        Accuracy
                                      </span>
                                      <span className="font-black text-emerald-600 dark:text-emerald-400">
                                        {formatAcc(att.accuracy)}%
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-1.5 font-mono text-xs">
                                      <span
                                        className={`rounded px-2 py-0.5 font-bold border ${
                                          isLight
                                            ? 'bg-emerald-100 border-emerald-300 text-emerald-800'
                                            : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                                        }`}
                                        title="Correct Questions"
                                      >
                                        +{att.correct ?? 0} Correct
                                      </span>
                                      <span
                                        className={`rounded px-2 py-0.5 font-bold border ${
                                          isLight
                                            ? 'bg-rose-100 border-rose-300 text-rose-800'
                                            : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                                        }`}
                                        title="Incorrect Questions"
                                      >
                                        −{att.wrong ?? 0} Wrong
                                      </span>
                                      <span
                                        className={`rounded px-2 py-0.5 border ${
                                          isLight
                                            ? 'bg-slate-100 border-slate-300 text-slate-700'
                                            : 'bg-slate-800/40 border-slate-700 text-slate-300'
                                        }`}
                                        title="Skipped Questions"
                                      >
                                        {att.unattempted ?? 0} Skipped
                                      </span>
                                    </div>
                                  </div>

                                  {/* Right: Inspection CTA */}
                                  <div>
                                    <button
                                      type="button"
                                      onClick={() => handleInspectAttempt(att, student)}
                                      className="rounded-md border border-blue-500/50 bg-blue-600 hover:bg-blue-500 text-white px-3.5 py-1.5 font-mono text-xs font-bold transition flex items-center gap-1.5 shadow-xs active:scale-95"
                                    >
                                      <Eye size={13} />
                                      <span>Inspect Questions</span>
                                    </button>
                                  </div>
                                </div>
                              );
                            })}
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
        ) : (
          <AdminJsonImportSection
            user={user}
            onTestCreated={(newTest) => {
              if (onTestCreated) onTestCreated(newTest);
              fetchOverview();
            }}
            onLaunchTest={onStartTest}
          />
        )}
      </div>

      {/* Admin Attempt Detail Diagnostics Modal */}
      <AdminAttemptDetailModal
        isOpen={Boolean(selectedAttempt)}
        onClose={() => setSelectedAttempt(null)}
        attempt={selectedAttempt}
        student={selectedStudent}
      />
    </main>
  );
}
