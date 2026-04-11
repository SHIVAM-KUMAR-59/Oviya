import redis from '../../config/redis.config';
import logger from '../../config/logger.config';

const CacheService = {
  async get<T>(key: string): Promise<T | null> {
    try {
      const data = await redis.get(key);
      if (!data) return null;

      // Try parsing JSON, fallback to raw string
      try {
        return JSON.parse(data);
      } catch {
        return data as unknown as T;
      }
    } catch (error) {
      logger.error(`Cache GET error for key=${key}: ${error}`);
      return null;
    }
  },

  async set(key: string, value: unknown, ttlSeconds?: number) {
    try {
      const stringValue = typeof value === 'string' ? value : JSON.stringify(value);

      if (ttlSeconds) {
        return await redis.set(key, stringValue, 'EX', ttlSeconds);
      }

      return await redis.set(key, stringValue);
    } catch (error) {
      logger.error(`Cache SET error for key=${key}: ${error}`);
    }
  },

  async del(key: string) {
    try {
      return await redis.del(key);
    } catch (error) {
      logger.error(`Cache DEL error for key=${key}: ${error}`);
    }
  },

  async exists(key: string): Promise<boolean> {
    try {
      return (await redis.exists(key)) === 1;
    } catch (error) {
      logger.error(`Cache EXISTS error for key=${key}: ${error}`);
      return false;
    }
  },
};

export default CacheService;
