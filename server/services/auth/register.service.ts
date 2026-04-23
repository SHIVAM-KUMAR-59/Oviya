import env from '../../config/env.config';
import logger from '../../config/logger.config';
import { RegisterRequestDTO } from '../../dto/auth.dto';
import { ApiError, ErrorCode, ErrorUtil } from '../../lib/utils/error.util';
import { generateAccessToken } from '../../lib/utils/jwt.util';
import { mapToAuthResponseDTO } from '../../lib/utils/mapper.util';
import Repository from '../../repository';
import CacheService from '../cache/cache.service';
import RefreshTokenService from './token';

const registerUserService = async (registerData: RegisterRequestDTO) => {
  try {
    const verifiedKey = env.REDIS.KEYS.OTP.VERIFIED_BY_EMAIL(registerData.email);
    const isVerified = await CacheService.get<boolean>(verifiedKey);

    if (!isVerified) {
      throw new ApiError(ErrorCode.FORBIDDEN, 'OTP verification required');
    }

    const existingUser = await Repository.userRepository.findByEmail(registerData.email);
    if (existingUser) {
      logger.error(`User with email ${registerData.email} already exists`);
      throw new ApiError(
        ErrorCode.CONFLICT,
        `User with email ${registerData.email} already exists`,
      );
    }

    const user = await Repository.userRepository.createUser({
      name: registerData.name,
      email: registerData.email,
    });
    if (!user) {
      logger.error(`Error creating user with email: ${registerData.email}`);
      throw new ApiError(
        ErrorCode.INTERNAL_SERVER_ERROR,
        `Error creating user with email: ${registerData.email}`,
      );
    }

    await CacheService.del(verifiedKey);

    const accessToken = generateAccessToken(user.id, user.role);
    const refreshToken = await RefreshTokenService.issueRefreshToken(user.id);

    if (!accessToken || !refreshToken) {
      logger.error('Error generating token');
      throw new ApiError(ErrorCode.INTERNAL_SERVER_ERROR, 'Something went wrong.');
    }

    logger.success(`User registered: userId=${user.id}`);

    const authResponse = mapToAuthResponseDTO(user, accessToken);
    return { authResponse, refreshToken };
  } catch (err) {
    const errorMessage = ErrorUtil.getErrorMessage(err);
    logger.error(errorMessage);
    ErrorUtil.handleServerError(err);
  }
};

export default registerUserService;
