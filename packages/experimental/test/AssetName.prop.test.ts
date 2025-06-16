import { describe, expect, it } from "vitest";
import { FastCheck, Schema } from "effect";
import * as AssetName from "../src/AssetName.js";

describe("AssetName property tests", () => {
  describe("AssetName", () => {
    it("should be a valid HexString asset name", () => {
      FastCheck.assert(
        FastCheck.property(
          AssetName.generator.filter((assetName) => assetName.bytes.length > 0), // Filter out empty for hex
          (assetName) => {
            const hexString = Schema.encodeSync(AssetName.HexString)(assetName);
            const decoded = Schema.decodeSync(AssetName.HexString)(hexString);
            expect(decoded).toEqual(assetName);
          },
        ),
      );
    });

    it("should be a valid Bytes asset name", () => {
      FastCheck.assert(
        FastCheck.property(AssetName.generator, (assetName) => {
          const bytes = Schema.encodeSync(AssetName.Bytes)(assetName);
          const decoded = Schema.decodeSync(AssetName.Bytes)(bytes);
          expect(decoded).toEqual(assetName);
        }),
      );
    });
  });
});
