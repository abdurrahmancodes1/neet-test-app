import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { User, Result } from '../models/index.js';
import { env } from '../config/env.js';
import { AppError } from '../utils/AppError.js';
import { SyncStore } from './syncStore.js';

export class AuthService {
  /**
   * Generates a signed JWT for the user
   */
  static generateToken(user) {
    const id = user._id ? user._id.toString() : user.id;
    return jwt.sign(
      {
        id,
        role: (user.role || 'student').toLowerCase(),
        email: user.email,
        name: user.name,
      },
      env.JWT_SECRET,
      { expiresIn: env.JWT_EXPIRES_IN }
    );
  }

  /**
   * Cookie configuration for secure HTTP-only cookie delivery
   */
  static getCookieOptions() {
    return {
      httpOnly: true,
      secure: env.isProd,
      sameSite: env.isProd ? 'none' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      path: '/',
    };
  }

  /**
   * Register a new user
   */
  static async register({ name, email, password, rollNumber, role = 'student', targetExam = 'NEET 2027' }) {
    const cleanEmail = (email || '').toLowerCase().trim();
    const isMongoConnected = mongoose.connection.readyState === 1;

    let userDoc = null;

    if (isMongoConnected) {
      const existing = await User.findOne({ email: cleanEmail });
      if (existing) {
        throw new AppError('An account with this email address already exists', 400);
      }

      userDoc = await User.create({
        name: (name || '').trim(),
        email: cleanEmail,
        password,
        rollNumber: rollNumber || null,
        role: (role || 'student').toLowerCase(),
      });
    }

    // Always mirror to SyncStore for offline fallback and fast querying
    const fallbackUser = {
      id: userDoc ? userDoc._id.toString() : `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      name: (name || '').trim(),
      email: cleanEmail,
      password,
      rollNumber: rollNumber || null,
      role: (role || 'student').toLowerCase(),
      targetExam,
      createdAt: userDoc?.createdAt || new Date().toISOString(),
    };
    SyncStore.saveUser(fallbackUser);

    const token = this.generateToken(userDoc || fallbackUser);

    return {
      token,
      user: {
        id: userDoc ? userDoc._id.toString() : fallbackUser.id,
        name: fallbackUser.name,
        email: fallbackUser.email,
        role: (userDoc?.role || fallbackUser.role || 'student').toLowerCase(),
        rollNumber: fallbackUser.rollNumber,
        targetExam: fallbackUser.targetExam,
        createdAt: fallbackUser.createdAt,
      },
    };
  }

  /**
   * Authenticate user with email and password
   */
  static async login({ email, password }) {
    const cleanEmail = (email || '').toLowerCase().trim();
    const isMongoConnected = mongoose.connection.readyState === 1;

    let user = null;

    if (isMongoConnected) {
      user = await User.findOne({ email: cleanEmail }).select('+password');
      if (user) {
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
          throw new AppError('Invalid email or password', 401);
        }
        if (user.status !== 'active') {
          throw new AppError('Your account has been deactivated or suspended', 403);
        }
      }
    }

    if (!user) {
      // Check in SyncStore
      const localUser = SyncStore.findUserByEmail(cleanEmail);
      if (localUser && (!localUser.password || localUser.password === password)) {
        user = {
          _id: localUser.id,
          id: localUser.id,
          name: localUser.name,
          email: localUser.email,
          role: localUser.role || 'student',
          rollNumber: localUser.rollNumber || null,
          targetExam: localUser.targetExam || 'NEET 2027',
          createdAt: localUser.createdAt,
        };
      }
    }

    if (!user) {
      throw new AppError('Invalid email or password', 401);
    }

    const token = this.generateToken(user);

    return {
      token,
      user: {
        id: user._id ? user._id.toString() : user.id,
        name: user.name,
        email: user.email,
        role: (user.role || 'student').toLowerCase(),
        rollNumber: user.rollNumber,
        targetExam: user.targetExam || 'NEET 2027',
      },
    };
  }

  /**
   * Get user profile by ID
   */
  static async getUserProfile(userId) {
    const isMongoConnected = mongoose.connection.readyState === 1;

    if (isMongoConnected && mongoose.Types.ObjectId.isValid(userId)) {
      const user = await User.findById(userId).lean();
      if (user) {
        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: (user.role || 'student').toLowerCase(),
          rollNumber: user.rollNumber,
          status: user.status,
          createdAt: user.createdAt,
        };
      }
    }

    const localUsers = SyncStore.getUsers();
    const found = localUsers.find((u) => u.id === userId || u._id === userId);
    if (found) {
      return {
        id: found.id,
        name: found.name,
        email: found.email,
        role: (found.role || 'student').toLowerCase(),
        rollNumber: found.rollNumber,
        targetExam: found.targetExam || 'NEET 2027',
        status: 'active',
        createdAt: found.createdAt,
      };
    }

    throw new AppError('User not found', 404);
  }

  /**
   * Get platform-wide statistics, total registered candidates, and global leaderboard
   */
  static async getPlatformStats() {
    const storeStats = SyncStore.getStats();
    const isMongoConnected = mongoose.connection.readyState === 1;

    if (!isMongoConnected) {
      return {
        ...storeStats,
        isLiveDb: false,
      };
    }

    try {
      const totalUsersDb = await User.countDocuments();
      const totalAttemptsDb = await Result.countDocuments({ status: 'submitted' });

      // Fetch submissions
      const results = await Result.find({ status: 'submitted' })
        .populate('userId', 'name email rollNumber')
        .sort({ score: -1, createdAt: -1 })
        .limit(100)
        .lean();

      let highestScore = storeStats.highestScore;
      let averageScore = storeStats.averageScore;
      let recentSubmissions = storeStats.recentSubmissions;
      let leaderboard = storeStats.leaderboard;

      if (results.length > 0) {
        const scores = results.map((r) => r.score || 0);
        highestScore = Math.max(...scores);
        const sumScore = scores.reduce((a, b) => a + b, 0);
        averageScore = Math.round((sumScore / results.length) * 10) / 10;

        recentSubmissions = results.slice(0, 15).map((r) => ({
          id: r._id.toString(),
          studentName: r.studentName || r.userId?.name || 'Anonymous Student',
          email: r.userId?.email || null,
          rollNumber: r.studentRollNumber || r.userId?.rollNumber || null,
          score: r.score,
          maxScore: r.maxScore || 240,
          accuracy: Math.round(r.accuracy || 0),
          correctCount: r.correctCount || 0,
          wrongCount: r.wrongCount || 0,
          submittedAt: r.submittedAt || r.createdAt,
        }));

        const studentMap = new Map();
        results.forEach((r) => {
          const key = r.userId?._id?.toString() || r.studentName || 'student';
          if (!studentMap.has(key) || studentMap.get(key).score < (r.score || 0)) {
            studentMap.set(key, {
              id: key,
              studentName: r.studentName || r.userId?.name || 'Anonymous Student',
              email: r.userId?.email || null,
              rollNumber: r.studentRollNumber || r.userId?.rollNumber || null,
              score: r.score,
              maxScore: r.maxScore || 240,
              accuracy: Math.round(r.accuracy || 0),
              correctCount: r.correctCount || 0,
              wrongCount: r.wrongCount || 0,
              submittedAt: r.submittedAt || r.createdAt,
            });
          }
        });

        leaderboard = Array.from(studentMap.values())
          .sort((a, b) => b.score - a.score)
          .map((item, idx) => ({ ...item, rank: idx + 1 }));
      }

      const users = await User.find().select('name email rollNumber role createdAt').sort({ createdAt: -1 }).lean();
      const allCandidates = users.map((u) => ({
        id: u._id.toString(),
        name: u.name,
        email: u.email,
        rollNumber: u.rollNumber || null,
        role: u.role,
        registeredAt: u.createdAt,
      }));

      return {
        totalUsers: Math.max(totalUsersDb, allCandidates.length, storeStats.totalUsers),
        totalAttempts: Math.max(totalAttemptsDb, storeStats.totalAttempts),
        averageScore: averageScore || storeStats.averageScore,
        highestScore: Math.max(highestScore, storeStats.highestScore),
        leaderboard: leaderboard.length > 0 ? leaderboard : storeStats.leaderboard,
        recentSubmissions: recentSubmissions.length > 0 ? recentSubmissions : storeStats.recentSubmissions,
        allCandidates: allCandidates.length > 0 ? allCandidates : storeStats.allCandidates,
        isLiveDb: true,
      };
    } catch (err) {
      console.error('Error fetching stats from MongoDB, returning store stats:', err);
      return {
        ...storeStats,
        isLiveDb: false,
      };
    }
  }

  /**
   * Get detailed Admin overview including active users, total users, and per-student progress
   */
  static async getAdminOverview() {
    const isMongoConnected = mongoose.connection.readyState === 1;
    let totalUsers = 0;
    let activeUsers = 0;
    let totalAttempts = 0;
    let averageScore = 0;
    let students = [];

    if (isMongoConnected) {
      const allUsers = await User.find().select('name email rollNumber role createdAt status').sort({ createdAt: -1 }).lean();
      const allResults = await Result.find({ status: 'submitted' }).sort({ createdAt: -1 }).lean();

      totalUsers = allUsers.length;
      totalAttempts = allResults.length;

      // Map results to user
      const resultsByUser = new Map();
      allResults.forEach((r) => {
        const idKey = r.userId ? r.userId.toString().toLowerCase() : null;
        const emailKey = r.studentEmail ? r.studentEmail.toLowerCase().trim() : null;

        if (idKey) {
          if (!resultsByUser.has(idKey)) resultsByUser.set(idKey, []);
          resultsByUser.get(idKey).push(r);
        }
        if (emailKey) {
          if (!resultsByUser.has(emailKey)) resultsByUser.set(emailKey, []);
          resultsByUser.get(emailKey).push(r);
        }
      });

      students = allUsers.map((u) => {
        const idKey = u._id.toString().toLowerCase();
        const emailKey = (u.email || '').toLowerCase().trim();

        const combinedResults = [
          ...(resultsByUser.get(idKey) || []),
          ...(resultsByUser.get(emailKey) || []),
        ];

        // Deduplicate
        const userResults = combinedResults.filter(
          (v, i, a) => a.findIndex((t) => (t._id?.toString() || t.attemptId) === (v._id?.toString() || v.attemptId)) === i
        );

        const attemptsCount = userResults.length;
        const scores = userResults.map((r) => r.score ?? 0);
        const accuracies = userResults.map((r) => r.accuracy ?? 0);

        const latestResult = userResults[0] || null;
        const bestScore = scores.length > 0 ? Math.max(...scores) : null;
        const latestScore = latestResult ? latestResult.score : null;
        const avgAccuracy =
          accuracies.length > 0
            ? Math.round(accuracies.reduce((a, b) => a + b, 0) / accuracies.length)
            : null;

        return {
          id: u._id.toString(),
          name: u.name,
          email: u.email,
          role: u.role || 'student',
          status: u.status || 'active',
          registeredAt: u.createdAt,
          lastActive: latestResult ? (latestResult.submittedAt || latestResult.createdAt) : u.createdAt,
          totalAttempts: attemptsCount,
          latestScore,
          bestScore,
          averageAccuracy: avgAccuracy,
          attempts: userResults.map((r) => ({
            id: r._id?.toString() || r.attemptId,
            testId: r.testId,
            score: r.score,
            maxScore: r.maxScore || 240,
            percentage: r.percentage,
            accuracy: Math.round(r.accuracy || 0),
            correct: r.correctCount ?? r.correct ?? 0,
            wrong: r.wrongCount ?? r.wrong ?? 0,
            unattempted: r.unattemptedCount ?? r.unattempted ?? 0,
            submittedAt: r.submittedAt || r.createdAt,
          })),
        };
      });

      activeUsers = students.filter((s) => s.totalAttempts > 0).length;

      if (allResults.length > 0) {
        const allScores = allResults.map((r) => r.score || 0);
        averageScore = Math.round((allScores.reduce((a, b) => a + b, 0) / allResults.length) * 10) / 10;
      }
    } else {
      const storeStats = SyncStore.getStats();
      totalUsers = storeStats.totalUsers;
      totalAttempts = storeStats.totalAttempts;
      averageScore = storeStats.averageScore;
      activeUsers = storeStats.allCandidates.length;
      students = storeStats.allCandidates.map((c) => ({
        ...c,
        status: 'active',
        totalAttempts: 0,
        latestScore: null,
        bestScore: null,
        averageAccuracy: null,
        attempts: [],
      }));
    }

    return {
      totalUsers,
      activeUsers,
      totalAttempts,
      averageScore,
      students,
    };
  }
}
