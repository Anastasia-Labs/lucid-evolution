"use client";

import { CSSProperties, useEffect, useState } from "react";

export default function Hero({
  title,
  subtitle,
  ctaText,
  ctaLink,
  ctaText2,
  ctaLink2,
}) {
  const [isHovered1, setIsHovered1] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [showCursor, setShowCursor] = useState(true);
  const [textColor, setTextColor] = useState("gray");

  const fullText = "Evolution";
  const partialText = "Evolu";

  useEffect(() => {
    let isMounted = true;

    const animateText = async () => {
      for (let i = 0; i <= partialText.length; i++) {
        if (!isMounted) break;
        setDisplayText(partialText.slice(0, i));
        await new Promise((resolve) => setTimeout(resolve, 100));
      }

      await new Promise((resolve) => setTimeout(resolve, 500));

      for (let i = partialText.length; i >= 0; i--) {
        if (!isMounted) break;
        setDisplayText(partialText.slice(0, i));
        await new Promise((resolve) => setTimeout(resolve, 50));
      }

      setTextColor("#8b0000");

      for (let i = 0; i <= fullText.length; i++) {
        if (!isMounted) break;
        setDisplayText(fullText.slice(0, i));
        await new Promise((resolve) => setTimeout(resolve, 100));
      }

      setIsTyping(false);

      await new Promise((resolve) => setTimeout(resolve, 7000));

      setTextColor("gray");
      setDisplayText("");
      setIsTyping(true);

      if (isMounted) {
        animateText();
      }
    };

    animateText();

    const cursorInterval = setInterval(() => {
      if (isMounted) setShowCursor((prev) => !prev);
    }, 530);

    return () => {
      isMounted = false;
      clearInterval(cursorInterval);
    };

  }, []);

  const buttonStyle =
    (isHovered, isPrimary): CSSProperties => ({
      padding: "0.6rem 1.2rem",
      backgroundColor: isPrimary
        ? isHovered
          ? "#a50000"
          : "#8b0000"
        : "transparent",
      color: isPrimary ? "white" : "#8b0000",
      textDecoration: "none",
      borderRadius: "6px",
      transition: "all 0.3s ease",
      border: isPrimary ? "none" : "2px solid #8b0000",
      boxShadow: isHovered
        ? "0 4px 6px rgba(0, 0, 0, 0.1)"
        : "0 2px 4px rgba(0, 0, 0, 0.05)",
      transform: isHovered ? "translateY(-1px)" : "translateY(0)",
      fontWeight: "600",
      fontSize: "0.8rem",
      letterSpacing: "0.5px",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      margin: "0 0.5rem",
      fontFamily:
        "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      textTransform: "uppercase",
      minWidth: "10px",
      gap: "8px",
    });

  const [firstPart, secondPart] = title.split(" ");

  return (

    <div style={{ textAlign: "center" }}>
      <h1
        style={{
          fontSize: "3rem",
          marginBottom: "1rem",
          fontWeight: "bold",
          // color: "white",
        }}
      >
        {firstPart}{displayText.length ? "-" : " "}
        <span
          style={{
            color: textColor,
            transition: "color 0.5s ease-in-out",
            position: "relative",
          }}
        >
          {displayText}
          <span
            style={{
              position: "absolute",
              right: "-0.1em",
              borderRight:
                showCursor && isTyping ? `2px solid ${textColor}` : "none",
              animation: "blink 0.7s infinite",
            }}
          ></span>
        </span>
      </h1>
      <p
        style={{
          fontSize: "1.2rem",
          marginBottom: "2rem",
          color: "#666666",
          maxWidth: "600px",
          margin: "0 auto 2rem",
        }}
      >
        {subtitle}
      </p>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <a
          href={ctaLink}
          style={buttonStyle(isHovered1, true)}
          onMouseEnter={() => setIsHovered1(true)}
          onMouseLeave={() => setIsHovered1(false)}
        >
          <span style={{ fontSize: "1em" }}>&#x21b3;</span> {/* Arrow (Unicode) */}
          {ctaText}
        </a>
        <a
          href={ctaLink2}
          style={buttonStyle(isHovered2, false)}
          onMouseEnter={() => setIsHovered2(true)}
          onMouseLeave={() => setIsHovered2(false)}
        >
          {ctaText2}
          <span style={{ fontSize: "1em" }}>📖</span> {/* book (Unicode) */}
        </a>
      </div>
    </div>
  );
}