import { PrivateKey, PublicKey } from "@anastasia-labs/core-types";
import { generateMnemonic } from "@anastasia-labs/bip39";
import * as CML from "@dcspark/cardano-multiplatform-lib-nodejs";

export function generatePrivateKey(): PrivateKey {
  return CML.PrivateKey.generate_ed25519().to_bech32();
}

export function generateSeedPhrase(): string {
  return generateMnemonic(256);
}

export function toPublicKey(privateKey: PrivateKey): PublicKey {
  return CML.PrivateKey.from_bech32(privateKey).to_public().to_bech32();
}
