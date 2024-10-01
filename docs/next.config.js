// @ts-ignore
const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.jsx',
  defaultShowCopyCode: true,
  readingTime: true,
})

module.exports = withNextra({
  output: 'export',
  images: { unoptimized: true },
  basePath: "/lucid-evolution",
})
