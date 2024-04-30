/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "teetag.com",
      "teetag.wpengine.com",
      "teetag-app-documents.s3.amazonaws.com",
      "lh3.googleusercontent.com",
    ],
  },
};

module.exports = nextConfig;
