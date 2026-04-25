'use client';

import React, { useState } from 'react';
import {
  ArrowRight,
  ArrowLeft,
  Mail,
  User,
  Loader2,
  CircleCheck,
  RefreshCw,
  ShieldCheck,
} from 'lucide-react';
import OtpInput from '@/components/auth/OtpInput';
import CountdownTimer from '@/components/auth/CountdownTimer';
import Reveal from '@/components/auth/Reveal';
import TermsAndConditions from '@/components/auth/TermsAndConditions';

// ─── Types ────────────────────────────────────────────────────────────────────

type Mode = 'login' | 'register';
type Step = 'credentials' | 'otp' | 'success';

// ─── Apple Icon ───────────────────────────────────────────────────────────────

const AppleIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.4c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4zm-3.1-17.6c.06 2.3-1.67 4.22-3.82 4.02-.31-2.1 1.7-4.13 3.82-4.02z" />
  </svg>
);

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
);

// ─── Main Auth Component ──────────────────────────────────────────────────────

export default function AuthPage() {
  const [mode, setMode] = useState<Mode>('login');
  const [step, setStep] = useState<Step>('credentials');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [otpExpired, setOtpExpired] = useState(false);
  const [timerKey, setTimerKey] = useState(0);
  const [revealKey, setRevealKey] = useState(0);

  const switchMode = (m: Mode) => {
    setMode(m);
    setStep('credentials');
    setName('');
    setEmail('');
    setOtp('');
    setRevealKey((k) => k + 1);
  };

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setStep('otp');
    setOtp('');
    setOtpExpired(false);
    setTimerKey((k) => k + 1);
    setRevealKey((k) => k + 1);
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length < 6) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setStep('success');
    setRevealKey((k) => k + 1);
  };

  const handleResend = async () => {
    setLoading(true);
    setOtp('');
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setOtpExpired(false);
    setTimerKey((k) => k + 1);
  };

  const isOtpComplete = otp.length === 6;

  const inputStyle = {
    width: '100%',
    borderRadius: '12px',
    border: '1.5px solid rgba(107,79,160,0.28)',
    background: 'rgba(255,255,255,0.75)',
    color: 'var(--ink)',
    fontSize: '14px',
    fontWeight: 300,
    fontFamily: 'inherit',
    padding: '14px 14px 14px 42px',
    outline: 'none',
    transition: 'border 0.2s, box-shadow 0.2s, background 0.2s',
  } as React.CSSProperties;

  return (
    <>
      {/* ── Page background ── */}
      <div
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 20% 0%, rgba(197,178,232,0.25) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 95% 100%, rgba(192,115,122,0.1) 0%, transparent 55%), linear-gradient(155deg, var(--cream) 0%, var(--blush) 40%, var(--pale) 100%)',
        }}
        className="relative flex min-h-screen w-full items-center justify-center overflow-hidden px-4 py-12"
      >
        {/* Decorative rings */}
        <div className="ring-float border-violet/10 absolute -top-50 -right-37.5 h-120 w-120 rounded-full border-2" />
        <div
          className="ring-float"
          style={{
            position: 'absolute',
            width: 260,
            height: 260,
            bottom: -70,
            left: -50,
            borderRadius: '50%',
            border: '1px solid rgba(192,115,122,0.09)',
            animationDelay: '2s',
            pointerEvents: 'none',
          }}
        />
        <div
          className="ring-float"
          style={{
            position: 'absolute',
            width: 130,
            height: 130,
            top: '30%',
            left: '6%',
            borderRadius: '50%',
            border: '1px solid rgba(155,127,212,0.1)',
            animationDelay: '4s',
            pointerEvents: 'none',
          }}
        />

        {/* Noise overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            opacity: 0.018,
            pointerEvents: 'none',
          }}
        />

        {/* ── Card ── */}
        <div
          key={revealKey}
          style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '420px' }}
        >
          {/* Brand above card */}
          {step !== 'success' && (
            <Reveal delay={0}>
              <div style={{ textAlign: 'center', marginBottom: '28px' }}>
                <div
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}
                >
                  <div
                    style={{
                      height: '1px',
                      width: '28px',
                      background: 'linear-gradient(to right, transparent, var(--rose))',
                    }}
                  />
                  <span
                    style={{
                      fontFamily: 'Cormorant, serif',
                      fontSize: '30px',
                      fontWeight: 500,
                      color: 'var(--ink)',
                    }}
                  >
                    Ovi<em style={{ color: 'var(--rose)' }}>ya</em>
                  </span>
                  <div
                    style={{
                      height: '1px',
                      width: '28px',
                      background: 'linear-gradient(to left, transparent, var(--rose))',
                    }}
                  />
                </div>
              </div>
            </Reveal>
          )}

          {/* Card body */}
          <div
            style={{
              borderRadius: '20px',
              border: '1px solid rgba(155,127,212,0.18)',
              padding: '32px 28px',
              background: 'rgba(255,255,255,0.75)',
              backdropFilter: 'blur(20px)',
              boxShadow:
                '0 4px 32px rgba(74,47,122,0.09), 0 1px 4px rgba(74,47,122,0.06), inset 0 1px 0 rgba(255,255,255,0.95)',
            }}
          >
            {/* ── CREDENTIALS STEP ── */}
            {step === 'credentials' && (
              <>
                <Reveal delay={60}>
                  <h1
                    style={{
                      fontFamily: 'Cormorant, serif',
                      fontSize: 'clamp(28px,5vw,36px)',
                      fontWeight: 500,
                      lineHeight: 1.15,
                      letterSpacing: '-0.02em',
                      color: 'var(--ink)',
                      marginBottom: '8px',
                    }}
                  >
                    {mode === 'login' ? (
                      'Welcome back'
                    ) : (
                      <>
                        Start your{' '}
                        <em className="shimmer-text" style={{ fontStyle: 'normal' }}>
                          journey
                        </em>
                      </>
                    )}
                  </h1>
                  <p
                    style={{
                      fontSize: '14px',
                      fontWeight: 300,
                      lineHeight: 1.7,
                      color: 'rgba(15,11,30,0.45)',
                      marginBottom: '24px',
                    }}
                  >
                    {mode === 'login'
                      ? "We'll send a one-time code to your email."
                      : 'Create your account — it takes under a minute.'}
                  </p>
                </Reveal>

                {/* Social buttons */}
                <Reveal delay={110}>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px',
                      marginBottom: '20px',
                    }}
                  >
                    {[
                      { icon: <GoogleIcon />, label: 'Continue with Google' },
                      { icon: <AppleIcon />, label: 'Continue with Apple' },
                    ].map(({ icon, label }) => (
                      <button
                        key={label}
                        className="text-ink flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl border border-[rgba(107,79,160,0.22)] bg-[rgba(255,255,255,0.85)] px-3 py-2 font-medium transition-all duration-150"
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = 'rgba(74,47,122,0.4)';
                          e.currentTarget.style.background = 'rgba(232,224,245,0.3)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = 'rgba(107,79,160,0.22)';
                          e.currentTarget.style.background = 'rgba(255,255,255,0.85)';
                        }}
                      >
                        {icon}
                        {label}
                      </button>
                    ))}
                  </div>
                </Reveal>

                {/* Divider */}
                <Reveal delay={150}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      marginBottom: '20px',
                    }}
                  >
                    <div
                      style={{
                        flex: 1,
                        height: '1px',
                        background: 'rgba(107,79,160,0.15)',
                      }}
                    />
                    <span
                      style={{
                        fontSize: '11px',
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        color: 'rgba(15,11,30,0.3)',
                      }}
                    >
                      or
                    </span>
                    <div
                      style={{
                        flex: 1,
                        height: '1px',
                        background: 'rgba(107,79,160,0.15)',
                      }}
                    />
                  </div>
                </Reveal>

                {/* Form */}
                <form onSubmit={handleCredentialsSubmit}>
                  {mode === 'register' && (
                    <Reveal delay={190}>
                      <div style={{ marginBottom: '14px' }}>
                        <label
                          style={{
                            display: 'block',
                            marginBottom: '6px',
                            fontSize: '11px',
                            letterSpacing: '0.15em',
                            textTransform: 'uppercase',
                            color: 'rgba(15,11,30,0.45)',
                          }}
                        >
                          Your name
                        </label>
                        <div style={{ position: 'relative' }}>
                          <User
                            size={15}
                            strokeWidth={1.5}
                            style={{
                              position: 'absolute',
                              left: '14px',
                              top: '50%',
                              transform: 'translateY(-50%)',
                              color: 'var(--soft)',
                              pointerEvents: 'none',
                            }}
                          />
                          <input
                            type="text"
                            placeholder="Priya Sharma"
                            value={name}
                            required
                            onChange={(e) => setName(e.target.value)}
                            style={inputStyle}
                            onFocus={(e) => {
                              e.currentTarget.style.borderColor = 'var(--violet)';
                              e.currentTarget.style.boxShadow =
                                '0 0 0 3px rgba(74,47,122,0.09)';
                              e.currentTarget.style.background = 'rgba(255,255,255,0.95)';
                            }}
                            onBlur={(e) => {
                              e.currentTarget.style.borderColor = 'rgba(107,79,160,0.28)';
                              e.currentTarget.style.boxShadow = 'none';
                              e.currentTarget.style.background = 'rgba(255,255,255,0.75)';
                            }}
                          />
                        </div>
                      </div>
                    </Reveal>
                  )}

                  <Reveal delay={mode === 'register' ? 230 : 190}>
                    <div style={{ marginBottom: '18px' }}>
                      <label
                        style={{
                          display: 'block',
                          marginBottom: '6px',
                          fontSize: '11px',
                          letterSpacing: '0.15em',
                          textTransform: 'uppercase',
                          color: 'rgba(15,11,30,0.45)',
                        }}
                      >
                        Email address
                      </label>
                      <div style={{ position: 'relative' }}>
                        <Mail
                          size={15}
                          strokeWidth={1.5}
                          style={{
                            position: 'absolute',
                            left: '14px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            color: 'var(--soft)',
                            pointerEvents: 'none',
                          }}
                        />
                        <input
                          type="email"
                          placeholder="you@example.com"
                          value={email}
                          required
                          onChange={(e) => setEmail(e.target.value)}
                          style={inputStyle}
                          onFocus={(e) => {
                            e.currentTarget.style.borderColor = 'var(--violet)';
                            e.currentTarget.style.boxShadow =
                              '0 0 0 3px rgba(74,47,122,0.09)';
                            e.currentTarget.style.background = 'rgba(255,255,255,0.95)';
                          }}
                          onBlur={(e) => {
                            e.currentTarget.style.borderColor = 'rgba(107,79,160,0.28)';
                            e.currentTarget.style.boxShadow = 'none';
                            e.currentTarget.style.background = 'rgba(255,255,255,0.75)';
                          }}
                        />
                      </div>
                    </div>
                  </Reveal>

                  <Reveal delay={mode === 'register' ? 270 : 230}>
                    <button
                      type="submit"
                      disabled={loading}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px',
                        width: '100%',
                        padding: '14px',
                        borderRadius: '12px',
                        border: 'none',
                        background:
                          'linear-gradient(135deg, var(--violet) 0%, var(--mid) 100%)',
                        color: 'white',
                        fontSize: '13px',
                        fontWeight: 500,
                        fontFamily: 'inherit',
                        letterSpacing: '0.03em',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        boxShadow: '0 4px 18px rgba(74,47,122,0.28)',
                        opacity: loading ? 0.65 : 1,
                        transition: 'opacity 0.2s, transform 0.15s',
                      }}
                    >
                      {loading ? (
                        <>
                          <Loader2
                            size={15}
                            style={{ animation: 'spin 1s linear infinite' }}
                          />
                          Sending code…
                        </>
                      ) : (
                        <>
                          {mode === 'login' ? 'Send one-time code' : 'Create account'}
                          <ArrowRight size={15} strokeWidth={2.5} />
                        </>
                      )}
                    </button>
                  </Reveal>
                </form>

                {/* Mode toggle */}
                <Reveal delay={310}>
                  <p
                    style={{
                      marginTop: '20px',
                      textAlign: 'center',
                      fontSize: '13px',
                      color: 'rgba(15,11,30,0.4)',
                    }}
                  >
                    {mode === 'login' ? (
                      <>
                        Don&apos;t have an account?{' '}
                        <button
                          onClick={() => switchMode('register')}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: 'var(--violet)',
                            fontWeight: 500,
                            fontFamily: 'inherit',
                            fontSize: '13px',
                            cursor: 'pointer',
                          }}
                        >
                          Register
                        </button>
                      </>
                    ) : (
                      <>
                        Already have an account?{' '}
                        <button
                          onClick={() => switchMode('login')}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: 'var(--violet)',
                            fontWeight: 500,
                            fontFamily: 'inherit',
                            fontSize: '13px',
                            cursor: 'pointer',
                          }}
                        >
                          Sign in
                        </button>
                      </>
                    )}
                  </p>
                </Reveal>
              </>
            )}

            {/* ── OTP STEP ── */}
            {step === 'otp' && (
              <>
                <Reveal delay={0}>
                  <button
                    onClick={() => {
                      setStep('credentials');
                      setOtp('');
                      setRevealKey((k) => k + 1);
                    }}
                    className="mb-5 flex cursor-pointer items-center gap-1.5 border-0 bg-transparent text-[11px] tracking-[0.12em] text-(--soft) uppercase"
                  >
                    <ArrowLeft size={13} strokeWidth={2} />
                    Back
                  </button>
                </Reveal>

                <Reveal delay={60}>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-[14px] bg-(--pale)">
                    <ShieldCheck
                      size={22}
                      strokeWidth={1.5}
                      className="text-(--violet)"
                    />
                  </div>

                  <h2 className="mb-2.5 font-[Cormorant,serif] text-[clamp(24px,4.5vw,32px)] leading-[1.2] font-medium tracking-[-0.02em] text-(--ink)">
                    Check your email
                  </h2>

                  <p className="mb-7 text-[14px] leading-[1.7] font-light text-[rgba(15,11,30,0.45)]">
                    We sent a 6-digit code to{' '}
                    <strong className="font-medium text-(--violet)">{email}</strong>. It
                    expires in 5 minutes.
                  </p>
                </Reveal>

                {/* OTP input */}
                <Reveal delay={120}>
                  <OtpInput value={otp} onChange={setOtp} />
                  {/* <input className='border-2 border-black w-full'/> */}
                </Reveal>

                {/* Timer */}
                <Reveal delay={160}>
                  <p
                    style={{
                      marginTop: '14px',
                      textAlign: 'center',
                      fontSize: '12px',
                      color: 'rgba(15,11,30,0.35)',
                    }}
                  >
                    Code expires in{' '}
                    <CountdownTimer
                      key={timerKey}
                      seconds={300}
                      onExpire={() => setOtpExpired(true)}
                    />
                  </p>
                </Reveal>

                {/* Verify button */}
                <Reveal delay={200}>
                  <form onSubmit={handleOtpSubmit} style={{ marginTop: '18px' }}>
                    <button
                      type="submit"
                      disabled={loading || !isOtpComplete || otpExpired}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px',
                        width: '100%',
                        padding: '14px',
                        borderRadius: '12px',
                        border: 'none',
                        background:
                          isOtpComplete && !otpExpired
                            ? 'linear-gradient(135deg, var(--violet) 0%, var(--mid) 100%)'
                            : 'rgba(74,47,122,0.2)',
                        color:
                          isOtpComplete && !otpExpired ? 'white' : 'rgba(74,47,122,0.5)',
                        fontSize: '13px',
                        fontWeight: 500,
                        fontFamily: 'inherit',
                        letterSpacing: '0.03em',
                        cursor:
                          isOtpComplete && !otpExpired && !loading
                            ? 'pointer'
                            : 'not-allowed',
                        boxShadow:
                          isOtpComplete && !otpExpired
                            ? '0 4px 18px rgba(74,47,122,0.25)'
                            : 'none',
                        transition: 'all 0.25s ease',
                      }}
                    >
                      {loading ? (
                        <>
                          <Loader2
                            size={15}
                            style={{ animation: 'spin 1s linear infinite' }}
                          />
                          Verifying…
                        </>
                      ) : (
                        <>
                          Verify &amp; continue
                          <ArrowRight size={15} strokeWidth={2.5} />
                        </>
                      )}
                    </button>
                  </form>
                </Reveal>

                {/* Resend */}
                <Reveal delay={240}>
                  <p
                    style={{
                      marginTop: '16px',
                      textAlign: 'center',
                      fontSize: '12px',
                      color: 'rgba(15,11,30,0.4)',
                    }}
                  >
                    Did&apos;nt receive it?{' '}
                    <button
                      onClick={handleResend}
                      disabled={loading}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        background: 'none',
                        border: 'none',
                        color: 'var(--rose)',
                        fontWeight: 500,
                        fontFamily: 'inherit',
                        fontSize: '12px',
                        cursor: loading ? 'not-allowed' : 'pointer',
                      }}
                    >
                      {loading ? (
                        <Loader2
                          size={11}
                          style={{ animation: 'spin 1s linear infinite' }}
                        />
                      ) : (
                        <RefreshCw size={11} />
                      )}
                      Resend code
                    </button>
                  </p>
                </Reveal>

                {/* Decorative dots */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '8px',
                    marginTop: '28px',
                  }}
                >
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="pulse-dot"
                      style={{
                        width: '5px',
                        height: '5px',
                        borderRadius: '50%',
                        background: 'var(--mist)',
                        animationDelay: `${i * 0.4}s`,
                      }}
                    />
                  ))}
                </div>
              </>
            )}

            {/* ── SUCCESS STEP ── */}
            {step === 'success' && (
              <div style={{ textAlign: 'center', padding: '16px 0' }}>
                <Reveal delay={0}>
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '10px',
                      marginBottom: '28px',
                    }}
                  >
                    <div
                      style={{
                        height: '1px',
                        width: '24px',
                        background: 'linear-gradient(to right, transparent, var(--rose))',
                      }}
                    />
                    <span
                      style={{
                        fontFamily: 'Cormorant, serif',
                        fontSize: '28px',
                        fontWeight: 500,
                        color: 'var(--ink)',
                      }}
                    >
                      Ovi<em style={{ color: 'var(--rose)' }}>ya</em>
                    </span>
                    <div
                      style={{
                        height: '1px',
                        width: '24px',
                        background: 'linear-gradient(to left, transparent, var(--rose))',
                      }}
                    />
                  </div>
                </Reveal>
                <Reveal delay={80}>
                  <div
                    className="check-pop"
                    style={{
                      width: '80px',
                      height: '80px',
                      borderRadius: '50%',
                      background:
                        'linear-gradient(135deg, var(--pale) 0%, var(--blush) 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 24px',
                      boxShadow: '0 8px 32px rgba(74,47,122,0.15)',
                    }}
                  >
                    <CircleCheck
                      size={34}
                      strokeWidth={1.5}
                      style={{ color: 'var(--violet)' }}
                    />
                  </div>
                </Reveal>
                <Reveal delay={180}>
                  <h2
                    style={{
                      fontFamily: 'Cormorant, serif',
                      fontSize: 'clamp(26px,5vw,34px)',
                      fontWeight: 500,
                      lineHeight: 1.2,
                      letterSpacing: '-0.02em',
                      color: 'var(--ink)',
                      marginBottom: '12px',
                    }}
                  >
                    {mode === 'register' ? (
                      <>
                        Welcome,{' '}
                        <em className="shimmer-text" style={{ fontStyle: 'normal' }}>
                          {name.split(' ')[0] || 'lovely'}
                        </em>
                      </>
                    ) : (
                      "You're in"
                    )}
                  </h2>
                  <p
                    style={{
                      fontSize: '14px',
                      fontWeight: 300,
                      lineHeight: 1.75,
                      color: 'rgba(15,11,30,0.45)',
                      maxWidth: '280px',
                      margin: '0 auto 28px',
                    }}
                  >
                    {mode === 'register'
                      ? "Your Oviya account is ready. Let's start understanding your cycle on your terms."
                      : 'Identity verified. Welcome back — your data is waiting.'}
                  </p>
                </Reveal>
                <Reveal delay={300}>
                  <button
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '13px 28px',
                      borderRadius: '12px',
                      border: 'none',
                      background:
                        'linear-gradient(135deg, var(--violet) 0%, var(--mid) 100%)',
                      color: 'white',
                      fontSize: '13px',
                      fontWeight: 500,
                      fontFamily: 'inherit',
                      letterSpacing: '0.03em',
                      cursor: 'pointer',
                      boxShadow: '0 4px 18px rgba(74,47,122,0.28)',
                    }}
                  >
                    Go to dashboard <ArrowRight size={15} strokeWidth={2.5} />
                  </button>
                </Reveal>
                <Reveal delay={400}>
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      justifyContent: 'center',
                      gap: '8px',
                      marginTop: '24px',
                    }}
                  >
                    {['PCOS-first', 'Evidence-led', 'Indian food aware'].map((b) => (
                      <span
                        key={b}
                        style={{
                          padding: '4px 12px',
                          borderRadius: '4px',
                          border: '1px solid rgba(197,178,232,0.3)',
                          fontSize: '10px',
                          letterSpacing: '0.15em',
                          textTransform: 'uppercase',
                          color: 'rgba(155,127,212,0.7)',
                        }}
                      >
                        {b}
                      </span>
                    ))}
                  </div>
                </Reveal>
              </div>
            )}
          </div>

          {/* Footer */}
          {step === 'credentials' && <TermsAndConditions />}
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </>
  );
}
