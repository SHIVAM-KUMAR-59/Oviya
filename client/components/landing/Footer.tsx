'use client';

import Image from 'next/image';
import { useEffect } from 'react';

const Footer = () => {
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
    const revealElements = document.querySelectorAll('.footer-reveal');
    revealElements.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <footer className="footer-reveal bg-ink border-t border-white/5">
      <section className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-4 px-6 py-10 text-center md:grid-cols-[1fr_auto_1fr] md:px-16 md:text-left">
        {/* Logo */}
        <div className="flex items-center gap-2 font-serif text-[22px] font-light tracking-[0.08em] text-white max-sm:justify-center">
          <Image src={'/logo.png'} alt="Logo" height={40} width={40} />
          Oviya
        </div>

        {/* Center text */}
        <div className="text-center text-[10px] tracking-[0.2em] text-white/50 uppercase">
          © 2025 · Built with women, not assumptions
        </div>

        {/* Right text */}
        <div className="text-mist font-serif text-[16px] italic md:text-right">
          For the 1 in 5. Finally.
        </div>
      </section>
    </footer>
  );
};

export default Footer;
