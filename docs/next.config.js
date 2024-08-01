// @ts-ignore
const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.jsx',
  defaultShowCopyCode: true,
  readingTime: true,
})
 
module.exports = {
  ...withNextra({
    images: { unoptimized: true },
  }),
  output: 'export',
  basePath: "/lucid-evolution",
}
 