import { describe, expect, it } from "vitest";
import * as Data from "../src/Data.js";
import * as TSchema from "../src/TSchema.js";

/**
 * Tests for TypeTaggedSchema module functionality -
 * focusing on schema definition, encoding, and decoding
 */
describe("TypeTaggedSchema Tests", () => {
  describe("Basic Types", () => {
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
  });

  describe("Complex Types", () => {
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
            {
              k: Data.mkByte("deadbeef"),
              v: Data.mkInt(1n),
            },
            {
              k: Data.mkByte("cafe"),
              v: Data.mkInt(2n),
            },
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

      it("should deterministically encode Maps regardless of insertion order", () => {
        const TokenMap = TSchema.Map(TSchema.ByteArray, TSchema.Integer);

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
        const encoded1 = Data.encodeDataUnsafe(map1, TokenMap);
        const encoded2 = Data.encodeDataUnsafe(map2, TokenMap);

        // Convert to CBOR
        const cbor1 = Data.encodeCBORUnsafe(encoded1);
        const cbor2 = Data.encodeCBORUnsafe(encoded2);

        // The CBOR outputs should be identical if sorting is working correctly
        expect(cbor1).toEqual(cbor2);
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

        expect(encoded).toEqual(
          Data.mkConstr(0n, [
            Data.mkByte("deadbeef"),
            Data.mkByte("cafe"),
            Data.mkInt(1000n),
          ]),
        );

        expect(decoded).toEqual(input);
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

        // Test SpendRedeem
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
  });

  describe("Complex Combinations", () => {
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
          ["cafe01", "deadbeef01"],
          ["cafe02", "deadbeef02"],
        ]),
      };

      const encoded = Data.encodeDataUnsafe(input, Wallet);
      const decoded = Data.decodeDataUnsafe(encoded, Wallet);

      expect(decoded).toEqual(input);
    });
  });

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

      expect(() => Data.decodeDataUnsafe(invalidData, TestStruct)).toThrow(
        /field2/,
      );
    });

    it("should throw comprehensible errors for schema mismatches", () => {
      const StringSchema = TSchema.ByteArray;
      const IntegerData = Data.mkInt(42n);

      expect(() => Data.decodeDataUnsafe(IntegerData, StringSchema)).toThrow();

      const BooleanData = Data.mkConstr(0n, []);
      expect(() =>
        Data.decodeDataUnsafe(BooleanData, TSchema.Integer),
      ).toThrow();
    });
  });
});
