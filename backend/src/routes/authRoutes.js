import { Router } from 'express';
import { AuthController } from '../controllers/authController.js';
import { authenticate } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validate.js';
import { registerSchema, loginSchema } from '../validators/authValidators.js';

const router = Router();

// Public Auth & Platform Stats Endpoints
router.post('/register', validate(registerSchema, 'body'), AuthController.register);
router.post('/login', validate(loginSchema, 'body'), AuthController.login);
router.post('/logout', AuthController.logout);
router.get('/stats', AuthController.getStats);
router.get('/leaderboard', AuthController.getLeaderboard);
router.get('/candidates', AuthController.getCandidates);
router.get('/admin-overview', AuthController.getAdminOverview);

// Protected User Endpoints
router.get('/me', authenticate, AuthController.getMe);
router.get('/my-results', authenticate, AuthController.getMyResults);

export default router;
