import env from '../../config/env.config';
import logger from '../../config/logger.config';
import { ErrorUtil } from '../../lib/utils/error.util';
import Repository from '../../repository';
import CacheService from '../cache/cache.service';

const getWaitlistUserCountService = async (): Promise<number | void> => {
  try {
    const cachedCount = await CacheService.get<number>(
      env.REDIS.KEYS.WAITLIST_USER.COUNT,
    );
    if (cachedCount) {
      logger.success(`Cache hit for waitlist user count: ${cachedCount}`);
      return cachedCount;
    }

    const count = await Repository.waitlistUserRepository.getWaitlistUserCount();
    if (count !== undefined) {
      await CacheService.set(
        env.REDIS.KEYS.WAITLIST_USER.COUNT,
        count,
        env.REDIS.TTL.MEDIUM,
      );
      logger.success(`Cache set for waitlist user count: ${count}`);
      return count;
    }
  } catch (err) {
    logger.error(
      `Error in getWaitlistUserCountService: ${err instanceof Error ? err : new Error(String(err))}`,
    );
    ErrorUtil.handleServerError(err instanceof Error ? err : new Error(String(err)));
  }
};

export default getWaitlistUserCountService;
