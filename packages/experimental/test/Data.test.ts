import { describe, expect, it } from "vitest";
import * as Data from "../src/Data.js";
import * as TSchema from "../src/TSchema.js";
import { Schema } from "effect";

/**
 * Tests for the core Data module functionality -
 * focusing on basic data types, their construction and validation
 */
describe("Data Module Tests", () => {
  describe("Basic Types", () => {
    describe("ByteArray", () => {
      const validHexCases = [
        "deadbeef",
        "cafe0123",
        "abcdef0123456789",
        "00",
        "ff",
      ];

      it.each(validHexCases)("should create valid ByteArray: %s", (input) => {
        const byteArray = Data.mkByte(input);
        expect(byteArray.bytearray).toBe(input);
        expect(Data.isByteArray(byteArray)).toBe(true);
      });

      const invalidHexCases = [
        "not-hex",
        "xyz",
        "123g",
        "deadbeef ",
        " deadbeef",
        "0x123456",
        // "",
      ];

      it.each(invalidHexCases)(
        "should throw on invalid hex string: %s",
        (input) => {
          expect(() => Data.mkByte(input)).toThrow();
        },
      );

      it("should validate bytearray with schema", () => {
        const byteArray = Data.mkByte("deadbeef");
        expect(Schema.is(Data.ByteArray)(byteArray)).toBe(true);
      });
    });

    describe("Integer", () => {
      const validIntegerCases = [
        0n,
        1n,
        -1n,
        42n,
        -42n,
        9007199254740991n,
        -9007199254740991n,
        2n ** 64n,
        -(2n ** 64n),
      ];

      it.each(validIntegerCases)("should create valid Integer: %s", (input) => {
        const integer = Data.mkInt(input);
        expect(integer.integer).toBe(input);
        expect(Data.isInteger(integer)).toBe(true);
      });

      it("should reject regular numbers", () => {
        // @ts-expect-error - Testing runtime validation
        expect(() => Data.mkInt(42)).toThrow();
      });

      it("should validate integer with schema", () => {
        const integer = Data.mkInt(42n);
        expect(Schema.is(Data.Integer)(integer)).toBe(true);
      });
    });

    describe("List", () => {
      it("should create empty list", () => {
        const list = Data.mkList([]);
        expect(list.list).toEqual([]);
        expect(Data.isList(list)).toBe(true);
      });

      it("should create homogeneous list of integers", () => {
        const integers = [Data.mkInt(1n), Data.mkInt(2n), Data.mkInt(3n)];
        const list = Data.mkList(integers);
        expect(list.list).toEqual(integers);
        expect(Data.isList(list)).toBe(true);
      });

      it("should create list of mixed types", () => {
        const items = [
          Data.mkInt(1n),
          Data.mkByte("deadbeef"),
          Data.mkList([Data.mkInt(2n)]),
        ];
        const list = Data.mkList(items);
        expect(list.list).toEqual(items);
        expect(Data.isList(list)).toBe(true);
      });

      it("should validate list with schema", () => {
        const list = Data.mkList([Data.mkInt(1n)]);
        expect(Schema.is(Data.List)(list)).toBe(true);
      });
    });

    describe("Map", () => {
      it("should create empty map", () => {
        const map = Data.mkMap([]);
        expect(map.entries).toEqual([]);
        expect(Data.isMap(map)).toBe(true);
      });

      it("should create map with entries", () => {
        const entries = [{ k: Data.mkByte("deadbeef"), v: Data.mkInt(42n) }];
        const map = Data.mkMap(entries);
        expect(map.entries).toEqual(entries);
        expect(Data.isMap(map)).toBe(true);
      });

      it("should handle nested maps", () => {
        const nestedMap = Data.mkMap([
          { k: Data.mkByte("cafe"), v: Data.mkInt(43n) },
        ]);

        const map = Data.mkMap([
          { k: Data.mkByte("deadbeef"), v: nestedMap },
          { k: Data.mkInt(1n), v: Data.mkInt(2n) },
        ]);

        expect(Data.isMap(map)).toBe(true);
      });

      it("should validate map with schema", () => {
        const map = Data.mkMap([
          { k: Data.mkByte("deadbeef"), v: Data.mkInt(42n) },
        ]);
        expect(Schema.is(Data.Map)(map)).toBe(true);
      });
    });

    describe("Constr", () => {
      it("should create empty constructor", () => {
        const constr = Data.mkConstr(0n, []);
        expect(constr.index).toBe(0n);
        expect(constr.fields).toEqual([]);
        expect(Data.isConstr(constr)).toBe(true);
      });

      it("should create constructor with fields", () => {
        const fields = [Data.mkInt(42n), Data.mkByte("deadbeef")];
        const constr = Data.mkConstr(1n, fields);
        expect(constr.index).toBe(1n);
        expect(constr.fields).toEqual(fields);
        expect(Data.isConstr(constr)).toBe(true);
      });

      it("should handle nested constructors", () => {
        const nestedConstr = Data.mkConstr(1n, [Data.mkByte("deadbeef")]);

        const constr = Data.mkConstr(0n, [nestedConstr]);

        expect(constr.fields[0]).toEqual(nestedConstr);
        expect(Data.isConstr(constr)).toBe(true);
      });

      it("should reject non-bigint index", () => {
        expect(() =>
          // @ts-ignore
          Data.mkConstr({ index: 0, fields: [] }),
        ).toThrow();
      });

      it("should validate constructor with schema", () => {
        const constr = Data.mkConstr(0n, [Data.mkInt(42n)]);
        expect(Schema.is(Data.Constr)(constr)).toBe(true);
      });
    });
  });

  describe("CBOR Serialization", () => {
    it("should serialize and deserialize ByteArray", () => {
      const byteArray = Data.mkByte("deadbeef");
      const cbor = Data.encodeCBORUnsafe(byteArray);
      const deserialized = Data.decodeCBORUnsafe(cbor);
      expect(deserialized).toEqual(byteArray);
    });

    it("should serialize and deserialize Integer", () => {
      const integer = Data.mkInt(42n);
      const cbor = Data.encodeCBORUnsafe(integer);
      const deserialized = Data.decodeCBORUnsafe(cbor);
      expect(deserialized).toEqual(integer);
    });

    it("should serialize and deserialize nested structures", () => {
      const nested = Data.mkConstr(0n, [
        Data.mkInt(42n),
        Data.mkList([Data.mkByte("deadbeef")]),
        Data.mkMap([
          { k: Data.mkByte("cafe"), v: Data.mkInt(123n) },
          { k: Data.mkByte("deadbeef"), v: Data.mkInt(123n) },
        ]),
      ]);

      const cbor = Data.encodeCBORUnsafe(nested);
      const deserialized = Data.decodeCBORUnsafe(cbor);

      // Deep equality check
      expect(Data.isEqual(nested, deserialized)).toBe(true);
    });

    it("should handle edge cases", () => {
      // Empty structures
      const emptyList = Data.mkList([]);
      expect(Data.decodeCBORUnsafe(Data.encodeCBORUnsafe(emptyList))).toEqual(
        emptyList,
      );

      const emptyMap = Data.mkMap([]);
      expect(Data.decodeCBORUnsafe(Data.encodeCBORUnsafe(emptyMap))).toEqual(
        emptyMap,
      );

      // Very large numbers
      const largeNumber = Data.mkInt(2n ** 100n);
      expect(Data.decodeCBORUnsafe(Data.encodeCBORUnsafe(largeNumber))).toEqual(
        largeNumber,
      );
    });
  });

  describe("Error Handling", () => {
    it("should handle invalid CBOR data", () => {
      expect(() => Data.decodeCBORUnsafe("invalid-cbor")).toThrow();
    });
  });
});

describe("TypeTaggedSchema", () => {
  describe("ByteArray Schema", () => {
    it("should encode/decode ByteArray", () => {
      const input = "deadbeef";
      const encoded = Data.encodeDataUnsafe(input, TSchema.ByteArray);
      const decoded = Data.decodeDataUnsafe(encoded, TSchema.ByteArray);

      expect(encoded).toEqual(Data.mkByte("deadbeef"));
      expect(decoded).toEqual("deadbeef");
    });

    it("should fail on invalid hex string", () => {
      expect(() =>
        Data.encodeDataUnsafe("not-hex", TSchema.ByteArray),
      ).toThrow();
    });
  });

  describe("Integer Schema", () => {
    it("should encode/decode Integer", () => {
      const input = 42n;
      const encoded = Data.encodeDataUnsafe(input, TSchema.Integer);
      const decoded = Data.decodeDataUnsafe(encoded, TSchema.Integer);

      expect(encoded).toEqual(Data.mkInt(42n));
      expect(decoded).toEqual(42n);
    });

    it("should fail on non-bigint", () => {
      expect(() =>
        //@ts-ignore
        Data.encodeDataUnsafe(42, TSchema.Integer),
      ).toThrow();
    });
  });

  describe("Boolean Schema", () => {
    it("should encode/decode true", () => {
      const input = true;
      const encoded = Data.encodeDataUnsafe(input, TSchema.Boolean);
      const decoded = Data.decodeDataUnsafe(encoded, TSchema.Boolean);

      expect(encoded).toEqual(Data.mkConstr(1n, []));
      expect(decoded).toEqual(true);
    });

    it("should encode/decode false", () => {
      const input = false;
      const encoded = Data.encodeDataUnsafe(input, TSchema.Boolean);
      const decoded = Data.decodeDataUnsafe(encoded, TSchema.Boolean);

      expect(encoded).toEqual(Data.mkConstr(0n, []));
      expect(decoded).toEqual(false);
    });

    it("should fail on invalid format", () => {
      const invalidInput = Data.mkConstr(0n, [Data.mkInt(1n)]);
      expect(() =>
        Data.decodeDataUnsafe(invalidInput, TSchema.Boolean),
      ).toThrow();
    });
  });

  describe("Literal Schema", () => {
    it("should encode/decode literals", () => {
      const Action = TSchema.Literal("mint", "burn", "transfer");

      const input = "mint";
      const encoded = Data.encodeDataUnsafe(input, Action);
      const decoded = Data.decodeDataUnsafe(encoded, Action);

      expect(encoded).toEqual(Data.mkConstr(0n, []));
      expect(decoded).toEqual("mint");

      const input2 = "burn";
      const encoded2 = Data.encodeDataUnsafe(input2, Action);
      const decoded2 = Data.decodeDataUnsafe(encoded2, Action);

      expect(encoded2).toEqual(Data.mkConstr(1n, []));
      expect(decoded2).toEqual("burn");
    });

    it("should fail on invalid literal", () => {
      const Action = TSchema.Literal("mint", "burn");
      expect(() =>
        //@ts-ignore
        Data.encodeDataUnsafe("invalid", Action),
      ).toThrow();
    });
  });

  describe("Array Schema", () => {
    it("should encode/decode arrays", () => {
      const IntArray = TSchema.Array(TSchema.Integer);

      const input = [1n, 2n, 3n];
      const encoded = Data.encodeDataUnsafe(input, IntArray);
      const decoded = Data.decodeDataUnsafe(encoded, IntArray);

      expect(encoded).toEqual(
        Data.mkList([Data.mkInt(1n), Data.mkInt(2n), Data.mkInt(3n)]),
      );
      expect(decoded).toEqual([1n, 2n, 3n]);
    });

    it("should handle empty arrays", () => {
      const IntArray = TSchema.Array(TSchema.Integer);

      const input: bigint[] = [];
      const encoded = Data.encodeDataUnsafe(input, IntArray);
      const decoded = Data.decodeDataUnsafe(encoded, IntArray);

      expect(encoded).toEqual(Data.mkList([]));
      expect(decoded).toEqual([]);
    });
  });

  describe("Map Schema", () => {
    it("should encode/decode maps", () => {
      const TokenMap = TSchema.Map(TSchema.ByteArray, TSchema.Integer);

      const input = new Map([
        ["deadbeef", 1n],
        ["cafe", 2n],
      ]);

      const encoded = Data.encodeDataUnsafe(input, TokenMap);
      const decoded = Data.decodeDataUnsafe(encoded, TokenMap);

      expect(encoded).toEqual(
        Data.mkMap([
          { k: Data.mkByte("deadbeef"), v: Data.mkInt(1n) },
          { k: Data.mkByte("cafe"), v: Data.mkInt(2n) },
        ]),
      );
      expect(decoded).toEqual(input);
    });

    it("should handle empty maps", () => {
      const TokenMap = TSchema.Map(TSchema.ByteArray, TSchema.Integer);

      const input = new Map();
      const encoded = Data.encodeDataUnsafe(input, TokenMap);
      const decoded = Data.decodeDataUnsafe(encoded, TokenMap);

      expect(encoded).toEqual(Data.mkMap([]));
      expect(decoded).toEqual(input);
    });
  });

  describe("Nullable Schema", () => {
    it("should encode/decode non-null values", () => {
      const MaybeInt = TSchema.NullOr(TSchema.Integer);

      const input = 42n;
      const encoded = Data.encodeDataUnsafe(input, MaybeInt);
      const decoded = Data.decodeDataUnsafe(encoded, MaybeInt);

      expect(encoded).toEqual(Data.mkConstr(0n, [Data.mkInt(42n)]));
      expect(decoded).toEqual(42n);
    });

    it("should encode/decode null values", () => {
      const MaybeInt = TSchema.NullOr(TSchema.Integer);

      const input = null;
      const encoded = Data.encodeDataUnsafe(input, MaybeInt);
      const decoded = Data.decodeDataUnsafe(encoded, MaybeInt);

      expect(encoded).toEqual(Data.mkConstr(1n, []));
      expect(decoded).toBeNull();
    });
  });

  describe("Struct Schema", () => {
    it("should encode/decode structs", () => {
      const Token = TSchema.Struct({
        policyId: TSchema.ByteArray,
        assetName: TSchema.ByteArray,
        amount: TSchema.Integer,
      });

      const input = {
        policyId: "deadbeef",
        assetName: "cafe",
        amount: 1000n,
      };

      const encoded = Data.encodeDataUnsafe(input, Token);
      const decoded = Data.decodeDataUnsafe(encoded, Token);
      const cbor = Data.encodeCBORUnsafe(encoded);

      expect(encoded).toEqual(
        Data.mkConstr(0n, [
          Data.mkByte("deadbeef"),
          Data.mkByte("cafe"),
          Data.mkInt(1000n),
        ]),
      );
      expect(decoded).toEqual(input);
      expect(cbor).toEqual("d8799f44deadbeef42cafe1903e8ff");
    });

    it("should handle nested structs", () => {
      const Asset = TSchema.Struct({
        policyId: TSchema.ByteArray,
        assetName: TSchema.ByteArray,
      });

      const Token = TSchema.Struct({
        asset: Asset,
        amount: TSchema.Integer,
      });

      const input = {
        asset: {
          policyId: "deadbeef",
          assetName: "cafe",
        },
        amount: 1000n,
      };

      const encoded = Data.encodeDataUnsafe(input, Token);
      const decoded = Data.decodeDataUnsafe(encoded, Token);

      const assetEncoded = Data.mkConstr(0n, [
        Data.mkByte("deadbeef"),
        Data.mkByte("cafe"),
      ]);

      expect(encoded).toEqual(
        Data.mkConstr(0n, [assetEncoded, Data.mkInt(1000n)]),
      );
      expect(decoded).toEqual(input);
    });
  });

  describe("Union Schema", () => {
    it("should encode/decode union types", () => {
      const MintRedeem = TSchema.Struct({
        policyId: TSchema.ByteArray,
        assetName: TSchema.ByteArray,
        amount: TSchema.Integer,
      });

      const SpendRedeem = TSchema.Struct({
        address: TSchema.ByteArray,
        amount: TSchema.Integer,
      });

      const RedeemAction = TSchema.Union(
        MintRedeem,
        SpendRedeem,
        TSchema.Integer,
      );

      // Test MintRedeem
      const mintInput = {
        policyId: "deadbeef",
        assetName: "cafe",
        amount: 1000n,
      };

      const mintEncoded = Data.encodeDataUnsafe(mintInput, RedeemAction);
      const mintDecoded = Data.decodeDataUnsafe(mintEncoded, RedeemAction);

      expect(mintEncoded.index).toBe(0n);
      expect(mintDecoded).toEqual(mintInput);

      // // Test SpendRedeem
      const spendInput = {
        address: "deadbeef",
        amount: 500n,
      };

      const spendEncoded = Data.encodeDataUnsafe(spendInput, RedeemAction);
      const spendDecoded = Data.decodeDataUnsafe(spendEncoded, RedeemAction);

      expect(spendEncoded.index).toBe(1n);
      expect(spendDecoded).toEqual(spendInput);

      // Test Integer
      const intInput = 42n;
      const intEncoded = Data.encodeDataUnsafe(intInput, RedeemAction);
      const intDecoded = Data.decodeDataUnsafe(intEncoded, RedeemAction);

      expect(intEncoded.index).toBe(2n);
      expect(intDecoded).toEqual(intInput);
    });
  });

  describe("Complex Schema Combinations", () => {
    it("should handle complex nested schemas", () => {
      const Asset = TSchema.Struct({
        policyId: TSchema.ByteArray,
        assetName: TSchema.ByteArray,
      });

      const TokenList = TSchema.Array(Asset);

      const Wallet = TSchema.Struct({
        owner: TSchema.ByteArray,
        tokens: TokenList,
        active: TSchema.Boolean,
        metadata: TSchema.NullOr(
          TSchema.Map(TSchema.ByteArray, TSchema.ByteArray),
        ),
      });

      const input = {
        owner: "deadbeef",
        tokens: [
          { policyId: "cafe01", assetName: "deadbeef01" },
          { policyId: "cafe02", assetName: "deadbeef02" },
        ],
        active: true,
        metadata: new Map([
          ["cafe01", "deadbeef"],
          ["cafe02", "deadbeef"],
        ]),
      };

      const encoded = Data.encodeDataUnsafe(input, Wallet);
      const decoded = Data.decodeDataUnsafe(encoded, Wallet);

      expect(decoded).toEqual(input);
    });
  });

  describe("Tuple Schema", () => {
    it("should encode/decode tuples", () => {
      const AssetPair = TSchema.Tuple([TSchema.ByteArray, TSchema.Integer]);

      const input = ["deadbeef", 1000n] as const;
      const encoded = Data.encodeDataUnsafe(input, AssetPair);
      const decoded = Data.decodeDataUnsafe(encoded, AssetPair);

      expect(encoded).toEqual(
        Data.mkList([Data.mkByte("deadbeef"), Data.mkInt(1000n)]),
      );
      expect(decoded).toEqual(input);
    });

    it("should handle heterogeneous tuples", () => {
      const Mixed = TSchema.Tuple([
        TSchema.ByteArray,
        TSchema.Integer,
        TSchema.Boolean,
      ]);

      const input = ["deadbeef", 1000n, true] as const;
      const encoded = Data.encodeDataUnsafe(input, Mixed);
      const decoded = Data.decodeDataUnsafe(encoded, Mixed);

      expect(decoded).toEqual(input);
    });
  });

  describe("Union Edge Cases", () => {
    it("should throw when decoding invalid constructor index", () => {
      const TestUnion = TSchema.Union(TSchema.Integer, TSchema.ByteArray);

      // Create a constructor with out-of-bounds index
      const invalidConstr = Data.mkConstr(
        10n, // This is beyond the union size
        [Data.mkInt(42n)],
      );

      expect(() =>
        Data.decodeDataUnsafe(invalidConstr, TestUnion),
      ).toThrowError();
    });
  });

  // Removed Transformations section here

  describe("Error Handling", () => {
    it("should provide helpful error messages for decoding failures", () => {
      const TestStruct = TSchema.Struct({
        field1: TSchema.Integer,
        field2: TSchema.ByteArray,
      });

      // Create invalid data where we expect a ByteArray but provide an Integer
      const invalidData = Data.mkConstr(0n, [
        Data.mkInt(42n),
        Data.mkInt(42n), // Should be ByteArray
      ]);

      // Using more idiomatic toThrow with error message pattern
      expect(() => Data.decodeDataUnsafe(invalidData, TestStruct)).toThrow(
        /field2/,
      );
    });

    it("should throw comprehensible errors for schema mismatches", () => {
      const StringSchema = TSchema.ByteArray;
      const IntegerData = Data.mkInt(42n);

      // Cleaner approach with specific error assertions
      expect(() => Data.decodeDataUnsafe(IntegerData, StringSchema)).toThrow();

      // Additional test for a different schema mismatch
      const BooleanData = Data.mkConstr(0n, []);
      expect(() =>
        Data.decodeDataUnsafe(BooleanData, TSchema.Integer),
      ).toThrow();
    });

    it("should provide specific error information for invalid data formats", () => {
      // Testing with invalid constructor indices
      const invalidConstr = Data.mkConstr(10n, []);

      expect(() =>
        Data.decodeDataUnsafe(invalidConstr, TSchema.Boolean),
      ).toThrow();
    });
  });
});
