import { Router } from 'express';
import { TestController } from '../controllers/testController.js';
import { validate } from '../middleware/validate.js';
import { optionalAuth } from '../middleware/authMiddleware.js';
import { queryTestsSchema, verifyTestCodeSchema } from '../validators/testValidators.js';
import { submitAnswersSchema } from '../validators/resultValidators.js';

const router = Router();

// Student / Public Test Routes
router.get('/', validate(queryTestsSchema, 'query'), TestController.listTests);
router.post('/access', validate(verifyTestCodeSchema, 'body'), TestController.verifyTestAccess);
router.get('/:testId', TestController.getTest);
router.get('/:testId/questions', TestController.getTestQuestions);
router.post('/:testId/submit', optionalAuth, validate(submitAnswersSchema, 'body'), TestController.submitTest);

export default router;
