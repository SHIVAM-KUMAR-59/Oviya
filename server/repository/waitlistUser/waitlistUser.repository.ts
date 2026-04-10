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

const getWaitlistUserCount = async () => {
  try {
    const count = await prisma.waitlistUser.count();
    return count;
  } catch (err) {
    logger.error(
      `Error in getWaitlistUserCount counting waitlist users: ${err}`,
    );
    throw err;
  }
};

export { findByEmail, createWaitlistUser, getWaitlistUserCount };
