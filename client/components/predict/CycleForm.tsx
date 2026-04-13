// components/CycleForm.tsx
'use client';

import { useState } from 'react';
import {
  Plus,
  Trash2,
  CalendarDays,
  Sparkles,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Clock,
  RefreshCw,
  ChevronRight,
  ChevronLeft,
  User,
  Activity,
  Moon,
} from 'lucide-react';

// ─── Types ───────────────────────────────────────────────────────────────────

type CycleType = 'very_irregular' | 'somewhat_irregular' | 'fairly_regular';
type StressLevel = 'low' | 'moderate' | 'high';
type SleepQuality = 'good' | 'fair' | 'poor';

interface UserProfile {
  age: string;
  hasPCOS: boolean | null;
  hasEndometriosis: boolean | null;
  isPerimenopausal: boolean | null;
  recentHormoneChange: boolean | null;
  bmi: string;
  stressLevel: StressLevel | null;
  sleepQuality: SleepQuality | null;
  isAthlete: boolean | null;
}

interface PredictionData {
  predictedCycleLength: number;
  windowStart: string;
  windowEnd: string;
  windowDays: number;
  confidenceLevel: 'high' | 'good' | 'early' | 'rough' | 'very_early';
  confidenceMessage: string;
  isOverdue: boolean;
  nextUpdateAfter: string;
  wasCapApplied: boolean;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const CYCLE_OPTIONS: { value: CycleType; label: string; desc: string }[] = [
  { value: 'fairly_regular', label: 'Fairly Regular', desc: 'Varies by ±2 days' },
  { value: 'somewhat_irregular', label: 'Somewhat Irregular', desc: 'Varies by ±5 days' },
  { value: 'very_irregular', label: 'Very Irregular', desc: 'Varies by a week+' },
];

const CONFIDENCE_CONFIG = {
  high: {
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    icon: CheckCircle2,
    label: 'High Confidence',
  },
  good: {
    color: 'text-violet-600',
    bg: 'bg-violet-50',
    border: 'border-violet-200',
    icon: TrendingUp,
    label: 'Good Confidence',
  },
  early: {
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    icon: TrendingUp,
    label: 'Early Estimate',
  },
  rough: {
    color: 'text-rose-500',
    bg: 'bg-rose-50',
    border: 'border-rose-200',
    icon: AlertCircle,
    label: 'Rough Estimate',
  },
  very_early: {
    color: 'text-slate-500',
    bg: 'bg-slate-50',
    border: 'border-slate-200',
    icon: AlertCircle,
    label: 'Very Early',
  },
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3 text-xs font-semibold tracking-widest text-slate-400 uppercase">
      {children}
    </p>
  );
}

function SkipNote() {
  return (
    <p className="mt-1 text-xs text-slate-400">
      Not sure? Skip — our algorithm works without this.
    </p>
  );
}

type TriState = boolean | null;

function TriToggle({
  label,
  desc,
  value,
  onChange,
}: {
  label: string;
  desc?: string;
  value: TriState;
  onChange: (v: TriState) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-slate-100 py-3 last:border-0">
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-slate-700">{label}</p>
        {desc && <p className="mt-0.5 text-xs leading-relaxed text-slate-400">{desc}</p>}
      </div>
      <div className="flex flex-shrink-0 gap-1.5">
        {([true, false, null] as TriState[]).map((opt) => {
          const active = value === opt;
          const lbl = opt === true ? 'Yes' : opt === false ? 'No' : 'Skip';
          return (
            <button
              key={String(opt)}
              onClick={() => onChange(opt)}
              className={`rounded-lg border px-2.5 py-1 text-xs font-medium transition-all duration-150 ${
                active
                  ? opt === null
                    ? 'border-slate-300 bg-slate-100 text-slate-600'
                    : 'border-violet-300 bg-violet-100 text-violet-700'
                  : 'border-slate-200 bg-white text-slate-400 hover:border-slate-300'
              }`}
            >
              {lbl}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function PredictionCard({ data }: { data: PredictionData }) {
  const conf = CONFIDENCE_CONFIG[data.confidenceLevel] ?? CONFIDENCE_CONFIG.early;
  const ConfIcon = conf.icon;

  return (
    <div className="mt-6 overflow-hidden rounded-2xl border border-violet-100 bg-gradient-to-br from-violet-50 to-fuchsia-50">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-violet-100 px-5 py-4">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-100">
            <Sparkles size={13} className="text-violet-600" />
          </div>
          <span className="text-sm font-semibold text-violet-900">Prediction Result</span>
        </div>
        {data.isOverdue && (
          <span className="rounded-full border border-rose-200 bg-rose-100 px-2.5 py-0.5 text-xs font-medium text-rose-600">
            Overdue
          </span>
        )}
      </div>

      {/* Window */}
      <div className="px-5 py-5">
        <p className="mb-1 text-xs font-medium tracking-widest text-violet-400 uppercase">
          Expected Window
        </p>
        <div className="mb-1 flex flex-wrap items-end gap-2">
          <span className="text-xl font-bold tracking-tight text-violet-900">
            {formatDate(data.windowStart)}
          </span>
          <span className="mb-0.5 text-sm text-violet-400">→</span>
          <span className="text-xl font-bold tracking-tight text-violet-900">
            {formatDate(data.windowEnd)}
          </span>
        </div>
        <p className="text-xs text-violet-500">{data.windowDays}-day window</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-px border-t border-violet-100 bg-violet-100">
        <div className="bg-white/70 px-5 py-4">
          <p className="mb-1 text-xs tracking-wider text-slate-400 uppercase">
            Cycle Length
          </p>
          <p className="text-xl font-bold text-slate-800">
            {data.predictedCycleLength}
            <span className="ml-1 text-sm font-normal text-slate-400">days</span>
          </p>
        </div>
        <div className="bg-white/70 px-5 py-4">
          <p className="mb-1 text-xs tracking-wider text-slate-400 uppercase">
            Confidence
          </p>
          <div
            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${conf.bg} ${conf.color} ${conf.border}`}
          >
            <ConfIcon size={11} />
            {conf.label}
          </div>
        </div>
      </div>

      {/* Message */}
      <div
        className={`mx-4 my-4 rounded-xl border px-4 py-3 text-xs leading-relaxed ${conf.bg} ${conf.border} ${conf.color}`}
      >
        {data.confidenceMessage}
      </div>

      {/* Footer */}
      <div className="flex flex-col gap-2 px-5 pb-5">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Clock size={11} />
          Next update after{' '}
          <span className="font-medium text-slate-600">
            {formatDate(data.nextUpdateAfter)}
          </span>
        </div>
        {data.wasCapApplied && (
          <div className="flex items-center gap-2 text-xs text-amber-500">
            <RefreshCw size={11} />A statistical cap was applied to improve accuracy
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main Form ───────────────────────────────────────────────────────────────

const STEPS = ['dates', 'pattern', 'profile', 'lifestyle'] as const;
type Step = (typeof STEPS)[number];

const STEP_META: Record<Step, { label: string; icon: React.ElementType }> = {
  dates: { label: 'Dates', icon: CalendarDays },
  pattern: { label: 'Pattern', icon: TrendingUp },
  profile: { label: 'Profile', icon: User },
  lifestyle: { label: 'Lifestyle', icon: Activity },
};

export default function CycleForm() {
  const [step, setStep] = useState<Step>('dates');
  const [dates, setDates] = useState<string[]>(['', '', '']);
  const [cycleType, setCycleType] = useState<CycleType>('fairly_regular');
  const [profile, setProfile] = useState<UserProfile>({
    age: '',
    hasPCOS: null,
    hasEndometriosis: null,
    isPerimenopausal: null,
    recentHormoneChange: null,
    bmi: '',
    stressLevel: null,
    sleepQuality: null,
    isAthlete: null,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState<PredictionData | null>(null);

  const stepIndex = STEPS.indexOf(step);
  const filledDates = dates.filter(Boolean).length;
  const progressPct = ((stepIndex + 1) / STEPS.length) * 100;

  // ── Date handlers ──
  const handleDateChange = (i: number, v: string) => {
    const next = [...dates];
    next[i] = v;
    setDates(next);
    if (error) setError('');
  };
  const addDate = () => setDates([...dates, '']);
  const removeDate = (i: number) => {
    if (dates.length <= 3) return;
    setDates(dates.filter((_, idx) => idx !== i));
  };

  // ── Profile handler ──
  function setProfileField<K extends keyof UserProfile>(key: K, val: UserProfile[K]) {
    setProfile((p) => ({ ...p, [key]: val }));
  }

  // ── Navigation ──
  const canAdvanceFromDates = filledDates >= 3;

  const goNext = () => {
    if (step === 'dates' && !canAdvanceFromDates) {
      setError('Please enter at least 3 cycle start dates.');
      return;
    }
    if (
      step === 'profile' &&
      profile.age &&
      (Number(profile.age) < 8 || Number(profile.age) > 65)
    ) {
      setError('Please enter a valid age between 8 and 65.');
      return;
    }
    setError('');
    const next = STEPS[stepIndex + 1];
    if (next) setStep(next);
  };

  const goBack = () => {
    const prev = STEPS[stepIndex - 1];
    if (prev) setStep(prev);
  };

  // ── Submit ──
  const handleSubmit = async () => {
    if (!profile.age) {
      setError('Age is required for an accurate prediction.');
      return;
    }
    setError('');
    setLoading(true);
    setPrediction(null);

    try {
      const payload = {
        dates: dates.filter(Boolean),
        cycleType,
        today: new Date().toISOString().split('T')[0],
        profile: {
          age: Number(profile.age),
          hasPCOS: profile.hasPCOS,
          hasEndometriosis: profile.hasEndometriosis,
          isPerimenopausal: profile.isPerimenopausal,
          recentHormoneChange: profile.recentHormoneChange,
          bmi: profile.bmi ? Number(profile.bmi) : undefined,
          stressLevel: profile.stressLevel,
          sleepQuality: profile.sleepQuality,
          isAthlete: profile.isAthlete,
        },
      };

      const res = await fetch('http://localhost:8000/api/v1/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = await res.json();

      if (json.success) {
        setPrediction(json.data);
      } else {
        setError(json.message || 'Prediction failed. Please try again.');
      }
    } catch {
      setError('Failed to reach the server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // ─── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="flex min-h-screen items-start justify-center bg-gradient-to-br from-slate-50 via-violet-50/30 to-fuchsia-50/40 p-4 pt-10">
      <div className="w-full max-w-md">
        {/* Title */}
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-600 shadow-lg shadow-violet-200">
            <CalendarDays size={22} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Period Tracker
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Smart cycle prediction, personalised to you
          </p>
        </div>

        {/* Card */}
        <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-xl shadow-slate-200/60">
          {/* Step indicator */}
          <div className="border-b border-slate-100 px-6 pt-5 pb-4">
            <div className="mb-3 flex items-center justify-between">
              {STEPS.map((s, i) => {
                const Icon = STEP_META[s].icon;
                const done = i < stepIndex;
                const active = s === step;
                return (
                  <div key={s} className="flex items-center gap-1.5">
                    <div
                      className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold transition-all duration-200 ${
                        active
                          ? 'bg-violet-600 text-white shadow-md shadow-violet-200'
                          : done
                            ? 'bg-emerald-100 text-emerald-600'
                            : 'bg-slate-100 text-slate-400'
                      }`}
                    >
                      {done ? <CheckCircle2 size={13} /> : <Icon size={13} />}
                    </div>
                    <span
                      className={`hidden text-xs transition-colors sm:block ${active ? 'font-medium text-violet-700' : done ? 'text-emerald-600' : 'text-slate-400'}`}
                    >
                      {STEP_META[s].label}
                    </span>
                    {i < STEPS.length - 1 && (
                      <div
                        className={`mx-1 h-px w-6 transition-colors ${i < stepIndex ? 'bg-emerald-300' : 'bg-slate-200'}`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
            {/* Progress bar */}
            <div className="h-1 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full transition-all duration-500 ease-out"
                style={{
                  width: `${progressPct}%`,
                  background: 'linear-gradient(90deg, #7c3aed, #a855f7)',
                }}
              />
            </div>
          </div>

          {/* Step content */}
          <div className="px-6 py-6">
            {/* ── STEP 1: Dates ── */}
            {step === 'dates' && (
              <div>
                <SectionLabel>Cycle Start Dates</SectionLabel>
                <p className="mb-4 text-xs leading-relaxed text-slate-400">
                  Enter the first day of each of your last periods. At least 3 dates
                  required.
                </p>
                <div className="mb-3 flex flex-col gap-2.5">
                  {dates.map((date, i) => (
                    <div key={i} className="flex items-center gap-2.5">
                      <span
                        className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border text-[10px] font-semibold transition-all duration-200 ${date ? 'border-emerald-200 bg-emerald-50 text-emerald-600' : 'border-slate-200 bg-slate-50 text-slate-400'}`}
                      >
                        {i + 1}
                      </span>
                      <input
                        type="date"
                        value={date}
                        onChange={(e) => handleDateChange(i, e.target.value)}
                        className={`h-10 flex-1 cursor-pointer rounded-xl border bg-slate-50 px-3 text-sm text-slate-800 transition-all duration-200 outline-none focus:border-violet-400 focus:bg-white focus:ring-2 focus:ring-violet-100 ${date ? 'border-emerald-300 bg-emerald-50/30' : 'border-slate-200'}`}
                      />
                      <button
                        onClick={() => removeDate(i)}
                        disabled={dates.length <= 3}
                        className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border transition-all duration-150 ${
                          dates.length <= 3
                            ? 'cursor-not-allowed border-slate-100 text-slate-300 opacity-40'
                            : 'border-slate-200 text-rose-400 hover:border-rose-200 hover:bg-rose-50'
                        }`}
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  onClick={addDate}
                  className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-violet-600 transition-colors hover:bg-violet-50"
                >
                  <Plus size={13} /> Add another date
                </button>
              </div>
            )}

            {/* ── STEP 2: Pattern ── */}
            {step === 'pattern' && (
              <div>
                <SectionLabel>Cycle Pattern</SectionLabel>
                <p className="mb-4 text-xs leading-relaxed text-slate-400">
                  How regular is your cycle in general? This helps calibrate the
                  prediction window.
                </p>
                <div className="flex flex-col gap-2">
                  {CYCLE_OPTIONS.map((opt) => {
                    const active = cycleType === opt.value;
                    return (
                      <button
                        key={opt.value}
                        onClick={() => setCycleType(opt.value)}
                        className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all duration-200 ${active ? 'border-violet-300 bg-violet-50' : 'border-slate-200 bg-slate-50 hover:border-slate-300 hover:bg-white'}`}
                      >
                        <span
                          className={`flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full border-2 transition-all ${active ? 'border-violet-500' : 'border-slate-300'}`}
                        >
                          {active && (
                            <span className="block h-2 w-2 rounded-full bg-violet-500" />
                          )}
                        </span>
                        <span className="flex-1">
                          <span
                            className={`block text-sm font-medium ${active ? 'text-violet-700' : 'text-slate-700'}`}
                          >
                            {opt.label}
                          </span>
                          <span
                            className={`mt-0.5 block text-xs ${active ? 'text-violet-500' : 'text-slate-400'}`}
                          >
                            {opt.desc}
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ── STEP 3: Profile ── */}
            {step === 'profile' && (
              <div>
                <SectionLabel>About You</SectionLabel>
                <p className="mb-4 text-xs leading-relaxed text-slate-400">
                  Age is the only required field. Everything else is optional but improves
                  accuracy.
                </p>

                {/* Age — required */}
                <div className="mb-4">
                  <label className="mb-1.5 block text-xs font-medium text-slate-600">
                    Age <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="number"
                    min={8}
                    max={65}
                    placeholder="e.g. 27"
                    value={profile.age}
                    onChange={(e) => setProfileField('age', e.target.value)}
                    className="h-10 w-28 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-800 transition-all outline-none focus:border-violet-400 focus:bg-white focus:ring-2 focus:ring-violet-100"
                  />
                </div>

                {/* BMI — optional */}
                <div className="mb-5">
                  <label className="mb-1.5 block text-xs font-medium text-slate-600">
                    BMI <span className="font-normal text-slate-400">(optional)</span>
                  </label>
                  <input
                    type="number"
                    min={10}
                    max={60}
                    step={0.1}
                    placeholder="e.g. 22.5"
                    value={profile.bmi}
                    onChange={(e) => setProfileField('bmi', e.target.value)}
                    className="h-10 w-28 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-800 transition-all outline-none focus:border-violet-400 focus:bg-white focus:ring-2 focus:ring-violet-100"
                  />
                  <SkipNote />
                </div>

                {/* Conditions */}
                <div className="mb-2 overflow-hidden rounded-xl border border-slate-200">
                  <div className="border-b border-slate-200 bg-slate-50 px-4 py-2.5">
                    <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
                      Health Conditions
                    </p>
                  </div>
                  <div className="divide-y divide-slate-100 px-4">
                    <TriToggle
                      label="PCOS"
                      desc="Polycystic ovary syndrome — can cause longer, irregular cycles"
                      value={profile.hasPCOS}
                      onChange={(v) => setProfileField('hasPCOS', v)}
                    />
                    <TriToggle
                      label="Endometriosis"
                      desc="Can affect cycle regularity and luteal phase"
                      value={profile.hasEndometriosis}
                      onChange={(v) => setProfileField('hasEndometriosis', v)}
                    />
                    <TriToggle
                      label="Perimenopause"
                      desc="Transition phase before menopause — cycles become unpredictable"
                      value={profile.isPerimenopausal}
                      onChange={(v) => setProfileField('isPerimenopausal', v)}
                    />
                    <TriToggle
                      label="Recent hormonal change"
                      desc="Started/stopped birth control, postpartum, or similar in last 6 months"
                      value={profile.recentHormoneChange}
                      onChange={(v) => setProfileField('recentHormoneChange', v)}
                    />
                  </div>
                </div>
                <SkipNote />
              </div>
            )}

            {/* ── STEP 4: Lifestyle ── */}
            {step === 'lifestyle' && (
              <div>
                <SectionLabel>Lifestyle Factors</SectionLabel>
                <p className="mb-4 text-xs leading-relaxed text-slate-400">
                  All optional. Stress and sleep affect hormone timing — including these
                  improves window accuracy.
                </p>

                {/* Stress */}
                <div className="mb-5">
                  <p className="mb-2 text-sm font-medium text-slate-700">
                    Current stress level
                  </p>
                  <div className="flex gap-2">
                    {(['low', 'moderate', 'high'] as StressLevel[]).map((s) => (
                      <button
                        key={s}
                        onClick={() =>
                          setProfileField(
                            'stressLevel',
                            profile.stressLevel === s ? null : s,
                          )
                        }
                        className={`flex-1 rounded-xl border py-2 text-xs font-medium capitalize transition-all duration-150 ${
                          profile.stressLevel === s
                            ? s === 'high'
                              ? 'border-rose-300 bg-rose-50 text-rose-600'
                              : s === 'moderate'
                                ? 'border-amber-300 bg-amber-50 text-amber-600'
                                : 'border-emerald-300 bg-emerald-50 text-emerald-600'
                            : 'border-slate-200 bg-slate-50 text-slate-400 hover:border-slate-300'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sleep */}
                <div className="mb-5">
                  <p className="mb-2 text-sm font-medium text-slate-700">Sleep quality</p>
                  <div className="flex gap-2">
                    {(['good', 'fair', 'poor'] as SleepQuality[]).map((s) => (
                      <button
                        key={s}
                        onClick={() =>
                          setProfileField(
                            'sleepQuality',
                            profile.sleepQuality === s ? null : s,
                          )
                        }
                        className={`flex-1 rounded-xl border py-2 text-xs font-medium capitalize transition-all duration-150 ${
                          profile.sleepQuality === s
                            ? s === 'poor'
                              ? 'border-rose-300 bg-rose-50 text-rose-600'
                              : s === 'fair'
                                ? 'border-amber-300 bg-amber-50 text-amber-600'
                                : 'border-emerald-300 bg-emerald-50 text-emerald-600'
                            : 'border-slate-200 bg-slate-50 text-slate-400 hover:border-slate-300'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Athlete */}
                <div className="overflow-hidden rounded-xl border border-slate-200">
                  <div className="px-4">
                    <TriToggle
                      label="Intense athlete / heavy training"
                      desc="High-intensity training suppresses ovulation and can lengthen cycles"
                      value={profile.isAthlete}
                      onChange={(v) => setProfileField('isAthlete', v)}
                    />
                  </div>
                </div>

                <SkipNote />
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-xs leading-relaxed text-rose-600">
                <AlertCircle size={13} className="mt-0.5 flex-shrink-0" />
                {error}
              </div>
            )}

            {/* Navigation */}
            <div className="mt-6 flex gap-2">
              {stepIndex > 0 && (
                <button
                  onClick={goBack}
                  className="flex items-center gap-1.5 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50"
                >
                  <ChevronLeft size={15} /> Back
                </button>
              )}

              {step !== 'lifestyle' ? (
                <button
                  onClick={goNext}
                  className="flex h-11 flex-1 items-center justify-center gap-1.5 rounded-xl text-sm font-semibold text-white transition-all duration-150 active:scale-[0.98]"
                  style={{
                    background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
                    boxShadow: '0 4px 14px rgba(124,58,237,0.3)',
                  }}
                >
                  Continue <ChevronRight size={15} />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="flex h-11 flex-1 items-center justify-center gap-2 rounded-xl text-sm font-semibold text-white transition-all duration-150 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
                  style={{
                    background: loading
                      ? '#a78bfa'
                      : 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
                    boxShadow: loading ? 'none' : '0 4px 14px rgba(124,58,237,0.35)',
                  }}
                >
                  {loading ? (
                    <>
                      <svg
                        className="h-4 w-4 animate-spin"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8z"
                        />
                      </svg>
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Sparkles size={14} /> Predict My Cycle
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Prediction result */}
        {prediction && <PredictionCard data={prediction} />}

        <style>{`
          input[type="date"]::-webkit-calendar-picker-indicator { opacity: 0.35; cursor: pointer; }
          input[type="number"]::-webkit-outer-spin-button,
          input[type="number"]::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
        `}</style>
      </div>
    </div>
  );
}
