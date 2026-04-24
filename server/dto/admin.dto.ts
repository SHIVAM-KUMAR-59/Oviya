import { IsString, IsEmail, MinLength, MaxLength, IsNotEmpty } from 'class-validator';
import { NormalizeEmail, Trim } from '../lib/utils/validator.util';

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateAdminRequest:
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
export class CreateAdminRequestDTO {
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
 *     CreateAdminResponse:
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
 *           example: "ADMIN"
 */
export class CreateAdminResponseDTO {
  readonly id!: string;
  readonly email!: string;
  readonly name!: string;
  readonly role!: string;
}
