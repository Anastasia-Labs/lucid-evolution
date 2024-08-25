import React, { useState, useEffect } from "react";

export function AnimatedCode({ code, style }) {
  const [displayedCode, setDisplayedCode] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [isCursorBlinking, setIsCursorBlinking] = useState(true);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGlowing, setIsGlowing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [spinnerAngle, setSpinnerAngle] = useState(0);
  const [typedCommand, setTypedCommand] = useState("");
  const [isCommandFullyTyped, setIsCommandFullyTyped] = useState(false);
  const [startColorTransition, setStartColorTransition] = useState(false);

  const getRandomTypingDelay = () => Math.random() * 50 + 20;

  const lineCount = code.split("\n").length;
  const lineHeight = 1.3; // em
  const codeHeight = `${lineCount * lineHeight}em`;
  const terminalHeight = "120px";
  const headerHeight = "40px";
  const componentHeight = `calc(${codeHeight} + ${terminalHeight} + ${headerHeight} - 2em)`;

  const fastForwardIndex = code.indexOf("signedPaymentTx.");
  const fastForwardSection = code.slice(0, fastForwardIndex);
  const normalTypingSection = code.slice(fastForwardIndex);

  useEffect(() => {
    let isMounted = true;

    const animateCode = async () => {
      let currentCode = "";
      for (let i = 0; i < fastForwardSection.length; i++) {
        if (!isMounted) break;
        currentCode += fastForwardSection[i];
        setDisplayedCode(currentCode);
        await new Promise((resolve) => setTimeout(resolve, 5));
      }

      await new Promise((resolve) => setTimeout(resolve, 500));

      for (let i = 0; i < normalTypingSection.length; i++) {
        if (!isMounted) break;
        currentCode += normalTypingSection[i];
        setDisplayedCode(currentCode);
        if (normalTypingSection[i] === "\n") {
          await new Promise((resolve) => setTimeout(resolve, 500));
        } else {
          await new Promise((resolve) =>
            setTimeout(resolve, getRandomTypingDelay())
          );
        }
      }

      await new Promise((resolve) => setTimeout(resolve, 500));

      const command = "run make_payment.ts";
      for (let i = 0; i < command.length; i++) {
        if (!isMounted) break;
        setTypedCommand((prev) => prev + command[i]);
        await new Promise((resolve) => setTimeout(resolve, 50));
      }

      setIsCommandFullyTyped(true);
      await new Promise((resolve) => setTimeout(resolve, 200)); // Short delay
      setStartColorTransition(true);

      await new Promise((resolve) => setTimeout(resolve, 500));

      setIsSubmitting(true);
      setIsGlowing(true);
      setIsCursorBlinking(false);

      const startTime = Date.now();
      const duration = 3000;
      const animateProgress = () => {
        const elapsedTime = Date.now() - startTime;
        const newProgress = Math.min((elapsedTime / duration) * 100, 100);
        setProgress(newProgress);
        if (newProgress < 100 && isMounted) {
          requestAnimationFrame(animateProgress);
        } else {
          setIsSubmitting(false);
          setIsGlowing(false);
          setShowConfirmation(true);
        }
      };
      animateProgress();

      await new Promise((resolve) => setTimeout(resolve, duration));

      if (isMounted) {
        setShowConfirmation(true);
      }

      await new Promise((resolve) => setTimeout(resolve, 4000));
      if (isMounted) {
        setDisplayedCode("");
        setShowConfirmation(false);
        setProgress(0);
        setTypedCommand("");
        setIsCommandFullyTyped(false);
        setStartColorTransition(false);
        setIsCursorBlinking(true);
      }

      setTimeout(() => {
        if (isMounted) animateCode();
      }, 1000);
    };

    animateCode();

    const cursorInterval = setInterval(() => {
      if (isMounted) setShowCursor((prev) => !prev);
    }, 530);

    return () => {
      isMounted = false;
      clearInterval(cursorInterval);
    };
  }, [code, fastForwardSection, normalTypingSection]);

  useEffect(() => {
    let animationFrameId;
    const animateSpinner = () => {
      setSpinnerAngle((prevAngle) => (prevAngle + 10) % 360);
      animationFrameId = requestAnimationFrame(animateSpinner);
    };

    if (isSubmitting) {
      animateSpinner();
    }

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isSubmitting]);

  const redKeywords = ["import", "from", "const", "await", "new", "console"];
  const highlightedKeywords = [
    "Lucid",
    "pay",
    "ToAddress",
    "sign",
    "newTx",
    "withWallet",
    "selectWallet",
    "fromPrivateKey",
    "submit",
    "complete",
  ];

  const allKeywords = [...redKeywords, ...highlightedKeywords];
  const keywordRegex = new RegExp(`\\b(${allKeywords.join("|")})\\b`, "g");

  const LoadingSpinner = () => (
    <div style={{ display: "inline-block", marginLeft: "10px" }}>
      <div
        style={{
          width: "16px",
          height: "16px",
          border: "2px solid #2d2d2d",
          borderTop: "2px solid #ff6b6b",
          borderRadius: "50%",
          transform: `rotate(${spinnerAngle}deg)`,
        }}
      ></div>
    </div>
  );

  const SuccessIcon = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ marginRight: "6px" }}
    >
      <circle cx="10" cy="10" r="8" stroke="#2ecc71" strokeWidth="2" />
      <path
        d="M6 10L9 13L14 8"
        stroke="#2ecc71"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <div
      style={{
        position: "relative",
        height: componentHeight,
        overflow: "hidden",
        borderRadius: "8px",
        fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        ...style,
      }}
    >
      {/* IDE-like header with gradient */}
      <div
        style={{
          background: "linear-gradient(to right, #2a2a2a, #3a3a3a)",
          padding: "8px 16px",
          height: headerHeight,
          borderTopLeftRadius: "8px",
          borderTopRightRadius: "8px",
          display: "flex",
          alignItems: "center",
          borderBottom: "1px solid #444",
        }}
      >
        <span
          style={{
            color: "rgba(255, 255, 255, 0.6)", // This makes it white with 60% opacity
            fontSize: "14px",
            display: "flex",
            alignItems: "center",
            fontWeight: "400", // Making it less bold
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ marginRight: "8px", opacity: 0.6 }} // Also reducing the opacity of the icon
          >
            <path
              d="M13 9V3.5L18.5 9M6 2C4.89 2 4 2.89 4 4V20C4 21.11 4.89 22 6 22H18C19.11 22 20 21.11 20 20V8L14 2H6Z"
              fill="currentColor"
            />
          </svg>
          make_payment.ts
        </span>
      </div>

      {/* Code content */}
      <div
        style={{
          position: "relative",
          backgroundColor: "#1e1e1e",
          height: `calc(100% - ${headerHeight})`,
        }}
      >
        <pre
          style={{
            backgroundColor: "transparent",
            height: codeHeight,
            overflow: "hidden",
            margin: 0,
            padding: "16px",
          }}
        >
          <code
            style={{
              whiteSpace: "pre-wrap",
              wordBreak: "break-all",
              overflowWrap: "break-word",
              display: "block",
              lineHeight: `${lineHeight}em`,
              fontFamily:
                'SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
            }}
          >
            {displayedCode.split("\n").map((line, lineIndex) => (
              <div
                key={lineIndex}
                style={{
                  minHeight: "1.3em",
                  display: "flex",
                  flexWrap: "wrap",
                }}
              >
                {line
                  ? line.split(keywordRegex).map((part, partIndex) => {
                      let style = {};
                      if (redKeywords.includes(part)) {
                        style.color = "gray";
                      } else if (highlightedKeywords.includes(part)) {
                        style.color = "#ff6b6b";
                      }
                      return (
                        <span key={partIndex} style={style}>
                          {part}
                        </span>
                      );
                    })
                  : null}
                {lineIndex === displayedCode.split("\n").length - 1 &&
                  isCursorBlinking && (
                    <span
                      style={{
                        borderLeft: showCursor ? "2px solid #fff" : "none",
                        marginLeft: "2px",
                        animation: "blink 0.7s infinite",
                      }}
                    >
                      &nbsp;
                    </span>
                  )}
              </div>
            ))}
          </code>
        </pre>
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "12px 16px",
            backgroundColor: "#2d2d2d",
            borderBottomLeftRadius: "8px",
            borderBottomRightRadius: "8px",
            fontFamily:
              'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
            fontSize: "14px",
            height: terminalHeight,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              color: "#b3b3b3",
              marginBottom: "8px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <span style={{ color: "#ff6b6b", marginRight: "4px" }}>λ</span>
            <span
              style={{ color: "rgba(255, 255, 255, 0.4)", marginRight: "8px" }}
            >
              {">"}
            </span>
            {(typedCommand || isCommandFullyTyped) && (
              <span
                style={{
                  transition: "text-shadow 0.3s ease-in-out",
                  textShadow: isGlowing
                    ? "0 0 5px rgba(86, 156, 214, 0.60)"
                    : "none",
                }}
              >
                {isCommandFullyTyped ? (
                  <>
                    <span
                      style={{
                        color: startColorTransition ? "#ff6b6b" : "#b3b3b3",
                        transition: "color 0.5s ease-in-out",
                      }}
                    >
                      run
                    </span>
                    <span style={{ color: "#b3b3b3" }}> make_payment.ts</span>
                  </>
                ) : (
                  <span style={{ color: "#b3b3b3" }}>{typedCommand}</span>
                )}
              </span>
            )}
            {isSubmitting && <LoadingSpinner />}
          </div>
          {showConfirmation && (
            <div style={{ animation: "fadeIn 0.5s ease-in-out" }}>
              <div
                style={{
                  maxWidth: "49%",
                  height: "35px",
                  margin: "0 0px",
                  padding: "8px 12px",
                  borderRadius: "8px",
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  color: "#b3b3b3",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    marginRight: "5px",
                    fontsize: "10px",
                    fontFamily:
                      'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
                  }}
                >
                  (Wen Midgard?) Tx Hash:
                </span>
                <span
                  style={{
                    color: "#ff6b6b",
                    fontFamily:
                      'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
                    fontsize: "8px",
                    background: "rgba(255, 107, 107, 0.1)",
                    padding: "2px 4px",
                    borderRadius: "2px",
                  }}
                >
                  your_tx_hash
                </span>
                <button
                  onClick={() => navigator.clipboard.writeText("Wen Midgard?")}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#b3b3b3",
                    cursor: "pointer",
                    marginLeft: "8px",
                    padding: "2px",
                    transition: "color 0.3s ease",
                  }}
                  onMouseEnter={(e) => (e.target.style.color = "#ff6b6b")}
                  onMouseLeave={(e) => (e.target.style.color = "#b3b3b3")}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16 1H4C2.9 1 2 1.9 2 3V17H4V3H16V1ZM19 5H8C6.9 5 6 5.9 6 7V21C6 22.1 6.9 23 8 23H19C20.1 23 21 22.1 21 21V7C21 5.9 20.1 5 19 5ZM19 21H8V7H19V21Z"
                      fill="currentColor"
                    />
                  </svg>
                </button>
              </div>
              <div
                style={{
                  maxWidth: "49%",
                  height: "35px",
                  margin: "4px 0",
                  padding: "8px 12px",
                  borderRadius: "8px",
                  backgroundColor: "rgba(46, 204, 113, 0.1)",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <SuccessIcon />
                <span
                  style={{
                    color: "#2ecc71",
                    fontFamily:
                      '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
                    fontSize: "14px",
                    fontWeight: "600",
                  }}
                >
                  Transaction submitted successfully!
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Progress bar */}
        {(isSubmitting || progress > 0) && (
          <div
            style={{
              position: "absolute",
              bottom: terminalHeight,
              left: "0",
              height: "2px",
              background: "linear-gradient(to right, #c0392b, #e74c3c)",
              width: `${progress}%`,
              transition: "width 0.1s linear",
            }}
          />
        )}
      </div>
    </div>
  );
}
