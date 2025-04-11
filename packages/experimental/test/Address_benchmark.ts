import { Effect, Micro } from "effect";
import * as AddressNew from "../src/Address.js";
import * as Address from "../src/Address_old.js";
import { CML } from "../src/index.js";
import * as CMLOld from "@anastasia-labs/cardano-multiplatform-lib-nodejs";
import { Bench } from "tinybench";
import { address } from "../src/CML/AlonzoFormatTxOut.js";

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
  bench.add("addressDetailsFromBech32 - all addresses", () => {
    for (const addr of testAddresses) {
      Effect.runSync(AddressNew.addressDetailsFromBech32(addr));
    }
  });

  bench.add("getAddressDetails - all addresses", () => {
    for (const addr of testAddresses) {
      Address.getAddressDetails(addr);
    }
  });

  // Add benchmarks comparing Address and CML address encoding/decoding
  bench.add("Address encoding - all addresses", () => {
    for (const addr of testAddresses.slice(0, 6)) {
      // Skip stake addresses
      const addressInfo = AddressNew.fromBech32(addr).pipe(
        Effect.flatMap((address) => AddressNew.toBech32(address)),
      );
      Effect.runSync(addressInfo);
    }
  });

  bench.add("CML encoding - all addresses", () => {
    for (const addr of testAddresses.slice(0, 6)) {
      // Skip stake addresses
      const cmlAddress = CML.Address.fromBech32(addr).pipe(
        Effect.map((address) => address.to_bech32()),
      );
      Effect.runSync(cmlAddress);
    }
  });

  bench.add("Address roundtrip - all addresses", () => {
    for (const addr of testAddresses.slice(0, 6)) {
      // Skip stake addresses - Using pipe for cleaner effect composition
      const addressInfo = AddressNew.fromBech32(addr).pipe(
        Effect.flatMap((address) => AddressNew.toBech32(address)),
      );
      Effect.runSync(addressInfo);
    }
  });

  bench.add("CML.Address roundtrip - all addresses", () => {
    for (const addr of testAddresses.slice(0, 6)) {
      // Skip stake addresses - Using direct CML API with non-Effect based approach
      CMLOld.Address.from_bech32(addr).to_bech32();
    }
  });

  // Add benchmarks for individual address types
  const addressTypes = ["base", "enterprise", "pointer", "stake"] as const;

  for (const type of addressTypes) {
    const mainnetAddr = getAddressByType(type, "mainnet");
    const testnetAddr = getAddressByType(type, "testnet");

    bench.add(`addressDetailsFromBech32 - ${type} address`, () => {
      Effect.runSync(AddressNew.addressDetailsFromBech32(mainnetAddr));
      Effect.runSync(AddressNew.addressDetailsFromBech32(testnetAddr));
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
    (t) => t.name === "addressDetailsFromBech32 - all addresses",
  )!.result;
  const addressDetailsResult = bench.tasks.find(
    (t) => t.name === "getAddressDetails - all addresses",
  )!.result;

  if (addressTypeResult && addressDetailsResult) {
    console.log(`\nAddress parsing performance comparison:`);

    // Use throughput.mean which is the correct metric (operations per second)
    if (
      addressTypeResult.throughput.mean > addressDetailsResult.throughput.mean
    ) {
      const speedup =
        addressTypeResult.throughput.mean /
        addressDetailsResult.throughput.mean;
      console.log(
        `addressDetailsFromString is ${speedup.toFixed(2)}x faster than getAddressDetails`,
      );
    } else {
      const speedup =
        addressDetailsResult.throughput.mean /
        addressTypeResult.throughput.mean;
      console.log(
        `getAddressDetails is ${speedup.toFixed(2)}x faster than addressDetailsFromString`,
      );
    }
  }

  // Print comparison between Address and CML encoding
  const addressEncodingResult = bench.tasks.find(
    (t) => t.name === "Address encoding - all addresses",
  )!.result;
  const cmlEncodingResult = bench.tasks.find(
    (t) => t.name === "CML encoding - all addresses",
  )!.result;

  if (addressEncodingResult && cmlEncodingResult) {
    console.log(`\nAddress encoding performance comparison:`);

    if (
      addressEncodingResult.throughput.mean > cmlEncodingResult.throughput.mean
    ) {
      const speedup =
        addressEncodingResult.throughput.mean /
        cmlEncodingResult.throughput.mean;
      console.log(
        `Address encoding is ${speedup.toFixed(2)}x faster than CML encoding`,
      );
    } else {
      const speedup =
        cmlEncodingResult.throughput.mean /
        addressEncodingResult.throughput.mean;
      console.log(
        `CML encoding is ${speedup.toFixed(2)}x faster than Address encoding`,
      );
    }
  }

  // Print comparison between Address and CML roundtrip
  const addressRoundtripResult = bench.tasks.find(
    (t) => t.name === "Address roundtrip - all addresses",
  )!.result;
  const cmlRoundtripResult = bench.tasks.find(
    (t) => t.name === "CML.Address roundtrip - all addresses",
  )!.result;

  if (addressRoundtripResult && cmlRoundtripResult) {
    console.log(`\nAddress roundtrip performance comparison:`);

    if (
      addressRoundtripResult.throughput.mean >
      cmlRoundtripResult.throughput.mean
    ) {
      const speedup =
        addressRoundtripResult.throughput.mean /
        cmlRoundtripResult.throughput.mean;
      console.log(
        `Address roundtrip is ${speedup.toFixed(2)}x faster than CML roundtrip`,
      );
    } else {
      const speedup =
        cmlRoundtripResult.throughput.mean /
        addressRoundtripResult.throughput.mean;
      console.log(
        `CML roundtrip is ${speedup.toFixed(2)}x faster than Address roundtrip`,
      );
    }
  }
};

// Run the benchmarks
runBenchmarks().catch(console.error);
