import AdminService from './admin';
import AuthService from './auth';
import CacheService from './cache/cache.service';
import UserService from './user';
import WaitlistUserService from './waitlistUser';

const Service = {
  waitlistUserService: WaitlistUserService,
  cacheService: CacheService,
  authService: AuthService,
  adminService: AdminService,
  userService: UserService,
};

export default Service;
