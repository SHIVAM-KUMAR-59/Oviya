// controllers/predict.controller.ts

import { Request, Response } from 'express';
import { predictNextPeriod } from '../../lib/utils/cycle-prediction';
import { SelfReportedRegularity } from '../../lib/types/cycle.types';
import { UserProfile } from '../../lib/utils/cycle-prediction';

const parseDates = (dates: string[]) => {
  return dates.map((d) => {
    const date = new Date(d);
    if (isNaN(date.getTime())) throw new Error(`Invalid date: ${d}`);
    return { startDate: date, confidence: 'estimated' as const };
  });
};

const predictNextPeriodController = (req: Request, res: Response) => {
  try {
    const { dates, cycleType, today, profile } = req.body;

    if (!dates || !Array.isArray(dates) || dates.length < 2) {
      return res.status(400).json({
        success: false,
        message: 'At least 2 dates are required.',
      });
    }

    if (!cycleType) {
      return res.status(400).json({
        success: false,
        message: 'cycleType is required.',
      });
    }

    if (
      !profile?.age ||
      typeof profile.age !== 'number' ||
      profile.age < 8 ||
      profile.age > 65
    ) {
      return res.status(400).json({
        success: false,
        message: 'A valid age (8–65) is required.',
      });
    }

    const cycles = parseDates(dates);
    const todayDate = today ? new Date(today) : new Date();

    if (today && isNaN(todayDate.getTime())) {
      return res.status(400).json({ success: false, message: 'Invalid today date.' });
    }

    // Build profile — all optional fields fall back to undefined (algo handles gracefully)
    const userProfile: UserProfile = {
      age: profile.age,
      hasPCOS: profile.hasPCOS ?? undefined,
      hasEndometriosis: profile.hasEndometriosis ?? undefined,
      isPerimenopausal: profile.isPerimenopausal ?? undefined,
      recentHormoneChange: profile.recentHormoneChange ?? undefined,
      bmi: profile.bmi ?? undefined,
      stressLevel: profile.stressLevel ?? undefined,
      sleepQuality: profile.sleepQuality ?? undefined,
      isAthlete: profile.isAthlete ?? undefined,
    };

    const result = predictNextPeriod(
      cycles,
      cycleType as SelfReportedRegularity,
      userProfile,
      todayDate,
    );

    if (!result) {
      return res.status(422).json({
        success: false,
        message: 'Not enough valid cycle data to generate a prediction.',
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        predictedCycleLength: result.predictedCycleLength,
        windowStart: result.windowStart,
        windowEnd: result.windowEnd,
        windowDays: result.windowDays,
        confidenceLevel: result.confidenceLevel,
        confidenceMessage: result.confidenceMessage,
        isOverdue: result.isOverdue,
        nextUpdateAfter: result.nextUpdateAfter,
        wasCapApplied: result.wasCapApplied,
      },
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message || 'Internal Server Error',
    });
  }
};

export default predictNextPeriodController;
