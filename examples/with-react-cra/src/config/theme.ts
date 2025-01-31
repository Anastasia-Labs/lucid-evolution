export const theme = {
  colors: {
    primary: "#ef4444",
    background: {
      main: "#111827",
      secondary: "#1f2937",
      card: "#1a1f2e",
    },
    border: {
      primary: "#2d3748",
      secondary: "#374151",
    },
    text: {
      primary: "#e5e7eb",
      secondary: "#9ca3af",
    },
  },
  gradients: {
    background: "linear-gradient(145deg, #111827, #1f2937)",
  },
  effects: {
    headerBlur: "rgba(26, 31, 46, 0.95)",
  },
} as const;

export type Theme = typeof theme;
