import RefreshTokenService from './token';

const logoutService = async (refreshToken: string) => {
  try {
    await RefreshTokenService.revokeRefreshToken(refreshToken);
  } catch {
    // logout should never fail loudly
    return;
  }
};

export default logoutService;
