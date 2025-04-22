import { Effect } from "effect";
import * as Address from "../src/Address.js";
import * as AddressDetails from "../src/AddressDetails.js";
import * as AddressOld from "../src/old/Address_old.js";
import { Bench } from "tinybench";

// Sample addresses for testing - organized by network and type
// MAINNET ADDRESSES
const MAINNET_ADDRESSES = [
  // Base addresses (payment key hash + stake key hash) - type 0
  "addr1qx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3n0d3vllmyqwsx5wktcd8cc3sq835lu7drv2xwl2wywfgse35a3x",
  // Enterprise addresses (payment key hash only) - type 6
  "addr1vx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzers66hrl8",
  // Pointer addresses (payment key hash + pointer) - type 4
  "addr1gx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer5pnz75xxcrzqf96k",
  // Reward addresses (stake key hash) - type 14
  "stake1uyehkck0lajq8gr28t9uxnuvgcqrc6070x3k9r8048z8y5gh6ffgw",
];

// TESTNET ADDRESSES
const TESTNET_ADDRESSES = [
  // Base addresses (payment key hash + stake key hash) - type 0
  "addr_test1qz2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3n0d3vllmyqwsx5wktcd8cc3sq835lu7drv2xwl2wywfgs68faae",
  // Enterprise addresses (payment key hash only) - type 6
  "addr_test1vz2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzerspjrlsz",
  // Pointer addresses (payment key hash + pointer) - type 4
  "addr_test1gz2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer5pnz75xxcrdw5vky",
  // Reward addresses (stake key hash) - type 14
  "stake_test1uqehkck0lajq8gr28t9uxnuvgcqrc6070x3k9r8048z8y5gssrtvn",
];

// Helper function to get address by type
const getAddressByType = (
  type: "base" | "pointer" | "enterprise" | "stake",
  network: "mainnet" | "testnet" = "mainnet",
): string => {
  const addresses =
    network === "mainnet" ? MAINNET_ADDRESSES : TESTNET_ADDRESSES;

  switch (type) {
    case "base":
      return addresses[0];
    case "enterprise":
      return addresses[1];
    case "pointer":
      return addresses[2];
    case "stake":
      return addresses[3];
    default:
      return addresses[0];
  }
};

/**
 * Run benchmarks to compare the performance of address parsing functions
 */
const bench = new Bench({ time: 1000 });

// Add benchmarks for individual address types
const addressTypes = ["base", "enterprise", "pointer", "stake"] as const;

for (const type of addressTypes) {
  const mainnetAddr = getAddressByType(type, "mainnet");
  const testnetAddr = getAddressByType(type, "testnet");

  bench.add(`addressDetailsFromBech32 - ${type} address`, () => {
    Effect.runSync(AddressDetails.fromBech32(mainnetAddr));
    Effect.runSync(AddressDetails.fromBech32(testnetAddr));
  });

  bench.add(`getAddressDetails - ${type} address`, () => {
    AddressOld.getAddressDetails(mainnetAddr);
    AddressOld.getAddressDetails(testnetAddr);
  });
}

console.log("Running address parsing benchmarks...");
await bench.run();

// Print results
console.table(bench.table());
