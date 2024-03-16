// /** @type {import('next').NextConfig} */

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ig-s3-public-dev-001.s3.eu-west-2.amazonaws.com',
        port: '',
        pathname: '/**',
      },
    ],
    domains: ['ig-s3-public-dev-001.s3.eu-west-2.amazonaws.com'],
  },
  env: {
    NEXT_APP_VERSION: process.env.NEXT_APP_VERSION,
    NEXTAUTH_URL: process.env.NEXT_PUBLIC_API_KEY,
  },
};
