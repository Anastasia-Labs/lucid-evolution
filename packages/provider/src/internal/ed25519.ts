import { CML } from "../core.js";

type NodeCrypto = {
  createPublicKey: (options: {
    key: Uint8Array;
    format: "der";
    type: "spki";
  }) => unknown;
  verify: (
    algorithm: null,
    data: Uint8Array,
    key: unknown,
    signature: Uint8Array,
  ) => boolean;
};

// Node's native Ed25519 verification is about three times faster than CML's
// wasm one. `getBuiltinModule` loads it synchronously without a static
// import, so bundles for other runtimes are unaffected (Node >= 20.16 or 22.3).
const nodeCrypto = ((): NodeCrypto | undefined => {
  try {
    const process = (
      globalThis as {
        process?: { getBuiltinModule?: (id: string) => Partial<NodeCrypto> };
      }
    ).process;
    const crypto = process?.getBuiltinModule?.("node:crypto");
    return crypto?.createPublicKey && crypto.verify
      ? (crypto as NodeCrypto)
      : undefined;
  } catch {
    return undefined;
  }
})();

/** DER prefix of an Ed25519 SubjectPublicKeyInfo (RFC 8410). */
const SPKI_PREFIX = [
  0x30, 0x2a, 0x30, 0x05, 0x06, 0x03, 0x2b, 0x65, 0x70, 0x03, 0x21, 0x00,
];

/** OpenSSL's answer, or `false` where it is not available. */
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
    const spki = new Uint8Array(SPKI_PREFIX.length + 32);
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
