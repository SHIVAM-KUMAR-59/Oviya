import { Router } from 'express';
import Controller from '../controllers';
import reqBodyMiddleware from '../middleware/reqBody.middleware';
import { validateBody } from '../middleware/validation.middleware';
import {
  SendOtpRequestDTO,
  VerifyOtpRequestDTO,
  RegisterRequestDTO,
  LoginRequestDTO,
} from '../dto/auth.dto';

const authRouter = Router();

/**
 * @openapi
 * /auth/send-otp:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Send OTP
 *     description: Sends a 6-digit OTP to the user's email for authentication (login/register).
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SendOtpRequest'
 *     responses:
 *       200:
 *         description: OTP sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *             example:
 *               success: true
 *               data: null
 *               message: "OTP sent successfully"
 *
 *       429:
 *         description: Too many requests (cooldown active)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: "Please wait before requesting another OTP"
 *               error:
 *                 code: TOO_MANY_REQUESTS
 *                 statusCode: 429
 *
 *       500:
 *         description: Failed to send OTP
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
authRouter.post(
  '/send-otp',
  reqBodyMiddleware,
  validateBody(SendOtpRequestDTO),
  Controller.authController.sendOtpController,
);

/**
 * @openapi
 * /auth/verify-otp:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Verify OTP
 *     description: Verifies the OTP sent to the user's email.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VerifyOtpRequest'
 *     responses:
 *       200:
 *         description: OTP verified successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data: null
 *               message: "OTP verified successfully"
 *
 *       400:
 *         description: OTP expired or invalid request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: "Invalid OTP format"
 *               error:
 *                 code: BAD_REQUEST
 *                 statusCode: 400
 *
 *       403:
 *         description: Invalid OTP
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: "Invalid / Expired OTP"
 *               error:
 *                 code: FORBIDDEN
 *                 statusCode: 403
 *
 *       429:
 *         description: Too many requests (cooldown active)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: "Please wait before requesting another OTP"
 *               error:
 *                 code: TOO_MANY_REQUESTS
 *                 statusCode: 429
 *
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
authRouter.post(
  '/verify-otp',
  reqBodyMiddleware,
  validateBody(VerifyOtpRequestDTO),
  Controller.authController.verifyOtpController,
);

/**
 * @openapi
 * /auth/register:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Register user
 *     description: Creates a new user after OTP verification and returns access token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterRequest'
 *     responses:
 *       201:
 *         description: User registered successfully
 *         headers:
 *           Set-Cookie:
 *             description: Refresh token stored as HttpOnly cookie
 *             schema:
 *               type: string
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/AuthResponse'
 *
 *       400:
 *         description: OTP expired or invalid request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: "Invalid email format"
 *               error:
 *                 code: BAD_REQUEST
 *                 statusCode: 400
 *
 *       409:
 *         description: User already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: "User with this email already exists"
 *               error:
 *                 code: CONFLICT
 *                 statusCode: 409
 *
 *
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
authRouter.post(
  '/register',
  reqBodyMiddleware,
  validateBody(RegisterRequestDTO),
  Controller.authController.registerUserController,
);

/**
 * @openapi
 * /auth/login:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Login user
 *     description: Logs in an existing user after OTP verification and returns tokens.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Login successful
 *         headers:
 *           Set-Cookie:
 *             description: Refresh token stored as HttpOnly cookie
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/AuthResponse'
 *
 *       400:
 *         description: OTP expired or invalid request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: "Invalid email format"
 *               error:
 *                 code: BAD_REQUEST
 *                 statusCode: 400
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: "No user found with the given email"
 *               error:
 *                 code: NOT_FOUND
 *                 statusCode: 404
 *
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
authRouter.post(
  '/login',
  reqBodyMiddleware,
  validateBody(LoginRequestDTO),
  Controller.authController.loginUserController,
);

/**
 * @openapi
 * /auth/refresh:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Refresh access token
 *     description: Generates a new access token using refresh token (from cookie).
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Token refreshed successfully
 *         headers:
 *           Set-Cookie:
 *             description: New refresh token cookie (rotated)
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 accessToken: "new.jwt.token"
 *
 *       401:
 *         description: Invalid or expired refresh token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: "User is not logged in"
 *               error:
 *                 code: UNAUTHENTICATED
 *                 statusCode: 401
 *
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
authRouter.post('/refresh', Controller.authController.refreshTokenController);

/**
 * @openapi
 * /auth/logout:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Logout user
 *     description: Logs out the user by revoking refresh token and clearing cookie.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logout successful
 *         headers:
 *           Set-Cookie:
 *             description: Clears refresh token cookie
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "Logged out successfully"
 *
 *       401:
 *         description: Invalid or expired refresh token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: "User is not logged in"
 *               error:
 *                 code: UNAUTHENTICATED
 *                 statusCode: 401
 *
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
authRouter.post('/logout', Controller.authController.logoutController);

export default authRouter;
