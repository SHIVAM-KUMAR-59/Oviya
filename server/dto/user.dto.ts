import { PCOSStatus, SelfReportedRegularity, UserRoles } from '@prisma/client';

/**
 * @openapi
 * components:
 *   schemas:
 *     UserResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *         name:
 *           type: string
 *           example: "John Doe"
 *         email:
 *           type: string
 *           example: "test@example.com"
 *         role:
 *           type: string
 *           example: "USER"
 *         onboardingCompleted:
 *           type: boolean
 *           example: false
 *         pcosStatus:
 *           type: string
 *           example: "DIAGNOSED"
 *         selfReportedRegularity:
 *           type: string
 *           example: "VERY_IRREGULAR"
 *         joinedAt:
 *           type: string
 *           format: date-time
 *           example: "2026-04-24T06:50:00.000Z"
 */
export class UserResponseDTO {
  readonly id!: string;
  readonly name!: string;
  readonly email!: string;
  readonly role!: UserRoles;
  readonly onboardingCompleted!: boolean;
  readonly pcosStatus!: PCOSStatus;
  readonly selfReportedRegularity!: SelfReportedRegularity;

  readonly joinedAt!: string;
}
