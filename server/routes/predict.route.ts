import { Router } from 'express';
import Controller from '../controllers';
import reqBodyMiddleware from '../middleware/reqBody.middleware';

const predictionRouter = Router();

predictionRouter.post(
  '/',
  reqBodyMiddleware,
  Controller.predictionController.predictNextPeriodController,
);

export default predictionRouter;
