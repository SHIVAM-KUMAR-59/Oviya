'use client';

import React, { useEffect, useState } from 'react';
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
    numColor: 'group-hover:text-violet-400/40',
    line: 'from-transparent via-violet-500 to-transparent',
  },
  {
    n: '02',
    icon: Salad,
    h: 'Indian Food Context',
    p: 'Nutrition insights built around dal, roti, sabzi, and fasting patterns — not imported Western food databases.',
    glow: 'bg-rose-400/10',
    iconBg:
      'bg-rose-400/10 border-rose-400/20 group-hover:bg-rose-400/15 group-hover:border-rose-400/30',
    iconColor: 'text-white/40 group-hover:text-rose-400',
    numColor: 'group-hover:text-rose-400/40',
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
    numColor: 'group-hover:text-violet-400/40',
    line: 'from-transparent via-violet-500 to-transparent',
  },
  {
    n: '04',
    icon: FileText,
    h: 'Doctor-Ready Reports',
    p: 'Walk into appointments with a clear, printable summary of cycle history, symptoms, and patterns over months.',
    glow: 'bg-rose-400/10',
    iconBg:
      'bg-rose-400/10 border-rose-400/20 group-hover:bg-rose-400/15 group-hover:border-rose-400/30',
    iconColor: 'text-white/40 group-hover:text-rose-400',
    numColor: 'group-hover:text-rose-400/40',
    line: 'from-transparent via-rose-400 to-transparent',
  },
];

const Features = ({ hoverProps }: FeaturesProps) => {
  const [_activeCard, setActiveCard] = useState<number | null>(null);

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
    <section id="features" className="bg-ink relative py-32">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_90%_50%,rgba(92,69,176,0.18),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_60%_at_0%_0%,rgba(20,15,42,0.35),transparent_60%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12 lg:px-20">
        
        {/* Section label */}
        <div className="features-reveal mb-14 flex items-center gap-4 text-[10px] tracking-[0.32em] uppercase text-mist">
          What makes Oviya different
          <div className="h-px flex-1 bg-white/10" />
        </div>

        {/* Intro */}
        <div className="features-reveal mb-20 grid items-end gap-12 md:grid-cols-2 md:gap-24">
          <h2 className="font-[Cormorant] text-[clamp(44px,4vw,64px)] leading-[1.05] tracking-tight text-white">
            Specific support,
            <br />
            not <em className="text-mist italic">generic</em> tracking.
          </h2>

          <p className="text-[16px] leading-[1.9] font-light text-white/45 max-w-md">
            Built from 150+ real conversations. Every feature exists because someone
            needed it and couldn&apos;t find it anywhere else.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((f, index) => {
            const Icon = f.icon;

            return (
              <div
                key={f.n}
                {...hoverProps}
                onMouseEnter={() => setActiveCard(index)}
                onMouseLeave={() => setActiveCard(null)}
                className={`features-reveal group relative overflow-hidden border border-[var(--border-dark)] bg-white/5 backdrop-blur-sm p-8 md:p-10 transition-all duration-300 hover:bg-white/10 reveal-delay-${index + 1}`}
              >
                {/* Gradient line */}
                <div
                  className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r ${f.line} scale-x-0 transition-transform duration-500 group-hover:scale-x-100`}
                />

                {/* Number */}
                <div
                  className={`mb-6 font-[Cormorant] text-5xl md:text-6xl font-medium tracking-tight text-white/25 transition-colors duration-300 ${f.numColor}`}
                >
                  {f.n}
                </div>

                {/* Icon */}
                <div
                  className={`mb-6 flex h-11 w-11 items-center justify-center rounded-xl border transition-all duration-300 group-hover:scale-110 ${f.iconBg}`}
                >
                  <Icon size={18} strokeWidth={1.5} className={f.iconColor} />
                </div>

                {/* Content */}
                <div className="flex flex-col gap-4">
                  <h3 className="font-[Cormorant] text-[22px] leading-tight font-medium text-white/90 group-hover:text-white">
                    {f.h}
                  </h3>

                  <p className="text-[14px] leading-[1.85] font-light text-white/45 group-hover:text-white/65">
                    {f.p}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Features;