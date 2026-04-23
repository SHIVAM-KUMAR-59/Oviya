import env from '../../config/env.config';
import logger from '../../config/logger.config';
import { SendOtpRequestDTO } from '../../dto/auth.dto';
import otpTemplate from '../../lib/templates/otp.util';
import { ApiError, ErrorCode, ErrorUtil } from '../../lib/utils/error.util';
import sendMail from '../../lib/utils/mailer.util';
import CacheService from '../cache/cache.service';

const generateOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const sendOtpService = async (sendOtpRequest: SendOtpRequestDTO) => {
  const otpKey = env.REDIS.KEYS.OTP.BY_EMAIL(sendOtpRequest.email);
  const attemptsKey = env.REDIS.KEYS.OTP.ATTEMPTS_BY_EMAIL(sendOtpRequest.email);
  const cooldownKey = env.REDIS.KEYS.OTP.COOLDOWN_BY_EMAIL(sendOtpRequest.email);

  const otpTtl = env.REDIS.TTL.LONG;

  try {
    // Cooldown check
    const isCoolingDown = await CacheService.get(cooldownKey);
    if (isCoolingDown) {
      throw new ApiError(
        ErrorCode.TOO_MANY_REQUESTS,
        'Please wait before requesting another OTP',
      );
    }

    const otp = generateOTP();

    // Clean previous state
    await Promise.all([CacheService.del(otpKey), CacheService.del(attemptsKey)]);

    // Store OTP
    await CacheService.set(otpKey, String(otp), otpTtl);

    // Send mail first
    await sendMail({
      to: sendOtpRequest.email,
      subject: 'OTP for Oviya',
      html: otpTemplate(otp),
    });

    // Cooldown
    await CacheService.set(cooldownKey, true, env.REDIS.TTL.SHORT);

    return { success: true };
  } catch (error) {
    logger.error('Error in sending OTP:', error instanceof Error ? error.stack : error);
    ErrorUtil.handleServerError(error);
  }
};

export default sendOtpService;
