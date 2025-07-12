import { CML } from "./core.js";
import { RedeemerTag } from "@evolution-sdk/core-types";

export const toCMLRedeemerTag = (tag: string): CML.RedeemerTag => {
  switch (tag) {
    case "spend":
      return CML.RedeemerTag.Spend;
    case "mint":
      return CML.RedeemerTag.Mint;
    case "publish":
      return CML.RedeemerTag.Cert;
    case "withdraw":
      return CML.RedeemerTag.Reward;
    case "vote":
      return CML.RedeemerTag.Voting;
    case "propose":
      return CML.RedeemerTag.Proposing;
    default:
      throw new Error(`Exhaustive check failed: Unhandled case ${tag}`);
  }
};

export const fromCMLRedeemerTag = (tag: CML.RedeemerTag): RedeemerTag => {
  switch (tag) {
    case CML.RedeemerTag.Spend:
      return "spend" as const;
    case CML.RedeemerTag.Mint:
      return "mint" as const;
    case CML.RedeemerTag.Cert:
      return "publish" as const;
    case CML.RedeemerTag.Reward:
      return "withdraw" as const;
    case CML.RedeemerTag.Voting:
      return "vote" as const;
    case CML.RedeemerTag.Proposing:
      return "propose" as const;
    default:
      throw new Error(`Exhaustive check failed: Unhandled case ${tag}`);
  }
};
