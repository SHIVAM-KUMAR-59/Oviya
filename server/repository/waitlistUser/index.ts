import {
  createWaitlistUser,
  findByEmail,
  getWaitlistUserCount,
} from './waitlistUser.repository';

const WaitlistUserRepository = {
  createWaitlistUser,
  findByEmail,
  getWaitlistUserCount,
};

export default WaitlistUserRepository;
