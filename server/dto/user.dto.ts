import { PCOSStatus, SelfReportedRegularity, UserRoles } from '@prisma/client';
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
  Max,
  Min,
} from 'class-validator';

/**
 * @openapi
 * components:
 *   schemas:
 *     UserResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "123e4567-e89..."
 *         name:
 *           type: string
 *           example: "John Doe"
 *         email:
 *           type: string
 *           format: email
 *           example: "test@example.com"
 *         role:
 *           type: string
 *           enum: [ADMIN, USER]
 *           example: "USER"
 *         onboardingCompleted:
 *           type: boolean
 *           example: false
 *         pcosStatus:
 *           type: string
 *           enum: [UNKNOWN, DIAGNOSED, SUSPECTED, IRREGULAR_ONLY, SUPPORTING_SOMEONE]
 *           example: "DIAGNOSED"
 *         selfReportedRegularity:
 *           type: string
 *           enum: [UNKNOWN, VERY_IRREGULAR, SOMEWHAT_IRREGULAR, FAIRLY_REGULAR]
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

/**
 * @openapi
 * components:
 *   schemas:
 *     CycleInput:
 *       type: object
 *       required:
 *         - startDate
 *       properties:
 *         startDate:
 *           type: string
 *           format: date
 *           example: "2026-03-01"
 */
class CycleInputDTO {
  @IsDateString({}, { message: 'Invalid date format' })
  startDate!: string;
}

/**
 * @openapi
 * components:
 *   schemas:
 *     OnboardingRequest:
 *       type: object
 *       required:
 *         - cycles
 *         - age
 *         - selfReportedRegularity
 *       properties:
 *         cycles:
 *           type: array
 *           minItems: 3
 *           description: List of past period start dates (minimum 3 required, more improves accuracy)
 *           items:
 *             $ref: '#/components/schemas/CycleInput'
 *           example:
 *             - startDate: "2026-01-01"
 *             - startDate: "2026-01-30"
 *             - startDate: "2026-02-28"
 *         age:
 *           type: integer
 *           minimum: 13
 *           maximum: 55
 *           example: 24
 *         hasPCOS:
 *           type: boolean
 *           description: Whether the user has been diagnosed with PCOS
 *           example: true
 *         recentHormoneChange:
 *           type: boolean
 *           description: Indicates recent hormonal changes (birth control, postpartum, etc.)
 *           example: false
 *         selfReportedRegularity:
 *           type: string
 *           enum: [UNKNOWN, VERY_IRREGULAR, SOMEWHAT_IRREGULAR, FAIRLY_REGULAR]
 *           example: "SOMEWHAT_IRREGULAR"
 */
export class OnboardingRequestDTO {
  @IsArray()
  @ArrayMinSize(3, { message: 'At least 3 cycle dates are required' })
  cycles!: CycleInputDTO[];

  @IsInt()
  @Min(13)
  @Max(55)
  age!: number;

  @IsOptional()
  @IsBoolean()
  hasPCOS?: boolean;

  @IsOptional()
  @IsBoolean()
  recentHormoneChange?: boolean;

  @IsEnum(SelfReportedRegularity)
  selfReportedRegularity!: SelfReportedRegularity;
}
