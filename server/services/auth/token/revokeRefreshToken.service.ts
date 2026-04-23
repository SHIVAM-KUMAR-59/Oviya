import jwt from 'jsonwebtoken';
import CacheService from '../../cache/cache.service';
import env from '../../../config/env.config';
import logger from '../../../config/logger.config';
import Repository from '../../../repository';

const revokeRefreshToken = async (token: string): Promise<void> => {
  try {
    const payload = jwt.decode(token) as { jti?: string } | null;
    if (!payload?.jti) return;

    await Promise.allSettled([
      Repository.authRepository.revokeByToken(payload.jti),
      CacheService.del(env.REDIS.KEYS.AUTH.REFRESH_TOKEN(payload.jti)),
    ]);
  } catch (err) {
    logger.debug(`revokeRefreshToken failed silently: ${err}`);
    // Never throw on logout
  }
};

export default revokeRefreshToken;
