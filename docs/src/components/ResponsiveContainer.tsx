"use client";

import { useEffect, useState } from "react";

export default function ResponsiveContainer({ children }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="flex flex-col justify-between items-center gap-4 md:flex-row md:justify-start md:gap-8">
      {children.map((child, index) => (
        <div
          key={index}
          style={{
            flex: isMobile ? "1 1 100%" : index === 0 ? "0 0 65%" : "0 0 30%",
            maxWidth: isMobile ? "100%" : index === 0 ? "65%" : "30%",
            // marginTop: isMobile ? "1rem" : index === 1 ? "5rem" : "0",
            textAlign: isMobile ? "center" : "left",
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
