import { Router } from 'express';
import waitlistRouter from './waitlist.route';

const apiRoutes = Router();

apiRoutes.use('/waitlist', waitlistRouter);

export default apiRoutes;
