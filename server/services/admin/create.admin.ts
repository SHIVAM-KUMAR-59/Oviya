import logger from '../../config/logger.config';
import { CreateAdminRequestDTO } from '../../dto/admin.dto';
import { ApiError, ErrorCode, ErrorUtil } from '../../lib/utils/error.util';
import Repository from '../../repository';

const createAdminService = async (createAdminRequest: CreateAdminRequestDTO) => {
  try {
    // if (role !== "ADMIN") {
    //     logger.error('Only admins can create new admins')
    //     throw new ApiError(ErrorCode.FORBIDDEN, 'Only admins can create new admins')
    // }

    const existingAdmin = await Repository.adminRepository.findByEmail(
      createAdminRequest.email,
    );
    if (existingAdmin) {
      logger.error(`Admin with email ${createAdminRequest.email} already exists`);
      throw new ApiError(
        ErrorCode.BAD_REQUEST,
        `Admin with email ${createAdminRequest.email} already exists`,
      );
    }

    const admin = await Repository.adminRepository.createAdmin({
      name: createAdminRequest.name,
      email: createAdminRequest.email,
    });
    return admin;
  } catch (error) {
    const errorMessage = ErrorUtil.getErrorMessage(error);
    logger.error(`Error in createAdminService: `, errorMessage);
    ErrorUtil.handleServerError(error);
  }
};

export default createAdminService;
