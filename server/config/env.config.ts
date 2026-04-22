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
    AUTH: {
      REFRESH_TOKEN: (jti: string) => `auth:refresh:${jti}`,
    },
    OTP: {
      BY_EMAIL: (email: string) => `otp:${email}`,
      ATTEMPTS_BY_EMAIL: (email: string) => `otp:attempts:${email}`,
      COOLDOWN_BY_EMAIL: (email: string) => `otp:cooldown:${email}`,
      VERIFIED_BY_EMAIL: (email: string) => `otp:verified:${email}`,
    },
  },
  TTL: {
    SHORT: 30, // 30 seconds
    MEDIUM: 60, // 1 minutes
    LONG: 300, // 5 minutes
  },
};

const JWT = {
  ACCESS_TOKEN: {
    SECRET: requireEnv('ACCESS_TOKEN_SECRET'),
    EXPIRY_TIME: requireEnv('ACCESS_TOKEN_EXPIRY_TIME'),
  },
  REFRESH_TOKEN: {
    SECRET: requireEnv('REFRESH_TOKEN_SECRET'),
    EXPIRY_SECONDS: 60 * 60 * 24 * 30, // 30 days
  },
};

const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',

  PORT: process.env.PORT ? toNumber(process.env.PORT, 'PORT') : 8000,

  DATABASE_URL: requireEnv('DATABASE_URL'),
  DIRECT_URL: requireEnv('DIRECT_URL'),

  JWT,

  ENABLE_LOGS: process.env.ENABLE_LOGS ? toBoolean(process.env.ENABLE_LOGS) : true,

  REDIS,

  RESEND_API_KEY: requireEnv('RESEND_API_KEY'),
};

export default env;
