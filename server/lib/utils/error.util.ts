class ApiError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}

const handleServerError = (error: Error): never => {
  if (error instanceof ApiError) {
    throw error;
  }

  throw new ApiError(500, "Something went wrong. Please try again later.");
};

export { ApiError, handleServerError };