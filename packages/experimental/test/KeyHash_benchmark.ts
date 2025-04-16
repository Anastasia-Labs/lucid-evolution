import { Bench } from "tinybench";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";
import * as KeyHash from "../src/KeyHash.js";
import { Effect, pipe } from "effect";

const bench = new Bench({ time: 1000 });

bench.add("Evolution 2.0 - KeyHash", () => {
  const cborHex = "c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f";
  const a = KeyHash.makeOrThrow(cborHex);
  const b = KeyHash.toBytes(a);
  const c = KeyHash.fromBytesOrThrow(b);
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
  const cborHex = "c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f";
  pipe(
    KeyHash.make(cborHex),
    Effect.map((a) => KeyHash.toBytes(a)),
    Effect.flatMap((b) => KeyHash.fromBytes(b)),
    Effect.runSync,
  );
});

await bench.run();

console.table(bench.table());

function formatOpsPerSec(n: number): string {
  if (n >= 1_000_000_000) return `~${(n / 1_000_000_000).toFixed(1)}B ops/sec`;
  if (n >= 1_000_000) return `~${(n / 1_000_000).toFixed(1)}M ops/sec`;
  if (n >= 1_000) return `~${(n / 1_000).toFixed(1)}K ops/sec`;
  return `${n.toFixed(0)} ops/sec`;
}

for (const task of bench.tasks) {
  const throughput = task.result?.hz ?? 0;
  console.log(
    `${task.name.padEnd(50)} | ${formatOpsPerSec(throughput).padEnd(14)} | ±${task.result?.rme.toFixed(2)}%`,
  );
}

// console.log(
//   KeyHash.makeOrThrow(
//     "c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f"
//   )
// );
// const bytes = new Uint8Array([
//   0xc3, 0x7b, 0x1b, 0x5d, 0xc0, 0x66, 0x9f, 0x1d, 0x3c, 0x61, 0xa6, 0xfd, 0xdb,
//   0x2e, 0x8f, 0xde, 0x96, 0xbe, 0x87, 0xb8, 0x81, 0xc6, 0x0b, 0xce, 0x8e, 0x8d,
//   0x54, 0x2f,
// ]);

// try {
//   // console.log(Effect.runSync(KeyHash.fromBytes(new Uint8Array([1, 2, 3]))));
//   // console.log(Effect.runSync(KeyHash.fromBytes("aa2f")));
//   // console.log(
//   //   "KeyHash toCBOR",
//   //   KeyHash.toCBORBytes(
//   //     KeyHash.makeOrThrow(
//   //       "c37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d542f"
//   //     )
//   //   )
//   // );
//   // console.log(
//   //   "KeyHash fromCBOROrThrow",
//   //   KeyHash.fromCBOROrThrow(
//   //     "581ac37b1b5dc0669f1d3c61a6fddb2e8fde96be87b881c60bce8e8d54"
//   //   )
//   // );
//   console.log(
//     KeyHash.fromCBORBytesOrThrow(
//       // new Uint8Array([
//       //   195, 123, 27, 93, 192, 102, 159, 29, 60, 97, 166, 253, 219, 46, 143,
//       //   222, 150, 190, 135, 184, 129, 198, 11, 206, 142, 141, 84, 47,
//       // ])
//       new Uint8Array([
//         88, 28, 195, 123, 27, 93, 192, 102, 159, 29, 60, 97, 166, 253, 219, 46,
//         143, 222, 150, 190, 135, 184, 129, 198, 11, 206, 142, 141, 84, 47,
//       ])
//     )
//   );
// } catch (error) {
//   console.log((error as Error).message);
// }

// // try {
// //   const a = Ed25519KeyHash.fromRawBytesUnsafe(new Uint8Array([1, 2, 3]));
// //   console.log(a)

// // } catch (error) {
// //   console.log(error.message);
// // }
