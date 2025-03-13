import type { NextConfig } from "next";

const config: NextConfig = {
  webpack: (config, { isServer }) => {
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
      layers: true,
    };

    // Add rule for WebAssembly files
    config.module.rules.push({
      test: /\.wasm$/,
      type: "webassembly/async",
    });

    // Configure environment for async functions in browser
    if (!isServer) {
      config.output = {
        ...config.output,
        environment: {
          ...config.output?.environment,
          asyncFunction: true,
        },
      };
    }

    return config;
  },
  eslint: {
    // Enable ESLint flat config support
    ignoreDuringBuilds: true, // Temporarily ignore during builds
  },
};

export default config;
