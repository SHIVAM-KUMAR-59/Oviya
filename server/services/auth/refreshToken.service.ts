import { ErrorUtil } from '../../lib/utils/error.util';
import RefreshTokenService from './token';

const refreshTokenService = async (refreshToken: string, role: string) => {
  try {
    const { newAccessToken, newRefreshToken } =
      await RefreshTokenService.rotateRefreshToken(refreshToken, role);

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  } catch (err) {
    throw ErrorUtil.handleServerError(err);
  }
};

export default refreshTokenService;
