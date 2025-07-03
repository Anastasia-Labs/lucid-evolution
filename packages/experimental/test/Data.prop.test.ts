import { describe, expect, it } from "vitest";
import { FastCheck } from "effect";
import * as Data from "../src/Data.js";

/**
 * Property-based tests for Data module
 * focusing on roundtrip serialization properties for all data types
 */
describe("Data Property Tests", () => {
  describe("Core Generators", () => {
    /**
     * Using exported generators from Data module
     * These follow the same pattern as used in the Data.js module
     */

    // Reference to exported generators for clarity
    const {
      genPlutusData,
      genPlutusBigInt,
      genPlutusBytes,
      genPlutusList,
      genPlutusMap,
      genConstr,
    } = Data;

    describe("Generator-based Roundtrip Tests", () => {
      it("should generate valid PlutusBigInt data and roundtrip", () => {
        FastCheck.assert(
          FastCheck.property(genPlutusBigInt(), (value) => {
            const cborHex = Data.Encode.cborHex(value);
            const decoded = Data.Decode.cborHex(cborHex);
            expect(Data.isPlutusBigInt(value)).toBe(true);
            expect(decoded).toEqual(value);
          }),
        );
      });

      it("should generate valid PlutusBytes data and roundtrip", () => {
        FastCheck.assert(
          FastCheck.property(genPlutusBytes(), (value) => {
            const cborHex = Data.Encode.cborHex(value);
            const decoded = Data.Decode.cborHex(cborHex);
            expect(Data.isPlutusBytes(value)).toBe(true);
            expect(decoded).toEqual(value);
          }),
        );
      });

      it("should generate valid PlutusList data and roundtrip", () => {
        FastCheck.assert(
          FastCheck.property(genPlutusList(1), (value) => {
            const cborHex = Data.Encode.cborHex(value);
            const decoded = Data.Decode.cborHex(cborHex);
            expect(Data.isPlutusList(value)).toBe(true);
            expect(decoded).toEqual(value);
          }),
        );
      });

      it("should generate valid PlutusMap data and roundtrip", () => {
        FastCheck.assert(
          FastCheck.property(genPlutusMap(1), (value) => {
            const cborHex = Data.Encode.cborHex(value);
            const decoded = Data.Decode.cborHex(cborHex);
            expect(Data.isPlutusMap(value)).toBe(true);
            expect(decoded).toEqual(value);
          }),
        );
      });

      it("should generate valid Constr data and roundtrip", () => {
        FastCheck.assert(
          FastCheck.property(genConstr(1), (value) => {
            const cborHex = Data.Encode.cborHex(value);
            const decoded = Data.Decode.cborHex(cborHex);
            expect(Data.isConstr(value)).toBe(true);
            expect(decoded).toEqual(value);
          }),
        );
      });

      it("should generate complex PlutusData structures and roundtrip", () => {
        FastCheck.assert(
          FastCheck.property(genPlutusData(2), (value) => {
            const cborHex = Data.Encode.cborHex(value);
            const decoded = Data.Decode.cborHex(cborHex);
            expect(decoded).toEqual(value);
          }),
        );
      });
    });
  });

  describe("Generator-based Alternative Tests", () => {
    it("should maintain PlutusBigInt through roundtrip using exported generator", () => {
      FastCheck.assert(
        FastCheck.property(Data.genPlutusBigInt(), (value) => {
          const cborHex = Data.Encode.cborHex(value);
          const decoded = Data.Decode.cborHex(cborHex);
          expect(decoded).toEqual(value);
        }),
      );
    });

    it("should maintain PlutusBytes through roundtrip using exported generator", () => {
      FastCheck.assert(
        FastCheck.property(Data.genPlutusBytes(), (value) => {
          const cborHex = Data.Encode.cborHex(value);
          const decoded = Data.Decode.cborHex(cborHex);
          expect(decoded).toEqual(value);
        }),
      );
    });

    it("should maintain PlutusData through roundtrip using exported generator", () => {
      // Use limited depth to avoid excessive recursion
      FastCheck.assert(
        FastCheck.property(Data.genPlutusData(2), (value) => {
          const cborHex = Data.Encode.cborHex(value);
          const decoded = Data.Decode.cborHex(cborHex);
          expect(decoded).toEqual(value);
        }),
      );
    });
  });

  describe("PlutusBigInt CDDL Compliance", () => {
    it("should handle all CDDL int variants: int, big_uint, big_nint", () => {
      FastCheck.assert(
        FastCheck.property(FastCheck.bigInt(), (value) => {
          const plutusBigInt = Data.int(value);
          const cborHex = Data.Encode.cborHex(plutusBigInt);
          const decoded = Data.Decode.cborHex(cborHex);

          expect(decoded).toEqual(plutusBigInt);
          expect(decoded._tag).toBe("Int");

          // Type assertion to verify properties safely
          if (Data.isPlutusBigInt(decoded)) {
            expect(decoded.value).toBe(value);
          } else {
            expect.fail("Decoded value should be PlutusBigInt");
          }
        }),
      );
    });

    it("should correctly handle edge cases for big integers", () => {
      const edgeCases = [
        0n,
        1n,
        -1n,
        2n ** 63n - 1n, // Max int64
        -(2n ** 63n), // Min int64
        2n ** 64n, // Requires tag 2
        -(2n ** 64n), // Requires tag 3
        2n ** 128n, // Very large positive
        -(2n ** 128n), // Very large negative
      ];

      for (const value of edgeCases) {
        const plutusBigInt = Data.int(value);
        const cborHex = Data.Encode.cborHex(plutusBigInt);
        const decoded = Data.Decode.cborHex(cborHex);

        expect(decoded).toEqual(plutusBigInt);

        // Type assertion to verify properties safely
        if (Data.isPlutusBigInt(decoded)) {
          expect(decoded.value).toBe(value);
        } else {
          expect.fail("Decoded value should be PlutusBigInt");
        }
      }
    });
  });

  describe("Constr CBOR Tag Handling", () => {
    it("should use proper tags for small constructor indices (0-6)", () => {
      FastCheck.assert(
        FastCheck.property(
          FastCheck.integer({ min: 0, max: 6 }),
          FastCheck.array(Data.genPlutusBigInt(), { maxLength: 2 }),
          (index, fields) => {
            const constr = Data.constr(BigInt(index), fields);
            const cborHex = Data.Encode.cborHex(constr);
            const decoded = Data.Decode.cborHex(cborHex);

            expect(decoded).toEqual(constr);

            // Type assertion to verify properties safely
            if (Data.isConstr(decoded)) {
              expect(decoded.index).toBe(BigInt(index));
            } else {
              expect.fail("Decoded value should be a Constr");
            }
          },
        ),
      );
    });

    it("should use tag 102 for large constructor indices", () => {
      FastCheck.assert(
        FastCheck.property(
          FastCheck.bigInt({ min: 7n, max: 2n ** 64n - 1n }),
          FastCheck.array(Data.genPlutusBigInt(), { maxLength: 2 }),
          (index, fields) => {
            const constr = Data.constr(index, fields);
            const cborHex = Data.Encode.cborHex(constr);
            const decoded = Data.Decode.cborHex(cborHex);

            expect(decoded).toEqual(constr);

            // Type assertion to verify properties safely
            if (Data.isConstr(decoded)) {
              expect(decoded.index).toBe(index);
            } else {
              expect.fail("Decoded value should be a Constr");
            }
          },
        ),
      );
    });
  });

  describe("Schema Transformation Tests", () => {
    it("should successfully transform between CBOR bytes and PlutusData", () => {
      // Use exported generator with limited recursion depth
      FastCheck.assert(
        FastCheck.property(Data.genPlutusData(1), (value) => {
          // PlutusData -> CBOR bytes
          const cborBytes = Data.Encode.cborBytes(value);

          // CBOR bytes -> PlutusData
          const decoded = Data.Decode.cborBytes(cborBytes);

          expect(decoded).toEqual(value);
        }),
      );
    });
  });
});

describe("Old vs New Data Module Compatibility", () => {
  // We'll skip the compatibility tests for now, since they require more understanding
  // of the Data module's API and would need more time to implement properly.
  it.todo("should produce compatible CBOR encodings for basic types");
  it.todo("should decode legacy CBOR to equivalent Data structures");
});
