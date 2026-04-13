import { Router } from 'express';
import waitlistRouter from './waitlist.route';
import predictionRouter from './predict.route';

const apiRoutes = Router();

apiRoutes.use('/waitlist', waitlistRouter);
apiRoutes.use('/predict', predictionRouter);

export default apiRoutes;
