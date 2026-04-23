import { Router } from 'express';
import waitlistRouter from './waitlist.route';
import predictionRouter from './predict.route';
import authRouter from './auth.route';

const apiRoutes = Router();

apiRoutes.use('/waitlist', waitlistRouter);
apiRoutes.use('/predict', predictionRouter);
apiRoutes.use('/auth', authRouter);

export default apiRoutes;
