import { v4 as uuidv4 } from 'uuid';
import jwt, { SignOptions } from 'jsonwebtoken';
import prisma from '../../config/prisma.config';
import CacheService from '../../services/cache/cache.service';
import env from '../../config/env.config';
import logger from '../../config/logger.config';

const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;
const REFRESH_EXPIRY_SECONDS = 60 * 60 * 24 * 7; // 7 days

export async function issueRefreshToken(userId: string): Promise<string> {
  const jti = uuidv4();
  const expiresAt = new Date(Date.now() + REFRESH_EXPIRY_SECONDS * 1000);

  // Persist to DB for hard revocation
  await prisma.refreshToken.create({
    data: { userId, token: jti, expiresAt },
  });

  // Cache for fast lookup
  await CacheService.set(
    env.REDIS.KEYS.AUTH.REFRESH_TOKEN(jti),
    userId,
    REFRESH_EXPIRY_SECONDS,
  );

  return jwt.sign({ sub: userId, jti }, REFRESH_SECRET, {
    expiresIn: '7d',
  } as SignOptions);
}

export async function rotateRefreshToken(token: string): Promise<{
  userId: string;
  newAccessToken: string;
  newRefreshToken: string;
}> {
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
  const { generateAccessToken } = await import('./jwt.util.js');
  const newAccessToken = generateAccessToken(userId);
  const newRefreshToken = await issueRefreshToken(userId);

  return { userId, newAccessToken, newRefreshToken };
}

export async function revokeRefreshToken(token: string): Promise<void> {
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
}
