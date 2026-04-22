import jwt, { SignOptions } from 'jsonwebtoken';
import CacheService from '../../cache/cache.service';
import env from '../../../config/env.config';
import crypto from 'crypto';
import Repository from '../../../repository';

const REFRESH_SECRET = env.JWT.REFRESH_TOKEN.SECRET;
const REFRESH_EXPIRY_SECONDS = env.JWT.REFRESH_TOKEN.EXPIRY_SECONDS;

const issueRefreshToken = async (userId: string): Promise<string> => {
  const jti = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + REFRESH_EXPIRY_SECONDS * 1000);

  // Persist to DB for hard revocation
  await Repository.authRepository.createRefreshToken({ userId, token: jti, expiresAt });

  // Cache for fast lookup
  await CacheService.set(
    env.REDIS.KEYS.AUTH.REFRESH_TOKEN(jti),
    userId,
    REFRESH_EXPIRY_SECONDS,
  );

  return jwt.sign({ sub: userId, jti }, REFRESH_SECRET, {
    expiresIn: REFRESH_EXPIRY_SECONDS,
  } as SignOptions);
};

export default issueRefreshToken;
