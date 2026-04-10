import logger from '../../config/logger.config';
import { BodyController } from '../../lib/types/controller.types';
import Service from '../../services';

type WaitlistUserRequestBody = {
  email: string;
  name?: string;
};

const createWaitlistUserController: BodyController<
  WaitlistUserRequestBody
> = async (req, res, next) => {
  try {
    logger.debug('Creating waitlist user...');
    Service.waitlistUserService.createWaitlistUserService();
    res.status(201).json({ message: 'Waitlist user created successfully!' });
    next();
  } catch (err) {
    next(err);
  }
};

export default createWaitlistUserController;
