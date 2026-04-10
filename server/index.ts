import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import { requestLogger } from './middleware/logger.middleware';
import logger from './config/logger.config';

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.get('/', async (req, res) => {
  const users = await prisma.test.findMany();
  res.json(users);
});

app.listen(8000, () => {
  logger.debug('Server running on port 8000');
});
