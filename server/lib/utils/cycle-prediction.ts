// lib/cycle-prediction.ts

import {
  CycleInput,
  SelfReportedRegularity,
  ConfidenceLevel,
  PredictionResult,
} from '../types/cycle.types';

// ─────────────────────────────────────────
// EXTENDED INPUT TYPES
// ─────────────────────────────────────────
export interface ExtendedCycleInput extends CycleInput {
  hadSpotting?: boolean; // spotting-only logs shouldn't count as full cycles
  periodDuration?: number; // flow length in days — correlates with cycle length
}

export interface UserProfile {
  age: number;
  // Optional but high-impact if available:
  hasPCOS?: boolean; // PCOS causes long, anovulatory cycles
  hasEndometriosis?: boolean; // shortens luteal phase, affects window
  isPerimenopausal?: boolean; // age-inferred below if not provided
  recentHormoneChange?: boolean; // new BC, stopped BC, postpartum — resets pattern
  bmi?: number; // low BMI (<18.5) → irregular; high BMI → longer cycles
  stressLevel?: 'low' | 'moderate' | 'high'; // cortisol delays ovulation
  sleepQuality?: 'good' | 'fair' | 'poor'; // disrupts LH surge timing
  isAthlete?: boolean; // intense training suppresses ovulation
}

// ─────────────────────────────────────────
// INTERNAL TYPES
// ─────────────────────────────────────────
type VariabilityTier = 'low' | 'medium' | 'high' | 'very_high';

interface DerivedCycle {
  length: number;
  confidence: CycleInput['confidence'];
}

interface WeightedStats {
  mean: number;
  stdDev: number;
  recentMean: number; // mean of last 3 cycles — catches recent shifts
  trend: number; // positive = cycles lengthening, negative = shortening
}

// ─────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────
const MIN_PHYSIOLOGICAL_CYCLE = 15; // below this = likely logging error
const MAX_PHYSIOLOGICAL_CYCLE = 180; // above this = likely logging error or amenorrhea
const DECAY_RATE = 0.78; // how much each older cycle is down-weighted
const MAX_WINDOW_CAP = 10; // UI cap on displayed window
const TREND_LOOKBACK = 4; // cycles used to calculate drift

// Age-based adjustments derived from TREMIN Trust / SWAN study data
// Mean cycle length shifts with age, and variability increases peri-menopause
const AGE_PROFILE: Record<string, { meanShift: number; variabilityMultiplier: number }> =
  {
    under_20: { meanShift: +1.5, variabilityMultiplier: 1.4 }, // cycles still establishing
    '20_29': { meanShift: 0, variabilityMultiplier: 1.0 }, // baseline
    '30_39': { meanShift: -0.5, variabilityMultiplier: 1.05 },
    '40_44': { meanShift: -1.0, variabilityMultiplier: 1.3 },
    '45_plus': { meanShift: -1.5, variabilityMultiplier: 1.7 }, // perimenopause onset
  };

// ─────────────────────────────────────────
// PUBLIC ENTRY POINT
// ─────────────────────────────────────────
export function predictNextPeriod(
  cycles: ExtendedCycleInput[],
  selfReported: SelfReportedRegularity,
  profile: UserProfile,
  today: Date = new Date(),
): PredictionResult | null {
  if (cycles.length < 2) return null;

  const sorted = [...cycles]
    .filter((c) => !c.hadSpotting) // exclude spotting-only entries
    .sort((a, b) => a.startDate.getTime() - b.startDate.getTime());

  if (sorted.length < 2) return null;

  const derivedCycles = deriveCycleLengths(sorted);
  const validCycles = derivedCycles.filter(
    (c) => c.length >= MIN_PHYSIOLOGICAL_CYCLE && c.length <= MAX_PHYSIOLOGICAL_CYCLE,
  );

  if (validCycles.length === 0) return null;

  const lastPeriodStart = sorted[sorted.length - 1].startDate;
  const lengths = validCycles.map((c) => c.length);
  const confidenceFlags = validCycles.map((c) => c.confidence);

  // ── Core stats ──
  const stats = calcWeightedStats(lengths, confidenceFlags);

  // ── Age profile ──
  const ageProfile = getAgeProfile(profile.age);

  // ── Apply clinical adjustments to mean ──
  const adjustedMean = applyMeanAdjustments(stats.mean, stats.trend, profile, ageProfile);

  // ── Variability (SD-based, but age and conditions inflate it) ──
  const adjustedStdDev = applyVariabilityAdjustments(
    stats.stdDev,
    profile,
    ageProfile,
    validCycles.length,
  );

  // ── Variability tier ──
  const variability = getVariabilityTier(
    adjustedStdDev,
    validCycles.length,
    selfReported,
  );

  // ── Window size ──
  const { windowDays, honestWindowDays, wasCapApplied } = calcWindow(
    variability,
    validCycles.length,
    adjustedStdDev,
    profile,
  );

  // ── Most likely date ──
  const mostLikelyDate = addDays(lastPeriodStart, Math.round(adjustedMean));

  // ── Asymmetric split (delayed ovulation more common than early) ──
  // Periods are more often late than early, so bias window slightly forward
  const before = Math.floor(windowDays * 0.38);
  const after = Math.ceil(windowDays * 0.62);

  const windowStart = addDays(mostLikelyDate, -before);
  const windowEnd = addDays(mostLikelyDate, after);

  // ── Confidence ──
  const confidenceLevel = getConfidenceLevel(
    validCycles.length,
    variability,
    wasCapApplied,
    profile,
  );
  const confidenceMessage = buildMessage(
    confidenceLevel,
    validCycles.length,
    wasCapApplied,
    profile,
    stats,
  );

  const nextUpdateAfter = addDays(windowEnd, 3);
  const isOverdue = today > windowEnd;

  return {
    windowStart,
    windowEnd,
    mostLikelyDate,
    windowDays,
    honestWindowDays,
    confidenceLevel,
    confidenceMessage,
    predictedCycleLength: Math.round(adjustedMean),
    basedOnCycles: validCycles.length,
    wasCapApplied,
    isOverdue,
    nextUpdateAfter,
  };
}

// ─────────────────────────────────────────
// DERIVE CYCLE LENGTHS
// ─────────────────────────────────────────
function deriveCycleLengths(sorted: ExtendedCycleInput[]): DerivedCycle[] {
  const result: DerivedCycle[] = [];
  for (let i = 0; i < sorted.length - 1; i++) {
    const length = daysBetween(sorted[i].startDate, sorted[i + 1].startDate);
    const confidence: CycleInput['confidence'] =
      sorted[i].confidence === 'estimated' || sorted[i + 1].confidence === 'estimated'
        ? 'estimated'
        : 'logged';
    result.push({ length, confidence });
  }
  return result;
}

// ─────────────────────────────────────────
// WEIGHTED STATS — mean, stddev, trend
// ─────────────────────────────────────────
function calcWeightedStats(
  lengths: number[],
  confidenceFlags: CycleInput['confidence'][],
): WeightedStats {
  const reversed = [...lengths].reverse();
  const reversedConf = [...confidenceFlags].reverse();

  let weightedSum = 0;
  let totalWeight = 0;

  reversed.forEach((length, i) => {
    let weight = Math.pow(DECAY_RATE, i);
    if (reversedConf[i] === 'estimated') weight *= 0.5;
    weightedSum += length * weight;
    totalWeight += weight;
  });

  const mean = weightedSum / totalWeight;

  // StdDev uses all valid cycles (unweighted — we want true variability)
  const stdDev = calcStdDev(lengths, mean);

  // Recent mean: simple average of last 3 (or fewer)
  const recent = lengths.slice(-3);
  const recentMean = recent.reduce((s, v) => s + v, 0) / recent.length;

  // Trend: slope over last TREND_LOOKBACK cycles using linear regression
  const trend = calcTrend(lengths.slice(-TREND_LOOKBACK));

  return { mean, stdDev, recentMean, trend };
}

// ─────────────────────────────────────────
// LINEAR TREND (days/cycle)
// +2 means cycles are getting 2 days longer each cycle
// ─────────────────────────────────────────
function calcTrend(lengths: number[]): number {
  if (lengths.length < 3) return 0;
  const n = lengths.length;
  const xMean = (n - 1) / 2;
  const yMean = lengths.reduce((s, v) => s + v, 0) / n;

  let num = 0;
  let den = 0;
  lengths.forEach((y, x) => {
    num += (x - xMean) * (y - yMean);
    den += (x - xMean) ** 2;
  });

  return den === 0 ? 0 : num / den;
}

// ─────────────────────────────────────────
// MEAN ADJUSTMENTS
// Applies trend drift + clinical profile shifts
// ─────────────────────────────────────────
function applyMeanAdjustments(
  rawMean: number,
  trend: number,
  profile: UserProfile,
  ageProfile: (typeof AGE_PROFILE)[string],
): number {
  let adjusted = rawMean;

  // Project one cycle forward using trend (capped to avoid runaway)
  const trendAdjustment = Math.max(-3, Math.min(3, trend));
  adjusted += trendAdjustment;

  // Age-based mean shift
  adjusted += ageProfile.meanShift;

  // PCOS: cycles are often anovulatory and run 35–90 days
  // If raw mean is already in that range we don't double-shift;
  // if mean looks "normal" but PCOS is flagged, nudge upward slightly
  if (profile.hasPCOS && rawMean < 35) {
    adjusted += 3;
  }

  // Recent hormonal change (new/stopped BC, postpartum):
  // trust recent 3-cycle mean more than long-run weighted mean
  if (profile.recentHormoneChange) {
    // Blend 70% recent mean, 30% long-run — but we don't have recentMean here
    // so we just dampen the age/condition shifts
    adjusted = rawMean + trendAdjustment * 0.5;
  }

  // Stress delays ovulation → longer cycles
  if (profile.stressLevel === 'high') adjusted += 2;
  else if (profile.stressLevel === 'moderate') adjusted += 0.5;

  // Poor sleep disrupts LH surge → modest delay
  if (profile.sleepQuality === 'poor') adjusted += 1;
  else if (profile.sleepQuality === 'fair') adjusted += 0.5;

  // Athlete amenorrhea risk: if cycles are already short, don't shorten further
  if (profile.isAthlete && adjusted > 28) adjusted += 1.5;

  // Low BMI → delayed ovulation
  if (profile.bmi !== undefined && profile.bmi < 18.5) adjusted += 2;
  // High BMI → insulin resistance → longer cycles (similar to PCOS pathway)
  if (profile.bmi !== undefined && profile.bmi > 30 && !profile.hasPCOS) adjusted += 1;

  // Hard physiological floor/ceiling
  return Math.max(15, Math.min(120, adjusted));
}

// ─────────────────────────────────────────
// VARIABILITY ADJUSTMENTS
// Clinical and lifestyle factors inflate SD
// ─────────────────────────────────────────
function applyVariabilityAdjustments(
  rawStdDev: number,
  profile: UserProfile,
  ageProfile: (typeof AGE_PROFILE)[string],
  cycleCount: number,
): number {
  let sd = rawStdDev;

  // Age multiplier (perimenopause is very noisy)
  sd *= ageProfile.variabilityMultiplier;

  // PCOS inherently chaotic
  if (profile.hasPCOS) sd = Math.max(sd, 10) * 1.3;

  // Endometriosis → less variable in length but window tighter for pain prediction
  if (profile.hasEndometriosis) sd *= 0.9;

  // Recent hormonal change: past cycles are noise, inflate uncertainty
  if (profile.recentHormoneChange) sd *= 1.5;

  // Very few cycles → we don't know the true SD yet, inflate
  if (cycleCount <= 3) sd = Math.max(sd, 5) * 1.2;

  // Stress and sleep inflate cycle-to-cycle noise
  if (profile.stressLevel === 'high') sd *= 1.2;
  if (profile.sleepQuality === 'poor') sd *= 1.1;

  if (profile.isAthlete) sd *= 1.15;

  return sd;
}

// ─────────────────────────────────────────
// AGE PROFILE LOOKUP
// ─────────────────────────────────────────
function getAgeProfile(age: number): (typeof AGE_PROFILE)[string] {
  if (age < 20) return AGE_PROFILE['under_20'];
  if (age < 30) return AGE_PROFILE['20_29'];
  if (age < 40) return AGE_PROFILE['30_39'];
  if (age < 45) return AGE_PROFILE['40_44'];
  return AGE_PROFILE['45_plus'];
}

// ─────────────────────────────────────────
// VARIABILITY TIER
// ─────────────────────────────────────────
function getVariabilityTier(
  stdDev: number,
  cycleCount: number,
  selfReported: SelfReportedRegularity,
): VariabilityTier {
  let tier: VariabilityTier;
  if (stdDev <= 4) tier = 'low';
  else if (stdDev <= 8) tier = 'medium';
  else if (stdDev <= 16) tier = 'high';
  else tier = 'very_high';

  if (selfReported === 'very_irregular' && cycleCount < 4 && tier !== 'very_high') {
    tier = tier === 'low' || tier === 'medium' ? 'high' : tier;
  }
  return tier;
}

// ─────────────────────────────────────────
// WINDOW CALCULATION
// SD-informed rather than tier-lookup only
// ─────────────────────────────────────────
function calcWindow(
  variability: VariabilityTier,
  cycleCount: number,
  adjustedStdDev: number,
  profile: UserProfile,
): { windowDays: number; honestWindowDays: number; wasCapApplied: boolean } {
  // 1.5 SD covers ~87% of normally distributed cycles
  // For irregular cycles we widen to 1.8 SD
  const sdMultiplier = variability === 'very_high' ? 1.8 : 1.5;
  let sdWindow = Math.round(sdMultiplier * adjustedStdDev);

  // Minimum meaningful window
  const minByTier = { low: 4, medium: 6, high: 8, very_high: 10 }[variability];
  sdWindow = Math.max(sdWindow, minByTier);

  // Data-quantity uncertainty buffer (shrinks as cycles accumulate)
  const dataBuffer =
    cycleCount <= 2
      ? 8
      : cycleCount === 3
        ? 5
        : cycleCount === 4
          ? 3
          : cycleCount === 5
            ? 1
            : 0;

  // Clinical floor: recent hormonal change means past data is unreliable
  const clinicalFloor = profile.recentHormoneChange
    ? 10
    : profile.hasPCOS
      ? 8
      : profile.isPerimenopausal || profile.age >= 45
        ? 7
        : 0;

  const honestWindowDays = Math.max(sdWindow + dataBuffer, clinicalFloor);
  const wasCapApplied = honestWindowDays > MAX_WINDOW_CAP;
  const windowDays = Math.min(honestWindowDays, MAX_WINDOW_CAP);

  return { windowDays, honestWindowDays, wasCapApplied };
}

// ─────────────────────────────────────────
// CONFIDENCE LEVEL
// ─────────────────────────────────────────
function getConfidenceLevel(
  cycleCount: number,
  variability: VariabilityTier,
  wasCapApplied: boolean,
  profile: UserProfile,
): ConfidenceLevel {
  if (cycleCount <= 2) return 'very_early';
  if (profile.recentHormoneChange) return 'rough';
  if (wasCapApplied) return 'rough';
  if (cycleCount === 3) return 'early';
  if (cycleCount >= 8 && variability === 'low' && !profile.hasPCOS) return 'high';
  if (cycleCount >= 5 && variability !== 'very_high') return 'good';
  return 'early';
}

// ─────────────────────────────────────────
// CONFIDENCE MESSAGE
// ─────────────────────────────────────────
function buildMessage(
  level: ConfidenceLevel,
  cycleCount: number,
  wasCapApplied: boolean,
  profile: UserProfile,
  stats: WeightedStats,
): string {
  const trendNote =
    Math.abs(stats.trend) >= 1.5
      ? ` Your cycles have been ${stats.trend > 0 ? 'getting longer' : 'getting shorter'} recently — this has been factored in.`
      : '';

  const pcosNote = profile.hasPCOS
    ? ' PCOS-related variability has been accounted for.'
    : '';

  const ageNote =
    profile.age >= 45
      ? ' Perimenopausal cycle shifts have been factored into this estimate.'
      : profile.age < 20
        ? ' Cycles often take a few years to fully regulate in your teens.'
        : '';

  const base: Record<ConfidenceLevel, string> = {
    high: `Based on your last ${cycleCount} cycles, which have been highly consistent. This is your most reliable prediction yet.`,
    good: `Based on your last ${cycleCount} cycles. Your pattern is becoming clearer — each logged period improves accuracy.`,
    early: `Based on ${cycleCount} cycles so far. This will sharpen as you log more periods.`,
    rough: profile.recentHormoneChange
      ? `Your recent hormonal change means past cycle data is less reliable. This estimate will improve over the next 2–3 cycles as your body settles.`
      : `Your cycles vary significantly, which is completely normal. This is our best estimate — each period you log helps refine it.`,
    very_early: `We only have a little data so far. Log your next period and we'll refine this prediction considerably.`,
  };

  return base[level] + trendNote + pcosNote + ageNote;
}

// ─────────────────────────────────────────
// MATH HELPERS
// ─────────────────────────────────────────
function calcStdDev(lengths: number[], mean: number): number {
  if (lengths.length < 2) return 0;
  const variance =
    lengths.reduce((sum, l) => sum + Math.pow(l - mean, 2), 0) / (lengths.length - 1);
  return Math.sqrt(variance);
}

function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function daysBetween(a: Date, b: Date): number {
  return Math.round((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24));
}
