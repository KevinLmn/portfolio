/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  pageExtensions: ["js", "jsx"],
  images: {
    domains: ["raw.githubusercontent.com"],
    unoptimized: process.env.NODE_ENV === "development",
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
  // Disable server-side features
  trailingSlash: true,
  // Optimize images
  images: {
    unoptimized: true,
  },
  // Enable compression
  compress: true,
  // Enable production source maps
  productionBrowserSourceMaps: false,
};

module.exports = nextConfig;
