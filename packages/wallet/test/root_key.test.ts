import { expect, test, vi } from "vitest";
import { FastCheck } from "effect";
import { toHex } from "@lucid-evolution/core-utils";
import { CML } from "../src/core.js";
import { bip32RootKeyFromEntropy } from "../src/root_key.js";

const expectSameRootKey = (
  rootKey: typeof bip32RootKeyFromEntropy,
  entropy: Uint8Array,
  password: Uint8Array,
) => {
  const expected = CML.Bip32PrivateKey.from_bip39_entropy(entropy, password);
  const actual = rootKey(entropy, password);
  try {
    expect(toHex(actual.to_raw_bytes())).toBe(toHex(expected.to_raw_bytes()));
  } finally {
    expected.free();
    actual.free();
  }
};

test("root key matches CML from_bip39_entropy", () => {
  // Every BIP-39 entropy size and others; passwords short, and longer than a
  // SHA-512 block, which HMAC hashes before use.
  const entropy = FastCheck.oneof(
    FastCheck.constantFrom(16, 20, 24, 28, 32).chain((length) =>
      FastCheck.uint8Array({ minLength: length, maxLength: length }),
    ),
    FastCheck.uint8Array({ maxLength: 64 }),
  );
  const password = FastCheck.oneof(
    FastCheck.uint8Array({ maxLength: 32 }),
    FastCheck.uint8Array({ minLength: 120, maxLength: 300 }),
  );
  FastCheck.assert(
    FastCheck.property(entropy, password, (entropy, password) =>
      expectSameRootKey(bip32RootKeyFromEntropy, entropy, password),
    ),
    { numRuns: 120 },
  );
});

// Without this, a missing native PBKDF2 would leave the test above comparing
// CML with itself.
test("root key uses Node's native PBKDF2", async () => {
  const pbkdf2Sync = vi.spyOn(
    process.getBuiltinModule("node:crypto"),
    "pbkdf2Sync",
  );
  try {
    vi.resetModules();
    const { bip32RootKeyFromEntropy: rootKey } = await import(
      "../src/root_key.js"
    );
    expectSameRootKey(rootKey, new Uint8Array(32).fill(7), new Uint8Array(8));
    expect(pbkdf2Sync).toHaveBeenCalledOnce();
  } finally {
    pbkdf2Sync.mockRestore();
    vi.resetModules();
  }
});
