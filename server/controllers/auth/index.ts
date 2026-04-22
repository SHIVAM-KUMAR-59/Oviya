import loginUserController from './login.controller';
import { logoutController } from './logout.controller';
import { refreshTokenController } from './refreshToken.controller';
import registerUserController from './register.controller';
import sendOtpController from './sendOtp.controller';
import verifyOtpController from './verifyOtp.controller';

const AuthController = {
  sendOtpController,
  verifyOtpController,
  registerUserController,
  loginUserController,
  refreshTokenController,
  logoutController,
};

export default AuthController;
