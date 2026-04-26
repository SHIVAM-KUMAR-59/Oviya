import { Router } from 'express';
import { validateBody } from '../middleware/validation.middleware';
import { OnboardingRequestDTO } from '../dto/user.dto';
import Controller from '../controllers';
import authMiddleware from '../middleware/auth.middleware';

const userRouter = Router();

userRouter.use(authMiddleware);

/**
 * @openapi
 * /user/onboarding:
 *   post:
 *     tags:
 *       - User
 *     summary: Complete user onboarding
 *     description: |
 *       Collects initial user data required for cycle prediction.
 *
 *       User must provide at least 3 past period start dates along with basic profile inputs.
 *       This data is used to generate the first prediction window.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OnboardingRequest'
 *           example:
 *             cycles:
 *               - startDate: "2026-03-01"
 *               - startDate: "2026-03-30"
 *               - startDate: "2026-04-28"
 *             age: 24
 *             hasPCOS: true
 *             recentHormoneChange: false
 *             selfReportedRegularity: "VERY_IRREGULAR"
 *     responses:
 *       200:
 *         description: Onboarding completed successfully and prediction generated
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: object
 *                       properties:
 *                         prediction:
 *                           $ref: '#/components/schemas/PredictionResponse'
 *             example:
 *               success: true
 *               message: "Onboarding completed successfully"
 *               data:
 *                 prediction:
 *                   windowStart: "2026-05-01T00:00:00.000Z"
 *                   windowEnd: "2026-05-07T00:00:00.000Z"
 *                   mostLikelyDate: "2026-05-03T00:00:00.000Z"
 *                   windowDays: 6
 *                   honestWindowDays: 12
 *                   predictedCycleLength: 30
 *                   confidenceLevel: "GOOD"
 *                   confidenceMessage: "Based on your last 5 cycles. Your pattern is becoming clearer."
 *                   basedOnCycles: 5
 *                   wasCapApplied: true
 *                   isOverdue: false
 *                   nextUpdateAfter: "2026-05-10T00:00:00.000Z"
 *
 *       400:
 *         description: Validation error (invalid input data)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: "At least 3 cycle dates are required"
 *               error:
 *                 code: BAD_REQUEST
 *                 statusCode: 400
 *
 *       401:
 *         description: Unauthorized (missing or invalid token)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: "User is not authenticated"
 *               error:
 *                 code: UNAUTHENTICATED
 *                 statusCode: 401
 *
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
userRouter.post(
  '/onboarding',
  validateBody(OnboardingRequestDTO),
  Controller.userController.onboardingController,
);

export default userRouter;
