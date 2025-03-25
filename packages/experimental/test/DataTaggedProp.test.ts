import { describe, expect, it } from "vitest";
import * as DataTagged from "../src/DataTagged.js";
import * as TypeTaggedSchema from "../src/TypeTaggedSchema.js";
import { Arbitrary, FastCheck } from "effect";

/**
 * Property-based testing for DataTagged and TypeTaggedSchema
 * focusing on roundtrip serialization properties for all data types
 */
describe("DataTagged Property Tests", () => {
  describe("DataTagged Core Types", () => {
    describe("Schema-Based Arbitrary Generation", () => {
      it("should generate valid ByteArray data and roundtrip", () => {
        FastCheck.assert(
          FastCheck.property(DataTagged.genByteArray(), (value) => {
            const cbor = DataTagged.toCBOR(value);
            const decoded = DataTagged.fromCBOR(cbor);
            expect(DataTagged.isByteArray(value)).toBe(true);
            expect(value).toEqual(decoded);
          })
        );
      });

      it("should generate valid Integer data and roundtrip", () => {
        FastCheck.assert(
          FastCheck.property(DataTagged.genInteger(), (value) => {
            const cbor = DataTagged.toCBOR(value);
            const decoded = DataTagged.fromCBOR(cbor);
            expect(DataTagged.isInteger(value)).toBe(true);
            expect(value).toEqual(decoded);
          })
        );
      });

      it("should generate valid Constr data and roundtrip", () => {
        // Limit runs for complex structures
        FastCheck.assert(
          FastCheck.property(DataTagged.genConstr(2), (value) => {
            const cbor = DataTagged.toCBOR(value);
            const decoded = DataTagged.fromCBOR(cbor);
            expect(DataTagged.isConstr(value)).toBe(true);
            expect(value).toStrictEqual(decoded);
          })
        );
      });

      it("should generate valid List data and roundtrip", () => {
        FastCheck.assert(
          FastCheck.property(DataTagged.genList(2), (value) => {
            const cbor = DataTagged.toCBOR(value);
            const decoded = DataTagged.fromCBOR(cbor);
            expect(DataTagged.isList(value)).toBe(true);
            expect(value).toEqual(decoded);
          })
        );
      });

      it("should generate valid Map data and roundtrip", () => {
        FastCheck.assert(
          FastCheck.property(DataTagged.genMap(2), (value) => {
            const cbor = DataTagged.toCBOR(value);
            const decoded = DataTagged.fromCBOR(cbor);
            expect(DataTagged.isMap(value)).toBe(true);
            expect(value).toEqual(decoded);
          })
        );
      });
    });
  });

  describe("TypeTaggedSchema Property Tests", () => {
    describe("Basic Schema Roundtrips", () => {
      it("should maintain ByteArray through roundtrip", () => {
        const byteArrayArb = Arbitrary.make(TypeTaggedSchema.ByteArray);

        FastCheck.assert(
          FastCheck.property(byteArrayArb, (value) => {
            const encoded = DataTagged.encodeData(
              value,
              TypeTaggedSchema.ByteArray
            );
            const decoded = DataTagged.decodeData(
              encoded,
              TypeTaggedSchema.ByteArray
            );
            expect(decoded).toEqual(value);
          })
        );
      });

      it("should maintain Integer through roundtrip", () => {
        const integerArb = Arbitrary.make(TypeTaggedSchema.Integer);

        FastCheck.assert(
          FastCheck.property(integerArb, (value) => {
            const encoded = DataTagged.encodeData(
              value,
              TypeTaggedSchema.Integer
            );
            const decoded = DataTagged.decodeData(
              encoded,
              TypeTaggedSchema.Integer
            );
            expect(decoded).toEqual(value);
          })
        );
      });

      it("should maintain Boolean through roundtrip", () => {
        const booleanArb = Arbitrary.make(TypeTaggedSchema.Boolean);

        FastCheck.assert(
          FastCheck.property(booleanArb, (value) => {
            const encoded = DataTagged.encodeData(
              value,
              TypeTaggedSchema.Boolean
            );
            const decoded = DataTagged.decodeData(
              encoded,
              TypeTaggedSchema.Boolean
            );
            expect(decoded).toEqual(value);
          })
        );
      });
    });

    describe("Struct Schema", () => {
      it("should maintain struct data through roundtrip", () => {
        // Define a simple struct schema
        const Token = TypeTaggedSchema.Struct({
          policyId: TypeTaggedSchema.ByteArray,
          assetName: TypeTaggedSchema.ByteArray,
          amount: TypeTaggedSchema.Integer,
        });

        // Create arbitrary directly from schema
        const tokenArb = Arbitrary.make(Token);

        FastCheck.assert(
          FastCheck.property(tokenArb, (value) => {
            const encoded = DataTagged.encodeData(value, Token);
            const decoded = DataTagged.decodeData(encoded, Token);

            expect(decoded.policyId).toEqual(value.policyId);
            expect(decoded.assetName).toEqual(value.assetName);
            expect(decoded.amount).toEqual(value.amount);
          })
        );
      });

      it("should handle complex nested structures", () => {
        // Define nested schemas
        const Asset = TypeTaggedSchema.Struct({
          policyId: TypeTaggedSchema.ByteArray,
          assetName: TypeTaggedSchema.ByteArray,
        });

        const Wallet = TypeTaggedSchema.Struct({
          owner: TypeTaggedSchema.ByteArray,
          balance: TypeTaggedSchema.Integer,
          assets: TypeTaggedSchema.Array(Asset),
          active: TypeTaggedSchema.Boolean,
        });

        // Create arbitrary directly from schema
        const walletArb = Arbitrary.make(Wallet);

        FastCheck.assert(
          FastCheck.property(walletArb, (value) => {
            // Full roundtrip including CBOR serialization
            const encoded = DataTagged.encodeData(value, Wallet);
            const cbor = DataTagged.toCBOR(encoded);
            const fromCbor = DataTagged.fromCBOR(cbor);
            const decoded = DataTagged.decodeData(fromCbor, Wallet);

            // Deep equality check
            expect(decoded).toEqual(value);
          })
        );
      });
    });

    describe("CBOR Roundtrips", () => {
      it("should maintain data through CBOR roundtrip", () => {
        // Define a schema for testing
        const Asset = TypeTaggedSchema.Struct({
          policyId: TypeTaggedSchema.ByteArray,
          assetName: TypeTaggedSchema.ByteArray,
          amount: TypeTaggedSchema.Integer,
        });

        // Create an arbitrary directly from schema
        const assetArb = Arbitrary.make(Asset);

        FastCheck.assert(
          FastCheck.property(assetArb, (value) => {
            // Encode to DataTagged format
            const dataTagged = DataTagged.encodeData(value, Asset);

            // Convert to CBOR
            const cbor = DataTagged.toCBOR(dataTagged);

            // Decode from CBOR
            const fromCbor = DataTagged.fromCBOR(cbor);

            // Decode to original format
            const decoded = DataTagged.decodeData(fromCbor, Asset);

            // Check equality using expect
            expect(decoded.policyId).toEqual(value.policyId);
            expect(decoded.assetName).toEqual(value.assetName);
            expect(decoded.amount).toEqual(value.amount);
          })
        );
      });
    });

    describe("Collection Schemas", () => {
      it("should maintain arrays through roundtrip", () => {
        // Define array schema
        const IntArray = TypeTaggedSchema.Array(TypeTaggedSchema.Integer);

        // Create arbitrary directly from schema
        const intArrayArb = Arbitrary.make(IntArray);

        FastCheck.assert(
          FastCheck.property(intArrayArb, (value) => {
            const encoded = DataTagged.encodeData(value, IntArray);
            const decoded = DataTagged.decodeData(encoded, IntArray);

            expect(decoded.length).toEqual(value.length);

            for (let i = 0; i < value.length; i++) {
              expect(decoded[i]).toEqual(value[i]);
            }
          })
        );
      });

      describe("Map Schema", () => {
        it("should deterministically encode Maps regardless of insertion order", () => {
          // Define map schema
          const TokenMap = TypeTaggedSchema.Map(
            TypeTaggedSchema.ByteArray,
            TypeTaggedSchema.Integer
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

        it("should handle map sorting for consistent serialization", () => {
          // Schema with a map
          const MetadataAsset = TypeTaggedSchema.Struct({
            id: TypeTaggedSchema.ByteArray,
            metadata: TypeTaggedSchema.Map(
              TypeTaggedSchema.ByteArray,
              TypeTaggedSchema.ByteArray
            ),
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
                })
              ),
            })
          );

          FastCheck.assert(
            FastCheck.property(sortedArb, (value) => {
              // Roundtrip
              const encoded = DataTagged.encodeData(value, MetadataAsset);
              const cbor = DataTagged.toCBOR(encoded);
              const decoded = DataTagged.fromCBOR(cbor);
              const result = DataTagged.decodeData(decoded, MetadataAsset);

              // Verify the original value is preserved through the roundtrip
              expect(result).toEqual(value);

              // Verify map properties are intact
              expect(result.id).toEqual(value.id);
              expect(Array.from(result.metadata.entries())).toEqual(
                Array.from(value.metadata.entries())
              );
            })
          );
        });
      });
    });

    describe("Advanced Schema Types", () => {
      it("should roundtrip through complex struct schema with nullable maps", () => {
        // Define a complex nested schema
        const Asset = TypeTaggedSchema.Struct({
          policyId: TypeTaggedSchema.ByteArray,
          assetName: TypeTaggedSchema.ByteArray,
          amount: TypeTaggedSchema.Integer,
          metadata: TypeTaggedSchema.Nullable(
            TypeTaggedSchema.Map(
              TypeTaggedSchema.ByteArray,
              TypeTaggedSchema.ByteArray
            )
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
                })
              )
            : metadata,
        }));

        FastCheck.assert(
          FastCheck.property(assetArb, (value) => {
            // Handle null vs undefined

            const encoded = DataTagged.encodeData(value, Asset);
            const cbor = DataTagged.toCBOR(encoded);
            const decoded = DataTagged.fromCBOR(cbor);
            const result = DataTagged.decodeData(decoded, Asset);

            // Use expect with JSON.stringify for complex object comparison
            expect(result).toEqual(value);
          })
        );
      });

      it("should handle union types through roundtrip", () => {
        // Define union schemas
        const MintAction = TypeTaggedSchema.Struct({
          MintAction: TypeTaggedSchema.Struct({
            policyId: TypeTaggedSchema.ByteArray,
            assetName: TypeTaggedSchema.ByteArray,
            amount: TypeTaggedSchema.Integer,
          }),
        });

        const BurnAction = TypeTaggedSchema.Struct({
          BurnAction: TypeTaggedSchema.Struct({
            policyId: TypeTaggedSchema.ByteArray,
            assetName: TypeTaggedSchema.ByteArray,
            amount: TypeTaggedSchema.Integer,
          }),
        });

        const TransferAction = TypeTaggedSchema.Struct({
          TransferAction: TypeTaggedSchema.Struct({
            from: TypeTaggedSchema.ByteArray,
            to: TypeTaggedSchema.ByteArray,
            amount: TypeTaggedSchema.Integer,
          }),
        });
        type TransferAction = typeof TransferAction.Type;

        const Action = TypeTaggedSchema.Union(
          MintAction,
          BurnAction,
          TransferAction
        );

        // Create arbitrary directly from union schema
        const actionArb = Arbitrary.make(Action);

        FastCheck.assert(
          FastCheck.property(actionArb, (value) => {
            const encoded = DataTagged.encodeData(value, Action);
            const cbor = DataTagged.toCBOR(encoded);
            const decoded = DataTagged.fromCBOR(cbor);
            const result = DataTagged.decodeData(decoded, Action);
            expect(result).toEqual(value);
          })
        );
      });

      it("should handle tuples through roundtrip", () => {
        // Define tuple schema
        const AssetTuple = TypeTaggedSchema.Tuple([
          TypeTaggedSchema.ByteArray,
          TypeTaggedSchema.Integer,
          TypeTaggedSchema.Boolean,
        ]);

        // Create arbitrary directly from schema
        const tupleArb = Arbitrary.make(AssetTuple);

        FastCheck.assert(
          FastCheck.property(tupleArb, (value) => {
            const encoded = DataTagged.encodeData(value, AssetTuple);
            const cbor = DataTagged.toCBOR(encoded);
            const decoded = DataTagged.fromCBOR(cbor);
            const result = DataTagged.decodeData(decoded, AssetTuple);

            expect(result[0]).toEqual(value[0]);
            expect(result[1]).toEqual(value[1]);
            expect(result[2]).toEqual(value[2]);
          })
        );
      });

      it("should handle literal types through roundtrip", () => {
        // Define literal schema
        const Coordinate = TypeTaggedSchema.Union(
          TypeTaggedSchema.OneLiteral("north"),
          TypeTaggedSchema.OneLiteral("south"),
          TypeTaggedSchema.OneLiteral("east"),
          TypeTaggedSchema.OneLiteral("west"),
          TypeTaggedSchema.Struct({
            north: TypeTaggedSchema.ByteArray,
            east: TypeTaggedSchema.ByteArray,
          }),
          TypeTaggedSchema.Struct({
            north: TypeTaggedSchema.ByteArray,
            west: TypeTaggedSchema.ByteArray,
          }),
          TypeTaggedSchema.Struct({
            south: TypeTaggedSchema.ByteArray,
            west: TypeTaggedSchema.ByteArray,
          }),
          TypeTaggedSchema.Struct({
            south: TypeTaggedSchema.ByteArray,
            east: TypeTaggedSchema.ByteArray,
          })
        );
        // Create arbitrary directly from schema
        const directionArb = Arbitrary.make(Coordinate);
        FastCheck.assert(
          FastCheck.property(directionArb, (value) => {
            const encoded = DataTagged.encodeData(value, Coordinate);
            const cbor = DataTagged.toCBOR(encoded);
            const decoded = DataTagged.fromCBOR(cbor);
            const result = DataTagged.decodeData(decoded, Coordinate);
            expect(result).toEqual(value);
          })
        );
      });

      it("should handle refined schemas with custom validation", () => {
        // Define schema with refinement for positive integers
        const PositiveInt = TypeTaggedSchema.Integer.pipe(
          TypeTaggedSchema.filter((value) => value > 0n || "Not PositiveInt")
        );
        // Create arbitrary directly from schema with positive integers only
        const positiveIntArb = Arbitrary.make(PositiveInt);
        FastCheck.assert(
          FastCheck.property(positiveIntArb, (value) => {
            const encoded = DataTagged.encodeData(value, PositiveInt);
            const cbor = DataTagged.toCBOR(encoded);
            const decoded = DataTagged.fromCBOR(cbor);
            const result = DataTagged.decodeData(decoded, PositiveInt);
            expect(result).toEqual(value);
            expect(result > 0n).toBe(true);
          })
        );
      });
    });
  });
});
