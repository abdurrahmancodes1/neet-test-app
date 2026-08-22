import { Router } from 'express';
import { AdminTestController } from '../controllers/adminTestController.js';
import { validate } from '../middleware/validate.js';
import { createTestSchema, updateTestSchema, queryTestsSchema } from '../validators/testValidators.js';
import { updateQuestionSchema } from '../validators/questionValidators.js';

const router = Router();

// Test Management
router.get('/tests', validate(queryTestsSchema, 'query'), AdminTestController.listAllTests);
router.post('/tests', validate(createTestSchema, 'body'), AdminTestController.createTest);
router.patch('/tests/:testId', validate(updateTestSchema, 'body'), AdminTestController.updateTest);
router.delete('/tests/:testId', AdminTestController.deleteTest);
router.post('/tests/:testId/publish', AdminTestController.publishTest);
router.post('/tests/:testId/unpublish', AdminTestController.unpublishTest);

// Question Management
router.get('/tests/:testId/questions', AdminTestController.getAdminQuestions);
router.post('/tests/:testId/questions', AdminTestController.addQuestions);
router.patch('/questions/:questionId', validate(updateQuestionSchema, 'body'), AdminTestController.updateQuestion);
router.delete('/questions/:questionId', AdminTestController.deleteQuestion);

export default router;
