// Clinic — in-person booking section at Front Runner Sports, Osborne Park.
const CLINIKO_URL = "https://front-runner-sports.au1.cliniko.com/bookings#location";

const CLINIC_PHOTO = 'assets/images/clinic/front-runner-physio-osbornepark.avif';

function Clinic({ theme }) {
  const t = THEMES[theme];
  return (
    <section id="clinic" data-screen-label="05 Clinic" className="relative noise" style={{ background: '#201C12', color: '#EAE6D7', paddingBlock: 'var(--pad-y, 96px)' }}>
      <div className="max-w-[1400px] mx-auto px-5 md:px-8">

        {/* eyebrow */}
        <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[.22em] opacity-60">
          <span className="inline-block w-6 h-px bg-current"></span>
          <span>05 · In-person clinic</span>
        </div>

        <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display leading-[.88]" style={{ fontSize: 'clamp(48px, 9vw, 140px)' }}>
            <span className="skew-italic">Come</span><br/>
            <span className="skew-italic" style={{ color: '#FF6C00' }}>in.</span>
          </h2>
          <a
            href={CLINIKO_URL}
            target="_blank"
            rel="noreferrer"
            className="hidden md:inline-flex btn-shine items-center gap-2 px-5 py-3 rounded-full font-mono text-[12px] uppercase tracking-[.18em] font-bold mb-2"
            style={{ background: '#FF6C00', color: '#EAE6D7' }}
            data-blob-hover
          >
            Book at the clinic
            <span style={{ fontFamily: 'Anton' }}>→</span>
          </a>
        </div>

        {/* main content grid */}
        <div className="mt-10 grid grid-cols-12 gap-6 md:gap-8 items-stretch">

          {/* Left — clinic image */}
          <div className="col-span-12 lg:col-span-7 order-2 lg:order-1">
            <div
              className="w-full rounded-2xl overflow-hidden grain-bg"
              style={{ position: 'relative', paddingBottom: '75%', background: '#1D4032', minHeight: 280 }}
            >
              {CLINIC_PHOTO ? (
                <img
                  src={CLINIC_PHOTO}
                  alt="Front Runner Sports clinic, Osborne Park"
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
                />
              ) : (
                /* placeholder — swap out once photo is added */
                <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, padding: 24, opacity: .5 }}>
                  <span style={{ fontFamily: 'Anton', fontSize: 'clamp(32px, 5vw, 56px)', color: '#FF6C00', letterSpacing: '.04em' }}>FRONT RUNNER</span>
                  <span style={{ fontFamily: 'JetBrains Mono', fontSize: 11, textTransform: 'uppercase', letterSpacing: '.2em', color: '#EAE6D7' }}>Add clinic photo → assets/images/clinic/</span>
                </div>
              )}
            </div>
          </div>

          {/* Right — info + booking */}
          <div className="col-span-12 lg:col-span-5 order-1 lg:order-2 flex flex-col gap-6">

            {/* description */}
            <p className="text-[16px] md:text-[17px] leading-relaxed opacity-85">
              Lauren consults in-person at Front Runner Sports in Osborne Park. If you prefer a face-to-face appointment, book directly through their online system.
            </p>

            {/* location details */}
            <div className="grid grid-cols-2 gap-5 border-t border-b py-6" style={{ borderColor: 'rgba(234,230,215,.12)' }}>
              <div className="flex flex-col gap-2 font-mono text-[12px] uppercase tracking-[.16em]">
                <span className="opacity-50">Clinic</span>
                <span className="leading-snug">Front Runner<br/>Sports</span>
              </div>
              <div className="flex flex-col gap-2 font-mono text-[12px] uppercase tracking-[.16em]">
                <span className="opacity-50">Location</span>
                <span className="leading-snug normal-case tracking-normal text-[14px]">Osborne Park<br/><span className="opacity-70">Perth, WA</span></span>
              </div>
              <div className="flex flex-col gap-2 font-mono text-[12px] uppercase tracking-[.16em]">
                <span className="opacity-50">Format</span>
                <span className="leading-snug">In-person<br/><span className="opacity-70 normal-case tracking-normal text-[13px]">or online via Zoom</span></span>
              </div>
              <div className="flex flex-col gap-2 font-mono text-[12px] uppercase tracking-[.16em]">
                <span className="opacity-50">Booking</span>
                <span className="leading-snug opacity-70 normal-case tracking-normal text-[13px]">Direct through<br/>Front Runner Sports</span>
              </div>
            </div>

            {/* booking card */}
            <div className="rounded-2xl p-6 flex flex-col gap-4 mt-auto" style={{ background: 'rgba(234,230,215,.07)', border: '1px solid rgba(234,230,215,.12)' }}>
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="pulse-dot absolute inline-flex h-full w-full rounded-full" style={{ background: '#FF6C00' }}></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5" style={{ background: '#FF6C00' }}></span>
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[.2em] opacity-70">Taking in-person appointments</span>
              </div>
              <p className="text-[14px] leading-relaxed opacity-70">
                Select your appointment type and preferred time directly through Front Runner Sports. Health fund rebates available.
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
