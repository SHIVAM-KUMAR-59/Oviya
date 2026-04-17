"use client";

import { useState, useEffect, useRef } from "react";
import Navbar from "./Navbar";
import Marquee from "./Marquee";
import Problem from "./Problem";
import Features from "./Features";
import Voices from "./Voices";
import Founder from "./Founder";
import CTA from "./CTA";
import Footer from "./Footer";
import Hero from "./Hero";

// ─── Component-specific styles (inline via style tag)
// These are styles that can't be easily done with Tailwind
const componentStyles = `

  ::selection { background: var(--mid); color: #fff; }

  /* ── CURSOR ── */
  #cursor {
    position: fixed; width: 10px; height: 10px;
    background: var(--rose); border-radius: 50%;
    pointer-events: none; z-index: 9999;
    transform: translate(-50%,-50%);
    transition: width .3s, height .3s, background .3s;
    mix-blend-mode: multiply;
  }
  #cursor-ring {
    position: fixed; width: 36px; height: 36px;
    border: 1px solid var(--soft); border-radius: 50%;
    pointer-events: none; z-index: 9998;
    transform: translate(-50%,-50%);
    transition: width .3s, height .3s, opacity .3s, border-color .3s;
    opacity: .55;
  }

  /* ── SECTION SHARED ── */
  section { position: relative; }
  .wrap { max-width: 1200px; margin: 0 auto; padding: 0 64px; }
  .section-label {
    font-size: 10px; letter-spacing: .32em; text-transform: uppercase;
    font-weight: 400; display: flex; align-items: center; gap: 16px;
    margin-bottom: 52px;
  }
  .section-label::after { content: ''; flex: 1; height: 1px; }

  /* ── WAVE CONNECTORS (all SVG inline) ── */
  .wave      { display: block; width: 100%; line-height: 0; margin-bottom: -1px; }
  .wave-flip { display: block; width: 100%; line-height: 0; margin-top: -1px; }

  /* ── SCROLL REVEAL ── */
  .reveal { opacity: 0; transform: translateY(30px); transition: opacity .9s, transform .9s; }
  .reveal.in { opacity: 1; transform: translateY(0); }
  .rd1 { transition-delay: .1s; } .rd2 { transition-delay: .2s; }
  .rd3 { transition-delay: .3s; } .rd4 { transition-delay: .4s; }

  /* ── KEYFRAMES ── */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }

  /* ── RESPONSIVE ── */
  @media (max-width: 1060px) {
    .hero { grid-template-columns: 1fr; }
    .hero-right { display: none; }
    .hero-left { padding: 140px 44px 100px; }
    nav, nav.scrolled { padding: 18px 32px; }
    .wrap { padding: 0 36px; }
    .problem-layout, .features-intro, .founder-grid, .cta-grid {
      grid-template-columns: 1fr; gap: 48px;
    }
    .problem-left {
      border-right: none; padding-right: 0;
      border-bottom: 1px solid var(--border-light); padding-bottom: 52px;
    }
    .problem-right { border-left: none; }
    .features-grid { grid-template-columns: 1fr 1fr; }
    .quotes-grid { grid-template-columns: 1fr; }
    .cta-box { padding: 64px 40px; }
    footer { grid-template-columns: 1fr; gap: 14px; text-align: center; padding: 36px; }
    .footer-right { text-align: center; }
    .voices-header { flex-direction: column; align-items: flex-start; gap: 24px; }
  }
  @media (max-width: 640px) {
    .features-grid { grid-template-columns: 1fr; }
    .hero-form { flex-direction: column; }
    .hero-form input { border-right: 1px solid rgba(255,255,255,.12); }
    .cta-form { flex-direction: column; }
    .cta-form input { border-right: 1px solid var(--border-light); }
    .stats-block { grid-template-columns: 1fr; }
    .stat-cell.wide { grid-column: auto; }
    nav .nav-links { display: none; }
  }
`;

// ─── Reusable wave SVG shapes ─────────────────────────────────────────────
function Wave({ from, to, flip = false }: { from: string; to: string; flip?: boolean }) {
  return (
    <svg
      className={flip ? "wave-flip" : "wave"}
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
  
  const [ctaForm, setCtaForm] = useState({ val: "", success: false });
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
        cursorRef.current.style.left = e.clientX + "px";
        cursorRef.current.style.top = e.clientY + "px";
      }
    };
    document.addEventListener("mousemove", onMove);
    let raf: number;
    const anim = () => {
      rxRef.current += (mxRef.current - rxRef.current) * 0.1;
      ryRef.current += (myRef.current - ryRef.current) * 0.1;
      if (ringRef.current) {
        ringRef.current.style.left = rxRef.current + "px";
        ringRef.current.style.top = ryRef.current + "px";
      }
      raf = requestAnimationFrame(anim);
    };
    raf = requestAnimationFrame(anim);
    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  // nav + reveal
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
  }, []);

  // hover cursor expansion
  const expandCursor = () => {
    if (cursorRef.current) {
      cursorRef.current.style.width = "18px";
      cursorRef.current.style.height = "18px";
    }
    if (ringRef.current) {
      ringRef.current.style.width = "54px";
      ringRef.current.style.height = "54px";
      ringRef.current.style.borderColor = "var(--rose)";
      ringRef.current.style.opacity = ".8";
    }
  };
  const contractCursor = () => {
    if (cursorRef.current) {
      cursorRef.current.style.width = "10px";
      cursorRef.current.style.height = "10px";
    }
    if (ringRef.current) {
      ringRef.current.style.width = "36px";
      ringRef.current.style.height = "36px";
      ringRef.current.style.borderColor = "var(--soft)";
      ringRef.current.style.opacity = ".55";
    }
  };
  const hoverProps = {
    onMouseEnter: expandCursor,
    onMouseLeave: contractCursor,
  };

  const submitForm = (
    formState: { val: string; success: boolean },
    setForm: React.Dispatch<React.SetStateAction<{ val: string; success: boolean }>>
  ) => {
    if (!formState.val.includes("@")) return;
    setForm({ val: "", success: true });
    setTimeout(() => setForm((f) => ({ ...f, success: false })), 3500);
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: componentStyles }} />
      <div id="cursor"      ref={cursorRef} />
      <div id="cursor-ring" ref={ringRef} />

      {/* ── NAV ── */}
      <Navbar />

      {/* ── HERO ── */}
      <Hero />
      {/* ── MARQUEE ── */}
      <Marquee />

      {/* deep → cream wave */}
      <Wave from="var(--deep)" to="var(--cream)" />

      {/* ── PROBLEM ── */}
      <Problem hoverProps={hoverProps} />
      {/* cream → ink */}
      <Wave from="var(--cream)" to="var(--ink)" flip />

      {/* ── FEATURES ── */}
      <Features hoverProps={hoverProps} />

      {/* ink → parchment */}
      <Wave from="var(--ink)" to="var(--parchment)" />

      {/* ── VOICES ── */}
      <Voices hoverProps={hoverProps}/>

      {/* parchment → ink */}
      <Wave from="var(--parchment)" to="var(--ink)" flip />

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