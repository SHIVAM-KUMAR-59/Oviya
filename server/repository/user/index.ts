import { createUser, findByEmail, findById } from './user.repository';

const UserRepository = {
  createUser,
  findByEmail,
  findById,
};

export default UserRepository;
