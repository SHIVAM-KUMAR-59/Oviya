import { BodyController } from '../../lib/types/controller.types';
import Service from '../../services';
import { sendSuccess } from '../../lib/utils/response.util';
import { VerifyOtpRequestDTO } from '../../dto/auth.dto';

const verifyOtpController: BodyController<VerifyOtpRequestDTO> = async (
  req,
  res,
  next,
) => {
  try {
    const { email, otp } = req.body;

    await Service.authService.verifyOtpService({ email, otp });

    sendSuccess(res, 'OTP verified successfully', null, 200);
  } catch (err) {
    next(err);
  }
};

export default verifyOtpController;
