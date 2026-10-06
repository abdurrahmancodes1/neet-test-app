import { API_BASE } from './auth.js';
import { computeResult } from './scoring.js';

const getStorageKey = (testId) => {
  if (!testId || testId === 'laws-of-motion') {
    return 'neet-chem-bonding-test-session-v1';
  }
  return `neet-session-${testId}-v1`;
};

const defaultSession = (testId = 'laws-of-motion') => ({
  testId,
  state: 'NOT_STARTED', // NOT_STARTED | IN_PROGRESS | SUBMITTED
  answers: {}, // { [questionId]: 'A' | 'B' | 'C' | 'D' }
  markedForReview: [], // [questionId]
  visited: [], // [questionId]
  currentQuestion: 0,
  startTime: null,
  endTime: null,
  submittedAt: null,
  autoSubmitted: false,
});

export function loadSession(testId) {
  try {
    const raw = window.localStorage.getItem(getStorageKey(testId));
    if (!raw) return defaultSession(testId);
    const parsed = JSON.parse(raw);
    return { ...defaultSession(testId), ...parsed };
  } catch (err) {
    console.error('Failed to load test session from localStorage:', err);
    return defaultSession(testId);
  }
}

export function saveSession(session, testId) {
  try {
    const id = testId || session?.testId;
    window.localStorage.setItem(getStorageKey(id), JSON.stringify(session));
    return true;
  } catch (err) {
    console.error('Failed to save test session to localStorage:', err);
    return false;
  }
}

export function clearSession(testId) {
  try {
    window.localStorage.removeItem(getStorageKey(testId));
    return true;
  } catch (err) {
    console.error('Failed to clear test session from localStorage:', err);
    return false;
  }
}

export function freshSession(durationMs, testId = 'laws-of-motion') {
  const now = Date.now();
  return {
    ...defaultSession(testId),
    testId,
    state: 'IN_PROGRESS',
    startTime: now,
    endTime: now + durationMs,
  };
}

let liveSyncTimer = null;

function buildLiveSessionPayload(session, testId, user, questions = []) {
  const answers = session.answers || {};
  let computed = {
    score: 0,
    rawScore: 0,
    maxScore: questions.length * 4 || 240,
    percentage: 0,
    accuracy: 0,
    correct: 0,
    wrong: 0,
    unattempted: questions.length || 0,
    totalQuestions: questions.length || 0,
    topicPerformance: [],
    weakestTopics: [],
    strongestTopics: [],
    perQuestion: [],
  };

  if (questions.length > 0) {
    computed = computeResult(answers, questions);
  }

  const timeTakenMs = session.startTime ? Math.max(0, Date.now() - session.startTime) : 0;

  return {
    sessionId: `live_${(user?.email || 'guest').toLowerCase()}_${testId}`,
    testId,
    studentEmail: (user?.email || '').toLowerCase().trim(),
    studentName: user?.name || 'Candidate',
    studentRollNumber: user?.rollNumber || null,
    answers,
    markedForReview: session.markedForReview || [],
    visited: session.visited || [],
    currentQuestion: session.currentQuestion || 0,
    durationMinutes: session.durationMinutes || 120,
    startTime: session.startTime || Date.now(),
    endTime: session.endTime || Date.now() + 120 * 60 * 1000,
    timeTakenMs,
    score: computed.score,
    rawScore: computed.rawScore,
    maxScore: computed.maxScore,
    percentage: computed.percentage,
    accuracy: computed.accuracy,
    correct: computed.correct,
    wrong: computed.wrong,
    unattempted: computed.unattempted,
    totalQuestions: computed.totalQuestions,
    perQuestion: computed.perQuestion,
    topicPerformance: computed.topicPerformance,
    weakestTopics: computed.weakestTopics,
    strongestTopics: computed.strongestTopics,
    status: 'in_progress',
  };
}

/**
 * Sync live in-progress test state to backend with debouncing and keepalive
 */
export function syncLiveSessionToBackend(session, testId, user, questions = [], immediate = false) {
  if (!session || session.state !== 'IN_PROGRESS' || !user?.email) return;

  const payload = buildLiveSessionPayload(session, testId, user, questions);

  const doSync = () => {
    try {
      fetch(`${API_BASE}/results/live-sync`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(user?.token ? { Authorization: `Bearer ${user.token}` } : {}),
        },
        credentials: 'include',
        keepalive: true,
        body: JSON.stringify(payload),
      }).catch((err) => {
        console.warn('Live session backend sync failed:', err.message);
      });
    } catch (e) {}
  };

  if (immediate) {
    if (liveSyncTimer) clearTimeout(liveSyncTimer);
    doSync();
  } else {
    if (liveSyncTimer) clearTimeout(liveSyncTimer);
    liveSyncTimer = setTimeout(doSync, 600);
  }
}

/**
 * Fetch active live session from backend to restore in-progress test
 */
export async function fetchLiveSessionFromBackend(testId, email, token) {
  if (!testId || !email) return null;
  try {
    const res = await fetch(
      `${API_BASE}/results/live-session/${encodeURIComponent(testId)}?email=${encodeURIComponent(email)}`,
      {
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        credentials: 'include',
      }
    );
    if (res.ok) {
      const data = await res.json();
      if (data?.data && data.data.status === 'in_progress') {
        const ls = data.data;
        // Check if session has not expired yet
        if (ls.endTime && Date.now() < ls.endTime + 60000) {
          return {
            testId: ls.testId,
            state: 'IN_PROGRESS',
            answers: ls.answers || {},
            markedForReview: ls.markedForReview || [],
            visited: ls.visited || [],
            currentQuestion: ls.currentQuestion || 0,
            startTime: ls.startTime,
            endTime: ls.endTime,
            durationMinutes: ls.durationMinutes,
          };
        }
      }
    }
  } catch (err) {
    console.warn('Failed to fetch live session from backend:', err.message);
  }
  return null;
}

/**
 * Clear live session from backend when student retakes or cancels
 */
export async function clearLiveSessionFromBackend(testId, email, token) {
  if (!testId || !email) return;
  try {
    await fetch(
      `${API_BASE}/results/live-session/${encodeURIComponent(testId)}?email=${encodeURIComponent(email)}`,
      {
        method: 'DELETE',
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        credentials: 'include',
      }
    );
  } catch (err) {}
}
