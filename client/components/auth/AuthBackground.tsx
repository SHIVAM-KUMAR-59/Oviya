'use client';

export default function AuthBackground({ children }: { children: React.ReactNode }) {
  return (
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

      {children}
    </div>
  );
}
