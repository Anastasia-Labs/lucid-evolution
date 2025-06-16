import { describe, expect, it } from "vitest";
import { FastCheck, Schema } from "effect";
import * as AssetName from "../src/AssetName.js";

// Sample asset names for testing - organized by validity
const VALID_ASSET_NAME_BYTES = [
  new Uint8Array([]),
  new Uint8Array([0x74, 0x6f, 0x6b, 0x65, 0x6e]),
  new Uint8Array([0x61, 0x73, 0x73, 0x65, 0x74]),
  new Uint8Array(32).fill(0x41),
];

const VALID_ASSET_NAME_HEX = ["746f6b656e", "6173736574", "41".repeat(32)];

const INVALID_ASSET_NAME_BYTES = [new Uint8Array(33), new Uint8Array(50)];

const INVALID_ASSET_NAME_HEX = [
  "41".repeat(34),
  "g746f6b656e",
  "746f6b656",
  "",
];

/**
 * Tests for the AssetName functionality -
 * focusing on asset name creation, validation, and serialization
 */
describe("AssetName Validation", () => {
  it.each(VALID_ASSET_NAME_BYTES.map((bytes, index) => [bytes, index]))(
    "should create valid AssetName from bytes (case %s)",
    (bytes) => {
      const assetName = new AssetName.AssetName({ bytes });
      expect(assetName._tag).toBe("AssetName");
      expect(assetName.bytes).toEqual(bytes);
      expect(AssetName.isAssetName(assetName)).toBe(true);
    },
  );

  it.each(VALID_ASSET_NAME_HEX.map((hex, index) => [hex, index]))(
    "should create valid AssetName from hex string (case %s)",
    (hex) => {
      const assetName = Schema.decodeUnknownSync(AssetName.HexString)(hex);
      expect(assetName._tag).toBe("AssetName");
      expect(AssetName.isAssetName(assetName)).toBe(true);
    },
  );

  it.each(INVALID_ASSET_NAME_BYTES.map((bytes, index) => [bytes, index]))(
    "should throw on invalid asset name bytes (case %s)",
    (bytes) => {
      expect(() => new AssetName.AssetName({ bytes })).toThrow();
    },
  );

  it.each(INVALID_ASSET_NAME_HEX.map((hex, index) => [hex, index]))(
    "should throw on invalid hex string (case %s)",
    (hex) => {
      expect(() =>
        Schema.decodeUnknownSync(AssetName.HexString)(hex),
      ).toThrow();
    },
  );

  it("should validate length constants", () => {
    expect(AssetName.ASSET_NAME_MAX_LENGTH).toBe(32);
  });

  it("should check equality correctly", () => {
    const name1 = new AssetName.AssetName({
      bytes: new Uint8Array([0x74, 0x6f, 0x6b, 0x65, 0x6e]),
    });
    const name2 = new AssetName.AssetName({
      bytes: new Uint8Array([0x74, 0x6f, 0x6b, 0x65, 0x6e]),
    });
    const name3 = new AssetName.AssetName({
      bytes: new Uint8Array([0x61, 0x73, 0x73, 0x65, 0x74]),
    });

    expect(AssetName.equals(name1, name2)).toBe(true);
    expect(AssetName.equals(name1, name3)).toBe(false);
  });

  it("should generate valid AssetName instances", () => {
    const samples = FastCheck.sample(AssetName.generator, 20);

    samples.forEach((assetName) => {
      expect(assetName).toBeInstanceOf(AssetName.AssetName);
      expect(assetName._tag).toBe("AssetName");
      expect(assetName.bytes.length).toBeLessThanOrEqual(
        AssetName.ASSET_NAME_MAX_LENGTH,
      );
      expect(AssetName.isAssetName(assetName)).toBe(true);
    });
  });
});
