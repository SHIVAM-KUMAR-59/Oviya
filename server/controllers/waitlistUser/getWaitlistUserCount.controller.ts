import { Controller } from '../../lib/types/controller.types';
import Service from '../../services';

const getWaitlistUserCountController: Controller = async (req, res, next) => {
  try {
    const count = await Service.waitlistUserService.getWaitlistUserCountService();
    res.status(200).json({
      success: true,
      message: 'Waitlist user count retrieved successfully',
      data: {
        count,
      },
    });
  } catch (err) {
    next(err);
  }
};

export default getWaitlistUserCountController;
