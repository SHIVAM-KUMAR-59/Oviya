import { CreateAdminRequestDTO } from '../../dto/admin.dto';
import { BodyController } from '../../lib/types/controller.types';
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

    const admin = await Service.adminService.createAdminService({ name, email });

    sendSuccess(res, 'Admin Created successfully', { admin }, 201);
  } catch (err) {
    next(err);
  }
};

export default createAdminController;
