import { BodyController } from '../../lib/types/controller.types';
import Service from '../../services';
import { sendSuccess } from '../../lib/utils/response.util';
import { LoginRequestDTO } from '../../dto/auth.dto';
import { setRefreshTokenCookie } from '../../lib/utils/cookie.util';

const loginUserController: BodyController<LoginRequestDTO> = async (req, res, next) => {
  try {
    const { email } = req.body;

    const { user, accessToken, refreshToken } =
      await Service.authService.loginUserService({ email });

    setRefreshTokenCookie(res, refreshToken);

    sendSuccess(res, 'User logged in successfully', { accessToken, user }, 200);
  } catch (err) {
    next(err);
  }
};

export default loginUserController;
