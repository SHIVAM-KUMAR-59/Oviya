import { CreateAdminRequestDTO } from '../../dto/admin.dto';
import { BodyController } from '../../lib/types/controller.types';
import { ApiError, ErrorCode } from '../../lib/utils/error.util';
import { sendSuccess } from '../../lib/utils/response.util';
import Service from '../../services';

const createAdminController: BodyController<CreateAdminRequestDTO> = async (
  req,
  res,
  next,
) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const role = req.user?.role;

    if (!role) {
      throw new ApiError(ErrorCode.UNAUTHENTICATED, 'User is not logged in');
    }

    const admin = await Service.adminService.createAdminService({ name, email }, role);

    sendSuccess(res, 'Admin Created successfully', { admin }, 201);
  } catch (err) {
    next(err);
  }
};

export default createAdminController;
