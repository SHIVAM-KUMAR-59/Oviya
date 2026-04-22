import { BodyController } from '../../lib/types/controller.types';
import Service from '../../services';
import { sendSuccess } from '../../lib/utils/response.util';
import { SendOtpRequestDTO } from '../../dto/auth.dto';

const sendOtpController: BodyController<SendOtpRequestDTO> = async (req, res, next) => {
  try {
    const { email } = req.body;

    await Service.authService.sendOtpService({ email });

    sendSuccess(res, 'OTP sent successfully', 200);
  } catch (err) {
    next(err);
  }
};

export default sendOtpController;
