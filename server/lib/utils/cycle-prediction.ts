// lib/cycle-prediction.ts

import {
  CycleInput,
  SelfReportedRegularity,
  ConfidenceLevel,
  PredictionResult,
} from '../types/cycle.types';

// ─────────────────────────────────────────
// PUBLIC ENTRY POINT
// ─────────────────────────────────────────
export function predictNextPeriod(
  cycles: CycleInput[],
  selfReported: SelfReportedRegularity,
  today: Date = new Date(),
): PredictionResult | null {
  // Need at least 2 start dates to get 1 cycle length
  if (cycles.length < 2) return null;

  // Sort oldest → newest
  const sorted = [...cycles].sort(
    (a, b) => a.startDate.getTime() - b.startDate.getTime(),
  );

  // Derive cycle lengths from consecutive start dates
  const derivedCycles = deriveCycleLengths(sorted);

  // Remove outliers — keeps PCOS long cycles but
  // removes obvious logging errors
  const validCycles = derivedCycles.filter((c) => c.length >= 15 && c.length <= 180);

  if (validCycles.length === 0) return null;

  const lastPeriodStart = sorted[sorted.length - 1].startDate;
  const lengths = validCycles.map((c) => c.length);
  const confidenceFlags = validCycles.map((c) => c.confidence);

  // Core calculations
  const weightedAvg = calcWeightedAverage(lengths, confidenceFlags);
  const stdDev = calcStdDev(lengths, weightedAvg);
  const variability = getVariabilityTier(stdDev, validCycles.length, selfReported);
  const honestWindow = calcHonestWindow(variability, validCycles.length);
  const windowDays = Math.min(honestWindow, 10);
  const wasCapApplied = honestWindow > 10;

  // Most likely date — weighted average from last period start
  const mostLikelyDate = addDays(lastPeriodStart, Math.round(weightedAvg));

  // Asymmetric split — 40% before, 60% after
  const before = Math.floor(windowDays * 0.4);
  const after = Math.ceil(windowDays * 0.6);

  const windowStart = addDays(mostLikelyDate, -before);
  const windowEnd = addDays(mostLikelyDate, after);

  const confidenceLevel = getConfidenceLevel(
    validCycles.length,
    variability,
    wasCapApplied,
  );

  const confidenceMessage = buildMessage(
    confidenceLevel,
    validCycles.length,
    wasCapApplied,
  );

  const nextUpdateAfter = addDays(windowEnd, 3);
  const isOverdue = today > windowEnd;

  return {
    windowStart,
    windowEnd,
    mostLikelyDate,
    windowDays,
    honestWindowDays: honestWindow,
    confidenceLevel,
    confidenceMessage,
    predictedCycleLength: Math.round(weightedAvg),
    basedOnCycles: validCycles.length,
    wasCapApplied,
    isOverdue,
    nextUpdateAfter,
  };
}

// ─────────────────────────────────────────
// DERIVE CYCLE LENGTHS FROM START DATES
// ─────────────────────────────────────────
function deriveCycleLengths(
  sorted: CycleInput[],
): { length: number; confidence: CycleInput['confidence'] }[] {
  const result: { length: number; confidence: CycleInput['confidence'] }[] = [];

  for (let i = 0; i < sorted.length - 1; i++) {
    const length = daysBetween(sorted[i].startDate, sorted[i + 1].startDate);
    // A cycle is estimated if either boundary date was estimated
    const confidence: CycleInput['confidence'] =
      sorted[i].confidence === 'estimated' || sorted[i + 1].confidence === 'estimated'
        ? 'estimated'
        : 'logged';

    result.push({ length, confidence });
  }

  return result;
}

// ─────────────────────────────────────────
// WEIGHTED AVERAGE
// Recent cycles weighted more heavily.
// Estimated cycles (onboarding) get half weight.
// ─────────────────────────────────────────
function calcWeightedAverage(
  lengths: number[],
  confidenceFlags: CycleInput['confidence'][],
): number {
  const DECAY = 0.8;
  const reversed = [...lengths].reverse();
  const reversedConfidence = [...confidenceFlags].reverse();

  let weightedSum = 0;
  let totalWeight = 0;

  reversed.forEach((length, i) => {
    let weight = Math.pow(DECAY, i);
    if (reversedConfidence[i] === 'estimated') weight *= 0.5;
    weightedSum += length * weight;
    totalWeight += weight;
  });

  return weightedSum / totalWeight;
}

// ─────────────────────────────────────────
// STANDARD DEVIATION
// ─────────────────────────────────────────
function calcStdDev(lengths: number[], mean: number): number {
  if (lengths.length < 2) return 0;

  const variance =
    lengths.reduce((sum, l) => sum + Math.pow(l - mean, 2), 0) / (lengths.length - 1);

  return Math.sqrt(variance);
}

// ─────────────────────────────────────────
// VARIABILITY TIER
// SD thresholds map to four tiers.
// Self-report overrides to minimum HIGH
// when data is still sparse.
// ─────────────────────────────────────────
function getVariabilityTier(
  stdDev: number,
  cycleCount: number,
  selfReported: SelfReportedRegularity,
): 'low' | 'medium' | 'high' | 'very_high' {
  let tier: 'low' | 'medium' | 'high' | 'very_high';

  if (stdDev <= 5) tier = 'low';
  else if (stdDev <= 10) tier = 'medium';
  else if (stdDev <= 20) tier = 'high';
  else tier = 'very_high';

  // Override: if user said very irregular and we have
  // fewer than 4 real data points, trust their self-report
  if (
    selfReported === 'very_irregular' &&
    cycleCount < 4 &&
    (tier === 'low' || tier === 'medium')
  ) {
    tier = 'high';
  }

  return tier;
}

// ─────────────────────────────────────────
// HONEST WINDOW (before 10-day cap)
// Base window from variability +
// uncertainty buffer from data quantity
// ─────────────────────────────────────────
function calcHonestWindow(
  variability: 'low' | 'medium' | 'high' | 'very_high',
  cycleCount: number,
): number {
  const baseWindow = {
    low: 6,
    medium: 9,
    high: 14,
    very_high: 20,
  }[variability];

  const buffer =
    cycleCount === 1
      ? 10
      : cycleCount === 2
        ? 7
        : cycleCount === 3
          ? 5
          : cycleCount === 4
            ? 3
            : cycleCount === 5
              ? 1
              : 0;

  return baseWindow + buffer;
}

// ─────────────────────────────────────────
// CONFIDENCE LEVEL
// ─────────────────────────────────────────
function getConfidenceLevel(
  cycleCount: number,
  variability: 'low' | 'medium' | 'high' | 'very_high',
  wasCapApplied: boolean,
): ConfidenceLevel {
  if (cycleCount <= 2) return 'very_early';
  if (wasCapApplied) return 'rough';
  if (cycleCount === 3) return 'early';

  if (cycleCount >= 6 && variability === 'low') return 'high';
  if (cycleCount >= 4 && variability !== 'very_high') return 'good';

  return 'early';
}

// ─────────────────────────────────────────
// CONFIDENCE MESSAGE (shown to user)
// ─────────────────────────────────────────
function buildMessage(
  level: ConfidenceLevel,
  cycleCount: number,
  wasCapApplied: boolean,
): string {
  const messages: Record<ConfidenceLevel, string> = {
    high: `Based on your last ${cycleCount} cycles, which have been quite consistent. This is your most accurate prediction yet.`,

    good: `Based on your last ${cycleCount} cycles. Your pattern is becoming clearer — keep logging to improve accuracy.`,

    early: `Based on the ${cycleCount} cycles you've shared. This will get more accurate as you log more periods.`,

    rough: `Your cycles vary quite a bit, which is completely normal with PCOS. This is our best estimate — each period you log helps us learn your pattern.`,

    very_early: `We only have a little data so far. Log your next period and we'll refine this prediction.`,
  };

  return messages[level];
}

// ─────────────────────────────────────────
// DATE HELPERS
// ─────────────────────────────────────────
function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function daysBetween(a: Date, b: Date): number {
  const msPerDay = 1000 * 60 * 60 * 24;
  return Math.round((b.getTime() - a.getTime()) / msPerDay);
}
