// next.config.ts

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // 👈 enables static export (replaces deprecated `next export`)
  reactStrictMode: true,
};

export default nextConfig;
