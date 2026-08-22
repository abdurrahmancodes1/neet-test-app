import { Router } from 'express';
import { ResultController } from '../controllers/resultController.js';
import { optionalAuth } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/:resultId', optionalAuth, ResultController.getResult);

export default router;
