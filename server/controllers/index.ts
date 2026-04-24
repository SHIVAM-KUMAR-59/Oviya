import AdminController from './admin';
import AuthController from './auth';
import PredictionController from './prediction';
import WaitlistUserController from './waitlistUser';

const Controller = {
  waitlistUserController: WaitlistUserController,
  predictionController: PredictionController,
  authController: AuthController,
  adminController: AdminController,
};

export default Controller;
