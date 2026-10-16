// Sends the homepage through api/render.js.
//
// vercel.json's rewrite already does this for every other page, but Vercel
// serves real files before applying rewrites, and "/" matches index.html, so
// the homepage went out as the empty client-only shell. Middleware runs ahead
// of the filesystem, so it can catch "/" first. (This is the header the
// rewrite() helper in @vercel/functions sets; written out to avoid the dep.)

export const config = { matcher: '/', runtime: 'nodejs' };

export default function middleware(request) {
  const target = new URL('/api/render?path=/', request.url);
  return new Response(null, { headers: { 'x-middleware-rewrite': target.toString() } });
}
