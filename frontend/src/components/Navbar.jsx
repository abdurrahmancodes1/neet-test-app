import React, { useState, useRef, useEffect } from 'react';
import {
  Zap,
  BarChart3,
  Layers,
  BookOpen,
  Trophy,
  ShieldAlert,
  ShieldCheck,
  User,
  LogOut,
  ChevronDown,
  Menu,
  X,
  Sun,
  Moon,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { useTheme } from '../utils/themeContext.jsx';
import ProfileSettingsModal from './ProfileSettingsModal.jsx';

export default function Navbar({
  currentScreen = 'dashboard',
  user,
  onNavigate,
  onOpenLeaderboard,
  onLogout,
  onUserUpdated,
}) {
  const { theme, isLight, toggleTheme } = useTheme();
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNav = (screen) => {
    setProfileOpen(false);
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(screen);
    }
  };

  const handleLeaderboardClick = () => {
    setProfileOpen(false);
    setMobileMenuOpen(false);
    if (onOpenLeaderboard) {
      onOpenLeaderboard();
    }
  };

  const isScreenActive = (screen) => {
    if (screen === 'tests' || screen === 'chapters') {
      return currentScreen === 'tests' || currentScreen === 'chapters';
    }
    return currentScreen === screen;
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <header
      className={`rounded-2xl sm:rounded-full border backdrop-blur-md px-3.5 sm:px-6 py-2.5 shadow-xl transition-colors duration-200 relative z-40 ${
        isLight
          ? 'bg-white/95 border-slate-200 text-slate-900 shadow-slate-200/50'
          : 'bg-[#0D121F]/90 border-white/10 text-white shadow-black/40'
      }`}
    >
      <div className="flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand / Logo */}
        <button
          type="button"
          onClick={() => handleNav('dashboard')}
          className="flex items-center gap-2.5 min-w-0 transition hover:opacity-90 active:scale-98 text-left focus:outline-none"
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 text-white font-black text-xs shadow-glow">
            <Zap size={15} className="fill-white text-white" />
          </div>
          <div className="flex flex-col">
            <span
              className={`font-sans text-sm sm:text-base font-extrabold tracking-tight leading-none ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}
            >
              NEET<span className="text-blue-500">·</span>JEE
              <span className="text-xs font-mono ml-1 font-bold text-blue-500">2027</span>
            </span>
            <span className={`text-[10px] font-medium hidden sm:block ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              Assessment Platform
            </span>
          </div>
        </button>

        {/* Primary Desktop Navigation Links */}
        <nav
          className={`hidden md:flex items-center gap-1.5 lg:gap-2 text-xs font-semibold ${
            isLight ? 'text-slate-600' : 'text-slate-300'
          }`}
        >
          {/* 1. Dashboard */}
          <button
            type="button"
            onClick={() => handleNav('dashboard')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition ${
              isScreenActive('dashboard')
                ? isLight
                  ? 'bg-blue-50 text-blue-700 font-bold border border-blue-200 shadow-xs'
                  : 'bg-blue-600/20 text-blue-300 font-bold border border-blue-500/40 shadow-xs'
                : isLight
                ? 'hover:bg-slate-100 text-slate-600 hover:text-slate-900'
                : 'hover:bg-white/5 text-slate-400 hover:text-white'
            }`}
          >
            <BarChart3 size={14} className={isScreenActive('dashboard') ? (isLight ? 'text-blue-600' : 'text-blue-400') : ''} />
            <span>Dashboard</span>
          </button>

          {/* 2. Tests */}
          <button
            type="button"
            onClick={() => handleNav('tests')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition ${
              isScreenActive('tests')
                ? isLight
                  ? 'bg-blue-50 text-blue-700 font-bold border border-blue-200 shadow-xs'
                  : 'bg-blue-600/20 text-blue-300 font-bold border border-blue-500/40 shadow-xs'
                : isLight
                ? 'hover:bg-slate-100 text-slate-600 hover:text-slate-900'
                : 'hover:bg-white/5 text-slate-400 hover:text-white'
            }`}
          >
            <Layers size={14} className={isScreenActive('tests') ? (isLight ? 'text-blue-600' : 'text-blue-400') : ''} />
            <span>Tests</span>
          </button>


          {/* 4. Leaderboard */}
          <button
            type="button"
            onClick={handleLeaderboardClick}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition ${
              isLight
                ? 'hover:bg-amber-50 text-slate-600 hover:text-amber-800'
                : 'hover:bg-amber-500/10 text-slate-400 hover:text-amber-300'
            }`}
          >
            <Trophy size={14} className="text-amber-500" />
            <span>Leaderboard</span>
          </button>
        </nav>

        {/* Right Section: Admin, User Menu, Mobile Toggle */}
        <div className="flex items-center gap-2">
          {/* Admin Badge / Link (Visible only to authorized Admins) */}
          {user?.role === 'admin' && (
            <button
              type="button"
              onClick={() => handleNav('admin')}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition shadow-xs ${
                currentScreen === 'admin'
                  ? 'bg-amber-500 text-slate-950 font-black shadow-amber-500/20'
                  : isLight
                  ? 'border border-amber-300 bg-amber-50 text-amber-900 hover:bg-amber-100'
                  : 'border border-amber-500/40 bg-amber-500/15 text-amber-300 hover:bg-amber-500/25'
              }`}
            >
              <ShieldCheck size={14} className={currentScreen === 'admin' ? 'text-slate-950' : 'text-amber-500'} />
              <span>Admin Portal</span>
            </button>
          )}

          {/* Theme Switcher Button */}
          <button
            type="button"
            onClick={toggleTheme}
            title={isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            className={`rounded-full p-2 border transition ${
              isLight
                ? 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-600'
                : 'border-white/10 bg-white/5 hover:bg-white/10 text-slate-300'
            }`}
          >
            {isLight ? <Moon size={15} /> : <Sun size={15} />}
          </button>

          {/* User Profile Dropdown Menu */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setProfileOpen((prev) => !prev)}
              aria-expanded={profileOpen}
              className={`flex items-center gap-2 rounded-full border p-1 pl-1.5 pr-2.5 transition ${
                profileOpen
                  ? isLight
                    ? 'border-blue-400 bg-blue-50/70'
                    : 'border-blue-500/50 bg-blue-600/10'
                  : isLight
                  ? 'border-slate-200 bg-white hover:bg-slate-50'
                  : 'border-white/10 bg-white/5 hover:bg-white/10'
              }`}
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 font-bold text-xs text-white">
                {getInitials(user?.name)}
              </div>
              <span
                className={`max-w-[100px] truncate text-xs font-semibold hidden sm:inline-block ${
                  isLight ? 'text-slate-800' : 'text-slate-200'
                }`}
              >
                {user?.name?.split(' ')[0] || 'Account'}
              </span>
              <ChevronDown
                size={13}
                className={`transition-transform duration-200 ${profileOpen ? 'rotate-180' : ''} ${
                  isLight ? 'text-slate-500' : 'text-slate-400'
                }`}
              />
            </button>

            {/* Profile Menu Dropdown Panel */}
            {profileOpen && (
              <div
                className={`absolute right-0 mt-2 w-64 rounded-2xl border p-2 shadow-2xl transition-all animate-fade-in ${
                  isLight
                    ? 'border-slate-200 bg-white text-slate-900 shadow-slate-300/40'
                    : 'border-white/10 bg-[#0E1424] text-white shadow-2xl'
                }`}
              >
                {/* User Header Info */}
                <div
                  className={`border-b p-3 pb-3.5 ${
                    isLight ? 'border-slate-100' : 'border-white/5'
                  }`}
                >
                  <p className="text-xs font-bold truncate">{user?.name || 'Aspirant'}</p>
                  <p className={`text-[11px] truncate mt-0.5 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                    {user?.email || 'Student Account'}
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                        user?.role === 'admin'
                          ? isLight
                            ? 'bg-amber-100 text-amber-900 border border-amber-200'
                            : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : isLight
                          ? 'bg-blue-100 text-blue-900 border border-blue-200'
                          : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                      }`}
                    >
                      {user?.role === 'admin' ? 'Administrator' : 'Candidate'}
                    </span>
                    {user?.rollNumber && (
                      <span className="font-mono text-[10px] text-slate-400">
                        Roll: {user.rollNumber}
                      </span>
                    )}
                  </div>
                </div>

                {/* Navigation Shortcuts inside Menu */}
                <div className="py-1 text-xs">
                  <button
                    type="button"
                    onClick={() => {
                      setProfileOpen(false);
                      setProfileModalOpen(true);
                    }}
                    className={`w-full flex items-center gap-2.5 rounded-xl px-3 py-2 text-left transition font-semibold ${
                      isLight ? 'hover:bg-blue-50 text-blue-700' : 'hover:bg-blue-500/10 text-blue-400'
                    }`}
                  >
                    <User size={15} className="text-blue-500" />
                    <span>Edit Profile &amp; Target Exam</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleNav('dashboard')}
                    className={`w-full flex items-center gap-2.5 rounded-xl px-3 py-2 text-left transition ${
                      isLight ? 'hover:bg-slate-50 text-slate-700' : 'hover:bg-white/5 text-slate-300'
                    }`}
                  >
                    <BarChart3 size={15} className="text-blue-500" />
                    <span>My Dashboard &amp; Scores</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleNav('tests')}
                    className={`w-full flex items-center gap-2.5 rounded-xl px-3 py-2 text-left transition ${
                      isLight ? 'hover:bg-slate-50 text-slate-700' : 'hover:bg-white/5 text-slate-300'
                    }`}
                  >
                    <Layers size={15} className="text-indigo-500" />
                    <span>Standard Tests Catalog</span>
                  </button>


                  <button
                    type="button"
                    onClick={handleLeaderboardClick}
                    className={`w-full flex items-center gap-2.5 rounded-xl px-3 py-2 text-left transition ${
                      isLight ? 'hover:bg-slate-50 text-slate-700' : 'hover:bg-white/5 text-slate-300'
                    }`}
                  >
                    <Trophy size={15} className="text-amber-500" />
                    <span>Global Leaderboard</span>
                  </button>

                  {user?.role === 'admin' && (
                    <button
                      type="button"
                      onClick={() => handleNav('admin')}
                      className={`w-full flex items-center gap-2.5 rounded-xl px-3 py-2 text-left transition ${
                        isLight ? 'hover:bg-amber-50 text-amber-900' : 'hover:bg-amber-500/10 text-amber-300'
                      }`}
                    >
                      <ShieldCheck size={15} className="text-amber-500" />
                      <span>Admin Management Portal</span>
                    </button>
                  )}
                </div>

                {/* Logout Action */}
                {onLogout && (
                  <div className={`border-t pt-1 ${isLight ? 'border-slate-100' : 'border-white/5'}`}>
                    <button
                      type="button"
                      onClick={() => {
                        setProfileOpen(false);
                        onLogout();
                      }}
                      className={`w-full flex items-center gap-2.5 rounded-xl px-3 py-2 text-left text-xs font-semibold transition ${
                        isLight
                          ? 'text-rose-600 hover:bg-rose-50'
                          : 'text-rose-400 hover:bg-rose-500/10'
                      }`}
                    >
                      <LogOut size={15} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Navigation Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle mobile navigation"
            className={`md:hidden rounded-full p-2 border transition ${
              isLight
                ? 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700'
                : 'border-white/10 bg-white/5 hover:bg-white/10 text-slate-300'
            }`}
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <nav
          className={`md:hidden border-t mt-3 pt-3 space-y-1.5 animate-fade-in text-xs font-semibold ${
            isLight ? 'border-slate-200' : 'border-white/10'
          }`}
        >
          <button
            type="button"
            onClick={() => handleNav('dashboard')}
            className={`w-full flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-left transition ${
              isScreenActive('dashboard')
                ? isLight
                  ? 'bg-blue-50 text-blue-700 font-bold'
                  : 'bg-blue-600/20 text-blue-300 font-bold'
                : isLight
                ? 'text-slate-700 hover:bg-slate-100'
                : 'text-slate-300 hover:bg-white/5'
            }`}
          >
            <BarChart3 size={16} className="text-blue-500" />
            <span>Dashboard</span>
          </button>

          <button
            type="button"
            onClick={() => handleNav('tests')}
            className={`w-full flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-left transition ${
              isScreenActive('tests')
                ? isLight
                  ? 'bg-blue-50 text-blue-700 font-bold'
                  : 'bg-blue-600/20 text-blue-300 font-bold'
                : isLight
                ? 'text-slate-700 hover:bg-slate-100'
                : 'text-slate-300 hover:bg-white/5'
            }`}
          >
            <Layers size={16} className="text-indigo-500" />
            <span>Tests Catalog</span>
          </button>


          <button
            type="button"
            onClick={handleLeaderboardClick}
            className={`w-full flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-left transition ${
              isLight ? 'text-slate-700 hover:bg-slate-100' : 'text-slate-300 hover:bg-white/5'
            }`}
          >
            <Trophy size={16} className="text-amber-500" />
            <span>Global Leaderboard</span>
          </button>

          {user?.role === 'admin' && (
            <button
              type="button"
              onClick={() => handleNav('admin')}
              className={`w-full flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-left font-bold transition ${
                isLight ? 'bg-amber-50 text-amber-900 border border-amber-200' : 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
              }`}
            >
              <ShieldCheck size={16} className="text-amber-500" />
              <span>Admin Management Portal</span>
            </button>
          )}

          <div className={`border-t pt-2 mt-2 flex items-center justify-between px-2 ${
            isLight ? 'border-slate-200' : 'border-white/10'
          }`}>
            <span className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              Theme: {isLight ? 'Light Mode' : 'Dark Mode'}
            </span>
            <button
              type="button"
              onClick={toggleTheme}
              className={`rounded-full px-3 py-1 border text-xs font-semibold flex items-center gap-1.5 ${
                isLight ? 'border-slate-200 bg-slate-100 text-slate-800' : 'border-white/10 bg-white/5 text-slate-200'
              }`}
            >
              {isLight ? <Moon size={13} /> : <Sun size={13} />}
              <span>Toggle</span>
            </button>
          </div>
        </nav>
      )}

      {/* Candidate Profile Settings Modal */}
      <ProfileSettingsModal
        open={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
        user={user}
        onUserUpdated={onUserUpdated}
      />
    </header>
  );
}
