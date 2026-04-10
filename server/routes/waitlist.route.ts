import { Router } from 'express';
import Controller from '../controllers';
import reqBodyMiddleware from '../middleware/reqBody.middleware';

const waitlistRouter = Router();

waitlistRouter.post(
  '/',
  reqBodyMiddleware,
  Controller.WaitlistUserController.createWaitlistUserController,
);

export default waitlistRouter;
