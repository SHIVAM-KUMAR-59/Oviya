import logger from '../../config/logger.config';
import { ApiError, handleServerError } from '../../lib/utils/error.util';
import Repository from '../../repository';
import { findByEmail } from '../../repository/waitlistUser/waitlistUser.repository';

const createWaitlistUserService = async (email: string) => {
  try {
    const existingWaitlistUser = await findByEmail(email);
    if (existingWaitlistUser) {
      throw new ApiError(409, `Email ${email} is already on the waitlist`);
    }

    const newWaitlistUser =
      await Repository.waitlistUserRepository.createWaitlistUser(email);
    logger.success(`Waitlist user created successfully!`);

    return newWaitlistUser;
  } catch (err) {
    logger.error(
      `Error in createWaitlistUserService while creating waitlist user: ${err instanceof Error ? err.message : String(err)}`,
    );
    handleServerError(err instanceof Error ? err : new Error(String(err)));
  }
};

export default createWaitlistUserService;
