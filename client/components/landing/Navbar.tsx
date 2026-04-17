import { useEffect, useRef, useState } from 'react';

const Navbar = () => {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  const expandCursor = () => {
    if (cursorRef.current) {
      cursorRef.current.style.width = '18px';
      cursorRef.current.style.height = '18px';
    }
    if (ringRef.current) {
      ringRef.current.style.width = '54px';
      ringRef.current.style.height = '54px';
      ringRef.current.style.borderColor = 'var(--rose)';
      ringRef.current.style.opacity = '0.8';
    }
  };

  const contractCursor = () => {
    if (cursorRef.current) {
      cursorRef.current.style.width = '10px';
      cursorRef.current.style.height = '10px';
    }
    if (ringRef.current) {
      ringRef.current.style.width = '36px';
      ringRef.current.style.height = '36px';
      ringRef.current.style.borderColor = 'var(--soft)';
      ringRef.current.style.opacity = '0.55';
    }
  };

  const hoverProps = {
    onMouseEnter: expandCursor,
    onMouseLeave: contractCursor,
  };

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 flex w-full items-center justify-center ${
        scrolled
          ? 'border-border-light border-b bg-[rgba(251,249,246,0.93)] py-3.5 backdrop-blur-xl'
          : 'bg-transparent py-5.5'
      }`}
    >
      <nav
        className={`mx-auto flex w-full max-w-7xl items-center justify-between px-6 transition-all duration-300 md:px-14`}
      >
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between">
          {/* Logo */}
          <div
            className={`text-[26px] font-medium tracking-[0.06em] transition-colors duration-500 ${
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
                    className={`text-[11px] tracking-[0.2em] uppercase transition-colors duration-300 ${
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
            className="bg-rose border-rose rounded-md hover:bg-rose-lt border px-6 py-2.5 text-[10px] tracking-[0.22em] text-white uppercase transition-all duration-200 hover:-translate-y-px"
          >
            Join Waitlist
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
