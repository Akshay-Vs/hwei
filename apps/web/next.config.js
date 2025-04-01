import withSerwistInit from '@serwist/next';

const withSerwist = withSerwistInit({
  disable: process.env.NODE_ENV !== "production",
  swSrc: 'app/sw.ts',
  swDest: 'public/sw.js',
});

const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@hwei/ui'],
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        hostname: 'utfs.io',
        port: '',
        pathname: '/**',
      },
      {
        hostname: 'utfs.sh',
        port: '',
        pathname: '/**',
      },
      {
        hostname: '*.utfs.sh',
        port: '',
        pathname: '/**',
      },
      {
        hostname: '*.ufs.sh',
        port: '',
        pathname: '/**',
      },
      {
        hostname: 'img.clerk.com',
        port: '',
        pathname: '/**',
      },
      {
        hostname: 'images.pexels.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default withSerwist(nextConfig);