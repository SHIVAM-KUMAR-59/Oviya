import { Controller } from '../../lib/types/controller.types';
import { sendSuccess } from '../../lib/utils/response.util';
import Service from '../../services';

const getWaitlistUserCountController: Controller = async (req, res, next) => {
  try {
    const count = await Service.waitlistUserService.getWaitlistUserCountService();
    sendSuccess(res, 'Waitlist count fetched successfully', count, 200);
  } catch (err) {
    next(err);
  }
};

export default getWaitlistUserCountController;
