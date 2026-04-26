import {
  createUser,
  findAll,
  findByEmail,
  findById,
  updateOnboarding,
} from './user.repository';

const UserRepository = {
  createUser,
  findByEmail,
  findById,
  findAll,
  updateOnboarding,
};

export default UserRepository;
