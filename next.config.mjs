/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // P0: keep production builds type-safe by failing on TypeScript errors.
    ignoreBuildErrors: false,
  },
  images: {
    // P0: re-enable Next.js image optimization for better performance/LCP.
    unoptimized: false,
  },
}

export default nextConfig
