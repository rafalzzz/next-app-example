/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  eslint: {
    dirs: ["features", "pages", "shared", "styles"],
  },
};

module.exports = nextConfig;
