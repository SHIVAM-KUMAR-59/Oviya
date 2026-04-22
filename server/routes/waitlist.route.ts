import { Router } from 'express';
import Controller from '../controllers';
import reqBodyMiddleware from '../middleware/reqBody.middleware';

const waitlistRouter = Router();

/**
 * @swagger
 * /api/v1/waitlist:
 *   post:
 *     summary: Add user to waitlist
 *     tags: [Waitlist]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 example: test@example.com
 *     responses:
 *       201:
 *         description: User added successfully
 *       400:
 *         description: Bad request
 *       409:
 *         description: Email already exists
 *       500:
 *         description: Internal server error
 */

waitlistRouter.post(
  '/',
  reqBodyMiddleware,
  Controller.waitlistUserController.createWaitlistUserController,
);

/**
 * @swagger
 * /api/v1/waitlist/count:
 *   get:
 *     summary: Get waitlist user count
 *     tags: [Waitlist]
 *     responses:
 *       200:
 *         description: Waitlist user count retrieved successfully
 *       500:
 *         description: Internal server error
 */

waitlistRouter.get(
  '/count',
  Controller.waitlistUserController.getWaitlistUserCountController,
);

export default waitlistRouter;
