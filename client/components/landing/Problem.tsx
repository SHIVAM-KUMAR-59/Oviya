'use client';

import React, { useEffect } from 'react';

type HoverProps = {
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};

interface ProblemProps {
  hoverProps?: HoverProps;
}

const Problem = ({ hoverProps }: ProblemProps) => {
  const cards = [
    {
      n: '01',
      title: 'Cycle tracking',
      h: 'Your cycle is never 28 days.',
      p: "It's 19 days, then 47, then 31. Every existing app breaks or makes you feel broken. Oviya learns your actual patterns — not a calendar assumption.",
    },
    {
      n: '02',
      title: 'Symptoms',
      h: 'Everything is connected.',
      p: "Acne, fatigue, hair fall, mood swings, sleep disruption. These aren't separate problems. Oviya tracks how each connects to your cycle.",
    },
    {
      n: '03',
      title: 'Advice',
      h: "Generic advice doesn't work.",
      p: "Western food databases don't understand what rajma or methi does to your body. Oviya is built around the food you actually eat.",
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
    const revealElements = document.querySelectorAll('.problem-reveal');
    revealElements.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="problem" className="bg-cream pt-30">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        {/* Section Label */}
        <div className="problem-reveal text-mid mb-10 text-xs tracking-[0.2em] uppercase">
          The problem no one is solving
        </div>

        {/* Layout */}
        <div className="grid md:grid-cols-2">
          {/* Left */}
          <div className="border-border-light border-b pr-0 pb-20 md:border-r md:border-b-0 md:pr-20">
            <h2 className="problem-reveal text-ink mb-7 font-[Cormorant] text-[clamp(44px,4.5vw,68px)] leading-[1.02] font-light tracking-[-0.03em]">
              You are not
              <br />
              <em className="text-mid italic">difficult</em>
              <br />
              to understand.
            </h2>

            <p className="problem-reveal max-w-95 text-[16px] leading-[1.85] font-light text-[#4a3f6b]">
              You&apos;ve been told to lose weight. Your tracker assumes 28 days.
              You&apos;ve explained your symptoms to three doctors and still walked out
              feeling unheard. Oviya starts where that frustration begins.
            </p>
          </div>

          {/* Right */}
          <div className="border-border-light md:-ml-px md:border-l">
            {cards.map((c, index) => (
              <div
                key={c.n}
                {...hoverProps}
                className={`problem-reveal group border-border-light hover:bg-blush relative overflow-hidden border-b px-8 py-9 transition-colors duration-300 last:border-b-0 md:px-12 reveal-delay-${index + 1}`}
              >
                {/* Left gradient line */}
                <div className="from-rose to-soft absolute top-0 bottom-0 left-0 w-0.5 origin-top scale-y-0 bg-linear-to-b transition-transform duration-500 group-hover:scale-y-100" />

                {/* Number */}
                <div className="text-pale mb-3 font-[Cormorant] text-[11px] tracking-[0.15em] italic">
                  — {c.n}. {c.title}
                </div>

                {/* Heading */}
                <h3 className="text-ink mb-2 font-[Cormorant] text-[22px] font-medium tracking-[-0.01em]">
                  {c.h}
                </h3>

                {/* Text */}
                <p className="text-[14px] leading-[1.75] font-light text-[#4a3f6b]">
                  {c.p}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Problem;
