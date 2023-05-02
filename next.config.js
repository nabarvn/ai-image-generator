/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
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
