import React, { useState } from 'react';

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const submit = (event) => {
    event.preventDefault();
    const nextErrors = {};
    if (!email.trim()) nextErrors.email = 'Email is required.';
    else if (!/^\S+@\S+\.\S+$/.test(email)) nextErrors.email = 'Enter a valid email address.';
    if (!password) nextErrors.password = 'Password is required.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) onLogin();
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-ink-50 px-4 py-10">
      <section className="w-full max-w-md animate-rise-in rounded-xl2 border border-ink-200 bg-white p-6 shadow-pop sm:p-8">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-ink-900 text-xl font-black text-gold-300">N</div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold-600">NEET Prep</p>
          <h1 className="mt-2 font-serif text-3xl font-bold text-ink-900">Welcome Back</h1>
          <p className="mt-2 text-sm text-ink-500">Sign in to continue your chapter test preparation.</p>
        </div>

        <form noValidate onSubmit={submit} className="space-y-5">
          <label className="block text-sm font-semibold text-ink-700">
            Email
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" autoComplete="email" placeholder="you@example.com" className={`mt-1.5 w-full rounded-lg border bg-white px-3 py-3 text-ink-900 placeholder:text-ink-400 ${errors.email ? 'border-bad-500' : 'border-ink-200 focus:border-ink-600'}`} />
            {errors.email && <span className="mt-1.5 block text-xs font-medium text-bad-600">{errors.email}</span>}
          </label>
          <label className="block text-sm font-semibold text-ink-700">
            Password
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" autoComplete="current-password" placeholder="Enter your password" className={`mt-1.5 w-full rounded-lg border bg-white px-3 py-3 text-ink-900 placeholder:text-ink-400 ${errors.password ? 'border-bad-500' : 'border-ink-200 focus:border-ink-600'}`} />
            {errors.password && <span className="mt-1.5 block text-xs font-medium text-bad-600">{errors.password}</span>}
          </label>
          <button type="submit" className="w-full rounded-lg bg-ink-900 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-ink-800 active:scale-[0.99]">Login</button>
        </form>
        <p className="mt-5 text-center text-xs text-ink-400">Demo login only — any valid email and non-empty password work.</p>
      </section>
    </main>
  );
}
