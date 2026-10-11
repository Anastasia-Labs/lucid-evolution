import { CML } from "../core.js";

// Node's native Ed25519 verification is about three times faster than CML's
// wasm one. `getBuiltinModule` loads it synchronously without a static
// import, so bundles for other runtimes are unaffected (Node >= 20.16 or 22.3).
const nodeCrypto = (() => {
  try {
    return globalThis.process?.getBuiltinModule?.("node:crypto");
  } catch {
    return undefined;
  }
})();

/** DER prefix of an Ed25519 SubjectPublicKeyInfo (RFC 8410). */
const SPKI_PREFIX = [
  0x30, 0x2a, 0x30, 0x05, 0x06, 0x03, 0x2b, 0x65, 0x70, 0x03, 0x21, 0x00,
];

/**
 * OpenSSL's answer to whether `signature` is a valid Ed25519 signature of
 * `message` by `publicKey` (32 raw bytes), or `false` where `node:crypto` is
 * not available. A `false` is not a rejection: use `verifyEd25519`, which
 * leaves that to CML.
 *
 * @example
 * import { CML } from "./core.js";
 * import { nativeVerifyEd25519 } from "./internal/ed25519.js";
 *
 * const privateKey = CML.PrivateKey.generate_ed25519();
 * const message = new TextEncoder().encode("hello");
 * nativeVerifyEd25519(
 *   privateKey.to_public().to_raw_bytes(),
 *   message,
 *   privateKey.sign(message).to_raw_bytes(),
 * ); // true on Node, false elsewhere
 *
 * @since 0.4.1
 * @category Signatures
 */
export const nativeVerifyEd25519 = (
  publicKey: Uint8Array,
  message: Uint8Array,
  signature: Uint8Array,
): boolean => {
  if (!nodeCrypto || publicKey.length !== 32 || signature.length !== 64) {
    return false;
  }
  // CML rejects the all-zero key, a point of order 4, outright; OpenSSL
  // does not.
  if (publicKey.every((byte) => byte === 0)) return false;
  try {
    const spki = Buffer.alloc(SPKI_PREFIX.length + 32);
    spki.set(SPKI_PREFIX);
    spki.set(publicKey, SPKI_PREFIX.length);
    const key = nodeCrypto.createPublicKey({
      key: spki,
      format: "der",
      type: "spki",
    });
    return nodeCrypto.verify(null, message, key, signature);
  } catch {
    return false;
  }
};

/**
 * Same result as `publicKey.verify(message, signature)`.
 *
 * OpenSSL and CML check the same cofactorless equation and both require
 * `s < L`, so a signature OpenSSL accepts is one CML accepts as well. Only
 * that answer is taken from OpenSSL: a rejection, or a runtime without
 * `node:crypto`, is decided by CML.
 *
 * @example
 * import { CML } from "./core.js";
 * import { verifyEd25519 } from "./internal/ed25519.js";
 *
 * const privateKey = CML.PrivateKey.generate_ed25519();
 * const message = new TextEncoder().encode("hello");
 * verifyEd25519(privateKey.to_public(), message, privateKey.sign(message)); // true
 *
 * @since 0.4.1
 * @category Signatures
 */
export const verifyEd25519 = (
  publicKey: CML.PublicKey,
  message: Uint8Array,
  signature: CML.Ed25519Signature,
): boolean =>
  nativeVerifyEd25519(
    publicKey.to_raw_bytes(),
    message,
    signature.to_raw_bytes(),
  ) || publicKey.verify(message, signature);
