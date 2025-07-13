import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    config.experiments = {
      asyncWebAssembly: true,
      topLevelAwait: true,
      layers: true,
    };

    // Exclude WASM and Cardano libraries from server-side bundling
    if (isServer) {
      config.externals = config.externals || [];
      config.externals.push({
        "@anastasia-labs/cardano-multiplatform-lib-nodejs":
          "commonjs @anastasia-labs/cardano-multiplatform-lib-nodejs",
        "@anastasia-labs/cardano-multiplatform-lib-browser":
          "commonjs @anastasia-labs/cardano-multiplatform-lib-browser",
        "@emurgo/cardano-message-signing-nodejs":
          "commonjs @emurgo/cardano-message-signing-nodejs",
        "@emurgo/cardano-message-signing-browser":
          "commonjs @emurgo/cardano-message-signing-browser",
      });
    }

    // fix warnings for async functions in the browser (https://github.com/vercel/next.js/issues/64792)
    if (!isServer) {
      config.output.environment = {
        ...config.output.environment,
        asyncFunction: true,
      };
    }
    return config;
  },
  env: {
    // Add any environment variables here if needed
  },
};

export default nextConfig;
