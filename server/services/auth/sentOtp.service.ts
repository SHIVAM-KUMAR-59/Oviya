import env from '../../config/env.config';
import logger from '../../config/logger.config';
import otpTemplate from '../../lib/templates/otp.util';
import { ErrorUtil } from '../../lib/utils/error.util';
import sendMail from '../../lib/utils/mailer.util';
import CacheService from '../cache/cache.service';

const generateOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const sendOtpService = async (email: string) => {
  const otpKey = env.REDIS.KEYS.OTP.BY_EMAIL(email);
  const otpTtl = env.REDIS.TTL.LONG;
  try {
    const otp = generateOTP();
    await CacheService.set(otpKey, otp, otpTtl);

    await sendMail({
      to: email,
      subject: 'OTP for Oviya',
      html: otpTemplate(otp),
    });

    return;
  } catch (error) {
    const errorMessage = ErrorUtil.getErrorMessage(error);
    logger.error('Error in sending OTP: ', errorMessage);
    ErrorUtil.handleServerError(errorMessage);
  }
};

export default sendOtpService;
