'use client';

import React, { useState } from 'react';
import {
  ArrowRight,
  ArrowLeft,
  Mail,
  User,
  Loader2,
  RefreshCw,
  ShieldCheck,
} from 'lucide-react';
import OtpInput from '@/components/auth/OtpInput';
import CountdownTimer from '@/components/auth/CountdownTimer';
import Reveal from '@/components/auth/Reveal';
import TermsAndConditions from '@/components/auth/TermsAndConditions';
import PrimaryButton from '@/components/ui/PrimaryButton';
import ModeToggle from '@/components/auth/ModeToggle';
import Divider from '@/components/auth/Divider';
import Header from '@/components/auth/Header';
import { useToast } from '@/context/ToastContext';
import { AppleIcon, GoogleIcon } from '@/components/auth/SocialIcon';
import TextInput from '@/components/auth/TextInput';

export type Mode = 'login' | 'register';
type Step = 'credentials' | 'otp' | 'success';

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

  const { success: showSuccess } = useToast();

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
    showSuccess('OTP sent successfully');
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
    showSuccess('Registered successfully');
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
          className="ring-float pointer-events-none absolute -bottom-17.5 -left-12.5 h-65 w-65 rounded-full border border-[rgba(192,115,122,0.09)]"
          style={{ animationDelay: '2s' }}
        />
        <div
          className="ring-float pointer-events-none absolute top-[30%] left-[6%] h-32.5 w-32.5 rounded-full border border-[rgba(155,127,212,0.1)]"
          style={{ animationDelay: '4s' }}
        />

        {/* Noise overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.018]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />

        {/* ── Card ── */}
        <div
          key={revealKey}
          style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '420px' }}
        >
          {/* Brand above card */}
          {step !== 'success' && <Header />}

          {/* Card body */}
          <div className="rounded-[20px] border border-[rgba(155,127,212,0.18)] bg-[rgba(255,255,255,0.75)] px-7 py-8 shadow-[0_4px_32px_rgba(74,47,122,0.09),0_1px_4px_rgba(74,47,122,0.06),inset_0_1px_0_rgba(255,255,255,0.95)] backdrop-blur-[20px]">
            {/* ── CREDENTIALS STEP ── */}
            {step === 'credentials' && (
              <>
                <Reveal delay={60}>
                  <h1 className="text-ink mb-2 font-[Cormorant] text-[clamp(28px,5vw,36px)] leading-[1.15] font-medium tracking-[-0.02em]">
                    {mode === 'login' ? (
                      'Welcome back'
                    ) : (
                      <>
                        Start your <em className="shimmer-text not-italic">journey</em>
                      </>
                    )}
                  </h1>

                  <p className="mb-6 text-[14px] leading-[1.7] font-light text-[rgba(15,11,30,0.45)]">
                    {mode === 'login'
                      ? "We'll send a one-time code to your email."
                      : 'Create your account — it takes under a minute.'}
                  </p>
                </Reveal>

                {/* Social buttons */}
                <Reveal delay={110}>
                  <div className="mb-5 flex flex-col gap-2.5">
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
                <Divider />

                {/* Form */}
                <form onSubmit={handleCredentialsSubmit}>
                  {mode === 'register' && (
                    <Reveal delay={190}>
                      <TextInput
                        label="Your name"
                        placeholder="Priya Sharma"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        icon={<User size={15} strokeWidth={1.5} />}
                      />
                    </Reveal>
                  )}

                  <Reveal delay={mode === 'register' ? 230 : 190}>
                    <TextInput
                      label="Email address"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      icon={<Mail size={15} strokeWidth={1.5} />}
                    />
                  </Reveal>

                  <Reveal delay={mode === 'register' ? 270 : 230}>
                    <PrimaryButton type="submit" disabled={loading}>
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
                    </PrimaryButton>
                  </Reveal>
                </form>

                {/* Mode toggle */}
                <ModeToggle mode={mode} switchMode={switchMode} />
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
                    className="text-soft mb-5 flex cursor-pointer items-center gap-1.5 border-0 bg-transparent text-[11px] tracking-[0.12em] uppercase"
                  >
                    <ArrowLeft size={13} strokeWidth={2} />
                    Back
                  </button>
                </Reveal>

                <Reveal delay={60}>
                  <div className="bg-pale mb-4 flex h-12 w-12 items-center justify-center rounded-[14px]">
                    <ShieldCheck size={22} strokeWidth={1.5} className="text-violet)" />
                  </div>

                  <h2 className="text-ink mb-2.5 font-[Cormorant,serif] text-[clamp(24px,4.5vw,32px)] leading-[1.2] font-medium tracking-[-0.02em]">
                    Check your email
                  </h2>

                  <p className="mb-7 text-[14px] leading-[1.7] font-light text-[rgba(15,11,30,0.45)]">
                    We sent a 6-digit code to{' '}
                    <strong className="text-violet font-medium">{email}</strong>. It
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
                  <p className="mt-3 text-center text-sm text-[rgba(15,11,30,0.35)]">
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
                    <PrimaryButton
                      type="submit"
                      disabled={loading || !isOtpComplete || otpExpired}
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
                    </PrimaryButton>
                  </form>
                </Reveal>

                {/* Resend */}
                <Reveal delay={240}>
                  <p className="mt-4 text-center text-xs text-[rgba(15,11,30,0.4)]">
                    Did&apos;nt receive it?{' '}
                    <button
                      onClick={handleResend}
                      disabled={loading}
                      className={`text-rose inline-flex items-center gap-1 border-none bg-transparent text-[12px] font-medium ${loading ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'} `}
                    >
                      Resend code
                      {loading ? (
                        <Loader2
                          size={11}
                          style={{ animation: 'spin 1s linear infinite' }}
                        />
                      ) : (
                        <RefreshCw size={11} />
                      )}
                    </button>
                  </p>
                </Reveal>

                {/* Decorative dots */}
                <div className="mt-7 flex justify-center gap-2">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="pulse-dot bg-mist h-1.25 w-1.25 rounded-full"
                      style={{ animationDelay: `${i * 0.4}s` }}
                    />
                  ))}
                </div>
              </>
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
