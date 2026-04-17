"use client";

import { useState, useEffect, useRef } from "react";
import Navbar from "./Navbar";
import Marquee from "./Marquee";
import Problem from "./Problem";

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

  /* ── NAV ── */


  /* ── HERO ── */
  .hero {
    min-height: 100vh;
    background:
      radial-gradient(ellipse 80% 60% at 75% 0%,  rgba(107,79,160,.32) 0%, transparent 60%),
      radial-gradient(ellipse 50% 40% at  5% 100%, rgba(35,24,72,.65)   0%, transparent 55%),
      linear-gradient(155deg, var(--ink) 0%, var(--ink2) 45%, var(--deep) 100%);
    display: grid; grid-template-columns: 1.15fr .85fr;
    position: relative; overflow: hidden;
  }
  .hero::before {
    content:''; position:absolute; inset:0; z-index:1; pointer-events:none;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
  }
  .hero-ring {
    position:absolute; border-radius:50%;
    border:1px solid rgba(255,255,255,.035);
    pointer-events:none; z-index:1;
  }

  /* ── HERO LEFT ── */
  .hero-left {
    padding: 160px 72px 100px;
    display: flex; flex-direction: column; justify-content: center;
    position: relative; z-index: 2;
  }
  .hero-eyebrow {
    display: flex; align-items: center; gap: 14px;
    font-size: 10px; letter-spacing: .3em; text-transform: uppercase;
    color: var(--mist); font-weight: 400; margin-bottom: 36px;
    opacity: 0; animation: fadeUp .8s .2s ease forwards;
  }
  .eyebrow-line {
    width: 40px; height: 1px;
    background: linear-gradient(90deg, var(--rose), transparent);
  }
  .hero-h1 {
    font-family: 'Cormorant', serif;
    font-size: clamp(80px, 9vw, 136px); font-weight: 300;
    line-height: .88; letter-spacing: -.03em; color: #fff;
    opacity: 0; animation: fadeUp .9s .35s ease forwards;
  }
  .hero-h1 em   { font-style: italic; font-weight: 300; color: var(--mist); }
  .hero-h1 .rose-stroke {
    -webkit-text-stroke: 1px var(--rose); color: transparent; font-style: italic;
  }
  .hero-divider {
    width: 60px; height: 1px;
    background: linear-gradient(90deg, var(--rose), var(--soft), transparent);
    margin: 28px 0;
    opacity: 0; animation: fadeUp .8s .5s ease forwards;
  }
  .hero-tagline {
    font-family: 'Cormorant', serif;
    font-size: clamp(20px, 2.4vw, 29px); font-weight: 300; font-style: italic;
    color: rgba(255,255,255,.52); line-height: 1.45; max-width: 440px;
    opacity: 0; animation: fadeUp .8s .55s ease forwards;
  }
  .hero-body {
    font-size: 16px; line-height: 1.85;
    color: rgba(255,255,255,.42); max-width: 420px;
    margin: 26px 0 42px; font-weight: 300;
    opacity: 0; animation: fadeUp .8s .65s ease forwards;
  }
  .hero-form {
    display: flex; gap: 0; max-width: 440px;
    opacity: 0; animation: fadeUp .8s .75s ease forwards;
  }
  .hero-form input {
    flex: 1; padding: 17px 22px;
    background: rgba(255,255,255,.07);
    border: 1px solid rgba(255,255,255,.12); border-right: none;
    font-family: 'Jost', sans-serif; font-size: 14px; font-weight: 300;
    color: #fff; outline: none;
    transition: background .3s, border-color .3s;
  }
  .hero-form input::placeholder { color: rgba(255,255,255,.3); }
  .hero-form input:focus {
    background: rgba(255,255,255,.1);
    border-color: rgba(197,178,232,.45);
  }
  .hero-form button {
    padding: 17px 28px; background: var(--rose);
    border: 1px solid var(--rose); color: #fff;
    font-family: 'Jost', sans-serif; font-size: 11px; font-weight: 500;
    letter-spacing: .2em; text-transform: uppercase;
    cursor: none; white-space: nowrap;
    transition: background .3s, transform .2s;
  }
  .hero-form button:hover { background: var(--rose-lt); transform: translateX(2px); }
  .hero-meta {
    display: flex; align-items: center; gap: 18px; margin-top: 18px;
    opacity: 0; animation: fadeUp .8s .85s ease forwards;
  }
  .meta-dot { width: 3px; height: 3px; border-radius: 50%; background: var(--mist); opacity: .5; }
  .hero-meta span {
    font-size: 10px; letter-spacing: .18em;
    color: rgba(255,255,255,.28); text-transform: uppercase;
  }
  .hero-badges {
    display: flex; gap: 8px; flex-wrap: wrap; margin-top: 38px;
    opacity: 0; animation: fadeUp .8s .95s ease forwards;
  }
  .badge {
    font-size: 10px; letter-spacing: .18em; text-transform: uppercase;
    padding: 6px 16px; border: 1px solid rgba(197,178,232,.22);
    color: rgba(197,178,232,.55);
  }

  /* ── HERO RIGHT ── */
  .hero-right {
    display: flex; flex-direction: column; justify-content: center;
    padding: 140px 56px 100px 36px;
    position: relative; z-index: 2;
    opacity: 0; animation: fadeIn 1.2s .6s ease forwards;
  }
  .stats-block {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 1px; background: rgba(255,255,255,.07);
    border: 1px solid rgba(255,255,255,.07); margin-bottom: 20px;
  }
  .stat-cell {
    background: rgba(255,255,255,.03); padding: 26px 22px;
    transition: background .35s;
  }
  .stat-cell:hover { background: rgba(255,255,255,.07); }
  .stat-cell.wide {
    grid-column: span 2;
    border-top: 1px solid rgba(255,255,255,.07);
  }
  .stat-num {
    font-family: 'Cormorant', serif;
    font-size: 50px; font-weight: 300; color: #fff;
    line-height: 1; letter-spacing: -.03em;
  }
  .stat-num em { font-style: italic; color: var(--mist); }
  .stat-desc {
    font-size: 12px; line-height: 1.6;
    color: rgba(255,255,255,.35); margin-top: 7px; font-weight: 300;
  }
  .app-card {
    background: rgba(255,255,255,.04);
    border: 1px solid rgba(255,255,255,.08); overflow: hidden;
  }
  .app-card-header {
    padding: 12px 18px; border-bottom: 1px solid rgba(255,255,255,.05);
    display: flex; align-items: center; gap: 7px;
  }
  .acd { width: 6px; height: 6px; border-radius: 50%; }
  .app-card-title {
    font-size: 10px; letter-spacing: .2em; text-transform: uppercase;
    color: rgba(255,255,255,.22); margin-left: 6px;
  }
  .app-row {
    display: flex; align-items: center; gap: 12px;
    padding: 13px 18px; border-bottom: 1px solid rgba(255,255,255,.04);
    transition: background .25s;
  }
  .app-row:last-child { border-bottom: none; }
  .app-row:hover { background: rgba(255,255,255,.04); }
  .app-icon {
    width: 30px; height: 30px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 13px; flex-shrink: 0;
  }
  .ai-a { background: rgba(197,178,232,.14); }
  .ai-b { background: rgba(192,115,122,.14); }
  .ai-c { background: rgba(107,79,160,.14); }
  .row-label {
    font-size: 9px; letter-spacing: .12em; text-transform: uppercase;
    color: rgba(255,255,255,.3);
  }
  .row-val { font-size: 13px; color: rgba(255,255,255,.72); margin-top: 2px; font-weight: 300; }
  .app-bars { margin-left: auto; display: flex; gap: 3px; align-items: flex-end; }
  .bar { width: 4px; border-radius: 1px; background: rgba(255,255,255,.08); }
  .bar.on  { background: var(--soft); }
  .bar.half{ background: var(--mist); opacity: .45; }

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

  /* ── FEATURES ── */
  .features-section { background: var(--ink); padding: 120px 0; position: relative; }
  .features-section::before {
    content: ''; position: absolute; inset: 0; pointer-events: none;
    background:
      radial-gradient(ellipse 60% 50% at 90% 50%, rgba(74,47,122,.22), transparent 60%),
      radial-gradient(ellipse 40% 60% at  0%  0%, rgba(35,24, 72,.32), transparent 60%);
  }
  .features-section .section-label { color: var(--mist); }
  .features-section .section-label::after { background: rgba(197,178,232,.1); }
  .features-intro {
    display: grid; grid-template-columns: 1fr 1fr; gap: 80px;
    align-items: end; margin-bottom: 72px;
  }
  .features-intro h2 {
    font-family: 'Cormorant', serif;
    font-size: clamp(44px,4vw,64px); font-weight: 300;
    line-height: 1.02; letter-spacing: -.03em; color: #fff;
  }
  .features-intro h2 em { font-style: italic; color: var(--mist); }
  .features-intro p { font-size: 16px; line-height: 1.85; color: rgba(255,255,255,.42); font-weight: 300; }
  .features-grid {
    display: grid; grid-template-columns: repeat(4,1fr);
    gap: 1px; background: rgba(255,255,255,.06);
    border: 1px solid rgba(255,255,255,.06);
  }
  .feat {
    background: var(--ink); padding: 44px 32px;
    position: relative; overflow: hidden; transition: background .4s;
  }
  .feat::after {
    content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent, var(--rose), transparent);
    transform: scaleX(0); transition: transform .5s;
  }
  .feat:hover { background: var(--ink2); }
  .feat:hover::after { transform: scaleX(1); }
  .feat-num {
    font-family: 'Cormorant', serif; font-size: 60px; font-weight: 300; font-style: italic;
    color: rgba(255,255,255,.03); line-height: 1; margin-bottom: 18px; letter-spacing: -.04em;
    transition: color .4s;
  }
  .feat:hover .feat-num { color: rgba(192,115,122,.1); }
  .feat-icon { font-size: 22px; margin-bottom: 18px; display: block; transition: transform .35s; }
  .feat:hover .feat-icon { transform: scale(1.12) translateY(-2px); }
  .feat h3 {
    font-family: 'Cormorant', serif; font-size: 24px; font-weight: 500;
    color: #fff; margin-bottom: 14px; letter-spacing: -.01em; line-height: 1.15;
  }
  .feat p { font-size: 13px; line-height: 1.75; color: rgba(255,255,255,.45); font-weight: 300; }

  /* ── VOICES ── */
  .voices-section { background: var(--parchment); padding: 120px 0; position: relative; overflow: hidden; }
  .voices-section::before {
    content: '\u201C'; font-family: 'Cormorant', serif;
    font-size: 560px; font-weight: 300;
    color: rgba(197,178,232,.07);
    position: absolute; top: -100px; left: -60px; line-height: 1;
    pointer-events: none; z-index: 0;
  }
  .voices-section .section-label { color: var(--mid); z-index: 1; position: relative; }
  .voices-section .section-label::after { background: var(--pale); }
  .voices-header {
    display: flex; align-items: flex-end; justify-content: space-between;
    margin-bottom: 64px; position: relative; z-index: 1;
  }
  .voices-header h2 {
    font-family: 'Cormorant', serif;
    font-size: clamp(40px,4vw,62px); font-weight: 300;
    line-height: 1.02; letter-spacing: -.03em; color: var(--ink); max-width: 580px;
  }
  .voices-header h2 em { font-style: italic; color: var(--mid); }
  .voices-stat { text-align: right; }
  .voices-stat-num {
    font-family: 'Cormorant', serif; font-size: 80px; font-weight: 300;
    color: var(--mid); line-height: 1; letter-spacing: -.04em;
  }
  .voices-stat-label {
    font-size: 10px; letter-spacing: .18em; text-transform: uppercase;
    color: var(--soft); margin-top: 4px;
  }
  .quotes-grid {
    display: grid; grid-template-columns: repeat(3,1fr);
    gap: 1px; background: var(--pale); border: 1px solid var(--pale);
    position: relative; z-index: 1;
  }
  .quote {
    background: var(--parchment); padding: 44px 36px;
    position: relative; overflow: hidden;
    transition: background .4s, transform .45s;
  }
  .quote:hover { background: var(--blush); transform: translateY(-5px); }
  .quote-mark {
    font-family: 'Cormorant', serif; font-size: 70px; font-weight: 300;
    color: var(--pale); line-height: 1; margin-bottom: 10px; display: block;
    transition: color .4s;
  }
  .quote:hover .quote-mark { color: var(--mist); }
  .quote-text {
    font-family: 'Cormorant', serif; font-style: italic;
    font-size: 20px; line-height: 1.6; color: var(--ink); font-weight: 400;
  }
  .quote-attr {
    margin-top: 24px; font-size: 10px; letter-spacing: .18em; text-transform: uppercase;
    /* darkened for legibility */
    color: #6b5490; display: flex; align-items: center; gap: 10px;
  }
  .quote-attr::before { content: ''; width: 20px; height: 1px; background: var(--pale); }

  /* ── FOUNDER ── */
  .founder-section { background: var(--ink); padding: 120px 0; position: relative; overflow: hidden; }
  .founder-section::before {
    content: ''; position: absolute; top: -200px; right: -200px;
    width: 700px; height: 700px; border-radius: 50%;
    border: 1px solid rgba(197,178,232,.04);
  }
  .founder-section::after {
    content: ''; position: absolute; bottom: -80px; left: 0;
    width: 500px; height: 500px;
    background: radial-gradient(circle, rgba(74,47,122,.16), transparent 70%);
  }
  .founder-section .section-label { color: var(--mist); position: relative; z-index: 1; }
  .founder-section .section-label::after { background: rgba(197,178,232,.1); }
  .founder-grid {
    display: grid; grid-template-columns: 400px 1fr; gap: 96px;
    align-items: center; position: relative; z-index: 1;
  }
  .founder-portrait-wrap { position: relative; }
  .founder-portrait {
    aspect-ratio: 3/4;
    background: linear-gradient(160deg, var(--deep), var(--ink2));
    border: 1px solid rgba(197,178,232,.08);
    position: relative; overflow: hidden;
    display: flex; align-items: center; justify-content: center;
  }
  .founder-portrait::before {
    content: ''; position: absolute; inset: 0;
    background: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='15' cy='15' r='0.8' fill='%23ffffff' fill-opacity='0.022'/%3E%3C/svg%3E");
  }
  .portrait-monogram {
    font-family: 'Cormorant', serif; font-size: 140px; font-weight: 300; font-style: italic;
    color: rgba(197,178,232,.12); position: relative; z-index: 1;
  }
  .founder-caption {
    position: absolute; bottom: -1px; left: 0; right: 0;
    background: rgba(35,24,72,.92); backdrop-filter: blur(10px);
    padding: 18px 24px; border-top: 1px solid rgba(255,255,255,.06);
  }
  .founder-caption strong {
    display: block; font-size: 13px; color: #fff; font-weight: 400; letter-spacing: .05em;
  }
  .founder-caption span {
    font-size: 10px; color: rgba(255,255,255,.4); letter-spacing: .14em; text-transform: uppercase;
  }
  .founder-accent {
    position: absolute; top: 20px; right: -18px; width: 72px; height: 72px;
    border: 1px solid rgba(192,115,122,.3); border-radius: 50%;
  }
  .founder-content h2 {
    font-family: 'Cormorant', serif;
    font-size: clamp(40px,3.8vw,58px); font-weight: 300;
    line-height: 1.05; letter-spacing: -.03em; color: #fff; margin-bottom: 32px;
  }
  .founder-content h2 em { font-style: italic; color: var(--mist); }
  .founder-content p {
    font-size: 16px; line-height: 1.9; color: rgba(255,255,255,.48);
    font-weight: 300; margin-bottom: 20px;
  }
  .founder-sig {
    font-family: 'Cormorant', serif; font-style: italic;
    font-size: 26px; font-weight: 400; color: var(--mist);
    margin-top: 36px; padding-top: 36px;
    border-top: 1px solid rgba(197,178,232,.1);
  }

  /* ── CTA ── */
  .cta-section { background: var(--cream); padding: 120px 0; }
  .cta-box {
    background:
      radial-gradient(ellipse 70% 60% at 80% 50%, rgba(107,79,160,.08), transparent 60%),
      var(--parchment);
    border: 1px solid var(--border-light); padding: 96px 80px;
    position: relative; overflow: hidden;
  }
  .cta-box::before {
    content: ''; position: absolute; top: -1px; left: 80px; right: 80px; height: 2px;
    background: linear-gradient(90deg, transparent, var(--rose), var(--soft), transparent);
  }
  .cta-box::after {
    content: 'OVIYA'; font-family: 'Cormorant', serif;
    font-size: 240px; font-weight: 300; font-style: italic;
    color: rgba(197,178,232,.06);
    position: absolute; right: -10px; bottom: -30px;
    line-height: 1; pointer-events: none; letter-spacing: -.04em;
  }
  .cta-grid {
    display: grid; grid-template-columns: 1fr 1fr; gap: 96px;
    align-items: center; position: relative; z-index: 1;
  }
  .cta-left h2 {
    font-family: 'Cormorant', serif;
    font-size: clamp(44px,4.5vw,68px); font-weight: 300;
    line-height: 1.02; letter-spacing: -.04em; color: var(--ink); margin-bottom: 20px;
  }
  .cta-left h2 em { font-style: italic; color: var(--mid); }
  .cta-left p { font-size: 16px; line-height: 1.85; color: #4a3f6b; font-weight: 300; }
  .cta-tags { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 28px; }
  .cta-tag {
    font-size: 10px; letter-spacing: .16em; text-transform: uppercase;
    padding: 5px 14px; border: 1px solid var(--border-light); color: var(--mid);
  }
  .cta-form { display: flex; gap: 0; width: 100%; }
  .cta-form input {
    flex: 1; padding: 17px 22px;
    background: rgba(74,47,122,.04);
    border: 1px solid var(--border-light); border-right: none;
    font-family: 'Jost', sans-serif; font-size: 14px; font-weight: 300;
    color: var(--ink); outline: none; transition: border-color .3s;
  }
  .cta-form input::placeholder { color: var(--soft); }
  .cta-form input:focus { border-color: var(--mid); }
  .cta-form button {
    padding: 17px 28px; background: var(--violet);
    border: 1px solid var(--violet); color: #fff;
    font-family: 'Jost', sans-serif; font-size: 11px; font-weight: 500;
    letter-spacing: .2em; text-transform: uppercase; cursor: none; white-space: nowrap;
    transition: background .3s, transform .2s;
  }
  .cta-form button:hover { background: var(--deep); transform: translateX(2px); }
  .form-note {
    font-size: 10px; letter-spacing: .16em; text-transform: uppercase;
    color: var(--soft); margin-top: 14px;
  }

  /* ── FOOTER ── */
  footer {
    background: var(--ink); padding: 44px 64px;
    display: grid; grid-template-columns: 1fr auto 1fr; align-items: center;
    border-top: 1px solid rgba(255,255,255,.04);
  }
  .footer-logo {
    font-family: 'Cormorant', serif; font-size: 22px; font-weight: 300;
    letter-spacing: .08em; color: #fff;
  }
  .footer-center {
    font-size: 10px; letter-spacing: .2em; text-transform: uppercase;
    color: rgba(255,255,255,.2); text-align: center;
  }
  .footer-right {
    text-align: right; font-family: 'Cormorant', serif; font-style: italic;
    font-size: 16px; color: var(--mist);
  }

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
const Wave = ({ from, to, flip = false }) => (
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

export default function OviyaLanding() {
  const [heroForm, setHeroForm] = useState({ val: "", success: false });
  const [ctaForm,  setCtaForm]  = useState({ val: "", success: false });
  const cursorRef = useRef(null);
  const ringRef   = useRef(null);
  const rxRef     = useRef(0);
  const ryRef     = useRef(0);
  const mxRef     = useRef(0);
  const myRef     = useRef(0);

  // cursor
  useEffect(() => {
    const onMove = (e) => {
      mxRef.current = e.clientX;
      myRef.current = e.clientY;
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + "px";
        cursorRef.current.style.top  = e.clientY + "px";
      }
    };
    document.addEventListener("mousemove", onMove);
    let raf;
    const anim = () => {
      rxRef.current += (mxRef.current - rxRef.current) * 0.1;
      ryRef.current += (myRef.current - ryRef.current) * 0.1;
      if (ringRef.current) {
        ringRef.current.style.left = rxRef.current + "px";
        ringRef.current.style.top  = ryRef.current + "px";
      }
      raf = requestAnimationFrame(anim);
    };
    raf = requestAnimationFrame(anim);
    return () => { document.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf); };
  }, []);

  // nav + reveal
  useEffect(() => {

    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
  }, []);

  // hover cursor expansion
  const expandCursor  = () => { if (cursorRef.current) { cursorRef.current.style.width = "18px"; cursorRef.current.style.height = "18px"; } if (ringRef.current) { ringRef.current.style.width = "54px"; ringRef.current.style.height = "54px"; ringRef.current.style.borderColor = "var(--rose)"; ringRef.current.style.opacity = ".8"; } };
  const contractCursor = () => { if (cursorRef.current) { cursorRef.current.style.width = "10px"; cursorRef.current.style.height = "10px"; } if (ringRef.current) { ringRef.current.style.width = "36px"; ringRef.current.style.height = "36px"; ringRef.current.style.borderColor = "var(--soft)"; ringRef.current.style.opacity = ".55"; } };
  const hoverProps = { onMouseEnter: expandCursor, onMouseLeave: contractCursor };

  const submitForm = (formState, setForm) => {
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
      <section className="hero min-h-screen grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="hero-ring hidden lg:block" style={{ width: 700, height: 700, top: -250, right: -150 }} />
        <div className="hero-ring hidden lg:block" style={{ width: 320, height: 320, bottom: 80, left: "38%" }} />
        <div className="hero-ring hidden lg:block" style={{ width: 160, height: 160, top: "32%", right: "18%" }} />

        <div className="hero-left max-w-6xl mx-auto px-6 lg:px-16 py-32 lg:py-0 flex flex-col justify-center relative z-10 w-full">
          <div className="hero-eyebrow">
            <div className="eyebrow-line" />
            Built for PCOS · Made in India
          </div>
          <h1 className="hero-h1">
            Ovi<em>ya</em><br />
            <span className="rose-stroke">Finally.</span>
          </h1>
          <div className="hero-divider" />
          <p className="hero-tagline">The companion women with PCOS<br />have been waiting for.</p>
          <p className="hero-body">
            Irregular cycles understood. Indian food respected. The emotional weight of PCOS finally
            acknowledged. Built for the 1&nbsp;in&nbsp;5 Indian women living with this.
          </p>
          <form
            className="hero-form"
            onSubmit={(e) => { e.preventDefault(); submitForm(heroForm, setHeroForm); }}
          >
            <input
              type="email" placeholder="Your email address"
              value={heroForm.val}
              onChange={(e) => setHeroForm((f) => ({ ...f, val: e.target.value }))}
              {...hoverProps}
            />
            <button type="submit" {...hoverProps}>
              {heroForm.success ? "✓ You're on the list" : "Request Access"}
            </button>
          </form>
          <div className="hero-meta">
            <div className="meta-dot"/><span>Private beta</span>
            <div className="meta-dot"/><span>Invite only</span>
            <div className="meta-dot"/><span>No spam</span>
          </div>
          <div className="hero-badges">
            {["PCOS-first","Evidence-led","Indian food aware","Irregular cycles"].map((b) => (
              <span key={b} className="badge">{b}</span>
            ))}
          </div>
        </div>

        <div className="hero-right">
          <div className="stats-block">
            <div className="stat-cell" {...hoverProps}>
              <div className="stat-num">1 <em>in</em> 5</div>
              <div className="stat-desc">Indian women live with PCOS — many undiagnosed for years</div>
            </div>
            <div className="stat-cell" {...hoverProps}>
              <div className="stat-num">110<em>+</em></div>
              <div className="stat-desc">Women shaped Oviya before a single line was written</div>
            </div>
            <div className="stat-cell wide" {...hoverProps}>
              <div className="stat-num" style={{ fontSize: 36 }}>28 <em>days?</em></div>
              <div className="stat-desc">Every other app assumes this. PCOS cycles don't. Oviya doesn't either.</div>
            </div>
          </div>
          <div className="app-card">
            <div className="app-card-header">
              <div className="acd" style={{ background: "#ff5f57" }}/>
              <div className="acd" style={{ background: "#febc2e" }}/>
              <div className="acd" style={{ background: "#28c840" }}/>
              <span className="app-card-title">Oviya · Your cycle, today</span>
            </div>
            {[
              { icon:"🌙", cls:"ai-a", label:"Cycle day",       val:"Day 34 · Luteal phase (estimated)", bars:[20,16,24,14,18], active:[1,1,1,0,0] },
              { icon:"🥗", cls:"ai-b", label:"Today's nutrition",val:"Methi roti · Moong dal · Jeera rice" },
              { icon:"💭", cls:"ai-a", label:"Mood & energy",   val:"Fatigued · Some brain fog today", bars:[20,12,16,10,14], active:[1,0,0,0,0] },
              { icon:"📋", cls:"ai-c", label:"Doctor report",   val:"Ready · 3 months of data logged" },
            ].map((row) => (
              <div key={row.label} className="app-row" {...hoverProps}>
                <div className={`app-icon ${row.cls}`}>{row.icon}</div>
                <div>
                  <div className="row-label">{row.label}</div>
                  <div className="row-val">{row.val}</div>
                </div>
                {row.bars && (
                  <div className="app-bars">
                    {row.bars.map((h, i) => (
                      <div key={i} className={`bar${row.active[i] ? " on" : ""}`} style={{ height: h }} />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <Marquee />

      {/* deep → cream wave */}
      <Wave from="var(--deep)" to="var(--cream)" />

      {/* ── PROBLEM ── */}
      <Problem/>
      {/* cream → ink */}
      <Wave from="var(--cream)" to="var(--ink)" flip />

      {/* ── FEATURES ── */}
      <section className="features-section" id="features">
        <div className="wrap">
          <div className="section-label reveal">What makes Oviya different</div>
          <div className="features-intro">
            <h2 className="reveal">Specific support,<br />not <em>generic</em> tracking.</h2>
            <p className="reveal rd2">Built from 110 real conversations. Every feature exists because someone needed it and couldn't find it anywhere else.</p>
          </div>
          <div className="features-grid">
            {[
              { n:"01", icon:"🔄", h:"Irregular Cycle Engine",   p:"Designed for cycles ranging from 19 to 60+ days. Learns your personal rhythm over time, not a population average." },
              { n:"02", icon:"🍛", h:"Indian Food Context",      p:"Nutrition insights built around dal, roti, sabzi, and fasting patterns — not imported Western food databases." },
              { n:"03", icon:"🧠", h:"Mood + Energy Log",        p:"Track brain fog, anxiety, fatigue alongside your cycle — and watch the connections emerge over weeks." },
              { n:"04", icon:"📄", h:"Doctor-Ready Reports",     p:"Walk into appointments with a clear, printable summary of cycle history, symptoms, and patterns over months." },
            ].map((f, i) => (
              <div key={f.n} className={`feat reveal rd${i+1}`} {...hoverProps}>
                <div className="feat-num">{f.n}</div>
                <span className="feat-icon">{f.icon}</span>
                <h3>{f.h}</h3>
                <p>{f.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ink → parchment */}
      <Wave from="var(--ink)" to="var(--parchment)" />

      {/* ── VOICES ── */}
      <section className="voices-section">
        <div className="wrap">
          <div className="section-label reveal">110 women spoke. We listened.</div>
          <div className="voices-header">
            <h2 className="reveal">What women with PCOS<br /><em>actually</em> said they needed.</h2>
            <div className="voices-stat reveal rd2">
              <div className="voices-stat-num">110</div>
              <div className="voices-stat-label">Interviews &amp; surveys</div>
            </div>
          </div>
          <div className="quotes-grid">
            {[
              { q:"I just want one app that doesn't treat me like I'm broken when my cycle is different every single month.", attr:"Mumbai · 26 · Diagnosed 2 years ago" },
              { q:"Every tracker assumes 28 days. Mine has never been 28 days. Not once in my entire life.",                attr:"Bangalore · 29 · PCOS since college" },
              { q:"I want one place for symptoms, food, moods, and cycles — where someone actually connects the dots.",      attr:"Delhi · 31 · Still searching for clarity" },
            ].map((q, i) => (
              <div key={i} className={`quote reveal rd${i+1}`} {...hoverProps}>
                <span className="quote-mark">"</span>
                <p className="quote-text">{q.q}</p>
                <div className="quote-attr">{q.attr}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* parchment → ink */}
      <Wave from="var(--parchment)" to="var(--ink)" flip />

      {/* ── FOUNDER ── */}
      <section className="founder-section" id="story">
        <div className="wrap">
          <div className="section-label reveal">Built by someone like you</div>
          <div className="founder-grid">
            <div className="founder-portrait-wrap reveal">
              <div className="founder-portrait">
                <div className="portrait-monogram">O</div>
                <div className="founder-caption">
                  <strong>Founder, Oviya</strong>
                  <span>Built in India · For Indian women</span>
                </div>
              </div>
              <div className="founder-accent" />
            </div>
            <div className="founder-content">
              <h2 className="reveal">Years of confusion became<br />a <em>reason</em> to build.</h2>
              <p className="reveal rd1">I was told to just lose weight. I used every cycle tracking app and none of them ever understood that my cycle is never the same length twice. I sat in doctor's offices explaining the same symptoms, year after year, and walked out with the same vague advice.</p>
              <p className="reveal rd2">I know how lonely PCOS can feel when nothing — no app, no doctor, no piece of advice — seems designed for you. That loneliness is what built Oviya.</p>
              <p className="reveal rd3">Not a side project. Not a feature tacked on somewhere. A company built from the ground up for the 1 in 5 women in India living with PCOS — and finally deserving better.</p>
              <div className="founder-sig reveal rd4">— With you, always.</div>
            </div>
          </div>
        </div>
      </section>

      {/* ink → cream */}
      <Wave from="var(--ink)" to="var(--cream)" />

      {/* ── CTA ── */}
      <section className="cta-section" id="cta">
        <div className="wrap">
          <div className="cta-box reveal">
            <div className="cta-grid">
              <div className="cta-left">
                <h2>Be first.<br /><em>Shape</em> what<br />comes next.</h2>
                <p>Founding users get priority access, direct input on features, and the chance to build something that will genuinely change how PCOS is managed in India.</p>
              </div>
              <div className="cta-right">
                <div className="cta-tags">
                  {["Founding members","Shape the roadmap","Priority access"].map((t) => (
                    <span key={t} className="cta-tag">{t}</span>
                  ))}
                </div>
                <form
                  className="cta-form"
                  onSubmit={(e) => { e.preventDefault(); submitForm(ctaForm, setCtaForm); }}
                >
                  <input
                    type="email" placeholder="Your email address"
                    value={ctaForm.val}
                    onChange={(e) => setCtaForm((f) => ({ ...f, val: e.target.value }))}
                    {...hoverProps}
                  />
                  <button type="submit" {...hoverProps}>
                    {ctaForm.success ? "✓ You're on the list" : "Join Waitlist"}
                  </button>
                </form>
                <p className="form-note">No spam · Just early updates when we open</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer>
        <div className="footer-logo">Oviya</div>
        <div className="footer-center">© 2025 · Built with women, not assumptions</div>
        <div className="footer-right">For the 1 in 5. Finally.</div>
      </footer>
    </>
  );
}