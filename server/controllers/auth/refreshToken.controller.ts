import { Request, Response, NextFunction } from 'express';
import Service from '../../services';
import { ApiError, ErrorCode } from '../../lib/utils/error.util';
import { setRefreshTokenCookie } from '../../lib/utils/cookie.util';
import { sendSuccess } from '../../lib/utils/response.util';

export const refreshTokenController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
      throw new ApiError(ErrorCode.UNAUTHENTICATED, 'Refresh token missing');
    }

    const { accessToken, refreshToken: newRefreshToken } =
      await Service.authService.refreshTokenService(refreshToken, 'USER');

    // rotate cookie
    setRefreshTokenCookie(res, newRefreshToken);

    sendSuccess(res, 'Token refreshed successfully', accessToken, 200);
  } catch (err) {
    next(err);
  }
};
