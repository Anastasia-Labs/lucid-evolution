import { describe, expect, test, vi } from "vitest";
import { fromHex, toHex } from "../src/core-utils";

/*
  fromHex and toHex use Node's hex codec when it is available. These tests
  compare them with the plain loops they replace, on valid hex and on every
  kind of invalid input, at lengths on both sides of the cut-over.
*/

const hexes = Array.from({ length: 256 }, (_, i) =>
  i.toString(16).padStart(2, "0"),
);
const digit = (code: number): number | undefined =>
  code >= 48 && code <= 57
    ? code - 48
    : code >= 65 && code <= 70
      ? code - 55
      : code >= 97 && code <= 102
        ? code - 87
        : undefined;

const referenceFromHex = (hex: string): Uint8Array => {
  if (hex.length % 2)
    throw new Error(
      "padded hex string expected, got unpadded hex of length " + hex.length,
    );
  const array = new Uint8Array(hex.length / 2);
  for (let ai = 0, hi = 0; ai < array.length; ai++, hi += 2) {
    const n1 = digit(hex.charCodeAt(hi));
    const n2 = digit(hex.charCodeAt(hi + 1));
    if (n1 === undefined || n2 === undefined) {
      throw new Error(
        'hex string expected, got non-hex character "' +
          hex[hi] +
          hex[hi + 1] +
          '" at index ' +
          hi,
      );
    }
    array[ai] = n1 * 16 + n2;
  }
  return array;
};

const referenceToHex = (bytes: Uint8Array): string =>
  Array.from(bytes, (byte) => hexes[byte]).join("");

const outcome = (run: () => unknown) => {
  try {
    return { value: run() };
  } catch (error) {
    return { error: (error as Error).message };
  }
};

let seed = 0x9e3779b9;
const random = () => {
  seed ^= seed << 13;
  seed ^= seed >>> 17;
  seed ^= seed << 5;
  return (seed >>> 0) / 2 ** 32;
};
const int = (n: number) => Math.floor(random() * n);

const DIGITS = "0123456789abcdefABCDEF";
// Invalid characters, including two-byte ones whose low byte is a digit
// ("İ" is U+0130), Latin-1 ones and a lone surrogate.
const INVALID = ["g", "G", " ", "\0", "-", "x", "İ", "š", "Á", "０", "\ud83d"];
const LENGTHS = [0, 2, 56, 64, 66, 130, 1000, 16_000];

describe("hex", () => {
  // Without this, a load-time check that rejected Node's codec would leave
  // the tests below comparing the loops with themselves.
  test("uses Node's codec on long inputs", () => {
    const write = vi.spyOn(Buffer.prototype, "write");
    const toString = vi.spyOn(Buffer.prototype, "toString");
    try {
      const hex = "0aff".repeat(40);
      expect(toHex(fromHex(hex))).toBe(hex);
      expect(write).toHaveBeenCalledWith(hex, "hex");
      expect(toString).toHaveBeenCalledWith("hex");
    } finally {
      write.mockRestore();
      toString.mockRestore();
    }
  });

  test("fromHex matches the loop on valid and invalid hex", () => {
    for (let i = 0; i < 4000; i++) {
      const length = LENGTHS[int(LENGTHS.length)] + (i % 50 === 0 ? 1 : 0);
      const chars = Array.from({ length }, () => DIGITS[int(DIGITS.length)]);
      if (length && i % 3 === 0) {
        chars[int(length)] = INVALID[int(INVALID.length)];
      }
      const hex = chars.join("");
      expect(
        outcome(() => fromHex(hex)),
        hex.slice(0, 80),
      ).toEqual(outcome(() => referenceFromHex(hex)));
    }
  });

  test("fromHex rejects every non-digit code unit in a long string", () => {
    const prefix = "ab".repeat(40);
    for (let code = 0; code < 0x10000; code++) {
      const hex = prefix + String.fromCharCode(code) + "0";
      expect(outcome(() => fromHex(hex))).toEqual(
        outcome(() => referenceFromHex(hex)),
      );
    }
  });

  test("fromHex returns a fresh buffer of its own", () => {
    const bytes = fromHex("cd".repeat(100));
    expect(bytes.byteOffset).toBe(0);
    expect(bytes.buffer.byteLength).toBe(100);
  });

  test("toHex matches the loop, including views into larger buffers", () => {
    for (let i = 0; i < 2000; i++) {
      const length = LENGTHS[int(LENGTHS.length)];
      const buffer = new Uint8Array(length + 16).map(() => int(256));
      const offset = int(8);
      const bytes = buffer.subarray(offset, offset + length);
      expect(toHex(bytes)).toBe(referenceToHex(bytes));
    }
    expect(toHex(Buffer.from("0aff", "hex"))).toBe("0aff");
  });
});
