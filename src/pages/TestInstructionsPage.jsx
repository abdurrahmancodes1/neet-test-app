import React, { useState } from 'react';
import { Lock, AlertCircle, Loader2, ShieldCheck } from 'lucide-react';
import { useVerifyTestAccessMutation } from '../features/tests/testsApiSlice.js';

export default function TestInstructionsPage({ test, onBack, onStart }) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [verifyAccess, { isLoading: isVerifying }] = useVerifyTestAccessMutation();

  const qCount = test?.totalQuestions || test?.questions?.length || 45;
  const duration = test?.durationMinutes || 60;
  const title = test?.title || 'NEET Practice Test';
  const badge = test?.chapter ? `${test.subject} · ${test.chapter}` : test?.subject || 'NEET Test';
  const difficulty = test?.difficulty || 'Hard';
  const subject = test?.subject || 'NEET';

  const handleSubmit = async (e) => {
    e?.preventDefault();
    const cleanInput = code.trim();
    if (!cleanInput) {
      setError('Please enter your test access passcode to begin.');
      return;
    }

    setError('');
    try {
      const response = await verifyAccess({
        testId: test?.id || test?._id,
        testCode: cleanInput,
      }).unwrap();

      if (response && response.unlocked) {
        onStart();
      }
    } catch (err) {
      const msg = err?.data?.message || err?.error || 'Invalid test access code. Please check your passcode.';
      setError(msg);
    }
  };

  return (
    <main className="min-h-screen bg-ink-50 px-4 py-6 sm:py-10">
      <div className="mx-auto max-w-2xl animate-rise-in">
        <button
          type="button"
          onClick={onBack}
          className="mb-6 text-sm font-semibold text-ink-600 transition hover:text-ink-900"
        >
          ← Back to Tests
        </button>
        <section className="rounded-xl2 border border-ink-200 bg-white p-6 shadow-card sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-600">{badge}</p>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-ink-100 px-2.5 py-1 text-xs font-semibold text-ink-700">
              <ShieldCheck size={13} className="text-gold-600" /> Passcode Protected
            </span>
          </div>

          <h1 className="mt-2 font-serif text-3xl font-bold text-ink-900">{title} — Instructions</h1>

          <div className="my-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Info value={qCount} label="Questions" />
            <Info value={subject} label="Subject" />
            <Info value={difficulty} label="Difficulty" />
            <Info value={`${duration} min`} label="Duration" />
          </div>

          <div className="space-y-4 rounded-xl bg-ink-50 p-4">
            <div>
              <h2 className="font-semibold text-ink-900">Marking Scheme</h2>
              <p className="mt-1 text-sm text-ink-600">
                • <strong className="text-good-600">+4 Marks</strong> for each correct response.
                <br />
                • <strong className="text-bad-600">−1 Mark</strong> for each incorrect response (Negative Marking).
                <br />
                • <strong className="text-ink-600">0 Marks</strong> for unattempted questions.
              </p>
            </div>
            <div>
              <h2 className="font-semibold text-ink-900">Exam Strategy &amp; Rules</h2>
              <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-ink-600">
                <li>• Read each question carefully before choosing your response.</li>
                <li>• You can mark questions for review and return to them anytime via the question palette.</li>
                <li>• The timer counts down continuously and the test will auto-submit when time expires.</li>
                <li>• Stay in fullscreen mode during the test.</li>
              </ul>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-7 space-y-4 border-t border-ink-100 pt-6">
            <div>
              <label htmlFor="test-code-input" className="block text-sm font-bold text-ink-900">
                Enter Test Passcode to Start
              </label>
              <div className="relative mt-2">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-ink-400">
                  <Lock size={16} />
                </div>
                <input
                  id="test-code-input"
                  type="text"
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="Enter private test code"
                  className="w-full rounded-lg border border-ink-200 bg-white py-3 pl-10 pr-4 font-mono text-sm font-semibold uppercase tracking-wider text-ink-900 placeholder:normal-case placeholder:tracking-normal placeholder:font-sans placeholder:text-ink-400 focus:border-ink-900 focus:outline-none focus:ring-1 focus:ring-ink-900"
                  autoComplete="off"
                  disabled={isVerifying}
                />
              </div>
              {error && (
                <p className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-bad-600 animate-fade-in">
                  <AlertCircle size={14} />
                  {error}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isVerifying}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-ink-900 py-3.5 text-sm font-bold text-white transition hover:bg-ink-800 focus:ring-2 focus:ring-ink-800 focus:ring-offset-2 disabled:opacity-60"
            >
              {isVerifying && <Loader2 size={16} className="animate-spin" />}
              {isVerifying ? 'Verifying Passcode...' : 'Unlock & Start Test'}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}

function Info({ value, label }) {
  return (
    <div className="rounded-xl bg-ink-100 p-3 text-center">
      <p className="font-bold text-ink-900">{value}</p>
      <p className="mt-1 text-[11px] font-semibold text-ink-500">{label}</p>
    </div>
  );
}
