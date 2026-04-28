// components/auth/AuthPage.tsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/auth/Header';
import TermsAndConditions from '@/components/auth/TermsAndConditions';
import AuthBackground from '@/components/auth/AuthBackground';
import OtpStep from '@/components/auth/steps/OtpStep';
import SuccessStep from '@/components/auth/steps/SuccessStep';
import { useToast } from '@/context/ToastContext';
import { useAuth } from '@/context/AuthContext';
import { useApi } from '@/hooks/useApi';
import type { AuthResponse, SendOtpResponse, VerifyOtpResponse } from '@/lib/utils/types';
import CredentialsStep from '@/components/auth/steps/CredentialStep';

export type Mode = 'login' | 'register';
type Step = 'credentials' | 'otp' | 'success';

export default function AuthPage() {
  const router = useRouter();

  const [mode, setMode] = useState<Mode>('login');
  const [step, setStep] = useState<Step>('credentials');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpExpired, setOtpExpired] = useState(false);
  const [timerKey, setTimerKey] = useState(0);
  const [revealKey, setRevealKey] = useState(0);

  const { success: showSuccess, error: showError } = useToast();
  const { setAuth } = useAuth();

  const sendOtp = useApi<SendOtpResponse>('post', {
    onSuccess: () => {
      showSuccess('OTP sent successfully');
      setStep('otp');
      setOtp('');
      setOtpExpired(false);
      setTimerKey((k) => k + 1);
      setRevealKey((k) => k + 1);
    },
    onError: (msg) => showError(msg),
  });

  const verifyOtp = useApi<VerifyOtpResponse>('post', {
    onError: (msg) => showError(msg),
  });

  const authAction = useApi<AuthResponse>('post', {
    onSuccess: (data) => {
      setAuth(data.data.accessToken, data.data.user);
      showSuccess(mode === 'login' ? 'Welcome back!' : 'Account created successfully!');
      setStep('success');

      const destination =
        mode === 'register' || !data.data.user.onboardingCompleted
          ? '/onboarding'
          : '/home';

      // Small delay so the success state is visible before navigating
      setTimeout(() => router.push(destination), 1200);
    },
    onError: (msg) => showError(msg),
  });

  const loading = sendOtp.loading || verifyOtp.loading || authAction.loading;

  const switchMode = (m: Mode) => {
    setMode(m);
    setStep('credentials');
    setName('');
    setEmail('');
    setOtp('');
    sendOtp.reset();
    verifyOtp.reset();
    authAction.reset();
    setRevealKey((k) => k + 1);
  };

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    await sendOtp.execute('/auth/send-otp', { email });
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length < 6 || otpExpired) return;

    const verified = await verifyOtp.execute('/auth/verify-otp', { email, otp });
    if (!verified?.success) {
      showError('Invalid or expired code. Please try again.');
      return;
    }

    const endpoint = mode === 'register' ? '/auth/register' : '/auth/login';
    const body = mode === 'register' ? { name, email } : { email };
    await authAction.execute(endpoint, body);
  };

  const handleResend = async () => {
    setOtp('');
    verifyOtp.reset();
    const result = await sendOtp.execute('/auth/send-otp', { email });
    if (result) {
      setOtpExpired(false);
      setTimerKey((k) => k + 1);
    }
  };

  const handleBack = () => {
    setStep('credentials');
    setOtp('');
    verifyOtp.reset();
    authAction.reset();
    setRevealKey((k) => k + 1);
  };

  return (
    <>
      <AuthBackground>
        <div
          key={revealKey}
          style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '420px' }}
        >
          {step !== 'success' && <Header />}

          <div className="rounded-[20px] border border-[rgba(155,127,212,0.18)] bg-[rgba(255,255,255,0.75)] px-7 py-8 shadow-[0_4px_32px_rgba(74,47,122,0.09),0_1px_4px_rgba(74,47,122,0.06),inset_0_1px_0_rgba(255,255,255,0.95)] backdrop-blur-[20px]">
            {step === 'credentials' && (
              <CredentialsStep
                mode={mode}
                name={name}
                email={email}
                loading={loading}
                sendingOtp={sendOtp.loading}
                onNameChange={setName}
                onEmailChange={setEmail}
                onSubmit={handleCredentialsSubmit}
                onSwitchMode={switchMode}
              />
            )}

            {step === 'otp' && (
              <OtpStep
                email={email}
                otp={otp}
                loading={loading}
                verifying={verifyOtp.loading}
                signingIn={authAction.loading}
                sendingOtp={sendOtp.loading}
                otpExpired={otpExpired}
                timerKey={timerKey}
                onOtpChange={setOtp}
                onSubmit={handleOtpSubmit}
                onResend={handleResend}
                onBack={handleBack}
                onExpire={() => setOtpExpired(true)}
              />
            )}

            {step === 'success' && <SuccessStep mode={mode} />}
          </div>

          {step === 'credentials' && <TermsAndConditions />}
        </div>
      </AuthBackground>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </>
  );
}
