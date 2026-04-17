import React from 'react';

const Marquee = () => {
  const marqueeItems = [
    "Irregular cycles understood",
    "Indian food intelligence",
    "Mood & energy tracking",
    "Doctor-ready reports",
    "No 28-day assumptions",
    "Built with 110+ women",
    "Evidence-led care",
  ];

  return (
    <div className="py-3.5 overflow-hidden bg-deep border-y border-white/5">
      <div className="flex w-max animate-[marquee_40s_linear_infinite] hover:[animation-play-state:paused]">
        {[...marqueeItems, ...marqueeItems].map((text, i) => (
          <div key={i} className="flex items-center gap-7 px-7">
            <span className="text-[10px] tracking-[0.26em] uppercase text-white/40 whitespace-nowrap font-light">
              {text}
            </span>
            <div className="w-1.25 h-1.25 bg-rose rotate-45 shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marquee;