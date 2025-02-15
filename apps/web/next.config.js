import withSerwistInit from '@serwist/next';

const withSerwist = withSerwistInit({
  swSrc: 'app/sw.ts',
  swDest: 'public/sw.js',
});

const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@hwei/ui"],
  output: "standalone",
  images: {
    remotePatterns: [
      {
        hostname: 'utfs.io',
        port: '',
        pathname: '/**',
      }, {
        hostname: '23ujkrayxy.ufs.sh',
        port: '',
        pathname: '/**',
      }, {
        hostname: 'images.pexels.com',
        port: '',
        pathname: '/**',
      },
    ]
  }
};

export default withSerwist(nextConfig);