/**
 * @openapi
 * components:
 *   schemas:
 *     SuccessResponse:
 *       type: object
 *       required:
 *         - success
 *         - message
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: "Request completed successfully"
 *         data:
 *           nullable: true
 *           oneOf:
 *             - type: object
 *             - type: array
 *             - type: string
 *             - type: number
 *             - type: boolean
 *
 *     ErrorResponse:
 *       type: object
 *       required:
 *         - success
 *         - message
 *         - error
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         message:
 *           type: string
 *           example: "Something went wrong"
 *         error:
 *           type: object
 *           required:
 *             - code
 *             - statusCode
 *           properties:
 *             code:
 *               type: string
 *               enum:
 *                 - BAD_REQUEST
 *                 - UNAUTHENTICATED
 *                 - FORBIDDEN
 *                 - NOT_FOUND
 *                 - CONFLICT
 *                 - VALIDATION_ERROR
 *                 - TOO_MANY_REQUESTS
 *                 - INTERNAL_SERVER_ERROR
 *               example: "INTERNAL_SERVER_ERROR"
 *             statusCode:
 *               type: integer
 *               example: 500
 *             details:
 *               nullable: true
 *               oneOf:
 *                 - type: string
 *                   example: "Something went wrong"
 *                 - type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       field:
 *                         type: string
 *                         example: "email"
 *                       message:
 *                         type: string
 *                         example: "Something went wrong"
 */
import { ErrorCode } from '../lib/utils/error.util';

export class SuccessResponseDTO<T> {
  readonly success!: true;
  readonly message!: string;
  readonly data!: T;
}

export class ErrorResponseDTO {
  readonly success = false;
  readonly message!: string;

  readonly error!: {
    code: ErrorCode;
    statusCode: number;
    details?: unknown;
  };
}
