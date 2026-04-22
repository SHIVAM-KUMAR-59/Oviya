import logger from '../../config/logger.config';
import { ApiError, ErrorCode, ErrorUtil } from '../../lib/utils/error.util';
import { generateAccessToken } from '../../lib/utils/jwt.util';
import Repository from '../../repository';
import RefreshTokenService from './token';

const registerUserService = async ({ name, email }: { name: string; email: string }) => {
  try {
    const existingUser = await Repository.userRepository.findByEmail(email);
    if (existingUser) {
      logger.error(`User with email ${email} already exists`);
      throw new ApiError(ErrorCode.CONFLICT, `User with email ${email} already exists`);
    }

    const user = await Repository.userRepository.createUser({ name, email });
    if (!user) {
      logger.error(`Error creating user with email: ${email}`);
      throw new ApiError(
        ErrorCode.INTERNAL_SERVER_ERROR,
        `Error creating user with email: ${email}`,
      );
    }

    const accessToken = generateAccessToken(user.id);
    const refreshToken = await RefreshTokenService.issueRefreshToken(user.id);

    if (!accessToken || !refreshToken) {
      logger.error('Error generating token');
      throw new ApiError(ErrorCode.INTERNAL_SERVER_ERROR, 'Something went wrong.');
    }

    logger.success(`User registered: userId=${user.id}`);

    return { user, accessToken, refreshToken };
  } catch (err) {
    const errorMessage = ErrorUtil.getErrorMessage(err);
    logger.error(errorMessage);
    ErrorUtil.handleServerError(err);
  }
};

export default registerUserService;
