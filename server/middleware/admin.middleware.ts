import { NextFunction, Response } from 'express';
import { AuthRequest } from './auth.middleware';
import { ApiError, ErrorCode } from '../lib/utils/error.util';

export const requireAdmin = (
  req: AuthRequest,
  _res: Response,
  next: NextFunction,
): void => {
  if (!req.user) {
    throw new ApiError(ErrorCode.UNAUTHENTICATED, 'Access token missing');
  }

  if (req.user.role !== 'ADMIN') {
    throw new ApiError(ErrorCode.FORBIDDEN, 'Admin access only');
  }

  next();
};
