const USERS_STORAGE_KEY = 'neet_users_list_v1';
const CURRENT_USER_KEY = 'neet_current_user_v1';
const ATTEMPTS_STORAGE_PREFIX = 'neet_user_attempts_v1_';

export function getUsers() {
  try {
    const raw = window.localStorage.getItem(USERS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error('Failed to get users:', err);
    return [];
  }
}

export function saveUsers(users) {
  try {
    window.localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  } catch (err) {
    console.error('Failed to save users:', err);
  }
}

export function getCurrentUser() {
  try {
    const raw = window.localStorage.getItem(CURRENT_USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (err) {
    console.error('Failed to get current user:', err);
    return null;
  }
}

export function setCurrentUser(user) {
  try {
    if (user) {
      window.localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    } else {
      window.localStorage.removeItem(CURRENT_USER_KEY);
    }
  } catch (err) {
    console.error('Failed to set current user:', err);
  }
}

export function registerUser({ name, email, password }) {
  const cleanName = (name || '').trim();
  const cleanEmail = (email || '').toLowerCase().trim();
  const cleanPassword = (password || '').trim();

  if (!cleanName || cleanName.length < 2) {
    return { success: false, error: 'Please enter your full name (at least 2 characters).' };
  }

  if (!cleanEmail || !/^\S+@\S+\.\S+$/.test(cleanEmail)) {
    return { success: false, error: 'Please enter a valid email address.' };
  }

  if (!cleanPassword || cleanPassword.length < 6) {
    return { success: false, error: 'Password must be at least 6 characters long.' };
  }

  const users = getUsers();
  const existing = users.find((u) => u.email.toLowerCase() === cleanEmail);

  if (existing) {
    return { success: false, error: 'An account with this email address already exists. Please sign in.' };
  }

  const newUser = {
    id: `user_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    name: cleanName,
    email: cleanEmail,
    password: cleanPassword,
    targetExam: 'NEET 2027',
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  saveUsers(users);

  // Auto-login registered user (without exposing password in session state)
  const sessionUser = {
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
    targetExam: newUser.targetExam,
    createdAt: newUser.createdAt,
  };
  setCurrentUser(sessionUser);

  return { success: true, user: sessionUser };
}

export function loginUser({ email, password }) {
  const cleanEmail = (email || '').toLowerCase().trim();
  const cleanPassword = (password || '').trim();

  if (!cleanEmail) {
    return { success: false, error: 'Email is required.' };
  }

  if (!cleanPassword) {
    return { success: false, error: 'Password is required.' };
  }

  const users = getUsers();
  const user = users.find((u) => u.email.toLowerCase() === cleanEmail);

  if (!user || user.password !== cleanPassword) {
    return { success: false, error: 'Invalid email or password. Please try again.' };
  }

  const sessionUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    targetExam: user.targetExam || 'NEET 2027',
    createdAt: user.createdAt,
  };
  setCurrentUser(sessionUser);

  return { success: true, user: sessionUser };
}

export function logoutUser() {
  setCurrentUser(null);
}

// User Attempts Management
function getAttemptsKey(email) {
  const cleanEmail = (email || 'guest').toLowerCase().trim();
  return `${ATTEMPTS_STORAGE_PREFIX}${cleanEmail}`;
}

export function getUserAttempts(email) {
  try {
    const raw = window.localStorage.getItem(getAttemptsKey(email));
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error('Failed to get user attempts:', err);
    return [];
  }
}

export function saveUserAttempt(email, attemptData) {
  try {
    const attempts = getUserAttempts(email);
    const newAttempt = {
      id: `attempt_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      timestamp: new Date().toISOString(),
      attemptNumber: attempts.length + 1,
      ...attemptData,
    };
    attempts.push(newAttempt);
    window.localStorage.setItem(getAttemptsKey(email), JSON.stringify(attempts));
    return newAttempt;
  } catch (err) {
    console.error('Failed to save user attempt:', err);
    return null;
  }
}

export function deleteUserAttempt(email, attemptId) {
  try {
    const attempts = getUserAttempts(email);
    const filtered = attempts.filter((a) => a.id !== attemptId);
    window.localStorage.setItem(getAttemptsKey(email), JSON.stringify(filtered));
    return filtered;
  } catch (err) {
    console.error('Failed to delete user attempt:', err);
    return [];
  }
}

export function getUserAnalytics(email) {
  const attempts = getUserAttempts(email);
  if (!attempts || attempts.length === 0) {
    return {
      totalAttempts: 0,
      latestAttempt: null,
      previousAttempt: null,
      bestAttempt: null,
      averageScore: 0,
      averageAccuracy: 0,
      scoreTrend: [],
      topicMastery: {},
    };
  }

  const sortedByDate = [...attempts].sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );

  const latestAttempt = sortedByDate[sortedByDate.length - 1];
  const previousAttempt = sortedByDate.length > 1 ? sortedByDate[sortedByDate.length - 2] : null;

  const bestAttempt = [...attempts].reduce((best, cur) => {
    return (cur.score ?? 0) > (best.score ?? 0) ? cur : best;
  }, attempts[0]);

  const totalScore = attempts.reduce((sum, a) => sum + (a.score || 0), 0);
  const totalAccuracy = attempts.reduce((sum, a) => sum + (a.accuracy || 0), 0);
  const averageScore = Math.round((totalScore / attempts.length) * 10) / 10;
  const averageAccuracy = Math.round((totalAccuracy / attempts.length) * 10) / 10;

  const scoreTrend = sortedByDate.map((a, index) => ({
    attempt: `Attempt ${index + 1}`,
    shortDate: new Date(a.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
    score: a.score,
    maxScore: a.maxScore || 240,
    accuracy: Math.round(a.accuracy),
    correct: a.correct,
    wrong: a.wrong,
    unattempted: a.unattempted,
  }));

  // Aggregate topic mastery
  const topicMap = {};
  attempts.forEach((a) => {
    if (a.topicPerformance && Array.isArray(a.topicPerformance)) {
      a.topicPerformance.forEach((tp) => {
        if (!topicMap[tp.topic]) {
          topicMap[tp.topic] = { topic: tp.topic, totalAttempted: 0, totalCorrect: 0, history: [] };
        }
        topicMap[tp.topic].totalAttempted += tp.total || 0;
        topicMap[tp.topic].totalCorrect += tp.correct || 0;
        topicMap[tp.topic].history.push(tp.mastery);
      });
    }
  });

  return {
    totalAttempts: attempts.length,
    latestAttempt,
    previousAttempt,
    bestAttempt,
    averageScore,
    averageAccuracy,
    scoreTrend,
    topicMap,
    allAttempts: sortedByDate.reverse(), // most recent first
  };
}
