import { describe, expect, it } from "vitest";
import { Effect, FastCheck, Inspectable, Schema } from "effect";
import * as DatumHash from "../src/DatumHash.js";
import * as Hex from "../src/Hex.js";

// Sample datum hashes for testing - organized by validity
const VALID_DATUM_HASHES = [
  "5160f88b929bf8a6c57c285b889488f9137c0ef3cfd0bcf408a10020e69146d5",
  "bfd6dd1e96e4fd26c6379aa3093aaef25639d58ee76d045bd4528ef9f2fed808",
  "0b6fc2971960699b021e408e37027da1fdb3f9278270c44916dc1ddfb5778518",
  "203cfa5440271074e2fd0ed3960593b301bd400dd8397bb5252a86b1fc3e637f",
  "3ed3f45dc5d4717a2ffbc782852deb08e6838b65200ebde4ca326d42e0eb3c7e",
];

const INVALID_DATUM_HASHES = [
  "5160f88b929bf8a6c57c285b889488f9137c0ef3cfd0bcf408a10020e69146", // Too short
  "bfd6dd1e96e4fd26c6379aa3093aaef25639d58ee76d045bd4528ef9f2fed80800", // Too long
  "g160f88b929bf8a6c57c285b889488f9137c0ef3cfd0bcf408a10020e69146d5", // Invalid hex character
  "", // Empty
  "not-a-hex-string", // Invalid format
  "123", // Way too short
  "0x5160f88b929bf8a6c57c285b889488f9137c0ef3cfd0bcf408a10020e69146d5", // With 0x prefix
];

const testHash = VALID_DATUM_HASHES[0];
const testBytes = new Uint8Array([
  0x51,
  0x60,
  0xf8,
  0x8b,
  0x92,
  0x9b,
  0xf8,
  0xa6,
  0xc5,
  0x7c,
  0x28,
  0x5b,
  0x88,
  0x94,
  0x88,
  0xf9,
  0x13,
  0x7c,
  0x0e,
  0xf3,
  0xcf,
  0xd0,
  0xbc,
  0xf4,
  0x08,
  0xa1,
  0x00,
  0x20,
  0xe6,
  0x91,
  0x46,
  0xd5,
]);

/**
 * Tests for the DatumHash functionality -
 * focusing on datum hash creation, validation, and serialization
 */
describe("DatumHash Validation", () => {
  it.each(VALID_DATUM_HASHES)(
    "should create valid DatumHash: %s",
    (input) => {
      const datumHash = Schema.decodeUnknownSync(DatumHash.HexString)(input);
      expect(datumHash.hash).toBe(input);
      expect(datumHash._tag).toBe("DatumHash");
      expect(DatumHash.isDatumHash(datumHash)).toBe(true);
    },
  );

  it.each(INVALID_DATUM_HASHES)(
    "should throw on invalid hex string: %s",
    (input) => {
      expect(() => Schema.decodeUnknownSync(DatumHash.HexString)(input))
        .toThrow();
    },
  );

  it("should validate length constants", () => {
    expect(DatumHash.DATUM_HASH_BYTES_LENGTH).toBe(32);
    expect(DatumHash.DATUM_HASH_HEX_LENGTH).toBe(64);
  });

  it("should check equality correctly", () => {
    const hash1 = Schema.decodeUnknownSync(DatumHash.HexString)(
      VALID_DATUM_HASHES[0],
    );
    const hash2 = Schema.decodeUnknownSync(DatumHash.HexString)(
      VALID_DATUM_HASHES[0],
    );
    const hash3 = Schema.decodeUnknownSync(DatumHash.HexString)(
      VALID_DATUM_HASHES[1],
    );

    expect(DatumHash.equals(hash1, hash2)).toBe(true);
    expect(DatumHash.equals(hash1, hash3)).toBe(false);
  });
});

describe("DatumHash Serialization", () => {
  describe("HexString Schema", () => {
    it("should encode to hex string", () => {
      const datumHash = Schema.decodeUnknownSync(DatumHash.HexString)(
        testHash,
      );
      const encoded = Schema.encodeSync(DatumHash.HexString)(datumHash);
      expect(encoded).toBe(testHash);
    });

    it("should decode from hex string", () => {
      const decoded = Schema.decodeUnknownSync(DatumHash.HexString)(testHash);
      expect(decoded).toBeInstanceOf(DatumHash.DatumHash);
      expect(decoded.hash).toBe(testHash);
    });

    it("should fail on invalid hex string length", () => {
      expect(() => Schema.decodeUnknownSync(DatumHash.HexString)("deadbeef"))
        .toThrow();
    });

    it("should handle round-trip conversion", () => {
      const original = Schema.decodeUnknownSync(DatumHash.HexString)(
        testHash,
      );
      const hex = Schema.encodeSync(DatumHash.HexString)(original);
      const decoded = Schema.decodeUnknownSync(DatumHash.HexString)(hex);
      expect(DatumHash.equals(original, decoded)).toBe(true);
    });
  });
});
