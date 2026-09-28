import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname, '../../data');
const STORE_FILE = path.join(DATA_DIR, 'sync_store.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

function loadStore() {
  try {
    if (fs.existsSync(STORE_FILE)) {
      const raw = fs.readFileSync(STORE_FILE, 'utf-8');
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error('Error loading sync_store.json:', err);
  }
  return { users: [], results: [] };
}

function persistStore(data) {
  try {
    fs.writeFileSync(STORE_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving sync_store.json:', err);
  }
}

export class SyncStore {
  static getUsers() {
    const data = loadStore();
    return data.users || [];
  }

  static saveUser(user) {
    const data = loadStore();
    const existingIdx = (data.users || []).findIndex(
      (u) => u.email.toLowerCase() === user.email.toLowerCase()
    );
    if (existingIdx >= 0) {
      data.users[existingIdx] = { ...data.users[existingIdx], ...user };
    } else {
      data.users = data.users || [];
      data.users.push(user);
    }
    persistStore(data);
    return user;
  }

  static findUserByEmail(email) {
    const users = this.getUsers();
    return users.find((u) => u.email.toLowerCase() === (email || '').toLowerCase().trim());
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
    persistStore(data);
    return result;
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
