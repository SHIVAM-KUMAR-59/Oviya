"use client";

import React, { useEffect } from "react";

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
      n: "01",
      title: "Cycle tracking",
      h: "Your cycle is never 28 days.",
      p: "It's 19 days, then 47, then 31. Every existing app breaks or makes you feel broken. Oviya learns your actual patterns — not a calendar assumption.",
    },
    {
      n: "02",
      title: "Symptoms",
      h: "Everything is connected.",
      p: "Acne, fatigue, hair fall, mood swings, sleep disruption. These aren't separate problems. Oviya tracks how each connects to your cycle.",
    },
    {
      n: "03",
      title: "Advice",
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
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    const revealElements = document.querySelectorAll(".problem-reveal");
    revealElements.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="problem"
      className="bg-cream pt-30"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        
        {/* Section Label */}
        <div className="problem-reveal text-mid tracking-[0.2em] uppercase text-xs mb-10">
          The problem no one is solving
        </div>

        {/* Layout */}
        <div className="grid md:grid-cols-2">
          
          {/* Left */}
          <div className="pr-0 md:pr-20 pb-20 border-b md:border-b-0 md:border-r border-border-light">
            <h2 className="problem-reveal font-[Cormorant] text-[clamp(44px,4.5vw,68px)] font-light leading-[1.02] tracking-[-0.03em] text-ink mb-7">
              You are not<br />
              <em className="italic text-mid">difficult</em><br />
              to understand.
            </h2>

            <p className="problem-reveal text-[16px] leading-[1.85] text-[#4a3f6b] font-light max-w-95">
              You&apos;ve been told to lose weight. Your tracker assumes 28 days. You&apos;ve explained your
              symptoms to three doctors and still walked out feeling unheard. Oviya starts where
              that frustration begins.
            </p>
          </div>

          {/* Right */}
          <div className="md:border-l border-border-light md:-ml-px">
            {cards.map((c, index) => (
              <div
                key={c.n}
                {...hoverProps}
                className={`problem-reveal group relative overflow-hidden px-8 md:px-12 py-9 border-b border-border-light last:border-b-0 transition-colors duration-300 hover:bg-blush reveal-delay-${index + 1}`}
              >
                {/* Left gradient line */}
                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-linear-to-b from-rose to-soft scale-y-0 origin-top transition-transform duration-500 group-hover:scale-y-100" />

                {/* Number */}
                <div className="font-[Cormorant] text-[11px] italic tracking-[0.15em] text-pale mb-3">
                  — {c.n}. {c.title}
                </div>

                {/* Heading */}
                <h3 className="font-[Cormorant] text-[22px] font-medium text-ink mb-2 tracking-[-0.01em]">
                  {c.h}
                </h3>

                {/* Text */}
                <p className="text-[14px] leading-[1.75] text-[#4a3f6b] font-light">
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