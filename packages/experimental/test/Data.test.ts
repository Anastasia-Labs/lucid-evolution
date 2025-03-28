import { describe, expect, it } from "vitest";
import * as Data from "../src/Data.js";
import * as TypeTaggedSchema from "../src/TSchema.js";
import { Schema } from "effect";

/**
 * Tests for the core DataTagged module functionality -
 * focusing on basic data types, their construction and validation
 */
describe("DataTagged Module Tests", () => {
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
        const byteArray = Data.makeByteArray(input);
        expect(byteArray.value).toBe(input);
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
          expect(() => Data.makeByteArray(input)).toThrow();
        },
      );

      it("should validate bytearray with schema", () => {
        const byteArray = Data.makeByteArray("deadbeef");
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
        const integer = Data.makeInteger(input);
        expect(integer.value).toBe(input);
        expect(Data.isInteger(integer)).toBe(true);
      });

      it("should reject regular numbers", () => {
        // @ts-expect-error - Testing runtime validation
        expect(() => Data.makeInteger(42)).toThrow();
      });

      it("should validate integer with schema", () => {
        const integer = Data.makeInteger(42n);
        expect(Schema.is(Data.Integer)(integer)).toBe(true);
      });
    });

    describe("List", () => {
      it("should create empty list", () => {
        const list = Data.makeList([]);
        expect(list.value).toEqual([]);
        expect(Data.isList(list)).toBe(true);
      });

      it("should create homogeneous list of integers", () => {
        const integers = [
          Data.makeInteger(1n),
          Data.makeInteger(2n),
          Data.makeInteger(3n),
        ];
        const list = Data.makeList(integers);
        expect(list.value).toEqual(integers);
        expect(Data.isList(list)).toBe(true);
      });

      it("should create list of mixed types", () => {
        const items = [
          Data.makeInteger(1n),
          Data.makeByteArray("deadbeef"),
          Data.makeList([Data.makeInteger(2n)]),
        ];
        const list = Data.makeList(items);
        expect(list.value).toEqual(items);
        expect(Data.isList(list)).toBe(true);
      });

      it("should validate list with schema", () => {
        const list = Data.makeList([Data.makeInteger(1n)]);
        expect(Schema.is(Data.List)(list)).toBe(true);
      });
    });

    describe("Map", () => {
      it("should create empty map", () => {
        const map = Data.makeMap([]);
        expect(map.value).toEqual([]);
        expect(Data.isMap(map)).toBe(true);
      });

      it("should create map with entries", () => {
        const entries = [
          [Data.makeByteArray("deadbeef"), Data.makeInteger(42n)] as const,
        ] as const;
        const map = Data.makeMap(entries);
        expect(map.value).toEqual(entries);
        expect(Data.isMap(map)).toBe(true);
      });

      it("should handle nested maps", () => {
        const nestedMap = Data.makeMap([
          [Data.makeByteArray("cafe"), Data.makeInteger(43n)] as const,
        ] as const);

        const map = Data.makeMap([
          [Data.makeByteArray("deadbeef"), nestedMap] as const,
        ] as const);

        expect(map.value[0][1]).toEqual(nestedMap);
        expect(Data.isMap(map)).toBe(true);
      });

      it("should validate map with schema", () => {
        const map = Data.makeMap([
          [Data.makeByteArray("deadbeef"), Data.makeInteger(42n)] as const,
        ] as const);
        expect(Schema.is(Data.Map)(map)).toBe(true);
      });
    });

    describe("Constr", () => {
      it("should create empty constructor", () => {
        const constr = Data.makeConstr(0n, []);
        expect(constr.index).toBe(0n);
        expect(constr.fields).toEqual([]);
        expect(Data.isConstr(constr)).toBe(true);
      });

      it("should create constructor with fields", () => {
        const fields = [Data.makeInteger(42n), Data.makeByteArray("deadbeef")];
        const constr = Data.makeConstr(1n, fields);
        expect(constr.index).toBe(1n);
        expect(constr.fields).toEqual(fields);
        expect(Data.isConstr(constr)).toBe(true);
      });

      it("should handle nested constructors", () => {
        const nestedConstr = Data.makeConstr(1n, [
          Data.makeByteArray("deadbeef"),
        ]);

        const constr = Data.makeConstr(0n, [nestedConstr]);

        expect(constr.fields[0]).toEqual(nestedConstr);
        expect(Data.isConstr(constr)).toBe(true);
      });

      it("should reject non-bigint index", () => {
        expect(() =>
          // @ts-ignore
          Data.makeConstr({ index: 0, fields: [] }),
        ).toThrow();
      });

      it("should validate constructor with schema", () => {
        const constr = Data.makeConstr(0n, [Data.makeInteger(42n)]);
        expect(Schema.is(Data.Constr)(constr)).toBe(true);
      });
    });
  });

  describe("CBOR Serialization", () => {
    it("should serialize and deserialize ByteArray", () => {
      const byteArray = Data.makeByteArray("deadbeef");
      const cbor = Data.toCBOR(byteArray);
      const deserialized = Data.fromCBOR(cbor);
      expect(deserialized).toEqual(byteArray);
    });

    it("should serialize and deserialize Integer", () => {
      const integer = Data.makeInteger(42n);
      const cbor = Data.toCBOR(integer);
      const deserialized = Data.fromCBOR(cbor);
      expect(deserialized).toEqual(integer);
    });

    it("should serialize and deserialize nested structures", () => {
      const nested = Data.makeConstr(0n, [
        Data.makeInteger(42n),
        Data.makeList([Data.makeByteArray("deadbeef")]),
        Data.makeMap([
          [Data.makeByteArray("deadbeef"), Data.makeInteger(123n)],
        ]),
      ]);

      const cbor = Data.toCBOR(nested);
      const deserialized = Data.fromCBOR(cbor);

      // Deep equality check
      expect(Data.toJSON(deserialized)).toEqual(Data.toJSON(nested));
    });

    it("should handle edge cases", () => {
      // Empty structures
      const emptyList = Data.makeList([]);
      expect(Data.fromCBOR(Data.toCBOR(emptyList))).toEqual(emptyList);

      const emptyMap = Data.makeMap([]);
      expect(Data.fromCBOR(Data.toCBOR(emptyMap))).toEqual(emptyMap);

      // Very large numbers
      const largeNumber = Data.makeInteger(2n ** 100n);
      expect(Data.fromCBOR(Data.toCBOR(largeNumber))).toEqual(largeNumber);
    });
  });

  describe("Error Handling", () => {
    it("should handle invalid CBOR data", () => {
      expect(() => Data.fromCBOR("invalid-cbor")).toThrow();
    });
  });
});

describe("TypeTaggedSchema", () => {
  describe("ByteArray Schema", () => {
    it("should encode/decode ByteArray", () => {
      const input = "deadbeef";
      const encoded = Data.encodeData(input, TypeTaggedSchema.ByteArray);
      const decoded = Data.decodeData(encoded, TypeTaggedSchema.ByteArray);

      expect(encoded).toEqual(Data.makeByteArray("deadbeef"));
      expect(decoded).toEqual("deadbeef");
    });

    it("should fail on invalid hex string", () => {
      expect(() =>
        Data.encodeData("not-hex", TypeTaggedSchema.ByteArray),
      ).toThrow();
    });
  });

  describe("Integer Schema", () => {
    it("should encode/decode Integer", () => {
      const input = 42n;
      const encoded = Data.encodeData(input, TypeTaggedSchema.Integer);
      const decoded = Data.decodeData(encoded, TypeTaggedSchema.Integer);

      expect(encoded).toEqual(Data.makeInteger(42n));
      expect(decoded).toEqual(42n);
    });

    it("should fail on non-bigint", () => {
      expect(() =>
        //@ts-ignore
        Data.encodeData(42, TypeTaggedSchema.Integer),
      ).toThrow();
    });
  });

  describe("Boolean Schema", () => {
    it("should encode/decode true", () => {
      const input = true;
      const encoded = Data.encodeData(input, TypeTaggedSchema.Boolean);
      const decoded = Data.decodeData(encoded, TypeTaggedSchema.Boolean);

      expect(encoded).toEqual(Data.makeConstr(1n, []));
      expect(decoded).toEqual(true);
    });

    it("should encode/decode false", () => {
      const input = false;
      const encoded = Data.encodeData(input, TypeTaggedSchema.Boolean);
      const decoded = Data.decodeData(encoded, TypeTaggedSchema.Boolean);

      expect(encoded).toEqual(Data.makeConstr(0n, []));
      expect(decoded).toEqual(false);
    });

    it("should fail on invalid format", () => {
      const invalidInput = Data.makeConstr(0n, [Data.makeInteger(1n)]);
      expect(() =>
        Data.decodeData(invalidInput, TypeTaggedSchema.Boolean),
      ).toThrow();
    });
  });

  describe("Literal Schema", () => {
    it("should encode/decode literals", () => {
      const Action = TypeTaggedSchema.Literal("mint", "burn", "transfer");

      const input = "mint";
      const encoded = Data.encodeData(input, Action);
      const decoded = Data.decodeData(encoded, Action);

      expect(encoded).toEqual(Data.makeConstr(0n, []));
      expect(decoded).toEqual("mint");

      const input2 = "burn";
      const encoded2 = Data.encodeData(input2, Action);
      const decoded2 = Data.decodeData(encoded2, Action);

      expect(encoded2).toEqual(Data.makeConstr(1n, []));
      expect(decoded2).toEqual("burn");
    });

    it("should fail on invalid literal", () => {
      const Action = TypeTaggedSchema.Literal("mint", "burn");
      expect(() =>
        //@ts-ignore
        Data.encodeData("invalid", Action),
      ).toThrow();
    });
  });

  describe("Array Schema", () => {
    it("should encode/decode arrays", () => {
      const IntArray = TypeTaggedSchema.Array(TypeTaggedSchema.Integer);

      const input = [1n, 2n, 3n];
      const encoded = Data.encodeData(input, IntArray);
      const decoded = Data.decodeData(encoded, IntArray);

      expect(encoded).toEqual(
        Data.makeList([
          Data.makeInteger(1n),
          Data.makeInteger(2n),
          Data.makeInteger(3n),
        ]),
      );
      expect(decoded).toEqual([1n, 2n, 3n]);
    });

    it("should handle empty arrays", () => {
      const IntArray = TypeTaggedSchema.Array(TypeTaggedSchema.Integer);

      const input: bigint[] = [];
      const encoded = Data.encodeData(input, IntArray);
      const decoded = Data.decodeData(encoded, IntArray);

      expect(encoded).toEqual(Data.makeList([]));
      expect(decoded).toEqual([]);
    });
  });

  describe("Map Schema", () => {
    it("should encode/decode maps", () => {
      const TokenMap = TypeTaggedSchema.Map(
        TypeTaggedSchema.ByteArray,
        TypeTaggedSchema.Integer,
      );

      const input = new Map([
        ["deadbeef", 1n],
        ["cafe", 2n],
      ]);

      const encoded = Data.encodeData(input, TokenMap);
      const decoded = Data.decodeData(encoded, TokenMap);

      expect(encoded).toEqual(
        Data.makeMap([
          [Data.makeByteArray("deadbeef"), Data.makeInteger(1n)],
          [Data.makeByteArray("cafe"), Data.makeInteger(2n)],
        ]),
      );
      expect(decoded).toEqual(input);
    });

    it("should handle empty maps", () => {
      const TokenMap = TypeTaggedSchema.Map(
        TypeTaggedSchema.ByteArray,
        TypeTaggedSchema.Integer,
      );

      const input = new Map();
      const encoded = Data.encodeData(input, TokenMap);
      const decoded = Data.decodeData(encoded, TokenMap);

      expect(encoded).toEqual(Data.makeMap([]));
      expect(decoded).toEqual(input);
    });
  });

  describe("Nullable Schema", () => {
    it("should encode/decode non-null values", () => {
      const MaybeInt = TypeTaggedSchema.NullOr(TypeTaggedSchema.Integer);

      const input = 42n;
      const encoded = Data.encodeData(input, MaybeInt);
      const decoded = Data.decodeData(encoded, MaybeInt);

      expect(encoded).toEqual(Data.makeConstr(0n, [Data.makeInteger(42n)]));
      expect(decoded).toEqual(42n);
    });

    it("should encode/decode null values", () => {
      const MaybeInt = TypeTaggedSchema.NullOr(TypeTaggedSchema.Integer);

      const input = null;
      const encoded = Data.encodeData(input, MaybeInt);
      const decoded = Data.decodeData(encoded, MaybeInt);

      expect(encoded).toEqual(Data.makeConstr(1n, []));
      expect(decoded).toBeNull();
    });
  });

  describe("Struct Schema", () => {
    it("should encode/decode structs", () => {
      const Token = TypeTaggedSchema.Struct({
        policyId: TypeTaggedSchema.ByteArray,
        assetName: TypeTaggedSchema.ByteArray,
        amount: TypeTaggedSchema.Integer,
      });

      const input = {
        policyId: "deadbeef",
        assetName: "cafe",
        amount: 1000n,
      };

      const encoded = Data.encodeData(input, Token);
      const decoded = Data.decodeData(encoded, Token);

      expect(encoded).toEqual(
        Data.makeConstr(0n, [
          Data.makeByteArray("deadbeef"),
          Data.makeByteArray("cafe"),
          Data.makeInteger(1000n),
        ]),
      );
      expect(decoded).toEqual(input);
    });

    it("should handle nested structs", () => {
      const Asset = TypeTaggedSchema.Struct({
        policyId: TypeTaggedSchema.ByteArray,
        assetName: TypeTaggedSchema.ByteArray,
      });

      const Token = TypeTaggedSchema.Struct({
        asset: Asset,
        amount: TypeTaggedSchema.Integer,
      });

      const input = {
        asset: {
          policyId: "deadbeef",
          assetName: "cafe",
        },
        amount: 1000n,
      };

      const encoded = Data.encodeData(input, Token);
      const decoded = Data.decodeData(encoded, Token);

      const assetEncoded = Data.makeConstr(0n, [
        Data.makeByteArray("deadbeef"),
        Data.makeByteArray("cafe"),
      ]);

      expect(encoded).toEqual(
        Data.makeConstr(0n, [assetEncoded, Data.makeInteger(1000n)]),
      );
      expect(decoded).toEqual(input);
    });
  });

  describe("Union Schema", () => {
    it("should encode/decode union types", () => {
      const MintRedeem = TypeTaggedSchema.Struct({
        policyId: TypeTaggedSchema.ByteArray,
        assetName: TypeTaggedSchema.ByteArray,
        amount: TypeTaggedSchema.Integer,
      });

      const SpendRedeem = TypeTaggedSchema.Struct({
        address: TypeTaggedSchema.ByteArray,
        amount: TypeTaggedSchema.Integer,
      });

      const RedeemAction = TypeTaggedSchema.Union(
        MintRedeem,
        SpendRedeem,
        TypeTaggedSchema.Integer,
      );

      // Test MintRedeem
      const mintInput = {
        policyId: "deadbeef",
        assetName: "cafe",
        amount: 1000n,
      };

      const mintEncoded = Data.encodeData(mintInput, RedeemAction);
      const mintDecoded = Data.decodeData(mintEncoded, RedeemAction);

      expect(mintEncoded.index).toBe(0n);
      expect(mintDecoded).toEqual(mintInput);

      // // Test SpendRedeem
      const spendInput = {
        address: "deadbeef",
        amount: 500n,
      };

      const spendEncoded = Data.encodeData(spendInput, RedeemAction);
      const spendDecoded = Data.decodeData(spendEncoded, RedeemAction);

      expect(spendEncoded.index).toBe(1n);
      expect(spendDecoded).toEqual(spendInput);

      // Test Integer
      const intInput = 42n;
      const intEncoded = Data.encodeData(intInput, RedeemAction);
      const intDecoded = Data.decodeData(intEncoded, RedeemAction);

      expect(intEncoded.index).toBe(2n);
      expect(intDecoded).toEqual(intInput);
    });
  });

  describe("Complex Schema Combinations", () => {
    it("should handle complex nested schemas", () => {
      const Asset = TypeTaggedSchema.Struct({
        policyId: TypeTaggedSchema.ByteArray,
        assetName: TypeTaggedSchema.ByteArray,
      });

      const TokenList = TypeTaggedSchema.Array(Asset);

      const Wallet = TypeTaggedSchema.Struct({
        owner: TypeTaggedSchema.ByteArray,
        tokens: TokenList,
        active: TypeTaggedSchema.Boolean,
        metadata: TypeTaggedSchema.NullOr(
          TypeTaggedSchema.Map(
            TypeTaggedSchema.ByteArray,
            TypeTaggedSchema.ByteArray,
          ),
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
          ["cafe01", "deadbeef01"],
          ["cafe02", "deadbeef02"],
        ]),
      };

      const encoded = Data.encodeData(input, Wallet);
      const decoded = Data.decodeData(encoded, Wallet);

      expect(decoded).toEqual(input);
    });
  });

  describe("Tuple Schema", () => {
    it("should encode/decode tuples", () => {
      const AssetPair = TypeTaggedSchema.Tuple([
        TypeTaggedSchema.ByteArray,
        TypeTaggedSchema.Integer,
      ]);

      const input = ["deadbeef", 1000n] as const;
      const encoded = Data.encodeData(input, AssetPair);
      const decoded = Data.decodeData(encoded, AssetPair);

      expect(encoded).toEqual(
        Data.makeList([
          Data.makeByteArray("deadbeef"),
          Data.makeInteger(1000n),
        ]),
      );
      expect(decoded).toEqual(input);
    });

    it("should handle heterogeneous tuples", () => {
      const Mixed = TypeTaggedSchema.Tuple([
        TypeTaggedSchema.ByteArray,
        TypeTaggedSchema.Integer,
        TypeTaggedSchema.Boolean,
      ]);

      const input = ["deadbeef", 1000n, true] as const;
      const encoded = Data.encodeData(input, Mixed);
      const decoded = Data.decodeData(encoded, Mixed);

      expect(decoded).toEqual(input);
    });
  });

  describe("Union Edge Cases", () => {
    it("should throw when decoding invalid constructor index", () => {
      const TestUnion = TypeTaggedSchema.Union(
        TypeTaggedSchema.Integer,
        TypeTaggedSchema.ByteArray,
      );

      // Create a constructor with out-of-bounds index
      const invalidConstr = Data.makeConstr(
        10n, // This is beyond the union size
        [Data.makeInteger(42n)],
      );

      expect(() => Data.decodeData(invalidConstr, TestUnion)).toThrowError();
    });
  });

  // Removed Transformations section here

  describe("Error Handling", () => {
    it("should provide helpful error messages for decoding failures", () => {
      const TestStruct = TypeTaggedSchema.Struct({
        field1: TypeTaggedSchema.Integer,
        field2: TypeTaggedSchema.ByteArray,
      });

      // Create invalid data where we expect a ByteArray but provide an Integer
      const invalidData = Data.makeConstr(0n, [
        Data.makeInteger(42n),
        Data.makeInteger(42n), // Should be ByteArray
      ]);

      // Using more idiomatic toThrow with error message pattern
      expect(() => Data.decodeData(invalidData, TestStruct)).toThrow(/field2/);
    });

    it("should throw comprehensible errors for schema mismatches", () => {
      const StringSchema = TypeTaggedSchema.ByteArray;
      const IntegerData = Data.makeInteger(42n);

      // Cleaner approach with specific error assertions
      expect(() => Data.decodeData(IntegerData, StringSchema)).toThrow();

      // Additional test for a different schema mismatch
      const BooleanData = Data.makeConstr(0n, []);
      expect(() =>
        Data.decodeData(BooleanData, TypeTaggedSchema.Integer),
      ).toThrow();
    });

    it("should provide specific error information for invalid data formats", () => {
      // Testing with invalid constructor indices
      const invalidConstr = Data.makeConstr(10n, []);

      expect(() =>
        Data.decodeData(invalidConstr, TypeTaggedSchema.Boolean),
      ).toThrow();
    });
  });
});
