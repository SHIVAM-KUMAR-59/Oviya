import { Request, Response, NextFunction } from 'express';
import Service from '../../services';
import { clearRefreshTokenCookie } from '../../lib/utils/cookie.util';
import { Controller } from '../../lib/types/controller.types';
import { sendSuccess } from '../../lib/utils/response.util';

export const logoutController: Controller = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const refreshToken = req.cookies?.refreshToken;

    if (refreshToken) {
      await Service.authService.logoutService(refreshToken);
    }

    // clear cookie regardless (important)
    clearRefreshTokenCookie(res);

    sendSuccess(res, 'Logged out successfully', null, 200);
  } catch (err) {
    next(err);
  }
};
