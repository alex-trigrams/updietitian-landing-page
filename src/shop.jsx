// Shop — the UP merch store.
//
// Deliberately backend-free: every product links straight out to its own
// Stripe Payment Link, so Stripe hosts the cart, the payment form and the
// receipt. Nothing here touches card details, so there's no server, no SDK,
// no secret key and no PCI surface on updietitian.com.
//
// Layout follows the tempr.co/shop reference — one page, no product detail
// routes: a big outlined-word masthead, an accent filter bar, then a card
// grid whose images swap and reveal a buy pill on hover.
//
// PRICES: these are typed by hand and are NOT read from Stripe, so changing a
// price in the Stripe dashboard will silently disagree with the figure shown
// here. Update both together. A product left at `price: null` falls back to
// "Price at checkout" rather than displaying a wrong number.

const SHOP_PRODUCTS = [
  {
    id: 'tee',
    name: 'UP Oversize Tee',
    type: 'Tees',
    price: 40,
    meta: 'Oversized fit',
    blurb: 'A relaxed, everyday cotton staple designed for comfort, style and effortless lifestyle wear — coffee runs, rest days, weekend adventures and everything in between.',
    stripe: 'https://buy.stripe.com/28EeV62bz8OQ6QW2dH3Nm02',
  },
  {
    id: 'tank',
    name: 'UP Active Tank',
    type: 'Tanks',
    price: 45,
    meta: 'Cropped fit',
    blurb: 'A flattering cropped active tank for those who like to train hard and look good doing it. Built for every session, from long runs to Hyrox.',
    stripe: 'https://buy.stripe.com/cNi28k4jHd56dfkcSl3Nm01',
  },
  {
    id: 'socks',
    name: 'Level UP Running & Cycling Socks',
    type: 'Socks',
    price: 19.99,
    meta: 'One size · US 7–12',
    blurb: 'Fuel your training from head to toe. Custom UP Dietitian socks for running, cycling and everyday training, with a comfortable, performance-focused fit.',
    stripe: 'https://buy.stripe.com/28E4gs6rP9SU6QW5pT3Nm00',
  },
];

// Product photography drops in as assets/images/shop/<id>.jpg (+ .avif), with
// an optional <id>-alt for the hover swap. Until a file exists the card shows
// the branded placeholder, so the grid is presentable with no photos at all.
const SHOP_IMAGES = {};

function formatPrice(v) {
  if (v == null) return null;
  return `$${Number(v).toFixed(2)} AUD`;
}

// A single product tile. The whole card is the link — clicking anywhere on it
// opens that product's Stripe checkout in a new tab, so the shop stays put
// behind it.
function ProductCard({ product }) {
  const [hover, setHover] = React.useState(false);
  const img = SHOP_IMAGES[product.id];
  const price = formatPrice(product.price);

  const onBuy = () => {
    // Mirrors the custom events in analytics.jsx — lets Lauren see which
    // product actually sends people to checkout.
    try { window.va('event', { name: 'shop_checkout_click', data: { product: product.id } }); } catch (e) {}
  };

  return (
    <a
      href={product.stripe}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onBuy}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="group flex flex-col rounded-2xl overflow-hidden"
      style={{ background: '#dfdac6', border: '1px solid rgba(32,28,18,.08)' }}
      data-blob-hover
    >
      {/* Image well — square, on a slightly lighter ground than the info bar
          so the card reads as two stacked blocks like the reference. */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '1/1', background: '#EAE6D7' }}>
        {img ? (
          <picture>
            <source srcSet={hover && img.altAvif ? img.altAvif : img.avif} type="image/avif" />
            <img
              src={hover && img.alt ? img.alt : img.src}
              alt={product.name}
              loading="lazy"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform .6s ease', transform: hover ? 'scale(1.04)' : 'none' }}
            />
          </picture>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="font-display"
              style={{ fontSize: 'clamp(56px, 9vw, 120px)', color: 'rgba(32,28,18,.09)', letterSpacing: '.04em', transition: 'transform .6s ease', transform: hover ? 'scale(1.06)' : 'none', display: 'inline-block' }}
            >
              UP
            </span>
          </div>
        )}

        {/* Buy pill — slides up over the bottom of the image on hover, the
            reference's "quick add" moment repointed at Stripe. It's always in
            the DOM so touch devices (which never hover) still see it. */}
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
          Buy now <span className="ml-2" style={{ fontFamily: 'Anton' }}>→</span>
        </div>
      </div>

      {/* Info bar */}
      <div className="flex-1 px-5 py-4 flex flex-col gap-1.5">
        <h3 className="font-mono text-[13px] uppercase tracking-[.1em] font-bold leading-snug" style={{ color: '#201C12' }}>
          {product.name}
        </h3>
        {product.blurb && (
          <p
            className="text-[13px] leading-relaxed"
            style={{ color: 'rgba(32,28,18,.6)', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
          >
            {product.blurb}
          </p>
        )}
        <div className="mt-auto pt-2 flex items-end justify-between gap-3">
          <span className="font-mono text-[13px]" style={{ color: price ? '#201C12' : 'rgba(32,28,18,.45)' }}>
            {price || 'Price at checkout'}
          </span>
          {product.meta && (
            <span className="font-mono text-[10px] uppercase tracking-[.18em]" style={{ color: 'rgba(32,28,18,.45)' }}>
              {product.meta}
            </span>
          )}
        </div>
      </div>
    </a>
  );
}

function Shop({ theme }) {
  const products = C('shop.products', SHOP_PRODUCTS);
  // Category pills are derived from the products themselves, so adding a
  // product adds its filter without touching this component.
  const types = ['All', ...Array.from(new Set(products.map(p => p.type).filter(Boolean)))];
  const [filter, setFilter] = React.useState('All');
  const shown = filter === 'All' ? products : products.filter(p => p.type === filter);

  return (
    <section data-screen-label="Shop" className="relative" style={{ background: '#EAE6D7', color: '#201C12', paddingTop: 'clamp(112px, 14vw, 176px)', paddingBottom: 'var(--pad-y, 96px)' }}>
      <div className="max-w-[1400px] mx-auto px-5 md:px-8">

        <Link href="/" className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[.18em] opacity-60 hover:opacity-100" data-blob-hover>
          ← Back to UP Dietitian
        </Link>

        {/* Masthead — second word outlined, as on the reference. The stroke is
            drawn with -webkit-text-stroke and needs a transparent fill; if a
            browser doesn't support it the word simply reads solid. */}
        <h1 className="mt-6 font-display leading-[.85]" style={{ fontSize: 'clamp(56px, 12vw, 172px)' }}>
          <span className="skew-italic">UP</span>{' '}
          <span
            className="skew-italic"
            style={{ color: 'transparent', WebkitTextStroke: '2px #201C12' }}
          >
            merch.
          </span>
        </h1>

        <div className="mt-8 flex flex-wrap items-end justify-between gap-6">
          <p className="max-w-[46ch] font-mono text-[12px] md:text-[13px] uppercase tracking-[.14em] leading-relaxed opacity-70">
            {C('shop.intro', 'Train in it. Race in it. The kit we actually wear — now yours.')}
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

        {/* Filter bar */}
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
              const active = t === filter;
              return (
                <button
                  key={t}
                  onClick={() => setFilter(t)}
                  className="px-4 py-2 rounded-full font-mono text-[11px] uppercase tracking-[.16em] transition-colors"
                  style={{
                    background: active ? '#201C12' : 'transparent',
                    color: '#EAE6D7',
                    border: `1px solid ${active ? '#201C12' : 'rgba(234,230,215,.5)'}`,
                  }}
                  data-blob-hover
                >
                  {t}
                </button>
              );
            })}
          </div>
        </div>

        {/* Grid */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {shown.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>

        <p className="mt-12 text-center font-mono text-[11px] uppercase tracking-[.16em] opacity-50">
          {C('shop.terms', 'Secure checkout via Stripe · All sales final — no refunds or returns for change of mind.')}
        </p>

        {/* Closing panel */}
        <div className="mt-12 rounded-3xl noise relative px-6 py-16 md:py-24 text-center" style={{ background: '#1D4032', color: '#EAE6D7' }}>
          <h2 className="font-display leading-[.95] mx-auto max-w-[22ch]" style={{ fontSize: 'clamp(32px, 5vw, 68px)' }}>
            <span className="skew-italic">There is no finish line.</span>{' '}
            <span className="skew-italic" style={{ color: '#FF6C00' }}>Just the next level UP.</span>
          </h2>
          <p className="mt-6 font-mono text-[11px] uppercase tracking-[.2em] opacity-60">
            Train hard. Eat smart. Go UP.
          </p>
        </div>

      </div>
    </section>
  );
}

window.Shop = Shop;
