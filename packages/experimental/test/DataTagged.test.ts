import { describe, expect, it } from "vitest";
import * as DataTagged from "../src/DataTagged.js";
import * as TypeTaggedSchema from "../src/TypeTaggedSchema.js";
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
        const byteArray = DataTagged.ByteArray.make({ value: input });
        expect(byteArray.value).toBe(input);
        expect(DataTagged.isByteArray(byteArray)).toBe(true);
      });

      const invalidHexCases = [
        "not-hex",
        "xyz",
        "123g",
        "deadbeef ",
        " deadbeef",
        "0x123456",
        "",
      ];

      it.each(invalidHexCases)(
        "should throw on invalid hex string: %s",
        (input) => {
          expect(() => DataTagged.ByteArray.make({ value: input })).toThrow();
        }
      );

      it("should validate bytearray with schema", () => {
        const byteArray = DataTagged.ByteArray.make({ value: "deadbeef" });
        expect(Schema.is(DataTagged.ByteArray)(byteArray)).toBe(true);
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
        const integer = DataTagged.Integer.make({ value: input });
        expect(integer.value).toBe(input);
        expect(DataTagged.isInteger(integer)).toBe(true);
      });

      it("should reject regular numbers", () => {
        // @ts-expect-error - Testing runtime validation
        expect(() => DataTagged.Integer.make({ value: 42 })).toThrow();
      });

      it("should validate integer with schema", () => {
        const integer = DataTagged.Integer.make({ value: 42n });
        expect(Schema.is(DataTagged.Integer)(integer)).toBe(true);
      });
    });

    describe("List", () => {
      it("should create empty list", () => {
        const list = DataTagged.List.make({ value: [] });
        expect(list.value).toEqual([]);
        expect(DataTagged.isList(list)).toBe(true);
      });

      it("should create homogeneous list of integers", () => {
        const integers = [
          DataTagged.Integer.make({ value: 1n }),
          DataTagged.Integer.make({ value: 2n }),
          DataTagged.Integer.make({ value: 3n }),
        ];
        const list = DataTagged.List.make({ value: integers });
        expect(list.value).toEqual(integers);
        expect(DataTagged.isList(list)).toBe(true);
      });

      it("should create list of mixed types", () => {
        const items = [
          DataTagged.Integer.make({ value: 1n }),
          DataTagged.ByteArray.make({ value: "deadbeef" }),
          DataTagged.List.make({
            value: [DataTagged.Integer.make({ value: 2n })],
          }),
        ];
        const list = DataTagged.List.make({ value: items });
        expect(list.value).toEqual(items);
        expect(DataTagged.isList(list)).toBe(true);
      });

      it("should validate list with schema", () => {
        const list = DataTagged.List.make({
          value: [DataTagged.Integer.make({ value: 1n })],
        });
        expect(Schema.is(DataTagged.List)(list)).toBe(true);
      });
    });

    describe("Map", () => {
      it("should create empty map", () => {
        const map = DataTagged.Map.make({ value: [] });
        expect(map.value).toEqual([]);
        expect(DataTagged.isMap(map)).toBe(true);
      });

      it("should create map with entries", () => {
        const entries = [
          [
            DataTagged.ByteArray.make({ value: "deadbeef" }),
            DataTagged.Integer.make({ value: 42n }),
          ] as const,
        ] as const;
        const map = DataTagged.Map.make({ value: entries });
        expect(map.value).toEqual(entries);
        expect(DataTagged.isMap(map)).toBe(true);
      });

      it("should handle nested maps", () => {
        const nestedMap = DataTagged.Map.make({
          value: [
            [
              DataTagged.ByteArray.make({ value: "cafe" }),
              DataTagged.Integer.make({ value: 43n }),
            ] as const,
          ] as const,
        });

        const map = DataTagged.Map.make({
          value: [
            [
              DataTagged.ByteArray.make({ value: "deadbeef" }),
              nestedMap,
            ] as const,
          ] as const,
        });

        expect(map.value[0][1]).toEqual(nestedMap);
        expect(DataTagged.isMap(map)).toBe(true);
      });

      it("should validate map with schema", () => {
        const map = DataTagged.Map.make({
          value: [
            [
              DataTagged.ByteArray.make({ value: "deadbeef" }),
              DataTagged.Integer.make({ value: 42n }),
            ] as const,
          ] as const,
        });
        expect(Schema.is(DataTagged.Map)(map)).toBe(true);
      });
    });

    describe("Constr", () => {
      it("should create empty constructor", () => {
        const constr = DataTagged.Constr.make({ index: 0n, fields: [] });
        expect(constr.index).toBe(0n);
        expect(constr.fields).toEqual([]);
        expect(DataTagged.isConstr(constr)).toBe(true);
      });

      it("should create constructor with fields", () => {
        const fields = [
          DataTagged.Integer.make({ value: 42n }),
          DataTagged.ByteArray.make({ value: "deadbeef" }),
        ];
        const constr = DataTagged.Constr.make({ index: 1n, fields });
        expect(constr.index).toBe(1n);
        expect(constr.fields).toEqual(fields);
        expect(DataTagged.isConstr(constr)).toBe(true);
      });

      it("should handle nested constructors", () => {
        const nestedConstr = DataTagged.Constr.make({
          index: 1n,
          fields: [DataTagged.ByteArray.make({ value: "deadbeef" })],
        });

        const constr = DataTagged.Constr.make({
          index: 0n,
          fields: [nestedConstr],
        });

        expect(constr.fields[0]).toEqual(nestedConstr);
        expect(DataTagged.isConstr(constr)).toBe(true);
      });

      it("should reject non-bigint index", () => {
        expect(() =>
          // @ts-ignore
          DataTagged.Constr.make({ index: 0, fields: [] })
        ).toThrow();
      });

      it("should validate constructor with schema", () => {
        const constr = DataTagged.Constr.make({
          index: 0n,
          fields: [DataTagged.Integer.make({ value: 42n })],
        });
        expect(Schema.is(DataTagged.Constr)(constr)).toBe(true);
      });
    });
  });

  describe("CBOR Serialization", () => {
    it("should serialize and deserialize ByteArray", () => {
      const byteArray = DataTagged.ByteArray.make({ value: "deadbeef" });
      const cbor = DataTagged.toCBOR(byteArray);
      const deserialized = DataTagged.fromCBOR(cbor);
      expect(deserialized).toEqual(byteArray);
    });

    it("should serialize and deserialize Integer", () => {
      const integer = DataTagged.Integer.make({ value: 42n });
      const cbor = DataTagged.toCBOR(integer);
      const deserialized = DataTagged.fromCBOR(cbor);
      expect(deserialized).toEqual(integer);
    });

    it("should serialize and deserialize nested structures", () => {
      const nested = DataTagged.Constr.make({
        index: 0n,
        fields: [
          DataTagged.Integer.make({ value: 42n }),
          DataTagged.List.make({
            value: [DataTagged.ByteArray.make({ value: "deadbeef" })],
          }),
          DataTagged.Map.make({
            value: [
              [
                DataTagged.ByteArray.make({ value: "key" }),
                DataTagged.Integer.make({ value: 123n }),
              ] as const,
            ] as const,
          }),
        ],
      });

      const cbor = DataTagged.toCBOR(nested);
      const deserialized = DataTagged.fromCBOR(cbor);
      
      // Deep equality check
      expect(JSON.stringify(deserialized)).toEqual(JSON.stringify(nested));
    });

    it("should handle edge cases", () => {
      // Empty structures
      const emptyList = DataTagged.List.make({ value: [] });
      expect(DataTagged.fromCBOR(DataTagged.toCBOR(emptyList))).toEqual(emptyList);

      const emptyMap = DataTagged.Map.make({ value: [] });
      expect(DataTagged.fromCBOR(DataTagged.toCBOR(emptyMap))).toEqual(emptyMap);

      // Very large numbers
      const largeNumber = DataTagged.Integer.make({ value: 2n ** 100n });
      expect(DataTagged.fromCBOR(DataTagged.toCBOR(largeNumber))).toEqual(largeNumber);
    });
  });

  describe("Error Handling", () => {
    it("should handle invalid CBOR data", () => {
      expect(() => DataTagged.fromCBOR("invalid-cbor")).toThrow();
    });
  });
});

describe("TypeTaggedSchema", () => {
  describe("ByteArray Schema", () => {
    it("should encode/decode ByteArray", () => {
      const input = "deadbeef";
      const encoded = DataTagged.encodeData(
        input,
        TypeTaggedSchema.ByteArray
      );
      const decoded = DataTagged.decodeData(
        encoded,
        TypeTaggedSchema.ByteArray
      );

      expect(encoded).toEqual(
        DataTagged.ByteArray.make({ value: "deadbeef" })
      );
      expect(decoded).toEqual("deadbeef");
    });

    it("should fail on invalid hex string", () => {
      expect(() =>
        DataTagged.encodeData("not-hex", TypeTaggedSchema.ByteArray)
      ).toThrow();
    });
  });

  describe("Integer Schema", () => {
    it("should encode/decode Integer", () => {
      const input = 42n;
      const encoded = DataTagged.encodeData(input, TypeTaggedSchema.Integer);
      const decoded = DataTagged.decodeData(
        encoded,
        TypeTaggedSchema.Integer
      );

      expect(encoded).toEqual(DataTagged.Integer.make({ value: 42n }));
      expect(decoded).toEqual(42n);
    });

    it("should fail on non-bigint", () => {
      expect(() =>
        //@ts-ignore
        DataTagged.encodeData(42, TypeTaggedSchema.Integer)
      ).toThrow();
    });
  });

  describe("Boolean Schema", () => {
    it("should encode/decode true", () => {
      const input = true;
      const encoded = DataTagged.encodeData(input, TypeTaggedSchema.Boolean);
      const decoded = DataTagged.decodeData(
        encoded,
        TypeTaggedSchema.Boolean
      );

      expect(encoded).toEqual(
        DataTagged.Constr.make({ index: 1n, fields: [] })
      );
      expect(decoded).toEqual(true);
    });

    it("should encode/decode false", () => {
      const input = false;
      const encoded = DataTagged.encodeData(input, TypeTaggedSchema.Boolean);
      const decoded = DataTagged.decodeData(
        encoded,
        TypeTaggedSchema.Boolean
      );

      expect(encoded).toEqual(
        DataTagged.Constr.make({ index: 0n, fields: [] })
      );
      expect(decoded).toEqual(false);
    });

    it("should fail on invalid format", () => {
      const invalidInput = DataTagged.Constr.make({
        index: 0n,
        fields: [DataTagged.Integer.make({ value: 1n })],
      });
      expect(() =>
        DataTagged.decodeData(invalidInput, TypeTaggedSchema.Boolean)
      ).toThrow();
    });
  });

  describe("Literal Schema", () => {
    it("should encode/decode literals", () => {
      const Action = TypeTaggedSchema.Literal("mint", "burn", "transfer");

      const input = "mint";
      const encoded = DataTagged.encodeData(input, Action);
      const decoded = DataTagged.decodeData(encoded, Action);

      expect(encoded).toEqual(
        DataTagged.Constr.make({ index: 0n, fields: [] })
      );
      expect(decoded).toEqual("mint");

      const input2 = "burn";
      const encoded2 = DataTagged.encodeData(input2, Action);
      const decoded2 = DataTagged.decodeData(encoded2, Action);

      expect(encoded2).toEqual(
        DataTagged.Constr.make({ index: 1n, fields: [] })
      );
      expect(decoded2).toEqual("burn");
    });

    it("should fail on invalid literal", () => {
      const Action = TypeTaggedSchema.Literal("mint", "burn");
      expect(() =>
        //@ts-ignore
        DataTagged.encodeData("invalid", Action)
      ).toThrow();
    });
  });

  describe("Array Schema", () => {
    it("should encode/decode arrays", () => {
      const IntArray = TypeTaggedSchema.Array(TypeTaggedSchema.Integer);

      const input = [1n, 2n, 3n];
      const encoded = DataTagged.encodeData(input, IntArray);
      const decoded = DataTagged.decodeData(encoded, IntArray);

      expect(encoded).toEqual(
        DataTagged.List.make({
          value: [
            DataTagged.Integer.make({ value: 1n }),
            DataTagged.Integer.make({ value: 2n }),
            DataTagged.Integer.make({ value: 3n }),
          ],
        })
      );
      expect(decoded).toEqual([1n, 2n, 3n]);
    });

    it("should handle empty arrays", () => {
      const IntArray = TypeTaggedSchema.Array(TypeTaggedSchema.Integer);

      const input: bigint[] = [];
      const encoded = DataTagged.encodeData(input, IntArray);
      const decoded = DataTagged.decodeData(encoded, IntArray);

      expect(encoded).toEqual(DataTagged.List.make({ value: [] }));
      expect(decoded).toEqual([]);
    });
  });

  describe("Map Schema", () => {
    it("should encode/decode maps", () => {
      const TokenMap = TypeTaggedSchema.Map(
        TypeTaggedSchema.ByteArray,
        TypeTaggedSchema.Integer
      );

      const input = new Map([
        ["deadbeef", 1n],
        ["cafe", 2n],
      ]);

      const encoded = DataTagged.encodeData(input, TokenMap);
      const decoded = DataTagged.decodeData(encoded, TokenMap);

      expect(encoded).toEqual(
        DataTagged.Map.make({
          value: [
            [
              DataTagged.ByteArray.make({ value: "deadbeef" }),
              DataTagged.Integer.make({ value: 1n }),
            ],
            [
              DataTagged.ByteArray.make({ value: "cafe" }),
              DataTagged.Integer.make({ value: 2n }),
            ],
          ],
        })
      );
      expect(decoded).toEqual(input);
    });

    it("should handle empty maps", () => {
      const TokenMap = TypeTaggedSchema.Map(
        TypeTaggedSchema.ByteArray,
        TypeTaggedSchema.Integer
      );

      const input = new Map();
      const encoded = DataTagged.encodeData(input, TokenMap);
      const decoded = DataTagged.decodeData(encoded, TokenMap);

      expect(encoded).toEqual(DataTagged.Map.make({ value: [] }));
      expect(decoded).toEqual(input);
    });
  });

  describe("Nullable Schema", () => {
    it("should encode/decode non-null values", () => {
      const MaybeInt = TypeTaggedSchema.Nullable(TypeTaggedSchema.Integer);

      const input = 42n;
      const encoded = DataTagged.encodeData(input, MaybeInt);
      const decoded = DataTagged.decodeData(encoded, MaybeInt);

      expect(encoded).toEqual(
        DataTagged.Constr.make({
          index: 0n,
          fields: [DataTagged.Integer.make({ value: 42n })],
        })
      );
      expect(decoded).toEqual(42n);
    });

    it("should encode/decode null values", () => {
      const MaybeInt = TypeTaggedSchema.Nullable(TypeTaggedSchema.Integer);

      const input = null;
      const encoded = DataTagged.encodeData(input, MaybeInt);
      const decoded = DataTagged.decodeData(encoded, MaybeInt);

      expect(encoded).toEqual(
        DataTagged.Constr.make({ index: 1n, fields: [] })
      );
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

      const encoded = DataTagged.encodeData(input, Token);
      const decoded = DataTagged.decodeData(encoded, Token);

      expect(encoded).toEqual(
        DataTagged.Constr.make({
          index: 0n,
          fields: [
            DataTagged.ByteArray.make({ value: "deadbeef" }),
            DataTagged.ByteArray.make({ value: "cafe" }),
            DataTagged.Integer.make({ value: 1000n }),
          ],
        })
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

      const encoded = DataTagged.encodeData(input, Token);
      const decoded = DataTagged.decodeData(encoded, Token);

      const assetEncoded = DataTagged.Constr.make({
        index: 0n,
        fields: [
          DataTagged.ByteArray.make({ value: "deadbeef" }),
          DataTagged.ByteArray.make({ value: "cafe" }),
        ],
      });

      expect(encoded).toEqual(
        DataTagged.Constr.make({
          index: 0n,
          fields: [assetEncoded, DataTagged.Integer.make({ value: 1000n })],
        })
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
        TypeTaggedSchema.Integer
      );

      // Test MintRedeem
      const mintInput = {
        policyId: "deadbeef",
        assetName: "cafe",
        amount: 1000n,
      };

      const mintEncoded = DataTagged.encodeData(mintInput, RedeemAction);
      const mintDecoded = DataTagged.decodeData(mintEncoded, RedeemAction);

      expect(mintEncoded.index).toBe(0n);
      expect(mintDecoded).toEqual(mintInput);

      // // Test SpendRedeem
      const spendInput = {
        address: "deadbeef",
        amount: 500n,
      };

      const spendEncoded = DataTagged.encodeData(spendInput, RedeemAction);
      const spendDecoded = DataTagged.decodeData(spendEncoded, RedeemAction);

      expect(spendEncoded.index).toBe(1n);
      expect(spendDecoded).toEqual(spendInput);

      // Test Integer
      const intInput = 42n;
      const intEncoded = DataTagged.encodeData(intInput, RedeemAction);
      const intDecoded = DataTagged.decodeData(intEncoded, RedeemAction);

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
        metadata: TypeTaggedSchema.Nullable(
          TypeTaggedSchema.Map(
            TypeTaggedSchema.ByteArray,
            TypeTaggedSchema.ByteArray
          )
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

      const encoded = DataTagged.encodeData(input, Wallet);
      const decoded = DataTagged.decodeData(encoded, Wallet);

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
      const encoded = DataTagged.encodeData(input, AssetPair);
      const decoded = DataTagged.decodeData(encoded, AssetPair);

      expect(encoded).toEqual(
        DataTagged.List.make({
          value: [
            DataTagged.ByteArray.make({ value: "deadbeef" }),
            DataTagged.Integer.make({ value: 1000n }),
          ],
        })
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
      const encoded = DataTagged.encodeData(input, Mixed);
      const decoded = DataTagged.decodeData(encoded, Mixed);

      expect(decoded).toEqual(input);
    });
  });

  describe("Union Edge Cases", () => {
    it("should throw when decoding invalid constructor index", () => {
      const TestUnion = TypeTaggedSchema.Union(
        TypeTaggedSchema.Integer,
        TypeTaggedSchema.ByteArray
      );

      // Create a constructor with out-of-bounds index
      const invalidConstr = DataTagged.Constr.make({
        index: 10n, // This is beyond the union size
        fields: [DataTagged.Integer.make({ value: 42n })],
      });

      expect(() =>
        DataTagged.decodeData(invalidConstr, TestUnion)
      ).toThrowError();
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
      const invalidData = DataTagged.Constr.make({
        index: 0n,
        fields: [
          DataTagged.Integer.make({ value: 42n }),
          DataTagged.Integer.make({ value: 42n }), // Should be ByteArray
        ],
      });

      // Using more idiomatic toThrow with error message pattern
      expect(() => DataTagged.decodeData(invalidData, TestStruct)).toThrow(
        /field2/
      );
    });

    it("should throw comprehensible errors for schema mismatches", () => {
      const StringSchema = TypeTaggedSchema.ByteArray;
      const IntegerData = DataTagged.Integer.make({ value: 42n });

      // Cleaner approach with specific error assertions
      expect(() =>
        DataTagged.decodeData(IntegerData, StringSchema)
      ).toThrow();

      // Additional test for a different schema mismatch
      const BooleanData = DataTagged.Constr.make({ index: 0n, fields: [] });
      expect(() =>
        DataTagged.decodeData(BooleanData, TypeTaggedSchema.Integer)
      ).toThrow();
    });

    it("should provide specific error information for invalid data formats", () => {
      // Testing with invalid constructor indices
      const invalidConstr = DataTagged.Constr.make({
        index: 10n,
        fields: [],
      });

      expect(() =>
        DataTagged.decodeData(invalidConstr, TypeTaggedSchema.Boolean)
      ).toThrow();
    });
  });
});
