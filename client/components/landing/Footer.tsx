"use client";

import { useEffect } from "react";

const Footer = () => {
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
    const revealElements = document.querySelectorAll(".footer-reveal");
    revealElements.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <footer className="footer-reveal grid grid-cols-1 items-center gap-4 border-t border-white/5 bg-ink px-6 py-10 text-center md:grid-cols-[1fr_auto_1fr] md:px-16 md:text-left">
      
      {/* Logo */}
      <div className="text-[22px] font-serif font-light tracking-[0.08em] text-white">
        Oviya
      </div>

      {/* Center text */}
      <div className="text-center text-[10px] uppercase tracking-[0.2em] text-white/20">
        © 2025 · Built with women, not assumptions
      </div>

      {/* Right text */}
      <div className="text-[16px] font-serif italic text-mist md:text-right">
        For the 1 in 5. Finally.
      </div>
    </footer>
  );
};

export default Footer;
