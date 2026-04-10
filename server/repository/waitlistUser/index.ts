import { createWaitlistUser, findByEmail } from './waitlistUser.repository';

const WaitlistUserRepository = {
  createWaitlistUser,
  findByEmail,
};

export default WaitlistUserRepository;
