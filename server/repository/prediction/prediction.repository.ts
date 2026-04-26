import { PredictionResult } from '../../lib/types/cycle.types';
import prisma from '../../lib/utils/prisma.util';

export const createPrediction = async (userId: string, prediction: PredictionResult) => {
  return prisma.prediction.create({
    data: {
      userId,
      windowStart: prediction.windowStart,
      windowEnd: prediction.windowEnd,
      mostLikelyDate: prediction.mostLikelyDate,
      windowDays: prediction.windowDays,
      honestWindowDays: prediction.honestWindowDays,
      predictedCycleLength: prediction.predictedCycleLength,
      confidenceLevel: prediction.confidenceLevel.toUpperCase() as any,
      confidenceMessage: prediction.confidenceMessage,
      basedOnCycles: prediction.basedOnCycles,
      wasCapApplied: prediction.wasCapApplied,
      nextUpdateAfter: prediction.nextUpdateAfter,
    },
  });
};
