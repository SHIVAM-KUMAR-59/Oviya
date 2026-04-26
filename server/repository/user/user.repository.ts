import { PCOSStatus, SelfReportedRegularity } from '@prisma/client';
import prisma from '../../lib/utils/prisma.util';

export const createUser = async (userData: { name: string; email: string }) => {
  const user = await prisma.user.create({
    data: {
      name: userData.name,
      email: userData.email,
    },
  });

  return user;
};

export const findByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  return user;
};

export const findById = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  return user;
};

export const findAll = async () => {
  const users = await prisma.user.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  return users;
};

export const updateOnboarding = async (
  userId: string,
  data: {
    hasPCOS?: boolean;
    selfReportedRegularity: SelfReportedRegularity;
  },
) => {
  return prisma.user.update({
    where: { id: userId },
    data: {
      pcosStatus: data.hasPCOS ? PCOSStatus.DIAGNOSED : PCOSStatus.UNKNOWN,
      selfReportedRegularity: data.selfReportedRegularity,
      onboardingCompleted: true,
      onboardingCompletedAt: new Date(),
    },
  });
};
