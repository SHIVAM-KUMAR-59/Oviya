import logger from '../../config/logger.config';
import { handleServerError } from '../../lib/utils/error.util';
import Repository from '../../repository';

const createWaitlistUserService = () => {
  try {
    console.log('Creating waitlist user service...');
    Repository.waitlistUserRepository.createWaitlistUser();
    logger.success(`Waitlist user created successfully!`);
  } catch (err) {
    logger.error(
      `Error creating waitlist user: ${err instanceof Error ? err.message : String(err)}`,
    );
    handleServerError(err instanceof Error ? err : new Error(String(err)));
  }
};

export default createWaitlistUserService;
