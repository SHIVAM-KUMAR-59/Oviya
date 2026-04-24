import { Request, Response, NextFunction } from 'express';
import Service from '../../services';
import { ApiError, ErrorCode } from '../../lib/utils/error.util';
import { setRefreshTokenCookie } from '../../lib/utils/cookie.util';
import { sendSuccess } from '../../lib/utils/response.util';
import { Controller } from '../../lib/types/controller.types';

export const refreshTokenController: Controller = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
      throw new ApiError(ErrorCode.UNAUTHENTICATED, 'Refresh token missing');
    }

    const { accessToken, refreshToken: newRefreshToken } =
      await Service.authService.refreshTokenService(refreshToken);

    // rotate cookie
    setRefreshTokenCookie(res, newRefreshToken);

    sendSuccess(res, 'Token refreshed successfully', accessToken, 200);
  } catch (err) {
    next(err);
  }
};
