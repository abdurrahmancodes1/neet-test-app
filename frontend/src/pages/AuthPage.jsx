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
    // Quick demo registration/login
    const demoEmail = 'student@neet2027.ai';
    const demoPass = 'neetpass123';
    const demoName = 'Aarav Sharma (NEET Aspirant)';

    // Register if doesn't exist, else login
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
    <main className="flex min-h-screen items-center justify-center bg-ink-50 px-4 py-8 sm:py-12">
      <div className="w-full max-w-md animate-rise-in">
        {/* Top Logo & Portal Title */}
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-ink-900 text-gold-300 shadow-pop ring-4 ring-gold-400/20">
            <Zap size={28} className="text-gold-400" />
          </div>
          <p className="text-xs font-black uppercase tracking-[0.25em] text-gold-600">
            National Standard CBT Platform
          </p>
          <h1 className="mt-1 font-serif text-3xl font-black text-ink-900 sm:text-4xl">
            {isRegister ? 'Create Your Account' : 'Candidate Login'}
          </h1>
          <p className="mt-1.5 text-xs text-ink-500 sm:text-sm">
            {isRegister
              ? 'Register to track test attempts, accuracy metrics & personal rank analytics.'
              : 'Sign in to access your personal dashboard, 2-hour mock tests & result analytics.'}
          </p>
        </div>

        {/* Card Box */}
        <section className="rounded-3xl border border-ink-200 bg-white p-6 shadow-pop sm:p-8">
          {/* Mode Switcher Tabs */}
          <div className="mb-6 grid grid-cols-2 gap-1.5 rounded-2xl bg-ink-100 p-1.5">
            <button
              type="button"
              onClick={() => {
                setIsRegister(false);
                setError('');
              }}
              className={`rounded-xl py-2.5 text-xs font-bold transition-all ${
                !isRegister
                  ? 'bg-white text-ink-900 shadow-xs'
                  : 'text-ink-600 hover:text-ink-900'
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
              className={`rounded-xl py-2.5 text-xs font-bold transition-all ${
                isRegister
                  ? 'bg-white text-ink-900 shadow-xs'
                  : 'text-ink-600 hover:text-ink-900'
              }`}
            >
              Register New User
            </button>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="mb-5 flex items-start gap-2.5 rounded-2xl border border-bad-300 bg-bad-50 p-3.5 text-xs font-medium text-bad-700 animate-shake">
              <AlertCircle size={16} className="shrink-0 text-bad-600 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form noValidate onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-ink-700 mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <User size={16} className="absolute left-3.5 top-3.5 text-ink-400" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Aarav Sharma"
                    className="w-full rounded-xl border border-ink-200 bg-ink-50/40 py-3 pl-10 pr-4 text-sm font-medium text-ink-900 placeholder:text-ink-400 focus:border-ink-900 focus:bg-white focus:outline-none"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-ink-700 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-3.5 text-ink-400" />
                <input
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@example.com"
                  className="w-full rounded-xl border border-ink-200 bg-ink-50/40 py-3 pl-10 pr-4 text-sm font-medium text-ink-900 placeholder:text-ink-400 focus:border-ink-900 focus:bg-white focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-ink-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-3.5 text-ink-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete={isRegister ? 'new-password' : 'current-password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={isRegister ? 'Minimum 6 characters' : 'Enter your password'}
                  className="w-full rounded-xl border border-ink-200 bg-ink-50/40 py-3 pl-10 pr-10 text-sm font-medium text-ink-900 placeholder:text-ink-400 focus:border-ink-900 focus:bg-white focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-ink-400 hover:text-ink-700"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-ink-900 py-3.5 text-sm font-bold text-white shadow-pop transition hover:bg-ink-800 active:scale-[0.99]"
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
          <div className="mt-6 border-t border-ink-100 pt-5 text-center">
            <p className="text-xs font-semibold text-ink-500 mb-2.5">
              Want a quick preview?
            </p>
            <button
              type="button"
              onClick={handleDemoLogin}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-gold-300 bg-gold-50/70 px-4 py-2.5 text-xs font-bold text-ink-900 transition hover:bg-gold-100/90"
            >
              <Sparkles size={14} className="text-gold-700" />
              1-Click Demo Student Access
            </button>
          </div>
        </section>

        {/* Feature Highlights */}
        <div className="mt-6 grid grid-cols-3 gap-2 text-center text-[11px] font-semibold text-ink-600">
          <div className="flex flex-col items-center gap-1 rounded-xl bg-white p-2.5 shadow-xs border border-ink-100">
            <CheckCircle2 size={16} className="text-good-600" />
            <span>Pure Client-Side</span>
          </div>
          <div className="flex flex-col items-center gap-1 rounded-xl bg-white p-2.5 shadow-xs border border-ink-100">
            <Zap size={16} className="text-gold-600" />
            <span>Full 2-Hour CBT</span>
          </div>
          <div className="flex flex-col items-center gap-1 rounded-xl bg-white p-2.5 shadow-xs border border-ink-100">
            <Sparkles size={16} className="text-ink-700" />
            <span>Attempt Analytics</span>
          </div>
        </div>
      </div>
    </main>
  );
}
