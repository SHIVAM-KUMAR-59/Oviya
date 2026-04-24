import { IsString, IsEmail, IsNotEmpty } from 'class-validator';
import { NormalizeEmail } from '../lib/utils/validator.util';

/**
 * @openapi
 * components:
 *   schemas:
 *     AddWaitlistRequest:
 *       type: object
 *       required:
 *         - email
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: "johndoe@gmail.com"
 */
export class AddWaitlistRequestDTO {
  @IsString({ message: 'Email must be a string' })
  @NormalizeEmail()
  @IsEmail({}, { message: 'Please provide a valid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  readonly email!: string;
}

/**
 * @openapi
 * components:
 *   schemas:
 *     AddWaitlistResponse:
 *       type: object
 *       required:
 *         - email
 *       properties:
 *         id:
 *           type: string
 *           example: "1122-332...."
 *         email:
 *           type: string
 *           format: email
 *           example: "johndoe@gmail.com"
 */
export class AddWaitlistResponseDTO {
  readonly id!: string;
  readonly email!: string;
}

/**
 * @openapi
 * components:
 *   schemas:
 *     GetWaitlistCountResponse:
 *       type: object
 *       properties:
 *         count:
 *           type: number
 *           example: 25
 */
export class GetWaitlistCountResponseDTO {
  readonly count!: number;
}

/**
 * @openapi
 * components:
 *   schemas:
 *     WaitlistUser:
 *       type: object
 *       required:
 *         - id
 *         - email
 *         - joinedAt
 *       properties:
 *         id:
 *           type: string
 *           example: "1122-332..."
 *         email:
 *           type: string
 *           format: email
 *           example: "johndoe@gmail.com"
 *         joinedAt:
 *           type: string
 *           format: date-time
 *           example: "2026-04-24T06:50:00.000Z"
 */
export class WaitlistUserDTO {
  readonly id!: string;
  readonly email!: string;
  readonly joinedAt!: string;
}
