import prisma from '../../lib/utils/prisma.util';

export const createAdmin = async ({ name, email }: { name: string; email: string }) => {
  const admin = await prisma.user.create({
    data: {
      name,
      email,
      role: 'ADMIN',
    },
  });

  return admin;
};

export const findByEmail = async (email: string) => {
  const admin = await prisma.user.findUnique({
    where: {
      email,
      role: 'ADMIN',
    },
  });

  return admin;
};
