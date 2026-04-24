import logger from '../../config/logger.config';
import { ErrorUtil } from '../../lib/utils/error.util';
import { mapToUserResponseDTO } from '../../lib/utils/mapper.util';
import Repository from '../../repository';

const fetchAllUserService = async () => {
  try {
    const users = await Repository.userRepository.findAll();
    return users.map((user) => mapToUserResponseDTO(user));
  } catch (error) {
    const errorMessage = ErrorUtil.getErrorMessage(error);
    logger.error('Error in fetch all user service: ' + errorMessage);
    ErrorUtil.handleServerError(error);
  }
};

export default fetchAllUserService;
