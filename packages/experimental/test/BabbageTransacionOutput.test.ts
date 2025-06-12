import { describe, expect, it } from "vitest";
import { Schema } from "effect";
import * as BabbageTransactionOutput from "../src/BabbageTransactionOutput.js";
import * as Address from "../src/Address.js";
import * as DatumOption from "../src/DatumOption.js";
import * as DatumHash from "../src/DatumHash.js"; // Needed for decoding datum hashes

// Sample addresses for testing
const VALID_ADDRESSES = [
  "addr1qx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3n0d3vllmyqwsx5wktcd8cc3sq835lu7drv2xwl2wywfgse35a3x",
  "addr1vx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzers66hrl8",
  "addr_test1qz2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3n0d3vllmyqwsx5wktcd8cc3sq835lu7drv2xwl2wywfgs68faae",
];

// Sample datum hashes for testing
const VALID_DATUM_HASHES = [
  "5160f88b929bf8a6c57c285b889488f9137c0ef3cfd0bcf408a10020e69146d5",
  "bfd6dd1e96e4fd26c6379aa3093aaef25639d58ee76d045bd4528ef9f2fed808", // Added for more variety
  "0b6fc2971960699b021e408e37027da1fdb3f9278270c44916dc1ddfb5778518", // Added for more variety
];

// Sample inline datum data for testing
const VALID_INLINE_DATA = [
  new Uint8Array([0x01, 0x02, 0x03]),
  new Uint8Array([
    0xa1, 0x65, 0x68, 0x65, 0x6c, 0x6c, 0x6f, 0x65, 0x77, 0x6f, 0x72, 0x6c,
    0x64,
  ]), // CBOR: {"hello": "world"}
  new Uint8Array([0x83, 0x01, 0x02, 0x03]), // CBOR: [1, 2, 3]
];

// Sample script references for testing
const VALID_SCRIPT_REFS = [
  new Uint8Array([0x59, 0x01, 0x00]),
  new Uint8Array([0x82, 0x01, 0x45, 0x01, 0x02, 0x03, 0x04, 0x05]), // Added for more variety
  new Uint8Array([0x83, 0x02, 0x58, 0x20]), // Added for more variety
];

/**
 * Interface for a BabbageTransactionOutput creation test case.
 */
interface BabbageOutputCreationCase {
  name: string;
  addressBech32: string;
  value: bigint;
  datumOption?: DatumOption.DatumOption; // Can be DatumHash or InlineDatum
  scriptRef?: Uint8Array;
}

/**
 * Array of valid BabbageTransactionOutput creation test cases.
 */
const VALID_BABBAGE_OUTPUT_CREATION_CASES: BabbageOutputCreationCase[] = [
  {
    name: "basic output (address, value only)",
    addressBech32: VALID_ADDRESSES[0],
    value: 1000000n,
    datumOption: undefined,
    scriptRef: undefined,
  },
  {
    name: "output with datum hash",
    addressBech32: VALID_ADDRESSES[0],
    value: 1000000n,
    datumOption: Schema.decodeUnknownSync(DatumHash.HexString)(
      VALID_DATUM_HASHES[0],
    ),
    scriptRef: undefined,
  },
  {
    name: "output with inline datum",
    addressBech32: VALID_ADDRESSES[0],
    value: 1000000n,
    datumOption: new DatumOption.InlineDatum({ data: VALID_INLINE_DATA[0] }),
    scriptRef: undefined,
  },
  {
    name: "output with script reference",
    addressBech32: VALID_ADDRESSES[0],
    value: 1000000n,
    datumOption: undefined,
    scriptRef: VALID_SCRIPT_REFS[0],
  },
  {
    name: "output with datum hash and script reference",
    addressBech32: VALID_ADDRESSES[1],
    value: 2000000n,
    datumOption: Schema.decodeUnknownSync(DatumHash.HexString)(
      VALID_DATUM_HASHES[1],
    ),
    scriptRef: VALID_SCRIPT_REFS[1],
  },
  {
    name: "output with inline datum and script reference",
    addressBech32: VALID_ADDRESSES[2],
    value: 3000000n,
    datumOption: new DatumOption.InlineDatum({ data: VALID_INLINE_DATA[2] }),
    scriptRef: VALID_SCRIPT_REFS[2],
  },
];

/**
 * Tests for the BabbageTransactionOutput functionality -
 * focusing on transaction output creation, validation, and equality.
 */
describe("BabbageTransactionOutput Validation", () => {
  // Consolidated test for creating various valid BabbageTransactionOutput instances
  it.each(VALID_BABBAGE_OUTPUT_CREATION_CASES)(
    "should create valid BabbageTransactionOutput for: $name",
    ({ addressBech32, value, datumOption, scriptRef }) => {
      const address = Schema.decodeUnknownSync(Address.Bech32Schema)(
        addressBech32,
      );
      const output = new BabbageTransactionOutput.BabbageTransactionOutput({
        address,
        value,
        datumOption,
        scriptRef,
      });

      expect(output._tag).toBe("BabbageTransactionOutput");
      expect(output.address).toEqual(address);
      expect(output.value).toBe(value);
      expect(output.datumOption).toEqual(datumOption);
      expect(output.scriptRef).toEqual(scriptRef);
      expect(BabbageTransactionOutput.isBabbageTransactionOutput(output)).toBe(
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
    ); // Same as address1
    const address3 = Schema.decodeUnknownSync(Address.Bech32Schema)(
      VALID_ADDRESSES[1],
    ); // Different address

    const datumHash1 = Schema.decodeUnknownSync(DatumHash.HexString)(
      VALID_DATUM_HASHES[0],
    );
    const datumHash2 = Schema.decodeUnknownSync(DatumHash.HexString)(
      VALID_DATUM_HASHES[0],
    ); // Same as datumHash1
    const datumHash3 = Schema.decodeUnknownSync(DatumHash.HexString)(
      VALID_DATUM_HASHES[1],
    ); // Different datum hash

    const scriptRef1 = VALID_SCRIPT_REFS[0];
    const scriptRef2 = VALID_SCRIPT_REFS[0]; // Same as scriptRef1
    const scriptRef3 = VALID_SCRIPT_REFS[1]; // Different script ref

    // Identical outputs
    const output1 = new BabbageTransactionOutput.BabbageTransactionOutput({
      address: address1,
      value: 1000000n,
      datumOption: datumHash1,
      scriptRef: scriptRef1,
    });

    const output2 = new BabbageTransactionOutput.BabbageTransactionOutput({
      address: address2,
      value: 1000000n,
      datumOption: datumHash2,
      scriptRef: scriptRef2,
    });

    // Different output
    const output3 = new BabbageTransactionOutput.BabbageTransactionOutput({
      address: address3, // Different
      value: 2000000n, // Different
      datumOption: datumHash3, // Different
      scriptRef: scriptRef3, // Different
    });

    // Output with only address and value (for comparison with more complex ones)
    const outputSimple1 = new BabbageTransactionOutput.BabbageTransactionOutput(
      {
        address: address1,
        value: 1000000n,
      },
    );

    const outputSimple2 = new BabbageTransactionOutput.BabbageTransactionOutput(
      {
        address: address1,
        value: 2000000n, // Different value
      },
    );

    expect(BabbageTransactionOutput.equals(output1, output2)).toBe(true);
    expect(BabbageTransactionOutput.equals(output1, output3)).toBe(false);
    expect(BabbageTransactionOutput.equals(output1, outputSimple1)).toBe(false); // Different datum/script
    expect(BabbageTransactionOutput.equals(outputSimple1, outputSimple2)).toBe(
      false,
    );
  });
});
