import { User } from '@prisma/client';
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
