/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URL: process.env.API_URL,
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_KEY: process.env.SUPABASE_KEY,
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
