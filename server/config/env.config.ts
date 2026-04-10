import dotenv from 'dotenv';
import logger from './logger.config';

dotenv.config();

function requireEnv(key: string): string {
  const value = process.env[key];

  if (!value) {
    logger.error(`Missing required environment variable: ${key}`);
    throw new Error(`Missing required environment variable: ${key}`);
  }

  return value;
}

const toNumber = (value: string, key: string) => {
  const num = Number(value);
  if (isNaN(num)) {
    logger.error(`Invalid number for ${key}: ${value}`);
    throw new Error(`Invalid number for ${key}`);
  }
  return num;
};

const toBoolean = (value: string) => {
  return value === 'true';
};

const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',

  PORT: process.env.PORT ? toNumber(process.env.PORT, 'PORT') : 5000,

  DATABASE_URL: requireEnv('DATABASE_URL'),
  DIRECT_URL: requireEnv('DIRECT_URL'),

  JWT_SECRET: requireEnv('JWT_SECRET'),
  //   JWT_EXPIRES_IN: requireEnv("JWT_EXPIRES_IN") || "7d",

  ENABLE_LOGS: process.env.ENABLE_LOGS
    ? toBoolean(process.env.ENABLE_LOGS)
    : true,
};

export default env;
