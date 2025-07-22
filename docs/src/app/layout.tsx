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
  metadataBase: new URL("https://no-witness-labs.github.io/evolution-sdk"),
  keywords: ["Lucid", "Evolution", "Cardano", "blockchain"],
  generator: "Next.js",
  applicationName: "Evolution-SDK",
  appleWebApp: {
    title: "Evolution-SDK",
    statusBarStyle: "black-translucent",
  },
  title: {
    default: "Evolution-SDK",
    template: "%s | Evolution-SDK",
  },
  openGraph: {
    // https://github.com/vercel/next.js/discussions/50189#discussioncomment-10826632
    url: "./",
    siteName: "Evolution-SDK",
    locale: "en_US",
    type: "website",
  },
  other: {
    "msapplication-TileColor": "#DD7722",
  },
  twitter: {
    site: "https://x.com/nowitnesslabs",
  },
  alternates: {
    // https://github.com/vercel/next.js/discussions/50189#discussioncomment-10826632
    canonical: "./",
  },
  icons: "/evolution-sdk/no-witness-labs-icon.png",
};

const RootLayout: FC<{ children: ReactNode }> = async ({ children }) => {
  const pageMap = await getPageMap();
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <Head />
      <body>
        <Layout
          // banner={<Banner dismissible={false}>
          //   🎉 Evolution-SDK 2.0 is released. Visit{' '}
          //   <Link href="https://github.com/no-witness-labs/evolution-sdk" className="text-current!">
          //     github.com/no-witness-labs/evolution-sdk
          //   </Link>
          //   for more information.
          // </Banner>}
          navbar={
            <Navbar
              logo={<Logo />}
              projectLink="https://github.com/no-witness-labs/evolution-sdk"
              chatLink="https://discord.gg/eqZDvHvW6k"
            />
          }
          pageMap={pageMap}
          docsRepositoryBase="https://github.com/no-witness-labs/evolution-sdk"
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
            ),
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
