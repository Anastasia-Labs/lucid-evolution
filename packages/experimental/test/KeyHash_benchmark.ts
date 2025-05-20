import { Bench } from "tinybench";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";
import * as KeyHash from "../src/KeyHash.js";
import { Effect, pipe } from "effect";

function formatOpsPerSec(n: number): string {
  if (n >= 1_000_000_000) return `~${(n / 1_000_000_000).toFixed(1)}B ops/sec`;
  if (n >= 1_000_000) return `~${(n / 1_000_000).toFixed(1)}M ops/sec`;
  if (n >= 1_000) return `~${(n / 1_000).toFixed(1)}K ops/sec`;
  return `${n.toFixed(0)} ops/sec`;
}

const bench = new Bench({ time: 1000 });

bench.add("Evolution 2.0 - KeyHash", () => {
  const maybeHex = "c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f";
  const a = KeyHash.decodeHexOrThrow(maybeHex);
  const b = KeyHash.toBytes(a);
  const c = KeyHash.decodeBytesOrThrow(b);
  const d = c.hash;
});

bench.add("CML - Ed25519KeyHash", () => {
  const cborHex = "c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f";
  const a = CML.Ed25519KeyHash.from_hex(cborHex);
  const b = a.to_raw_bytes();
  const c = CML.Ed25519KeyHash.from_raw_bytes(b);
  const d = c.to_hex();
});

bench.add("Evolution 2.0 - KeyHash Effect ", () => {
  const hex = "c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f";
  pipe(
    KeyHash.decodeHex(hex),
    Effect.map((a) => KeyHash.toBytes(a)),
    Effect.flatMap((b) => KeyHash.decodeBytes(b)),
    Effect.runSync,
  );
});

await bench.run();
console.table(bench.table());
for (const task of bench.tasks) {
  const throughput = task.result?.hz ?? 0;
  console.log(
    `${task.name.padEnd(50)} | ${formatOpsPerSec(throughput).padEnd(14)} | ±${task.result?.rme.toFixed(2)}%`,
  );
}

// console.log(
//   KeyHash.decodeHexOrThrow(
//     "c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f"
//   )
// );
// const bytes = new Uint8Array([
//   0xc3, 0x7b, 0x1b, 0x5d, 0xc0, 0x66, 0x9f, 0x1d, 0x3c, 0x61, 0xa6, 0xfd, 0xdb,
//   0x2e, 0x8f, 0xde, 0x96, 0xbe, 0x87, 0xb8, 0x81, 0xc6, 0x0b, 0xce, 0x8e, 0x8d,
//   0x54, 0x2f,
// ]);

try {
  // console.log(KeyHash.fromBytes(new Uint8Array([10, 2, 3])));
  // const hash = Hex.makeOrThrow(
  //   "c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f"
  // );
  // console.log(hash);
  // console.log(KeyHash.decodeHexOrThrow(hash));
  // console.log(
  //   KeyHash.toBytes(
  //     KeyHash.decodeHexOrThrow(
  //       "c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f"
  //     )
  //   )
  // );
} catch (error) {
  console.log(error as Error);
}

// // try {
// //   const a = Ed25519KeyHash.fromRawBytesUnsafe(new Uint8Array([1, 2, 3]));
// //   console.log(a)

// // } catch (error) {
// //   console.log(error.message);
// // }
