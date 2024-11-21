/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    dirs: ["pages", "components", "lib", "utils", "__tests__", "__mocks__"],
  },
  env: {
    PASSWORD_PROTECT: process.env.ENVIRONMENT === "staging",
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  images: {
    domains: [
      "guesty-listing-images.s3.amazonaws.com",
      "images.ctfassets.net",
      "toast-stage.s3.amazonaws.com",
      "s3.amazonaws.com",
    ],
  },
};

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = (phase) => {
  return withBundleAnalyzer(nextConfig);
};
