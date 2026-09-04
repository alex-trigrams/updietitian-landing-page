// Shop — the UP merch store.
//
// Deliberately backend-free: every product checks out through its own Stripe
// Payment Link, so Stripe hosts the cart, the payment form and the receipt.
// Nothing here touches card details — no server, no SDK, no secret key and no
// PCI surface on updietitian.com.
//
// Layout follows the tempr.co/shop reference — one page, no product detail
// routes. Clicking a card opens a modal with the full description and an
// image gallery rather than jumping straight out to Stripe, so people can read
// about the product without leaving the site.
//
// PRICES: typed by hand, NOT read from Stripe. Changing a price in the Stripe
// dashboard will silently disagree with the figure shown here — update both
// together. A product left at `price: null` shows "Price at checkout" instead.

const SHOP_PRODUCTS = [
  {
    id: 'tee',
    name: 'UP Oversize Tee',
    type: 'Tees',
    price: 40,
    meta: 'Oversized fit',
    blurb: 'A relaxed, everyday cotton staple designed for comfort, style and effortless lifestyle wear — coffee runs, rest days, weekend adventures and everything in between.',
    images: ['tee-1'],
    stripe: 'https://buy.stripe.com/28EeV62bz8OQ6QW2dH3Nm02',
  },
  {
    id: 'tank',
    name: 'UP Active Tank',
    type: 'Tanks',
    price: 45,
    meta: 'Cropped fit',
    blurb: 'A flattering cropped active tank designed for those who like to train hard and look good doing it. Perfect for every session, from long runs to Hyrox.',
    images: ['tank-1', 'tank-2', 'tank-3'],
    stripe: 'https://buy.stripe.com/cNi28k4jHd56dfkcSl3Nm01',
  },
  {
    id: 'socks',
    name: 'Level UP Running & Cycling Socks',
    type: 'Socks',
    price: 19.99,
    meta: 'One size · US 7–12',
    blurb: 'Fuel your training from head to toe. Custom UP Dietitian socks designed for running, cycling and everyday training, combining a comfortable, performance-focused fit.',
    images: ['socks-1', 'socks-2'],
    stripe: 'https://buy.stripe.com/28E4gs6rP9SU6QW5pT3Nm00',
  },
];

const shopImg = (slug) => `assets/images/shop/${slug}`;

function formatPrice(v) {
  if (v == null) return null;
  return `$${Number(v).toFixed(2)} AUD`;
}

function trackShop(name, product) {
  try { window.va('event', { name, data: { product } }); } catch (e) {}
}

// Fills its (positioned) parent. AVIF first with a JPG fallback — sips AVIF has
// silently produced blank files on this project before, so the <picture> keeps
// a real JPG behind every image.
function ShopImage({ slug, alt, style }) {
  return (
    <picture>
      <source srcSet={`${shopImg(slug)}.avif`} type="image/avif" />
      <img
        src={`${shopImg(slug)}.jpg`}
        alt={alt}
        loading="lazy"
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block', ...style }}
      />
    </picture>
  );
}

// Scroll reveal — fades and lifts a block the first time it enters view, then
// leaves it alone. Honours prefers-reduced-motion by rendering straight to the
// resting state. `delay` staggers siblings so a row arrives in sequence.
function Reveal({ children, delay = 0, className, style }) {
  const ref = React.useRef(null);
  const seen = useInView(ref, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
  const still = typeof window !== 'undefined'
    && window.matchMedia
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const on = seen || still;
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: on ? 1 : 0,
        transform: on ? 'none' : 'translateY(28px)',
        transition: still ? 'none' : `opacity .75s cubic-bezier(.2,.7,.2,1) ${delay}ms, transform .75s cubic-bezier(.2,.7,.2,1) ${delay}ms`,
        willChange: 'opacity, transform',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ---- Product modal --------------------------------------------------------
// Opens on card click. Carries the full description, a click-through gallery
// and the only "Buy now" that actually leaves for Stripe.

function ProductModal({ product, onClose }) {
  const [i, setI] = React.useState(0);
  const closeRef = React.useRef(null);
  const images = (product && product.images) || [];

  // Esc to close, and lock the page behind the modal so it doesn't scroll.
  React.useEffect(() => {
    if (!product) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setI(v => (v + 1) % images.length);
      if (e.key === 'ArrowLeft') setI(v => (v - 1 + images.length) % images.length);
    };
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    if (closeRef.current) closeRef.current.focus();
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = prev; };
  }, [product, images.length]);

  React.useEffect(() => { setI(0); }, [product && product.id]);

  if (!product) return null;
  const price = formatPrice(product.price);

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center p-4 md:p-8"
      style={{ background: 'rgba(19,17,10,.72)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', animation: 'shopFade .25s ease' }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={product.name}
    >
      <div
        className="relative w-full max-w-[1040px] max-h-full overflow-y-auto rounded-3xl"
        style={{ background: '#EAE6D7', color: '#201C12', animation: 'shopRise .35s cubic-bezier(.2,.8,.2,1)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeRef}
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full flex items-center justify-center font-mono text-[15px]"
          style={{ background: '#201C12', color: '#EAE6D7' }}
        >
          ✕
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Gallery */}
          <div className="p-4 md:p-6 flex flex-col gap-3">
            <div className="relative w-full rounded-2xl overflow-hidden" style={{ paddingBottom: '100%', background: '#dfdac6' }}>
              <ShopImage slug={images[i]} alt={`${product.name} — image ${i + 1}`} />
            </div>

            {images.length > 1 && (
              <div className="flex gap-3">
                {images.map((slug, n) => (
                  <button
                    key={slug}
                    onClick={() => setI(n)}
                    aria-label={`View image ${n + 1}`}
                    className="relative flex-1 rounded-xl overflow-hidden"
                    style={{ paddingBottom: '28%', background: '#dfdac6', outline: n === i ? '2px solid #FF6C00' : '1px solid rgba(32,28,18,.12)', outlineOffset: -2, opacity: n === i ? 1 : .62, transition: 'opacity .2s' }}
                  >
                    <ShopImage slug={slug} alt="" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Detail */}
          <div className="p-6 md:p-10 flex flex-col md:justify-center">
            <span className="font-mono text-[10px] uppercase tracking-[.22em]" style={{ color: '#FF6C00' }}>{product.type}</span>
            <h2 className="mt-3 font-display leading-[.95]" style={{ fontSize: 'clamp(30px, 3.6vw, 48px)' }}>
              <span className="skew-italic">{product.name}</span>
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed" style={{ color: 'rgba(32,28,18,.75)' }}>{product.blurb}</p>

            <div className="mt-7 flex items-baseline gap-4">
              <span className="font-mono text-[22px] font-bold">{price || 'Price at checkout'}</span>
              <span className="font-mono text-[11px] uppercase tracking-[.18em]" style={{ color: 'rgba(32,28,18,.5)' }}>{product.meta}</span>
            </div>

            <a
              href={product.stripe}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackShop('shop_checkout_click', product.id)}
              className="btn-shine mt-7 inline-flex items-center justify-center gap-3 px-7 py-4 rounded-full font-mono text-[13px] uppercase tracking-[.18em] font-bold"
              style={{ background: '#FF6C00', color: '#EAE6D7' }}
              data-blob-hover
            >
              Buy now <span style={{ fontFamily: 'Anton' }}>→</span>
            </a>

            <p className="mt-5 font-mono text-[10px] uppercase tracking-[.16em] leading-relaxed" style={{ color: 'rgba(32,28,18,.45)' }}>
              Secure checkout via Stripe · Opens in a new tab
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---- Card -----------------------------------------------------------------

function ProductCard({ product, onOpen }) {
  const [hover, setHover] = React.useState(false);
  const images = product.images || [];
  // Hover swaps to the second shot where one exists; single-image products
  // just get the scale.
  const shown = hover && images.length > 1 ? images[1] : images[0];
  const price = formatPrice(product.price);

  return (
    <button
      onClick={() => { trackShop('shop_product_open', product.id); onOpen(product); }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="group flex flex-col rounded-2xl overflow-hidden text-left h-full"
      style={{ background: '#dfdac6', border: '1px solid rgba(32,28,18,.08)' }}
      data-blob-hover
    >
      {/* Image well. paddingBottom rather than aspect-ratio — the latter had
          cross-browser trouble on this project. */}
      <div className="relative w-full overflow-hidden" style={{ paddingBottom: '100%', background: '#EAE6D7' }}>
        {shown ? (
          <ShopImage
            slug={shown}
            alt={product.name}
            style={{ transition: 'transform .7s cubic-bezier(.2,.7,.2,1)', transform: hover ? 'scale(1.05)' : 'none' }}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-display" style={{ fontSize: 'clamp(56px, 9vw, 120px)', color: 'rgba(32,28,18,.09)' }}>UP</span>
          </div>
        )}

        {/* Slides up over the image on hover. Always in the DOM so touch
            devices, which never hover, still get the affordance on tap. */}
        <div
          className="absolute left-3 right-3 bottom-3 flex items-center justify-center rounded-full font-mono text-[12px] uppercase tracking-[.18em] font-bold py-3"
          style={{
            background: '#FF6C00',
            color: '#EAE6D7',
            transition: 'transform .32s cubic-bezier(.2,.8,.2,1), opacity .32s',
            transform: hover ? 'translateY(0)' : 'translateY(calc(100% + 12px))',
            opacity: hover ? 1 : 0,
          }}
        >
          View details <span className="ml-2" style={{ fontFamily: 'Anton' }}>→</span>
        </div>

        {images.length > 1 && (
          <span
            className="absolute top-3 right-3 font-mono text-[10px] uppercase tracking-[.16em] px-2.5 py-1 rounded-full"
            style={{ background: 'rgba(32,28,18,.6)', color: '#EAE6D7' }}
          >
            {images.length} photos
          </span>
        )}
      </div>

      <div className="flex-1 px-5 py-4 flex flex-col gap-1.5">
        <h3 className="font-mono text-[13px] uppercase tracking-[.1em] font-bold leading-snug">{product.name}</h3>
        <p
          className="text-[13px] leading-relaxed"
          style={{ color: 'rgba(32,28,18,.6)', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
        >
          {product.blurb}
        </p>
        <div className="mt-auto pt-2 flex items-end justify-between gap-3">
          <span className="font-mono text-[13px]" style={{ color: price ? '#201C12' : 'rgba(32,28,18,.45)' }}>
            {price || 'Price at checkout'}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[.18em]" style={{ color: 'rgba(32,28,18,.45)' }}>{product.meta}</span>
        </div>
      </div>
    </button>
  );
}

// ---- Page -----------------------------------------------------------------

function Shop({ theme }) {
  const products = C('shop.products', SHOP_PRODUCTS);
  const types = ['All', ...Array.from(new Set(products.map(p => p.type).filter(Boolean)))];
  const [filter, setFilter] = React.useState('All');
  const [active, setActive] = React.useState(null);
  const shown = filter === 'All' ? products : products.filter(p => p.type === filter);

  return (
    <section data-screen-label="Shop" className="relative" style={{ background: '#EAE6D7', color: '#201C12', paddingTop: 'clamp(112px, 14vw, 176px)', paddingBottom: 'var(--pad-y, 96px)' }}>
      <div className="max-w-[1400px] mx-auto px-5 md:px-8">

        <Reveal>
          <Link href="/" className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[.18em] opacity-60 hover:opacity-100" data-blob-hover>
            ← Back to UP Dietitian
          </Link>

          {/* Second word outlined, as on the reference. -webkit-text-stroke
              needs a transparent fill; unsupported browsers read it solid. */}
          <h1 className="mt-6 font-display leading-[.85]" style={{ fontSize: 'clamp(56px, 12vw, 172px)' }}>
            <span className="skew-italic">UP</span>{' '}
            <span className="skew-italic" style={{ color: 'transparent', WebkitTextStroke: '2px #201C12' }}>MERCH.</span>
          </h1>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-8 flex flex-wrap items-end justify-between gap-6">
            <p className="max-w-[46ch] font-mono text-[12px] md:text-[13px] uppercase tracking-[.14em] leading-relaxed opacity-70">
              {C('shop.intro', 'Train in it. Race in it. Performance focus apparel.')}
            </p>
            <a
              href="#the-kit"
              className="btn-shine inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-mono text-[12px] uppercase tracking-[.18em] font-bold"
              style={{ background: '#201C12', color: '#EAE6D7' }}
              data-blob-hover
            >
              <span className="inline-block w-1.5 h-1.5 rounded-full pulse-dot" style={{ background: '#FF6C00' }}></span>
              Shop the kit
            </a>
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div
            id="the-kit"
            className="mt-14 rounded-full px-6 py-4 flex flex-wrap items-center justify-between gap-4"
            style={{ background: '#FF6C00', color: '#EAE6D7', scrollMarginTop: 96 }}
          >
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-[13px] uppercase tracking-[.16em] font-bold">The kit</span>
              <span className="font-mono text-[11px] tracking-[.12em] opacity-75">
                {shown.length} {shown.length === 1 ? 'item' : 'items'}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {types.map((t) => {
                const on = t === filter;
                return (
                  <button
                    key={t}
                    onClick={() => setFilter(t)}
                    className="px-4 py-2 rounded-full font-mono text-[11px] uppercase tracking-[.16em] transition-colors"
                    style={{ background: on ? '#201C12' : 'transparent', color: '#EAE6D7', border: `1px solid ${on ? '#201C12' : 'rgba(234,230,215,.5)'}` }}
                    data-blob-hover
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {shown.map((p, n) => (
            <Reveal key={p.id} delay={n * 110} className="h-full">
              <ProductCard product={p} onOpen={setActive} />
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="mt-12 text-center font-mono text-[11px] uppercase tracking-[.16em] opacity-50">
            {C('shop.terms', 'Secure checkout via Stripe · All sales final — no refunds or returns for change of mind.')}
          </p>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-12 rounded-3xl noise relative px-6 py-16 md:py-24 text-center" style={{ background: '#1D4032', color: '#EAE6D7' }}>
            <h2 className="font-display leading-[.95] mx-auto max-w-[22ch]" style={{ fontSize: 'clamp(32px, 5vw, 68px)' }}>
              <span className="skew-italic">There is no finish line.</span>{' '}
              <span className="skew-italic" style={{ color: '#FF6C00' }}>Just the next level UP.</span>
            </h2>
            <p className="mt-6 font-mono text-[11px] uppercase tracking-[.2em] opacity-60">Train hard. Eat smart. Go UP.</p>
          </div>
        </Reveal>

      </div>

      <ProductModal product={active} onClose={() => setActive(null)} />
    </section>
  );
}

window.Shop = Shop;
