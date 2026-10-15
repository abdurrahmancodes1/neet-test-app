import { Router } from 'express';
import { AuthController } from '../controllers/authController.js';
import { authenticate, optionalAuth, requireRole } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validate.js';
import { registerSchema, loginSchema, updateProfileSchema } from '../validators/authValidators.js';

const router = Router();

// Public Auth & Platform Stats Endpoints (Sanitized for non-admin callers)
router.post('/register', validate(registerSchema, 'body'), AuthController.register);
router.post('/login', validate(loginSchema, 'body'), AuthController.login);
router.post('/logout', AuthController.logout);
router.get('/stats', optionalAuth, AuthController.getStats);
router.get('/leaderboard', optionalAuth, AuthController.getLeaderboard);
router.get('/candidates', optionalAuth, AuthController.getCandidates);
router.get('/admin-overview', authenticate, requireRole('admin'), AuthController.getAdminOverview);
router.get('/user-role/:email', AuthController.getUserRole);

// Protected User Endpoints
router.get('/me', authenticate, AuthController.getMe);
router.put('/profile', authenticate, validate(updateProfileSchema, 'body'), AuthController.updateProfile);
router.get('/my-results', authenticate, AuthController.getMyResults);

export default router;
