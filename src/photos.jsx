// Photos — auto-scrolling action image strip.
const PHOTOS = [
  { avif: 'assets/images/misc/Socials_4.avif', jpg: 'assets/images/misc/Socials_4.jpg', alt: 'Lauren racing' },
  { avif: 'assets/images/misc/Socials_9.avif', jpg: 'assets/images/misc/Socials_9.jpg', alt: 'Cyclists on mountain route' },
  { avif: 'assets/images/misc/Socials_1.avif', jpg: 'assets/images/misc/Socials_1.jpg', alt: 'Up Dietitian running' },
  { avif: 'assets/images/misc/Socials_2.avif', jpg: 'assets/images/misc/Socials_2.jpg', alt: 'Cyclist in motion' },
  { avif: 'assets/images/misc/Socials_5.avif', jpg: 'assets/images/misc/Socials_5.jpg', alt: 'Up Dietitian brand' },
  { avif: 'assets/images/misc/misc-image.avif', jpg: 'assets/images/misc/misc-image.JPG', alt: 'Athlete in motion' },
];

function Photos() {
  // Duplicate for seamless loop
  const items = [...PHOTOS, ...PHOTOS];
  return (
    <div className="overflow-hidden" style={{ background: '#201C12' }}>
      <div className="flex gap-3 py-3" style={{ animation: 'photoStrip 40s linear infinite', width: 'max-content' }}>
        {items.map((p, i) => (
          <div key={i} className="relative rounded-xl overflow-hidden flex-shrink-0" style={{ width: 'clamp(180px, 22vw, 320px)', aspectRatio: '3/4' }}>
            <picture>
              <source srcSet={p.avif} type="image/avif" />
              <img src={p.jpg} alt={p.alt} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }} loading="lazy" />
            </picture>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes photoStrip {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

window.Photos = Photos;
