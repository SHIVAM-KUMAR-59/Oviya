import { Request, Response, NextFunction } from 'express';
import Service from '../../services';
import { clearRefreshTokenCookie } from '../../lib/utils/cookie.util';
import { Controller } from '../../lib/types/controller.types';

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

    res.status(200).json({
      success: true,
      message: 'Logged out successfully',
    });
  } catch (err) {
    next(err);
  }
};
