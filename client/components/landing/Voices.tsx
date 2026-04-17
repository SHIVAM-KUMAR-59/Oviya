"use client";

import React, { useEffect } from "react";

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
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    const revealElements = document.querySelectorAll(".voices-reveal");
    revealElements.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section className="relative overflow-hidden bg-parchment py-28">
      
      {/* Big decorative quote */}
      <span className="pointer-events-none absolute -top-24 -left-16 text-[560px] leading-none text-[rgba(197,178,232,0.07)] font-light font-serif select-none">
        "
      </span>

      <div className="relative z-10 mx-auto max-w-6xl px-6 md:px-16">
        
        {/* Section Label */}
        <div className="voices-reveal mb-14 flex items-center gap-4 text-[10px] uppercase tracking-[0.32em] text-mid">
          110 women spoke. We listened.
          <div className="h-px flex-1 bg-pale" />
        </div>

        {/* Header */}
        <div className="voices-reveal mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          
          <h2 className="max-w-xl text-[clamp(40px,4vw,62px)] leading-[1.02] tracking-[-0.03em] text-ink font-serif font-light">
            What women with PCOS<br />
            <em className="italic text-mid">actually</em> said they needed.
          </h2>

          <div className="text-left md:text-right">
            <div className="text-[80px] leading-none tracking-[-0.04em] text-mid font-serif font-light">
              110
            </div>
            <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-soft">
              Interviews & surveys
            </div>
          </div>
        </div>

        {/* Quotes Grid */}
        <div className="grid gap-px border border-pale bg-pale md:grid-cols-3">
          {[
            {
              q: "I just want one app that doesn't treat me like I'm broken when my cycle is different every single month.",
              attr: "Mumbai · 26 · Diagnosed 2 years ago",
            },
            {
              q: "Every tracker assumes 28 days. Mine has never been 28 days. Not once in my entire life.",
              attr: "Bangalore · 29 · PCOS since college",
            },
            {
              q: "I want one place for symptoms, food, moods, and cycles — where someone actually connects the dots.",
              attr: "Delhi · 31 · Still searching for clarity",
            },
          ].map((q, i) => (
            <div
              key={i}
              {...hoverProps}
              className={`voices-reveal group bg-parchment px-9 py-11 transition-all duration-300 hover:-translate-y-1 hover:bg-blush reveal-delay-${i + 1}`}
            >
              {/* Quote mark */}
              <span className="mb-2 block text-[70px] leading-none text-pale font-serif font-light transition-colors duration-300 group-hover:text-mist">
                &ldquo;
              </span>

              {/* Text */}
              <p className="text-[20px] leading-relaxed italic text-ink font-serif">
                {q.q}
              </p>

              {/* Attribution */}
              <div className="mt-6 flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-[#6b5490]">
                <div className="h-px w-5 bg-pale" />
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
