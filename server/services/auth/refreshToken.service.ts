import { ApiError, ErrorCode } from '../../lib/utils/error.util';
import RefreshTokenService from './token';

const refreshTokenService = async (refreshToken: string) => {
  try {
    const { newAccessToken, newRefreshToken } =
      await RefreshTokenService.rotateRefreshToken(refreshToken);

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  } catch (err: any) {
    if (err.status) {
      throw new ApiError(err.code, err.message);
    }

    throw new ApiError(ErrorCode.INTERNAL_SERVER_ERROR, 'Failed to refresh token');
  }
};

export default refreshTokenService;
