import { User } from '@prisma/client';
import { AuthResponseDTO } from '../../dto/auth.dto';
import { CreateAdminResponseDTO } from '../../dto/admin.dto';

export const mapToAuthResponseDTO = (
  user: User,
  accessToken: string,
): AuthResponseDTO => {
  return {
    accessToken,
    user: {
      id: user.id,
      name: user.name!,
      email: user.email,
      onboardingCompleted: user.onboardingCompleted,
      role: user.role,
    },
  };
};

export const mapToCreateAdminResponseDTO = (admin: User): CreateAdminResponseDTO => {
  return {
    id: admin.id,
    name: admin.name!,
    email: admin.email,
    role: admin.role,
  };
};
