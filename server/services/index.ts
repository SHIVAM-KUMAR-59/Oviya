import AdminService from './admin';
import AuthService from './auth';
import CacheService from './cache/cache.service';
import WaitlistUserService from './waitlistUser';

const Service = {
  waitlistUserService: WaitlistUserService,
  cacheService: CacheService,
  authService: AuthService,
  adminService: AdminService,
};

export default Service;
