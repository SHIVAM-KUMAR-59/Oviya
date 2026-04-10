import logger from '../../config/logger.config';
import { ApiError, handleServerError } from '../../lib/utils/error.util';
import Repository from '../../repository';
import CacheService from '../cache/cache.service';
import env from '../../config/env.config';
import { findByEmail } from '../../repository/waitlistUser/waitlistUser.repository';

const createWaitlistUserService = async (email: string) => {
  const userKey = env.REDIS.KEYS.WAITLIST_USER.USER_BY_EMAIL(email);
  const allUsersKey = env.REDIS.KEYS.WAITLIST_USER.ALL_USERS;
  const countKey = env.REDIS.KEYS.WAITLIST_USER.COUNT;

  try {
    const existingWaitlistUser = await findByEmail(email);

    if (existingWaitlistUser) {
      throw new ApiError(409, `Email ${email} is already on the waitlist`);
    }

    // Create user in DB
    const newWaitlistUser =
      await Repository.waitlistUserRepository.createWaitlistUser(email);

    // Invalidate cache (IMPORTANT)
    await CacheService.del(userKey);
    await CacheService.del(allUsersKey);
    await CacheService.del(countKey);

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

    handleServerError(err instanceof Error ? err : new Error(String(err)));
  }
};

export default createWaitlistUserService;
