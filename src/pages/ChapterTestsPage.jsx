import React from 'react';
import { useGetTestsQuery } from '../features/tests/testsApiSlice.js';
import { Loader2, Sparkles, AlertCircle, Clock, BookOpen, Award } from 'lucide-react';

export default function ChapterTestsPage({ onSelect, onLogout }) {
  const { data: serverTests, isLoading, isError, refetch } = useGetTestsQuery();

  // Normalize tests dynamically from backend REST API
  const tests = React.useMemo(() => {
    if (serverTests && serverTests.length > 0) {
      return serverTests.map((t) => ({
        id: t.slug || t._id,
        _id: t._id,
        title: t.title,
        subtitle: t.subtitle || '',
        badgeText: Array.isArray(t.subjects) ? t.subjects.join(' & ') : t.subjects || 'NEET',
        difficulty: t.difficulty || 'Hard',
        durationMinutes: t.durationMinutes || 60,
        totalQuestions: t.totalQuestions || 45,
        totalMarks: t.totalMarks || (t.totalQuestions || 45) * 4,
        syllabus: t.syllabus || t.description || '',
      }));
    }
    return [];
  }, [serverTests]);

  return (
    <main className="min-h-screen bg-ink-50 px-4 py-6 sm:py-10">
      <div className="mx-auto max-w-5xl">
        <header className="mb-10 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink-900 font-black text-gold-300">
              N
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold-600">NEET Prep</p>
              <p className="font-serif text-lg font-bold text-ink-900">Practice Tests</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onLogout}
            className="rounded-lg border border-ink-200 bg-white px-3 py-2 text-sm font-semibold text-ink-700 transition hover:bg-ink-100"
          >
            Logout
          </button>
        </header>

        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-gold-600">NEET Mock &amp; Chapter Tests</p>
            <h1 className="mt-1 font-serif text-3xl font-bold text-ink-900 sm:text-4xl">Choose a test to begin</h1>
            <p className="mt-2 text-ink-500">Build speed and accuracy with focused NEET-style practice and realistic timers.</p>
          </div>
          {tests.length > 0 && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-good-50 px-3 py-1 text-xs font-semibold text-good-700 border border-good-200">
              <Sparkles size={13} className="text-good-600" /> Dynamic Cloud Platform
            </span>
          )}
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-ink-600" />
            <p className="mt-3 text-sm font-medium text-ink-500">Loading tests from API...</p>
          </div>
        ) : isError ? (
          <div className="rounded-xl border border-bad-200 bg-bad-50 p-6 text-center">
            <AlertCircle className="mx-auto h-8 w-8 text-bad-600" />
            <h3 className="mt-2 font-bold text-bad-900">Unable to load tests from backend</h3>
            <p className="mt-1 text-sm text-bad-700">Please make sure the backend server is running on port 5000.</p>
            <button
              type="button"
              onClick={() => refetch()}
              className="mt-4 rounded-lg bg-bad-600 px-4 py-2 text-xs font-bold text-white transition hover:bg-bad-700"
            >
              Retry Connection
            </button>
          </div>
        ) : tests.length === 0 ? (
          <div className="rounded-xl border border-ink-200 bg-white p-12 text-center shadow-card">
            <p className="text-base font-semibold text-ink-700">No published tests available at the moment.</p>
            <p className="mt-1 text-xs text-ink-500">Tests created by admin will appear here automatically.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {tests.map((test) => (
              <article
                key={test.id}
                className="flex flex-col justify-between rounded-xl2 border border-ink-200 bg-white p-5 shadow-card transition hover:-translate-y-0.5 hover:shadow-pop sm:p-6"
              >
                <div>
                  <div className="mb-4 flex items-start justify-between gap-4">
                    <div>
                      <span className="rounded-full bg-gold-100 px-2.5 py-1 text-xs font-bold text-gold-700">
                        {test.badgeText}
                      </span>
                      <h2 className="mt-2.5 font-serif text-2xl font-bold text-ink-900">{test.title}</h2>
                      <p className="mt-1 text-sm text-ink-500">{test.subtitle}</p>
                    </div>
                    <div className="shrink-0 rounded-xl bg-ink-100 px-3 py-2 text-right text-xs font-semibold text-ink-600">
                      <p>{test.totalQuestions} Questions</p>
                      <p className="mt-1">{test.difficulty}</p>
                    </div>
                  </div>

                  <div className="mb-5 rounded-lg bg-ink-50 p-3 text-xs leading-relaxed text-ink-600">
                    <span className="font-semibold text-ink-800">Syllabus: </span>
                    {test.syllabus}
                  </div>
                </div>

                <div>
                  <div className="mb-5 flex flex-wrap gap-2 text-xs font-semibold text-ink-600">
                    <span className="inline-flex items-center gap-1 rounded-full bg-ink-100 px-3 py-1.5">
                      <Clock size={12} /> {test.durationMinutes} minutes
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-ink-100 px-3 py-1.5">
                      <BookOpen size={12} /> +4 / −1 marking
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-ink-100 px-3 py-1.5">
                      <Award size={12} /> {test.totalMarks} marks
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => onSelect(test.id)}
                    className="w-full rounded-lg bg-ink-900 py-3 text-sm font-bold text-white transition hover:bg-ink-800"
                  >
                    Start Test
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
