'use client';

import React, { useState, useEffect } from 'react';
import {
  Moon,
  Salad,
  CloudFog,
  ClipboardList,
  CircleCheck,
  ArrowRight,
  Loader2,
} from 'lucide-react';
import { useApi } from '@/hooks/useApi';
import { useToast } from '@/context/ToastContext';

const rows = [
  {
    icon: Moon,
    iconBg: 'bg-violet-500/10',
    iconColor: 'text-violet-400',
    label: 'Cycle day',
    val: 'Day 34 · Luteal phase (estimated)',
  },
  {
    icon: Salad,
    iconBg: 'bg-emerald-500/10',
    iconColor: 'text-emerald-400',
    label: "Today's nutrition",
    val: 'Methi roti · Moong dal · Jeera rice',
  },
  {
    icon: CloudFog,
    iconBg: 'bg-rose-400/10',
    iconColor: 'text-rose-400',
    label: 'Mood & energy',
    val: 'Fatigued · Some brain fog today',
  },
  {
    icon: ClipboardList,
    iconBg: 'bg-sky-400/10',
    iconColor: 'text-sky-400',
    label: 'Doctor report',
    val: 'Ready · 3 months of data logged',
  },
];

const stats = [
  {
    val: '1 in 5',
    desc: 'Indian women live with PCOS — many undiagnosed for years',
  },
  {
    val: '150+',
    desc: 'Women shaped Oviya before a single line was written',
  },
];

const badges = ['PCOS-first', 'Evidence-led', 'Indian food aware', 'Irregular cycles'];

type HoverProps = {
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};

interface HeroProps {
  hoverProps?: HoverProps;
}

const Hero = ({ hoverProps }: HeroProps) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { error: showError, success: showSuccess } = useToast();

  const { loading, execute: joinWaitlist } = useApi('post', {
    onSuccess: () => {
      setSubmitted(true);
      setEmail('');
      showSuccess('You have been added to the waitlist!');
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
    document.querySelectorAll('.hero-reveal').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <main className="bg-[radial-gradient(ellipse_80%_60%_at_75%_0%,rgba(107,79,160,0.32)_0%,transparent_60%),radial-gradient(ellipse_50%_40%_at_5%_100%,rgba(35,24,72,0.65)_0%,transparent_55%),linear-gradient(155deg,var(--ink)_0%,var(--ink2)_45%,var(--deep)_100%)] pt-10">
      <section className="relative mx-auto grid min-h-screen w-full max-w-7xl grid-cols-1 overflow-hidden lg:grid-cols-[1.15fr_0.85fr]">
        {/* Noise overlay */}
        <div className="pointer-events-none absolute inset-0 z-1 bg-[url('data:image/svg+xml,%3Csvg_viewBox%3D%270_0_200_200%27_xmlns%3D%27http://www.w3.org/2000/svg%27%3E%3Cfilter_id%3D%27n%27%3E%3CfeTurbulence_type%3D%27fractalNoise%27_baseFrequency%3D%270.9%27_numOctaves%3D%274%27/%3E%3C/filter%3E%3Crect_width%3D%27100%25%27_height%3D%27100%25%27_filter%3D%27url(%23n)%27/%3E%3C/svg%3E')] opacity-[0.03]" />

        {/* Decorative rings */}
        <div
          className="absolute hidden rounded-full border border-white/5 lg:block"
          style={{ width: 700, height: 700, top: -250, right: -150 }}
        />
        <div
          className="absolute hidden rounded-full border border-white/5 lg:block"
          style={{ width: 320, height: 320, bottom: 80, left: '38%' }}
        />
        <div
          className="absolute hidden rounded-full border border-white/5 lg:block"
          style={{ width: 160, height: 160, top: '32%', right: '18%' }}
        />

        {/* ── LEFT ── */}
        <div className="relative z-10 flex w-full flex-col justify-center px-6 py-32 lg:px-16 lg:py-0">
          <div className="hero-reveal text-mist mb-9 flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase">
            <div className="from-rose h-px w-10 bg-linear-to-r to-transparent" />
            Built for PCOS · Made in India
          </div>

          <h1 className="hero-reveal font-[Cormorant] text-[clamp(80px,9vw,136px)] leading-[0.88] font-medium tracking-[-0.03em] text-white md:font-light">
            Ovi<em className="text-mist italic">ya</em>
            <br />
            <span
              className="italic"
              style={{ WebkitTextStroke: '1px var(--rose)', color: 'transparent' }}
            >
              Finally.
            </span>
          </h1>

          <div className="hero-reveal from-rose via-soft my-7 h-px w-15 bg-linear-to-r to-transparent" />

          <p className="hero-reveal max-w-110 font-[Cormorant] text-[clamp(20px,2.4vw,29px)] leading-[1.45] text-white/50 italic">
            The companion women with PCOS
            <br />
            have been waiting for.
          </p>

          <p className="hero-reveal mt-6 mb-10 max-w-105 text-[16px] leading-[1.85] font-light text-white/40">
            Irregular cycles understood. Indian food respected. The emotional weight of
            PCOS finally acknowledged. Built for the 1&nbsp;in&nbsp;5 Indian women living
            with this.
          </p>

          {/* Form */}
          <div className="hero-reveal max-w-110">
            {submitted ? (
              <div className="flex items-center gap-3 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-5 py-4">
                <CircleCheck
                  size={18}
                  className="shrink-0 text-emerald-400"
                  strokeWidth={1.5}
                />
                <p className="text-sm font-light text-emerald-300">
                  You&apos;re on the list! We&apos;ll reach out when Oviya launches.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-2 md:flex-row md:gap-0"
              >
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  {...hoverProps}
                  className="flex-1 rounded-md border border-r-0 border-white/20 bg-white/10 px-5 py-4 text-sm font-light text-white outline-none placeholder:text-white/30 focus:border-[rgba(197,178,232,0.45)] focus:bg-white/15 disabled:opacity-50 md:rounded-none md:rounded-l-lg"
                />
                <button
                  type="submit"
                  disabled={loading}
                  {...hoverProps}
                  className="bg-violet cursor-pointer rounded-md border border-none px-7 py-4 text-[11px] font-medium tracking-[0.2em] whitespace-nowrap text-white uppercase transition duration-200 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 md:rounded-none md:rounded-r-lg"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 size={15} className="animate-spin" />
                      Joining…
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      Join for free
                      <ArrowRight size={15} strokeWidth={2.5} />
                    </span>
                  )}
                </button>
              </form>
            )}
          </div>

          <div className="hero-reveal mt-5 flex items-center gap-4 text-[10px] tracking-[0.18em] text-white/30 uppercase">
            <div className="bg-mist/50 h-0.75 w-0.75 rounded-full" />
            <span>Private beta</span>
            <div className="bg-mist/50 h-0.75 w-0.75 rounded-full" />
            <span>Invite only</span>
            <div className="bg-mist/50 h-0.75 w-0.75 rounded-full" />
            <span>No spam</span>
          </div>

          <div className="hero-reveal mt-8 flex flex-wrap gap-2">
            {badges.map((b) => (
              <span
                key={b}
                className="border border-[rgba(197,178,232,0.22)] px-4 py-1 text-[10px] tracking-[0.18em] text-[rgba(197,178,232,0.55)] uppercase transition duration-200 hover:bg-white/10"
              >
                {b}
              </span>
            ))}
          </div>
        </div>

        {/* ── RIGHT ── */}
        <div className="relative z-10 flex flex-col justify-center px-10 py-32 lg:py-0">
          <div className="hero-reveal mb-5 grid grid-cols-2 gap-px border border-white/10 bg-white/10">
            {stats.map((s) => (
              <div
                key={s.val}
                className="bg-white/5 p-6 transition hover:bg-white/10"
                {...hoverProps}
              >
                <div className="font-[Cormorant] text-5xl font-light text-white">
                  {s.val}
                </div>
                <p className="mt-2 text-xs text-white/40">{s.desc}</p>
              </div>
            ))}
            <div
              className="col-span-2 border-t border-white/10 bg-white/5 p-6 transition hover:bg-white/10"
              {...hoverProps}
            >
              <div className="font-[Cormorant] text-3xl font-light text-white">
                28 <em className="text-mist italic">days?</em>
              </div>
              <p className="mt-2 text-xs text-white/40">
                Every other app assumes this. PCOS cycles don&apos;t. Oviya doesn&apos;t
                either.
              </p>
            </div>
          </div>

          <div className="hero-reveal overflow-hidden border border-white/10 bg-white/5">
            <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
              <div className="h-2 w-2 rounded-full bg-red-400/70" />
              <div className="h-2 w-2 rounded-full bg-yellow-400/70" />
              <div className="h-2 w-2 rounded-full bg-green-400/70" />
              <span className="ml-2 text-[10px] tracking-[0.2em] text-white/30 uppercase">
                Oviya · Your cycle, today
              </span>
            </div>

            {rows.map((row) => {
              const Icon = row.icon;
              return (
                <div
                  key={row.label}
                  className="group flex items-center gap-3 border-b border-white/5 px-4 py-3 transition-colors duration-200 hover:bg-white/5"
                  {...hoverProps}
                >
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${row.iconBg} transition-transform duration-200 group-hover:scale-110`}
                  >
                    <Icon size={14} strokeWidth={1.5} className={row.iconColor} />
                  </div>
                  <div>
                    <div className="text-[9px] tracking-[0.12em] text-white/40 uppercase">
                      {row.label}
                    </div>
                    <div className="text-sm font-light text-white/70">{row.val}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Hero;
