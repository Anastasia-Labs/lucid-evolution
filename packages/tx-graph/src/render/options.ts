export type VisualRenderMode = "overview" | "audit" | "debug";
export type VisualRenderView = "flow" | "scriptInteraction";

export type VisualPrivacyPolicy = {
  readonly hash: "full" | "short" | "hidden";
  readonly address: "alias" | "short" | "full" | "hidden";
  readonly datum: "marker" | "hash" | "short" | "full" | "hidden";
  readonly redeemer: "label" | "constructor" | "short" | "full" | "hidden";
  readonly cbor: "hidden" | "prefix" | "full";
};

export type VisualComplexityBudget = {
  readonly maxVisibleInputs: number;
  readonly maxVisibleOutputs: number;
  readonly maxVisibleAssetsPerUtxo: number;
  readonly maxVisibleSigners: number;
  readonly maxVisibleWarnings: number;
  readonly maxVisibleRedeemerFields: number;
};

export type VisualRendererOptions = {
  readonly mode?: VisualRenderMode;
  readonly view?: VisualRenderView;
  readonly privacy?: Partial<VisualPrivacyPolicy>;
  readonly budget?: Partial<VisualComplexityBudget>;
};

export type ResolvedVisualRendererOptions = {
  readonly mode: VisualRenderMode;
  readonly view: VisualRenderView;
  readonly privacy: VisualPrivacyPolicy;
  readonly budget: VisualComplexityBudget;
};

export type VisualEdgeStyle = {
  readonly color: string;
  readonly style: "solid" | "dashed" | "dotted";
};

export const resolveVisualRendererOptions = (
  options: VisualRendererOptions = {},
): ResolvedVisualRendererOptions => {
  const mode = options.mode ?? "overview";
  return {
    mode,
    view: options.view ?? "flow",
    privacy: { ...privacyByMode[mode], ...options.privacy },
    budget: { ...budgetByMode[mode], ...options.budget },
  };
};

export const visualEdgeStyle = (kind: string): VisualEdgeStyle => {
  switch (kind) {
    case "spend":
      return { color: "#374151", style: "solid" };
    case "read":
      return { color: "#2563eb", style: "dashed" };
    case "collateral":
      return { color: "#d97706", style: "dashed" };
    case "collateralReturn":
      return { color: "#f59e0b", style: "solid" };
    case "produce":
      return { color: "#15803d", style: "solid" };
    case "mint":
      return { color: "#7c3aed", style: "solid" };
    case "burn":
      return { color: "#dc2626", style: "solid" };
    case "withdraw":
      return { color: "#0891b2", style: "solid" };
    case "certify":
      return { color: "#4f46e5", style: "solid" };
    case "sign":
      return { color: "#6b7280", style: "dotted" };
    case "diagnostic":
      return { color: "#dc2626", style: "dashed" };
    case "summary":
      return { color: "#6b7280", style: "dashed" };
    default:
      return { color: "#6b7280", style: "solid" };
  }
};

const privacyByMode: Record<VisualRenderMode, VisualPrivacyPolicy> = {
  overview: {
    hash: "short",
    address: "alias",
    datum: "marker",
    redeemer: "label",
    cbor: "hidden",
  },
  audit: {
    hash: "short",
    address: "alias",
    datum: "hash",
    redeemer: "constructor",
    cbor: "prefix",
  },
  debug: {
    hash: "full",
    address: "full",
    datum: "full",
    redeemer: "full",
    cbor: "prefix",
  },
};

const budgetByMode: Record<VisualRenderMode, VisualComplexityBudget> = {
  overview: {
    maxVisibleInputs: 4,
    maxVisibleOutputs: 4,
    maxVisibleAssetsPerUtxo: 4,
    maxVisibleSigners: 3,
    maxVisibleWarnings: 3,
    maxVisibleRedeemerFields: 2,
  },
  audit: {
    maxVisibleInputs: 12,
    maxVisibleOutputs: 12,
    maxVisibleAssetsPerUtxo: 12,
    maxVisibleSigners: 8,
    maxVisibleWarnings: 8,
    maxVisibleRedeemerFields: 6,
  },
  debug: {
    maxVisibleInputs: Number.POSITIVE_INFINITY,
    maxVisibleOutputs: Number.POSITIVE_INFINITY,
    maxVisibleAssetsPerUtxo: Number.POSITIVE_INFINITY,
    maxVisibleSigners: Number.POSITIVE_INFINITY,
    maxVisibleWarnings: Number.POSITIVE_INFINITY,
    maxVisibleRedeemerFields: Number.POSITIVE_INFINITY,
  },
};
