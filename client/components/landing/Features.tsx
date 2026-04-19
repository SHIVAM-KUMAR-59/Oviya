'use client';

import React, { useEffect } from 'react';

type HoverProps = {
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};

interface FeaturesProps {
  hoverProps?: HoverProps;
}

const Features = ({ hoverProps }: FeaturesProps) => {
  const features = [
    {
      n: '01',
      icon: '🔄',
      h: 'Irregular Cycle Engine',
      p: 'Designed for cycles ranging from 19 to 60+ days. Learns your personal rhythm over time, not a population average.',
    },
    {
      n: '02',
      icon: '🍛',
      h: 'Indian Food Context',
      p: 'Nutrition insights built around dal, roti, sabzi, and fasting patterns — not imported Western food databases.',
    },
    {
      n: '03',
      icon: '🧠',
      h: 'Mood + Energy Log',
      p: 'Track brain fog, anxiety, fatigue alongside your cycle — and watch the connections emerge over weeks.',
    },
    {
      n: '04',
      icon: '📄',
      h: 'Doctor-Ready Reports',
      p: 'Walk into appointments with a clear, printable summary of cycle history, symptoms, and patterns over months.',
    },
  ];

  // Scroll reveal effect
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
    const revealElements = document.querySelectorAll('.features-reveal');
    revealElements.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="features" className="bg-ink relative py-30">
      {/* Background gradients (replacing ::before) */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_90%_50%,rgba(74,47,122,0.22),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_60%_at_0%_0%,rgba(35,24,72,0.32),transparent_60%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 md:px-12">
        {/* Section Label */}
        <div className="features-reveal text-mist mb-12 flex items-center gap-4 text-[10px] tracking-[0.32em] uppercase">
          What makes Oviya different
          <div className="h-px flex-1 bg-[rgba(197,178,232,0.1)]" />
        </div>

        {/* Intro */}
        <div className="features-reveal mb-16 grid items-end gap-12 md:mb-18 md:grid-cols-2 md:gap-20">
          <h2 className="font-[Cormorant] text-[clamp(44px,4vw,64px)] leading-[1.02] font-light tracking-[-0.03em] text-white">
            Specific support,
            <br />
            not <em className="text-mist italic">generic</em> tracking.
          </h2>

          <p className="text-[16px] leading-[1.85] font-light text-white/40">
            Built from 110 real conversations. Every feature exists because someone needed
            it and could&apos;nt find it anywhere else.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, index) => (
            <div
              key={f.n}
              {...hoverProps}
              className={`features-reveal group bg-ink hover:bg-ink2 relative overflow-hidden px-8 py-11 transition-colors duration-300 reveal-delay-${index + 1}`}
            >
              {/* Bottom gradient line */}
              <div className="via-rose absolute right-0 bottom-0 left-0 h-px scale-x-0 bg-linear-to-r from-transparent to-transparent transition-transform duration-500 group-hover:scale-x-100" />

              {/* Number */}
              <div className="mb-4 font-[Cormorant] text-[60px] font-light tracking-[-0.04em] text-white/5 italic transition-colors duration-300 group-hover:text-[rgba(192,115,122,0.1)]">
                {f.n}
              </div>

              {/* Icon */}
              <span className="mb-4 block text-[22px] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-110">
                {f.icon}
              </span>

              {/* Title */}
              <h3 className="mb-3 font-[Cormorant] text-[24px] leading-tight font-medium tracking-[-0.01em] text-white">
                {f.h}
              </h3>

              {/* Description */}
              <p className="text-[13px] leading-[1.75] font-light text-white/45">{f.p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
