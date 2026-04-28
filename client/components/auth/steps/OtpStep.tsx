'use client';

import { ArrowRight, ArrowLeft, Loader2, RefreshCw, ShieldCheck } from 'lucide-react';
import OtpInput from '@/components/auth/OtpInput';
import CountdownTimer from '@/components/auth/CountdownTimer';
import Reveal from '@/components/auth/Reveal';
import PrimaryButton from '@/components/ui/PrimaryButton';

interface Props {
  email: string;
  otp: string;
  loading: boolean;
  verifying: boolean;
  signingIn: boolean;
  sendingOtp: boolean;
  otpExpired: boolean;
  timerKey: number;
  onOtpChange: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onResend: () => void;
  onBack: () => void;
  onExpire: () => void;
}

export default function OtpStep({
  email,
  otp,
  loading,
  verifying,
  signingIn,
  sendingOtp,
  otpExpired,
  timerKey,
  onOtpChange,
  onSubmit,
  onResend,
  onBack,
  onExpire,
}: Props) {
  const isComplete = otp.length === 6;

  return (
    <>
      <Reveal delay={0}>
        <button
          onClick={onBack}
          className="text-soft mb-5 flex cursor-pointer items-center gap-1.5 border-0 bg-transparent text-[11px] tracking-[0.12em] uppercase"
        >
          <ArrowLeft size={13} strokeWidth={2} />
          Back
        </button>
      </Reveal>

      <Reveal delay={60}>
        <div className="bg-pale mb-4 flex h-12 w-12 items-center justify-center rounded-[14px]">
          <ShieldCheck size={22} strokeWidth={1.5} className="text-violet" />
        </div>

        <h2 className="text-ink mb-2.5 font-[Cormorant,serif] text-[clamp(24px,4.5vw,32px)] leading-[1.2] font-medium tracking-[-0.02em]">
          Check your email
        </h2>

        <p className="mb-7 text-[14px] leading-[1.7] font-light text-[rgba(15,11,30,0.45)]">
          We sent a 6-digit code to{' '}
          <strong className="text-violet font-medium">{email}</strong>. It expires in 5
          minutes.
        </p>
      </Reveal>

      <Reveal delay={120}>
        <OtpInput value={otp} onChange={onOtpChange} />
      </Reveal>

      <Reveal delay={160}>
        <p className="mt-3 text-center text-sm text-[rgba(15,11,30,0.35)]">
          Code expires in{' '}
          <CountdownTimer key={timerKey} seconds={300} onExpire={onExpire} />
        </p>
      </Reveal>

      <Reveal delay={200}>
        <form onSubmit={onSubmit} style={{ marginTop: '18px' }}>
          <PrimaryButton type="submit" disabled={loading || !isComplete || otpExpired}>
            {verifying || signingIn ? (
              <>
                <Loader2 size={15} style={{ animation: 'spin 1s linear infinite' }} />
                {verifying ? 'Verifying…' : 'Signing in…'}
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

      <Reveal delay={240}>
        <p className="mt-4 text-center text-xs text-[rgba(15,11,30,0.4)]">
          Didn&apos;t receive it?{' '}
          <button
            onClick={onResend}
            disabled={loading}
            className={`text-rose inline-flex items-center gap-1 border-none bg-transparent text-[12px] font-medium ${
              loading ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'
            }`}
          >
            Resend code
            {sendingOtp ? (
              <Loader2 size={11} style={{ animation: 'spin 1s linear infinite' }} />
            ) : (
              <RefreshCw size={11} />
            )}
          </button>
        </p>
      </Reveal>

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
  );
}
