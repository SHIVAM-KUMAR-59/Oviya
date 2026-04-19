'use client';

import { useEffect } from 'react';

const Footer = () => {
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
    const revealElements = document.querySelectorAll('.footer-reveal');
    revealElements.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <footer className="footer-reveal relative bg-[var(--ink)] border-t border-white/5 overflow-hidden">

      {/* subtle grain overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.04] bg-[url('/noise.png')]" />

      <section className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-6 px-6 py-14 text-center md:grid-cols-[1fr_auto_1fr] md:px-12 lg:px-20 md:text-left">
        
        {/* Logo */}
        <div className="font-[Cormorant] text-xl tracking-[0.08em] text-white">
          Oviya
        </div>

        {/* Center text */}
        <div className="text-[10px] tracking-[0.22em] text-white/50 uppercase">
          © {new Date().getFullYear()} · Built with women, not assumptions
        </div>

        {/* Right text */}
        <div className="font-[Cormorant] text-[15px] italic text-[var(--rose-pale)] md:text-right">
          For the 1 in 5. Finally.
        </div>

      </section>
    </footer>
  );
};

export default Footer;