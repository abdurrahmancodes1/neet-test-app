import { Router } from 'express';
import healthRoutes from './healthRoutes.js';
import authRoutes from './authRoutes.js';
import testRoutes from './testRoutes.js';
import resultRoutes from './resultRoutes.js';
import adminRoutes from './adminRoutes.js';
import { AuthController } from '../controllers/authController.js';
import { authenticate, requireRole } from '../middleware/authMiddleware.js';

const router = Router();

// Public routes
router.use('/health', healthRoutes);
router.use('/auth', authRoutes);
router.use('/tests', testRoutes);
router.use('/results', resultRoutes);

// Direct shortcut stats endpoints
router.get('/stats', AuthController.getStats);
router.get('/leaderboard', AuthController.getLeaderboard);
router.get('/candidates', AuthController.getCandidates);
router.get('/admin/overview', AuthController.getAdminOverview);

// Protected Admin routes (Requires valid authentication + ADMIN role)
router.use('/admin', authenticate, requireRole('admin'), adminRoutes);

export default router;
