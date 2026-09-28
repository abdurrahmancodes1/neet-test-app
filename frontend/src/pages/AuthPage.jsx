import React, { useState } from 'react';
import { Zap, Lock, Mail, User, Eye, EyeOff, ArrowRight, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { loginUser, registerUser } from '../utils/auth.js';

export default function AuthPage({ onAuthSuccess }) {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (isRegister) {
      const res = registerUser({ name, email, password });
      setLoading(false);
      if (res.success) {
        onAuthSuccess(res.user);
      } else {
        setError(res.error);
      }
    } else {
      const res = loginUser({ email, password });
      setLoading(false);
      if (res.success) {
        onAuthSuccess(res.user);
      } else {
        setError(res.error);
      }
    }
  };

  const handleDemoLogin = () => {
    const demoEmail = 'student@neet2027.ai';
    const demoPass = 'neetpass123';
    const demoName = 'Aarav Sharma (NEET Aspirant)';

    const loginRes = loginUser({ email: demoEmail, password: demoPass });
    if (loginRes.success) {
      onAuthSuccess(loginRes.user);
    } else {
      const regRes = registerUser({ name: demoName, email: demoEmail, password: demoPass });
      if (regRes.success) {
        onAuthSuccess(regRes.user);
      } else {
        setError(regRes.error);
      }
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#05070B] text-slate-100 px-4 py-8 sm:py-12 relative overflow-hidden selection:bg-blue-600 selection:text-white">
      {/* Background Ambient Radial Glow */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-96 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-600/20 via-transparent to-transparent blur-3xl" />

      <div className="w-full max-w-md animate-rise-in relative z-10 space-y-6">
        {/* Top Logo & Portal Title */}
        <div className="text-center space-y-2">
          <div className="mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white shadow-glow">
            <Zap size={28} className="fill-white text-white" />
          </div>
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-blue-400">
            National Standard CBT Platform
          </p>
          <h1 className="font-serif italic text-3xl sm:text-4xl text-white">
            {isRegister ? 'Create Your Account' : 'Candidate Sign In'}
          </h1>
          <p className="text-xs text-slate-400 font-normal">
            {isRegister
              ? 'Register to track test attempts, accuracy metrics & personal progression.'
              : 'Sign in to access your dashboard, 2-hour examination & comparative analytics.'}
          </p>
        </div>

        {/* Card Box */}
        <section className="rounded-3xl border border-white/10 bg-gradient-to-b from-[#0D1322] to-[#0B0F19] p-6 sm:p-8 shadow-2xl space-y-5">
          {/* Mode Switcher Tabs */}
          <div className="grid grid-cols-2 gap-1 rounded-full bg-[#070A12] border border-white/10 p-1">
            <button
              type="button"
              onClick={() => {
                setIsRegister(false);
                setError('');
              }}
              className={`rounded-full py-2 text-xs font-bold transition-all ${
                !isRegister
                  ? 'bg-blue-600 text-white shadow-sm'
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
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Register New User
            </button>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="flex items-start gap-2.5 rounded-2xl border border-rose-500/30 bg-rose-500/10 p-3.5 text-xs font-medium text-rose-300">
              <AlertCircle size={16} className="shrink-0 text-rose-400 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form noValidate onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <User size={16} className="absolute left-3.5 top-3.5 text-slate-500" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Aarav Sharma"
                    className="w-full rounded-2xl border border-white/10 bg-[#070A12] py-3 pl-10 pr-4 text-sm font-medium text-white placeholder:text-slate-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-3.5 text-slate-500" />
                <input
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@example.com"
                  className="w-full rounded-2xl border border-white/10 bg-[#070A12] py-3 pl-10 pr-4 text-sm font-medium text-white placeholder:text-slate-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-3.5 text-slate-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete={isRegister ? 'new-password' : 'current-password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={isRegister ? 'Minimum 6 characters' : 'Enter your password'}
                  className="w-full rounded-2xl border border-white/10 bg-[#070A12] py-3 pl-10 pr-10 text-sm font-medium text-white placeholder:text-slate-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-slate-500 hover:text-white"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-blue-600 hover:bg-blue-500 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/30 transition active:scale-95"
            >
              {loading ? (
                'Processing...'
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
          <div className="border-t border-white/10 pt-4 text-center">
            <p className="text-xs text-slate-400 mb-2">
              Want a quick preview?
            </p>
            <button
              type="button"
              onClick={handleDemoLogin}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-blue-500/30 bg-blue-600/10 hover:bg-blue-600/20 px-4 py-2.5 text-xs font-semibold text-blue-300 transition"
            >
              <Sparkles size={14} className="text-blue-400" />
              1-Click Demo Student Access
            </button>
          </div>
        </section>

        {/* Feature Highlights */}
        <div className="grid grid-cols-3 gap-2 text-center text-[11px] font-semibold text-slate-400">
          <div className="flex flex-col items-center gap-1 rounded-2xl bg-[#0B0F19] p-3 border border-white/10">
            <CheckCircle2 size={16} className="text-emerald-400" />
            <span>Pure Client-Side</span>
          </div>
          <div className="flex flex-col items-center gap-1 rounded-2xl bg-[#0B0F19] p-3 border border-white/10">
            <Zap size={16} className="text-blue-400" />
            <span>2-Hour CBT</span>
          </div>
          <div className="flex flex-col items-center gap-1 rounded-2xl bg-[#0B0F19] p-3 border border-white/10">
            <Sparkles size={16} className="text-amber-400" />
            <span>Analytics</span>
          </div>
        </div>
      </div>
    </main>
  );
}
