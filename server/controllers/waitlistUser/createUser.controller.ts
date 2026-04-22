import logger from '../../config/logger.config';
import { BodyController } from '../../lib/types/controller.types';
import { ApiError, ErrorCode } from '../../lib/utils/error.util';
import { sendSuccess } from '../../lib/utils/response.util';
import { isValidEmail, isValidString } from '../../lib/utils/validator.util';
import Service from '../../services';

type WaitlistUserRequestBody = {
  email: string;
  name?: string;
};

const createWaitlistUserController: BodyController<WaitlistUserRequestBody> = async (
  req,
  res,
  next,
) => {
  try {
    const email = req.body.email.trim();

    if (!isValidString(email) || !isValidEmail(email)) {
      logger.error(`Invalid email address provided: ${email}`);
      throw new ApiError(ErrorCode.BAD_REQUEST, 'Invalid email address provided.');
    }

    const waitlistUser =
      await Service.waitlistUserService.createWaitlistUserService(email);

    sendSuccess(res, 'Waitlist user created successfully!', waitlistUser, 201);
  } catch (err) {
    next(err);
  }
};

export default createWaitlistUserController;
