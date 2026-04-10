import logger from '../../config/logger.config';
import prisma from '../../lib/utils/prisma.util';

const findByEmail = async (email: string) => {
  try {
    const waitlistUser = await prisma.waitlistUser.findUnique({
      where: {
        email,
      },
    });
    return waitlistUser;
  } catch (err) {
    logger.error(
      `Error in findByEmail while finding waitlist user by email: ${err}`,
    );
    throw err;
  }
};

const createWaitlistUser = async (email: string) => {
  try {
    const waitlistUser = await prisma.waitlistUser.create({
      data: {
        email,
      },
    });
    return waitlistUser;
  } catch (err) {
    logger.error(`Error in createWaitlistUser creating waitlist user: ${err}`);
    throw err;
  }
};

export { findByEmail, createWaitlistUser };
