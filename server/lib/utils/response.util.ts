import { Response } from 'express';

export const sendSuccess = (
  res: Response,
  message: string,
  data: unknown = null,
  status = 200,
) => {
  return res.status(status).json({
    success: true,
    message,
    data,
  });
};

export const sendError = (res: Response, message: string, status = 500) => {
  return res.status(status).json({
    success: false,
    message,
  });
};
