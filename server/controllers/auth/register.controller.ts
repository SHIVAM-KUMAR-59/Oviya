import { BodyController } from '../../lib/types/controller.types';
import Service from '../../services';
import { sendSuccess } from '../../lib/utils/response.util';
import { RegisterRequestDTO } from '../../dto/auth.dto';
import { setRefreshTokenCookie } from '../../lib/utils/cookie.util';

const registerUserController: BodyController<RegisterRequestDTO> = async (
  req,
  res,
  next,
) => {
  try {
    const { name, email } = req.body;

    const { authResponse, refreshToken } = await Service.authService.registerUserService({
      name,
      email,
    });

    setRefreshTokenCookie(res, refreshToken);

    sendSuccess(res, 'User registered successfully', authResponse, 201);
  } catch (err) {
    next(err);
  }
};

export default registerUserController;
