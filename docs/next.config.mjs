//#region Backup Original
// // @ts-ignore
// const withNextra = require('nextra')({
//   theme: 'nextra-theme-docs',
//   themeConfig: './theme.config.jsx',
//   defaultShowCopyCode: true,
//   readingTime: true,
// })

// module.exports = withNextra({
//   output: 'export',
//   images: { unoptimized: true },
//   basePath: "/evolution-sdk",
// })
//#endregion

import nextra from "nextra";

const withNextra = nextra({
  codeHighlight: true,
  defaultShowCopyCode: true,
  latex: true,
  mdxOptions: {
    rehypePrettyCodeOptions: {
      theme: {
        dark: "dark-plus",
        light: "light-plus",
      },
    },
  },
  readingTime: true,
  search: {
    codeblocks: false,
  },
  staticImage: true,
});

export default withNextra({
  basePath: "/evolution-sdk",
  images: {
    unoptimized: true,
  },
  output: "export",
  turbopack: {
    resolveAlias: {
      "next-mdx-import-source-file": "./src/mdx-components.tsx",
    },
  },
});
