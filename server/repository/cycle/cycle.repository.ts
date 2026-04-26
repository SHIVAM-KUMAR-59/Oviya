import prisma from '../../lib/utils/prisma.util';

export const createMany = async (userId: string, dates: Date[]) => {
  return prisma.cycle.createMany({
    data: dates.map((date) => ({
      userId,
      startDate: date,
      confidence: 'ESTIMATED',
    })),
  });
};

export const findByUser = async (userId: string) => {
  return prisma.cycle.findMany({
    where: { userId },
    orderBy: { startDate: 'asc' },
  });
};
