import logger from '../../config/logger.config';
import { ApiError, handleServerError } from '../../lib/utils/error.util';
import Repository from '../../repository';

const findWaitlistUserByEmailService = async (email: string) => {
  try {
    const waitlistUser =
      await Repository.waitlistUserRepository.findByEmail(email);
    return waitlistUser;
  } catch (err) {
    logger.error(
      `Error in findWaitlistUserByEmailService while finding waitlist user by email: ${err instanceof Error ? err.message : String(err)}`,
    );
    handleServerError(err instanceof Error ? err : new Error(String(err)));
  }
};

export default findWaitlistUserByEmailService;
