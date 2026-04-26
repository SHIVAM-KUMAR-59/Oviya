import { OnboardingRequestDTO } from '../../dto/user.dto';
import { BodyController } from '../../lib/types/controller.types';
import { ApiError, ErrorCode } from '../../lib/utils/error.util';
import { sendSuccess } from '../../lib/utils/response.util';
import Service from '../../services';

const onboardingController: BodyController<OnboardingRequestDTO> = async (
  req,
  res,
  next,
) => {
  try {
    if (!req.user) {
      throw new ApiError(ErrorCode.UNAUTHENTICATED, 'User not logged in');
    }

    const result = await Service.userService.onboardingService(
      req.user?.userId,
      req.body,
    );
    sendSuccess(res, 'Onboarding successful', { result }, 201);
  } catch (err) {
    next(err);
  }
};

export default onboardingController;
