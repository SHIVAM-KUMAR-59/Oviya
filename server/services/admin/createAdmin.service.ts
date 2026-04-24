import logger from '../../config/logger.config';
import { CreateAdminRequestDTO, CreateAdminResponseDTO } from '../../dto/admin.dto';
import { ApiError, ErrorCode, ErrorUtil } from '../../lib/utils/error.util';
import { mapToCreateAdminResponseDTO } from '../../lib/utils/mapper.util';
import Repository from '../../repository';

const createAdminService = async (
  createAdminRequest: CreateAdminRequestDTO,
): Promise<CreateAdminResponseDTO> => {
  try {
    const existingAdmin = await Repository.adminRepository.findByEmail(
      createAdminRequest.email,
    );
    console.log('existingAdmin', existingAdmin);
    if (existingAdmin) {
      logger.error(`Admin with email ${createAdminRequest.email} already exists`);
      throw new ApiError(
        ErrorCode.CONFLICT,
        `Admin with email ${createAdminRequest.email} already exists`,
      );
    }

    const admin = await Repository.adminRepository.createAdmin({
      name: createAdminRequest.name,
      email: createAdminRequest.email,
    });

    return mapToCreateAdminResponseDTO(admin);
  } catch (error) {
    const errorMessage = ErrorUtil.getErrorMessage(error);
    logger.error(`Error in createAdminService: `, errorMessage);
    ErrorUtil.handleServerError(error);
  }
};

export default createAdminService;
