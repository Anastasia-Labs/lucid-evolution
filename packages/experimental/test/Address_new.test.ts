import { expect, describe, it } from "vitest";
import { Effect } from "effect";
import * as Address from "../src/Address.js";
import * as AddressOld from "../src/Address_old.js";
import { CML } from "../src/index.js";

// Sample addresses for testing - organized by network and type as arrays with comments
// MAINNET ADDRESSES
const MAINNET_ADDRESSES = [
  // Base addresses (payment key hash + stake key hash) - type 0
  "addr1qx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3n0d3vllmyqwsx5wktcd8cc3sq835lu7drv2xwl2wywfgse35a3x",
  // Base addresses (payment script hash + stake key hash) - type 1
  "addr1z8phkx6acpnf78fuvxn0mkew3l0fd058hzquvz7w36x4gten0d3vllmyqwsx5wktcd8cc3sq835lu7drv2xwl2wywfgs9yc0hh",
  // Base addresses (payment key hash + stake script hash) - type 2
  "addr1yx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzerkr0vd4msrxnuwnccdxlhdjar77j6lg0wypcc9uar5d2shs2z78ve",
  // Base addresses (payment script hash + stake script hash) - type 3
  "addr1x8phkx6acpnf78fuvxn0mkew3l0fd058hzquvz7w36x4gt7r0vd4msrxnuwnccdxlhdjar77j6lg0wypcc9uar5d2shskhj42g",
  // Pointer addresses (payment key hash + pointer) - type 4
  "addr1gx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer5pnz75xxcrzqf96k",
  // Pointer addresses (payment script hash + pointer) - type 5
  "addr128phkx6acpnf78fuvxn0mkew3l0fd058hzquvz7w36x4gtupnz75xxcrtw79hu",
  // Enterprise addresses (payment key hash only) - type 6
  "addr1vx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzers66hrl8",
  // Enterprise addresses (payment script hash only) - type 7
  "addr1w8phkx6acpnf78fuvxn0mkew3l0fd058hzquvz7w36x4gtcyjy7wx",
  // Reward addresses (stake key hash) - type 14
  "stake1uyehkck0lajq8gr28t9uxnuvgcqrc6070x3k9r8048z8y5gh6ffgw",
  // Reward addresses (stake script hash) - type 15
  "stake178phkx6acpnf78fuvxn0mkew3l0fd058hzquvz7w36x4gtcccycj5",
];

// TESTNET ADDRESSES
const TESTNET_ADDRESSES = [
  // Base addresses (payment key hash + stake key hash) - type 0
  "addr_test1qz2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3n0d3vllmyqwsx5wktcd8cc3sq835lu7drv2xwl2wywfgs68faae",
  // Base addresses (payment script hash + stake key hash) - type 1
  "addr_test1zrphkx6acpnf78fuvxn0mkew3l0fd058hzquvz7w36x4gten0d3vllmyqwsx5wktcd8cc3sq835lu7drv2xwl2wywfgsxj90mg",
  // Base addresses (payment key hash + stake script hash) - type 2
  "addr_test1yz2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzerkr0vd4msrxnuwnccdxlhdjar77j6lg0wypcc9uar5d2shsf5r8qx",
  // Base addresses (payment script hash + stake script hash) - type 3
  "addr_test1xrphkx6acpnf78fuvxn0mkew3l0fd058hzquvz7w36x4gt7r0vd4msrxnuwnccdxlhdjar77j6lg0wypcc9uar5d2shs4p04xh",
  // Pointer addresses (payment key hash + pointer) - type 4
  "addr_test1gz2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer5pnz75xxcrdw5vky",
  // Pointer addresses (payment script hash + pointer) - type 5
  "addr_test12rphkx6acpnf78fuvxn0mkew3l0fd058hzquvz7w36x4gtupnz75xxcryqrvmw",
  // Enterprise addresses (payment key hash only) - type 6
  "addr_test1vz2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzerspjrlsz",
  // Enterprise addresses (payment script hash only) - type 7
  "addr_test1wrphkx6acpnf78fuvxn0mkew3l0fd058hzquvz7w36x4gtcl6szpr",
  // Reward addresses (stake key hash) - type 14
  "stake_test1uqehkck0lajq8gr28t9uxnuvgcqrc6070x3k9r8048z8y5gssrtvn",
  // Reward addresses (stake script hash) - type 15
  "stake_test17rphkx6acpnf78fuvxn0mkew3l0fd058hzquvz7w36x4gtcljw6kf",
];

// Combine all addresses for tests that need to check all
const ALL_ADDRESSES = [...MAINNET_ADDRESSES, ...TESTNET_ADDRESSES];

// Other test constants
const INVALID_ADDRESS = "not-an-address";
const VALID_HEX_ADDRESS =
  "01af2ff48c27324dae7fb3116381e6d7b11f1e7ef37adce1d5e07fdde614800e78e7849bfbb5c4ad414498d57ae5ecad";

// Helper function to get specific address types from the arrays
const getAddressByType = (
  type: "base" | "pointer" | "enterprise" | "stake",
  network: "mainnet" | "testnet" = "mainnet",
  index = 0,
): string => {
  const addresses =
    network === "mainnet" ? MAINNET_ADDRESSES : TESTNET_ADDRESSES;

  switch (type) {
    case "base":
      // Base addresses are at indexes 0-3
      return addresses[index % 4];
    case "pointer":
      // Pointer addresses are at indexes 4-5
      return addresses[4 + (index % 2)];
    case "enterprise":
      // Enterprise addresses are at indexes 6-7
      return addresses[6 + (index % 2)];
    case "stake":
      // Stake addresses are at indexes 8-9
      return addresses[8 + (index % 2)];
    default:
      return addresses[0];
  }
};

describe("Address Validation", () => {});

describe("Address Conversion", () => {});

describe("Address Information Extraction", () => {
  it("should extract address details from a valid Bech32 address", () =>
    Effect.gen(function* () {
      const address = getAddressByType("base", "mainnet");
      const result = yield* Effect.all(
        MAINNET_ADDRESSES.map((value) =>
          Address.addressDetailsFromBech32(value),
        ),
      );
      console.dir(result, { depth: 10 });

      const oldResult = AddressOld.getAddressDetails(address);
      console.dir(oldResult, { depth: 10 });

      console.log(CML.Address.fromBech32Unsafe(address).to_json());

      // const kind = Address.parseKind(
      //   yield* Address.getHeader(address as Address.PaymentAddress)
      // );
      // console.log(kind);
      // return result;
    }).pipe(Effect.runSync));
});

describe("Error Handling", () => {});
