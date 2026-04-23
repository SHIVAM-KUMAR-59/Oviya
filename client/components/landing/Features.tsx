'use client';

import { useEffect } from 'react';
import { RefreshCcw, Salad, Brain, FileText } from 'lucide-react';

type HoverProps = {
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};

interface FeaturesProps {
  hoverProps?: HoverProps;
}

const features = [
  {
    n: '01',
    icon: RefreshCcw,
    h: 'Irregular Cycle Engine',
    p: 'Designed for cycles ranging from 19 to 60+ days. Learns your personal rhythm over time, not a population average.',
    glow: 'bg-violet-500/10',
    iconBg:
      'bg-violet-500/10 border-violet-500/20 group-hover:bg-violet-500/15 group-hover:border-violet-500/30',
    iconColor: 'text-white/40 group-hover:text-violet-400',
    numColor: 'group-hover:text-violet-500/30',
    line: 'from-transparent via-violet-500 to-transparent',
  },
  {
    n: '02',
    icon: FileText,
    h: 'Doctor-Ready Reports',
    p: 'Walk into appointments with a clear, printable summary of cycle history, symptoms, and patterns over months.',
    glow: 'bg-rose-400/10',
    iconBg:
      'bg-rose-400/10 border-rose-400/20 group-hover:bg-rose-400/15 group-hover:border-rose-400/30',
    iconColor: 'text-white/40 group-hover:text-rose-400',
    numColor: 'group-hover:text-rose-500/30',
    line: 'from-transparent via-rose-400 to-transparent',
  },
  {
    n: '03',
    icon: Brain,
    h: 'Mood + Energy Log',
    p: 'Track brain fog, anxiety, fatigue alongside your cycle — and watch the connections emerge over weeks.',
    glow: 'bg-violet-500/10',
    iconBg:
      'bg-violet-500/10 border-violet-500/20 group-hover:bg-violet-500/15 group-hover:border-violet-500/30',
    iconColor: 'text-white/40 group-hover:text-violet-400',
    numColor: 'group-hover:text-violet-500/30',
    line: 'from-transparent via-violet-500 to-transparent',
  },
    {
    n: '04',
    icon: Salad,
    h: 'Indian Food Context',
    p: 'Nutrition insights built around dal, roti, sabzi, and fasting patterns — not imported Western food databases.',
    glow: 'bg-rose-400/10',
    iconBg:
      'bg-rose-400/10 border-rose-400/20 group-hover:bg-rose-400/15 group-hover:border-rose-400/30',
    iconColor: 'text-white/40 group-hover:text-rose-400',
    numColor: 'group-hover:text-rose-500/30',
    line: 'from-transparent via-rose-400 to-transparent',
  },
];

const Features = ({ hoverProps }: FeaturesProps) => {

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );
    document.querySelectorAll('.features-reveal').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="features" className="bg-ink relative py-30">
      {/* Background gradients */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_90%_50%,rgba(74,47,122,0.22),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_60%_at_0%_0%,rgba(35,24,72,0.32),transparent_60%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12">
        {/* Section label */}
        <div className="features-reveal text-mist mb-12 flex items-center gap-4 text-[10px] tracking-[0.32em] uppercase">
          What makes Oviya different
          <div className="h-px flex-1 bg-white/10" />
        </div>

        {/* Intro */}
        <div className="features-reveal mb-16 grid items-end gap-12 md:mb-18 md:grid-cols-2 md:gap-20">
          <h2 className="font-[Cormorant] text-[clamp(44px,4vw,64px)] leading-[1.02] font-light tracking-[-0.03em] text-white">
            Specific support,
            <br />
            not <em className="text-mist italic">generic</em> tracking.
          </h2>
          <p className="text-[16px] leading-[1.85] font-light text-white/40">
            Built from 150+ real conversations. Every feature exists because someone
            needed it and could&apos;nt find it anywhere else.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, index) => {
            const Icon = f.icon;

            return (
              <div
                key={f.n}
                {...hoverProps}
                className={`features-reveal group bg-ink relative cursor-default overflow-hidden px-8 py-11 transition-all duration-300 hover:bg-white/3 reveal-delay-${index + 1}`}
              >
                {/* Bottom gradient line */}
                <div
                  className={`absolute right-0 bottom-0 left-0 h-px bg-linear-to-r ${f.line} scale-x-0 transition-transform duration-500 group-hover:scale-x-100`}
                />

                {/* Glow behind icon */}
                <div
                  className={`absolute top-8 left-6 h-16 w-16 rounded-full blur-2xl ${f.glow} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                />

                {/* Number */}
                <div
                  className={`mb-4 font-[Cormorant] text-[60px] font-light tracking-[-0.04em] text-white/20 italic transition-colors duration-300 ${f.numColor}`}
                >
                  {f.n}
                </div>

                {/* Icon */}
                <div
                  className={`mb-5 flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-300 group-hover:-translate-y-0.5 group-hover:scale-110 ${f.iconBg}`}
                >
                  <Icon
                    size={18}
                    strokeWidth={1.5}
                    className={`transition-colors duration-300 ${f.iconColor}`}
                  />
                </div>

                {/* Title */}
                <h3 className="mb-3 font-[Cormorant] text-[24px] leading-tight font-medium tracking-[-0.01em] text-white/85 transition-colors duration-300 group-hover:text-white">
                  {f.h}
                </h3>

                {/* Description */}
                <p className="text-[13px] leading-[1.75] font-light text-white/35 transition-colors duration-300 group-hover:text-white/60">
                  {f.p}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
