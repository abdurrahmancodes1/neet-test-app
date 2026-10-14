import React, { useState } from 'react';
import { Zap, Lock, Mail, User, Eye, EyeOff, ArrowRight, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { loginUser, registerUser } from '../utils/auth.js';
import { useTheme } from '../utils/themeContext.jsx';

export default function AuthPage({ onAuthSuccess }) {
  const { theme, isLight } = useTheme();
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isRegister) {
        const res = await registerUser({ name, email, password });
        setLoading(false);
        if (res.success) {
          onAuthSuccess(res.user);
        } else {
          setError(res.error);
        }
      } else {
        const res = await loginUser({ email, password });
        setLoading(false);
        if (res.success) {
          onAuthSuccess(res.user);
        } else {
          setError(res.error);
        }
      }
    } catch (err) {
      setLoading(false);
      setError('An unexpected error occurred. Please try again.');
    }
  };

  const handleDemoLogin = async () => {
    const demoEmail = 'student@neet2027.ai';
    const demoPass = 'neetpass123';
    const demoName = 'Aarav Sharma (NEET Aspirant)';

    setLoading(true);
    try {
      const loginRes = await loginUser({ email: demoEmail, password: demoPass });
      if (loginRes.success) {
        setLoading(false);
        onAuthSuccess(loginRes.user);
      } else {
        const regRes = await registerUser({ name: demoName, email: demoEmail, password: demoPass });
        setLoading(false);
        if (regRes.success) {
          onAuthSuccess(regRes.user);
        } else {
          setError(regRes.error);
        }
      }
    } catch (err) {
      setLoading(false);
      setError('Demo login error. Please enter custom credentials.');
    }
  };

  return (
    <main
      className={`flex min-h-screen items-center justify-center px-4 py-8 sm:py-12 relative overflow-hidden selection:bg-blue-600 selection:text-white transition-colors duration-200 ${
        isLight ? 'bg-[#F8FAFC] text-slate-900' : 'bg-[#05070B] text-slate-100'
      }`}
    >

      {/* Background Ambient Radial Glow */}
      <div
        className={`pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-96 blur-3xl ${
          isLight
            ? 'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent'
            : 'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-600/20 via-transparent to-transparent'
        }`}
      />

      <div className="w-full max-w-md animate-rise-in relative z-10 space-y-6">
        {/* Top Logo & Portal Title */}
        <div className="text-center space-y-2">
          <div className="mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white shadow-glow">
            <Zap size={28} className="fill-white text-white" />
          </div>
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-blue-500 dark:text-blue-400">
            National Standard CBT Platform
          </p>
          <h1 className={`font-serif italic text-3xl sm:text-4xl ${isLight ? 'text-slate-900' : 'text-white'}`}>
            {isRegister ? 'Create Your Account' : 'Candidate Sign In'}
          </h1>
          <p className={`text-xs font-normal ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
            {isRegister
              ? 'Register to sync your scores to cloud database and view global candidate rankings.'
              : 'Sign in to access your dashboard, 2-hour examination & comparative analytics.'}
          </p>
        </div>

        {/* Card Box */}
        <section
          className={`rounded-3xl border p-6 sm:p-8 shadow-2xl space-y-5 transition-colors ${
            isLight
              ? 'border-slate-200 bg-white text-slate-900 shadow-sm'
              : 'border-white/10 bg-gradient-to-b from-[#0D1322] to-[#0B0F19]'
          }`}
        >
          {/* Mode Switcher Tabs */}
          <div
            className={`grid grid-cols-2 gap-1 rounded-full border p-1 ${
              isLight ? 'bg-slate-100 border-slate-200' : 'bg-[#070A12] border-white/10'
            }`}
          >
            <button
              type="button"
              onClick={() => {
                setIsRegister(false);
                setError('');
              }}
              className={`rounded-full py-2 text-xs font-bold transition-all ${
                !isRegister
                  ? 'bg-blue-600 text-white shadow-sm'
                  : isLight
                  ? 'text-slate-600 hover:text-slate-900'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setIsRegister(true);
                setError('');
              }}
              className={`rounded-full py-2 text-xs font-bold transition-all ${
                isRegister
                  ? 'bg-blue-600 text-white shadow-sm'
                  : isLight
                  ? 'text-slate-600 hover:text-slate-900'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Register New User
            </button>
          </div>

          {/* Error Banner */}
          {error && (
            <div
              className={`flex items-start gap-2.5 rounded-2xl border p-3.5 text-xs font-medium ${
                isLight
                  ? 'border-rose-300 bg-rose-50 text-rose-800'
                  : 'border-rose-500/30 bg-rose-500/10 text-rose-300'
              }`}
            >
              <AlertCircle size={16} className={`shrink-0 mt-0.5 ${isLight ? 'text-rose-600' : 'text-rose-400'}`} />
              <span>{error}</span>
            </div>
          )}

          <form noValidate onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <div>
                <label className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${
                  isLight ? 'text-slate-600' : 'text-slate-400'
                }`}>
                  Full Name
                </label>
                <div className="relative">
                  <User size={16} className={`absolute left-3.5 top-3.5 ${isLight ? 'text-slate-400' : 'text-slate-500'}`} />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Aarav Sharma"
                    className={`w-full rounded-2xl border py-3 pl-10 pr-4 text-sm font-medium focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ${
                      isLight
                        ? 'border-slate-300 bg-slate-50 text-slate-900 placeholder:text-slate-400'
                        : 'border-white/10 bg-[#070A12] text-white placeholder:text-slate-600'
                    }`}
                  />
                </div>
              </div>
            )}

            <div>
              <label className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${
                isLight ? 'text-slate-600' : 'text-slate-400'
              }`}>
                Email Address
              </label>
              <div className="relative">
                <Mail size={16} className={`absolute left-3.5 top-3.5 ${isLight ? 'text-slate-400' : 'text-slate-500'}`} />
                <input
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@example.com"
                  className={`w-full rounded-2xl border py-3 pl-10 pr-4 text-sm font-medium focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ${
                    isLight
                      ? 'border-slate-300 bg-slate-50 text-slate-900 placeholder:text-slate-400'
                      : 'border-white/10 bg-[#070A12] text-white placeholder:text-slate-600'
                  }`}
                />
              </div>
            </div>

            <div>
              <label className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${
                isLight ? 'text-slate-600' : 'text-slate-400'
              }`}>
                Password
              </label>
              <div className="relative">
                <Lock size={16} className={`absolute left-3.5 top-3.5 ${isLight ? 'text-slate-400' : 'text-slate-500'}`} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete={isRegister ? 'new-password' : 'current-password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={isRegister ? 'Minimum 6 characters' : 'Enter your password'}
                  className={`w-full rounded-2xl border py-3 pl-10 pr-10 text-sm font-medium focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ${
                    isLight
                      ? 'border-slate-300 bg-slate-50 text-slate-900 placeholder:text-slate-400'
                      : 'border-white/10 bg-[#070A12] text-white placeholder:text-slate-600'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-3.5 top-3.5 transition ${
                    isLight ? 'text-slate-400 hover:text-slate-700' : 'text-slate-500 hover:text-white'
                  }`}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-blue-600 hover:bg-blue-500 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/30 transition active:scale-95 disabled:opacity-50"
            >
              {loading ? (
                'Connecting & Syncing...'
              ) : isRegister ? (
                <>
                  Create Account <ArrowRight size={16} />
                </>
              ) : (
                <>
                  Sign In <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Quick 1-Click Demo Login */}
          <div className={`border-t pt-4 text-center ${isLight ? 'border-slate-200' : 'border-white/10'}`}>
            <p className={`text-xs mb-2 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              Want a quick preview?
            </p>
            <button
              type="button"
              onClick={handleDemoLogin}
              disabled={loading}
              className={`inline-flex w-full items-center justify-center gap-2 rounded-full border px-4 py-2.5 text-xs font-semibold transition disabled:opacity-50 ${
                isLight
                  ? 'border-blue-200 bg-blue-50 hover:bg-blue-100 text-blue-700'
                  : 'border-blue-500/30 bg-blue-600/10 hover:bg-blue-600/20 text-blue-300'
              }`}
            >
              <Sparkles size={14} className="text-blue-500" />
              1-Click Demo Student Access
            </button>
          </div>
        </section>

        {/* Feature Highlights */}
        <div className="grid grid-cols-3 gap-2 text-center text-[11px] font-semibold">
          <div className={`flex flex-col items-center gap-1 rounded-2xl p-3 border transition ${
            isLight
              ? 'bg-white border-slate-200 text-slate-700 shadow-xs'
              : 'bg-[#0B0F19] border-white/10 text-slate-400'
          }`}>
            <CheckCircle2 size={16} className="text-emerald-500" />
            <span>Cloud & Local Sync</span>
          </div>
          <div className={`flex flex-col items-center gap-1 rounded-2xl p-3 border transition ${
            isLight
              ? 'bg-white border-slate-200 text-slate-700 shadow-xs'
              : 'bg-[#0B0F19] border-white/10 text-slate-400'
          }`}>
            <Zap size={16} className="text-blue-500" />
            <span>2-Hour CBT</span>
          </div>
          <div className={`flex flex-col items-center gap-1 rounded-2xl p-3 border transition ${
            isLight
              ? 'bg-white border-slate-200 text-slate-700 shadow-xs'
              : 'bg-[#0B0F19] border-white/10 text-slate-400'
          }`}>
            <Sparkles size={16} className="text-amber-500" />
            <span>All Users Ranks</span>
          </div>
        </div>
      </div>
    </main>
  );
}
