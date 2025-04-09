import { Effect } from "effect";
import * as AddressNew from "../src/Address.js";
import * as Address from "../src/Address_old.js";
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
const runBenchmarks = async () => {
  const bench = new Bench({ time: 1000 });

  // Sample addresses to test with - one of each type from both networks
  const testAddresses = [
    // Base address - mainnet and testnet
    getAddressByType("base", "mainnet"),
    getAddressByType("base", "testnet"),
    // Enterprise address - mainnet and testnet
    getAddressByType("enterprise", "mainnet"),
    getAddressByType("enterprise", "testnet"),
    // Pointer address - mainnet and testnet
    getAddressByType("pointer", "mainnet"),
    getAddressByType("pointer", "testnet"),
    // Stake address - mainnet and testnet
    getAddressByType("stake", "mainnet"),
    getAddressByType("stake", "testnet"),
  ];

  // Add benchmark tasks for each function across all test addresses
  bench.add("getAddressType - all addresses", () => {
    for (const addr of testAddresses) {
      Effect.runSync(AddressNew.fromBech32(addr as AddressNew.PaymentAddress));
    }
  });

  bench.add("getAddressDetails - all addresses", () => {
    for (const addr of testAddresses) {
      Address.getAddressDetails(addr);
    }
  });

  // Add benchmarks for individual address types
  const addressTypes = ["base", "enterprise", "pointer", "stake"] as const;

  for (const type of addressTypes) {
    const mainnetAddr = getAddressByType(type, "mainnet");
    const testnetAddr = getAddressByType(type, "testnet");

    bench.add(`getAddressType - ${type} address`, () => {
      Effect.runSync(
        AddressNew.addressDetailsFromBech32(
          mainnetAddr as AddressNew.PaymentAddress,
        ),
      );
      Effect.runSync(
        AddressNew.addressDetailsFromBech32(
          testnetAddr as AddressNew.PaymentAddress,
        ),
      );
    });

    bench.add(`getAddressDetails - ${type} address`, () => {
      Address.getAddressDetails(mainnetAddr);
      Address.getAddressDetails(testnetAddr);
    });
  }

  console.log("Running address parsing benchmarks...");
  await bench.run();

  // Print results
  console.table(bench.table());

  // Print comparison between the two main functions
  const addressTypeResult = bench.tasks.find(
    (t) => t.name === "getAddressType - all addresses",
  )!.result;
  const addressDetailsResult = bench.tasks.find(
    (t) => t.name === "getAddressDetails - all addresses",
  )!.result;

  if (addressTypeResult && addressDetailsResult) {
    console.log(`\nPerformance comparison:`);

    // Use throughput.mean which is the correct metric (operations per second)
    if (
      addressTypeResult.throughput.mean > addressDetailsResult.throughput.mean
    ) {
      const speedup =
        addressTypeResult.throughput.mean /
        addressDetailsResult.throughput.mean;
      console.log(
        `getAddressType is ${speedup.toFixed(2)}x faster than getAddressDetails`,
      );
    } else {
      const speedup =
        addressDetailsResult.throughput.mean /
        addressTypeResult.throughput.mean;
      console.log(
        `getAddressDetails is ${speedup.toFixed(2)}x faster than getAddressType`,
      );
    }
  }
};

// Run the benchmarks
runBenchmarks().catch(console.error);
