'use client';

import {
  useState,
  useCallback,
  useRef,
  useEffect,
  TouchEvent as RTouchEvent,
  MouseEvent as RMouseEvent,
} from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Trash2,
  Sparkles,
  CheckCircle2,
  Activity,
  AlertCircle,
  HelpCircle,
  Heart,
  Waves,
  Zap,
  CalendarDays,
  Shield,
  ArrowRight,
  Minus,
} from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

type Regularity = 'UNKNOWN' | 'VERY_IRREGULAR' | 'SOMEWHAT_IRREGULAR' | 'FAIRLY_REGULAR';

interface CycleEntry {
  id: string;
  startDate: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const REGULARITY_OPTIONS: {
  value: Regularity;
  label: string;
  sublabel: string;
  icon: React.ReactNode;
}[] = [
  {
    value: 'FAIRLY_REGULAR',
    label: 'Fairly regular',
    sublabel: 'Roughly the same each month',
    icon: <Activity size={15} strokeWidth={1.5} />,
  },
  {
    value: 'SOMEWHAT_IRREGULAR',
    label: 'Somewhat irregular',
    sublabel: 'Varies by a week or two',
    icon: <Waves size={15} strokeWidth={1.5} />,
  },
  {
    value: 'VERY_IRREGULAR',
    label: 'Very irregular',
    sublabel: 'Hard to predict at all',
    icon: <Zap size={15} strokeWidth={1.5} />,
  },
  {
    value: 'UNKNOWN',
    label: "I'm not sure",
    sublabel: "I don't usually track it",
    icon: <HelpCircle size={15} strokeWidth={1.5} />,
  },
];

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

// ─── Shared style tokens ──────────────────────────────────────────────────────

const font = {
  display: "'Cormorant', serif" as const,
  body: "'Jost', sans-serif" as const,
};

const c = {
  ink: 'var(--ink)',
  deep: 'var(--deep)',
  violet: 'var(--violet)',
  mid: 'var(--mid)',
  soft: 'var(--soft)',
  mist: 'var(--mist)',
  pale: 'var(--pale)',
  blush: 'var(--blush)',
  parchment: 'var(--parchment)',
  cream: 'var(--cream)',
  rose: 'var(--rose)',
  roseLt: 'var(--rose-lt)',
  rosePale: 'var(--rose-pale)',
  muted: 'var(--muted)',
  borderDark: 'var(--border-dark)',
  borderLight: 'var(--border-light)',
};

// ─── Step Progress ────────────────────────────────────────────────────────────

function StepProgress({ total, current }: { total: number; current: number }) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className="rounded-full transition-all duration-700 ease-out"
          style={{
            height: 3,
            width: i === current ? 32 : i < current ? 12 : 8,
            background: i === current ? c.rose : i < current ? c.roseLt : c.pale,
            opacity: i > current ? 0.5 : 1,
          }}
        />
      ))}
    </div>
  );
}

// ─── Decorative SVG Header ────────────────────────────────────────────────────

function HeaderOrb({ step }: { step: number }) {
  const configs = [
    // Welcome
    {
      bg: `radial-gradient(ellipse at 30% 40%, var(--blush) 0%, var(--pale) 60%, var(--cream) 100%)`,
      shapes: (
        <>
          <circle cx="80%" cy="30%" r="120" fill="var(--pale)" opacity="0.6" />
          <ellipse cx="20%" cy="70%" rx="80" ry="60" fill="var(--mist)" opacity="0.2" />
          <circle cx="60%" cy="80%" r="40" fill="var(--rose-pale)" opacity="0.4" />
          <path
            d="M0,60 Q200,20 400,60 Q600,100 800,60 L800,0 L0,0Z"
            fill="var(--blush)"
            opacity="0.5"
          />
        </>
      ),
    },
    // Cycles
    {
      bg: `radial-gradient(ellipse at 70% 30%, var(--rose-pale) 0%, var(--blush) 50%, var(--cream) 100%)`,
      shapes: (
        <>
          <circle cx="75%" cy="25%" r="100" fill="var(--rose-pale)" opacity="0.5" />
          <circle cx="15%" cy="60%" r="60" fill="var(--pale)" opacity="0.5" />
          <ellipse cx="50%" cy="90%" rx="120" ry="30" fill="var(--mist)" opacity="0.2" />
          <path
            d="M0,50 Q150,10 300,50 Q450,90 600,50 Q750,10 800,50 L800,0 L0,0Z"
            fill="var(--rose-pale)"
            opacity="0.4"
          />
        </>
      ),
    },
    // Age
    {
      bg: `radial-gradient(ellipse at 40% 40%, var(--pale) 0%, var(--blush) 60%, var(--cream) 100%)`,
      shapes: (
        <>
          <circle cx="85%" cy="20%" r="90" fill="var(--mist)" opacity="0.3" />
          <circle cx="10%" cy="75%" r="70" fill="var(--rose-pale)" opacity="0.4" />
          <path
            d="M0,70 Q100,30 250,70 Q400,110 550,70 Q700,30 800,70 L800,0 L0,0Z"
            fill="var(--pale)"
            opacity="0.5"
          />
        </>
      ),
    },
    // Health
    {
      bg: `radial-gradient(ellipse at 60% 50%, var(--blush) 0%, var(--pale) 50%, var(--cream) 100%)`,
      shapes: (
        <>
          <ellipse cx="20%" cy="30%" rx="100" ry="80" fill="var(--mist)" opacity="0.25" />
          <circle cx="80%" cy="70%" r="80" fill="var(--rose-pale)" opacity="0.4" />
          <path
            d="M0,40 Q200,80 400,40 Q600,0 800,40 L800,0 L0,0Z"
            fill="var(--blush)"
            opacity="0.6"
          />
        </>
      ),
    },
    // Regularity
    {
      bg: `radial-gradient(ellipse at 50% 30%, var(--pale) 0%, var(--blush) 60%, var(--cream) 100%)`,
      shapes: (
        <>
          <circle cx="20%" cy="30%" r="80" fill="var(--pale)" opacity="0.6" />
          <circle cx="80%" cy="60%" r="100" fill="var(--rose-pale)" opacity="0.35" />
          <path
            d="M0,55 Q250,15 500,55 Q750,95 800,55 L800,0 L0,0Z"
            fill="var(--mist)"
            opacity="0.2"
          />
        </>
      ),
    },
  ];

  const conf = configs[Math.min(step, configs.length - 1)];

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height: 160, background: conf.bg }}
    >
      <svg
        viewBox="0 0 800 160"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
      >
        {conf.shapes}
      </svg>
      {/* bottom fade */}
      <div
        className="absolute right-0 bottom-0 left-0 h-16"
        style={{
          background: `linear-gradient(to bottom, transparent, var(--cream))`,
        }}
      />
    </div>
  );
}

// ─── Age Drum Picker ──────────────────────────────────────────────────────────

function AgeDrum({
  value,
  onChange,
}: {
  value: number | null;
  onChange: (v: number) => void;
}) {
  const MIN = 13;
  const MAX = 55;
  const ITEM_H = 56; // px per item
  const VISIBLE = 5; // visible rows
  const CENTER = Math.floor(VISIBLE / 2);

  const ages = Array.from({ length: MAX - MIN + 1 }, (_, i) => MIN + i);

  // Index in the `ages` array of the current selection
  const selectedIdx = value !== null ? value - MIN : Math.round((MAX - MIN) / 2);
  const [offset, setOffset] = useState(selectedIdx * ITEM_H);
  const [isDragging, setIsDragging] = useState(false);
  const startY = useRef(0);
  const startOffset = useRef(0);
  const drumRef = useRef<HTMLDivElement>(null);
  const animFrame = useRef<number>(0);

  // Clamp and snap offset to nearest item
  const snapTo = useCallback(
    (raw: number) => {
      const clamped = Math.max(0, Math.min((ages.length - 1) * ITEM_H, raw));
      const snapped = Math.round(clamped / ITEM_H) * ITEM_H;
      return snapped;
    },
    [ages.length],
  );

  const commitOffset = useCallback(
    (o: number) => {
      const snapped = snapTo(o);
      setOffset(snapped);
      const idx = Math.round(snapped / ITEM_H);
      onChange(ages[idx]);
    },
    [snapTo, ages, onChange],
  );

  // Initialise to midpoint if nothing selected
  useEffect(() => {
    if (value === null) {
      const mid = Math.round((ages.length - 1) / 2);
      setOffset(mid * ITEM_H);
      onChange(ages[mid]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Pointer events
  const onPointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    startY.current = e.clientY;
    startOffset.current = offset;
    drumRef.current?.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const delta = startY.current - e.clientY;
    const raw = startOffset.current + delta;
    const clamped = Math.max(0, Math.min((ages.length - 1) * ITEM_H, raw));
    setOffset(clamped);
    const idx = Math.round(clamped / ITEM_H);
    onChange(ages[idx]);
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    const delta = startY.current - e.clientY;
    commitOffset(startOffset.current + delta);
  };

  // Wheel
  const onWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    commitOffset(offset + e.deltaY * 0.6);
  };

  // Keyboard
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') commitOffset(offset + ITEM_H);
    if (e.key === 'ArrowUp') commitOffset(offset - ITEM_H);
  };

  const currentIdx = Math.round(offset / ITEM_H);

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Drum container */}
      <div
        className="relative overflow-hidden rounded-2xl select-none"
        style={{
          width: 180,
          height: VISIBLE * ITEM_H,
          cursor: isDragging ? 'grabbing' : 'grab',
          touchAction: 'none',
        }}
        ref={drumRef}
        tabIndex={0}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onWheel={onWheel}
        onKeyDown={onKeyDown}
      >
        {/* Top fade */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-10"
          style={{
            height: ITEM_H * CENTER,
            background: `linear-gradient(to bottom, var(--cream) 0%, transparent 100%)`,
          }}
        />
        {/* Bottom fade */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10"
          style={{
            height: ITEM_H * CENTER,
            background: `linear-gradient(to top, var(--cream) 0%, transparent 100%)`,
          }}
        />
        {/* Selection band */}
        <div
          className="pointer-events-none absolute inset-x-0 z-0 rounded-xl"
          style={{
            top: CENTER * ITEM_H,
            height: ITEM_H,
            background: 'var(--blush)',
            border: '1px solid var(--mist)',
          }}
        />

        {/* Items */}
        <div
          className="absolute right-0 left-0"
          style={{
            top: CENTER * ITEM_H - offset,
            transition: isDragging ? 'none' : 'top 0.3s cubic-bezier(0.25,1,0.5,1)',
          }}
        >
          {ages.map((age, idx) => {
            const dist = Math.abs(idx - currentIdx);
            const isCenter = idx === currentIdx;
            return (
              <div
                key={age}
                className="flex items-center justify-center"
                style={{
                  height: ITEM_H,
                  fontFamily: font.display,
                  fontSize: isCenter ? 42 : dist === 1 ? 30 : dist === 2 ? 22 : 16,
                  fontWeight: isCenter ? 500 : 300,
                  color: isCenter
                    ? c.deep
                    : dist === 1
                      ? c.violet
                      : dist === 2
                        ? c.mist
                        : c.pale,
                  opacity: dist > 2 ? 0 : 1,
                  transition: 'all 0.2s ease',
                  cursor: 'pointer',
                  letterSpacing: '-0.02em',
                }}
                onClick={() => commitOffset(idx * ITEM_H)}
              >
                {age}
              </div>
            );
          })}
        </div>
      </div>

      {/* +/− nudge buttons */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => commitOffset(offset - ITEM_H)}
          disabled={currentIdx === 0}
          className="flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-200 active:scale-90 disabled:opacity-30"
          style={{
            borderColor: c.pale,
            background: 'white',
            color: c.mid,
          }}
        >
          <Minus size={14} strokeWidth={2} />
        </button>

        <div className="text-center" style={{ minWidth: 80 }}>
          <p
            className="text-[11px] tracking-widest uppercase"
            style={{ color: c.muted, fontFamily: font.body }}
          >
            years old
          </p>
        </div>

        <button
          onClick={() => commitOffset(offset + ITEM_H)}
          disabled={currentIdx === ages.length - 1}
          className="flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-200 active:scale-90 disabled:opacity-30"
          style={{
            borderColor: c.pale,
            background: 'white',
            color: c.mid,
          }}
        >
          <Plus size={14} strokeWidth={2} />
        </button>
      </div>

      {/* Validity note */}
      {value !== null && (
        <div
          className="animate-reveal flex items-center gap-1.5"
          style={{ color: c.mid }}
        >
          <CheckCircle2 size={13} strokeWidth={2} />
          <span className="text-[12px]" style={{ fontFamily: font.body, color: c.mid }}>
            Age confirmed
          </span>
        </div>
      )}
    </div>
  );
}

// ─── Cycle Date Row ───────────────────────────────────────────────────────────

function CycleDateRow({
  entry,
  index,
  onRemove,
  onChange,
  canRemove,
  animDelay,
}: {
  entry: CycleEntry;
  index: number;
  onRemove: () => void;
  onChange: (date: string) => void;
  canRemove: boolean;
  animDelay: number;
}) {
  return (
    <div
      className="flex items-center gap-3"
      style={{
        animation: `reveal 0.45s cubic-bezier(0.22,1,0.36,1) ${animDelay}ms both`,
      }}
    >
      {/* Index bubble */}
      <div
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[12px] font-medium transition-all duration-300"
        style={{
          background: entry.startDate ? c.mid : c.pale,
          color: entry.startDate ? 'white' : c.soft,
          fontFamily: font.body,
        }}
      >
        {entry.startDate ? <CheckCircle2 size={13} strokeWidth={2.5} /> : index + 1}
      </div>

      {/* Date input */}
      <div className="group relative flex-1">
        <input
          type="date"
          value={entry.startDate}
          max={new Date().toISOString().split('T')[0]}
          onChange={(e) => onChange(e.target.value)}
          className="h-12 w-full appearance-none rounded-xl border px-4 text-[14px] transition-all duration-300 outline-none"
          style={{
            borderColor: entry.startDate ? c.mist : c.pale,
            background: entry.startDate ? c.blush : 'white',
            color: c.ink,
            fontFamily: font.body,
            fontWeight: 300,
            boxShadow: entry.startDate
              ? '0 2px 12px rgba(74,47,122,0.08)'
              : '0 1px 4px rgba(15,11,30,0.04)',
          }}
        />
      </div>

      {/* Remove */}
      {canRemove ? (
        <button
          onClick={onRemove}
          className="flex h-8 w-8 items-center justify-center rounded-full transition-all duration-200 active:scale-90"
          style={{ color: c.mist }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLButtonElement).style.color = c.rose)
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLButtonElement).style.color = c.mist)
          }
        >
          <Trash2 size={13} strokeWidth={1.5} />
        </button>
      ) : (
        <div className="w-8" />
      )}
    </div>
  );
}

// ─── Regularity Card ──────────────────────────────────────────────────────────

function RegularityCard({
  opt,
  selected,
  onClick,
  animDelay,
}: {
  opt: (typeof REGULARITY_OPTIONS)[number];
  selected: boolean;
  onClick: () => void;
  animDelay: number;
}) {
  return (
    <button
      onClick={onClick}
      className="group flex w-full items-center gap-4 rounded-2xl border px-5 py-4 text-left transition-all duration-300 active:scale-[0.98]"
      style={{
        background: selected ? c.blush : 'white',
        borderColor: selected ? c.mid : c.pale,
        boxShadow: selected
          ? `0 4px 20px rgba(107,79,160,0.12), 0 0 0 1px var(--mist)`
          : '0 1px 4px rgba(15,11,30,0.05)',
        animation: `reveal 0.45s cubic-bezier(0.22,1,0.36,1) ${animDelay}ms both`,
        transform: selected ? 'translateY(-1px)' : 'translateY(0)',
      }}
    >
      <div
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all duration-300"
        style={{
          background: selected ? c.mid : c.pale,
          color: selected ? 'white' : c.soft,
          boxShadow: selected ? '0 2px 8px rgba(107,79,160,0.25)' : 'none',
        }}
      >
        {opt.icon}
      </div>
      <div className="min-w-0 flex-1">
        <p
          className="text-[14px] leading-tight font-medium"
          style={{
            fontFamily: font.body,
            color: selected ? c.deep : c.ink,
          }}
        >
          {opt.label}
        </p>
        <p
          className="mt-0.5 text-[12px]"
          style={{ color: c.muted, fontFamily: font.body, fontWeight: 300 }}
        >
          {opt.sublabel}
        </p>
      </div>
      <div
        className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-300"
        style={{
          borderColor: selected ? c.mid : c.mist,
          background: selected ? c.mid : 'transparent',
        }}
      >
        {selected && <div className="check-pop h-2 w-2 rounded-full bg-white" />}
      </div>
    </button>
  );
}

// ─── Bool Toggle Card ─────────────────────────────────────────────────────────

function HealthToggleCard({
  label,
  sublabel,
  icon,
  value,
  onChange,
  animDelay,
}: {
  label: string;
  sublabel: string;
  icon: React.ReactNode;
  value: boolean | undefined;
  onChange: (v: boolean) => void;
  animDelay: number;
}) {
  return (
    <div
      className="rounded-2xl border p-5 transition-all duration-400"
      style={{
        background: value ? c.blush : 'white',
        borderColor: value ? c.mid : c.pale,
        boxShadow: value
          ? `0 4px 20px rgba(107,79,160,0.1), 0 0 0 1px var(--mist)`
          : '0 1px 4px rgba(15,11,30,0.05)',
        animation: `reveal 0.45s cubic-bezier(0.22,1,0.36,1) ${animDelay}ms both`,
        transform: value ? 'translateY(-1px)' : 'translateY(0)',
      }}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all duration-300"
            style={{
              background: value ? c.mid : c.pale,
              color: value ? 'white' : c.soft,
              boxShadow: value ? '0 2px 8px rgba(107,79,160,0.25)' : 'none',
            }}
          >
            {icon}
          </div>
          <div>
            <p
              className="text-[14px] font-medium"
              style={{ fontFamily: font.body, color: c.ink }}
            >
              {label}
            </p>
            <p
              className="mt-0.5 text-[12px] leading-snug"
              style={{ color: c.muted, fontFamily: font.body, fontWeight: 300 }}
            >
              {sublabel}
            </p>
          </div>
        </div>

        {/* Premium toggle switch */}
        <button
          onClick={() => onChange(!value)}
          className="relative shrink-0 transition-all duration-300 focus:outline-none active:scale-95"
          style={{ width: 48, height: 26 }}
          aria-checked={!!value}
          role="switch"
        >
          <div
            className="absolute inset-0 rounded-full transition-all duration-300"
            style={{
              background: value
                ? `linear-gradient(135deg, ${c.violet}, ${c.mid})`
                : c.pale,
              boxShadow: value ? '0 2px 8px rgba(107,79,160,0.3)' : 'none',
            }}
          />
          <div
            className="absolute top-1 h-4.5 w-4.5 rounded-full bg-white shadow-sm transition-all duration-300"
            style={{
              left: value ? 26 : 4,
              width: 18,
              height: 18,
              boxShadow: '0 1px 4px rgba(15,11,30,0.2)',
            }}
          />
        </button>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function OnboardingScreen() {
  const [step, setStep] = useState(0);
  const [stepKey, setStepKey] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  // Form state
  const [cycles, setCycles] = useState<CycleEntry[]>([
    { id: uid(), startDate: '' },
    { id: uid(), startDate: '' },
    { id: uid(), startDate: '' },
  ]);
  const [age, setAge] = useState<number | null>(null);
  const [hasPCOS, setHasPCOS] = useState<boolean | undefined>(undefined);
  const [recentHormoneChange, setRecentHormoneChange] = useState<boolean | undefined>(
    undefined,
  );
  const [regularity, setRegularity] = useState<Regularity | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const TOTAL_STEPS = 5; // 0-welcome, 1-cycles, 2-age, 3-health, 4-regularity

  // ── Navigation ──────────────────────────────────────────────────────────────

  const navigateTo = useCallback((next: number) => {
    setStepKey((k) => k + 1);
    setStep(next);
  }, []);

  const handleNext = () => {
    if (step < TOTAL_STEPS - 1) navigateTo(step + 1);
  };
  const handleBack = () => {
    if (step > 0) navigateTo(step - 1);
  };

  // ── Cycle helpers ────────────────────────────────────────────────────────────

  const addCycle = () => setCycles((p) => [...p, { id: uid(), startDate: '' }]);
  const removeCycle = (id: string) => setCycles((p) => p.filter((c) => c.id !== id));
  const updateCycle = (id: string, date: string) =>
    setCycles((p) => p.map((c) => (c.id === id ? { ...c, startDate: date } : c)));

  // ── Validation ───────────────────────────────────────────────────────────────

  const filledCycles = cycles.filter((c) => c.startDate).length;
  const canProceed: Record<number, boolean> = {
    0: true,
    1: filledCycles >= 3,
    2: age !== null && age >= 13 && age <= 55,
    3: true,
    4: regularity !== null,
  };

  // ── Submit ───────────────────────────────────────────────────────────────────

  const handleSubmit = () => {
    const payload = {
      cycles: cycles.filter((c) => c.startDate).map((c) => ({ startDate: c.startDate })),
      age: age!,
      ...(hasPCOS !== undefined && { hasPCOS }),
      ...(recentHormoneChange !== undefined && { recentHormoneChange }),
      selfReportedRegularity: regularity,
    };
    console.log('[Onboarding] payload:', JSON.stringify(payload, null, 2));
    // TODO: await api.post('/onboarding', payload)
    setSubmitted(true);
  };

  // ─────────────────────────────────────────────────────────────────────────────
  //  RENDER
  // ─────────────────────────────────────────────────────────────────────────────

  if (submitted) {
    return (
      <div
        className="flex min-h-screen w-full items-center justify-center p-6"
        style={{ background: c.cream, fontFamily: font.body }}
      >
        <div
          className="w-full max-w-md text-center"
          style={{ animation: 'reveal 0.6s cubic-bezier(0.22,1,0.36,1)' }}
        >
          <div
            className="check-pop mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full"
            style={{
              background: `radial-gradient(circle at 40% 40%, var(--blush), var(--pale))`,
              boxShadow: '0 12px 48px rgba(107,79,160,0.18)',
            }}
          >
            <Sparkles size={36} style={{ color: c.mid }} strokeWidth={1.5} />
          </div>
          <h2
            className="mb-3 text-[48px] leading-none font-light"
            style={{ fontFamily: font.display, color: c.deep }}
          >
            All done.
          </h2>
          <p className="mb-8 text-[15px] leading-relaxed" style={{ color: c.muted }}>
            We have everything we need to start personalising your experience.
          </p>
          <div
            className="space-y-3 rounded-2xl p-5 text-left"
            style={{
              background: 'white',
              border: `1px solid ${c.pale}`,
              boxShadow: '0 2px 16px rgba(15,11,30,0.05)',
            }}
          >
            {[
              { label: 'Cycle dates', value: `${filledCycles} recorded` },
              { label: 'Age', value: `${age} years` },
              {
                label: 'PCOS',
                value: hasPCOS === undefined ? 'Not specified' : hasPCOS ? 'Yes' : 'No',
              },
              {
                label: 'Cycle pattern',
                value:
                  REGULARITY_OPTIONS.find((o) => o.value === regularity)?.label ?? '—',
              },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="flex items-center justify-between border-b py-2 last:border-0"
                style={{ borderColor: c.pale }}
              >
                <span
                  className="text-[12px] tracking-wider uppercase"
                  style={{ color: c.muted, fontWeight: 400 }}
                >
                  {label}
                </span>
                <span
                  className="text-[14px]"
                  style={{ color: c.deep, fontFamily: font.body }}
                >
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex min-h-screen w-full flex-col"
      style={{ background: c.cream, fontFamily: font.body }}
    >
      {/* ── Centred layout wrapper ── */}
      <div className="relative mx-auto flex min-h-screen w-full max-w-lg flex-col">
        {/* ── Decorative header ── */}
        <div className="shrink-0">
          <HeaderOrb step={step} />
        </div>

        {/* ── Top nav (sits over the header orb) ── */}
        <div className="absolute top-0 right-0 left-0 z-20 flex items-center justify-between px-5 pt-4">
          {step > 0 ? (
            <button
              onClick={handleBack}
              className="flex h-9 w-9 items-center justify-center rounded-full transition-all duration-200 active:scale-90"
              style={{
                background: 'rgba(255,255,255,0.8)',
                backdropFilter: 'blur(8px)',
                border: `1px solid ${c.pale}`,
                color: c.mid,
                boxShadow: '0 2px 8px rgba(15,11,30,0.06)',
              }}
            >
              <ChevronLeft size={16} strokeWidth={2} />
            </button>
          ) : (
            <div className="w-9" />
          )}

          <StepProgress total={TOTAL_STEPS} current={step} />

          <div
            className="rounded-full px-3 py-1 text-[11px] tracking-widest uppercase"
            style={{
              background: 'rgba(255,255,255,0.8)',
              backdropFilter: 'blur(8px)',
              border: `1px solid ${c.pale}`,
              color: c.muted,
              fontFamily: font.body,
              fontWeight: 400,
            }}
          >
            {step + 1}/{TOTAL_STEPS}
          </div>
        </div>

        {/* ── Scrollable content ── */}
        <div className="flex-1 overflow-y-auto">
          <div key={stepKey} className="px-6 pb-8" style={{ paddingTop: 8 }}>
            {/* ════════════════════ STEP 0 — WELCOME ════════════════════ */}
            {step === 0 && (
              <div style={{ animation: 'reveal 0.55s cubic-bezier(0.22,1,0.36,1)' }}>
                <h1
                  className="mb-4 text-[52px] leading-[1.05] font-light"
                  style={{ fontFamily: font.display, color: c.deep }}
                >
                  Know your
                  <br />
                  <em className="shimmer-text not-italic" style={{ fontStyle: 'italic' }}>
                    body better.
                  </em>
                </h1>

                <p
                  className="mb-8 text-[15px] leading-relaxed"
                  style={{ color: c.muted, fontWeight: 300 }}
                >
                  A few thoughtful questions to help us understand your cycle and give you
                  insights that are actually meaningful to you.
                </p>

                {/* What's ahead — refined list */}
                <div
                  className="mb-6 overflow-hidden rounded-2xl"
                  style={{
                    background: 'white',
                    border: `1px solid ${c.pale}`,
                    boxShadow: '0 2px 16px rgba(15,11,30,0.05)',
                  }}
                >
                  {[
                    {
                      icon: <CalendarDays size={15} strokeWidth={1.5} />,
                      title: 'Past cycle dates',
                      sub: 'At least 3 recent period start dates',
                      delay: 100,
                    },
                    {
                      icon: <Sparkles size={15} strokeWidth={1.5} />,
                      title: 'Your age',
                      sub: 'For more precise predictions',
                      delay: 150,
                    },
                    {
                      icon: <Heart size={15} strokeWidth={1.5} />,
                      title: 'Health context',
                      sub: 'Completely optional',
                      delay: 200,
                    },
                    {
                      icon: <Waves size={15} strokeWidth={1.5} />,
                      title: 'Cycle pattern',
                      sub: 'How irregular you think it is',
                      delay: 250,
                    },
                  ].map(({ icon, title, sub, delay }, i, arr) => (
                    <div
                      key={title}
                      className="flex items-center gap-4 px-5 py-4"
                      style={{
                        borderBottom: i < arr.length - 1 ? `1px solid ${c.pale}` : 'none',
                        animation: `reveal 0.5s cubic-bezier(0.22,1,0.36,1) ${delay}ms both`,
                      }}
                    >
                      <div
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl"
                        style={{ background: c.pale, color: c.mid }}
                      >
                        {icon}
                      </div>
                      <div>
                        <p className="text-[13px] font-medium" style={{ color: c.ink }}>
                          {title}
                        </p>
                        <p
                          className="mt-0.5 text-[11px]"
                          style={{ color: c.muted, fontWeight: 300 }}
                        >
                          {sub}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Privacy notice */}
                <div
                  className="flex items-start gap-3 rounded-xl px-4 py-3"
                  style={{
                    background: c.blush,
                    border: `1px solid ${c.pale}`,
                  }}
                >
                  <Shield
                    size={14}
                    strokeWidth={1.5}
                    className="mt-0.5 shrink-0"
                    style={{ color: c.mid }}
                  />
                  <p
                    className="text-[12px] leading-relaxed"
                    style={{ color: c.muted, fontWeight: 300 }}
                  >
                    Your data is private and encrypted. It&apos;s never shared or sold.
                  </p>
                </div>
              </div>
            )}

            {/* ════════════════════ STEP 1 — CYCLES ════════════════════ */}
            {step === 1 && (
              <div style={{ animation: 'reveal 0.55s cubic-bezier(0.22,1,0.36,1)' }}>
                <p
                  className="mb-2 text-[11px] font-medium tracking-widest uppercase"
                  style={{ color: c.rose }}
                >
                  Step 1 of 4
                </p>
                <h2
                  className="mb-2 text-[42px] leading-[1.05] font-light"
                  style={{ fontFamily: font.display, color: c.deep }}
                >
                  When did your{' '}
                  <em style={{ color: c.rose, fontStyle: 'italic' }}>last periods</em>{' '}
                  begin?
                </h2>
                <p
                  className="mb-6 text-[13px] leading-relaxed"
                  style={{ color: c.muted, fontWeight: 300 }}
                >
                  Minimum 3 dates. The more you add, the smarter your predictions become.
                </p>

                {/* Progress indicator */}
                <div className="mb-5">
                  <div className="mb-2 flex items-center justify-between">
                    <span
                      className="text-[11px]"
                      style={{ color: c.muted, fontFamily: font.body }}
                    >
                      {filledCycles} of {cycles.length} filled
                    </span>
                    <span
                      className="text-[11px] font-medium transition-colors duration-300"
                      style={{
                        color: filledCycles >= 3 ? c.mid : c.rose,
                        fontFamily: font.body,
                      }}
                    >
                      {filledCycles >= 3
                        ? '✓ minimum reached'
                        : `${3 - filledCycles} more needed`}
                    </span>
                  </div>
                  <div
                    className="h-px overflow-hidden rounded-full"
                    style={{ background: c.pale }}
                  >
                    <div
                      className="h-full rounded-full transition-all duration-700 ease-out"
                      style={{
                        width: `${Math.min(100, (filledCycles / Math.max(cycles.length, 3)) * 100)}%`,
                        background: `linear-gradient(90deg, ${c.mid}, ${c.rose})`,
                      }}
                    />
                  </div>
                </div>

                {/* Cycle rows */}
                <div className="mb-4 space-y-2.5">
                  {cycles.map((entry, idx) => (
                    <CycleDateRow
                      key={entry.id}
                      entry={entry}
                      index={idx}
                      canRemove={cycles.length > 3}
                      onRemove={() => removeCycle(entry.id)}
                      onChange={(date) => updateCycle(entry.id, date)}
                      animDelay={idx * 60}
                    />
                  ))}
                </div>

                {/* Add more */}
                <button
                  onClick={addCycle}
                  className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed text-[13px] transition-all duration-200 active:scale-[0.98]"
                  style={{
                    borderColor: c.mist,
                    color: c.soft,
                    background: 'transparent',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = c.mid;
                    (e.currentTarget as HTMLButtonElement).style.color = c.mid;
                    (e.currentTarget as HTMLButtonElement).style.background = c.blush;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = c.mist;
                    (e.currentTarget as HTMLButtonElement).style.color = c.soft;
                    (e.currentTarget as HTMLButtonElement).style.background =
                      'transparent';
                  }}
                >
                  <Plus size={14} strokeWidth={2} />
                  Add another date
                </button>
              </div>
            )}

            {/* ════════════════════ STEP 2 — AGE ════════════════════ */}
            {step === 2 && (
              <div style={{ animation: 'reveal 0.55s cubic-bezier(0.22,1,0.36,1)' }}>
                <p
                  className="mb-2 text-[11px] font-medium tracking-widest uppercase"
                  style={{ color: c.rose }}
                >
                  Step 2 of 4
                </p>
                <h2
                  className="mb-2 text-[42px] leading-[1.05] font-light"
                  style={{ fontFamily: font.display, color: c.deep }}
                >
                  How old <em style={{ color: c.rose, fontStyle: 'italic' }}>are you?</em>
                </h2>
                <p
                  className="mb-10 text-[13px] leading-relaxed"
                  style={{ color: c.muted, fontWeight: 300 }}
                >
                  Scroll, drag, or tap ＋ / − to select your age.
                </p>

                <div className="flex justify-center">
                  <AgeDrum value={age} onChange={setAge} />
                </div>
              </div>
            )}

            {/* ════════════════════ STEP 3 — HEALTH ════════════════════ */}
            {step === 3 && (
              <div style={{ animation: 'reveal 0.55s cubic-bezier(0.22,1,0.36,1)' }}>
                <p
                  className="mb-2 text-[11px] font-medium tracking-widest uppercase"
                  style={{ color: c.rose }}
                >
                  Step 3 of 4
                </p>
                <h2
                  className="mb-2 text-[42px] leading-[1.05] font-light"
                  style={{ fontFamily: font.display, color: c.deep }}
                >
                  A little{' '}
                  <em style={{ color: c.rose, fontStyle: 'italic' }}>health context</em>
                </h2>
                <p
                  className="mb-6 text-[13px] leading-relaxed"
                  style={{ color: c.muted, fontWeight: 300 }}
                >
                  Both are entirely optional — skip freely if you prefer.
                </p>

                <div className="mb-6 space-y-3">
                  <HealthToggleCard
                    label="Do you have PCOS?"
                    sublabel="Polycystic ovary syndrome affects cycle regularity"
                    icon={<Activity size={15} strokeWidth={1.5} />}
                    value={hasPCOS}
                    onChange={setHasPCOS}
                    animDelay={80}
                  />
                  <HealthToggleCard
                    label="Recent hormonal changes?"
                    sublabel="Birth control, postpartum, or similar"
                    icon={<Sparkles size={15} strokeWidth={1.5} />}
                    value={recentHormoneChange}
                    onChange={setRecentHormoneChange}
                    animDelay={160}
                  />
                </div>

                <div
                  className="flex items-start gap-3 rounded-xl px-4 py-3.5"
                  style={{
                    background: c.blush,
                    border: `1px solid ${c.pale}`,
                    animation: 'reveal 0.5s cubic-bezier(0.22,1,0.36,1) 240ms both',
                  }}
                >
                  <Shield
                    size={13}
                    strokeWidth={1.5}
                    className="mt-0.5 shrink-0"
                    style={{ color: c.mid }}
                  />
                  <p
                    className="text-[12px] leading-relaxed"
                    style={{ color: c.muted, fontWeight: 300 }}
                  >
                    This helps flag when your cycle may behave differently. Used only for
                    your predictions — nothing else.
                  </p>
                </div>
              </div>
            )}

            {/* ════════════════════ STEP 4 — REGULARITY ════════════════════ */}
            {step === 4 && (
              <div style={{ animation: 'reveal 0.55s cubic-bezier(0.22,1,0.36,1)' }}>
                <p
                  className="mb-2 text-[11px] font-medium tracking-widest uppercase"
                  style={{ color: c.rose }}
                >
                  Step 4 of 4
                </p>
                <h2
                  className="mb-2 text-[42px] leading-[1.05] font-light"
                  style={{ fontFamily: font.display, color: c.deep }}
                >
                  How does your{' '}
                  <em style={{ color: c.rose, fontStyle: 'italic' }}>cycle feel?</em>
                </h2>
                <p
                  className="mb-6 text-[13px] leading-relaxed"
                  style={{ color: c.muted, fontWeight: 300 }}
                >
                  Your own sense of your body matters here. There&apos;s no wrong answer.
                </p>

                <div className="space-y-2.5">
                  {REGULARITY_OPTIONS.map((opt, i) => (
                    <RegularityCard
                      key={opt.value}
                      opt={opt}
                      selected={regularity === opt.value}
                      onClick={() => setRegularity(opt.value)}
                      animDelay={i * 70}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── Fixed bottom CTA ── */}
        <div
          className="shrink-0 px-6 py-5"
          style={{
            background: `linear-gradient(to top, ${c.cream} 70%, transparent)`,
            paddingBottom: 'max(20px, env(safe-area-inset-bottom, 20px))',
          }}
        >
          {/* CTA button */}
          <button
            disabled={!canProceed[step]}
            onClick={step === TOTAL_STEPS - 1 ? handleSubmit : handleNext}
            className="group flex h-14 w-full items-center justify-center gap-2.5 rounded-2xl text-[15px] font-medium transition-all duration-400 active:scale-[0.97] disabled:cursor-not-allowed"
            style={{
              background: canProceed[step]
                ? `linear-gradient(135deg, ${c.violet} 0%, ${c.mid} 100%)`
                : c.pale,
              color: canProceed[step] ? 'white' : c.mist,
              fontFamily: font.body,
              fontWeight: 400,
              letterSpacing: '0.01em',
              boxShadow: canProceed[step]
                ? '0 6px 28px rgba(74,47,122,0.32), 0 2px 8px rgba(74,47,122,0.2)'
                : 'none',
              transition: 'all 0.35s cubic-bezier(0.22,1,0.36,1)',
            }}
          >
            {step === 0
              ? 'Begin'
              : step === TOTAL_STEPS - 1
                ? 'Complete setup'
                : 'Continue'}
            {step === TOTAL_STEPS - 1 ? (
              <Sparkles size={15} strokeWidth={2} />
            ) : (
              <ArrowRight
                size={16}
                strokeWidth={2}
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              />
            )}
          </button>

          {/* Skip link for optional step */}
          {step === 3 && (
            <button
              onClick={handleNext}
              className="mt-3 h-10 w-full text-[13px] transition-all duration-200"
              style={{
                color: c.muted,
                fontFamily: font.body,
                fontWeight: 300,
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.color = c.mid)
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.color = c.muted)
              }
            >
              Skip for now
            </button>
          )}
        </div>
      </div>

      {/* ── Global keyframe injection ── */}
      <style>{`
        @keyframes reveal {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes check-pop {
          from { opacity: 0; transform: scale(0.4) rotate(-12deg); }
          to   { opacity: 1; transform: scale(1) rotate(0deg); }
        }
        .check-pop { animation: check-pop 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards; }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        .shimmer-text {
          background: linear-gradient(90deg, var(--violet), var(--rose), var(--mid), var(--violet));
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }
        input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
        input[type="number"] { -moz-appearance: textfield; }
        input[type="date"]::-webkit-calendar-picker-indicator {
          opacity: 0.4;
          cursor: pointer;
          filter: invert(30%) sepia(60%) saturate(400%) hue-rotate(220deg);
        }
      `}</style>
    </div>
  );
}
