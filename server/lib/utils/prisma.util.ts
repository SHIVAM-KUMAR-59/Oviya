import { PrismaClient } from '@prisma/client';
import env from '../../config/env.config';

declare global {
  var prisma: PrismaClient | undefined;
}

const prisma = globalThis.prisma || new PrismaClient();
// Ensure the PrismaClient instance is not recreated in development
if (env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma;
}

export default prisma;
