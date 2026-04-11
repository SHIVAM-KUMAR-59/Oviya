'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import ThemeToggle from '../ui/ThemeToggle';

const navItems = ['Home', 'Features', 'Pricing', 'Contact'];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={`border-border sticky top-0 z-50 w-full border-b transition-all duration-300 ${
        scrolled ? 'bg-bg/90 shadow-md backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 lg:px-6">
        {/* Logo */}
        <a
          href="#"
          className="text-text-primary text-[clamp(16px,2vw,20px)] font-semibold tracking-tight"
        >
          Period
          <span className="text-primary font-extrabold">Track</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="group text-text-secondary hover:text-text-primary relative rounded-md px-3 py-1.5 text-sm font-medium transition-colors duration-200"
            >
              <span className="relative z-10">{item}</span>

              {/* Underline */}
              <span className="bg-primary absolute right-3 -bottom-px left-3 h-px origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100" />
            </a>
          ))}
        </div>

        {/* Right Actions */}
        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />

          <a
            href="#waitlist"
            className="bg-primary text-text-on-primary hover:bg-primary-hover relative overflow-hidden rounded-md px-4 py-2 text-sm font-semibold transition-all duration-200 hover:shadow-md active:scale-[0.97]"
          >
            {/* Shimmer */}
            <span className="pointer-events-none absolute inset-0 animate-[shimmer_3s_linear_infinite] bg-[linear-gradient(105deg,transparent_40%,rgba(255,255,255,0.18)_50%,transparent_60%)] bg-size-[200%_100%]" />

            <span className="relative z-10">Join Waitlist</span>
          </a>
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          className={`border-border flex h-9 w-9 items-center justify-center rounded-md border transition-colors duration-200 md:hidden ${
            open ? 'bg-surface-raised' : 'bg-transparent'
          }`}
        >
          <Menu
            size={17}
            className={`absolute transition-all duration-200 ${
              open ? 'scale-50 rotate-90 opacity-0' : 'opacity-100'
            }`}
          />
          <X
            size={17}
            className={`absolute transition-all duration-200 ${
              open ? 'opacity-100' : 'scale-50 -rotate-90 opacity-0'
            }`}
          />
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`overflow-hidden transition-all duration-300 md:hidden ${
          open ? 'border-border max-h-100 border-t opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="flex flex-col gap-1 px-4 pt-2 pb-5">
          {navItems.map((item, i) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setOpen(false)}
              className={`text-text-secondary hover:text-text-primary rounded-md px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                open ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'
              }`}
              style={{ transitionDelay: `${i * 50 + 100}ms` }}
            >
              {item}
            </a>
          ))}

          {/* Divider */}
          <div
            className={`bg-border my-2 h-px transition-opacity duration-300 ${
              open ? 'opacity-100' : 'opacity-0'
            }`}
          />

          <div
            className={`flex items-center justify-between px-1 transition-all duration-300 ${
              open ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'
            }`}
            style={{ transitionDelay: '280ms' }}
          >
            <ThemeToggle />

            <a
              href="#waitlist"
              onClick={() => setOpen(false)}
              className="bg-primary text-text-on-primary hover:bg-primary-hover relative overflow-hidden rounded-md px-4 py-2 text-sm font-semibold active:scale-[0.97]"
            >
              <span className="pointer-events-none absolute inset-0 animate-[shimmer_3s_linear_infinite] bg-[linear-gradient(105deg,transparent_40%,rgba(255,255,255,0.18)_50%,transparent_60%)] bg-size-[200%_100%]" />
              <span className="relative z-10">Join Waitlist</span>
            </a>
          </div>
        </div>
      </div>

      {/* Keyframe */}
      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
      `}</style>
    </header>
  );
}
