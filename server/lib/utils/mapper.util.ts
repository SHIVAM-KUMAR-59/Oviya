import { User } from '@prisma/client';
import { AuthResponseDTO } from '../../dto/auth.dto';

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
    },
  };
};
