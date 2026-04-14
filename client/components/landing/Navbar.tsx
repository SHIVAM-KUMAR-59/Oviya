import { ArrowRight, Flower2, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react'
import ThemeToggle from '../ui/ThemeToggle';

const NAV_LINKS = ['Hero', 'Features', 'About', 'Community', 'Blog'];

const Navbar = () => {
      const [menuOpen, setMenuOpen] = useState(false);
      const [scrolled, setScrolled] = useState(false);

      useEffect(() => {
          const handleScroll = () => setScrolled(window.scrollY > 20);
          window.addEventListener('scroll', handleScroll, { passive: true });
          return () => window.removeEventListener('scroll', handleScroll);
        }, []);
  return (
    <header
        className="fixed top-0 right-0 left-0 z-50 transition-all duration-300 bg-transparent"
        style={{
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled
            ? '1px solid var(--color-border-subtle)'
            : '1px solid transparent',
        }}
      >
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
          {/* Logo */}
          <a href="#" className="group flex items-center gap-2" aria-label="Oviya home">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-105"
              style={{ background: 'var(--color-primary)' }}
            >
              <Flower2 size={16} color="white" strokeWidth={2} />
            </div>
            <span
              className="text-lg font-semibold tracking-tight"
              style={{ color: 'var(--color-text-primary)' }}
            >
              Oviya
            </span>
          </a>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link}>
                <a
                  href={`#${link.toLowerCase()}`}
                  className="hover:bg-primary-subtle rounded-lg px-4 py-2 text-sm transition-all duration-150"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <div className="flex items-center justify-center gap-6">
            <ThemeToggle />
            <a
              href="#waitlist"
              className="hidden items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-medium transition-all duration-150 hover:opacity-90 active:scale-95 md:inline-flex"
              style={{
                background: 'var(--color-primary)',
                color: 'var(--color-text-on-primary)',
              }}
            >
              Join Waitlist
              <ArrowRight size={14} />
            </a>

            {/* Mobile menu toggle */}
            <button
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMenuOpen((v) => !v)}
              className="rounded-lg p-2 transition-colors duration-150 md:hidden"
              style={{ color: 'var(--color-text-primary)' }}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>

        {/* Mobile drawer */}
        <div
          className={`overflow-hidden transition-all duration-300 md:hidden ${
            menuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
          }`}
          style={{
            background: 'rgba(255,255,255,0.97)',
            backdropFilter: 'blur(16px)',
            borderBottom: '1px solid var(--color-border-subtle)',
          }}
        >
          <ul className="flex flex-col gap-1 px-5 pt-2 pb-4">
            {NAV_LINKS.map((link) => (
              <li key={link}>
                <a
                  href={`#${link.toLowerCase()}`}
                  onClick={() => setMenuOpen(false)}
                  className="hover:bg-primary-subtle block rounded-lg px-3 py-2.5 text-sm transition-colors duration-150"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  {link}
                </a>
              </li>
            ))}
            <li className="pt-1">
              <a
                href="#waitlist"
                onClick={() => setMenuOpen(false)}
                className="flex w-full items-center justify-center gap-1.5 rounded-xl py-2.5 text-sm font-medium transition-all duration-150 active:scale-95"
                style={{
                  background: 'var(--color-primary)',
                  color: 'var(--color-text-on-primary)',
                }}
              >
                Join Waitlist <ArrowRight size={14} />
              </a>
            </li>
          </ul>
        </div>
      </header>

  )
}

export default Navbar