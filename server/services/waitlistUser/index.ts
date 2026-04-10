import createWaitlistUserService from './createUser.service';
import findWaitlistUserByEmailService from './findByEmail.service';
import getWaitlistUserCountService from './getWaitlistUserCount.service';

const WaitlistUserService = {
  createWaitlistUserService,
  findWaitlistUserByEmailService,
  getWaitlistUserCountService,
};

export default WaitlistUserService;
