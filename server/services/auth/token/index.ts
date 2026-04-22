import issueRefreshToken from './issueRefreshToken.service';
import revokeRefreshToken from './revokeRefreshToken.service';
import rotateRefreshToken from './rotateRefreshToken.service';

const RefreshTokenService = {
  issueRefreshToken,
  revokeRefreshToken,
  rotateRefreshToken,
};

export default RefreshTokenService;
