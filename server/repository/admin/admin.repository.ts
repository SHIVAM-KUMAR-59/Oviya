import prisma from '../../lib/utils/prisma.util';

export const createAdmin = async ({ name, email }: { name: string; email: string }) => {
  const admin = await prisma.admin.create({
    data: {
      name,
      email,
    },
  });

  return admin;
};

export const findByEmail = async (email: string) => {
  const admin = await prisma.admin.findUnique({
    where: {
      email,
    },
  });

  return admin;
};
