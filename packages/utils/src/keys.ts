import { PrivateKey, PublicKey } from "@evolution-sdk/core-types";
import { generateMnemonic } from "bip39";
import { CML } from "./core.js";

export function generatePrivateKey(): PrivateKey {
  return CML.PrivateKey.generate_ed25519().to_bech32();
}

export function generateSeedPhrase(): string {
  return generateMnemonic(256);
}

export function toPublicKey(privateKey: PrivateKey): PublicKey {
  return CML.PrivateKey.from_bech32(privateKey).to_public().to_bech32();
}
