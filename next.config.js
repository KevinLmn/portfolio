/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  pageExtensions: ["js", "jsx"],
  images: {
    unoptimized: true,
    domains: ["localhost"],
    formats: ["image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  webpack: (config) => {
    config.resolve.extensions = [".js", ".jsx", ...config.resolve.extensions];
    // Support for PDF files
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
    // Support for image files
    config.module.rules.push({
      test: /\.(png|jpg|jpeg|gif|webp)$/i,
      type: "asset/resource",
    });
    return config;
  },
  // Configure CSS modules
  sassOptions: {
    includePaths: ["./src/styles"],
  },
  // Enable static exports
  output: "export",
  // Ensure proper client-side navigation
  trailingSlash: true,
  // Enable compression
  compress: true,
  // Disable production source maps
  productionBrowserSourceMaps: false,
  // Add basePath if deploying to a subdirectory
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
  // Add assetPrefix if using a CDN
  assetPrefix: process.env.NEXT_PUBLIC_ASSET_PREFIX || "",
  // Clean the output directory before each build
  clean: true,
  // Disable server-side features for static export
  experimental: {
    appDir: false,
  },
  // Disable server-side features
  serverless: false,
  // Disable server-side rendering
  ssr: false,
  // Optimize for static export
  optimizeFonts: true,
  optimizeImages: true,
  poweredByHeader: false,
  generateEtags: false,
};

module.exports = nextConfig;
