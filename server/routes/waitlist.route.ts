import { Router } from 'express';
import Controller from '../controllers';
import reqBodyMiddleware from '../middleware/reqBody.middleware';
import { validateBody } from '../middleware/validation.middleware';
import { AddWaitlistRequestDTO } from '../dto/waitlist.dto';

const waitlistRouter = Router();

/**
 * @openapi
 * /waitlist:
 *   post:
 *     tags:
 *       - Waitlist
 *     summary: Add user to the waitlist
 *     description: Add a new user to the waitlist.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddWaitlistRequest'
 *     responses:
 *       200:
 *         description: Added to waitlist successfully
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
 *                         waitlistUser:
 *                           $ref: '#/components/schemas/AddWaitlistResponse'
 *
 *       400:
 *         description: Invalid request
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
 *               message: "User with this email already added to waitlist"
 *               error:
 *                 code: CONFLICT
 *                 statusCode: 409
 *
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

waitlistRouter.post(
  '/',
  reqBodyMiddleware,
  validateBody(AddWaitlistRequestDTO),
  Controller.waitlistUserController.createWaitlistUserController,
);

/**
 * @swagger
 * /waitlist/count:
 *   get:
 *     summary: Get waitlist user count
 *     tags:
 *       - Waitlist
 *     responses:
 *       200:
 *         description: Added to waitlist successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/GetWaitlistCountResponse'
 *
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

waitlistRouter.get(
  '/count',
  Controller.waitlistUserController.getWaitlistUserCountController,
);

export default waitlistRouter;
