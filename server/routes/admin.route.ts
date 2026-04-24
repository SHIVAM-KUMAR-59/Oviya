import { Router } from 'express';
import Controller from '../controllers';
import { validateBody } from '../middleware/validation.middleware';
import { CreateAdminRequestDTO } from '../dto/admin.dto';
import authMiddleware from '../middleware/auth.middleware';

const adminRoutes = Router();

adminRoutes.use(authMiddleware);

/**
 * @openapi
 * /admin/create:
 *   post:
 *     tags:
 *       - Admin
 *     summary: Create a new admin
 *     description: Creates a new admin, can be done only by another admin.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateAdminRequest'
 *     responses:
 *       201:
 *         description: Admin registered successfully
 *         headers:
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
 *                       $ref: '#/components/schemas/CreateAdminResponse'
 *
 *       401:
 *         description: Invalid or expired access token
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
 *       400:
 *         description: Invalid / missing property in request body
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
 *       403:
 *         description: Unauthorized access
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: "You are not authorized to perform this action"
 *               error:
 *                 code: FORBIDDEN
 *                 statusCode: 403
 *
 *       409:
 *         description: Admin already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: "Admin with this email already exists"
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
adminRoutes.post(
  '/create',
  validateBody(CreateAdminRequestDTO),
  Controller.adminController.createAdminController,
);

export default adminRoutes;
