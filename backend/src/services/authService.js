import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';
import { env } from '../config/env.js';
import { AppError } from '../utils/AppError.js';

export class AuthService {
  /**
   * Generates a signed JWT for the user
   */
  static generateToken(user) {
    return jwt.sign(
      {
        id: user._id.toString(),
        role: user.role,
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
  static async register({ name, email, password, rollNumber, role = 'student' }) {
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      throw new AppError('An account with this email address already exists', 400);
    }

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password,
      rollNumber,
      role: role.toLowerCase(),
    });

    const token = this.generateToken(user);

    return {
      token,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        rollNumber: user.rollNumber,
      },
    };
  }

  /**
   * Authenticate user with email and password
   */
  static async login({ email, password }) {
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
    if (!user) {
      throw new AppError('Invalid email or password', 401);
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new AppError('Invalid email or password', 401);
    }

    if (user.status !== 'active') {
      throw new AppError('Your account has been deactivated or suspended', 403);
    }

    const token = this.generateToken(user);

    return {
      token,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        rollNumber: user.rollNumber,
      },
    };
  }

  /**
   * Get user profile by ID
   */
  static async getUserProfile(userId) {
    const user = await User.findById(userId).lean();
    if (!user) {
      throw new AppError('User not found', 404);
    }
    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
      rollNumber: user.rollNumber,
      status: user.status,
      createdAt: user.createdAt,
    };
  }
}
