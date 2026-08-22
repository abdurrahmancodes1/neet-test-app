import { Router } from 'express';
import { AuthController } from '../controllers/authController.js';
import { authenticate } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validate.js';
import { registerSchema, loginSchema } from '../validators/authValidators.js';

const router = Router();

// Public Auth Endpoints
router.post('/register', validate(registerSchema, 'body'), AuthController.register);
router.post('/login', validate(loginSchema, 'body'), AuthController.login);
router.post('/logout', AuthController.logout);

// Protected User Endpoints
router.get('/me', authenticate, AuthController.getMe);
router.get('/my-results', authenticate, AuthController.getMyResults);

export default router;
