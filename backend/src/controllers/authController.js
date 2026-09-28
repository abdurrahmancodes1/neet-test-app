import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { AuthService } from '../services/authService.js';
import { Result, User } from '../models/index.js';
import { env } from '../config/env.js';
import mongoose from 'mongoose';

export class AuthController {
  /**
   * POST /api/auth/register - Register a new user
   */
  static register = asyncHandler(async (req, res) => {
    const result = await AuthService.register(req.body);
    const cookieOptions = AuthService.getCookieOptions();

    // Set secure HTTP-only cookie
    res.cookie(env.COOKIE_NAME, result.token, cookieOptions);

    return ApiResponse.success(
      res,
      'Registration successful',
      {
        user: result.user,
        token: result.token,
      },
      201
    );
  });

  /**
   * POST /api/auth/login - Login user with email/password
   */
  static login = asyncHandler(async (req, res) => {
    const result = await AuthService.login(req.body);
    const cookieOptions = AuthService.getCookieOptions();

    // Set secure HTTP-only cookie
    res.cookie(env.COOKIE_NAME, result.token, cookieOptions);

    return ApiResponse.success(res, 'Login successful', {
      user: result.user,
      token: result.token,
    });
  });

  /**
   * POST /api/auth/logout - Clear auth cookie
   */
  static logout = asyncHandler(async (req, res) => {
    res.clearCookie(env.COOKIE_NAME, {
      httpOnly: true,
      secure: env.isProd,
      sameSite: env.isProd ? 'none' : 'lax',
      path: '/',
    });

    return ApiResponse.success(res, 'Logged out successfully', null, 200);
  });

  /**
   * GET /api/auth/me - Get current authenticated user profile
   */
  static getMe = asyncHandler(async (req, res) => {
    const user = await AuthService.getUserProfile(req.user.id);
    return ApiResponse.success(res, 'Current user profile retrieved', user);
  });

  /**
   * GET /api/auth/user-role/:email - Get live user role from database
   */
  static getUserRole = asyncHandler(async (req, res) => {
    const email = (req.params.email || '').toLowerCase().trim();
    if (!email) {
      return ApiResponse.error(res, 'Email is required', 400);
    }

    const isMongoConnected = mongoose.connection.readyState === 1;
    if (isMongoConnected) {
      const user = await User.findOne({ email }).select('name email role status');
      if (user) {
        return ApiResponse.success(res, 'User role retrieved', {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: (user.role || 'student').toLowerCase(),
        });
      }
    }

    return ApiResponse.success(res, 'User role retrieved', { role: 'student' });
  });

  /**
   * GET /api/auth/my-results - Get exam history for the logged-in student
   */
  static getMyResults = asyncHandler(async (req, res) => {
    const results = await Result.find({ userId: req.user._id })
      .populate('testId', 'title subtitle testCode subjects durationMinutes')
      .sort({ createdAt: -1 })
      .lean();

    return ApiResponse.success(res, 'User test history retrieved', results, 200, {
      total: results.length,
    });
  });

  /**
   * GET /api/auth/stats - Get platform global stats, user count, and leaderboard
   */
  static getStats = asyncHandler(async (req, res) => {
    const stats = await AuthService.getPlatformStats();
    return ApiResponse.success(res, 'Platform statistics retrieved successfully', stats);
  });

  /**
   * GET /api/auth/leaderboard - Get global student leaderboard
   */
  static getLeaderboard = asyncHandler(async (req, res) => {
    const stats = await AuthService.getPlatformStats();
    return ApiResponse.success(res, 'Leaderboard retrieved successfully', {
      totalUsers: stats.totalUsers,
      totalAttempts: stats.totalAttempts,
      leaderboard: stats.leaderboard,
    });
  });

  /**
   * GET /api/auth/candidates - Get list of all registered candidates
   */
  static getCandidates = asyncHandler(async (req, res) => {
    const stats = await AuthService.getPlatformStats();
    return ApiResponse.success(res, 'All registered candidates retrieved', {
      total: stats.allCandidates.length,
      candidates: stats.allCandidates,
    });
  });

  /**
   * GET /api/auth/admin-overview - Get admin analytics (total users, active users, student progress)
   */
  static getAdminOverview = asyncHandler(async (req, res) => {
    const overview = await AuthService.getAdminOverview();
    return ApiResponse.success(res, 'Admin overview retrieved successfully', overview);
  });
}
