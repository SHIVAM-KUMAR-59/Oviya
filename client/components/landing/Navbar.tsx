'use client';

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
      className={`navbar-reveal fixed top-0 right-0 left-0 z-50 flex w-full items-center justify-center transition-all duration-700 ${
        scrolled
          ? 'border-border-light border-b bg-[rgba(251,249,246,0.93)] py-3.5 backdrop-blur-xl'
          : 'bg-transparent py-5.5'
      }`}
    >
      <nav
        className={`mx-auto flex w-full max-w-7xl items-center justify-between px-6 transition-all duration-300 md:px-14`}
      >
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
          {/* Logo */}
          <div
            className={`navbar-reveal text-[26px] font-medium tracking-[0.06em] transition-colors duration-500 ${
              scrolled ? 'text-ink' : 'text-white'
            }`}
            style={{ fontFamily: 'Cormorant, serif' }}
          >
            Oviya
          </div>

          {/* Links */}
          <div className="hidden items-center gap-9 md:flex">
            {['The Problem:#problem', 'Features:#features', 'Our Story:#story'].map(
              (s) => {
                const [label, href] = s.split(':');
                return (
                  <a
                    key={label}
                    href={href}
                    {...hoverProps}
                    className={`navbar-reveal text-[11px] tracking-[0.2em] uppercase transition-colors duration-300 ${
                      scrolled
                        ? 'text-mid hover:text-violet'
                        : 'text-white/50 hover:text-white'
                    }`}
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
            className="navbar-reveal bg-rose border-rose hover:bg-rose-lt rounded-md border px-6 py-2.5 text-[10px] tracking-[0.22em] text-white uppercase transition-all duration-200 hover:-translate-y-px"
          >
            Join Waitlist
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
