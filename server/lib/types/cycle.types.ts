// types/cycle.ts

export type SelfReportedRegularity =
  | 'very_irregular'
  | 'somewhat_irregular'
  | 'fairly_regular';

export type CycleConfidence =
  | 'logged' // entered in app
  | 'estimated'; // entered during onboarding from memory

export type ConfidenceLevel = 'very_early' | 'early' | 'good' | 'high' | 'rough';

export interface CycleInput {
  startDate: Date;
  confidence: CycleConfidence;
}

export interface PredictionResult {
  windowStart: Date;
  windowEnd: Date;
  mostLikelyDate: Date;
  windowDays: number;
  honestWindowDays: number;
  confidenceLevel: ConfidenceLevel;
  confidenceMessage: string;
  predictedCycleLength: number;
  basedOnCycles: number;
  wasCapApplied: boolean;
  isOverdue: boolean;
  nextUpdateAfter: Date;
}
