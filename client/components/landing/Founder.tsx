'use client';

import { useEffect } from 'react';

const Founder = () => {
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
    const revealElements = document.querySelectorAll('.founder-reveal');
    revealElements.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="story" className="bg-ink relative overflow-hidden py-28">
      {/* Decorative circle (top-right) */}
      <div className="pointer-events-none absolute -top-52 -right-52 h-175 w-175 rounded-full border border-[rgba(197,178,232,0.04)]" />

      {/* Bottom gradient glow */}
      <div className="pointer-events-none absolute -bottom-20 left-0 h-125 w-125 bg-[radial-gradient(circle,rgba(74,47,122,0.16),transparent_70%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-16">
        {/* Section Label */}
        <div className="founder-reveal text-mist mb-14 flex items-center gap-4 text-[10px] tracking-[0.32em] uppercase">
          Built by someone like you
          <div className="h-px flex-1 bg-[rgba(197,178,232,0.1)]" />
        </div>

        {/* Grid */}
        <div className="founder-reveal grid items-center gap-16 md:grid-cols-[400px_1fr] md:gap-24">
          {/* Portrait */}
          <div className="relative">
            <div className="relative flex aspect-3/4 items-center justify-center overflow-hidden border border-[rgba(197,178,232,0.08)] bg-[linear-gradient(160deg,var(--deep),var(--ink2))]">
              {/* subtle noise/dots overlay */}
              <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[30px_30px]" />

              {/* Monogram */}
              <div className="relative z-10 font-serif text-[140px] font-light text-[rgba(197,178,232,0.12)] italic">
                O
              </div>

              {/* Caption */}
              <div className="absolute right-0 bottom-0 left-0 border-t border-[rgba(255,255,255,0.06)] bg-[rgba(35,24,72,0.92)] px-6 py-4 backdrop-blur-md">
                <strong className="block text-[13px] font-normal tracking-[0.05em] text-white">
                  Founder, Oviya
                </strong>
                <span className="text-[10px] tracking-[0.14em] text-white/40 uppercase">
                  Built in India · For Indian women
                </span>
              </div>
            </div>

            {/* Accent circle */}
            <div className="absolute top-5 -right-4 h-18 w-18 rounded-full border border-[rgba(192,115,122,0.3)]" />
          </div>

          {/* Content */}
          <div>
            <h2 className="founder-reveal mb-8 font-serif text-[clamp(40px,3.8vw,58px)] leading-[1.05] font-light tracking-[-0.03em] text-white">
              Years of confusion became
              <br />a <em className="text-mist italic">reason</em> to build.
            </h2>

            <p className="founder-reveal mb-5 text-[16px] leading-[1.9] font-light text-white/50">
              I was told to just lose weight. I used every cycle tracking app and none of
              them ever understood that my cycle is never the same length twice. I sat in
              doctor&apos;s offices explaining the same symptoms, year after year, and
              walked out with the same vague advice.
            </p>

            <p className="founder-reveal mb-5 text-[16px] leading-[1.9] font-light text-white/50">
              I know how lonely PCOS can feel when nothing — no app, no doctor, no piece
              of advice — seems designed for you. That loneliness is what built Oviya.
            </p>

            <p className="founder-reveal mb-5 text-[16px] leading-[1.9] font-light text-white/50">
              Not a side project. Not a feature tacked on somewhere. A company built from
              the ground up for the 1 in 5 women in India living with PCOS — and finally
              deserving better.
            </p>

            <div className="founder-reveal text-mist mt-9 border-t border-[rgba(197,178,232,0.1)] pt-9 font-serif text-[26px] italic">
              — With you, always.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Founder;
