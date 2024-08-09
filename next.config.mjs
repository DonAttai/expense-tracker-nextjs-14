import { hostname } from "os";

/** @type {import('next').NextConfig} */
webpack: (config) => {
  config.externals = [...config.externals, "bcrypt"];
  return config;
};
const nextConfig = {
  // images: {
  //   remotePatterns: [
  //     {
  //       hostname: "lh3.googleusercontent.com",
  //     },
  //   ],
  // },
};

export default nextConfig;
