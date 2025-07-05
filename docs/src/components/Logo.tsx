"use client";

import { useEffect, useState } from "react";
import { useTheme } from "nextra-theme-docs";
import Image from "next/image";

export default function Logo() {
  const { resolvedTheme, systemTheme } = useTheme();

  const [mounted, setMounted] = useState(() => false);
  // setMounted to circumvent SSR Hydration issue
  useEffect(() => {
    setMounted(() => true);
  }, []);

  return (
    <Image
      src={
        !mounted
          ? "/lucid-evolution/no-witness-labs-logo.png"
          : resolvedTheme === "light"
            ? "/lucid-evolution/no-witness-labs-logo-dark.png"
            : resolvedTheme === "dark"
              ? "/lucid-evolution/no-witness-labs-logo.png"
              : systemTheme === "light"
                ? "/lucid-evolution/no-witness-labs-logo-dark.png"
                : "/lucid-evolution/no-witness-labs-logo.png"
      }
      alt="No Witness Labs Logo"
      className="mr-4"
      width="50"
      height="46"
    />
  );
}
