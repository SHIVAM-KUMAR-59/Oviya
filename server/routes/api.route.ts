import { Router } from 'express';
import waitlistRouter from './waitlist.route';
import predictionRouter from './predict.route';
import authRouter from './auth.route';
import adminRoutes from './admin.route';

const apiRoutes = Router();

apiRoutes.use('/waitlist', waitlistRouter);
apiRoutes.use('/predict', predictionRouter);
apiRoutes.use('/auth', authRouter);
apiRoutes.use('/admin', adminRoutes);

export default apiRoutes;
