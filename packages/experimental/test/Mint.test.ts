import { test, expect, describe } from "vitest";
import { it } from "@effect/vitest";
import { Effect } from "effect";
import * as Mint from "../src/Mint.js";
import * as PolicyId from "../src/PolicyId.js";
import * as AssetName from "../src/AssetName.js";

describe("Mint", () => {
  const policyId1 =
    "00000000000000000000000000000000000000000000000000000000" as PolicyId.PolicyId;
  const policyId2 =
    "11111111111111111111111111111111111111111111111111111111" as PolicyId.PolicyId;
  const assetName1 = "546f6b656e31" as AssetName.AssetName; // "Token1" in hex
  const assetName2 = "546f6b656e32" as AssetName.AssetName; // "Token2" in hex

  test("fromEntries creates a Mint from array of entries", () => {
    const entries: Array<
      [PolicyId.PolicyId, Array<[AssetName.AssetName, bigint]>]
    > = [
      [policyId1, [[assetName1, 100n]]],
      [policyId2, [[assetName2, 200n]]],
    ];

    const mint = Mint.fromEntries(entries);

    expect(Mint.get(mint, policyId1, assetName1)).toBe(100n);
    expect(Mint.get(mint, policyId2, assetName2)).toBe(200n);
  });

  test("singleton creates a Mint with single asset", () => {
    const mint = Mint.singleton(policyId1, assetName1, 500n);

    expect(mint.get(policyId1)?.get(assetName1)).toBe(500n);
    expect(mint.size).toBe(1);
  });

  test("empty creates an empty Mint", () => {
    const mint = Mint.empty();

    expect(mint.size).toBe(0);
  });

  test("isEmpty correctly identifies empty mints", () => {
    const emptyMint = Mint.empty();
    const nonEmptyMint = Mint.singleton(policyId1, assetName1, 100n);

    expect(Mint.isEmpty(emptyMint)).toBe(true);
    expect(Mint.isEmpty(nonEmptyMint)).toBe(false);
  });

  describe("CBOR encoding/decoding", () => {
    it.effect("should encode and decode correctly", () =>
      Effect.gen(function* () {
        // Create a test mint with multiple policies and assets
        const originalMint = Mint.fromEntries([
          [
            policyId1,
            [
              [assetName1, 100n],
              [assetName2, 200n],
            ],
          ],
          [policyId2, [[assetName1, 300n]]],
        ]);

        // Encode to CBOR hex
        const cborHex = Mint.Codec().Encode.cborHex(originalMint);
        expect(typeof cborHex).toBe("string");
        expect(cborHex.length).toBeGreaterThan(0);

        // Decode back from CBOR hex
        const decodedMint = Mint.Codec().Decode.cborHex(cborHex);

        // Verify the decoded mint matches the original
        expect(decodedMint.size).toBe(originalMint.size);
        expect(decodedMint.get(policyId1)?.get(assetName1)).toBe(100n);
        expect(decodedMint.get(policyId1)?.get(assetName2)).toBe(200n);
        expect(decodedMint.get(policyId2)?.get(assetName1)).toBe(300n);
      }),
    );

    it.effect("should encode and decode bytes correctly", () =>
      Effect.gen(function* () {
        const originalMint = Mint.singleton(policyId1, assetName1, 1000n);

        // Encode to CBOR bytes
        const cborBytes = Mint.Codec().Encode.cborBytes(originalMint);
        expect(cborBytes).toBeInstanceOf(Uint8Array);
        expect(cborBytes.length).toBeGreaterThan(0);

        // Decode back from CBOR bytes
        const decodedMint = Mint.Codec().Decode.cborBytes(cborBytes);

        // Verify the decoded mint matches the original
        expect(decodedMint.get(policyId1)?.get(assetName1)).toBe(1000n);
      }),
    );

    it.effect("should handle empty mint encoding/decoding", () =>
      Effect.gen(function* () {
        const emptyMint = Mint.empty();

        // Encode empty mint
        const cborHex = Mint.Codec().Encode.cborHex(emptyMint);
        expect(typeof cborHex).toBe("string");

        // Decode back
        const decodedMint = Mint.Codec().Decode.cborHex(cborHex);
        expect(Mint.isEmpty(decodedMint)).toBe(true);
      }),
    );

    it.effect("should handle negative values (burning)", () =>
      Effect.gen(function* () {
        const burnMint = Mint.singleton(policyId1, assetName1, -500n);

        // Encode and decode
        const cborHex = Mint.Codec().Encode.cborHex(burnMint);
        const decodedMint = Mint.Codec().Decode.cborHex(cborHex);

        // Verify negative value is preserved
        expect(decodedMint.get(policyId1)?.get(assetName1)).toBe(-500n);
      }),
    );
  });

  describe("Error handling", () => {
    it.effect("should handle invalid CBOR hex gracefully", () =>
      Effect.gen(function* () {
        const result = yield* Effect.either(
          Effect.try(() => Mint.Codec().Decode.cborHex("invalid_hex")),
        );

        expect(result._tag).toBe("Left");
      }),
    );

    it.effect("should handle invalid CBOR bytes gracefully", () =>
      Effect.gen(function* () {
        const invalidBytes = new Uint8Array([0xff, 0xff, 0xff]);
        const result = yield* Effect.either(
          Effect.try(() => Mint.Codec().Decode.cborBytes(invalidBytes)),
        );

        expect(result._tag).toBe("Left");
      }),
    );
  });

  describe("Real-world examples", () => {
    test("should handle typical minting scenario", () => {
      // Simulate minting new tokens
      const mint = Mint.fromEntries([
        [
          "policy123" as PolicyId.PolicyId,
          [
            ["MyToken" as AssetName.AssetName, 1000000n], // Mint 1M tokens
            ["MyNFT" as AssetName.AssetName, 1n], // Mint 1 NFT
          ],
        ],
      ]);

      expect(
        mint
          .get("policy123" as PolicyId.PolicyId)
          ?.get("MyToken" as AssetName.AssetName),
      ).toBe(1000000n);
      expect(
        mint
          .get("policy123" as PolicyId.PolicyId)
          ?.get("MyNFT" as AssetName.AssetName),
      ).toBe(1n);
    });

    test("should handle burning scenario", () => {
      // Simulate burning tokens
      const burn = Mint.singleton(
        "policy123" as PolicyId.PolicyId,
        "MyToken" as AssetName.AssetName,
        -500000n,
      );

      expect(
        burn
          .get("policy123" as PolicyId.PolicyId)
          ?.get("MyToken" as AssetName.AssetName),
      ).toBe(-500000n);
    });

    test("should handle mixed mint/burn scenario", () => {
      // Simulate minting some tokens while burning others
      const mintBurn = Mint.fromEntries([
        [
          "policy123" as PolicyId.PolicyId,
          [
            ["TokenA" as AssetName.AssetName, 1000n], // Mint TokenA
            ["TokenB" as AssetName.AssetName, -500n], // Burn TokenB
          ],
        ],
      ]);

      expect(
        mintBurn
          .get("policy123" as PolicyId.PolicyId)
          ?.get("TokenA" as AssetName.AssetName),
      ).toBe(1000n);
      expect(
        mintBurn
          .get("policy123" as PolicyId.PolicyId)
          ?.get("TokenB" as AssetName.AssetName),
      ).toBe(-500n);
    });
  });
});
