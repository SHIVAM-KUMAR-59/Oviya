'use client';

import React, { useState, useEffect } from 'react';
import { ArrowRight, CircleCheck, Loader2 } from 'lucide-react';
import { useApi } from '@/hooks/useApi';
import { useToast } from '@/context/ToastContext';

type HoverProps = {
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};

interface CTAProps {
  hoverProps?: HoverProps;
}

const tags = ['Founding members', 'Shape the roadmap', 'Priority access'];

const CTA = ({ hoverProps }: CTAProps) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { error: showError } = useToast();

  const { loading, execute: joinWaitlist } = useApi('post', {
    onSuccess: () => {
      setSubmitted(true);
      setEmail('');
    },
    onError: (message) => showError(message),
  });

  const isValidEmail = (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      showError('Please enter a valid email address.');
      return;
    }
    await joinWaitlist('/waitlist', { email });
  };

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
    document.querySelectorAll('.cta-reveal').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="cta" className="bg-cream py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-16">
        <div className="cta-reveal border-border-light relative overflow-hidden border bg-[radial-gradient(ellipse_70%_60%_at_80%_50%,rgba(107,79,160,0.08),transparent_60%),var(--parchment)] px-10 py-16 md:px-20 md:py-24">
          {/* Top gradient line */}
          <div className="pointer-events-none absolute top-0 right-20 left-20 h-0.5 bg-[linear-gradient(90deg,transparent,var(--rose),var(--soft),transparent)]" />

          {/* Big background text */}
          <span className="pointer-events-none absolute -right-2.5 -bottom-7.5 font-serif text-[240px] leading-none font-light tracking-[-0.04em] text-[rgba(197,178,232,0.06)] italic select-none">
            OVIYA
          </span>

          {/* Grid */}
          <div className="relative z-10 grid items-center gap-16 md:grid-cols-2 md:gap-24">
            {/* Left */}
            <div>
              <h2 className="cta-reveal text-ink mb-5 font-serif text-[clamp(44px,4.5vw,68px)] leading-[1.02] font-light tracking-[-0.04em]">
                Be first.
                <br />
                <em className="text-mid italic">Shape</em> what
                <br />
                comes next.
              </h2>
              <p className="cta-reveal text-[16px] leading-[1.85] font-light text-[#4a3f6b]">
                Founding users get priority access, direct input on features, and the
                chance to build something that will genuinely change how PCOS is managed
                in India.
              </p>
            </div>

            {/* Right */}
            <div>
              {/* Tags */}
              <div className="cta-reveal mb-7 hidden flex-wrap gap-2 md:flex">
                {tags.map((t) => (
                  <span
                    key={t}
                    className="border-border-dark text-mid hover:bg-blush rounded-md border px-3.5 py-1 text-[10px] tracking-[0.16em] uppercase transition-colors duration-200"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Form */}
              <div className="cta-reveal">
                {submitted ? (
                  <div className="flex items-center gap-3 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-5 py-4">
                    <CircleCheck
                      size={18}
                      className="shrink-0 text-emerald-500"
                      strokeWidth={1.5}
                    />
                    <p className="text-sm font-light text-emerald-700">
                      You&apos;re on the list! We&apos;ll reach out when Oviya launches.
                    </p>
                  </div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    className="flex w-full flex-col gap-4 md:flex-row md:gap-0"
                  >
                    <input
                      type="email"
                      placeholder="Your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={loading}
                      {...hoverProps}
                      className="border-border-light text-ink placeholder:text-soft focus:border-mid flex-1 rounded-md border bg-[rgba(74,47,122,0.04)] px-5 py-4 text-[14px] font-light outline-none disabled:opacity-50 md:rounded-none md:rounded-l-lg md:border-r-0"
                    />
                    <button
                      type="submit"
                      disabled={loading}
                      {...hoverProps}
                      className="bg-violet hover:opacity-90 border-none disabled:bg-violet/50 disabled:border-violet/50 cursor-pointer rounded-md border px-7 py-4 text-[11px] tracking-[0.2em] whitespace-nowrap text-white uppercase transition-all duration-200 disabled:cursor-not-allowed md:rounded-none md:rounded-r-lg"
                    >
                      {loading ? (
                        <span className="flex items-center justify-center gap-2">
                          <Loader2 size={14} className="animate-spin" />
                          Joining…
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          Join Waitlist
                          <ArrowRight size={14} strokeWidth={2.5} />
                        </span>
                      )}
                    </button>
                  </form>
                )}
              </div>

              {/* Note */}
              {!submitted && (
                <p className="cta-reveal text-soft mt-3 text-[10px] tracking-[0.16em] uppercase">
                  No spam · Just early updates when we open
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
