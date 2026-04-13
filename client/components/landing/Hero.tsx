'use client';

import { useState } from 'react';

export default function Hero() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    // TODO: connect to backend / form service
    setSubmitted(true);
    setEmail('');
  };

  return (
    <section className="bg-bg relative overflow-hidden py-20">
      {/* Subtle background glow */}
      <div className="bg-primary-subtle absolute -top-25 left-1/2 h-75 w-150 -translate-x-1/2 rounded-full opacity-40 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 lg:px-6">
        <div className="grid items-center gap-12 md:grid-cols-2">
          {/* LEFT CONTENT */}
          <div>
            {/* Tagline */}
            <p className="text-primary-text mb-3 text-sm font-medium">
              Built for irregular cycles & PCOS
            </p>

            {/* Heading */}
            <h1 className="text-text-primary text-4xl leading-tight font-semibold md:text-5xl">
              Finally, a period tracker that
              <span className="text-primary block">understands your body</span>
            </h1>

            {/* Subtext */}
            <p className="text-text-secondary mt-5 max-w-md text-base leading-relaxed">
              Most apps assume a perfect 28-day cycle. Your body isn’t predictable — and
              that’s okay. Track your real patterns, understand your symptoms, and feel in
              control again.
            </p>

            {/* WAITLIST FORM */}
            <form
              onSubmit={handleSubmit}
              className="mt-8 flex w-full max-w-md items-center gap-2"
            >
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-border bg-surface text-text-primary placeholder:text-text-tertiary focus:ring-primary w-full rounded-md border px-4 py-2.5 text-sm transition-all outline-none focus:ring-2"
                required
              />

              <button
                type="submit"
                className="bg-primary text-text-on-primary hover:bg-primary-hover rounded-md px-4 py-2.5 text-sm font-semibold transition-all active:scale-[0.97]"
              >
                Join
              </button>
            </form>

            {/* Success state */}
            {submitted && (
              <p className="text-success mt-3 text-sm">You’re on the list 🤍</p>
            )}

            {/* Trust line */}
            <p className="text-text-tertiary mt-4 text-xs">
              No spam. Built by people who actually understand PCOS.
            </p>
          </div>

          {/* RIGHT SIDE — INTERACTIVE CARD */}
          <div className="relative">
            <div className="border-border bg-surface-raised rounded-xl border p-6 shadow-md">
              {/* Card Title */}
              <p className="text-text-secondary mb-2 text-sm">Your cycle prediction</p>

              {/* Big Insight */}
              <h3 className="text-text-primary text-2xl font-semibold">
                June 24 – July 4
              </h3>

              {/* Context */}
              <p className="text-text-secondary mt-2 text-sm">
                Based on your last 3 cycles (40–50 days)
              </p>

              {/* Divider */}
              <div className="bg-border my-5 h-px" />

              {/* Symptoms preview */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Fatigue</span>
                  <span className="text-primary">High</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Acne</span>
                  <span className="text-primary">Moderate</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Mood</span>
                  <span className="text-primary">Low</span>
                </div>
              </div>

              {/* Insight */}
              <div className="bg-primary-subtle mt-5 rounded-md p-3">
                <p className="text-primary-text text-xs">
                  Your fatigue tends to increase in longer cycles
                </p>
              </div>
            </div>

            {/* Floating badge */}
            <div className="bg-primary text-text-on-primary absolute -top-4 -right-4 rounded-full px-3 py-1 text-xs shadow-md">
              PCOS-aware
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
