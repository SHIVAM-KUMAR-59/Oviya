import logger from '../../config/logger.config';
import { ApiError, ErrorCode, ErrorUtil } from '../../lib/utils/error.util';
import Repository from '../../repository';
import CacheService from '../cache/cache.service';
import env from '../../config/env.config';
import findWaitlistUserByEmailService from './findByEmail.service';

const createWaitlistUserService = async (email: string) => {
  const userKey = env.REDIS.KEYS.WAITLIST_USER.USER_BY_EMAIL(email);
  const allUsersKey = env.REDIS.KEYS.WAITLIST_USER.ALL_USERS;
  const countKey = env.REDIS.KEYS.WAITLIST_USER.COUNT;

  try {
    const existingWaitlistUser = await findWaitlistUserByEmailService(email);

    if (existingWaitlistUser) {
      throw new ApiError(ErrorCode.CONFLICT, `Email ${email} is already on the waitlist`);
    }

    // Create user in DB
    const newWaitlistUser =
      await Repository.waitlistUserRepository.createWaitlistUser(email);

    // Invalidate cache
    Promise.all([
      CacheService.del(userKey),
      CacheService.del(allUsersKey),
      CacheService.del(countKey),
    ]);

    // Set fresh cache for this user
    await CacheService.set(userKey, newWaitlistUser, env.REDIS.TTL.LONG);

    logger.success(`Waitlist user created: ${email}`);

    return newWaitlistUser;
  } catch (err) {
    logger.error(
      `Error in createWaitlistUserService: ${
        err instanceof Error ? err.message : String(err)
      }`,
    );

    ErrorUtil.handleServerError(err instanceof Error ? err : new Error(String(err)));
  }
};

export default createWaitlistUserService;
