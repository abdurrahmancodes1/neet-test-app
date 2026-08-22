import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ResultService } from '../services/resultService.js';
import { AppError } from '../utils/AppError.js';

export class ResultController {
  /**
   * GET /api/results/:resultId - Get result details by ID with access authorization check
   */
  static getResult = asyncHandler(async (req, res) => {
    const { resultId } = req.params;
    const result = await ResultService.getResultById(resultId);

    // Private result authorization check
    if (result.userId) {
      const requester = req.user;
      const isOwner = requester && requester._id?.toString() === result.userId?.toString();
      const isAdmin = requester && requester.role === 'admin';

      if (!isOwner && !isAdmin) {
        throw new AppError('Access denied: You do not have permission to view this private result', 403);
      }
    }

    return ApiResponse.success(res, 'Result retrieved successfully', result);
  });
}
