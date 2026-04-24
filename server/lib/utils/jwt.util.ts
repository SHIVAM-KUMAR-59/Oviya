import jwt, { SignOptions } from 'jsonwebtoken';
import env from '../../config/env.config';
import { UserRoles } from '@prisma/client';

export const generateAccessToken = (userId: string, role: UserRoles) => {
  return jwt.sign({ userId, role }, env.JWT.ACCESS_TOKEN.SECRET, {
    expiresIn: env.JWT.ACCESS_TOKEN.EXPIRY_TIME as SignOptions['expiresIn'],
  });
};

export const verifyAccessToken = (token: string) => {
  try {
    const payload = jwt.verify(token, env.JWT.ACCESS_TOKEN.SECRET) as {
      userId: string;
      role: UserRoles;
    };

    return payload;
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};

export const decodeToken = (token: string) => {
  return jwt.decode(token) as { userId: string; role: UserRoles } | null;
};
