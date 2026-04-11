import logger from '../config/logger.config';
import { Middleware } from '../lib/types/controller.types';

export const requestLogger: Middleware = (req, res, next) => {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;

    logger.debug(`${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`);
  });

  next();
};
