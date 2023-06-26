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
  },
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
