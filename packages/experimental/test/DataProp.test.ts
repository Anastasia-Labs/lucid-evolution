import { describe, expect, it } from "vitest";
import * as Data from "../src/Data.js";
import * as TSchema from "../src/TSchema.js";
import { Arbitrary, FastCheck } from "effect";

/**
 * Property-based testing for Data and TypeTaggedSchema
 * focusing on roundtrip serialization properties for all data types
 */
describe("Data Property Tests", () => {
  describe("Data Core Types", () => {
    describe("Schema-Based Arbitrary Generation", () => {
      it("should generate valid ByteArray data and roundtrip", () => {
        FastCheck.assert(
          FastCheck.property(Data.genByteArray(), (value) => {
            const cbor = Data.encodeCBORUnsafe(value);
            const decoded = Data.decodeCBORUnsafe(cbor);
            expect(Data.isByteArray(value)).toBe(true);
            expect(value).toEqual(decoded);
          }),
        );
      });

      it("should generate valid Integer data and roundtrip", () => {
        FastCheck.assert(
          FastCheck.property(Data.genInteger(), (value) => {
            const cbor = Data.encodeCBORUnsafe(value);
            const decoded = Data.decodeCBORUnsafe(cbor);
            expect(Data.isInteger(value)).toBe(true);
            expect(value).toEqual(decoded);
          }),
        );
      });

      it("should generate valid Constr data and roundtrip", () => {
        // Limit runs for complex structures
        FastCheck.assert(
          FastCheck.property(Data.genConstr(2), (value) => {
            const cbor = Data.encodeCBORUnsafe(value);
            const decoded = Data.decodeCBORUnsafe(cbor);
            expect(Data.isConstr(value)).toBe(true);
            expect(value).toStrictEqual(decoded);
          }),
        );
      });

      it("should generate valid List data and roundtrip", () => {
        FastCheck.assert(
          FastCheck.property(Data.genList(2), (value) => {
            const cbor = Data.encodeCBORUnsafe(value);
            const decoded = Data.decodeCBORUnsafe(cbor);
            expect(Data.isList(value)).toBe(true);
            expect(value).toEqual(decoded);
          }),
        );
      });

      it("should generate valid Map data and roundtrip", () => {
        FastCheck.assert(
          FastCheck.property(Data.genMap(2), (value) => {
            const cbor = Data.encodeCBORUnsafe(value);
            const decoded = Data.decodeCBORUnsafe(cbor);
            expect(Data.isMap(value)).toBe(true);
            expect(value).toEqual(decoded);
          }),
        );
      });
    });
  });

  describe("TypeTaggedSchema Property Tests", () => {
    describe("Basic Schema Roundtrips", () => {
      it("should maintain ByteArray through roundtrip", () => {
        const byteArrayArb = Arbitrary.make(TSchema.ByteArray);

        FastCheck.assert(
          FastCheck.property(byteArrayArb, (value) => {
            const encoded = Data.encodeDataUnsafe(value, TSchema.ByteArray);
            const decoded = Data.decodeDataUnsafe(encoded, TSchema.ByteArray);
            expect(decoded).toEqual(value);
          }),
        );
      });

      it("should maintain Integer through roundtrip", () => {
        const integerArb = Arbitrary.make(TSchema.Integer);

        FastCheck.assert(
          FastCheck.property(integerArb, (value) => {
            const encoded = Data.encodeDataUnsafe(value, TSchema.Integer);
            const decoded = Data.decodeDataUnsafe(encoded, TSchema.Integer);
            expect(decoded).toEqual(value);
          }),
        );
      });

      it("should maintain Boolean through roundtrip", () => {
        const booleanArb = Arbitrary.make(TSchema.Boolean);

        FastCheck.assert(
          FastCheck.property(booleanArb, (value) => {
            const encoded = Data.encodeDataUnsafe(value, TSchema.Boolean);
            const decoded = Data.decodeDataUnsafe(encoded, TSchema.Boolean);
            expect(decoded).toEqual(value);
          }),
        );
      });
    });

    describe("Struct Schema", () => {
      it("should maintain struct data through roundtrip", () => {
        // Define a simple struct schema
        const Token = TSchema.Struct({
          policyId: TSchema.ByteArray,
          assetName: TSchema.ByteArray,
          amount: TSchema.Integer,
        });

        // Create arbitrary directly from schema
        const tokenArb = Arbitrary.make(Token);

        FastCheck.assert(
          FastCheck.property(tokenArb, (value) => {
            const encoded = Data.encodeDataUnsafe(value, Token);
            const decoded = Data.decodeDataUnsafe(encoded, Token);

            expect(decoded.policyId).toEqual(value.policyId);
            expect(decoded.assetName).toEqual(value.assetName);
            expect(decoded.amount).toEqual(value.amount);
          }),
        );
      });

      it("should handle complex nested structures", () => {
        // Define nested schemas
        const Asset = TSchema.Struct({
          policyId: TSchema.ByteArray,
          assetName: TSchema.ByteArray,
        });

        const Wallet = TSchema.Struct({
          owner: TSchema.ByteArray,
          balance: TSchema.Integer,
          assets: TSchema.Array(Asset),
          active: TSchema.Boolean,
        });

        // Create arbitrary directly from schema
        const walletArb = Arbitrary.make(Wallet);

        FastCheck.assert(
          FastCheck.property(walletArb, (value) => {
            // Full roundtrip including CBOR serialization
            const encoded = Data.encodeDataUnsafe(value, Wallet);
            const cbor = Data.encodeCBORUnsafe(encoded);
            const fromCbor = Data.decodeCBORUnsafe(cbor);
            const decoded = Data.decodeDataUnsafe(fromCbor, Wallet);

            // Deep equality check
            expect(decoded).toEqual(value);
          }),
        );
      });
    });

    describe("CBOR Roundtrips", () => {
      it("should maintain data through CBOR roundtrip", () => {
        // Define a schema for testing
        const Asset = TSchema.Struct({
          policyId: TSchema.ByteArray,
          assetName: TSchema.ByteArray,
          amount: TSchema.Integer,
        });

        // Create an arbitrary directly from schema
        const assetArb = Arbitrary.make(Asset);

        FastCheck.assert(
          FastCheck.property(assetArb, (value) => {
            // Encode to Data format
            const encoded = Data.encodeDataUnsafe(value, Asset);

            // Convert to CBOR
            const cbor = Data.encodeCBORUnsafe(encoded);

            // Decode from CBOR
            const fromCbor = Data.decodeCBORUnsafe(cbor);

            // Decode to original format
            const decoded = Data.decodeDataUnsafe(fromCbor, Asset);

            // Check equality using expect
            expect(decoded.policyId).toEqual(value.policyId);
            expect(decoded.assetName).toEqual(value.assetName);
            expect(decoded.amount).toEqual(value.amount);
          }),
        );
      });
    });

    describe("Collection Schemas", () => {
      it("should maintain arrays through roundtrip", () => {
        // Define array schema
        const IntArray = TSchema.Array(TSchema.Integer);

        // Create arbitrary directly from schema
        const intArrayArb = Arbitrary.make(IntArray);

        FastCheck.assert(
          FastCheck.property(intArrayArb, (value) => {
            const encoded = Data.encodeDataUnsafe(value, IntArray);
            const decoded = Data.decodeDataUnsafe(encoded, IntArray);

            expect(decoded.length).toEqual(value.length);

            for (let i = 0; i < value.length; i++) {
              expect(decoded[i]).toEqual(value[i]);
            }
          }),
        );
      });

      describe("Map Schema", () => {
        it("should deterministically encode Maps regardless of insertion order", () => {
          // Define map schema
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

        it("should handle map sorting for consistent serialization", () => {
          // Schema with a map
          const MetadataAsset = TSchema.Struct({
            id: TSchema.ByteArray,
            metadata: TSchema.Map(TSchema.ByteArray, TSchema.ByteArray),
          });

          // Create arbitrary and apply sorting function for consistent map ordering
          const sortedArb = Arbitrary.make(MetadataAsset).map(
            ({ metadata, ...rest }) => ({
              ...rest,
              metadata: new Map(
                Array.from(metadata.entries()).toSorted(([keyA], [keyB]) => {
                  const aBuffer = Buffer.from(keyA, "hex");
                  const bBuffer = Buffer.from(keyB, "hex");
                  return aBuffer.compare(bBuffer);
                }),
              ),
            }),
          );

          FastCheck.assert(
            FastCheck.property(sortedArb, (value) => {
              // Roundtrip
              const encoded = Data.encodeDataUnsafe(value, MetadataAsset);
              const cbor = Data.encodeCBORUnsafe(encoded);
              const decoded = Data.decodeCBORUnsafe(cbor);
              const result = Data.decodeDataUnsafe(decoded, MetadataAsset);

              // Verify the original value is preserved through the roundtrip
              expect(result).toEqual(value);

              // Verify map properties are intact
              expect(result.id).toEqual(value.id);
              expect(Array.from(result.metadata.entries())).toEqual(
                Array.from(value.metadata.entries()),
              );
            }),
          );
        });
      });
    });

    describe("Advanced Schema Types", () => {
      it("should roundtrip through complex struct schema with nullable maps", () => {
        // Define a complex nested schema
        const Asset = TSchema.Struct({
          policyId: TSchema.ByteArray,
          assetName: TSchema.ByteArray,
          amount: TSchema.Integer,
          metadata: TSchema.NullOr(
            TSchema.Map(TSchema.ByteArray, TSchema.ByteArray),
          ),
        });

        // Create arbitrary directly from schema and ensure maps are sorted
        const assetArb = Arbitrary.make(Asset).map(({ metadata, ...rest }) => ({
          ...rest,
          metadata: metadata
            ? new Map(
                // Sort map entries by comparing the binary representation of keys
                Array.from(metadata.entries()).toSorted(([keyA], [keyB]) => {
                  const aBuffer = Buffer.from(keyA, "hex");
                  const bBuffer = Buffer.from(keyB, "hex");
                  return aBuffer.compare(bBuffer);
                }),
              )
            : metadata,
        }));

        FastCheck.assert(
          FastCheck.property(assetArb, (value) => {
            // Handle null vs undefined

            const encoded = Data.encodeDataUnsafe(value, Asset);
            const cbor = Data.encodeCBORUnsafe(encoded);
            const decoded = Data.decodeCBORUnsafe(cbor);
            const result = Data.decodeDataUnsafe(decoded, Asset);

            // Use expect with JSON.stringify for complex object comparison
            expect(result).toEqual(value);
          }),
        );
      });

      it("should handle union types through roundtrip", () => {
        // Define union schemas
        const MintAction = TSchema.Struct({
          MintAction: TSchema.Struct({
            policyId: TSchema.ByteArray,
            assetName: TSchema.ByteArray,
            amount: TSchema.Integer,
          }),
        });

        const BurnAction = TSchema.Struct({
          BurnAction: TSchema.Struct({
            policyId: TSchema.ByteArray,
            assetName: TSchema.ByteArray,
            amount: TSchema.Integer,
          }),
        });

        const TransferAction = TSchema.Struct({
          TransferAction: TSchema.Struct({
            from: TSchema.ByteArray,
            to: TSchema.ByteArray,
            amount: TSchema.Integer,
          }),
        });

        const Action = TSchema.Union(MintAction, BurnAction, TransferAction);

        // Create arbitrary directly from union schema
        const actionArb = Arbitrary.make(Action);

        FastCheck.assert(
          FastCheck.property(actionArb, (value) => {
            const encoded = Data.encodeDataUnsafe(value, Action);
            const cbor = Data.encodeCBORUnsafe(encoded);
            const decoded = Data.decodeCBORUnsafe(cbor);
            const result = Data.decodeDataUnsafe(decoded, Action);
            expect(result).toEqual(value);
          }),
        );
      });

      it("should handle tuples through roundtrip", () => {
        // Define tuple schema
        const AssetTuple = TSchema.Tuple([
          TSchema.ByteArray,
          TSchema.Integer,
          TSchema.Boolean,
        ]);

        // Create arbitrary directly from schema
        const tupleArb = Arbitrary.make(AssetTuple);

        FastCheck.assert(
          FastCheck.property(tupleArb, (value) => {
            const encoded = Data.encodeDataUnsafe(value, AssetTuple);
            const cbor = Data.encodeCBORUnsafe(encoded);
            const decoded = Data.decodeCBORUnsafe(cbor);
            const result = Data.decodeDataUnsafe(decoded, AssetTuple);

            expect(result[0]).toEqual(value[0]);
            expect(result[1]).toEqual(value[1]);
            expect(result[2]).toEqual(value[2]);
          }),
        );
      });

      it("should handle literal types through roundtrip", () => {
        // Define literal schema
        const Coordinate = TSchema.Union(
          TSchema.OneLiteral("north"),
          TSchema.OneLiteral("south"),
          TSchema.OneLiteral("east"),
          TSchema.OneLiteral("west"),
          TSchema.Struct({
            north: TSchema.ByteArray,
            east: TSchema.ByteArray,
          }),
          TSchema.Struct({
            north: TSchema.ByteArray,
            west: TSchema.ByteArray,
          }),
          TSchema.Struct({
            south: TSchema.ByteArray,
            west: TSchema.ByteArray,
          }),
          TSchema.Struct({
            south: TSchema.ByteArray,
            east: TSchema.ByteArray,
          }),
        );
        // Create arbitrary directly from schema
        const directionArb = Arbitrary.make(Coordinate);
        FastCheck.assert(
          FastCheck.property(directionArb, (value) => {
            const encoded = Data.encodeDataUnsafe(value, Coordinate);
            const cbor = Data.encodeCBORUnsafe(encoded);
            const decoded = Data.decodeCBORUnsafe(cbor);
            const result = Data.decodeDataUnsafe(decoded, Coordinate);
            expect(result).toEqual(value);
          }),
        );
      });

      it("should handle array of structs through roundtrip", () => {
        // Define array of structs schema
        const Asset = TSchema.Struct({
          policyId: TSchema.ByteArray,
          assetName: TSchema.ByteArray,
          amount: TSchema.Integer,
        });
        const AssetArray = TSchema.Array(Asset);
        // Create arbitrary directly from schema
        const assetArrayArb = Arbitrary.make(AssetArray);
        FastCheck.assert(
          FastCheck.property(assetArrayArb, (value) => {
            const encoded = Data.encodeDataUnsafe(value, AssetArray);
            const cbor = Data.encodeCBORUnsafe(encoded);
            const decoded = Data.decodeCBORUnsafe(cbor);
            const result = Data.decodeDataUnsafe(decoded, AssetArray);
            expect(result.length).toEqual(value.length);
            for (let i = 0; i < value.length; i++) {
              expect(result[i].policyId).toEqual(value[i].policyId);
              expect(result[i].assetName).toEqual(value[i].assetName);
              expect(result[i].amount).toEqual(value[i].amount);
            }
          }),
        );
      });

      it("should handle nullable types through roundtrip", () => {
        // Define nullable schema
        const NullableSchema = TSchema.NullOr(
          TSchema.Struct({
            policyId: TSchema.ByteArray,
            assetName: TSchema.ByteArray,
            amount: TSchema.Integer,
          }),
        );
        // Create arbitrary directly from schema
        const nullableArb = Arbitrary.make(NullableSchema);
        FastCheck.assert(
          FastCheck.property(nullableArb, (value) => {
            const encoded = Data.encodeDataUnsafe(value, NullableSchema);
            const cbor = Data.encodeCBORUnsafe(encoded);
            const decoded = Data.decodeCBORUnsafe(cbor);
            const result = Data.decodeDataUnsafe(decoded, NullableSchema);
            expect(result).toEqual(value);
          }),
        );
      });

      it("should handle optional types through roundtrip", () => {
        // Define optional schema
        const OptionalSchema = TSchema.UndefinedOr(
          TSchema.Struct({
            policyId: TSchema.ByteArray,
            assetName: TSchema.ByteArray,
            amount: TSchema.Integer,
          }),
        );
        // Create arbitrary directly from schema
        const optionalArb = Arbitrary.make(OptionalSchema);
        FastCheck.assert(
          FastCheck.property(optionalArb, (value) => {
            const encoded = Data.encodeDataUnsafe(value, OptionalSchema);
            const cbor = Data.encodeCBORUnsafe(encoded);
            const decoded = Data.decodeCBORUnsafe(cbor);
            const result = Data.decodeDataUnsafe(decoded, OptionalSchema);
            expect(result).toEqual(value);
          }),
        );
      });

      it("should handle refined schemas with custom validation", () => {
        // Define schema with refinement for positive integers
        const PositiveInt = TSchema.Integer.pipe(
          TSchema.filter((value) => value > 0n || "Not PositiveInt"),
        );
        // Create arbitrary directly from schema with positive integers only
        const positiveIntArb = Arbitrary.make(PositiveInt);
        FastCheck.assert(
          FastCheck.property(positiveIntArb, (value) => {
            const encoded = Data.encodeDataUnsafe(value, PositiveInt);
            const cbor = Data.encodeCBORUnsafe(encoded);
            const decoded = Data.decodeCBORUnsafe(cbor);
            const result = Data.decodeDataUnsafe(decoded, PositiveInt);
            expect(result).toEqual(value);
            expect(result > 0n).toBe(true);
          }),
        );
      });
    });
  });
});
