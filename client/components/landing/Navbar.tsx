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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className="sticky top-0 z-50 w-full"
      style={{
        background: scrolled ? 'var(--color-bg)' : 'transparent',
        borderBottom: scrolled
          ? '1px solid var(--color-border)'
          : '1px solid transparent',
        backdropFilter: scrolled ? 'blur(14px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(14px)' : 'none',
        transition:
          'background 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease, box-shadow 0.4s ease',
        boxShadow: scrolled ? '0 1px 24px rgba(0,0,0,0.06)' : 'none',
      }}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 lg:px-6">
        {/* Logo */}
        <a
          href="#"
          className="text-text font-semibold tracking-tight select-none"
          style={{ fontSize: 'clamp(16px, 2vw, 20px)', letterSpacing: '-0.03em' }}
        >
          Period
          <span style={{ color: 'var(--color-primary)', fontWeight: 800 }}>Track</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="group text-text-secondary hover:text-text relative rounded-md px-3 py-1.5 text-sm font-medium transition-colors duration-200"
              style={{ letterSpacing: '-0.01em' }}
            >
              {/* Hover pill bg */}
              <span
                className="absolute inset-0 rounded-md opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                style={{ background: 'var(--color-border)', opacity: 0 }}
                aria-hidden
              />
              <span className="relative z-10">{item}</span>

              {/* Underline */}
              <span
                className="absolute right-3 -bottom-px left-3 h-px origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"
                style={{ background: 'var(--color-primary)' }}
                aria-hidden
              />
            </a>
          ))}
        </div>

        {/* Right Actions */}
        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />

          <a
            href="#waitlist"
            className="relative overflow-hidden rounded-md px-4 py-2 text-sm font-semibold text-white select-none"
            style={{
              background: 'var(--color-primary)',
              letterSpacing: '-0.01em',
              transition: 'transform 0.18s ease, box-shadow 0.18s ease',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'scale(1.03)';
              (e.currentTarget as HTMLElement).style.boxShadow =
                '0 4px 16px rgba(var(--color-primary-rgb),0.35)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
              (e.currentTarget as HTMLElement).style.boxShadow = 'none';
            }}
            onMouseDown={(e) =>
              ((e.currentTarget as HTMLElement).style.transform = 'scale(0.97)')
            }
            onMouseUp={(e) =>
              ((e.currentTarget as HTMLElement).style.transform = 'scale(1.03)')
            }
          >
            {/* Shimmer */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.18) 50%, transparent 60%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 3s infinite',
              }}
            />
            <span className="relative z-10">Join Waitlist</span>
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          className="relative flex h-9 w-9 items-center justify-center rounded-md md:hidden"
          style={{
            border: '1px solid var(--color-border)',
            background: open ? 'var(--color-border)' : 'transparent',
            transition: 'background 0.2s ease',
            color: 'var(--color-text)',
          }}
        >
          {/* Animated icon swap */}
          <span
            style={{
              position: 'absolute',
              opacity: open ? 0 : 1,
              transform: open ? 'rotate(90deg) scale(0.5)' : 'rotate(0deg) scale(1)',
              transition:
                'opacity 0.2s ease, transform 0.25s cubic-bezier(0.22,1,0.36,1)',
            }}
          >
            <Menu size={17} />
          </span>
          <span
            style={{
              position: 'absolute',
              opacity: open ? 1 : 0,
              transform: open ? 'rotate(0deg) scale(1)' : 'rotate(-90deg) scale(0.5)',
              transition:
                'opacity 0.2s ease, transform 0.25s cubic-bezier(0.22,1,0.36,1)',
            }}
          >
            <X size={17} />
          </span>
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        aria-hidden={!open}
        className="md:hidden"
        style={{
          overflow: 'hidden',
          maxHeight: open ? 400 : 0,
          opacity: open ? 1 : 0,
          transition: 'max-height 0.4s cubic-bezier(0.16,1,0.3,1), opacity 0.3s ease',
          borderTop: open ? '1px solid var(--color-border)' : '1px solid transparent',
        }}
      >
        <div className="flex flex-col gap-1 px-4 pt-2 pb-5">
          {navItems.map((item, i) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setOpen(false)}
              className="text-text-secondary hover:text-text rounded-md px-3 py-2.5 text-sm font-medium transition-colors duration-150"
              style={{
                letterSpacing: '-0.01em',
                opacity: open ? 1 : 0,
                transform: open ? 'translateY(0)' : 'translateY(-8px)',
                transition: `opacity 0.3s ease ${i * 0.05 + 0.1}s, transform 0.35s cubic-bezier(0.22,1,0.36,1) ${i * 0.05 + 0.1}s, color 0.15s ease`,
              }}
            >
              {item}
            </a>
          ))}

          {/* Divider */}
          <div
            className="my-2"
            style={{
              height: 1,
              background: 'var(--color-border)',
              opacity: open ? 1 : 0,
              transition: `opacity 0.3s ease 0.25s`,
            }}
          />

          <div
            className="flex items-center justify-between px-1"
            style={{
              opacity: open ? 1 : 0,
              transform: open ? 'translateY(0)' : 'translateY(-8px)',
              transition:
                'opacity 0.3s ease 0.28s, transform 0.35s cubic-bezier(0.22,1,0.36,1) 0.28s',
            }}
          >
            <ThemeToggle />

            <a
              href="#waitlist"
              onClick={() => setOpen(false)}
              className="relative overflow-hidden rounded-md px-4 py-2 text-sm font-semibold text-white"
              style={{
                background: 'var(--color-primary)',
                letterSpacing: '-0.01em',
                transition: 'transform 0.15s ease',
              }}
              onMouseDown={(e) =>
                ((e.currentTarget as HTMLElement).style.transform = 'scale(0.97)')
              }
              onMouseUp={(e) =>
                ((e.currentTarget as HTMLElement).style.transform = 'scale(1)')
              }
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.18) 50%, transparent 60%)',
                  backgroundSize: '200% 100%',
                  animation: 'shimmer 3s infinite',
                }}
              />
              <span className="relative z-10">Join Waitlist</span>
            </a>
          </div>
        </div>
      </div>

      {/* Shimmer keyframe */}
      <style>{`
        @keyframes shimmer {
          0%   { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
      `}</style>
    </header>
  );
}
