import { Controller } from '../lib/types/controller.types';
import { ApiError, ErrorCode } from '../lib/utils/error.util';

const reqBodyMiddleware: Controller = (req, res, next) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    throw new ApiError(ErrorCode.BAD_REQUEST, 'Request body is empty');
  }
  next();
};

export default reqBodyMiddleware;
