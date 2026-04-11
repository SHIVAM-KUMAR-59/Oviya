import logger from '../../config/logger.config';
import { BodyController } from '../../lib/types/controller.types';
import { ApiError } from '../../lib/utils/error.util';
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
      throw new ApiError(400, 'Invalid email address provided.');
    }

    const waitlistUser =
      await Service.waitlistUserService.createWaitlistUserService(email);

    res.status(201).json({
      success: true,
      message: 'Waitlist user created successfully!',
      data: {
        waitlistUser,
      },
    });

    next();
  } catch (err) {
    next(err);
  }
};

export default createWaitlistUserController;
