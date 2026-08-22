import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { AuthService } from '../services/authService.js';
import { Result } from '../models/index.js';
import { env } from '../config/env.js';

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
        token: result.token, // Also return token for clients that prefer Bearer auth
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
}
