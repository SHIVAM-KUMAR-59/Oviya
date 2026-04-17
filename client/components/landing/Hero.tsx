import React, { useState } from 'react'

type Props = {
  hoverProps?: React.HTMLAttributes<HTMLDivElement>;
};

const Hero = ({ hoverProps }: Props) => {
  const [heroForm, setHeroForm] = useState({ val: "", success: false });
    const submitForm = (
    formState: { val: string; success: boolean },
    setForm: React.Dispatch<React.SetStateAction<{ val: string; success: boolean }>>
  ) => {
    if (!formState.val.includes("@")) return;
    setForm({ val: "", success: true });
    setTimeout(() => setForm((f) => ({ ...f, success: false })), 3500);
  };
  return (
    <section className="relative min-h-screen grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] overflow-hidden pt-10
      bg-[radial-gradient(ellipse_80%_60%_at_75%_0%,rgba(107,79,160,0.32)_0%,transparent_60%),radial-gradient(ellipse_50%_40%_at_5%_100%,rgba(35,24,72,0.65)_0%,transparent_55%),linear-gradient(155deg,var(--ink)_0%,var(--ink2)_45%,var(--deep)_100%)]">

      {/* Noise overlay */}
      <div className="absolute inset-0 z-1 pointer-events-none opacity-[0.03]
        bg-[url('data:image/svg+xml,%3Csvg_viewBox%3D%270_0_200_200%27_xmlns%3D%27http://www.w3.org/2000/svg%27%3E%3Cfilter_id%3D%27n%27%3E%3CfeTurbulence_type%3D%27fractalNoise%27_baseFrequency%3D%270.9%27_numOctaves%3D%274%27/%3E%3C/filter%3E%3Crect_width%3D%27100%25%27_height%3D%27100%25%27_filter%3D%27url(%23n)%27/%3E%3C/svg%3E')]"
      />

      {/* Rings */}
      <div className="hidden lg:block absolute border border-white/5 rounded-full"
        style={{ width: 700, height: 700, top: -250, right: -150 }} />
      <div className="hidden lg:block absolute border border-white/5 rounded-full"
        style={{ width: 320, height: 320, bottom: 80, left: "38%" }} />
      <div className="hidden lg:block absolute border border-white/5 rounded-full"
        style={{ width: 160, height: 160, top: "32%", right: "18%" }} />

      {/* LEFT */}
      <div className="relative z-10 flex flex-col justify-center px-6 lg:px-16 py-32 lg:py-0 max-w-6xl mx-auto w-full">

        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-9 text-[10px] tracking-[0.3em] uppercase text-mist">
          <div className="w-10 h-px bg-linear-to-r from-rose to-transparent" />
          Built for PCOS · Made in India
        </div>

        {/* Heading */}
        <h1 className="font-[Cormorant] text-[clamp(80px,9vw,136px)] leading-[0.88] tracking-[-0.03em] text-white font-light">
          Ovi<em className="italic text-mist">ya</em><br />
          <span className="italic text-transparent [WebkitTextStroke:1px_var(--rose)]">
            Finally.
          </span>
        </h1>

        {/* Divider */}
        <div className="w-15 h-px my-7 bg-linear-to-r from-rose via-soft to-transparent" />

        {/* Tagline */}
        <p className="font-[Cormorant] italic text-[clamp(20px,2.4vw,29px)] text-white/50 leading-[1.45] max-w-110">
          The companion women with PCOS<br />have been waiting for.
        </p>

        {/* Body */}
        <p className="text-[16px] leading-[1.85] text-white/40 max-w-105 mt-6 mb-10 font-light">
          Irregular cycles understood. Indian food respected. The emotional weight of PCOS finally
          acknowledged. Built for the 1&nbsp;in&nbsp;5 Indian women living with this.
        </p>

        {/* Form */}
        <form
          className="flex max-w-110"
          onSubmit={(e) => {
            e.preventDefault();
            submitForm(heroForm, setHeroForm);
          }}
        >
          <input
            type="email"
            placeholder="Your email address"
            value={heroForm.val}
            onChange={(e) => setHeroForm((f) => ({ ...f, val: e.target.value }))}
            {...hoverProps}
            className="flex-1 px-5 py-4 bg-white/10 border border-white/20 border-r-0 text-white text-sm font-light outline-none placeholder:text-white/30 focus:bg-white/15 focus:border-[rgba(197,178,232,0.45)]"
          />
          <button
            type="submit"
            {...hoverProps}
            className="px-7 py-4 bg-rose border border-rose text-white text-[11px] tracking-[0.2em] uppercase font-medium whitespace-nowrap hover:translate-x-0.5 hover:bg-rose-lt transition"
          >
            {heroForm.success ? "✓ You're on the list" : "Request Access"}
          </button>
        </form>

        {/* Meta */}
        <div className="flex items-center gap-4 mt-4 text-[10px] tracking-[0.18em] uppercase text-white/30">
          <div className="w-0.75 h-0.75 rounded-full bg-mist/50" />
          <span>Private beta</span>
          <div className="w-0.75 h-0.75 rounded-full bg-mist/50" />
          <span>Invite only</span>
          <div className="w-0.75 h-0.75 rounded-full bg-mist/50" />
          <span>No spam</span>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 mt-8">
          {["PCOS-first","Evidence-led","Indian food aware","Irregular cycles"].map((b) => (
            <span key={b} className="text-[10px] tracking-[0.18em] uppercase px-4 py-1 border border-[rgba(197,178,232,0.22)] text-[rgba(197,178,232,0.55)]">
              {b}
            </span>
          ))}
        </div>
      </div>

      {/* RIGHT */}
      <div className="relative z-10 flex flex-col justify-center px-10 py-32 lg:py-0">

        {/* Stats */}
        <div className="grid grid-cols-2 gap-px bg-white/10 border border-white/10 mb-5">
          <div className="p-6 bg-white/5 hover:bg-white/10 transition" {...hoverProps}>
            <div className="font-[Cormorant] text-5xl text-white font-light">
              1 <em className="italic text-mist">in</em> 5
            </div>
            <p className="text-xs text-white/40 mt-2">
              Indian women live with PCOS — many undiagnosed for years
            </p>
          </div>

          <div className="p-6 bg-white/5 hover:bg-white/10 transition" {...hoverProps}>
            <div className="font-[Cormorant] text-5xl text-white font-light">
              110<em className="italic text-mist">+</em>
            </div>
            <p className="text-xs text-white/40 mt-2">
              Women shaped Oviya before a single line was written
            </p>
          </div>

          <div className="col-span-2 p-6 border-t border-white/10 bg-white/5 hover:bg-white/10 transition" {...hoverProps}>
            <div className="font-[Cormorant] text-3xl text-white font-light">
              28 <em className="italic text-mist">days?</em>
            </div>
            <p className="text-xs text-white/40 mt-2">
              Every other app assumes this. PCOS cycles don&apos;t. Oviya does&apos;nt either.
            </p>
          </div>
        </div>

        {/* App Card */}
        <div className="bg-white/5 border border-white/10 overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
            <div className="w-2 h-2 rounded-full bg-red-400"/>
            <div className="w-2 h-2 rounded-full bg-yellow-400"/>
            <div className="w-2 h-2 rounded-full bg-green-400"/>
            <span className="text-[10px] tracking-[0.2em] uppercase text-white/30 ml-2">
              Oviya · Your cycle, today
            </span>
          </div>

          {[
            { icon:"🌙", label:"Cycle day", val:"Day 34 · Luteal phase (estimated)" },
            { icon:"🥗", label:"Today's nutrition", val:"Methi roti · Moong dal · Jeera rice" },
            { icon:"💭", label:"Mood & energy", val:"Fatigued · Some brain fog today" },
            { icon:"📋", label:"Doctor report", val:"Ready · 3 months of data logged" },
          ].map((row) => (
            <div key={row.label} className="flex items-center gap-3 px-4 py-3 border-b border-white/5 hover:bg-white/5 transition" {...hoverProps}>
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white/10 text-sm">
                {row.icon}
              </div>
              <div>
                <div className="text-[9px] uppercase tracking-[0.12em] text-white/40">
                  {row.label}
                </div>
                <div className="text-sm text-white/70 font-light">
                  {row.val}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default Hero