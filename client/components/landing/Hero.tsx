'use client';

import { useState, useRef } from 'react';
import { Sparkles, ChevronDown, ArrowRight, Flower2 } from 'lucide-react';
import Navbar from './Navbar';

const PCOS_OPTIONS = [
  { value: '', label: 'I am joining because…' },
  { value: 'diagnosed', label: 'I have been diagnosed with PCOS' },
  { value: 'suspect', label: 'I suspect I have PCOS' },
  { value: 'irregular', label: 'I have irregular periods' },
  { value: 'supporting', label: "I'm supporting someone with PCOS" },
];

export default function HeroSection() {
  const [email, setEmail] = useState('');
  const [pcosStatus, setPcosStatus] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [statusError, setStatusError] = useState('');
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  const validateEmail = (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError('');
    setStatusError('');

    let hasError = false;
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.');
      hasError = true;
    }
    if (!pcosStatus) {
      setStatusError("Please let us know why you're joining.");
      hasError = true;
    }
    if (hasError) return;

    setLoading(true);
    await new Promise((r) => setTimeout(r, 1400));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div
      className="relative min-h-screen overflow-hidden bg-bg font-sans"
    >
      {/* Ambient background blobs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          className="absolute -top-32 -left-32 h-120 w-120 rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, #7F77DD 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        <div
          className="absolute top-1/2 -right-40 h-90 w-90 rounded-full opacity-15"
          style={{
            background: 'radial-gradient(circle, #9C27B0 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        <div
          className="absolute bottom-0 left-1/3 h-75 w-75 rounded-full opacity-10"
          style={{
            background: 'radial-gradient(circle, #534AB7 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
      </div>

      {/* ── Navbar ── */}
      <Navbar />
      {/* ── Hero ── */}
      <main
        ref={heroRef}
        id="waitlist"
        className="w-full max-w-7xl mx-auto relative z-10 flex min-h-screen flex-col items-center justify-center px-5 pt-24 pb-20 sm:px-8"
      >
        {/* Badge */}
        <div
          className="animate-fade-in mb-8 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-medium"
          style={{
            background: 'var(--color-primary-subtle)',
            color: 'var(--color-primary-text)',
            borderColor: 'var(--color-border)',
          }}
        >
          <Sparkles size={12} />
          Built for South Asian women with PCOS
        </div>

        {/* Headline */}
        <h1
          className="mb-5 max-w-3xl text-center text-4xl leading-tight font-bold sm:text-5xl md:text-6xl"
          style={{ color: 'var(--color-text-primary)', letterSpacing: '-0.02em' }}
        >
          Your cycle,{' '}
          <span
            className="relative inline-block"
            style={{ color: 'var(--color-primary)' }}
          >
            understood
            <svg
              aria-hidden="true"
              className="absolute -bottom-1 left-0 w-full"
              height="6"
              viewBox="0 0 200 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <path
                d="M2 4 Q50 1 100 4 Q150 7 198 4"
                stroke="var(--color-primary-light)"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </span>{' '}
          finally.
        </h1>

        {/* Subheadline */}
        <p
          className="mb-4 max-w-xl text-center text-base leading-relaxed sm:text-lg"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          Oviya is a PCOS-first period tracking app that adapts to <em>your</em> cycle —
          not a 28-day assumption. Get insights, doctor-ready reports, and a community
          that gets it.
        </p>

        {/* Social proof micro-line */}
        <p className="mb-10 text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
          Join 2,400+ women already on the waitlist
        </p>

        {/* ── Waitlist Form ── */}
        {submitted ? (
          <div
            className="animate-scale-in flex w-full max-w-md flex-col items-center gap-3 rounded-2xl border px-8 py-10 text-center"
            style={{
              background: 'var(--color-primary-subtle)',
              borderColor: 'var(--color-border)',
            }}
          >
            <div
              className="mb-1 flex h-12 w-12 items-center justify-center rounded-full"
              style={{ background: 'var(--color-primary)' }}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h2
              className="text-xl font-semibold"
              style={{ color: 'var(--color-text-primary)' }}
            >
              You&apos;re on the list!
            </h2>
            <p
              className="text-sm leading-relaxed"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              We&apos;ll reach out when Oviya launches. You deserve a tracker that
              actually works for your body.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex w-full max-w-md flex-col gap-3"
          >
            {/* Email input */}
            <div className="flex flex-col gap-1">
              <div
                className="relative flex items-center rounded-xl border transition-all duration-200"
                style={{
                  background: 'var(--color-bg)',
                  borderColor: emailError
                    ? 'var(--color-error)'
                    : focusedField === 'email'
                      ? 'var(--color-primary)'
                      : 'var(--color-border)',
                  boxShadow:
                    focusedField === 'email'
                      ? '0 0 0 3px var(--color-primary-subtle)'
                      : 'none',
                }}
              >
                <svg
                  className="absolute left-3.5 text-gray-400"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--color-text-tertiary)"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailError) setEmailError('');
                  }}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full rounded-xl bg-transparent py-3.5 pr-4 pl-10 text-sm outline-none"
                  style={{ color: 'var(--color-text-primary)' }}
                  aria-label="Email address"
                  aria-invalid={!!emailError}
                  aria-describedby={emailError ? 'email-error' : undefined}
                />
              </div>
              {emailError && (
                <p
                  id="email-error"
                  role="alert"
                  className="pl-1 text-xs"
                  style={{ color: 'var(--color-error)' }}
                >
                  {emailError}
                </p>
              )}
            </div>

            {/* PCOS status dropdown */}
            <div className="flex flex-col gap-1">
              <div
                className="relative flex items-center rounded-xl border transition-all duration-200"
                style={{
                  background: 'var(--color-bg)',
                  borderColor: statusError
                    ? 'var(--color-error)'
                    : focusedField === 'status'
                      ? 'var(--color-primary)'
                      : 'var(--color-border)',
                  boxShadow:
                    focusedField === 'status'
                      ? '0 0 0 3px var(--color-primary-subtle)'
                      : 'none',
                }}
              >
                <Flower2
                  size={16}
                  className="pointer-events-none absolute left-3.5"
                  style={{ color: 'var(--color-text-tertiary)' }}
                />
                <select
                  value={pcosStatus}
                  onChange={(e) => {
                    setPcosStatus(e.target.value);
                    if (statusError) setStatusError('');
                  }}
                  onFocus={() => setFocusedField('status')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full cursor-pointer appearance-none rounded-xl bg-transparent py-3.5 pr-9 pl-10 text-sm outline-none"
                  style={{
                    color: pcosStatus
                      ? 'var(--color-text-primary)'
                      : 'var(--color-text-tertiary)',
                  }}
                  aria-label="PCOS status"
                  aria-invalid={!!statusError}
                  aria-describedby={statusError ? 'status-error' : undefined}
                >
                  {PCOS_OPTIONS.map((opt) => (
                    <option
                      key={opt.value}
                      value={opt.value}
                      disabled={opt.value === ''}
                      style={{ color: 'var(--color-text-primary)' }}
                    >
                      {opt.label}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={15}
                  className="pointer-events-none absolute right-3.5"
                  style={{ color: 'var(--color-text-tertiary)' }}
                />
              </div>
              {statusError && (
                <p
                  id="status-error"
                  role="alert"
                  className="pl-1 text-xs"
                  style={{ color: 'var(--color-error)' }}
                >
                  {statusError}
                </p>
              )}
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="relative flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold transition-all duration-200 hover:opacity-90 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
              style={{
                background: 'var(--color-primary)',
                color: 'var(--color-text-on-primary)',
              }}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  >
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                  </svg>
                  Joining waitlist…
                </>
              ) : (
                <>
                  Join the Waitlist
                  <ArrowRight size={15} />
                </>
              )}
            </button>

            <p
              className="pt-0.5 text-center text-xs"
              style={{ color: 'var(--color-text-tertiary)' }}
            >
              No spam. We&apos;ll only email you when Oviya launches.
            </p>
          </form>
        )}

        {/* Feature pills */}
        <div className="mt-12 flex flex-wrap justify-center gap-2">
          {[
            'PCOS-aware cycle tracking',
            'Doctor-ready PDF reports',
            'Indian food database',
            'Symptom insights',
            'Community forum',
          ].map((feature) => (
            <span
              key={feature}
              className="rounded-full border px-3 py-1.5 text-xs"
              style={{
                color: 'var(--color-primary-text)',
                background: 'var(--color-primary-subtle)',
                borderColor: 'var(--color-border)',
              }}
            >
              {feature}
            </span>
          ))}
        </div>
      </main>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.96);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease both;
        }
        .animate-scale-in {
          animation: scale-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin {
          animation: spin 0.8s linear infinite;
        }
      `}</style>
    </div>
  );
}
