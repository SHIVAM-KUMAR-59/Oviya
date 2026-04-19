'use client';

import { useState, useEffect, useRef } from 'react';
import Navbar from './Navbar';
import Marquee from './Marquee';
import Problem from './Problem';
import Features from './Features';
import Voices from './Voices';
import Founder from './Founder';
import CTA from './CTA';
import Footer from './Footer';
import Hero from './Hero';

// ─── Reusable wave SVG shapes ─────────────────────────────────────────────
function Wave({ from, to, flip = false }: { from: string; to: string; flip?: boolean }) {
  return (
    <svg
      className={flip ? 'wave-flip' : 'wave'}
      style={{ background: from }}
      viewBox="0 0 1440 64"
      preserveAspectRatio="none"
      height="64"
      xmlns="http://www.w3.org/2000/svg"
    >
      {flip ? (
        <path d="M0,64 C480,0 960,0 1440,64 L1440,0 L0,0 Z" fill={to} />
      ) : (
        <path d="M0,0 C360,64 1080,64 1440,0 L1440,64 L0,64 Z" fill={to} />
      )}
    </svg>
  );
}

export default function OviyaLanding() {
  const [ctaForm, setCtaForm] = useState({ val: '', success: false });
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const rxRef = useRef(0);
  const ryRef = useRef(0);
  const mxRef = useRef(0);
  const myRef = useRef(0);

  // cursor
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mxRef.current = e.clientX;
      myRef.current = e.clientY;
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + 'px';
        cursorRef.current.style.top = e.clientY + 'px';
      }
    };
    document.addEventListener('mousemove', onMove);
    let raf: number;
    const anim = () => {
      rxRef.current += (mxRef.current - rxRef.current) * 0.1;
      ryRef.current += (myRef.current - ryRef.current) * 0.1;
      if (ringRef.current) {
        ringRef.current.style.left = rxRef.current + 'px';
        ringRef.current.style.top = ryRef.current + 'px';
      }
      raf = requestAnimationFrame(anim);
    };
    raf = requestAnimationFrame(anim);
    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  // hover cursor expansion
  const expandCursor = () => {
    if (cursorRef.current) {
      cursorRef.current.style.width = '18px';
      cursorRef.current.style.height = '18px';
    }
    if (ringRef.current) {
      ringRef.current.style.width = '54px';
      ringRef.current.style.height = '54px';
      ringRef.current.style.borderColor = 'var(--rose)';
      ringRef.current.style.opacity = '.8';
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
      ringRef.current.style.opacity = '.55';
    }
  };
  const hoverProps = {
    onMouseEnter: expandCursor,
    onMouseLeave: contractCursor,
  };

  const submitForm = (
    formState: { val: string; success: boolean },
    setForm: React.Dispatch<React.SetStateAction<{ val: string; success: boolean }>>,
  ) => {
    if (!formState.val.includes('@')) return;
    setForm({ val: '', success: true });
    setTimeout(() => setForm((f) => ({ ...f, success: false })), 3500);
  };

  return (
    <>
      <div id="cursor" ref={cursorRef} />
      <div id="cursor-ring" ref={ringRef} />

      {/* ── NAV ── */}
      <Navbar hoverProps={hoverProps} />

      {/* ── HERO ── */}
      <Hero hoverProps={hoverProps} />

      {/* ── MARQUEE ── */}
      <Marquee />

      {/* deep → cream wave */}
      <Wave from="var(--deep)" to="var(--cream)" />

      {/* ── PROBLEM ── */}
      <Problem hoverProps={hoverProps} />

      {/* cream → ink */}
      <Wave from="var(--cream)" to="var(--ink)" />

      {/* ── FEATURES ── */}
      <Features hoverProps={hoverProps} />

      {/* ink → parchment */}
      <Wave from="var(--ink)" to="var(--parchment)" />

      {/* ── VOICES ── */}
      <Voices hoverProps={hoverProps} />

      {/* parchment → ink */}
      <Wave from="var(--parchment)" to="var(--ink)" />

      {/* ── FOUNDER ── */}
      <Founder />

      {/* ink → cream */}
      <Wave from="var(--ink)" to="var(--cream)" />

      {/* ── CTA ── */}
      <CTA
        hoverProps={hoverProps}
        ctaForm={ctaForm}
        setCtaForm={setCtaForm}
        submitForm={submitForm}
      />

      {/* ── FOOTER ── */}
      <Footer />
    </>
  );
}
