import { describe, expect, test } from "vitest";
import { Constr, Data } from "../src/data.js";
import { decodePlutusData, encodePlutusData } from "../src/data-cbor.js";
import { cmlDataFromCbor, cmlDataToCbor } from "../src/data-cml.js";

/*
  Differential tests: the JavaScript Plutus data codec against the CML codec
  it replaced, over seeded random data and random (often non-canonical)
  encodings of it.
*/

// xorshift128+ so failures reproduce.
let s0 = 0x9e3779b9n;
let s1 = 0x243f6a88n;
const MASK = (1n << 64n) - 1n;
const nextU64 = (): bigint => {
  let x = s0;
  const y = s1;
  s0 = y;
  x ^= (x << 23n) & MASK;
  s1 = x ^ y ^ (x >> 17n) ^ (y >> 26n);
  return (s1 + y) & MASK;
};
const int = (n: number) => Number(nextU64() % BigInt(n));
const pick = <T>(items: readonly T[]): T => items[int(items.length)];
const chance = (p: number) => int(1_000_000) < p * 1_000_000;

const hexOf = (length: number) => {
  let hex = "";
  for (let i = 0; i < length; i++)
    hex += int(256).toString(16).padStart(2, "0");
  return hex;
};

const P64 = 1n << 64n;
const P63 = 1n << 63n;
const EDGE_INTS = [
  0n,
  1n,
  -1n,
  23n,
  24n,
  -24n,
  -25n,
  255n,
  256n,
  65535n,
  65536n,
  0xffffffffn,
  0x100000000n,
  P63 - 1n,
  P63,
  -P63,
  -P63 - 1n,
  P64 - 1n,
  P64,
  P64 + 1n,
  -P64 + 1n,
  -P64,
  -P64 - 1n,
  1n << 512n,
  (1n << 512n) - 1n,
  -(1n << 512n),
  1n << 520n,
  -(1n << 600n),
  1n << 1000n,
];
const BYTE_LENGTHS = [0, 1, 2, 23, 24, 32, 63, 64, 65, 127, 128, 129, 200];
const CONSTR_INDICES: (number | bigint)[] = [
  0,
  1,
  6,
  7,
  8,
  100,
  127,
  128,
  129,
  255,
  256,
  1400,
  65535,
  65536,
  2 ** 32,
  2 ** 53 - 1,
  2 ** 60,
  3n,
  200n,
  P64 - 1n,
];

const randomInt = (): bigint => {
  if (chance(0.5)) return pick(EDGE_INTS);
  const bits = BigInt(1 + int(700));
  let value = 0n;
  for (let b = 0n; b < bits; b += 64n) value = (value << 64n) | nextU64();
  value &= (1n << bits) - 1n;
  return chance(0.5) ? value : -value;
};

const randomBytes = (): string => {
  const hex = hexOf(chance(0.7) ? pick(BYTE_LENGTHS) : int(300));
  return chance(0.1) ? hex.toUpperCase() : hex;
};

const randomData = (depth: number): Data => {
  const kind = depth <= 0 ? int(2) : int(5);
  switch (kind) {
    case 0:
      return randomInt();
    case 1:
      return randomBytes();
    case 2: {
      const length = chance(0.2) ? 0 : int(6);
      const list = Array.from({ length }, () => randomData(depth - 1));
      if (length > 1 && chance(0.05)) delete list[int(length)];
      return list;
    }
    case 3: {
      const length = chance(0.3) ? 0 : int(5);
      return new Constr(
        chance(0.6) ? int(10) : pick(CONSTR_INDICES),
        Array.from({ length }, () => randomData(depth - 1)),
      ) as Data;
    }
    default: {
      const map = new Map<Data, Data>();
      const size = chance(0.2) ? 0 : int(6);
      const keys: Data[] = [];
      for (let i = 0; i < size; i++) {
        // Structurally repeated keys (and bytes differing only in case)
        // exercise PlutusMap deduplication.
        const key =
          keys.length > 0 && chance(0.15)
            ? structuredCloneData(pick(keys))
            : chance(0.6)
              ? randomData(0)
              : randomData(Math.min(depth - 1, 2));
        keys.push(key);
        map.set(key, randomData(depth - 1));
      }
      return map;
    }
  }
};

const structuredCloneData = (data: Data): Data => {
  if (typeof data === "string") return chance(0.5) ? data.toUpperCase() : data;
  if (typeof data === "bigint") return data;
  if (data instanceof Constr) {
    return new Constr(data.index, data.fields.map(structuredCloneData));
  }
  if (data instanceof Array) return data.map(structuredCloneData);
  return new Map(
    [...data.entries()].map(([k, v]) => [
      structuredCloneData(k),
      structuredCloneData(v),
    ]),
  );
};

/** Order-preserving rendering for deep comparison of decoded values. */
const show = (data: unknown): string => {
  if (typeof data === "bigint") return data + "n";
  if (typeof data === "string") return JSON.stringify(data);
  if (data instanceof Constr) {
    return `C${typeof data.index}:${data.index}(${data.fields.map(show).join(",")})`;
  }
  if (data instanceof Array) return `[${data.map(show).join(",")}]`;
  if (data instanceof Map) {
    return `{${[...data.entries()].map(([k, v]) => show(k) + ":" + show(v)).join(",")}}`;
  }
  return `?${String(data)}`;
};

// --- random encodings -------------------------------------------------------

const headHex = (major: number, value: bigint, minimal: boolean): string => {
  const sizes = [
    value < 24n ? -1 : -2,
    value < 256n ? 1 : 0,
    value < 65536n ? 2 : 0,
    value < 1n << 32n ? 4 : 0,
    8,
  ].filter((size) => size !== 0);
  let size = minimal ? sizes[0] : pick(sizes);
  if (size === -2) size = sizes[1];
  if (size === -1) {
    return ((major << 5) | Number(value)).toString(16).padStart(2, "0");
  }
  const info = { 1: 24, 2: 25, 4: 26, 8: 27 }[size as 1 | 2 | 4 | 8];
  return (
    ((major << 5) | info).toString(16).padStart(2, "0") +
    value.toString(16).padStart(size * 2, "0")
  );
};

const randomBytesEncoding = (hex: string): string => {
  const length = hex.length / 2;
  if (length <= 64 && chance(0.6)) {
    return headHex(2, BigInt(length), chance(0.7)) + hex;
  }
  let out = "5f";
  let i = 0;
  while (i < hex.length) {
    const chunk = 2 * (1 + int(64));
    const part = hex.slice(i, i + chunk);
    out += headHex(2, BigInt(part.length / 2), chance(0.7)) + part;
    i += chunk;
  }
  if (chance(0.2)) out += headHex(2, 0n, true);
  return out + "ff";
};

const randomListEncoding = (items: string[], major = 4): string =>
  (items.length === 0 && chance(0.5)) || chance(0.5)
    ? headHex(
        major,
        BigInt(items.length / (major === 5 ? 2 : 1)),
        chance(0.7),
      ) + items.join("")
    : (major === 4 ? "9f" : "bf") + items.join("") + "ff";

const randomEncoding = (data: Data): string => {
  if (typeof data === "bigint") {
    const magnitude = data >= 0n ? data : -1n - data;
    if (magnitude < P64 && chance(0.8)) {
      return headHex(data >= 0n ? 0 : 1, magnitude, chance(0.6));
    }
    let hex = magnitude === 0n ? "" : magnitude.toString(16);
    if (hex.length % 2) hex = "0" + hex;
    if (chance(0.3)) hex = "00" + hex;
    return (data >= 0n ? "c2" : "c3") + randomBytesEncoding(hex);
  }
  if (typeof data === "string") return randomBytesEncoding(data.toLowerCase());
  if (data instanceof Constr) {
    const index = BigInt(data.index);
    const fields = randomListEncoding(data.fields.map(randomEncoding));
    if (index <= 6n && chance(0.8)) {
      return headHex(6, 121n + index, chance(0.8)) + fields;
    }
    if (index >= 7n && index <= 127n && chance(0.8)) {
      return headHex(6, 1280n + index - 7n, chance(0.8)) + fields;
    }
    const indefinite = chance(0.5);
    return (
      headHex(6, 102n, chance(0.8)) +
      (indefinite ? "9f" : "82") +
      headHex(0, index, chance(0.7)) +
      fields +
      (indefinite ? "ff" : "")
    );
  }
  if (data instanceof Array) {
    return randomListEncoding(data.map(randomEncoding));
  }
  const parts: string[] = [];
  for (const [k, v] of data.entries())
    parts.push(randomEncoding(k), randomEncoding(v));
  return randomListEncoding(parts, 5);
};

const outcome = (run: () => unknown): string => {
  try {
    return "ok " + show(run());
  } catch (error) {
    return "error " + (error as Error).message;
  }
};

describe("Plutus data codec parity with CML", () => {
  const SAMPLES = 3000;
  const samples = Array.from({ length: SAMPLES }, (_, i) =>
    randomData(1 + (i % 5)),
  );

  test("encodes random data byte for byte, in both formats", () => {
    let mapsWithRepeats = 0;
    for (const data of samples) {
      for (const canonical of [false, true]) {
        const expected = cmlDataToCbor(data, canonical);
        expect(encodePlutusData(data, canonical), show(data)).toBe(expected);
        expect(Data.to(data, undefined, { canonical })).toBe(expected);
      }
      if (data instanceof Map && data.size > 0) mapsWithRepeats++;
    }
    expect(mapsWithRepeats).toBeGreaterThan(100);
  });

  test("decodes canonical and node encodings to identical values", () => {
    let declined = 0;
    for (const data of samples) {
      for (const canonical of [false, true]) {
        const cbor = cmlDataToCbor(data, canonical);
        const expected = show(cmlDataFromCbor(cbor));
        const decoded = decodePlutusData(cbor);
        // Declined only for maps with keys CML would look up ambiguously.
        if (decoded === undefined) declined++;
        else expect(show(decoded), cbor).toBe(expected);
        expect(show(Data.from(cbor))).toBe(expected);
      }
    }
    expect(declined).toBeLessThan(SAMPLES * 2 * 0.01);
  });

  test("decodes random non-canonical encodings to identical values", () => {
    let declined = 0;
    let decoded = 0;
    for (const data of samples) {
      for (let round = 0; round < 3; round++) {
        const cbor = chance(0.1)
          ? randomEncoding(data).toUpperCase()
          : randomEncoding(data);
        const expected = outcome(() => cmlDataFromCbor(cbor));
        const actual = decodePlutusData(cbor);
        if (actual === undefined) {
          declined++;
          if (process.env.SHOW_DECLINED) console.log("declined", cbor);
        } else {
          decoded++;
          // Never accept what CML rejects, never decode differently.
          expect("ok " + show(actual), cbor).toBe(expected);
        }
        expect(
          outcome(() => Data.from(cbor)),
          cbor,
        ).toBe(expected);
      }
    }
    // Declines are limited to maps with repeated keys and similar oddities.
    expect(decoded).toBeGreaterThan(declined * 4);
  });

  test("matches CML on corrupted and truncated input", () => {
    for (const data of samples.slice(0, 1500)) {
      const cbor = randomEncoding(data);
      const variants = [
        cbor.slice(0, Math.max(0, cbor.length - 2 * (1 + int(4)))),
        cbor + hexOf(1 + int(3)),
        cbor.slice(0, cbor.length - 1),
      ];
      const at = 2 * int(cbor.length / 2);
      variants.push(cbor.slice(0, at) + hexOf(1) + cbor.slice(at + 2));
      for (const variant of variants) {
        const expected = outcome(() => cmlDataFromCbor(variant));
        const actual = decodePlutusData(variant);
        if (actual !== undefined) {
          expect("ok " + show(actual), variant).toBe(expected);
        }
        expect(
          outcome(() => Data.from(variant)),
          variant,
        ).toBe(expected);
      }
    }
  });

  test("edge cases", () => {
    const cases: Data[] = [
      [],
      new Map(),
      "",
      "ab".repeat(64),
      "ab".repeat(65),
      "AB".repeat(65),
      ...EDGE_INTS,
      ...CONSTR_INDICES.map((index) => new Constr(index as number, [])),
      ...CONSTR_INDICES.map((index) => new Constr(index as number, [1n, []])),
      new Map<Data, Data>([
        ["AB", 1n],
        ["ab", 2n],
        [[1n], 3n],
        [[1n], 4n],
        [new Constr(0, []), 5n],
        [new Map(), 6n],
      ]),
    ];
    for (const data of cases) {
      for (const canonical of [false, true]) {
        const expected = cmlDataToCbor(data, canonical);
        expect(encodePlutusData(data, canonical), show(data)).toBe(expected);
        expect(show(decodePlutusData(expected))).toBe(
          show(cmlDataFromCbor(expected)),
        );
      }
    }
    for (const cbor of [
      "d866821bffffffffffffffff80",
      "d866821b001fffffffffffff80",
      "d866821b002000000000000180",
      "c240",
      "c340",
      "c25fff",
      "5fff",
      "9fff",
      "bfff",
      "0102",
      "d8668300808080",
      "a20102180103",
      "a2810102810103",
    ]) {
      expect(
        outcome(() => Data.from(cbor)),
        cbor,
      ).toBe(outcome(() => cmlDataFromCbor(cbor)));
    }
  });

  test("invalid values fail with the same errors", () => {
    const invalid = [
      "abc",
      "zz",
      5,
      {},
      undefined,
      null,
      new Constr(-1, []),
      new Constr(1.5, []),
      new Constr(2 ** 64, []),
      new Constr(1e21, []),
      new Constr("3" as unknown as number, []),
      new Constr(0, new Set([1n]) as unknown as Data[]),
      [[[{}]]],
      new Map([[{}, 1n]]),
      new Map([[1n, "xyz"]]),
    ] as unknown as Data[];
    for (const data of invalid) {
      for (const canonical of [false, true]) {
        expect(outcome(() => Data.to(data, undefined, { canonical }))).toBe(
          outcome(() => cmlDataToCbor(data, canonical)),
        );
      }
    }
  });
});
