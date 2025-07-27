/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://no-witness-labs.github.io',
  generateRobotsTxt: true,
  output: 'export',
  exclude: ['/server-sitemap.xml'],
  generateIndexSitemap: false,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
  transform: (config, path) => {
    // Add basePath to sitemap URLs
    const url = `${config.siteUrl}/evolution-sdk${path}`;
    return {
      loc: url,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },
};
