import {
  createRefreshToken,
  findByToken,
  revokeAllByUserId,
  revokeByToken,
} from './auth.repository';

const AuthRepository = {
  createRefreshToken,
  findByToken,
  revokeByToken,
  revokeAllByUserId,
};

export default AuthRepository;
