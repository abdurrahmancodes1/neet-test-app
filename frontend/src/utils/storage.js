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
