/**
 * Custom Next.js image loader.
 *
 * Replaces Vercel's image optimizer (which sat behind a Hobby-tier monthly
 * quota and 402'd the entire site once exhausted) with Supabase's image
 * transformation endpoint — included free with the Pro plan David already
 * pays for, and CDN-cached by Cloudflare in front.
 *
 * Routing:
 *   • Supabase Storage public URLs → /storage/v1/render/image/public/...
 *     with ?width=...&resize=contain&quality=... (aspect-preserved width
 *     resize; tested empirically — height-only or both-dim modes either
 *     squish or crop, contain on width is the sweet spot).
 *   • Anything else (local /public assets, external Unsplash, etc.) →
 *     served verbatim. Local assets are small enough not to need a
 *     transformation pass; mixing in a server-side resizer for them would
 *     just add a hop.
 *
 * Next.js calls this once per (src, width) pair when generating srcset, so
 * a single property image fans out to ~6-8 unique render URLs covering the
 * deviceSizes/imageSizes lists. Supabase bills per *origin* image (not per
 * variant), so the cardinality multiplier doesn't hurt the quota.
 */

const SUPABASE_PUBLIC_OBJECT = /^(https:\/\/[^/]+\.supabase\.co)\/storage\/v1\/object\/public\/(.+)$/;

type LoaderArgs = {
  src: string;
  width: number;
  quality?: number;
};

export default function imageLoader({ src, width, quality }: LoaderArgs): string {
  const match = src.match(SUPABASE_PUBLIC_OBJECT);
  if (!match) {
    // Local /public files, external URLs — pass through unchanged.
    return src;
  }

  const [, origin, path] = match;
  const params = new URLSearchParams({
    width: String(width),
    resize: "contain",
    quality: String(quality ?? 75),
  });
  return `${origin}/storage/v1/render/image/public/${path}?${params.toString()}`;
}
