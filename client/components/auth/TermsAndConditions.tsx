import React from 'react';
import Reveal from './Reveal';

const TermsAndConditions = () => {
  return (
    <Reveal delay={350}>
      <p className="mt-4 text-center text-[11px] leading-[1.7] font-light text-[rgba(15,11,30,0.3)]">
        By continuing, you agree to Oviya&apos;s{' '}
        <a href="#" className="text-(--soft) underline underline-offset-2">
          Terms
        </a>{' '}
        and{' '}
        <a href="#" className="text-(--soft) underline underline-offset-2">
          Privacy Policy
        </a>
        . Your health data is yours, always.
      </p>
    </Reveal>
  );
};

export default TermsAndConditions;
