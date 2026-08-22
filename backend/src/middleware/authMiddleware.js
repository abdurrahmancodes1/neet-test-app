import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { User } from '../models/index.js';
import { AppError } from '../utils/AppError.js';

/**
 * Middleware that requires valid authentication via HTTP-only cookie or Bearer token
 */
export const authenticate = async (req, res, next) => {
  try {
    let token = req.cookies?.[env.COOKIE_NAME];

    // Fallback to Authorization Bearer header if cookie is absent
    if (!token && req.headers.authorization?.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return next(new AppError('Authentication required. Please log in to access this resource.', 401));
    }

    const decoded = jwt.verify(token, env.JWT_SECRET);
    const user = await User.findById(decoded.id).lean();

    if (!user || user.status !== 'active') {
      return next(new AppError('User session expired or account inactive. Please log in again.', 401));
    }

    req.user = {
      _id: user._id,
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role.toLowerCase(),
      rollNumber: user.rollNumber,
    };

    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return next(new AppError('Invalid or expired authentication session. Please log in again.', 401));
    }
    next(error);
  }
};

/**
 * Middleware that restricts route to specific roles (e.g. 'admin', 'student')
 */
export const requireRole = (...roles) => {
  const allowedRoles = roles.map((r) => r.toLowerCase());
  return (req, res, next) => {
    if (!req.user) {
      return next(new AppError('Authentication required.', 401));
    }

    const userRole = req.user.role?.toLowerCase();
    if (!allowedRoles.includes(userRole)) {
      return next(new AppError('Access denied: You do not have permission to perform this action.', 403));
    }

    next();
  };
};

/**
 * Optional authentication middleware: populates req.user if valid token exists, without throwing 401
 */
export const optionalAuth = async (req, res, next) => {
  try {
    let token = req.cookies?.[env.COOKIE_NAME];

    if (!token && req.headers.authorization?.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (token) {
      const decoded = jwt.verify(token, env.JWT_SECRET);
      const user = await User.findById(decoded.id).lean();
      if (user && user.status === 'active') {
        req.user = {
          _id: user._id,
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role.toLowerCase(),
          rollNumber: user.rollNumber,
        };
      }
    }
    next();
  } catch {
    // Silently continue without user
    next();
  }
};
