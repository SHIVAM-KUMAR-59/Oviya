'use client';

import { ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';

type HoverProps = {
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};

interface NavbarProps {
  hoverProps?: HoverProps;
}

const Navbar = ({ hoverProps }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    const revealElements = document.querySelectorAll('.navbar-reveal');
    revealElements.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <header
      className={`navbar-reveal fixed top-0 right-0 left-0 z-50 flex w-full items-center justify-center transition-all duration-500 ${
        scrolled
          ? 'border-b border-white/10 bg-ink/80 backdrop-blur-md py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 md:px-12 lg:px-20">

        {/* Logo */}
        <div
          className={`navbar-reveal text-lg md:text-xl tracking-[0.08em] font-medium transition-colors duration-300 ${
            scrolled ? 'text-white' : 'text-white'
          }`}
          style={{ fontFamily: 'Cormorant, serif' }}
        >
          Oviya
        </div>

        {/* Links */}
        <div className="hidden items-center gap-10 md:flex">
          {['The Problem:#problem', 'Features:#features', 'Our Story:#story'].map(
            (s) => {
              const [label, href] = s.split(':');
              return (
                <a
                  key={label}
                  href={href}
                  {...hoverProps}
                  className="navbar-reveal text-[11px] font-medium tracking-[0.12em] uppercase text-white/70 transition duration-300 hover:text-white"
                >
                  {label}
                </a>
              );
            },
          )}
        </div>

        {/* CTA */}
        <a
          href="#cta"
          {...hoverProps}
          className="navbar-reveal flex items-center justify-center gap-1 ml-4 rounded-md bg-violet px-6 py-2.5 text-[11px] tracking-[0.18em] uppercase text-white transition-all duration-200 hover:opacity-90"
        >
          Join Waitlist
          <ArrowRight className="mb-0.5" size={15} strokeWidth={1.5} />
        </a>

      </nav>
    </header>
  );
};

export default Navbar;