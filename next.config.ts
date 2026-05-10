import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Vercel Hobby's image-optimization quota is finite. Once it ran out the
    // whole site started returning 402 OPTIMIZED_IMAGE_REQUEST_PAYMENT_REQUIRED
    // for every <Image>, including the hero, logo, and every property thumb.
    // Bypass the optimizer entirely: <Image> serves the original URL.
    //
    // This is safe here because:
    //   • Property uploads are already client-compressed to max 1600 px @ 75 %
    //     in compressImage (see src/lib/compress-image.ts) — typical 500-700 KB.
    //   • Supabase Storage is fronted by Cloudflare with strong cache hits.
    //   • Public-dir assets are small (hero is the largest, kept ≤ 200 KB).
    //
    // Follow-up: once Supabase Image Transformations is toggled on for this
    // project, swap this for a custom loader that hits the render endpoint.
    unoptimized: true,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [75, 80, 85, 90],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "*.supabase.co",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/admin/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
        ],
      },
      {
        source: "/admin",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/properties/:slug([a-z0-9-]*[g-z][a-z0-9-]*)",
        destination: "/properties",
        permanent: true,
      },
      {
        source: "/property_category/:path*",
        destination: "/properties",
        permanent: true,
      },
      {
        source: "/property_action_category/:path*",
        destination: "/properties",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
