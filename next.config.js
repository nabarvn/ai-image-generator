/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "aigeneratedvisuals.blob.core.windows.net",
        port: "",
        pathname: "/images/**",
      },
    ],
    domains: [
      "links.papareact.com",
      "aigeneratedvisuals.blob.core.windows.net",
    ],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    deviceSizes: [
      16, 32, 48, 64, 96, 128, 256, 384, 512, 640, 750, 828, 1080, 1200, 1920,
      2048, 3840,
    ],
  },
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
