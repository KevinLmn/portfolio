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
};

module.exports = nextConfig;
