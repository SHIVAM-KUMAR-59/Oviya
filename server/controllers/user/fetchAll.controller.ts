import { Controller } from '../../lib/types/controller.types';
import { sendSuccess } from '../../lib/utils/response.util';
import Service from '../../services';

const fetchAllUserController: Controller = async (req, res, next) => {
  try {
    const users = await Service.userService.fetchAllUserService();
    sendSuccess(res, 'Fetched all users successfully', { users }, 200);
  } catch (err) {
    next(err);
  }
};

export default fetchAllUserController;
