import jwt, { SignOptions } from 'jsonwebtoken';
import prisma from '../../../lib/utils/prisma.util';
import CacheService from '../../cache/cache.service';
import env from '../../../config/env.config';
import logger from '../../../config/logger.config';
import { generateAccessToken } from '../../../lib/utils/jwt.util';
import issueRefreshToken from './issueRefreshToken.service';

const REFRESH_SECRET = env.JWT.REFRESH_TOKEN.SECRET;

const rotateRefreshToken = async (
  token: string,
): Promise<{
  userId: string;
  newAccessToken: string;
  newRefreshToken: string;
}> => {
  let payload: { sub: string; jti: string };

  try {
    payload = jwt.verify(token, REFRESH_SECRET) as typeof payload;
  } catch {
    throw Object.assign(new Error('Invalid refresh token'), {
      code: 'INVALID_REFRESH_TOKEN',
      status: 401,
    });
  }

  const { sub: userId, jti } = payload;

  const dbToken = await prisma.refreshToken.findUnique({
    where: { token: jti },
    include: { user: { select: { id: true, email: true } } },
  });

  // Token reuse detection — if already revoked, kill all sessions
  if (!dbToken || dbToken.revokedAt || dbToken.expiresAt < new Date()) {
    logger.warn(`Refresh token reuse detected userId=${userId}`);
    await prisma.refreshToken.updateMany({
      where: { userId, revokedAt: null },
      data: { revokedAt: new Date() },
    });
    throw Object.assign(new Error('Token reuse detected — all sessions terminated'), {
      code: 'TOKEN_REUSE',
      status: 401,
    });
  }

  // Revoke old token
  await Promise.all([
    prisma.refreshToken.update({
      where: { token: jti },
      data: { revokedAt: new Date() },
    }),
    CacheService.del(env.REDIS.KEYS.AUTH.REFRESH_TOKEN(jti)),
  ]);

  // Issue new pair
  const newAccessToken = generateAccessToken(userId);
  const newRefreshToken = await issueRefreshToken(userId);

  return { userId, newAccessToken, newRefreshToken };
};

export default rotateRefreshToken;
