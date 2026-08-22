import { Router } from 'express';
import healthRoutes from './healthRoutes.js';
import authRoutes from './authRoutes.js';
import testRoutes from './testRoutes.js';
import resultRoutes from './resultRoutes.js';
import adminRoutes from './adminRoutes.js';
import { authenticate, requireRole } from '../middleware/authMiddleware.js';

const router = Router();

// Public routes
router.use('/health', healthRoutes);
router.use('/auth', authRoutes);
router.use('/tests', testRoutes);
router.use('/results', resultRoutes);

// Protected Admin routes (Requires valid authentication + ADMIN role)
router.use('/admin', authenticate, requireRole('admin'), adminRoutes);

export default router;
