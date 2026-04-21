import { RefreshToken } from '@prisma/client';
import prisma from '../../lib/utils/prisma.util';

export const createRefreshToken = async (tokenData: RefreshToken) => {
  const token = await prisma.refreshToken.create({
    data: {
      userId: tokenData.userId,
      token: tokenData.token,
      expiresAt: tokenData.expiresAt,
    },
  });

  return token;
};

export const findByToken = async (tokenString: string) => {
  const token = await prisma.refreshToken.findUnique({
    where: {
      token: tokenString,
    },
  });

  return token;
};

export const invalidateToken = async (tokenString: string) => {
  const token = await prisma.refreshToken.update({
    where: {
      token: tokenString,
    },
    data: {
      revokedAt: new Date(),
    },
  });

  return token;
};
