/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URL: process.env.API_URL,
  },
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  eslint: {
    dirs: ["features", "pages", "shared", "styles"],
  },
};

module.exports = nextConfig;
