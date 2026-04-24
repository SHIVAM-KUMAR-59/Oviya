import jwt from 'jsonwebtoken';
import CacheService from '../../cache/cache.service';
import env from '../../../config/env.config';
import logger from '../../../config/logger.config';
import { generateAccessToken } from '../../../lib/utils/jwt.util';
import issueRefreshToken from './issueRefreshToken.service';
import Repository from '../../../repository';
import { ApiError, ErrorCode } from '../../../lib/utils/error.util';

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
    throw new ApiError(ErrorCode.UNAUTHENTICATED, 'Invalid refresh token');
  }

  const { sub: userId, jti } = payload;

  const dbToken = await Repository.authRepository.findByToken(jti);

  // Token reuse detection — if already revoked, kill all sessions
  if (!dbToken || dbToken.revokedAt || dbToken.expiresAt < new Date()) {
    logger.debug(`Refresh token reuse detected userId=${userId}`);
    await Repository.authRepository.revokeAllByUserId(userId);

    throw new ApiError(ErrorCode.TOKEN_REUSE, 'Session invalidated. Please login again.');
  }

  // Revoke old token
  await Promise.all([
    Repository.authRepository.revokeByToken(jti),
    CacheService.del(env.REDIS.KEYS.AUTH.REFRESH_TOKEN(jti)),
  ]);

  // Issue new pair
  const newAccessToken = generateAccessToken(userId, dbToken.user.role);
  const newRefreshToken = await issueRefreshToken(userId);

  return { userId, newAccessToken, newRefreshToken };
};

export default rotateRefreshToken;
