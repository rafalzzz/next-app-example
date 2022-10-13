/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    dirs: ["features", "pages", "shared", "styles"],
  },
};

module.exports = nextConfig;
