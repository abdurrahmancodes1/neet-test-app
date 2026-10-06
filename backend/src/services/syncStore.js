import fs from 'fs';
import path from 'path';
import os from 'os';

let memoryStore = { users: [], results: [], liveSessions: [] };

function getStoreFilePath() {
  try {
    // In serverless / dev, use OS temp directory
    const tempDir = os.tmpdir();
    return path.join(tempDir, 'neet_sync_store.json');
  } catch {
    return null;
  }
}

function loadStore() {
  const filePath = getStoreFilePath();
  if (filePath) {
    try {
      if (fs.existsSync(filePath)) {
        const raw = fs.readFileSync(filePath, 'utf-8');
        const parsed = JSON.parse(raw);
        return {
          users: parsed.users || [],
          results: parsed.results || [],
          liveSessions: parsed.liveSessions || [],
        };
      }
    } catch {
      // Fallback to memory
    }
  }
  return memoryStore;
}

function persistStore(data) {
  memoryStore = data;
  const filePath = getStoreFilePath();
  if (filePath) {
    try {
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    } catch {
      // Ignore read-only filesystem errors gracefully
    }
  }
}

export class SyncStore {
  static getUsers() {
    const data = loadStore();
    return data.users || [];
  }

  static saveUser(user) {
    const data = loadStore();
    data.users = data.users || [];
    const existingIdx = data.users.findIndex(
      (u) => (u.email || '').toLowerCase() === (user.email || '').toLowerCase()
    );
    if (existingIdx >= 0) {
      data.users[existingIdx] = { ...data.users[existingIdx], ...user };
    } else {
      data.users.push(user);
    }
    persistStore(data);
    return user;
  }

  static findUserByEmail(email) {
    const users = this.getUsers();
    return users.find((u) => (u.email || '').toLowerCase() === (email || '').toLowerCase().trim());
  }

  static getResults() {
    const data = loadStore();
    return data.results || [];
  }

  static saveResult(result) {
    const data = loadStore();
    data.results = data.results || [];
    const existingIdx = data.results.findIndex(
      (r) => r.id === result.id || (r.attemptId && r.attemptId === result.attemptId)
    );
    if (existingIdx >= 0) {
      data.results[existingIdx] = { ...data.results[existingIdx], ...result };
    } else {
      data.results.push(result);
    }

    // When finalized result is saved, remove matching live session if any
    if (result.studentEmail && result.testId) {
      this.removeLiveSession(result.studentEmail, result.testId);
    }

    persistStore(data);
    return result;
  }

  // Live Test Session Management
  static getLiveSessions() {
    const data = loadStore();
    return data.liveSessions || [];
  }

  static saveLiveSession(session) {
    const data = loadStore();
    data.liveSessions = data.liveSessions || [];
    const sessId = session.sessionId || `${session.studentEmail}_${session.testId}`;
    const existingIdx = data.liveSessions.findIndex(
      (ls) =>
        ls.sessionId === sessId ||
        ((ls.studentEmail || '').toLowerCase() === (session.studentEmail || '').toLowerCase() &&
          ls.testId === session.testId)
    );

    const fullSession = {
      ...session,
      sessionId: sessId,
      updatedAt: new Date().toISOString(),
    };

    if (existingIdx >= 0) {
      data.liveSessions[existingIdx] = { ...data.liveSessions[existingIdx], ...fullSession };
    } else {
      data.liveSessions.push(fullSession);
    }

    persistStore(data);
    return fullSession;
  }

  static findLiveSession(email, testId) {
    if (!email || !testId) return null;
    const sessions = this.getLiveSessions();
    const cleanEmail = email.toLowerCase().trim();
    return (
      sessions.find(
        (s) =>
          (s.studentEmail || '').toLowerCase() === cleanEmail &&
          s.testId === testId &&
          s.status === 'in_progress'
      ) || null
    );
  }

  static removeLiveSession(email, testId) {
    if (!email) return;
    const data = loadStore();
    const cleanEmail = email.toLowerCase().trim();
    data.liveSessions = (data.liveSessions || []).filter(
      (s) =>
        !(
          (s.studentEmail || '').toLowerCase() === cleanEmail &&
          (!testId || s.testId === testId)
        )
    );
    persistStore(data);
  }

  static getStats() {
    const users = this.getUsers();
    const results = this.getResults();

    const totalUsers = users.length;
    const totalAttempts = results.length;
    const scores = results.map((r) => r.score || 0);
    const highestScore = scores.length > 0 ? Math.max(...scores) : 0;
    const avgScore =
      scores.length > 0 ? Math.round((scores.reduce((a, b) => a + b, 0) / scores.length) * 10) / 10 : 0;

    // Leaderboard
    const studentBestMap = new Map();
    results.forEach((r) => {
      const key = (r.studentEmail || r.studentName || 'candidate').toLowerCase();
      if (!studentBestMap.has(key) || studentBestMap.get(key).score < (r.score || 0)) {
        studentBestMap.set(key, {
          id: r.id || key,
          studentName: r.studentName || 'Anonymous Student',
          email: r.studentEmail || null,
          rollNumber: r.studentRollNumber || null,
          score: r.score || 0,
          maxScore: r.maxScore || 240,
          accuracy: Math.round(r.accuracy || 0),
          correctCount: r.correct || r.correctCount || 0,
          wrongCount: r.wrong || r.wrongCount || 0,
          submittedAt: r.timestamp || r.submittedAt || new Date().toISOString(),
        });
      }
    });

    const leaderboard = Array.from(studentBestMap.values())
      .sort((a, b) => b.score - a.score)
      .map((item, idx) => ({ ...item, rank: idx + 1 }));

    const recentSubmissions = [...results]
      .sort((a, b) => new Date(b.timestamp || b.submittedAt || 0) - new Date(a.timestamp || a.submittedAt || 0))
      .slice(0, 15)
      .map((r) => ({
        id: r.id,
        studentName: r.studentName || 'Anonymous Student',
        email: r.studentEmail || null,
        score: r.score,
        maxScore: r.maxScore || 240,
        accuracy: Math.round(r.accuracy || 0),
        correctCount: r.correct || r.correctCount || 0,
        wrongCount: r.wrong || r.wrongCount || 0,
        submittedAt: r.timestamp || r.submittedAt,
      }));

    return {
      totalUsers,
      totalAttempts,
      averageScore: avgScore,
      highestScore,
      leaderboard,
      recentSubmissions,
      allCandidates: users.map((u) => ({
        id: u.id,
        name: u.name,
        email: u.email,
        targetExam: u.targetExam || 'NEET 2027',
        registeredAt: u.createdAt,
      })),
    };
  }
}
