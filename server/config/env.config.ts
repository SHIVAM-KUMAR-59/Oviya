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

const REDIS = {
  URL: process.env.REDIS_URL || 'redis://127.0.0.1:6379',
  KEYS: {
    WAITLIST_USER: {
      ALL_USERS: 'waitlist:all',
      USER_BY_EMAIL: (email: string) => `waitlist:user:${email}`,
      COUNT: 'waitlist:count',
    },
  },
  TTL: {
    SHORT: 30, // 30 seconds
    MEDIUM: 60, // 1 min
    LONG: 300, // 5 min
  },
};

const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',

  PORT: process.env.PORT ? toNumber(process.env.PORT, 'PORT') : 8000,

  DATABASE_URL: requireEnv('DATABASE_URL'),
  DIRECT_URL: requireEnv('DIRECT_URL'),

  JWT_SECRET: requireEnv('JWT_SECRET'),
  //   JWT_EXPIRES_IN: requireEnv("JWT_EXPIRES_IN") || "7d",

  ENABLE_LOGS: process.env.ENABLE_LOGS
    ? toBoolean(process.env.ENABLE_LOGS)
    : true,

  REDIS,
};

export default env;
