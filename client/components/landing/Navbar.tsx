'use client';

import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
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
    const handleScroll = () => setScrolled(window.scrollY >= 5);
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
      className={`navbar-reveal fixed top-0 z-50 flex w-full items-center justify-center transition-all duration-500 ${
        scrolled
          ? 'bg-ink/80 border-b border-white/10 py-3 backdrop-blur-md'
          : 'bg-transparent py-5'
      }`}
    >
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 lg:px-16">
        {/* Logo */}
        <div
          className={`navbar-reveal flex items-center justify-center gap-2 text-lg font-medium tracking-[0.08em] transition-colors duration-300 md:text-xl ${
            scrolled ? 'text-white' : 'text-white'
          }`}
          style={{ fontFamily: 'Cormorant, serif' }}
        >
          <Image src={'/logo.png'} alt="Logo" height={40} width={40} />
          Oviya
        </div>

        {/* Links */}
        <div className="hidden items-center gap-10 md:flex">
          {['The Problem:#problem', 'Features:#features', 'Our Story:#story'].map((s) => {
            const [label, href] = s.split(':');
            return (
              <a
                key={label}
                href={href}
                {...hoverProps}
                className="navbar-reveal text-[11px] font-medium tracking-[0.12em] text-white/70 uppercase transition duration-300 hover:text-white"
              >
                {label}
              </a>
            );
          })}
        </div>

        {/* CTA */}
        <a
          href="#cta"
          {...hoverProps}
          className="navbar-reveal bg-violet flex items-center justify-center gap-1 rounded-md px-6 py-2.5 text-[11px] tracking-[0.18em] text-white uppercase transition-all duration-200 hover:opacity-90"
        >
          Join Waitlist
          <ArrowRight className="mb-0.5" size={15} strokeWidth={1.5} />
        </a>
      </nav>
    </header>
  );
};

export default Navbar;
