import React from 'react';

const Marquee = () => {
  const marqueeItems = [
    'Irregular cycles understood',
    'Indian food intelligence',
    'Mood & energy tracking',
    'Doctor-ready reports',
    'No 28-day assumptions',
    'Built with 150+ women',
    'Evidence-led care',
  ];

  return (
    <div className="bg-deep overflow-hidden border-y border-white/5 py-3.5">
      <div className="flex w-max animate-[marquee_40s_linear_infinite] hover:[animation-play-state:paused]">
        {[...marqueeItems, ...marqueeItems].map((text, i) => (
          <div key={i} className="flex items-center gap-7 px-7">
            <span className="text-[10px] font-light tracking-[0.26em] whitespace-nowrap text-white/40 uppercase">
              {text}
            </span>
            <div className="bg-rose h-1.25 w-1.25 shrink-0 rotate-45" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
