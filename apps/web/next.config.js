const path = require("path");

module.exports = {
  reactStrictMode: true,
  transpilePackages: ["@hwei/ui"],
  output: "standalone",
  experimental: {
    outputFileTracingRoot: path.join(__dirname, "../../"),
  },
};
