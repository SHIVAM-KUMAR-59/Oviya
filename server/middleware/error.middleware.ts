import { ErrorRequestHandler } from 'express';
import logger from '../config/logger.config';
import { ApiError, ErrorCode } from '../lib/utils/error.util';

const errorHandlerMiddleware: ErrorRequestHandler = (err, _req, res, _next) => {
  logger.error(`${err.name}: ${err.message}`);

  if (err instanceof ApiError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      error: {
        code: err.code,
        statusCode: err.statusCode,
      },
    });
    return;
  }

  // Fallback for unexpected errors
  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    error: {
      code: ErrorCode.INTERNAL_SERVER_ERROR,
      statusCode: 500,
    },
  });
};

export default errorHandlerMiddleware;
