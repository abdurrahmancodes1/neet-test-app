import { Router } from 'express';
import { ResultController } from '../controllers/resultController.js';
import { optionalAuth } from '../middleware/authMiddleware.js';

const router = Router();

// Real-time Live Session Auto-Save & Recovery
router.post('/live-sync', optionalAuth, ResultController.syncLiveSession);
router.get('/live-session/:testId', optionalAuth, ResultController.getLiveSession);
router.delete('/live-session/:testId', optionalAuth, ResultController.clearLiveSession);

// Final Attempt Sync & Results
router.post('/sync', optionalAuth, ResultController.syncResult);
router.get('/all', ResultController.getAllResults);
router.get('/:resultId', optionalAuth, ResultController.getResult);

export default router;
