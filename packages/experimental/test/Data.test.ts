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
        expect(bytes.bytes).toBe(input);
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
        expect(integer.value).toBe(input);
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
        expect(list.items).toEqual([]);
        expect(Data.isPlutusList(list)).toBe(true);
      });

      it("should create a valid list with elements", () => {
        const list = Data.list([Data.int(42n), Data.bytearray("deadbeef")]);
        expect(list.items).toHaveLength(2);
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
        expect(constr.data).toEqual([]);
        expect(Data.isConstr(constr)).toBe(true);
      });

      it("should create a valid constructor with fields", () => {
        const constr = Data.constr(2n, [
          Data.int(42n),
          Data.bytearray("deadbeef"),
          Data.list([Data.int(99n)]),
        ]);
        expect(constr.index).toBe(2n);
        expect(constr.data).toHaveLength(3);
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
      },
      {
        name: "constructor with fields",
        value: Data.constr(1n, [Data.int(42n), Data.bytearray("cafe")]),
      },
      {
        name: "large constructor index",
        value: Data.constr(999999n, [Data.int(42n)]),
      },
      {
        name: "empty list",
        value: Data.list([]),
      },
      {
        name: "list with mixed elements",
        value: Data.list([
          Data.int(1n),
          Data.bytearray("deadbeef"),
          Data.list([]),
        ]),
      },
      {
        name: "empty map",
        value: Data.map([]),
      },
      {
        name: "map with entries",
        value: Data.map([
          {
            key: Data.int(1n),
            value: Data.bytearray("cafe"),
          },
        ]),
      },
      {
        name: "small int",
        value: Data.int(42n),
      },
      {
        name: "negative int",
        value: Data.int(-42n),
      },
      {
        name: "large positive int",
        value: Data.int(2n ** 64n),
      },
      {
        name: "large negative int",
        value: Data.int(-(2n ** 64n)),
      },
      {
        name: "bytes",
        value: Data.bytearray("deadbeef"),
      },
      {
        name: "empty bytes",
        value: Data.bytearray(""),
      },
    ];

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

    describe("Either-based encoding/decoding", () => {
      it("should handle encoding with Either", () => {
        const data = Data.constr(0n, [Data.int(42n)]);
        const result = Data.EncodeEither.cborHex(data);
        expect(result._tag).toBe("Right");
      });

      it("should handle decoding with Either", () => {
        const data = Data.constr(0n, [Data.int(42n)]);
        const hex = Data.Encode.cborHex(data);
        const result = Data.DecodeEither.cborHex(hex);
        expect(result._tag).toBe("Right");
      });

      it("should return Left for invalid hex in decoding", () => {
        const result = Data.DecodeEither.cborHex("not-hex");
        expect(result._tag).toBe("Left");
      });
    });

    describe("Effect-based encoding/decoding", () => {
      it.effect("should handle encoding with Effect", () =>
        Effect.gen(function* (_) {
          const data = Data.constr(0n, [Data.int(42n)]);
          const hex = yield* Data.EncodeEffect.cborHex(data);
          expect(typeof hex).toBe("string");
        }),
      );

      it.effect("should handle decoding with Effect", () =>
        Effect.gen(function* (_) {
          const data = Data.constr(0n, [Data.int(42n)]);
          const hex = Data.Encode.cborHex(data);
          const decoded = yield* Data.DecodeEffect.cborHex(hex);
          expect(decoded).toEqual(data);
        }),
      );

      it.effect("should fail for invalid hex in decoding", () =>
        Effect.gen(function* (_) {
          const result = yield* Effect.either(
            Data.DecodeEffect.cborHex("not-hex"),
          );
          expect(result._tag).toBe("Left");
        }),
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
            `Constructor ${constr.index} with ${constr.data.length} fields`,
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
            `Constructor ${constr.index} with ${constr.data.length} fields`,
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
            `Constructor ${constr.index} with ${constr.data.length} fields`,
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
            `Constructor ${constr.index} with ${constr.data.length} fields`,
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
            `Constructor ${constr.index} with ${constr.data.length} fields`,
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
});
