import env from '../../config/env.config';
import logger from '../../config/logger.config';
import { ApiError, ErrorCode, ErrorUtil } from '../../lib/utils/error.util';
import CacheService from '../cache/cache.service';

const MAX_ATTEMPTS = 5;

const verifyOtpService = async (otp: string, email: string) => {
  const otpKey = env.REDIS.KEYS.OTP.BY_EMAIL(email);
  const attemptsKey = env.REDIS.KEYS.OTP.ATTEMPTS_BY_EMAIL(email);
  const verifiedKey = env.REDIS.KEYS.OTP.VERIFIED_BY_EMAIL(email);

  try {
    // 1. Check attempt count first
    const attempts = (await CacheService.get<number>(attemptsKey)) ?? 0;
    if (attempts >= MAX_ATTEMPTS) {
      logger.warn(`OTP brute-force lockout for email=${email}`);
      throw new ApiError(
        ErrorCode.TOO_MANY_REQUESTS,
        'Too many attempts — request a new code',
      );
    }

    // 2. Check OTP exists
    const storedOtp = await CacheService.get<string>(otpKey);
    if (!storedOtp) {
      logger.warn(`OTP expired or not found for email=${email}`);
      throw new ApiError(ErrorCode.BAD_REQUEST, 'OTP has expired — request a new code');
    }

    // 3. Constant-time comparison to prevent timing attacks
    const isValid = timingSafeEqual(storedOtp, otp);

    if (!isValid) {
      // Increment attempts, expire alongside the OTP TTL
      await CacheService.set(attemptsKey, attempts + 1, env.REDIS.TTL.LONG);
      logger.warn(
        `Invalid OTP attempt ${attempts + 1}/${MAX_ATTEMPTS} for email=${email}`,
      );
      throw new ApiError(ErrorCode.FORBIDDEN, 'Invalid OTP');
    }

    // 4. Valid — delete OTP + attempts immediately
    await Promise.all([
      CacheService.del(otpKey),
      CacheService.del(attemptsKey),
      CacheService.set(verifiedKey, true, env.REDIS.TTL.LONG),
    ]);

    return;
  } catch (error) {
    const errorMessage = ErrorUtil.getErrorMessage(error);
    logger.error('Error verifying OTP: ', errorMessage);
    ErrorUtil.handleServerError(error);
  }
};

// Prevent timing attacks — compare strings in constant time
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  const { timingSafeEqual: cryptoEqual } = require('crypto');
  return cryptoEqual(Buffer.from(a), Buffer.from(b));
}

export default verifyOtpService;
