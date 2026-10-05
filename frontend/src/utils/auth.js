const USERS_STORAGE_KEY = 'neet_users_list_v1';
const CURRENT_USER_KEY = 'neet_current_user_v1';
const ATTEMPTS_STORAGE_PREFIX = 'neet_user_attempts_v1_';

const getApiBase = () => {
  const envUrl = import.meta.env.VITE_API_URL;
  if (!envUrl || typeof envUrl !== 'string' || !envUrl.trim()) {
    return 'https://neet-test-app.onrender.com/api';
  }
  const clean = envUrl.trim().replace(/\/+$/, '');
  return clean.endsWith('/api') ? clean : `${clean}/api`;
};

export const API_BASE = getApiBase();

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

/**
 * Register user with Backend API sync and LocalStorage fallback
 */
export async function registerUser({ name, email, password, role = 'student' }) {
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

  let sessionUser = null;

  // 1. Try Backend API Registration
  try {
    const response = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        name: cleanName,
        email: cleanEmail,
        password: cleanPassword,
        role: role.toLowerCase(),
      }),
    });

    const data = await response.json();

    if (response.ok && data?.data?.user) {
      sessionUser = {
        id: data.data.user.id || data.data.user._id,
        name: data.data.user.name,
        email: data.data.user.email,
        role: (data.data.user.role || role || 'student').toLowerCase(),
        targetExam: 'NEET 2027',
        token: data.data.token,
        createdAt: data.data.user.createdAt || new Date().toISOString(),
      };
    } else if (!response.ok && data?.message) {
      // If backend explicitly rejected (e.g. duplicate email)
      return { success: false, error: data.message };
    }
  } catch (err) {
    console.warn('Backend sync unavailable during registration, using local store:', err.message);
  }

  // 2. Local Fallback if server offline or to mirror locally
  const users = getUsers();
  const existing = users.find((u) => u.email.toLowerCase() === cleanEmail);

  if (!sessionUser) {
    if (existing) {
      return { success: false, error: 'An account with this email address already exists. Please sign in.' };
    }

    sessionUser = {
      id: `user_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      name: cleanName,
      email: cleanEmail,
      role: role.toLowerCase(),
      targetExam: 'NEET 2027',
      createdAt: new Date().toISOString(),
    };
  }

  if (!existing) {
    users.push({
      ...sessionUser,
      password: cleanPassword,
    });
    saveUsers(users);
  }

  setCurrentUser(sessionUser);
  return { success: true, user: sessionUser };
}

/**
 * Login user with Backend API sync and LocalStorage fallback
 */
export async function loginUser({ email, password }) {
  const cleanEmail = (email || '').toLowerCase().trim();
  const cleanPassword = (password || '').trim();

  if (!cleanEmail) {
    return { success: false, error: 'Email is required.' };
  }

  if (!cleanPassword) {
    return { success: false, error: 'Password is required.' };
  }

  let sessionUser = null;

  // 1. Try Backend API Login
  try {
    const response = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        email: cleanEmail,
        password: cleanPassword,
      }),
    });

    const data = await response.json();

    if (response.ok && data?.data?.user) {
      sessionUser = {
        id: data.data.user.id || data.data.user._id,
        name: data.data.user.name,
        email: data.data.user.email,
        role: (data.data.user.role || 'student').toLowerCase(),
        targetExam: 'NEET 2027',
        token: data.data.token,
        createdAt: data.data.user.createdAt || new Date().toISOString(),
      };
    } else if (response.status === 401 || response.status === 403) {
      return { success: false, error: data?.message || 'Invalid email or password.' };
    }
  } catch (err) {
    console.warn('Backend sync unavailable during login, trying local store:', err.message);
  }

  // 2. Local Fallback Verification
  if (!sessionUser) {
    const users = getUsers();
    const user = users.find((u) => u.email.toLowerCase() === cleanEmail);

    if (!user || user.password !== cleanPassword) {
      return { success: false, error: 'Invalid email or password. Please try again.' };
    }

    sessionUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: (user.role || 'student').toLowerCase(),
      targetExam: user.targetExam || 'NEET 2027',
      createdAt: user.createdAt,
    };
  }

  setCurrentUser(sessionUser);
  return { success: true, user: sessionUser };
}

export async function logoutUser() {
  try {
    await fetch(`${API_BASE}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    });
  } catch (e) {
    // Ignore network errors during logout
  }
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

/**
 * Save user test attempt locally and sync to Backend MongoDB
 */
export function saveUserAttempt(email, attemptData) {
  try {
    const attempts = getUserAttempts(email);
    const newAttempt = {
      id: `attempt_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      timestamp: new Date().toISOString(),
      attemptNumber: attempts.length + 1,
      studentEmail: email,
      ...attemptData,
    };
    attempts.push(newAttempt);
    window.localStorage.setItem(getAttemptsKey(email), JSON.stringify(attempts));

    // Asynchronously sync to Backend API
    syncAttemptToBackend(email, newAttempt);

    return newAttempt;
  } catch (err) {
    console.error('Failed to save user attempt:', err);
    return null;
  }
}

async function syncAttemptToBackend(email, attempt) {
  try {
    const currentUser = getCurrentUser();
    await fetch(`${API_BASE}/results/sync`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(currentUser?.token ? { Authorization: `Bearer ${currentUser.token}` } : {}),
      },
      credentials: 'include',
      body: JSON.stringify({
        ...attempt,
        studentEmail: email || currentUser?.email,
        studentName: currentUser?.name || attempt.studentName || 'Student',
      }),
    });
  } catch (err) {
    console.warn('Could not sync attempt to backend in real-time:', err.message);
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

/**
 * Fetch live platform stats (Total registered users, total tests, global leaderboard)
 */
export async function getGlobalPlatformStats() {
  try {
    const response = await fetch(`${API_BASE}/auth/stats`, {
      credentials: 'include',
    });
    if (response.ok) {
      const data = await response.json();
      if (data?.data) {
        return {
          ...data.data,
          isLive: true,
        };
      }
    }
  } catch (err) {
    console.warn('Failed to fetch stats from backend API, calculating local fallback:', err.message);
  }

  // Local fallback calculation
  const users = getUsers();
  const allAttempts = [];
  users.forEach((u) => {
    const userAttempts = getUserAttempts(u.email);
    userAttempts.forEach((a) => {
      allAttempts.push({
        ...a,
        studentName: u.name,
        email: u.email,
      });
    });
  });

  const scores = allAttempts.map((a) => a.score || 0);
  const highestScore = scores.length > 0 ? Math.max(...scores) : 0;
  const avgScore =
    scores.length > 0 ? Math.round((scores.reduce((a, b) => a + b, 0) / scores.length) * 10) / 10 : 0;

  const leaderboard = allAttempts
    .sort((a, b) => (b.score || 0) - (a.score || 0))
    .slice(0, 10)
    .map((item, idx) => ({
      rank: idx + 1,
      studentName: item.studentName || 'Student',
      score: item.score || 0,
      maxScore: item.maxScore || 240,
      accuracy: Math.round(item.accuracy || 0),
      submittedAt: item.timestamp,
    }));

  return {
    totalUsers: Math.max(users.length, 1),
    totalAttempts: allAttempts.length,
    averageScore: avgScore,
    highestScore,
    leaderboard,
    recentSubmissions: allAttempts.slice(0, 5),
    allCandidates: users,
    isLive: false,
  };
}

/**
 * Fetch detailed Admin Overview (total users, active users, student progress)
 */
export async function getAdminOverview() {
  let remoteData = null;
  try {
    const currentUser = getCurrentUser();
    const response = await fetch(`${API_BASE}/admin/overview`, {
      headers: {
        ...(currentUser?.token ? { Authorization: `Bearer ${currentUser.token}` } : {}),
      },
      credentials: 'include',
    });

    if (response.ok) {
      const data = await response.json();
      if (data?.data) {
        remoteData = data.data;
      }
    }
  } catch (err) {
    console.warn('Failed to fetch admin overview from backend API:', err.message);
  }

  // Fallback and local reconciliation
  const stats = await getGlobalPlatformStats();
  const allUsers = getUsers();

  const studentsList = allUsers.map((u) => {
    const attempts = getUserAttempts(u.email);
    const scores = attempts.map((a) => a.score ?? 0);
    const latest = attempts.length > 0 ? attempts[attempts.length - 1] : null;
    const best = scores.length > 0 ? Math.max(...scores) : null;
    const avgAcc =
      attempts.length > 0
        ? Math.round((attempts.reduce((sum, a) => sum + (a.accuracy || 0), 0) / attempts.length) * 10) / 10
        : null;

    return {
      id: u.id || `user_${u.email}`,
      name: u.name || 'Candidate',
      email: u.email,
      role: u.role || 'student',
      status: 'active',
      registeredAt: u.registeredAt || u.createdAt || new Date().toISOString(),
      lastActive: latest?.timestamp || u.registeredAt || u.createdAt,
      totalAttempts: attempts.length,
      latestScore: latest?.score ?? null,
      bestScore: best,
      averageAccuracy: avgAcc,
      attempts: [...attempts].reverse(), // latest first
    };
  });

  if (remoteData?.students && remoteData.students.length > 0) {
    // Merge remote students with local attempts if available
    const mergedStudents = remoteData.students.map((rs) => {
      const local = studentsList.find((s) => s.email.toLowerCase() === (rs.email || '').toLowerCase());
      const atts = (rs.attempts && rs.attempts.length > 0) ? rs.attempts : (local?.attempts || []);
      return {
        ...rs,
        attempts: atts,
        totalAttempts: atts.length || rs.totalAttempts || 0,
        latestScore: atts.length > 0 ? atts[0].score : (rs.latestScore ?? null),
        bestScore: atts.length > 0 ? Math.max(...atts.map((a) => a.score ?? 0)) : (rs.bestScore ?? null),
      };
    });

    return {
      ...remoteData,
      students: mergedStudents,
      isLive: true,
    };
  }

  const activeCount = studentsList.filter((s) => s.totalAttempts > 0).length;
  const allAttCount = studentsList.reduce((sum, s) => sum + s.totalAttempts, 0);

  return {
    totalUsers: Math.max(studentsList.length, stats.totalUsers || 1),
    activeUsers: activeCount,
    totalAttempts: allAttCount,
    averageScore: stats.averageScore || 0,
    students: studentsList,
    isLive: false,
  };
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
