import { createUser, findAll, findByEmail, findById } from './user.repository';

const UserRepository = {
  createUser,
  findByEmail,
  findById,
  findAll,
};

export default UserRepository;
