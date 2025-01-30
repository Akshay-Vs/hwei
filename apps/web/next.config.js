import withSerwistInit from '@serwist/next';
import { fileURLToPath } from 'url';
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const withSerwist = withSerwistInit({
  swSrc: 'app/sw.ts',
  swDest: 'public/sw.js',
});

const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@hwei/ui"],
  output: "standalone",
  experimental: {
    outputFileTracingRoot: path.join(__dirname, "../../"),
  },
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