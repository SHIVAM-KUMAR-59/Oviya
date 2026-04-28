'use client';

import { Loader2, ShieldCheck } from 'lucide-react';
import Reveal from '@/components/auth/Reveal';
import { Mode } from '@/app/auth/page';

export default function SuccessStep({ mode }: { mode: Mode }) {
  return (
    <Reveal delay={0}>
      <div className="flex flex-col items-center py-4 text-center">
        <div className="bg-pale mb-5 flex h-14 w-14 items-center justify-center rounded-2xl">
          <ShieldCheck size={26} strokeWidth={1.5} className="text-violet" />
        </div>
        <h2 className="text-ink mb-2 font-[Cormorant,serif] text-[clamp(24px,4.5vw,32px)] font-medium tracking-[-0.02em]">
          {mode === 'login' ? 'Welcome back!' : "You're all set!"}
        </h2>
        <p className="text-[14px] leading-[1.7] font-light text-[rgba(15,11,30,0.45)]">
          {mode === 'login'
            ? 'Redirecting you to your dashboard…'
            : 'Your account is ready. Taking you in…'}
        </p>
        <Loader2
          size={20}
          className="text-violet mt-6 opacity-50"
          style={{ animation: 'spin 1s linear infinite' }}
        />
      </div>
    </Reveal>
  );
}
