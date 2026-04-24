import {
  createWaitlistUser,
  findAll,
  findByEmail,
  getWaitlistUserCount,
} from './waitlistUser.repository';

const WaitlistUserRepository = {
  createWaitlistUser,
  findByEmail,
  getWaitlistUserCount,
  findAll,
};

export default WaitlistUserRepository;
