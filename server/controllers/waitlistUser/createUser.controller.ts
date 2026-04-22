import { AddWaitlistRequestDTO } from '../../dto/waitlist.dto';
import { BodyController } from '../../lib/types/controller.types';
import { sendSuccess } from '../../lib/utils/response.util';
import Service from '../../services';

const createWaitlistUserController: BodyController<AddWaitlistRequestDTO> = async (
  req,
  res,
  next,
) => {
  try {
    const email = req.body.email;

    const waitlistUser = await Service.waitlistUserService.createWaitlistUserService({
      email,
    });

    sendSuccess(res, 'Waitlist user created successfully!', waitlistUser, 201);
  } catch (err) {
    next(err);
  }
};

export default createWaitlistUserController;
