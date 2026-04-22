import logger from '../../config/logger.config';
import { ApiError, ErrorCode, ErrorUtil } from '../../lib/utils/error.util';
import { generateAccessToken } from '../../lib/utils/jwt.util';
import Repository from '../../repository';
import RefreshTokenService from './token';

const loginUserService = async (email: string) => {
  try {
    const user = await Repository.userRepository.findByEmail(email);
    if (!user) {
      logger.error(`User with email: ${email} not found`);
      throw new ApiError(ErrorCode.NOT_FOUND, `No user was found with this email`);
    }

    const accessToken = generateAccessToken(user.id);
    const refreshToken = await RefreshTokenService.issueRefreshToken(user.id);

    if (!accessToken || !refreshToken) {
      logger.error('Error generating token');
      throw new ApiError(ErrorCode.INTERNAL_SERVER_ERROR, 'Something went wrong.');
    }

    logger.success(`User logged in: userId=${user.id}`);

    return { user, accessToken, refreshToken };
  } catch (error) {
    const errorMessage = ErrorUtil.getErrorMessage(error);
    logger.error(errorMessage);
    ErrorUtil.handleServerError(error);
  }
};

export default loginUserService;
