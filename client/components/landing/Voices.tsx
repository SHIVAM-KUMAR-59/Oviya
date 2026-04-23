'use client';

import React, { useEffect } from 'react';

type HoverProps = {
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};

interface VoicesProps {
  hoverProps?: HoverProps;
}

const Voices = ({ hoverProps }: VoicesProps) => {
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
    const revealElements = document.querySelectorAll('.voices-reveal');
    revealElements.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section className="bg-parchment relative overflow-hidden py-28">
      {/* Big decorative quote */}
      <span className="pointer-events-none absolute -top-24 -left-16 font-serif text-[560px] leading-none font-light text-[rgba(197,178,232,0.07)] select-none">
        &quot;
      </span>

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-16">
        {/* Section Label */}
        <div className="voices-reveal text-mid mb-14 flex items-center gap-4 text-[10px] tracking-[0.32em] uppercase">
          150+ women spoke. We listened.
          <div className="bg-pale h-px flex-1" />
        </div>

        {/* Header */}
        <div className="voices-reveal mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h2 className="text-ink max-w-xl font-serif text-[clamp(40px,4vw,62px)] leading-[1.02] font-light tracking-[-0.03em]">
            What women with PCOS
            <br />
            <em className="text-mid italic">actually</em> said they needed.
          </h2>

          <div className="text-left md:text-right">
            <div className="text-mid font-serif text-[80px] leading-none font-light tracking-[-0.04em]">
              150+
            </div>
            <div className="text-soft mt-1 text-[10px] tracking-[0.18em] uppercase">
              Interviews & surveys
            </div>
          </div>
        </div>

        {/* Quotes Grid */}
        <div className="border-pale bg-pale grid gap-px border md:grid-cols-3">
  {[
    {
      q: "The hardest part is the guilt of taking your mood swings out on others. Nobody talks about that.",
      attr: 'Nagpur · 24 · Diagnosed officially',
    },
    {
      q: 'Every tracker assumes 28 days. Mine has never been 28 days. Not once in my entire life.',
      attr: 'Bangalore · 29 · PCOS since college',
    },
    {
      q: "I want something I can confidently bring to my doctor and point to, show them my receipts. Because we're not taken seriously.",
      attr: 'Delhi · 31 · Years without answers',
    },
  ].map((q, i) => (
    <div
      key={i}
      {...hoverProps}
      className={`voices-reveal group bg-parchment hover:bg-blush px-9 py-11 transition-all duration-300 hover:-translate-y-1 reveal-delay-${i + 1} flex flex-col`}
    >
      {/* Quote mark */}
      <span className="text-pale group-hover:text-mist mb-2 block font-serif text-[70px] leading-none font-light transition-colors duration-300">
        &ldquo;
      </span>

      {/* Text */}
      <p className="text-ink font-serif text-[20px] leading-relaxed italic">
        {q.q}
      </p>

      {/* Attribution (pushed to bottom) */}
      <div className="mt-auto pt-6 flex gap-2 text-[10px] tracking-[0.18em] text-[#6b5490] uppercase">
        <div className="bg-pale h-px w-5 mt-2" />
        <p>{q.attr}</p>
      </div>
    </div>
  ))}
</div>
      </div>
    </section>
  );
};

export default Voices;
