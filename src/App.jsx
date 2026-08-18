import React, { useCallback, useEffect, useState } from 'react';
import { TEST_DURATION_MINUTES } from './data/questions.js';
import { loadSession, saveSession, clearSession, freshSession } from './utils/storage.js';
import LoginPage from './pages/LoginPage.jsx';
import ChapterTestsPage from './pages/ChapterTestsPage.jsx';
import TestInstructionsPage from './pages/TestInstructionsPage.jsx';
import TestPage from './pages/TestPage.jsx';
import ResultPage from './pages/ResultPage.jsx';

const LOGIN_KEY = 'neet_logged_in';
const DURATION_MS = TEST_DURATION_MINUTES * 60 * 1000;
const isLoggedIn = () => { try { return window.localStorage.getItem(LOGIN_KEY) === 'true'; } catch { return false; } };

export default function App() {
  const [loggedIn, setLoggedIn] = useState(isLoggedIn);
  const [screen, setScreen] = useState('chapters');
  const [session, setSession] = useState(loadSession);
  useEffect(() => { if (session.state === 'IN_PROGRESS' && session.endTime && Date.now() >= session.endTime) { const next = { ...session, state: 'SUBMITTED', submittedAt: session.endTime, autoSubmitted: true }; saveSession(next); setSession(next); } }, []);
  const updateSession = useCallback((updater) => setSession((previous) => { const next = typeof updater === 'function' ? updater(previous) : updater; saveSession(next); return next; }), []);
  const login = useCallback(() => { window.localStorage.setItem(LOGIN_KEY, 'true'); setLoggedIn(true); setScreen('chapters'); }, []);
  const logout = useCallback(() => { window.localStorage.removeItem(LOGIN_KEY); setLoggedIn(false); setScreen('chapters'); }, []);
  const startTest = useCallback(async () => { const next = freshSession(DURATION_MS); saveSession(next); setSession(next); setScreen('test'); try { await document.documentElement.requestFullscreen(); } catch (error) { console.warn('Fullscreen request failed:', error); } }, []);
  const submitTest = useCallback((auto) => { updateSession((previous) => previous.state === 'SUBMITTED' ? previous : ({ ...previous, state: 'SUBMITTED', submittedAt: Math.min(Date.now(), previous.endTime ?? Date.now()), autoSubmitted: auto })); setScreen('result'); }, [updateSession]);
  const retake = useCallback(() => { clearSession(); setSession(loadSession()); setScreen('instructions'); }, []);
  useEffect(() => { if (screen !== 'test') return undefined; const handleFullscreenChange = () => { if (document.fullscreenElement === null) submitTest(true); }; document.addEventListener('fullscreenchange', handleFullscreenChange); return () => document.removeEventListener('fullscreenchange', handleFullscreenChange); }, [screen, submitTest]);
  if (!loggedIn) return <LoginPage onLogin={login} />;
  if (screen === 'chapters') return <ChapterTestsPage onSelect={() => setScreen('instructions')} onLogout={logout} />;
  if (screen === 'instructions') return <TestInstructionsPage onBack={() => setScreen('chapters')} onStart={startTest} />;
  if (screen === 'test') return <TestPage session={session} updateSession={updateSession} onSubmit={submitTest} />;
  return <ResultPage session={session} onRetake={retake} />;
}
