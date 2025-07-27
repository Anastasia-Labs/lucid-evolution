import { expect, test } from "vitest";
import { it, describe } from "@effect/vitest";
import { Effect, Schema, FastCheck } from "effect";
import * as KeyHash from "../src/KeyHash.js";

describe("KeyHash", () => {
  const validHex = "a".repeat(56);
  const validBytes = new Uint8Array(28).fill(170); // 0xaa repeated 28 times
  const invalidHexShort = "a".repeat(54);
  const invalidHexLong = "a".repeat(58);
  const invalidBytes = new Uint8Array(26).fill(170);

  describe("HexSchema", () => {
    test("should validate correct hex string", () => {
      const result = KeyHash.Codec.Decode.string(validHex);
      expect(result).toBe(validHex);
    });

    test("should reject invalid hex length", () => {
      expect(() => KeyHash.Codec.Decode.string(invalidHexShort)).toThrow();

      expect(() => KeyHash.Codec.Decode.string(invalidHexLong)).toThrow();
    });

    test("should reject non-hex characters", () => {
      const invalidHex = "g".repeat(56);
      expect(() => KeyHash.Codec.Decode.string(invalidHex)).toThrow();
    });
  });

  describe("BytesSchema", () => {
    test("should convert bytes to KeyHash", () => {
      const result = KeyHash.Codec.Decode.bytes(validBytes);
      expect(typeof result).toBe("string");
      expect(result.length).toBe(56);
    });

    test("should convert KeyHash back to bytes", () => {
      const keyHash = KeyHash.Codec.Decode.string(validHex);
      const result = KeyHash.Codec.Encode.bytes(keyHash);
      expect(result).toBeInstanceOf(Uint8Array);
      expect(result.length).toBe(28);
    });

    test("should reject invalid byte array length", () => {
      expect(() => KeyHash.Codec.Decode.bytes(invalidBytes)).toThrow();
    });

    test("roundtrip: bytes -> KeyHash -> bytes", () => {
      const keyHash = KeyHash.Codec.Decode.bytes(validBytes);
      const result = KeyHash.Codec.Encode.bytes(keyHash);
      expect(result).toEqual(validBytes);
    });
  });

  describe("HexSchema", () => {
    test("decodes valid hex to KeyHash", () => {
      const result = KeyHash.Codec.Decode.string(validHex);
      expect(result).toBe(validHex);
    });

    test("encodes KeyHash to hex", () => {
      const keyHash = KeyHash.Codec.Decode.string(validHex);
      const result = KeyHash.Codec.Encode.string(keyHash);
      expect(result).toBe(validHex);
    });

    test("roundtrip: hex -> KeyHash -> hex", () => {
      const keyHash = KeyHash.Codec.Decode.string(validHex);
      const result = KeyHash.Codec.Encode.string(keyHash);
      expect(result).toBe(validHex);
    });
  });

  describe("equals", () => {
    test("returns true for equal KeyHash instances", () => {
      const hash1 = KeyHash.Codec.Decode.string(validHex);
      const hash2 = KeyHash.Codec.Decode.string(validHex);
      expect(KeyHash.equals(hash1, hash2)).toBe(true);
    });

    test("returns false for different KeyHash instances", () => {
      const hash1 = KeyHash.Codec.Decode.string(validHex);
      const hash2 = KeyHash.Codec.Decode.string("b".repeat(56));
      expect(KeyHash.equals(hash1, hash2)).toBe(false);
    });
  });

  describe("generator", () => {
    test("generates valid KeyHash instances", () => {
      const samples = FastCheck.sample(KeyHash.generator, 10);
      samples.forEach((keyHash) => {
        expect(typeof keyHash).toBe("string");
        expect(keyHash.length).toBe(56);
        // Verify it's a valid KeyHash by encoding/decoding
        expect(() => KeyHash.Codec.Encode.string(keyHash)).not.toThrow();
      });
    });
  });

  describe("error handling", () => {
    test("KeyHashError can be created with message", () => {
      const error = new KeyHash.KeyHashError({ message: "Test error" });
      expect(error.message).toBe("Test error");
      expect(error._tag).toBe("KeyHashError");
    });

    test("KeyHashError can be created with cause", () => {
      const cause = new Error("Original error");
      const error = new KeyHash.KeyHashError({
        message: "Invalid format",
        cause: cause,
      });
      expect(error.message).toBe("Invalid format");
      expect(error.cause).toBe(cause);
    });
  });

  describe("integration with Hash28", () => {
    test("KeyHash uses Hash28 validation", () => {
      // Valid Hash28 hex should create valid KeyHash
      const keyHash = KeyHash.Codec.Decode.string(validHex);
      expect(keyHash).toBe(validHex);
    });

    test("KeyHash rejects invalid Hash28 format", () => {
      // Invalid Hash28 should fail KeyHash creation
      const invalidHex = "g".repeat(56);
      expect(() => KeyHash.Codec.Decode.string(invalidHex)).toThrow();
      expect(() => KeyHash.Codec.Decode.string(invalidHexShort)).toThrow();
    });
  });

  describe("Schema composition", () => {
    test("BytesSchema composes Hash28.BytesSchema with KeyHash branding", () => {
      // Test that the composition works correctly
      const bytes = new Uint8Array(28).fill(255); // 0xFF repeated
      const expectedHex = "f".repeat(56);

      const keyHash = KeyHash.Codec.Decode.bytes(bytes);
      expect(keyHash).toBe(expectedHex);

      const roundtripBytes = KeyHash.Codec.Encode.bytes(keyHash);
      expect(roundtripBytes).toEqual(bytes);
    });

    it.effect("should roundtrip bytes -> KeyHash -> bytes with Effect", () =>
      Effect.gen(function* () {
        const original = validBytes;
        const keyHash = KeyHash.Codec.Decode.bytes(original);
        const roundtrip = KeyHash.Codec.Encode.bytes(keyHash);
        expect(roundtrip).toEqual(original);
      }),
    );

    it.effect("should roundtrip hex -> KeyHash -> hex with Effect", () =>
      Effect.gen(function* () {
        const original = validHex;
        const keyHash = KeyHash.Codec.Decode.string(original);
        const roundtrip = KeyHash.Codec.Encode.string(keyHash);
        expect(roundtrip).toBe(original);
      }),
    );
  });

  describe("property-based testing", () => {
    test("should maintain consistency across transformations", () => {
      FastCheck.assert(
        FastCheck.property(KeyHash.generator, (keyHash) => {
          // KeyHash -> bytes -> KeyHash should be identity
          const bytes = KeyHash.Codec.Encode.bytes(keyHash);
          const roundtripKeyHash = KeyHash.Codec.Decode.bytes(bytes);
          expect(KeyHash.equals(keyHash, roundtripKeyHash)).toBe(true);

          // KeyHash -> hex -> KeyHash should be identity
          const hex = KeyHash.Codec.Encode.string(keyHash);
          const roundtripKeyHash2 = KeyHash.Codec.Decode.string(hex);
          expect(KeyHash.equals(keyHash, roundtripKeyHash2)).toBe(true);
        }),
      );
    });

    test("HexSchema is equivalent to branded Hash28.HexSchema", () => {
      const keyHash1 = KeyHash.Codec.Decode.string(validHex);
      const keyHash2 = KeyHash.Codec.Decode.string(validHex);

      expect(keyHash1).toBe(keyHash2);
      expect(KeyHash.equals(keyHash1, keyHash2)).toBe(true);
    });
  });
});
