import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Clock,
  AlertTriangle,
  FileText,
  ArrowLeft,
  CheckCircle2,
  Lock,
  RotateCcw,
  BookOpen,
  Sparkles,
  ShieldAlert,
} from 'lucide-react';
import { CLASS_10_CHEMISTRY_PAPER, CLASS_10_QUESTIONS } from '../data/class10ChemistryQuestions.js';

const STORAGE_KEY = 'class10_chem_exam_session_v2';
const DURATION_MINUTES = 50;
const DURATION_MS = DURATION_MINUTES * 60 * 1000;

function formatTime(ms) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function getStoredSession() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const session = JSON.parse(raw);
    return session;
  } catch {
    return null;
  }
}

function saveStoredSession(session) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  } catch {}
}

export default function Class10ChemistryExamPage({ onBack }) {
  // Session state: 'NOT_STARTED' | 'ACTIVE' | 'SUBMITTED'
  const [session, setSession] = useState(() => {
    const stored = getStoredSession();
    if (stored) {
      if (stored.state === 'ACTIVE' && Date.now() >= stored.endTime) {
        return { ...stored, state: 'SUBMITTED', submittedAt: stored.endTime, autoSubmitted: true };
      }
      return stored;
    }
    return {
      state: 'NOT_STARTED',
      startTime: null,
      endTime: null,
      submittedAt: null,
      autoSubmitted: false,
    };
  });

  const [timeLeft, setTimeLeft] = useState(() => {
    if (session.state === 'ACTIVE' && session.endTime) {
      return Math.max(0, session.endTime - Date.now());
    }
    return DURATION_MS;
  });

  const [rollNumber, setRollNumber] = useState(['', '', '', '', '', '', '', '']);
  const [activeChapterFilter, setActiveChapterFilter] = useState('ALL');
  const [confirmSubmitModal, setConfirmSubmitModal] = useState(false);
  const [confirmRetakeModal, setConfirmRetakeModal] = useState(false);

  // Timer Tick based on absolute end timestamp
  useEffect(() => {
    if (session.state !== 'ACTIVE' || !session.endTime) return;

    const interval = setInterval(() => {
      const remaining = Math.max(0, session.endTime - Date.now());
      setTimeLeft(remaining);

      if (remaining <= 0) {
        clearInterval(interval);
        const submitted = {
          ...session,
          state: 'SUBMITTED',
          submittedAt: session.endTime,
          autoSubmitted: true,
        };
        saveStoredSession(submitted);
        setSession(submitted);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [session]);

  const handleStartExam = useCallback(() => {
    const now = Date.now();
    const endTime = now + DURATION_MS;
    const newSession = {
      state: 'ACTIVE',
      startTime: now,
      endTime,
      submittedAt: null,
      autoSubmitted: false,
    };
    saveStoredSession(newSession);
    setSession(newSession);
    setTimeLeft(DURATION_MS);
  }, []);

  const handleManualSubmit = useCallback(() => {
    const now = Date.now();
    const submitted = {
      ...session,
      state: 'SUBMITTED',
      submittedAt: now,
      autoSubmitted: false,
    };
    saveStoredSession(submitted);
    setSession(submitted);
    setConfirmSubmitModal(false);
  }, [session]);

  const handleResetExam = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
    setSession({
      state: 'NOT_STARTED',
      startTime: null,
      endTime: null,
      submittedAt: null,
      autoSubmitted: false,
    });
    setTimeLeft(DURATION_MS);
    setConfirmRetakeModal(false);
  }, []);

  const filteredQuestions = useMemo(() => {
    if (activeChapterFilter === 'ALL') return CLASS_10_QUESTIONS;
    const chNum = parseInt(activeChapterFilter, 10);
    return CLASS_10_QUESTIONS.filter((q) => q.chapterNumber === chNum);
  }, [activeChapterFilter]);

  const timerWarningClass = useMemo(() => {
    if (timeLeft <= 60 * 1000) {
      return 'bg-bad-50 text-bad-700 border-bad-300 ring-2 ring-bad-400 animate-pulse';
    }
    if (timeLeft <= 5 * 60 * 1000) {
      return 'bg-gold-50 text-gold-700 border-gold-300 ring-1 ring-gold-400';
    }
    return 'bg-ink-900 text-white border-ink-800';
  }, [timeLeft]);

  // If exam has not started yet, show pre-exam instructions screen
  if (session.state === 'NOT_STARTED') {
    return (
      <div className="min-h-screen bg-ink-50 px-4 py-8 sm:py-12">
        <div className="mx-auto max-w-3xl">
          <button
            type="button"
            onClick={onBack}
            className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-ink-600 transition hover:text-ink-900"
          >
            <ArrowLeft size={16} /> Back to Practice Tests
          </button>

          <div className="rounded-2xl border border-ink-200 bg-white p-6 shadow-card sm:p-10">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ink-100 pb-6">
              <div>
                <span className="rounded-full bg-gold-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-gold-700">
                  CBSE Class 10 Science (Chemistry)
                </span>
                <h1 className="mt-3 font-serif text-2xl font-bold text-ink-900 sm:text-3xl">
                  {CLASS_10_CHEMISTRY_PAPER.title}
                </h1>
                <p className="mt-1 text-sm text-ink-500">
                  {CLASS_10_CHEMISTRY_PAPER.subtitle}
                </p>
              </div>
              <div className="rounded-xl bg-ink-50 p-3 text-right">
                <p className="text-xs font-semibold text-ink-500">Duration</p>
                <p className="font-mono text-xl font-bold text-ink-900">50 Minutes</p>
              </div>
            </div>

            <div className="my-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {CLASS_10_CHEMISTRY_PAPER.chapters.map((ch) => (
                <div key={ch.number} className="rounded-xl border border-ink-200 bg-ink-50 p-4">
                  <span className="text-xs font-bold uppercase text-gold-600">Chapter {ch.number}</span>
                  <h3 className="mt-1 text-sm font-bold text-ink-900">{ch.title}</h3>
                  <p className="mt-2 text-xs font-medium text-ink-500">{ch.questionRange}</p>
                </div>
              ))}
            </div>

            <div className="space-y-4 rounded-xl border border-gold-200 bg-gold-50 p-5 text-sm text-ink-800">
              <h3 className="flex items-center gap-2 font-bold text-ink-900">
                <FileText size={18} className="text-gold-600" />
                Physical Answer Book Guidelines
              </h3>
              <ul className="space-y-2 leading-relaxed text-ink-700">
                <li>
                  • <strong>Write answers on physical paper:</strong> You will write all solutions, equations, and explanations in your physical examination notebook.
                </li>
                <li>
                  • <strong>No online typing required:</strong> You do not need to click MCQ options or type answers on this website.
                </li>
                <li>
                  • <strong>50-minute continuous timer:</strong> Once started, the 50:00 countdown timer will run continuously. Refreshing the browser will <strong>not</strong> reset your timer.
                </li>
                <li>
                  • <strong>Auto-submission at 00:00:</strong> The question paper will automatically lock when 50 minutes expire. Submit your physical answer sheet to your teacher for manual checking.
                </li>
              </ul>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={handleStartExam}
                className="flex-1 rounded-xl bg-ink-900 py-4 text-center text-sm font-bold text-white shadow-pop transition hover:bg-ink-800"
              >
                Start 50-Minute Examination
              </button>
              <button
                type="button"
                onClick={onBack}
                className="rounded-xl border border-ink-200 bg-white px-6 py-4 text-sm font-semibold text-ink-700 transition hover:bg-ink-100"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ink-50 pb-20">
      {/* Sticky Top Bar with persistent countdown timer */}
      <header className="sticky top-0 z-30 border-b border-ink-200 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-1 rounded-lg border border-ink-200 bg-white px-3 py-1.5 text-xs font-semibold text-ink-700 transition hover:bg-ink-100"
            >
              <ArrowLeft size={14} /> Exit
            </button>
            <div className="hidden sm:block">
              <p className="text-xs font-bold text-gold-600">CBSE Class 10 Chemistry</p>
              <p className="font-serif text-sm font-bold text-ink-900">Official Question Paper</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {session.state === 'ACTIVE' ? (
              <div
                className={`flex items-center gap-2 rounded-xl border px-3.5 py-1.5 shadow-sm transition-all ${timerWarningClass}`}
              >
                <Clock size={16} className={timeLeft <= 60000 ? 'animate-bounce text-bad-600' : ''} />
                <div className="text-right">
                  <span className="block text-[10px] font-bold uppercase tracking-wider opacity-80">
                    Time Left
                  </span>
                  <span className="font-mono text-base font-black sm:text-lg">
                    {formatTime(timeLeft)}
                  </span>
                </div>
              </div>
            ) : (
              <span className="inline-flex items-center gap-1.5 rounded-xl border border-good-300 bg-good-50 px-3 py-1.5 text-xs font-bold text-good-700">
                <CheckCircle2 size={15} className="text-good-600" /> Paper Submitted / Locked
              </span>
            )}

            {session.state === 'ACTIVE' && (
              <button
                type="button"
                onClick={() => setConfirmSubmitModal(true)}
                className="rounded-lg bg-ink-900 px-3.5 py-2 text-xs font-bold text-white transition hover:bg-ink-800"
              >
                Finish Exam
              </button>
            )}

            {session.state === 'SUBMITTED' && (
              <button
                type="button"
                onClick={() => setConfirmRetakeModal(true)}
                className="inline-flex items-center gap-1 rounded-lg border border-ink-200 bg-white px-3 py-2 text-xs font-semibold text-ink-800 shadow-sm transition hover:bg-ink-100"
              >
                <RotateCcw size={13} /> Reset / Retake
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Examination Sheet Container */}
      <main className="mx-auto max-w-4xl px-4 pt-6 sm:pt-8">
        {/* Exam Paper Sheet */}
        <div className="relative rounded-2xl border border-ink-200 bg-white p-6 shadow-card sm:p-10">
          {/* Paper Top Metadata (CBSE Question Paper Style) */}
          <div className="border-b-2 border-ink-900 pb-6 text-center">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2 text-xs font-mono font-bold text-ink-600">
              <span>Series : {CLASS_10_CHEMISTRY_PAPER.series}</span>
              <span>SET ~ 2</span>
              <span>Q.P. Code : {CLASS_10_CHEMISTRY_PAPER.qpCode}</span>
            </div>

            {/* Candidate Roll Number Input Box Grid */}
            <div className="my-4 flex flex-wrap items-center justify-center gap-2">
              <span className="text-xs font-bold text-ink-700">Roll No. :</span>
              <div className="flex gap-1">
                {rollNumber.map((val, idx) => (
                  <input
                    key={idx}
                    type="text"
                    maxLength={1}
                    value={val}
                    disabled={session.state === 'SUBMITTED'}
                    onChange={(e) => {
                      const next = [...rollNumber];
                      next[idx] = e.target.value.toUpperCase();
                      setRollNumber(next);
                    }}
                    className="h-7 w-6 rounded border border-ink-400 text-center font-mono text-xs font-bold uppercase text-ink-900 focus:border-ink-900 focus:outline-none focus:ring-1 focus:ring-ink-900 disabled:bg-ink-100"
                  />
                ))}
              </div>
            </div>

            <p className="font-serif text-xs font-bold uppercase tracking-[0.25em] text-gold-700">
              Central Board of Secondary Education · Class X
            </p>
            <h1 className="mt-1 font-serif text-3xl font-black uppercase tracking-wide text-ink-900 sm:text-4xl">
              SCIENCE (CHEMISTRY)
            </h1>
            <p className="mt-1 font-serif text-sm font-semibold text-ink-600">
              Chapter 1: Chemical Reactions &amp; Equations · Chapter 2: Acids, Bases &amp; Salts · Chapter 3: Metals &amp; Non-metals
            </p>

            <div className="mt-4 flex items-center justify-between border-t border-ink-200 pt-3 text-xs font-bold text-ink-800">
              <span>Time Allowed : 50 Minutes</span>
              <span>Questions Present : {CLASS_10_QUESTIONS.length}</span>
              <span>Maximum Marks : 80</span>
            </div>
          </div>

          {/* General Instructions */}
          <section className="my-6 rounded-xl border border-ink-100 bg-ink-50 p-4 text-xs leading-relaxed text-ink-700">
            <h2 className="mb-2 font-bold uppercase tracking-wider text-ink-900">
              General Instructions :
            </h2>
            <ol className="list-decimal space-y-1 pl-4">
              <li>This question paper contains authentic Chemistry questions extracted directly from the official CBSE Class 10 examination papers.</li>
              <li>Questions are organized by chapter sections for focused practice across Chapters 1, 2, and 3.</li>
              <li>Write all answers, balanced chemical equations, and explanations clearly on your <strong>physical answer sheet / notebook</strong>.</li>
              <li>The 50-minute exam timer will automatically submit and lock this paper when time ends.</li>
            </ol>
          </section>

          {/* Chapter Quick Filter Buttons */}
          <div className="mb-8 flex flex-wrap items-center gap-2 border-b border-ink-100 pb-4">
            <span className="text-xs font-bold text-ink-600">Filter Chapter:</span>
            <button
              type="button"
              onClick={() => setActiveChapterFilter('ALL')}
              className={`rounded-full px-3 py-1 text-xs font-bold transition ${
                activeChapterFilter === 'ALL'
                  ? 'bg-ink-900 text-white'
                  : 'bg-ink-100 text-ink-700 hover:bg-ink-200'
              }`}
            >
              All Chapters ({CLASS_10_QUESTIONS.length} Qs)
            </button>
            <button
              type="button"
              onClick={() => setActiveChapterFilter('1')}
              className={`rounded-full px-3 py-1 text-xs font-bold transition ${
                activeChapterFilter === '1'
                  ? 'bg-ink-900 text-white'
                  : 'bg-ink-100 text-ink-700 hover:bg-ink-200'
              }`}
            >
              Ch 1: Reactions (8 Qs)
            </button>
            <button
              type="button"
              onClick={() => setActiveChapterFilter('2')}
              className={`rounded-full px-3 py-1 text-xs font-bold transition ${
                activeChapterFilter === '2'
                  ? 'bg-ink-900 text-white'
                  : 'bg-ink-100 text-ink-700 hover:bg-ink-200'
              }`}
            >
              Ch 2: Acids &amp; Salts (9 Qs)
            </button>
            <button
              type="button"
              onClick={() => setActiveChapterFilter('3')}
              className={`rounded-full px-3 py-1 text-xs font-bold transition ${
                activeChapterFilter === '3'
                  ? 'bg-ink-900 text-white'
                  : 'bg-ink-100 text-ink-700 hover:bg-ink-200'
              }`}
            >
              Ch 3: Metals (11 Qs)
            </button>
          </div>

          {/* Questions Stream */}
          <div className="space-y-8">
            {filteredQuestions.map((q, index) => {
              const isFirstOfChapter =
                index === 0 || q.chapterNumber !== filteredQuestions[index - 1]?.chapterNumber;

              return (
                <React.Fragment key={q.id}>
                  {/* Chapter Section Divider Banner */}
                  {isFirstOfChapter && (
                    <div className="my-6 rounded-xl bg-ink-900 px-5 py-3 text-white shadow-sm">
                      <p className="text-[11px] font-bold uppercase tracking-widest text-gold-300">
                        Section / Chapter {q.chapterNumber}
                      </p>
                      <h2 className="font-serif text-lg font-bold sm:text-xl">
                        {q.chapterTitle}
                      </h2>
                    </div>
                  )}

                  {/* Individual Question Item */}
                  <article className="border-b border-ink-100 pb-6 transition hover:bg-ink-50/50">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3 flex-1">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-ink-100 font-mono text-xs font-bold text-ink-900">
                          {q.questionNumber}
                        </span>
                        <div className="flex-1">
                          <p className="text-sm font-medium leading-relaxed text-ink-900 whitespace-pre-line">
                            {q.question}
                          </p>

                          {/* MCQ Options Display */}
                          {q.options && Object.keys(q.options).length > 0 && (
                            <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                              {Object.entries(q.options).map(([letter, text]) => (
                                <div
                                  key={letter}
                                  className="flex items-start gap-2 rounded-lg border border-ink-200 bg-white p-2.5 text-xs text-ink-800"
                                >
                                  <span className="font-mono font-bold text-ink-900">({letter})</span>
                                  <span className="flex-1">{text}</span>
                                </div>
                              ))}
                            </div>
                          )}

                          {q.sourceRef && (
                            <p className="mt-2 text-[10px] font-mono text-ink-400">
                              Source: {q.sourceRef}
                            </p>
                          )}
                        </div>
                      </div>

                      <span className="shrink-0 rounded bg-ink-100 px-2 py-0.5 font-mono text-xs font-bold text-ink-700">
                        [{q.marks} {q.marks > 1 ? 'Marks' : 'Mark'}]
                      </span>
                    </div>
                  </article>
                </React.Fragment>
              );
            })}
          </div>

          {/* End of Paper Sign */}
          <div className="mt-12 border-t-2 border-ink-900 pt-6 text-center">
            <p className="font-serif text-sm font-bold uppercase tracking-widest text-ink-700">
              — End of Chemistry Question Paper —
            </p>
            <p className="mt-1 text-xs text-ink-500">
              Check your physical answer sheet carefully before submitting to your invigilator.
            </p>
          </div>
        </div>
      </main>

      {/* Submission Confirmation Modal */}
      {confirmSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-950/60 p-4 animate-fade-in">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-pop animate-rise-in">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gold-100 text-gold-700">
              <AlertTriangle size={24} />
            </div>
            <h2 className="text-lg font-bold text-ink-900">Finish &amp; Lock Examination?</h2>
            <p className="mt-2 text-sm text-ink-600">
              Once submitted, the examination will be locked. Please make sure you have written down all your answers on your physical answer book.
            </p>
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setConfirmSubmitModal(false)}
                className="flex-1 rounded-xl border border-ink-200 py-3 text-sm font-semibold text-ink-700 transition hover:bg-ink-100"
              >
                Continue Writing
              </button>
              <button
                type="button"
                onClick={handleManualSubmit}
                className="flex-1 rounded-xl bg-ink-900 py-3 text-sm font-bold text-white transition hover:bg-ink-800"
              >
                Yes, Lock Exam
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Retake Confirmation Modal */}
      {confirmRetakeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-950/60 p-4 animate-fade-in">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-pop animate-rise-in">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-ink-100 text-ink-900">
              <RotateCcw size={24} />
            </div>
            <h2 className="text-lg font-bold text-ink-900">Reset &amp; Start Fresh Attempt?</h2>
            <p className="mt-2 text-sm text-ink-600">
              This will clear the current submitted state and restart the 50-minute examination timer from 50:00.
            </p>
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setConfirmRetakeModal(false)}
                className="flex-1 rounded-xl border border-ink-200 py-3 text-sm font-semibold text-ink-700 transition hover:bg-ink-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleResetExam}
                className="flex-1 rounded-xl bg-ink-900 py-3 text-sm font-bold text-white transition hover:bg-ink-800"
              >
                Reset &amp; Start
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Auto-Submitted Floating Notification Banner */}
      {session.state === 'SUBMITTED' && (
        <div className="fixed inset-x-4 bottom-6 z-40 mx-auto max-w-lg rounded-2xl border border-gold-300 bg-ink-900 p-4 text-white shadow-pop animate-rise-in">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold-400 text-ink-950">
              <Lock size={20} />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-bold text-white">Time's Up — Examination Concluded</h3>
              <p className="mt-1 text-xs leading-relaxed text-ink-200">
                Your 50-minute exam time has ended and the paper is locked. Please submit your physical answer sheet to your teacher for evaluation.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
