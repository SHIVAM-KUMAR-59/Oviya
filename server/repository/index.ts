import AdminRepository from './admin';
import AuthRepository from './auth';
import CycleRepository from './cycle';
import PredictionRepository from './prediction';
import UserRepository from './user';
import WaitlistUserRepository from './waitlistUser';

const Repository = {
  waitlistUserRepository: WaitlistUserRepository,
  userRepository: UserRepository,
  authRepository: AuthRepository,
  adminRepository: AdminRepository,
  cycleRepository: CycleRepository,
  predictionRepository: PredictionRepository,
};

export default Repository;
