import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { Request, Response, NextFunction } from 'express';
import { ApiError, ErrorCode } from '../lib/utils/error.util';

type ClassConstructor = { new (...args: unknown[]): object };

export const validateBody = (dtoClass: ClassConstructor) => {
  return async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    try {
      // 1. Transform
      const output = plainToInstance(dtoClass, req.body);

      // 2. Validate
      const errors: ValidationError[] = await validate(output, {
        whitelist: true,
        forbidNonWhitelisted: true,
        stopAtFirstError: true,
      });

      if (errors.length > 0) {
        const message = mapErrors(errors).join(', ');
        return next(new ApiError(ErrorCode.VALIDATION_ERROR, message));
      }

      // 3. Replace body with sanitized DTO
      req.body = output;

      return next();
    } catch (err) {
      return next(err);
    }
  };
};

const mapErrors = (errors: ValidationError[]): string[] => {
  return errors.flatMap((error) => {
    const constraints = error.constraints ? Object.values(error.constraints) : [];

    const children = error.children?.length ? mapErrors(error.children) : [];

    return [...constraints, ...children];
  });
};
