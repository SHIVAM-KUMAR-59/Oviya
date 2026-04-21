import env from '../../config/env.config';
import logger from '../../config/logger.config';
import { ErrorUtil } from '../../lib/utils/error.util';
import Repository from '../../repository';
import CacheService from '../cache/cache.service';

const findWaitlistUserByEmailService = async (email: string) => {
  const cacheKey = env.REDIS.KEYS.WAITLIST_USER.USER_BY_EMAIL(email);

  try {
    // Check cache
    const cachedUser = await CacheService.get<any>(cacheKey);

    if (cachedUser) {
      logger.debug(`Cache hit for waitlist user: ${email}`);
      return cachedUser;
    }

    // Fetch from DB
    const waitlistUser = await Repository.waitlistUserRepository.findByEmail(email);

    // Cache ONLY if exists
    if (waitlistUser) {
      await CacheService.set(cacheKey, waitlistUser, env.REDIS.TTL.LONG);
    }

    return waitlistUser;
  } catch (err) {
    logger.error(
      `Error in findWaitlistUserByEmailService: ${
        err instanceof Error ? err.message : String(err)
      }`,
    );

    ErrorUtil.handleServerError(err instanceof Error ? err : new Error(String(err)));
  }
};

export default findWaitlistUserByEmailService;
