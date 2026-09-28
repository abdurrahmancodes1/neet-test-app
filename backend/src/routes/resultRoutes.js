import { Router } from 'express';
import { ResultController } from '../controllers/resultController.js';
import { optionalAuth } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/sync', optionalAuth, ResultController.syncResult);
router.get('/all', ResultController.getAllResults);
router.get('/:resultId', optionalAuth, ResultController.getResult);

export default router;
