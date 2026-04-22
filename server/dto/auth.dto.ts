import {
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
  IsNotEmpty,
  Matches,
} from 'class-validator';
import { NormalizeEmail, Trim } from '../lib/utils/validator.util';

/**
 * @openapi
 * components:
 *   schemas:
 *     RegisterRequest:
 *       type: object
 *       required:
 *         - name
 *         - email
 *       properties:
 *         name:
 *           type: string
 *           example: "John Doe"
 *         email:
 *           type: string
 *           format: email
 *           example: "johndoe@gmail.com"
 */
export class RegisterRequestDTO {
  @IsString({ message: 'Name must be a valid string' })
  @Trim()
  @IsNotEmpty({ message: 'Name is required' })
  @MinLength(2, { message: 'Name must be at least 2 characters long' })
  @MaxLength(50, { message: 'Name must not exceed 50 characters' })
  readonly name!: string;

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
 *     LoginRequest:
 *       type: object
 *       required:
 *         - email
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: "johndoe@gmail.com"
 */
export class LoginRequestDTO {
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
 *     SendOtpRequest:
 *       type: object
 *       required:
 *         - email
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: "johndoe@gmail.com"
 */
export class SendOtpRequestDTO {
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
 *     VerifyOtpRequest:
 *       type: object
 *       required:
 *         - otp
 *         - email
 *       properties:
 *         otp:
 *           type: string
 *           example: "947321"
 *         email:
 *           type: string
 *           format: email
 *           example: "johndoe@gmail.com"
 */
export class VerifyOtpRequestDTO {
  @IsString({ message: 'OTP must be a string' })
  @IsNotEmpty({ message: 'OTP is required' })
  @Matches(/^\d{6}$/, { message: 'OTP must be exactly 6 digits' })
  readonly otp!: string;

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
 *     AuthResponse:
 *       type: object
 *       properties:
 *         accessToken:
 *           type: string
 *           example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *         user:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               example: "123e4567-e89b-12d3-a456-426614174000"
 *             email:
 *               type: string
 *               example: "test@example.com"
 *             name:
 *               type: string
 *               example: "John Doe"
 */
export class AuthResponseDTO {
  readonly accessToken!: string;
  readonly user!: {
    readonly id: string;
    readonly email: string;
    readonly name: string;
  };
}
