const STORAGE_KEY = 'neet-chem-bonding-test-session-v1';

const defaultSession = () => ({
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

export function loadSession() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultSession();
    const parsed = JSON.parse(raw);
    return { ...defaultSession(), ...parsed };
  } catch (err) {
    console.error('Failed to load test session from localStorage:', err);
    return defaultSession();
  }
}

export function saveSession(session) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    return true;
  } catch (err) {
    console.error('Failed to save test session to localStorage:', err);
    return false;
  }
}

export function clearSession() {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (err) {
    console.error('Failed to clear test session from localStorage:', err);
    return false;
  }
}

export function freshSession(durationMs) {
  const now = Date.now();
  return {
    ...defaultSession(),
    state: 'IN_PROGRESS',
    startTime: now,
    endTime: now + durationMs,
  };
}
