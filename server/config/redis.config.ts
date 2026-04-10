import Redis from 'ioredis';
import env from './env.config';
import logger from './logger.config';

const redis = new Redis(env.REDIS.URL, {
  maxRetriesPerRequest: null,
  enableReadyCheck: true,

  retryStrategy(times) {
    const delay = Math.min(times * 50, 2000);
    logger.error(`Redis retry attempt #${times}, retrying in ${delay}ms`);
    return delay;
  },
});

/**
 * Connection events
 */
redis.on('connect', () => {
  logger.debug('Redis connecting...');
});

redis.on('ready', () => {
  logger.success('Redis connected and ready');
});

redis.on('error', (err) => {
  logger.error(`Redis error: ${err.message}`);
});

redis.on('close', () => {
  logger.error('Redis connection closed');
});

redis.on('reconnecting', () => {
  logger.error('Redis reconnecting...');
});

export default redis;
