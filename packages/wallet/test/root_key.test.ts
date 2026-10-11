import { expect, test, vi } from "vitest";
import { toHex } from "@lucid-evolution/core-utils";
import { CML } from "../src/core.js";
import { bip32RootKeyFromEntropy } from "../src/root_key.js";

// xorshift32 so failures reproduce.
let state = 0x9e3779b9;
const next = () => {
  state ^= state << 13;
  state ^= state >>> 17;
  state ^= state << 5;
  return state >>> 0;
};
const bytes = (length: number) =>
  Uint8Array.from({ length }, () => next() & 0xff);

test("root key matches CML from_bip39_entropy", () => {
  // Every BIP-39 entropy size and some others; passwords empty, short, and
  // longer than a SHA-512 block, which HMAC hashes before use.
  const entropyLengths = [16, 20, 24, 28, 32, 0, 1, 33, 64];
  const passwordLengths = [0, 1, 8, 32, 128, 129, 300];
  for (let i = 0; i < 120; i++) {
    const entropy = bytes(entropyLengths[i % entropyLengths.length]);
    const password = bytes(passwordLengths[next() % passwordLengths.length]);
    const expected = CML.Bip32PrivateKey.from_bip39_entropy(entropy, password);
    const actual = bip32RootKeyFromEntropy(entropy, password);
    expect(toHex(actual.to_raw_bytes())).toBe(toHex(expected.to_raw_bytes()));
    expected.free();
    actual.free();
  }
});

// Without this, a missing native PBKDF2 would leave the test above comparing
// CML with itself.
test("root key uses Node's native PBKDF2", async () => {
  const crypto = process.getBuiltinModule("node:crypto");
  const pbkdf2Sync = vi.fn(crypto.pbkdf2Sync);
  const getBuiltinModule = vi
    .spyOn(process, "getBuiltinModule")
    .mockImplementation(((id: string) =>
      id === "node:crypto" ? { ...crypto, pbkdf2Sync } : undefined) as never);
  try {
    vi.resetModules();
    const { bip32RootKeyFromEntropy: rootKey } = await import(
      "../src/root_key.js"
    );
    const entropy = bytes(32);
    const password = bytes(8);
    const expected = CML.Bip32PrivateKey.from_bip39_entropy(entropy, password);
    const actual = rootKey(entropy, password);
    expect(pbkdf2Sync).toHaveBeenCalledOnce();
    expect(toHex(actual.to_raw_bytes())).toBe(toHex(expected.to_raw_bytes()));
    expected.free();
    actual.free();
  } finally {
    getBuiltinModule.mockRestore();
    vi.resetModules();
  }
});
