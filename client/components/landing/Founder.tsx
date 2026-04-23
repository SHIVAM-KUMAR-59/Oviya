'use client';

import { useEffect } from 'react';

const Founder = () => {
  // Scroll reveal effect
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
    const revealElements = document.querySelectorAll('.founder-reveal');
    revealElements.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="story" className="bg-ink relative overflow-hidden py-28">
      {/* Decorative circle (top-right) */}
      <div className="pointer-events-none absolute -top-52 -right-52 h-175 w-175 rounded-full border border-[rgba(197,178,232,0.04)]" />

      {/* Bottom gradient glow */}
      <div className="pointer-events-none absolute -bottom-20 left-0 h-125 w-125 bg-[radial-gradient(circle,rgba(74,47,122,0.16),transparent_70%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-16">
        {/* Section Label */}
        <div className="founder-reveal text-mist mb-14 flex items-center gap-4 text-[10px] tracking-[0.32em] uppercase">
          Built by someone like you
          <div className="h-px flex-1 bg-[rgba(197,178,232,0.1)]" />
        </div>

        {/* Grid */}
        <div className="founder-reveal grid items-center gap-16 xl:grid-cols-[400px_1fr] xl:gap-24">
          {/* Portrait */}
          <div className="relative">
            <div className="relative flex aspect-3/4 items-center justify-center overflow-hidden border border-[rgba(197,178,232,0.08)] bg-[linear-gradient(160deg,var(--deep),var(--ink2))]">
              {/* subtle noise/dots overlay */}
              <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[30px_30px]" />

              {/* Monogram */}
              <div className="relative z-10 font-serif text-[140px] font-light text-[rgba(197,178,232,0.12)] italic">
                O
              </div>

              {/* Caption */}
              <div className="absolute right-0 bottom-0 left-0 border-t border-[rgba(255,255,255,0.06)] bg-[rgba(35,24,72,0.92)] px-6 py-4 backdrop-blur-md">
                <strong className="block text-[13px] font-normal tracking-[0.05em] text-white">
                  Founder, Oviya
                </strong>
                <span className="text-[10px] tracking-[0.14em] text-white/40 uppercase">
                  Built in India · For Indian women
                </span>
              </div>
            </div>

            {/* Accent circle */}
            <div className="absolute top-5 -right-4 h-18 w-18 rounded-full border border-[rgba(192,115,122,0.3)]" />
          </div>

          {/* Content */}
          <div>
            <h2 className="founder-reveal mb-8 font-serif text-[clamp(40px,3.8vw,58px)] leading-[1.05] font-light tracking-[-0.03em] text-white">
              Years of confusion became
              <br />a <em className="text-mist italic">reason</em> to build.
            </h2>

            <p className="founder-reveal mb-5 text-[16px] leading-[1.9] font-light text-white/50">
              My periods lasted 15 days, stopped for 9, then came back again. For 2 years,
              I was told it would settle. Then they stopped coming altogether. Then the
              weight came, and nobody had answers.
            </p>

            <p className="founder-reveal mb-5 text-[16px] leading-[1.9] font-light text-white/50">
              At 16, a doctor looked at me and said , &dquot;itna motapa hoga toh yahi
              hoga na.&dquot; I believed her. I worked out twice a day, walked 15,000
              steps, cut out sugar, tried everything. I lost the weight. The periods still
              did&quot;nt come back.
            </p>

            <p className="founder-reveal mb-5 text-[16px] leading-[1.9] font-light text-white/50">
              I went back. Same vague advice. And somewhere in those years, I lost
              something harder to name than weight. My motivation. My confidence. Some
              days, myself.
            </p>
            <p className="founder-reveal mb-5 text-[16px] leading-[1.9] font-light text-white/50">
              Years later I found a doctor who actually listened. I realized what I had
              been missing was&quot;nt just medical support. It was being understood.
              Still every app I tried assumed my cycle was the same every month. Sometimes
              mine is 19 days. Sometimes 29. They were always wrong.
            </p>
            <p className="founder-reveal mb-5 text-[16px] leading-[1.9] font-light text-white/50">
              That loneliness is what built Oviya.
            </p>

            <div className="founder-reveal text-mist mt-9 border-t border-[rgba(197,178,232,0.1)] pt-9 font-serif text-[26px] italic">
              — With you, always.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Founder;
