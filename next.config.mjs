import CopyPlugin from "copy-webpack-plugin";
import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // Enable WebAssembly
    config.experiments = {
      asyncWebAssembly: true,
      layers: true,
    };

    // Add file-loader rule for IVS player assets
    config.module.rules.push({
      test: /[\\/]amazon-ivs-player[\\/]dist[\\/]assets[\\/]/,
      loader: "file-loader",
      type: "javascript/auto",
      options: {
        name: "[name].[ext]",
        outputPath: "static/ivs-assets/",
        publicPath: "/_next/static/ivs-assets/",
      },
    });

    // Add CopyPlugin to copy necessary assets
    if (!isServer) {
      config.plugins.push(
        new CopyPlugin({
          patterns: [
            {
              from: "node_modules/amazon-ivs-player/dist/assets/*.wasm",
              to: "static/ivs-assets/[name].[ext]",
            },
            {
              from: "node_modules/amazon-ivs-player/dist/assets/*.js",
              to: "static/ivs-assets/[name].[ext]",
            },
          ],
        })
      );
    }

    return config;
  },
  async headers() {
    return [
      {
        source: "/_next/static/ivs-assets/:path*",
        headers: [
          {
            key: "Content-Type",
            value: "application/wasm",
            test: /\.(wasm)$/,
          },
          {
            key: "Content-Encoding",
            value: "gzip",
            test: /\.(wasm|js)$/,
          },
        ],
      },
    ];
  },
};

export default nextConfig;