import { PrivateKey } from "@anastasia-labs/core-types";
import { generateMnemonic } from "@anastasia-labs/bip39";
import * as CML from "@dcspark/cardano-multiplatform-lib-nodejs";

export function generatePrivateKey(): PrivateKey {
  return CML.PrivateKey.generate_ed25519().to_bech32();
}

export function generateSeedPhrase(): string {
  return generateMnemonic(256);
}
