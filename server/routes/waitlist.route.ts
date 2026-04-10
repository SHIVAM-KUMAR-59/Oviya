import { Router } from 'express';
import Controller from '../controllers';

const waitlistRouter = Router();

waitlistRouter.post(
  '/',
  Controller.WaitlistUserController.createWaitlistUserController,
);

export default waitlistRouter;
