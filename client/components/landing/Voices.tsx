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
    <section className="bg-[var(--parchment)] relative overflow-hidden py-32">
      
      {/* Big decorative quote */}
      <span className="pointer-events-none absolute -top-24 -left-16 font-serif text-[520px] leading-none font-light text-[rgba(192,115,122,0.06)] select-none">
        &quot;
      </span>

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12 lg:px-20">

        {/* Section Label */}
        <div className="voices-reveal mb-16 flex items-center gap-4 text-[10px] tracking-[0.32em] uppercase text-mid">
          150+ women spoke. We listened.
          <div className="h-px flex-1 bg-[var(--border-light)]" />
        </div>

        {/* Header */}
        <div className="voices-reveal mb-20 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          
          <h2 className="max-w-xl font-[Cormorant] text-[clamp(40px,4vw,62px)] leading-[1.05] tracking-tight text-[var(--ink)]">
            What women with PCOS
            <br />
            <em className="text-mid italic">actually</em> said they needed.
          </h2>

          <div className="text-left md:text-right">
            <div className="font-[Cormorant] text-[72px] leading-none tracking-tight text-mid">
              150+
            </div>
            <div className="mt-1 text-[10px] tracking-[0.18em] uppercase text-soft">
              Interviews & surveys
            </div>
          </div>
        </div>

        {/* Quotes Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              q: "I just want one app that doesn't treat me like I'm broken when my cycle is different every single month.",
              attr: 'Mumbai · 26 · Diagnosed 2 years ago',
            },
            {
              q: 'Every tracker assumes 28 days. Mine has never been 28 days. Not once in my entire life.',
              attr: 'Bangalore · 29 · PCOS since college',
            },
            {
              q: 'I want one place for symptoms, food, moods, and cycles — where someone actually connects the dots.',
              attr: 'Delhi · 31 · Still searching for clarity',
            },
          ].map((q, i) => (
            <div
              key={i}
              {...hoverProps}
              className={`voices-reveal group bg-[var(--parchment)] border border-[var(--rose-pale)] p-6 md:p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)] reveal-delay-${i + 1}`}
            >
              
              {/* subtle accent line */}
              <div className="mb-4 h-px w-10 bg-gradient-to-r from-[var(--rose)] to-transparent" />

              {/* Quote mark */}
              <span className="mb-2 block font-[Cormorant] text-[60px] leading-none text-[var(--rose-pale)] transition-colors duration-300 group-hover:text-[var(--rose)]">
                &ldquo;
              </span>

              {/* Text */}
              <p className="font-[Cormorant] text-[19px] leading-relaxed italic text-neutral-800">
                {q.q}
              </p>

              {/* Attribution */}
              <div className="mt-6 flex items-center gap-2 text-[10px] tracking-[0.18em] uppercase text-neutral-500">
                <div className="h-px w-5 bg-[var(--rose-pale)]" />
                {q.attr}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Voices;