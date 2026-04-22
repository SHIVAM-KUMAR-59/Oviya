import loginUserService from './login.service';
import logoutService from './logout.service';
import refreshTokenService from './refreshToken.service';
import registerUserService from './register.service';
import sendOtpService from './sentOtp.service';
import verifyOtpService from './verifyOtp.service';

const AuthService = {
  loginUserService,
  registerUserService,
  sendOtpService,
  verifyOtpService,
  refreshTokenService,
  logoutService,
};

export default AuthService;
