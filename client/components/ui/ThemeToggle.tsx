'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState<boolean>(false);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  if (!mounted || !resolvedTheme) return null;

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className={`relative flex h-7 w-13 items-center rounded-full p-0.75 transition-all duration-300 ease-in-out ${
        isDark
          ? 'border border-white/10 bg-white/10'
          : 'border border-black/10 bg-black/10'
      } `}
    >
      {/* Track shimmer */}
      <span
        className={`pointer-events-none absolute inset-0 rounded-full transition-all duration-300 ${
          isDark
            ? 'bg-[linear-gradient(135deg,rgba(255,255,255,0.04)_0%,transparent_60%)]'
            : 'bg-[linear-gradient(135deg,rgba(255,255,255,0.55)_0%,transparent_60%)]'
        } `}
      />

      {/* Knob */}
      <span
        className={`relative z-10 flex h-5.5 w-5.5 items-center justify-center rounded-full shadow-md transition-all duration-300 ${isDark ? 'translate-x-6 bg-white' : 'translate-x-0 bg-black'} `}
        style={{
          transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      >
        {/* Sun */}
        <Sun
          size={12}
          className={`absolute transition-all duration-200 ${
            isDark
              ? 'scale-75 rotate-30 opacity-0'
              : 'scale-100 rotate-0 text-white opacity-100'
          } `}
        />

        {/* Moon */}
        <Moon
          size={11}
          className={`absolute transition-all duration-200 ${
            isDark
              ? 'scale-100 rotate-0 text-black opacity-100'
              : 'scale-75 -rotate-30 opacity-0'
          } `}
        />
      </span>
    </button>
  );
}
