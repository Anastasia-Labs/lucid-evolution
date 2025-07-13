"use client";

import dynamic from "next/dynamic";

// Use dynamic import with no SSR for Main (which contains WASM components)
const DynamicMain = dynamic(() => import("@/components/Main"), { ssr: false });

export default function ClientWrapper() {
  return <DynamicMain />;
}
