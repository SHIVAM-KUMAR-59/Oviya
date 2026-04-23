import AdminRepository from './admin';
import AuthRepository from './auth';
import UserRepository from './user';
import WaitlistUserRepository from './waitlistUser';

const Repository = {
  waitlistUserRepository: WaitlistUserRepository,
  userRepository: UserRepository,
  authRepository: AuthRepository,
  adminRepository: AdminRepository,
};

export default Repository;
