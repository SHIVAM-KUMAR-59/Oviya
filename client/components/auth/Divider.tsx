import React from 'react';
import Reveal from './Reveal';

const Divider = () => {
  return (
    <Reveal delay={150}>
      <div className="mb-5 flex items-center gap-3">
        <div className="h-px flex-1 bg-[rgba(107,79,160,0.15)]" />

        <span className="text-[11px] tracking-[0.2em] text-[rgba(15,11,30,0.3)] uppercase">
          or
        </span>

        <div className="h-px flex-1 bg-[rgba(107,79,160,0.15)]" />
      </div>
    </Reveal>
  );
};

export default Divider;
