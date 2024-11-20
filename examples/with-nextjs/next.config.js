/** @type {import('next').NextConfig} */
const nextConfig = {
  
  output: 'standalone',
  reactStrictMode: true,
  webpack: (config, {isServer}) => {
    config.experiments = { 
      asyncWebAssembly: true,
      topLevelAwait: true,
      layers: true
    }
    // fix warnings for async functions in the browser (https://github.com/vercel/next.js/issues/64792)
    if (!isServer) {
      config.output.environment = { ...config.output.environment, asyncFunction: true };
    }
    return config
  },
    env:{
    BLOCKFROST_KEY: process.env.BLOCKFROST_KEY,
    API_URL: process.env.API_URL,
    NETWORK: process.env.NETWORK
  }
}

module.exports = nextConfig
