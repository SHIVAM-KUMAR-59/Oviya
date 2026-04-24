import logger from "../../config/logger.config";
import { ErrorUtil } from "../../lib/utils/error.util";
import { mapToWaitlistUserDTO } from "../../lib/utils/mapper.util";
import Repository from "../../repository"

const fetchAllWaitlistUserService = async () => {
    try {
        const users = await Repository.waitlistUserRepository.findAll();
        return users.map((user) => mapToWaitlistUserDTO(user))
    } catch (error) {
        const errorMessage = ErrorUtil.getErrorMessage(error);
        logger.error(`Error fetching all waitlist users: `, errorMessage);
        ErrorUtil.handleServerError(error)
    }
}

export default fetchAllWaitlistUserService