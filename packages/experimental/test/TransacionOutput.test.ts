import { describe, expect, it } from "vitest";
import { Schema } from "effect";
import * as TransactionOutput from "../src/TransactionOutput.js";
import * as ShelleyTransactionOutput from "../src/ShelleyTransactionOutput.js";
import * as BabbageTransactionOutput from "../src/BabbageTransactionOutput.js";
import * as Address from "../src/Address.js";
import * as DatumOption from "../src/DatumOption.js";
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

// Sample inline datum data for testing
const VALID_INLINE_DATA = [
  new Uint8Array([0x01, 0x02, 0x03]),
  new Uint8Array([
    0xa1, 0x65, 0x68, 0x65, 0x6c, 0x6c, 0x6f, 0x65, 0x77, 0x6f, 0x72, 0x6c,
    0x64,
  ]),
  new Uint8Array([0x83, 0x01, 0x02, 0x03]),
];

/**
 * Tests for the TransactionOutput functionality -
 * focusing on transaction output validation, equality, and serialization
 */
describe("TransactionOutput Validation", () => {
  it.each(VALID_ADDRESSES.map((addr) => [addr]))(
    "should validate ShelleyTransactionOutput as valid TransactionOutput: %s",
    (addressBech32) => {
      const address = Schema.decodeUnknownSync(Address.Bech32Schema)(
        addressBech32,
      );
      const shelleyOutput =
        new ShelleyTransactionOutput.ShelleyTransactionOutput({
          address,
          value: 1000000n,
          datumHash: undefined,
        });

      expect(TransactionOutput.isTransactionOutput(shelleyOutput)).toBe(true);
      expect(shelleyOutput._tag).toBe("ShelleyTransactionOutput");
    },
  );

  it.each(VALID_ADDRESSES.map((addr) => [addr]))(
    "should validate BabbageTransactionOutput as valid TransactionOutput: %s",
    (addressBech32) => {
      const address = Schema.decodeUnknownSync(Address.Bech32Schema)(
        addressBech32,
      );
      const babbageOutput =
        new BabbageTransactionOutput.BabbageTransactionOutput({
          address,
          value: 2000000n,
          datumOption: undefined,
          scriptRef: undefined,
        });

      expect(TransactionOutput.isTransactionOutput(babbageOutput)).toBe(true);
      expect(babbageOutput._tag).toBe("BabbageTransactionOutput");
    },
  );

  it.each(VALID_DATUM_HASHES.map((hash) => [hash]))(
    "should validate BabbageTransactionOutput with DatumHash: %s",
    (hashString) => {
      const address = Schema.decodeUnknownSync(Address.Bech32Schema)(
        VALID_ADDRESSES[0],
      );
      const datumHash = Schema.decodeUnknownSync(DatumHash.HexString)(
        hashString,
      );
      const babbageOutput =
        new BabbageTransactionOutput.BabbageTransactionOutput({
          address,
          value: 3000000n,
          datumOption: datumHash,
          scriptRef: new Uint8Array([0xde, 0xad, 0xbe, 0xef]),
        });

      expect(TransactionOutput.isTransactionOutput(babbageOutput)).toBe(true);
      expect(babbageOutput.datumOption).toEqual(datumHash);
    },
  );

  it.each(VALID_INLINE_DATA.map((data) => [data]))(
    "should validate BabbageTransactionOutput with InlineDatum",
    (data) => {
      const address = Schema.decodeUnknownSync(Address.Bech32Schema)(
        VALID_ADDRESSES[0],
      );
      const inlineDatum = new DatumOption.InlineDatum({ data });
      const babbageOutput =
        new BabbageTransactionOutput.BabbageTransactionOutput({
          address,
          value: 4000000n,
          datumOption: inlineDatum,
          scriptRef: undefined,
        });

      expect(TransactionOutput.isTransactionOutput(babbageOutput)).toBe(true);
      expect(babbageOutput.datumOption).toEqual(inlineDatum);
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

    const shelleyOutput1 =
      new ShelleyTransactionOutput.ShelleyTransactionOutput({
        address: address1,
        value: 1000000n,
        datumHash: undefined,
      });

    const shelleyOutput2 =
      new ShelleyTransactionOutput.ShelleyTransactionOutput({
        address: address2,
        value: 1000000n,
        datumHash: undefined,
      });

    const shelleyOutput3 =
      new ShelleyTransactionOutput.ShelleyTransactionOutput({
        address: address3,
        value: 2000000n,
        datumHash: undefined,
      });

    const babbageOutput = new BabbageTransactionOutput.BabbageTransactionOutput(
      {
        address: address1,
        value: 1000000n,
        datumOption: undefined,
        scriptRef: undefined,
      },
    );

    expect(TransactionOutput.equals(shelleyOutput1, shelleyOutput2)).toBe(true);
    expect(TransactionOutput.equals(shelleyOutput1, shelleyOutput3)).toBe(
      false,
    );
    expect(TransactionOutput.equals(shelleyOutput1, babbageOutput)).toBe(false);
  });
});
