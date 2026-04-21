import UserRepository from './user';
import WaitlistUserRepository from './waitlistUser';

const Repository = {
  waitlistUserRepository: WaitlistUserRepository,
  userRepository: UserRepository,
};

export default Repository;
