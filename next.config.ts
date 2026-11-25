import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  // 루트 접속 시 기본 언어(한국어)로 이동
  redirects() {
    return [{ source: "/", destination: "/ko", permanent: false }];
  },
};

export default nextConfig;
