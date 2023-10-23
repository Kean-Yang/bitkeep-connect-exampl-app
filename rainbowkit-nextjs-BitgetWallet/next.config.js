/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'web3.bitget.com',
        port: '',
        // pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'static-web.bitkeep.com',
        port: '',
        // pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.bitkeep.vip',
        port: '',
        // pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
