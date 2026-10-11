import { CML } from "./core.js";

// Node's native PBKDF2 is about three times faster than CML's wasm one, and
// `getBuiltinModule` loads it synchronously without a static import, so
// bundles for other runtimes are unaffected (Node >= 20.16 or 22.3).
const nodePbkdf2Sync = (() => {
  try {
    return globalThis.process?.getBuiltinModule?.("node:crypto")?.pbkdf2Sync;
  } catch {
    return undefined;
  }
})();

/**
 * The Icarus root key (CIP-3): PBKDF2-HMAC-SHA512 keyed by the password over
 * the entropy, 4096 iterations, 96 bytes, with the scalar clamped as
 * `Bip32PrivateKey.from_bip39_entropy` does.
 *
 * @example
 * import { fromHex } from "@lucid-evolution/core-utils";
 * import { mnemonicToEntropy } from "bip39";
 * import { bip32RootKeyFromEntropy } from "./root_key.js";
 *
 * const seed =
 *   "test test test test test test test test test test test junk";
 * const rootKey = bip32RootKeyFromEntropy(
 *   fromHex(mnemonicToEntropy(seed)),
 *   new TextEncoder().encode("password"),
 * );
 * rootKey.to_public().to_bech32(); // "xpub1..."
 *
 * @since 0.4.1
 * @category Keys
 */
export const bip32RootKeyFromEntropy = (
  entropy: Uint8Array,
  password: Uint8Array,
): CML.Bip32PrivateKey => {
  if (!nodePbkdf2Sync)
    return CML.Bip32PrivateKey.from_bip39_entropy(entropy, password);
  const key = nodePbkdf2Sync(password, entropy, 4096, 96, "sha512");
  key[0] &= 0b1111_1000;
  key[31] &= 0b0001_1111;
  key[31] |= 0b0100_0000;
  return CML.Bip32PrivateKey.from_raw_bytes(key);
};
