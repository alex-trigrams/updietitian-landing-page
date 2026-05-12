// Shared hooks + theme helpers.

const CALENDLY_URL = "#book"; // TODO: swap with real Calendly link

const THEMES = {
  green:  { bg: "#1D4032", fg: "#EAE6D7", accent: "#FF6C00", sub: "rgba(234,230,215,.65)", line: "rgba(234,230,215,.18)" },
  orange: { bg: "#FF6C00", fg: "#201C12", accent: "#1D4032", sub: "rgba(32,28,18,.72)",    line: "rgba(32,28,18,.18)"   },
  sand:   { bg: "#EAE6D7", fg: "#201C12", accent: "#FF6C00", sub: "rgba(32,28,18,.65)",    line: "rgba(32,28,18,.16)"   },
};

function useScrollY() {
  const [y, setY] = React.useState(0);
  React.useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => { setY(window.scrollY || 0); raf = 0; });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return y;
}

function useInView(ref, options = { threshold: 0.18 }) {
  const [seen, setSeen] = React.useState(false);
  React.useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) setSeen(true); });
    }, options);
    io.observe(ref.current);
    return () => io.disconnect();
  }, [ref]);
  return seen;
}

function useCounter(target, trigger, duration = 1400) {
  const [v, setV] = React.useState(0);
  React.useEffect(() => {
    if (!trigger) return;
    const start = performance.now();
    let raf;
    const tick = (t) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setV(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [trigger, target, duration]);
  return v;
}

// Cursor blob micro-interaction
function useCursorBlob() {
  React.useEffect(() => {
    const blob = document.getElementById('cursor-blob');
    if (!blob) return;
    let x = -100, y = -100, tx = -100, ty = -100, raf;
    const move = (e) => { tx = e.clientX; ty = e.clientY; };
    const loop = () => {
      x += (tx - x) * 0.18;
      y += (ty - y) * 0.18;
      blob.style.transform = `translate3d(${x - 9}px, ${y - 9}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    const enterBig = () => { blob.style.width = '56px'; blob.style.height = '56px'; blob.style.marginTop = '-19px'; blob.style.marginLeft = '-19px'; };
    const leaveBig = () => { blob.style.width = '18px'; blob.style.height = '18px'; blob.style.marginTop = '0'; blob.style.marginLeft = '0'; };
    window.addEventListener('mousemove', move);
    document.querySelectorAll('[data-blob-hover]').forEach(el => {
      el.addEventListener('mouseenter', enterBig);
      el.addEventListener('mouseleave', leaveBig);
    });
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('mousemove', move); };
  }, []);
}

Object.assign(window, { CALENDLY_URL, THEMES, useScrollY, useInView, useCounter, useCursorBlob });
