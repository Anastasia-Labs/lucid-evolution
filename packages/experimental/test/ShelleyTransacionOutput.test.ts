import { describe, expect, it } from "vitest";
import { Schema } from "effect";
import * as ShelleyTransactionOutput from "../src/ShelleyTransactionOutput.js";
import * as Address from "../src/Address.js";
import * as DatumHash from "../src/DatumHash.js";

// Sample addresses for testing
const VALID_ADDRESSES = [
  "addr1qx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3n0d3vllmyqwsx5wktcd8cc3sq835lu7drv2xwl2wywfgse35a3x",
  "addr1vx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzers66hrl8",
  "addr_test1qz2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3n0d3vllmyqwsx5wktcd8cc3sq835lu7drv2xwl2wywfgs68faae",
];

// Sample datum hashes for testing
const VALID_DATUM_HASHES = [
  "5160f88b929bf8a6c57c285b889488f9137c0ef3cfd0bcf408a10020e69146d5",
  "bfd6dd1e96e4fd26c6379aa3093aaef25639d58ee76d045bd4528ef9f2fed808",
  "0b6fc2971960699b021e408e37027da1fdb3f9278270c44916dc1ddfb5778518",
];

/**
 * Tests for the ShelleyTransactionOutput functionality -
 * focusing on transaction output creation, validation, and serialization
 */
describe("ShelleyTransactionOutput Validation", () => {
  it.each(VALID_ADDRESSES.map((addr) => [addr]))(
    "should create valid ShelleyTransactionOutput: %s",
    (addressBech32) => {
      const address = Schema.decodeUnknownSync(Address.Bech32Schema)(
        addressBech32,
      );
      const output = new ShelleyTransactionOutput.ShelleyTransactionOutput({
        address,
        value: 1000000n,
        datumHash: undefined,
      });

      expect(output._tag).toBe("ShelleyTransactionOutput");
      expect(output.address).toEqual(address);
      expect(output.value).toBe(1000000n);
      expect(ShelleyTransactionOutput.isShelleyTransactionOutput(output)).toBe(
        true,
      );
    },
  );

  it.each(VALID_DATUM_HASHES.map((hash) => [hash]))(
    "should create valid ShelleyTransactionOutput with datum hash: %s",
    (hashString) => {
      const address = Schema.decodeUnknownSync(Address.Bech32Schema)(
        VALID_ADDRESSES[0],
      );
      const datumHash = Schema.decodeUnknownSync(DatumHash.HexString)(
        hashString,
      );
      const output = new ShelleyTransactionOutput.ShelleyTransactionOutput({
        address,
        value: 1000000n,
        datumHash,
      });

      expect(output.datumHash).toEqual(datumHash);
      expect(output.datumHash?.hash).toBe(hashString);
      expect(ShelleyTransactionOutput.isShelleyTransactionOutput(output)).toBe(
        true,
      );
    },
  );

  it("should check equality correctly", () => {
    const address1 = Schema.decodeUnknownSync(Address.Bech32Schema)(
      VALID_ADDRESSES[0],
    );
    const address2 = Schema.decodeUnknownSync(Address.Bech32Schema)(
      VALID_ADDRESSES[0],
    );
    const address3 = Schema.decodeUnknownSync(Address.Bech32Schema)(
      VALID_ADDRESSES[1],
    );

    const datumHash1 = Schema.decodeUnknownSync(DatumHash.HexString)(
      VALID_DATUM_HASHES[0],
    );
    const datumHash2 = Schema.decodeUnknownSync(DatumHash.HexString)(
      VALID_DATUM_HASHES[0],
    );
    const datumHash3 = Schema.decodeUnknownSync(DatumHash.HexString)(
      VALID_DATUM_HASHES[1],
    );

    const output1 = new ShelleyTransactionOutput.ShelleyTransactionOutput({
      address: address1,
      value: 1000000n,
      datumHash: datumHash1,
    });

    const output2 = new ShelleyTransactionOutput.ShelleyTransactionOutput({
      address: address2,
      value: 1000000n,
      datumHash: datumHash2,
    });

    const output3 = new ShelleyTransactionOutput.ShelleyTransactionOutput({
      address: address3,
      value: 2000000n,
      datumHash: datumHash3,
    });

    expect(ShelleyTransactionOutput.equals(output1, output2)).toBe(true);
    expect(ShelleyTransactionOutput.equals(output1, output3)).toBe(false);
  });

  it("should encode and decode CBORBytes correctly", () => {
    const address = Schema.decodeUnknownSync(Address.Bech32Schema)(
      VALID_ADDRESSES[0],
    );
    const datumHash = Schema.decodeUnknownSync(DatumHash.HexString)(
      VALID_DATUM_HASHES[0],
    );

    const output = new ShelleyTransactionOutput.ShelleyTransactionOutput({
      address,
      value: 1000000n,
      datumHash,
    });

    const encoded = Schema.encodeSync(ShelleyTransactionOutput.CBORBytes)(
      output,
    );
    const decoded = Schema.decodeSync(ShelleyTransactionOutput.CBORBytes)(
      encoded,
    );

    expect(decoded).toEqual(output);
    expect(ShelleyTransactionOutput.equals(decoded, output)).toBe(true);
  });

  it("should encode and decode CBORHex correctly", () => {
    const address = Schema.decodeUnknownSync(Address.Bech32Schema)(
      VALID_ADDRESSES[0],
    );
    const datumHash = Schema.decodeUnknownSync(DatumHash.HexString)(
      VALID_DATUM_HASHES[0],
    );

    const output = new ShelleyTransactionOutput.ShelleyTransactionOutput({
      address,
      value: 1000000n,
      datumHash,
    });

    const encoded = Schema.encodeSync(ShelleyTransactionOutput.CBORHex)(output);
    const decoded = Schema.decodeSync(ShelleyTransactionOutput.CBORHex)(
      encoded,
    );

    expect(typeof encoded).toBe("string");
    expect(encoded).toMatch(/^[0-9a-f]+$/i);
    expect(decoded).toEqual(output);
  });
});
