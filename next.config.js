/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  pageExtensions: ["js", "jsx"],
  images: {
    // Note: For static export, unoptimized must be true
    // Images are already pre-optimized as WebP in the public folder
    unoptimized: true,
    domains: ["localhost"],
    formats: ["image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  webpack: (config) => {
    config.resolve.extensions = [".js", ".jsx", ...config.resolve.extensions];

    config.module.rules.push({
      test: /\.pdf$/,
      use: [
        {
          loader: "file-loader",
          options: {
            name: "[path][name].[ext]",
          },
        },
      ],
    });

    config.module.rules.push({
      test: /\.(png|jpg|jpeg|gif|webp)$/i,
      type: "asset/resource",
    });

    return config;
  },
  sassOptions: {
    includePaths: ["./src/styles"],
  },
  output: "export", // static export
  trailingSlash: true,
  compress: true,
  productionBrowserSourceMaps: false,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
  assetPrefix: process.env.NEXT_PUBLIC_ASSET_PREFIX || "",
  poweredByHeader: false,
  generateEtags: false,
  // Note: headers() doesn't work with static export
  // Configure these headers in your deployment server (nginx, Apache, Vercel, etc.)
  // Recommended headers for production:
  // - X-Frame-Options: DENY
  // - X-Content-Type-Options: nosniff
  // - Referrer-Policy: strict-origin-when-cross-origin
  // - Permissions-Policy: camera=(), microphone=(), geolocation=()
};

module.exports = nextConfig;
