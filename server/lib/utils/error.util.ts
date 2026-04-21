import logger from '../../config/logger.config';

export enum ErrorCode {
  BAD_REQUEST = 'BAD_REQUEST',
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  NOT_FOUND = 'NOT_FOUND',
  CONFLICT = 'CONFLICT',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  TOO_MANY_REQUESTS = 'TOO_MANY_REQUESTS',
}

export const ErrorMessageMap: Record<ErrorCode, string> = {
  [ErrorCode.BAD_REQUEST]: 'Bad request',
  [ErrorCode.UNAUTHORIZED]: 'Unauthorized',
  [ErrorCode.FORBIDDEN]: 'Forbidden',
  [ErrorCode.NOT_FOUND]: 'Resource not found',
  [ErrorCode.CONFLICT]: 'Conflict occurred',
  [ErrorCode.VALIDATION_ERROR]: 'Validation failed',
  [ErrorCode.TOO_MANY_REQUESTS]: 'Too many requests',
  [ErrorCode.INTERNAL_SERVER_ERROR]: 'Internal server error',
};

export const ErrorStatusMap: Record<ErrorCode, number> = {
  [ErrorCode.BAD_REQUEST]: 400,
  [ErrorCode.UNAUTHORIZED]: 401,
  [ErrorCode.FORBIDDEN]: 403,
  [ErrorCode.NOT_FOUND]: 404,
  [ErrorCode.CONFLICT]: 409,
  [ErrorCode.VALIDATION_ERROR]: 422,
  [ErrorCode.TOO_MANY_REQUESTS]: 429,
  [ErrorCode.INTERNAL_SERVER_ERROR]: 500,
};

export class ApiError extends Error {
  public readonly statusCode: number;
  public readonly code: ErrorCode;

  constructor(code: ErrorCode, message?: string) {
    super(message || ErrorUtil.getDefaultMessage(code));

    this.code = code;
    this.statusCode = ErrorStatusMap[code];

    Object.setPrototypeOf(this, ApiError.prototype);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }
  }
}

export class ErrorUtil {
  public static handleServerError(error: unknown): never {
    if (error instanceof ApiError) {
      throw error;
    }

    // Log original error (important for production)
    logger.error(JSON.stringify(error));

    throw new ApiError(
      ErrorCode.INTERNAL_SERVER_ERROR,
      'Something went wrong. Please try again',
    );
  }

  public static getErrorMessage(error: unknown): string {
    return error instanceof Error ? error.message : 'Unknown error';
  }

  public static getDefaultMessage(code: ErrorCode): string {
    return ErrorMessageMap[code];
  }
}
