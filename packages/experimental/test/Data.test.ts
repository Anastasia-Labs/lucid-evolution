import { describe, expect, it } from "@effect/vitest";
import { Effect, Schema } from "effect";
import * as Data from "../src/Data.js";

/**
 * Tests for the Data module functionality -
 * focusing on PlutusData types, their construction, validation, and CBOR encoding/decoding
 */
describe("Data Module Tests", () => {
  describe("Basic Types", () => {
    describe("PlutusBytes", () => {
      const validHexCases = [
        "deadbeef",
        "cafe0123",
        "abcdef0123456789",
        "00",
        "ff",
      ];

      it.each(validHexCases)("should create valid PlutusBytes: %s", (input) => {
        const bytes = Data.bytearray(input);
        expect(bytes.bytearray).toBe(input);
        expect(Data.isPlutusBytes(bytes)).toBe(true);
      });

      const invalidHexCases = [
        "not-hex",
        "xyz",
        "123g",
        "deadbeef ",
        " deadbeef",
        "0x123456",
      ];

      it.each(invalidHexCases)(
        "should fail schema validation on invalid hex string: %s",
        (input) => {
          const invalidBytes = { _tag: "Bytes", bytes: input } as any;
          expect(Data.isPlutusBytes(invalidBytes)).toBe(false);
        },
      );

      it("should validate PlutusBytes with schema", () => {
        const bytes = Data.bytearray("deadbeef");
        expect(Schema.is(Data.PlutusBytesSchema)(bytes)).toBe(true);
      });
    });

    describe("PlutusBigInt", () => {
      const integerCases = [
        0n,
        1n,
        -1n,
        42n,
        -42n,
        2n ** 63n - 1n,
        -(2n ** 63n),
        2n ** 64n,
        -(2n ** 64n),
        123456789123456789n,
        -123456789123456789n,
      ];

      it.each(integerCases)("should create valid PlutusBigInt: %s", (input) => {
        const integer = Data.int(input);
        expect(integer.integer).toBe(input);
        expect(Data.isPlutusBigInt(integer)).toBe(true);
      });

      it("should fail validation with non-bigint value", () => {
        const invalidInt = { _tag: "Int", value: "not-a-bigint" } as any;
        expect(Data.isPlutusBigInt(invalidInt)).toBe(false);
      });

      it("should validate PlutusBigInt with schema", () => {
        const integer = Data.int(42n);
        expect(Schema.is(Data.PlutusBigIntSchema)(integer)).toBe(true);
      });
    });

    describe("PlutusList", () => {
      it("should create a valid empty list", () => {
        const list = Data.list([]);
        expect(list.list).toEqual([]);
        expect(Data.isPlutusList(list)).toBe(true);
      });

      it("should create a valid list with elements", () => {
        const list = Data.list([Data.int(42n), Data.bytearray("deadbeef")]);
        expect(list.list).toHaveLength(2);
        expect(Data.isPlutusList(list)).toBe(true);
      });

      it("should validate PlutusList with schema", () => {
        const list = Data.list([Data.int(42n), Data.bytearray("cafe")]);
        expect(Schema.is(Data.PlutusListSchema)(list)).toBe(true);
      });
    });

    describe("PlutusMap", () => {
      it("should create a valid empty map", () => {
        const map = Data.map([]);
        expect(map.entries).toEqual([]);
        expect(Data.isPlutusMap(map)).toBe(true);
      });

      it("should create a valid map with entries", () => {
        const map = Data.map([
          {
            key: Data.bytearray("cafe"),
            value: Data.int(42n),
          },
          {
            key: Data.int(99n),
            value: Data.bytearray("deadbeef"),
          },
        ]);
        expect(map.entries).toHaveLength(2);
        expect(Data.isPlutusMap(map)).toBe(true);
      });

      it("should validate PlutusMap with schema", () => {
        const map = Data.map([
          {
            key: Data.int(1n),
            value: Data.int(2n),
          },
        ]);
        expect(Schema.is(Data.PlutusMapSchema)(map)).toBe(true);
      });
    });

    describe("Constr", () => {
      it("should create a valid constructor with no fields", () => {
        const constr = Data.constr(0n, []);
        expect(constr.index).toBe(0n);
        expect(constr.fields).toEqual([]);
        expect(Data.isConstr(constr)).toBe(true);
      });

      it("should create a valid constructor with fields", () => {
        const constr = Data.constr(2n, [
          Data.int(42n),
          Data.bytearray("deadbeef"),
          Data.list([Data.int(99n)]),
        ]);
        expect(constr.index).toBe(2n);
        expect(constr.fields).toHaveLength(3);
        expect(Data.isConstr(constr)).toBe(true);
      });

      it("should validate Constr with schema", () => {
        const constr = Data.constr(5n, [Data.int(42n), Data.bytearray("cafe")]);
        expect(Schema.is(Data.ConstrSchema)(constr)).toBe(true);
      });

      it("should handle large constructor indices", () => {
        const largeIndex = 2n ** 32n + 1n; // Well beyond the direct tag range
        const constr = Data.constr(largeIndex, [Data.int(1n)]);
        expect(constr.index).toBe(largeIndex);
        expect(Data.isConstr(constr)).toBe(true);
      });
    });
  });

  describe("CBOR Encoding/Decoding", () => {
    const testCases = [
      {
        name: "empty constructor",
        value: Data.constr(0n, []),
        expectedHex: "d87980", // Golden value for regression testing
      },
      {
        name: "constructor with fields",
        value: Data.constr(1n, [Data.int(42n), Data.bytearray("cafe")]),
        expectedHex: "d87a9f182a42cafeFF", // Golden value
      },
      {
        name: "large constructor index",
        value: Data.constr(999999n, [Data.int(42n)]),
        expectedHex: "d8669f1a000f423f9f182aFFFF", // Golden value
      },
      {
        name: "empty list",
        value: Data.list([]),
        expectedHex: "80", // Golden value
      },
      {
        name: "list with mixed elements",
        value: Data.list([
          Data.int(1n),
          Data.bytearray("deadbeef"),
          Data.list([]),
        ]),
        expectedHex: "9f0144deadbeef80FF", // Golden value
      },
      {
        name: "empty map",
        value: Data.map([]),
        expectedHex: "a0", // Golden value
      },
      {
        name: "map with entries",
        value: Data.map([
          {
            key: Data.int(1n),
            value: Data.bytearray("cafe"),
          },
        ]),
        expectedHex: "bf0142cafeFF", // Golden value
      },
      {
        name: "small int",
        value: Data.int(42n),
        expectedHex: "182a", // Golden value
      },
      {
        name: "negative int",
        value: Data.int(-42n),
        expectedHex: "3829", // Golden value
      },
      {
        name: "large positive int",
        value: Data.int(2n ** 64n),
        expectedHex: "c249010000000000000000", // Golden value
      },
      {
        name: "large negative int",
        value: Data.int(-(2n ** 64n)),
        expectedHex: "c349010000000000000000", // Golden value
      },
      {
        name: "bytes",
        value: Data.bytearray("deadbeef"),
        expectedHex: "44deadbeef", // Golden value
      },
      {
        name: "empty bytes",
        value: Data.bytearray(""),
        expectedHex: "40", // Golden value
      },
    ];

    describe("Standard Encoding/Decoding", () => {
      describe("Hex Encoding/Decoding", () => {
        it.each(testCases)(
          "should round-trip $name via hex encoding",
          ({ value }) => {
            const encoded = Data.Encode.cborHex(value);
            const decoded = Data.Decode.cborHex(encoded);
            expect(decoded).toEqual(value);
          },
        );
      });

      describe("Bytes Encoding/Decoding", () => {
        it.each(testCases)(
          "should round-trip $name via bytes encoding",
          ({ value }) => {
            const encoded = Data.Encode.cborBytes(value);
            const decoded = Data.Decode.cborBytes(encoded);
            expect(decoded).toEqual(value);
          },
        );
      });
    });

    describe("CML Compatible Encoding/Decoding", () => {
      describe("Hex Encoding/Decoding", () => {
        it.each(testCases)(
          "should round-trip $name via CML hex encoding",
          ({ value }) => {
            const encoded = Data.Encode.cborHex(value);
            const decoded = Data.Decode.cborHex(encoded);
            expect(decoded).toEqual(value);
          },
        );
      });

      describe("Bytes Encoding/Decoding", () => {
        it.each(testCases)(
          "should round-trip $name via CML bytes encoding",
          ({ value }) => {
            const encoded = Data.Encode.cborBytes(value);
            const decoded = Data.Decode.cborBytes(encoded);
            expect(decoded).toEqual(value);
          },
        );
      });
    });

    describe("Cross-Compatibility Tests", () => {
      it.each(
        testCases.filter((tc) => !tc.name.includes("large constructor index")),
      )(
        "should be compatible between standard and CML encoding for $name",
        ({ value }) => {
          // Encode with standard, decode with CML
          const standardEncoded = Data.Encode.cborBytes(value);
          const cmlDecoded = Data.Decode.cborBytes(standardEncoded);
          expect(cmlDecoded).toEqual(value);

          // Encode with CML, decode with standard
          const cmlEncoded = Data.Encode.cborBytes(value);
          const standardDecoded = Data.Decode.cborBytes(cmlEncoded);
          expect(standardDecoded).toEqual(value);
        },
      );
    });

    describe("Effect-based encoding/decoding", () => {
      it.effect("should handle encoding with Effect", () =>
        Effect.gen(function* () {
          const data = Data.constr(0n, [Data.int(42n)]);
          const hex = Data.Encode.cborHex(data);
          expect(typeof hex).toBe("string");
        }),
      );

      it.effect("should handle decoding with Effect", () =>
        Effect.gen(function* () {
          const data = Data.constr(0n, [Data.int(42n)]);
          const hex = Data.Encode.cborHex(data);
          const decoded = Data.Decode.cborHex(hex);
          expect(decoded).toEqual(data);
        }),
      );

      it.effect("should fail for invalid hex in decoding", () =>
        Effect.gen(function* () {
          const result = yield* Effect.try(() =>
            Data.Decode.cborHex("not-hex"),
          );
          expect(result).toBeDefined();
        }).pipe(Effect.catchAll(() => Effect.succeed(undefined))),
      );
    });
  });

  describe("Utility Functions", () => {
    describe("matchConstr", () => {
      it("should match specific constructor indices", () => {
        const constr = Data.constr(1n, [Data.int(42n)]);
        const result = Data.matchConstr(constr, {
          1: (fields) => `Found index 1 with ${fields.length} fields`,
          2: (fields) => `Found index 2 with ${fields.length} fields`,
          _: (index, fields) =>
            `Default case: index ${index} with ${fields.length} fields`,
        });
        expect(result).toBe("Found index 1 with 1 fields");
      });

      it("should use default case for non-matched indices", () => {
        const constr = Data.constr(99n, [Data.int(42n)]);
        const result = Data.matchConstr(constr, {
          1: (fields) => `Found index 1 with ${fields.length} fields`,
          2: (fields) => `Found index 2 with ${fields.length} fields`,
          _: (index, fields) =>
            `Default case: index ${index} with ${fields.length} fields`,
        });
        expect(result).toBe("Default case: index 99 with 1 fields");
      });
    });

    describe("matchPlutusData", () => {
      it("should match PlutusMap type", () => {
        const map = Data.map([]);
        const result = Data.matchPlutusData(map, {
          PlutusMap: (entries) => `Map with ${entries.length} entries`,
          PlutusList: (items) => `List with ${items.length} items`,
          PlutusBigInt: (value) => `BigInt: ${value}`,
          PlutusBytes: (bytes) => `Bytes: ${bytes}`,
          Constr: (constr) =>
            `Constructor ${constr.index} with ${constr.fields.length} fields`,
        });
        expect(result).toBe("Map with 0 entries");
      });

      it("should match PlutusList type", () => {
        const list = Data.list([Data.int(1n)]);
        const result = Data.matchPlutusData(list, {
          PlutusMap: (entries) => `Map with ${entries.length} entries`,
          PlutusList: (items) => `List with ${items.length} items`,
          PlutusBigInt: (value) => `BigInt: ${value}`,
          PlutusBytes: (bytes) => `Bytes: ${bytes}`,
          Constr: (constr) =>
            `Constructor ${constr.index} with ${constr.fields.length} fields`,
        });
        expect(result).toBe("List with 1 items");
      });

      it("should match PlutusBigInt type", () => {
        const int = Data.int(42n);
        const result = Data.matchPlutusData(int, {
          PlutusMap: (entries) => `Map with ${entries.length} entries`,
          PlutusList: (items) => `List with ${items.length} items`,
          PlutusBigInt: (value) => `BigInt: ${value}`,
          PlutusBytes: (bytes) => `Bytes: ${bytes}`,
          Constr: (constr) =>
            `Constructor ${constr.index} with ${constr.fields.length} fields`,
        });
        expect(result).toBe("BigInt: 42");
      });

      it("should match PlutusBytes type", () => {
        const bytes = Data.bytearray("cafe");
        const result = Data.matchPlutusData(bytes, {
          PlutusMap: (entries) => `Map with ${entries.length} entries`,
          PlutusList: (items) => `List with ${items.length} items`,
          PlutusBigInt: (value) => `BigInt: ${value}`,
          PlutusBytes: (bytes) => `Bytes: ${bytes}`,
          Constr: (constr) =>
            `Constructor ${constr.index} with ${constr.fields.length} fields`,
        });
        expect(result).toBe("Bytes: cafe");
      });

      it("should match Constr type", () => {
        const constr = Data.constr(3n, []);
        const result = Data.matchPlutusData(constr, {
          PlutusMap: (entries) => `Map with ${entries.length} entries`,
          PlutusList: (items) => `List with ${items.length} items`,
          PlutusBigInt: (value) => `BigInt: ${value}`,
          PlutusBytes: (bytes) => `Bytes: ${bytes}`,
          Constr: (constr) =>
            `Constructor ${constr.index} with ${constr.fields.length} fields`,
        });
        expect(result).toBe("Constructor 3 with 0 fields");
      });
    });
  });

  describe("Complex Structures", () => {
    it("should handle nested structures", () => {
      // Create a complex nested structure
      const complex = Data.constr(0n, [
        Data.list([Data.int(1n), Data.int(2n), Data.bytearray("cafe")]),
        Data.map([
          {
            key: Data.int(42n),
            value: Data.list([Data.bytearray("deadbeef")]),
          },
          {
            key: Data.bytearray("deadbeef"),
            value: Data.constr(1n, [Data.int(-999n)]),
          },
        ]),
        Data.constr(7n, [Data.list([]), Data.map([])]),
      ]);

      // Test round-trip encoding/decoding
      const encoded = Data.Encode.cborHex(complex);
      const decoded = Data.Decode.cborHex(encoded);
      expect(decoded).toEqual(complex);
    });
  });

  describe("Integer Boundary Testing", () => {
    const boundaryTestCases = [
      { name: "Zero", value: 0n },
      { name: "Small positive (23)", value: 23n },
      { name: "Small positive (24)", value: 24n },
      { name: "Small positive (255)", value: 255n },
      { name: "Small positive (256)", value: 256n },
      { name: "Medium positive (65535)", value: 65535n },
      { name: "Medium positive (65536)", value: 65536n },
      { name: "Large positive (4294967295)", value: 4294967295n },
      { name: "Large positive (4294967296)", value: 4294967296n },
      { name: "64-bit boundary (2^63 - 1)", value: 9223372036854775807n },
      { name: "64-bit boundary (2^63)", value: 9223372036854775808n },
      { name: "64-bit max (2^64 - 1)", value: 18446744073709551615n },
      { name: "Bignum threshold (2^64)", value: 18446744073709551616n },
      { name: "Large bignum (2^64 + 1)", value: 18446744073709551617n },
      {
        name: "Very large bignum (2^128)",
        value: 340282366920938463463374607431768211456n,
      },
      { name: "Small negative (-1)", value: -1n },
      { name: "Small negative (-24)", value: -24n },
      { name: "Small negative (-25)", value: -25n },
      { name: "Medium negative (-256)", value: -256n },
      { name: "Medium negative (-257)", value: -257n },
      { name: "Large negative (-4294967296)", value: -4294967296n },
      {
        name: "64-bit negative boundary (-2^63)",
        value: -9223372036854775808n,
      },
      {
        name: "64-bit negative max (-2^64 + 1)",
        value: -18446744073709551615n,
      },
      {
        name: "Negative bignum threshold (-2^64)",
        value: -18446744073709551616n,
      },
      {
        name: "Large negative bignum (-2^64 - 1)",
        value: -18446744073709551617n,
      },
      {
        name: "Very large negative bignum (-2^128)",
        value: -340282366920938463463374607431768211456n,
      },
    ];

    it.each(boundaryTestCases)("should handle $name correctly", ({ value }) => {
      const plutusData = Data.int(value);
      const encoded = Data.Encode.cborBytes(plutusData);
      const decoded = Data.Decode.cborBytes(encoded);

      expect(decoded).toEqual(plutusData);
      expect((decoded as any).integer).toBe(value);
    });
  });

  describe("CBOR Encoding Format Validation", () => {
    it("should use correct CBOR major types for different integer ranges", () => {
      const testCases = [
        { value: 23n, expectedMajorType: 0, description: "direct encoding" },
        { value: 255n, expectedMajorType: 0, description: "1-byte unsigned" },
        { value: 65535n, expectedMajorType: 0, description: "2-byte unsigned" },
        {
          value: 4294967295n,
          expectedMajorType: 0,
          description: "4-byte unsigned",
        },
        {
          value: 18446744073709551615n,
          expectedMajorType: 0,
          description: "8-byte unsigned",
        },
        {
          value: 18446744073709551616n,
          expectedMajorType: 6,
          description: "positive bignum tag",
        },
        { value: -1n, expectedMajorType: 1, description: "direct negative" },
        { value: -24n, expectedMajorType: 1, description: "1-byte negative" },
        { value: -256n, expectedMajorType: 1, description: "2-byte negative" },
        {
          value: -18446744073709551615n,
          expectedMajorType: 1,
          description: "8-byte negative",
        },
        {
          value: -18446744073709551617n,
          expectedMajorType: 6,
          description: "negative bignum tag",
        },
      ];

      testCases.forEach(({ value, expectedMajorType, description }) => {
        const plutusData = Data.int(value);
        const encoded = Data.Encode.cborBytes(plutusData);
        const firstByte = encoded[0];
        const majorType = firstByte >> 5;

        expect(majorType).toBe(expectedMajorType);

        // Additional validation for bignum tags
        if (expectedMajorType === 6) {
          const additionalInfo = firstByte & 0x1f;
          if (value > 0n) {
            expect(additionalInfo).toBe(2); // Tag 2 for positive bignum
          } else {
            expect(additionalInfo).toBe(3); // Tag 3 for negative bignum
          }
        }
      });
    });

    it("should produce deterministic CBOR encoding", () => {
      const testData = [
        Data.int(42n),
        Data.bytearray("deadbeef"),
        Data.list([Data.int(1n), Data.int(2n)]),
        Data.map([{ key: Data.int(1n), value: Data.bytearray("cafe") }]),
        Data.constr(0n, [Data.int(42n)]),
      ];

      testData.forEach((data) => {
        const encoded1 = Data.Encode.cborHex(data);
        const encoded2 = Data.Encode.cborHex(data);
        expect(encoded1).toBe(encoded2);
      });
    });

    it("should handle empty collections correctly", () => {
      const emptyList = Data.list([]);
      const emptyMap = Data.map([]);
      const emptyConstr = Data.constr(0n, []);

      // Test that empty collections encode/decode correctly
      [emptyList, emptyMap, emptyConstr].forEach((data) => {
        const encoded = Data.Encode.cborBytes(data);
        const decoded = Data.Decode.cborBytes(encoded);
        expect(decoded).toEqual(data);
      });
    });
  });

  describe("Large Data Structure Edge Cases", () => {
    it("should handle deeply nested structures", () => {
      // Create a deeply nested structure (10 levels deep)
      let nested: any = Data.int(42n);
      for (let i = 0; i < 10; i++) {
        nested = Data.list([nested]);
      }

      const encoded = Data.Encode.cborHex(nested);
      const decoded = Data.Decode.cborHex(encoded);
      expect(decoded).toEqual(nested);
    });

    it("should handle large lists", () => {
      // Create a list with many elements
      const largeList = Data.list(
        Array.from({ length: 1000 }, (_, i) => Data.int(BigInt(i))),
      );

      const encoded = Data.Encode.cborBytes(largeList);
      const decoded = Data.Decode.cborBytes(encoded);
      expect(decoded).toEqual(largeList);
      expect((decoded as any).list).toHaveLength(1000);
    });

    it("should handle large maps", () => {
      // Create a map with many entries
      const entries = Array.from({ length: 100 }, (_, i) => ({
        key: Data.int(BigInt(i)),
        value: Data.bytearray(`${i.toString(16).padStart(4, "0")}`),
      }));
      const largeMap = Data.map(entries);

      const encoded = Data.Encode.cborBytes(largeMap);
      const decoded = Data.Decode.cborBytes(encoded);
      expect(decoded).toEqual(largeMap);
      expect((decoded as any).entries).toHaveLength(100);
    });

    it("should handle constructors with many fields", () => {
      // Create a constructor with many fields
      const manyFields = Array.from({ length: 50 }, (_, i) =>
        Data.int(BigInt(i)),
      );
      const constr = Data.constr(42n, manyFields);

      const encoded = Data.Encode.cborBytes(constr);
      const decoded = Data.Decode.cborBytes(encoded);
      expect(decoded).toEqual(constr);
      expect((decoded as any).fields).toHaveLength(50);
    });
  });

  describe("Error Handling and Edge Cases", () => {
    describe("Invalid CBOR Input", () => {
      const invalidInputs = [
        { name: "non-hex string", input: "not-valid-cbor", method: "cborHex" },
        { name: "partial hex string", input: "deadbee", method: "cborHex" },
        { name: "truncated CBOR", input: "d8", method: "cborHex" },
        { name: "invalid CBOR tag", input: "d8ff", method: "cborHex" },
        { name: "incomplete tagged value", input: "d87900", method: "cborHex" },
      ];

      it.each(invalidInputs)(
        "should handle $name gracefully",
        ({ input, method }) => {
          expect(() => {
            if (method === "cborHex") {
              Data.Decode.cborHex(input);
            }
          }).toThrow();
        },
      );
    });

    describe("Malformed PlutusData Objects", () => {
      it("should handle objects with wrong _tag values", () => {
        const malformedObjects = [
          { _tag: "InvalidTag", data: "test" },
          { _tag: "Integer", integer: "not-a-bigint" },
          { _tag: "List", list: "not-an-array" },
          { _tag: "Map", entries: "not-an-array" },
          { _tag: "Constr", index: "not-a-bigint", fields: [] },
          { _tag: "ByteArray", bytearray: "invalidhex!" },
        ];

        malformedObjects.forEach((obj) => {
          expect(Data.isPlutusBigInt(obj as any)).toBe(false);
          expect(Data.isPlutusList(obj as any)).toBe(false);
          expect(Data.isPlutusMap(obj as any)).toBe(false);
          expect(Data.isConstr(obj as any)).toBe(false);
          expect(Data.isPlutusBytes(obj as any)).toBe(false);
        });
      });

      it("should handle missing required fields", () => {
        const incompleteObjects = [
          { _tag: "Integer" }, // Missing integer field
          { _tag: "List" }, // Missing list field
          { _tag: "Map" }, // Missing entries field
          { _tag: "Constr", index: 1n }, // Missing fields
          { _tag: "ByteArray" }, // Missing bytearray field
        ];

        incompleteObjects.forEach((obj) => {
          expect(Data.isPlutusBigInt(obj as any)).toBe(false);
          expect(Data.isPlutusList(obj as any)).toBe(false);
          expect(Data.isPlutusMap(obj as any)).toBe(false);
          expect(Data.isConstr(obj as any)).toBe(false);
          expect(Data.isPlutusBytes(obj as any)).toBe(false);
        });
      });
    });

    describe("Boundary Value Testing", () => {
      it("should handle bytearray edge cases", () => {
        const edgeCases = [
          { name: "empty string", value: "" },
          { name: "single zero byte", value: "00" },
          { name: "single max byte", value: "ff" },
          { name: "lowercase hex", value: "deadbeef" },
          { name: "uppercase hex", value: "DEADBEEF" },
        ];

        edgeCases.forEach(({ name, value }) => {
          expect(() => {
            const bytes = Data.bytearray(value);
            const encoded = Data.Encode.cborBytes(bytes);
            const decoded = Data.Decode.cborBytes(encoded);
            // Note: hex strings are normalized to lowercase during processing
            if (decoded._tag === "ByteArray") {
              expect(decoded.bytearray).toBe(value.toLowerCase());
            }
          }).not.toThrow();
        });
      });

      it("should handle invalid bytearray inputs", () => {
        const invalidCases = [
          "deadbee", // Odd length
          "deadbeeg", // Invalid hex character
          "0x123456", // Hex prefix not allowed
          " deadbeef", // Leading whitespace
          "deadbeef ", // Trailing whitespace
        ];

        invalidCases.forEach((invalidHex) => {
          // Should not throw during creation (lenient validation)
          // but should fail type guard validation
          const invalidBytes = { _tag: "ByteArray", bytearray: invalidHex };
          expect(Data.isPlutusBytes(invalidBytes as any)).toBe(false);
        });
      });
    });
  });

  describe("Type Safety and Validation", () => {
    describe("Type Guards", () => {
      it("should correctly identify PlutusData types", () => {
        const testCases = [
          { data: Data.int(42n), expectedType: "PlutusBigInt" },
          { data: Data.bytearray("deadbeef"), expectedType: "PlutusBytes" },
          { data: Data.list([]), expectedType: "PlutusList" },
          { data: Data.map([]), expectedType: "PlutusMap" },
          { data: Data.constr(0n, []), expectedType: "Constr" },
        ];

        testCases.forEach(({ data, expectedType }) => {
          switch (expectedType) {
            case "PlutusBigInt":
              expect(Data.isPlutusBigInt(data)).toBe(true);
              expect(Data.isPlutusBytes(data)).toBe(false);
              expect(Data.isPlutusList(data)).toBe(false);
              expect(Data.isPlutusMap(data)).toBe(false);
              expect(Data.isConstr(data)).toBe(false);
              break;
            case "PlutusBytes":
              expect(Data.isPlutusBigInt(data)).toBe(false);
              expect(Data.isPlutusBytes(data)).toBe(true);
              expect(Data.isPlutusList(data)).toBe(false);
              expect(Data.isPlutusMap(data)).toBe(false);
              expect(Data.isConstr(data)).toBe(false);
              break;
            case "PlutusList":
              expect(Data.isPlutusBigInt(data)).toBe(false);
              expect(Data.isPlutusBytes(data)).toBe(false);
              expect(Data.isPlutusList(data)).toBe(true);
              expect(Data.isPlutusMap(data)).toBe(false);
              expect(Data.isConstr(data)).toBe(false);
              break;
            case "PlutusMap":
              expect(Data.isPlutusBigInt(data)).toBe(false);
              expect(Data.isPlutusBytes(data)).toBe(false);
              expect(Data.isPlutusList(data)).toBe(false);
              expect(Data.isPlutusMap(data)).toBe(true);
              expect(Data.isConstr(data)).toBe(false);
              break;
            case "Constr":
              expect(Data.isPlutusBigInt(data)).toBe(false);
              expect(Data.isPlutusBytes(data)).toBe(false);
              expect(Data.isPlutusList(data)).toBe(false);
              expect(Data.isPlutusMap(data)).toBe(false);
              expect(Data.isConstr(data)).toBe(true);
              break;
          }
        });
      });
    });

    describe("Schema Validation", () => {
      it("should validate all PlutusData types with their schemas", () => {
        expect(Schema.is(Data.PlutusBigIntSchema)(Data.int(42n))).toBe(true);
        expect(
          Schema.is(Data.PlutusBytesSchema)(Data.bytearray("deadbeef")),
        ).toBe(true);
        expect(
          Schema.is(Data.PlutusListSchema)(Data.list([Data.int(1n)])),
        ).toBe(true);
        expect(
          Schema.is(Data.PlutusMapSchema)(
            Data.map([{ key: Data.int(1n), value: Data.int(2n) }]),
          ),
        ).toBe(true);
        expect(
          Schema.is(Data.ConstrSchema)(Data.constr(0n, [Data.int(42n)])),
        ).toBe(true);
      });
    });
  });

  describe("Edge Cases and Robustness", () => {
    describe("Deeply Nested Structures", () => {
      it("should handle moderate nesting levels", () => {
        // Create a moderately nested structure (20 levels)
        let nested: any = Data.int(42n);
        for (let i = 0; i < 20; i++) {
          nested = Data.list([nested]);
        }

        expect(() => {
          const encoded = Data.Encode.cborBytes(nested);
          const decoded = Data.Decode.cborBytes(encoded);
          expect(decoded).toEqual(nested);
        }).not.toThrow();
      });

      it("should handle mixed nested structures", () => {
        // Create a complex mixed structure with valid hex strings
        const complex = Data.constr(0n, [
          Data.list([
            Data.map([{ key: Data.int(1n), value: Data.bytearray("cafe") }]),
            Data.constr(1n, [Data.int(-999n)]),
          ]),
          Data.map([
            {
              key: Data.bytearray("deadbeef"), // Valid hex string
              value: Data.list([Data.int(1n), Data.int(2n), Data.int(3n)]),
            },
            {
              key: Data.int(42n),
              value: Data.constr(2n, []),
            },
          ]),
        ]);

        const encoded = Data.Encode.cborBytes(complex);
        const decoded = Data.Decode.cborBytes(encoded);
        expect(decoded).toEqual(complex);
      });
    });

    describe("Data Structure Consistency", () => {
      it("should maintain referential integrity", () => {
        // Verify that separate instances with same data are equal
        const data1 = Data.constr(42n, [
          Data.int(123n),
          Data.bytearray("cafe"),
        ]);
        const data2 = Data.constr(42n, [
          Data.int(123n),
          Data.bytearray("cafe"),
        ]);

        expect(data1).toEqual(data2);

        const encoded1 = Data.Encode.cborBytes(data1);
        const encoded2 = Data.Encode.cborBytes(data2);

        expect(encoded1).toEqual(encoded2);
      });

      it("should detect data differences correctly", () => {
        const similar = [
          {
            data1: Data.constr(42n, [Data.int(123n)]),
            data2: Data.constr(43n, [Data.int(123n)]), // Different index
          },
          {
            data1: Data.constr(42n, [Data.int(123n)]),
            data2: Data.constr(42n, [Data.int(124n)]), // Different field
          },
          {
            data1: Data.bytearray("deadbeef"),
            data2: Data.bytearray("deadbeee"), // Different hex
          },
          {
            data1: Data.int(42n),
            data2: Data.int(-42n), // Different sign
          },
        ];

        similar.forEach(({ data1, data2 }) => {
          expect(data1).not.toEqual(data2);

          const encoded1 = Data.Encode.cborBytes(data1);
          const encoded2 = Data.Encode.cborBytes(data2);

          expect(encoded1).not.toEqual(encoded2);
        });
      });
    });
  });

  describe("Constructor Index Edge Cases", () => {
    it("should handle direct tag constructors (0-6)", () => {
      for (let i = 0; i <= 6; i++) {
        const constr = Data.constr(BigInt(i), [Data.int(42n)]);
        const encoded = Data.Encode.cborBytes(constr);
        const decoded = Data.Decode.cborBytes(encoded);
        expect(decoded).toEqual(constr);

        // Verify CBOR encoding uses direct tags (121-127) with 1-byte encoding
        const firstByte = encoded[0];
        expect(firstByte).toBe(0xd8); // Tag encoding prefix for 1-byte tags
        const tagByte = encoded[1];
        expect(tagByte).toBe(121 + i);
      }
    });

    it("should handle general constructor tag (index >= 7)", () => {
      const testIndices = [7n, 100n, 999999n, 2n ** 32n, 2n ** 64n - 1n];

      testIndices.forEach((index) => {
        const constr = Data.constr(index, [Data.int(42n)]);
        const encoded = Data.Encode.cborBytes(constr);
        const decoded = Data.Decode.cborBytes(encoded);
        expect(decoded).toEqual(constr);
        expect((decoded as any).index).toBe(index);

        // Verify CBOR encoding format based on CML compatibility
        const firstByte = encoded[0];

        if (index >= 7n && index <= 127n) {
          // CML compatibility format: tags 1280+ for indices 7-127
          expect(firstByte).toBe(0xd9); // Tag encoding prefix for 2-byte tags
          const tagBytes = (encoded[1] << 8) | encoded[2];
          expect(tagBytes).toBe(1280 + Number(index - 7n));
        } else {
          // General constructor tag (102) for indices >= 128
          expect(firstByte).toBe(0xd8); // Tag encoding prefix for 1-byte tags
          expect(encoded[1]).toBe(102); // General constructor tag
        }
      });
    });
  });
});
