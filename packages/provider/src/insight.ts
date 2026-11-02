import { Network } from "@lucid-evolution/core-types";
import { Blockfrost, BlockfrostOptions } from "./blockfrost.js";

export type InsightNetwork = Extract<Network, "Mainnet" | "Preprod">;

export interface InsightConfig extends BlockfrostOptions {
  readonly network: InsightNetwork;
  readonly apiKey: string;
}

const INSIGHT_URLS: Record<InsightNetwork, string> = {
  Mainnet: "https://mainnet.insight.iagon.com/api/v0",
  Preprod: "https://preprod.insight.iagon.com/api/v0",
};

/**
 * Iagon Insight serves the Blockfrost API, so this is the Blockfrost provider
 * pointed at Insight. API keys at https://insight.iagon.com.
 */
export class Insight extends Blockfrost {
  constructor({ network, apiKey, ...options }: InsightConfig) {
    if (!Object.hasOwn(INSIGHT_URLS, network)) {
      throw new TypeError(
        `Insight serves Mainnet and Preprod, not ${network}.`,
      );
    }
    if (!apiKey) {
      throw new TypeError("Insight needs an API key.");
    }
    super(INSIGHT_URLS[network], apiKey, options);
  }
}
