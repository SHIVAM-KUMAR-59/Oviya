import { ConfidenceLevel } from '@prisma/client';

/**
 * @openapi
 * components:
 *   schemas:
 *     PredictionResponse:
 *       type: object
 *       properties:
 *         windowStart:
 *           type: string
 *           format: date-time
 *           description: Start of predicted period window
 *           example: "2026-05-01T00:00:00.000Z"
 *         windowEnd:
 *           type: string
 *           format: date-time
 *           description: End of predicted period window
 *           example: "2026-05-07T00:00:00.000Z"
 *         mostLikelyDate:
 *           type: string
 *           format: date-time
 *           description: Most probable start date of next period
 *           example: "2026-05-03T00:00:00.000Z"
 *         windowDays:
 *           type: integer
 *           description: Displayed prediction window size (capped)
 *           example: 6
 *         honestWindowDays:
 *           type: integer
 *           description: True calculated window before UI cap
 *           example: 12
 *         predictedCycleLength:
 *           type: integer
 *           description: Estimated cycle length in days
 *           example: 30
 *         confidenceLevel:
 *           type: string
 *           enum: [VERY_EARLY, EARLY, GOOD, HIGH, ROUGH]
 *           description: Confidence level of prediction
 *           example: "GOOD"
 *         confidenceMessage:
 *           type: string
 *           description: Human-readable explanation of prediction confidence
 *           example: "Based on your last 5 cycles. Your pattern is becoming clearer — each logged period improves accuracy."
 *         basedOnCycles:
 *           type: integer
 *           description: Number of cycles used in prediction
 *           example: 5
 *         wasCapApplied:
 *           type: boolean
 *           description: Whether UI cap (10 days) was applied to window
 *           example: true
 *         isOverdue:
 *           type: boolean
 *           description: Whether current date is past predicted window
 *           example: false
 *         nextUpdateAfter:
 *           type: string
 *           format: date-time
 *           description: When prediction should be recalculated or marked stale
 *           example: "2026-05-10T00:00:00.000Z"
 */
export class PredictionResponseDTO {
  readonly windowStart!: string;
  readonly windowEnd!: string;
  readonly mostLikelyDate!: string;

  readonly windowDays!: number;
  readonly honestWindowDays!: number;
  readonly predictedCycleLength!: number;

  readonly confidenceLevel!: ConfidenceLevel;
  readonly confidenceMessage!: string;

  readonly basedOnCycles!: number;
  readonly wasCapApplied!: boolean;

  readonly isOverdue!: boolean;
  readonly nextUpdateAfter!: string;
}
