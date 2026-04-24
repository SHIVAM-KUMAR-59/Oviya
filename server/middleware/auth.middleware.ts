import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../lib/utils/jwt.util';
import { ApiError, ErrorCode } from '../lib/utils/error.util';
import logger from '../config/logger.config';
import { UserRoles } from '@prisma/client';

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    role: UserRoles;
  };
}

const authMiddleware = (req: AuthRequest, _res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new ApiError(ErrorCode.UNAUTHENTICATED, 'Access token missing');
    }

    const token = authHeader.split(' ')[1];

    const payload = verifyAccessToken(token);
    // { userId, role }

    req.user = {
      userId: payload.userId,
      role: payload.role,
    };

    logger.debug(`Request made by ${req.user.userId}`);
    next();
  } catch (error) {
    next(
      error instanceof ApiError
        ? error
        : new ApiError(ErrorCode.UNAUTHENTICATED, 'Invalid or expired token'),
    );
  }
};

export default authMiddleware;
