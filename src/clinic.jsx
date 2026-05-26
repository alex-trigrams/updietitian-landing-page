// Clinic — in-person booking section at Front Runner Sports, Osborne Park.
const CLINIKO_URL = "https://front-runner-sports.au1.cliniko.com/bookings#location";

function Clinic({ theme }) {
  const t = THEMES[theme];
  return (
    <section id="clinic" data-screen-label="05 Clinic" className="relative noise" style={{ background: '#201C12', color: '#EAE6D7', paddingBlock: 'var(--pad-y, 96px)' }}>
      <div className="max-w-[1400px] mx-auto px-5 md:px-8">
        <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[.22em] opacity-60">
          <span className="inline-block w-6 h-px bg-current"></span>
          <span>05 · In-person clinic</span>
        </div>

        <h2 className="mt-6 font-display leading-[.88]" style={{ fontSize: 'clamp(48px, 9vw, 140px)' }}>
          <span className="skew-italic">Come</span><br/>
          <span className="skew-italic" style={{ color: '#FF6C00' }}>in.</span>
        </h2>

        <div className="mt-12 grid grid-cols-12 gap-6 md:gap-10 items-start">
          {/* Left — location info */}
          <div className="col-span-12 md:col-span-7 lg:col-span-6">
            <p className="text-[16px] md:text-[18px] leading-relaxed max-w-[52ch] opacity-85">
              Lauren consults in-person at Front Runner Sports in Osborne Park. If you prefer face-to-face, book directly through the clinic.
            </p>

            <div className="mt-10 flex flex-col gap-6 border-t pt-8" style={{ borderColor: 'rgba(234,230,215,.15)' }}>
              <div className="grid grid-cols-2 gap-6 font-mono text-[12px] uppercase tracking-[.16em]">
                <div className="flex flex-col gap-2.5">
                  <span className="opacity-50">Clinic</span>
                  <span className="leading-snug">Front Runner<br/>Sports</span>
                </div>
                <div className="flex flex-col gap-2.5">
                  <span className="opacity-50">Location</span>
                  <span className="leading-snug">Osborne Park<br/><span className="opacity-70 normal-case tracking-normal text-[13px]">Perth, WA</span></span>
                </div>
              </div>
            </div>
          </div>

          {/* Right — booking card */}
          <div className="col-span-12 md:col-span-5 lg:col-span-6">
            <div className="rounded-2xl p-6 md:p-8 flex flex-col gap-5" style={{ background: 'rgba(234,230,215,.07)', border: '1px solid rgba(234,230,215,.12)' }}>
              <div className="flex items-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="pulse-dot absolute inline-flex h-full w-full rounded-full" style={{ background: '#FF6C00' }}></span>
                  <span className="relative inline-flex rounded-full h-3 w-3" style={{ background: '#FF6C00' }}></span>
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[.2em] opacity-70">Taking appointments</span>
              </div>

              <h3 className="font-display leading-[.9]" style={{ fontSize: 'clamp(32px, 4vw, 56px)' }}>
                <span className="skew-italic">Book in-person</span>
              </h3>

              <p className="text-[14px] md:text-[15px] leading-relaxed opacity-70">
                Select your appointment type and preferred time directly through Front Runner Sports.
              </p>

              <a
                href={CLINIKO_URL}
                target="_blank"
                rel="noreferrer"
                className="btn-shine inline-flex items-center gap-3 px-6 py-4 rounded-full font-mono text-[12px] uppercase tracking-[.18em] font-bold self-start"
                style={{ background: '#FF6C00', color: '#EAE6D7' }}
                data-blob-hover
              >
                Book at the clinic
                <span style={{ fontFamily: 'Anton' }}>→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

window.Clinic = Clinic;
