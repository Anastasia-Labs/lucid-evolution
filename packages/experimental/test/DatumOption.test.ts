import { describe, expect, it } from "vitest";
import { FastCheck, Schema } from "effect";
import * as DatumOption from "../src/DatumOption.js";
import * as DatumHash from "../src/DatumHash.js";

// Sample datum hashes for testing
const VALID_DATUM_HASHES = [
  "5160f88b929bf8a6c57c285b889488f9137c0ef3cfd0bcf408a10020e69146d5",
  "bfd6dd1e96e4fd26c6379aa3093aaef25639d58ee76d045bd4528ef9f2fed808",
  "0b6fc2971960699b021e408e37027da1fdb3f9278270c44916dc1ddfb5778518",
  "203cfa5440271074e2fd0ed3960593b301bd400dd8397bb5252a86b1fc3e637f",
  "3ed3f45dc5d4717a2ffbc782852deb08e6838b65200ebde4ca326d42e0eb3c7e",
];

// Sample inline datum data for testing
const VALID_INLINE_DATA = [
  new Uint8Array([0x01, 0x02, 0x03]),
  new Uint8Array([
    0xa1, 0x65, 0x68, 0x65, 0x6c, 0x6c, 0x6f, 0x65, 0x77, 0x6f, 0x72, 0x6c,
    0x64,
  ]), // CBOR: {"hello": "world"}
  new Uint8Array([0x83, 0x01, 0x02, 0x03]), // CBOR: [1, 2, 3]
  new Uint8Array([0xf6]), // CBOR: null
  new Uint8Array([0x18, 0x2a]), // CBOR: 42
];

/**
 * Tests for the DatumOption functionality -
 * focusing on datum option creation, validation, and serialization
 */
describe("DatumOption Validation", () => {
  it.each(VALID_DATUM_HASHES)(
    "should validate DatumHash as valid DatumOption: %s",
    (input) => {
      const datumHash = Schema.decodeUnknownSync(DatumHash.HexString)(input);
      expect(DatumOption.isDatumOption(datumHash)).toBe(true);
      expect(datumHash._tag).toBe("DatumHash");
      expect(datumHash.hash).toBe(input);
    },
  );

  it.each(VALID_INLINE_DATA.map((data) => [data]))(
    "should validate InlineDatum as valid DatumOption",
    (data) => {
      const inlineDatum = new DatumOption.InlineDatum({ data }); // Fix: use the actual data
      expect(DatumOption.isDatumOption(inlineDatum)).toBe(true);
      expect(inlineDatum._tag).toBe("InlineDatum");
      expect(inlineDatum.data).toEqual(data);
    },
  );

  it("should check DatumHash equality correctly", () => {
    const hash1 = Schema.decodeUnknownSync(DatumHash.HexString)(
      VALID_DATUM_HASHES[0],
    );
    const hash2 = Schema.decodeUnknownSync(DatumHash.HexString)(
      VALID_DATUM_HASHES[0],
    );
    const hash3 = Schema.decodeUnknownSync(DatumHash.HexString)(
      VALID_DATUM_HASHES[1],
    );

    expect(DatumOption.equals(hash1, hash2)).toBe(true);
    expect(DatumOption.equals(hash1, hash3)).toBe(false);
  });

  it("should check InlineDatum equality", () => {
    const inline1 = new DatumOption.InlineDatum({
      data: VALID_INLINE_DATA[0],
    });
    const inline2 = new DatumOption.InlineDatum({
      data: VALID_INLINE_DATA[0],
    });
    const inline3 = new DatumOption.InlineDatum({
      data: VALID_INLINE_DATA[1],
    });

    expect(DatumOption.equals(inline1, inline2)).toBe(true);
    expect(DatumOption.equals(inline1, inline3)).toBe(false);
  });

  it("should check different datum variant equality correctly", () => {
    const datumHash = Schema.decodeUnknownSync(DatumHash.HexString)(
      VALID_DATUM_HASHES[0],
    );
    const inlineDatum = new DatumOption.InlineDatum({
      data: VALID_INLINE_DATA[0],
    });

    expect(DatumOption.equals(datumHash, inlineDatum)).toBe(false);
  });
});
