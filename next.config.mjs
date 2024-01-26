/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  // basePath: "",
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's2.coinmarketcap.com',
        port: ''
      }
    ]
  }
};

export default nextConfig;
