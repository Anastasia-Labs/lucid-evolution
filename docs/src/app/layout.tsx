import type { FC, ReactNode } from "react";
import type { Metadata } from "next";

import { getPageMap } from "nextra/page-map";
import { Anchor, Banner, Head } from "nextra/components";
import { Layout, Link, Navbar } from "nextra-theme-docs";

import Logo from "../components/Logo";
import Footer from "../components/Footer";

import "./globals.css";

export const metadata: Metadata = {
  description: "A highly scalable transaction building framework for Cardano",
  metadataBase: new URL("https://no-witness-labs.github.io/lucid-evolution"),
  keywords: [
    "Lucid",
    "Evolution",
    "Cardano",
    "blockchain",
  ],
  generator: "Next.js",
  applicationName: "Lucid-Evolution",
  appleWebApp: {
    title: "Lucid-Evolution",
    statusBarStyle: "black-translucent",
  },
  title: {
    default: "Lucid-Evolution",
    template: "%s | Lucid-Evolution",
  },
  openGraph: {
    // https://github.com/vercel/next.js/discussions/50189#discussioncomment-10826632
    url: "./",
    siteName: "Lucid-Evolution",
    locale: "en_US",
    type: "website",
  },
  other: {
    "msapplication-TileColor": "#a04040",
  },
  twitter: {
    site: "https://x.com/AnastasiaLabs",
  },
  alternates: {
    // https://github.com/vercel/next.js/discussions/50189#discussioncomment-10826632
    canonical: "./",
  },
  icons: "https://avatars.githubusercontent.com/u/125997902?s=200&v=4",
};

const RootLayout: FC<{ children: ReactNode; }> =
  async ({ children }) => {
    const pageMap = await getPageMap();
    return (
      <html lang="en" dir="ltr" suppressHydrationWarning>
        <Head />
        <body>
          <Layout
            // banner={<Banner dismissible={false}>
            //   🎉 Lucid-Evolution 2.0 is released. Visit{' '}
            //   <Link href="https://github.com/no-witness-labs/lucid-evolution" className="text-current!">
            //     github.com/no-witness-labs/lucid-evolution
            //   </Link>
            //   for more information.
            // </Banner>}
            navbar={<Navbar
              logo={<Logo />}
              projectLink="https://github.com/no-witness-labs/lucid-evolution"
              chatLink="https://discord.gg/s89P9gpEff"
            />}
            pageMap={pageMap}
            docsRepositoryBase="https://github.com/no-witness-labs/lucid-evolution"
            editLink="Edit this page on GitHub"
            sidebar={{
              autoCollapse: false,
              defaultMenuCollapseLevel: 1,
              defaultOpen: true,
              toggleButton: false,
            }}
            footer={<Footer />}
            toc={{
              extraContent: (
                <>
                  {/* <b className="mt-2 text-xs">Sponsored by:</b>
                  <Anchor href="https://xyflow.com?utm_source=nextra.site&utm_campaign=nextra&utm_content=sidebarLink">
                    <Image
                      src={xyflow}
                      alt="Wire your ideas with xyflow!"
                      className="nextra-border rounded-sm border"
                    />
                  </Anchor> */}
                </>
              )
            }}
            nextThemes={{
              defaultTheme: "dark",
            }}
          >
            {children}
          </Layout>
        </body>
      </html>
    );
  };

export default RootLayout;
