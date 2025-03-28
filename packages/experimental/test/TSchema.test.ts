import { describe, expect, it } from "vitest";
import * as DataTagged from "../src/Data.js";
import * as TypeTaggedSchema from "../src/TSchema.js";

/**
 * Tests for TypeTaggedSchema module functionality -
 * focusing on schema definition, encoding, and decoding
 */
describe("TypeTaggedSchema Tests", () => {
  describe("Basic Types", () => {
    describe("ByteArray Schema", () => {
      it("should encode/decode ByteArray", () => {
        const input = "deadbeef";
        const encoded = DataTagged.encodeData(
          input,
          TypeTaggedSchema.ByteArray,
        );
        const decoded = DataTagged.decodeData(
          encoded,
          TypeTaggedSchema.ByteArray,
        );

        expect(encoded).toEqual(
          DataTagged.ByteArray.make({ value: "deadbeef" }),
        );
        expect(decoded).toEqual("deadbeef");
      });

      it("should fail on invalid hex string", () => {
        expect(() =>
          DataTagged.encodeData("not-hex", TypeTaggedSchema.ByteArray),
        ).toThrow();
      });
    });

    describe("Integer Schema", () => {
      it("should encode/decode Integer", () => {
        const input = 42n;
        const encoded = DataTagged.encodeData(input, TypeTaggedSchema.Integer);
        const decoded = DataTagged.decodeData(
          encoded,
          TypeTaggedSchema.Integer,
        );

        expect(encoded).toEqual(DataTagged.Integer.make({ value: 42n }));
        expect(decoded).toEqual(42n);
      });

      it("should fail on non-bigint", () => {
        expect(() =>
          //@ts-ignore
          DataTagged.encodeData(42, TypeTaggedSchema.Integer),
        ).toThrow();
      });
    });

    describe("Boolean Schema", () => {
      it("should encode/decode true", () => {
        const input = true;
        const encoded = DataTagged.encodeData(input, TypeTaggedSchema.Boolean);
        const decoded = DataTagged.decodeData(
          encoded,
          TypeTaggedSchema.Boolean,
        );

        expect(encoded).toEqual(
          DataTagged.Constr.make({ index: 1n, fields: [] }),
        );
        expect(decoded).toEqual(true);
      });

      it("should encode/decode false", () => {
        const input = false;
        const encoded = DataTagged.encodeData(input, TypeTaggedSchema.Boolean);
        const decoded = DataTagged.decodeData(
          encoded,
          TypeTaggedSchema.Boolean,
        );

        expect(encoded).toEqual(
          DataTagged.Constr.make({ index: 0n, fields: [] }),
        );
        expect(decoded).toEqual(false);
      });

      it("should fail on invalid format", () => {
        const invalidInput = DataTagged.Constr.make({
          index: 0n,
          fields: [DataTagged.Integer.make({ value: 1n })],
        });
        expect(() =>
          DataTagged.decodeData(invalidInput, TypeTaggedSchema.Boolean),
        ).toThrow();
      });
    });
  });

  describe("Complex Types", () => {
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
          }),
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
          TypeTaggedSchema.Integer,
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
          }),
        );
        expect(decoded).toEqual(input);
      });

      it("should handle empty maps", () => {
        const TokenMap = TypeTaggedSchema.Map(
          TypeTaggedSchema.ByteArray,
          TypeTaggedSchema.Integer,
        );

        const input = new Map();
        const encoded = DataTagged.encodeData(input, TokenMap);
        const decoded = DataTagged.decodeData(encoded, TokenMap);

        expect(encoded).toEqual(DataTagged.Map.make({ value: [] }));
        expect(decoded).toEqual(input);
      });

      it("should deterministically encode Maps regardless of insertion order", () => {
        const TokenMap = TypeTaggedSchema.Map(
          TypeTaggedSchema.ByteArray,
          TypeTaggedSchema.Integer,
        );

        // Create two maps with same entries but different insertion order
        const map1 = new Map([
          ["deadbeef", 1n],
          ["cafe", 2n],
          ["babe", 3n],
        ]);

        const map2 = new Map([
          ["cafe", 2n],
          ["babe", 3n],
          ["deadbeef", 1n],
        ]);

        // Encode both maps
        const encoded1 = DataTagged.encodeData(map1, TokenMap);
        const encoded2 = DataTagged.encodeData(map2, TokenMap);

        // Convert to CBOR
        const cbor1 = DataTagged.toCBOR(encoded1);
        const cbor2 = DataTagged.toCBOR(encoded2);

        // The CBOR outputs should be identical if sorting is working correctly
        expect(cbor1).toEqual(cbor2);
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
          }),
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
          }),
        );
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
          }),
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

    describe("Nullable Schema", () => {
      it("should encode/decode non-null values", () => {
        const MaybeInt = TypeTaggedSchema.NullOr(TypeTaggedSchema.Integer);

        const input = 42n;
        const encoded = DataTagged.encodeData(input, MaybeInt);
        const decoded = DataTagged.decodeData(encoded, MaybeInt);

        expect(encoded).toEqual(
          DataTagged.Constr.make({
            index: 0n,
            fields: [DataTagged.Integer.make({ value: 42n })],
          }),
        );
        expect(decoded).toEqual(42n);
      });

      it("should encode/decode null values", () => {
        const MaybeInt = TypeTaggedSchema.NullOr(TypeTaggedSchema.Integer);

        const input = null;
        const encoded = DataTagged.encodeData(input, MaybeInt);
        const decoded = DataTagged.decodeData(encoded, MaybeInt);

        expect(encoded).toEqual(
          DataTagged.Constr.make({ index: 1n, fields: [] }),
        );
        expect(decoded).toBeNull();
      });
    });

    describe("Literal Schema", () => {
      it("should encode/decode literals", () => {
        const Action = TypeTaggedSchema.Literal("mint", "burn", "transfer");

        const input = "mint";
        const encoded = DataTagged.encodeData(input, Action);
        const decoded = DataTagged.decodeData(encoded, Action);

        expect(encoded).toEqual(
          DataTagged.Constr.make({ index: 0n, fields: [] }),
        );
        expect(decoded).toEqual("mint");

        const input2 = "burn";
        const encoded2 = DataTagged.encodeData(input2, Action);
        const decoded2 = DataTagged.decodeData(encoded2, Action);

        expect(encoded2).toEqual(
          DataTagged.Constr.make({ index: 1n, fields: [] }),
        );
        expect(decoded2).toEqual("burn");
      });

      it("should fail on invalid literal", () => {
        const Action = TypeTaggedSchema.Literal("mint", "burn");
        expect(() =>
          //@ts-ignore
          DataTagged.encodeData("invalid", Action),
        ).toThrow();
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

        const mintEncoded = DataTagged.encodeData(mintInput, RedeemAction);
        const mintDecoded = DataTagged.decodeData(mintEncoded, RedeemAction);

        expect(mintEncoded.index).toBe(0n);
        expect(mintDecoded).toEqual(mintInput);

        // Test SpendRedeem
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

      it("should throw when decoding invalid constructor index", () => {
        const TestUnion = TypeTaggedSchema.Union(
          TypeTaggedSchema.Integer,
          TypeTaggedSchema.ByteArray,
        );

        // Create a constructor with out-of-bounds index
        const invalidConstr = DataTagged.Constr.make({
          index: 10n, // This is beyond the union size
          fields: [DataTagged.Integer.make({ value: 42n })],
        });

        expect(() =>
          DataTagged.decodeData(invalidConstr, TestUnion),
        ).toThrowError();
      });
    });
  });

  describe("Complex Combinations", () => {
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

      const encoded = DataTagged.encodeData(input, Wallet);
      const decoded = DataTagged.decodeData(encoded, Wallet);

      expect(decoded).toEqual(input);
    });
  });

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

      expect(() => DataTagged.decodeData(invalidData, TestStruct)).toThrow(
        /field2/,
      );
    });

    it("should throw comprehensible errors for schema mismatches", () => {
      const StringSchema = TypeTaggedSchema.ByteArray;
      const IntegerData = DataTagged.Integer.make({ value: 42n });

      expect(() => DataTagged.decodeData(IntegerData, StringSchema)).toThrow();

      const BooleanData = DataTagged.Constr.make({ index: 0n, fields: [] });
      expect(() =>
        DataTagged.decodeData(BooleanData, TypeTaggedSchema.Integer),
      ).toThrow();
    });
  });
});
