import jwt from 'jsonwebtoken';
import prisma from '../../../lib/utils/prisma.util';
import CacheService from '../../cache/cache.service';
import env from '../../../config/env.config';
import logger from '../../../config/logger.config';

const revokeRefreshToken = async (token: string): Promise<void> => {
  try {
    const payload = jwt.decode(token) as { jti?: string } | null;
    if (!payload?.jti) return;

    await Promise.allSettled([
      prisma.refreshToken.updateMany({
        where: { token: payload.jti, revokedAt: null },
        data: { revokedAt: new Date() },
      }),
      CacheService.del(env.REDIS.KEYS.AUTH.REFRESH_TOKEN(payload.jti)),
    ]);
  } catch (err) {
    logger.warn(`revokeRefreshToken failed silently: ${err}`);
    // Never throw on logout
  }
};

export default revokeRefreshToken;
