import jwt, { SignOptions } from 'jsonwebtoken';
import env from '../../config/env.config';

export const generateAccessToken = (userId: string) => {
  return jwt.sign({ userId }, env.JWT.ACCESS_TOKEN.SECRET, {
    expiresIn: env.JWT.ACCESS_TOKEN.EXPIRY_TIME as SignOptions['expiresIn'],
  });
};

export const generateRefreshToken = (userId: string) => {
  return jwt.sign({ userId }, env.JWT.REFRESH_TOKEN.SECRET, {
    expiresIn: env.JWT.REFRESH_TOKEN.EXPIRY_TIME as SignOptions['expiresIn'],
  });
};

export const verifyAccessToken = (token: string) => {
  try {
    const payload = jwt.verify(token, env.JWT.ACCESS_TOKEN.SECRET) as { userId: string };

    return payload;
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};

export const verifyRefreshToken = (token: string) => {
  try {
    const payload = jwt.verify(token, env.JWT.REFRESH_TOKEN.SECRET) as { userId: string };

    return payload;
  } catch {
    throw new Error('Invalid refresh token');
  }
};

export const decodeToken = (token: string) => {
  return jwt.decode(token) as { userId: string } | null;
};
