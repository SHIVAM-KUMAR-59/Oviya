import { RefreshToken } from '@prisma/client';
import prisma from '../../lib/utils/prisma.util';

export const createRefreshToken = async (tokenData: {
  userId: string;
  token: string;
  expiresAt: Date;
}) => {
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
    include: { user: { select: { id: true, email: true } } },
  });

  return token;
};

export const revokeByToken = async (token: string) => {
  return prisma.refreshToken.updateMany({
    where: { token, revokedAt: null },
    data: { revokedAt: new Date() },
  });
};

export const revokeAllByUserId = async (userId: string) => {
  return prisma.refreshToken.updateMany({
    where: { userId, revokedAt: null },
    data: { revokedAt: new Date() },
  });
};
