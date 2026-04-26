import { User, WaitlistUser } from '@prisma/client';
import { AuthResponseDTO } from '../../dto/auth.dto';
import { CreateAdminResponseDTO } from '../../dto/admin.dto';
import { WaitlistUserDTO } from '../../dto/waitlist.dto';
import { UserResponseDTO } from '../../dto/user.dto';
import { PredictionResult } from '../types/cycle.types';
import { PredictionResponseDTO } from '../../dto/prediction.dto';

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

export const mapToWaitlistUserDTO = (user: WaitlistUser): WaitlistUserDTO => {
  return {
    id: user.id,
    email: user.email,
    joinedAt: user.createdAt.toISOString(),
  };
};

export const mapToUserResponseDTO = (user: User): UserResponseDTO => {
  return {
    id: user.id,
    name: user.name!,
    email: user.email,
    role: user.role,
    onboardingCompleted: user.onboardingCompleted,
    pcosStatus: user.pcosStatus,
    selfReportedRegularity: user.selfReportedRegularity,
    joinedAt: user.createdAt.toISOString(),
  };
};

export function mapToPredictionResponseDTO(
  prediction: PredictionResult,
): PredictionResponseDTO {
  return {
    windowStart: prediction.windowStart.toISOString(),
    windowEnd: prediction.windowEnd.toISOString(),
    mostLikelyDate: prediction.mostLikelyDate.toISOString(),

    windowDays: prediction.windowDays,
    honestWindowDays: prediction.honestWindowDays,

    predictedCycleLength: prediction.predictedCycleLength,

    confidenceLevel: prediction.confidenceLevel.toUpperCase() as any,
    confidenceMessage: prediction.confidenceMessage,

    basedOnCycles: prediction.basedOnCycles,
    wasCapApplied: prediction.wasCapApplied,

    isOverdue: prediction.isOverdue,
    nextUpdateAfter: prediction.nextUpdateAfter.toISOString(),
  };
}
