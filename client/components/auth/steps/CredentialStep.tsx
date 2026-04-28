'use client';

import { ArrowRight, Mail, User, Loader2 } from 'lucide-react';
import Reveal from '@/components/auth/Reveal';
import Divider from '@/components/auth/Divider';
import ModeToggle from '@/components/auth/ModeToggle';
import PrimaryButton from '@/components/ui/PrimaryButton';
import TextInput from '@/components/auth/TextInput';
import { AppleIcon, GoogleIcon } from '@/components/auth/SocialIcon';
import { Mode } from '@/app/auth/page';

interface Props {
  mode: Mode;
  name: string;
  email: string;
  loading: boolean;
  sendingOtp: boolean;
  onNameChange: (v: string) => void;
  onEmailChange: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onSwitchMode: (m: Mode) => void;
}

export default function CredentialsStep({
  mode,
  name,
  email,
  loading,
  sendingOtp,
  onNameChange,
  onEmailChange,
  onSubmit,
  onSwitchMode,
}: Props) {
  return (
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

      <Divider />

      <form onSubmit={onSubmit}>
        {mode === 'register' && (
          <Reveal delay={190}>
            <TextInput
              label="Your name"
              placeholder="Priya Sharma"
              value={name}
              onChange={(e) => onNameChange(e.target.value)}
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
            onChange={(e) => onEmailChange(e.target.value)}
            icon={<Mail size={15} strokeWidth={1.5} />}
          />
        </Reveal>

        <Reveal delay={mode === 'register' ? 270 : 230}>
          <PrimaryButton type="submit" disabled={loading || !email}>
            {sendingOtp ? (
              <>
                <Loader2 size={15} style={{ animation: 'spin 1s linear infinite' }} />
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

      <ModeToggle mode={mode} switchMode={onSwitchMode} />
    </>
  );
}
