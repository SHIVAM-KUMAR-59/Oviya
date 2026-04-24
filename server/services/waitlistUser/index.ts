import createWaitlistUserService from './createUser.service';
import fetchAllWaitlistUserService from './fetchAll.service';
import findWaitlistUserByEmailService from './findByEmail.service';
import getWaitlistUserCountService from './getWaitlistUserCount.service';

const WaitlistUserService = {
  createWaitlistUserService,
  findWaitlistUserByEmailService,
  getWaitlistUserCountService,
  fetchAllWaitlistUserService,
};

export default WaitlistUserService;
