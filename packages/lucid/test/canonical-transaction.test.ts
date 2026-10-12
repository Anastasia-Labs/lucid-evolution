import { describe, expect, test } from "vitest";
import { FastCheck } from "effect";
import { toHex, withCMLScope, type CMLOwn } from "@lucid-evolution/core-utils";
import { CML } from "../src/index.js";
import { canonicalTransaction } from "../src/CanonicalTransaction.js";

/*
  canonicalTransaction re-encodes a transaction canonically but keeps the
  encoding of its Plutus data (see canonical.rs in the vendored CML). These
  tests check that contract on random transactions whose CBOR uses
  non-canonical encodings throughout: indefinite lengths, oversized integer
  heads, chunked byte strings, sets with and without tag 258, unsorted maps
  and Plutus data that canonical encoding would reorder.
*/

// ---------------------------------------------------------------------------
// A CBOR writer that controls every encoding choice.

type Item =
  | { uint: bigint; size?: number }
  | { nint: bigint; size?: number }
  | { bytes: Uint8Array; chunks?: number[] }
  | { text: string }
  | { array: Item[]; indefinite?: boolean; size?: number }
  | { map: [Item, Item][]; indefinite?: boolean; size?: number }
  | { tag: bigint; item: Item; size?: number }
  | { simple: "true" | "false" | "null" }
  // Plutus data or a datum option, which canonicalTransaction keeps as they
  // are: written as generated, or as `canonical` re-encodes them.
  | { kept: Item; canonical: (cbor: Uint8Array) => Uint8Array }
  // A byte string holding the CBOR of an item, as tag 24 wraps it.
  | { embedded: Item };

/** Head bytes; `size` forces a longer argument than needed (0, 1, 2, 4, 8). */
const head = (major: number, value: bigint, size?: number): number[] => {
  const minimal =
    value < 24n
      ? 0
      : value < 256n
        ? 1
        : value < 65536n
          ? 2
          : value < 2n ** 32n
            ? 4
            : 8;
  const width = Math.max(minimal, size ?? 0);
  if (width === 0) return [(major << 5) | Number(value)];
  const info = 24 + Math.log2(width);
  const out = [(major << 5) | info];
  for (let i = width - 1; i >= 0; i--) {
    out.push(Number((value >> BigInt(8 * i)) & 0xffn));
  }
  return out;
};

const encodeItem = (
  item: Item,
  out: number[],
  canonicalKept: boolean,
): void => {
  const encodeChild = (child: Item) => encodeItem(child, out, canonicalKept);
  if ("uint" in item) out.push(...head(0, item.uint, item.size));
  else if ("nint" in item) out.push(...head(1, -1n - item.nint, item.size));
  else if ("bytes" in item) {
    if (!item.chunks) {
      out.push(...head(2, BigInt(item.bytes.length)));
      out.push(...item.bytes);
    } else {
      out.push(0x5f);
      let offset = 0;
      for (const length of item.chunks) {
        out.push(...head(2, BigInt(length)));
        out.push(...item.bytes.subarray(offset, offset + length));
        offset += length;
      }
      out.push(0xff);
    }
  } else if ("text" in item) {
    const bytes = new TextEncoder().encode(item.text);
    out.push(...head(3, BigInt(bytes.length)), ...bytes);
  } else if ("array" in item) {
    if (item.indefinite) out.push(0x9f);
    else out.push(...head(4, BigInt(item.array.length), item.size));
    item.array.forEach(encodeChild);
    if (item.indefinite) out.push(0xff);
  } else if ("map" in item) {
    if (item.indefinite) out.push(0xbf);
    else out.push(...head(5, BigInt(item.map.length), item.size));
    item.map.forEach(([key, value]) => {
      encodeChild(key);
      encodeChild(value);
    });
    if (item.indefinite) out.push(0xff);
  } else if ("tag" in item) {
    out.push(...head(6, item.tag, item.size));
    encodeChild(item.item);
  } else if ("kept" in item) {
    const cbor = encode(item.kept);
    out.push(...(canonicalKept ? item.canonical(cbor) : cbor));
  } else if ("embedded" in item) {
    const cbor = encode(item.embedded, canonicalKept);
    out.push(...head(2, BigInt(cbor.length)), ...cbor);
  } else {
    out.push({ false: 0xf4, true: 0xf5, null: 0xf6 }[item.simple]);
  }
};

const encode = (item: Item, canonicalKept = false): Uint8Array => {
  const out: number[] = [];
  encodeItem(item, out, canonicalKept);
  return Uint8Array.from(out);
};

const keptPlutusData = (item: Item): Item => ({
  kept: item,
  canonical: (cbor) =>
    withCMLScope((own) =>
      own(CML.PlutusData.from_cbor_bytes(cbor)).to_canonical_cbor_bytes(),
    ),
});
const keptDatumOption = (item: Item): Item => ({
  kept: item,
  canonical: (cbor) =>
    withCMLScope((own) =>
      own(CML.DatumOption.from_cbor_bytes(cbor)).to_canonical_cbor_bytes(),
    ),
});

// ---------------------------------------------------------------------------
// Random transactions, every choice drawn from fast-check.

const randomTransaction = (g: FastCheck.GeneratorValue): Item => {
  const int = (n: number) => g(FastCheck.nat, { max: n - 1 });
  const chance = (p: number) => int(100) < p * 100;
  const pick = <T>(values: T[]): T => values[int(values.length)];
  const randomBytes = (length: number) =>
    g(FastCheck.uint8Array, { minLength: length, maxLength: length });
  const shuffle = <T>(items: T[]): T[] => {
    const out = [...items];
    for (let i = out.length - 1; i > 0; i--) {
      const j = int(i + 1);
      [out[i], out[j]] = [out[j], out[i]];
    }
    return out;
  };

  const sizeFor = () => (chance(0.15) ? pick([1, 2, 4, 8]) : undefined);
  const uint = (value: bigint | number): Item => ({
    uint: BigInt(value),
    size: sizeFor(),
  });
  const bytes = (value: Uint8Array): Item => {
    if (value.length > 1 && chance(0.15)) {
      const cut = 1 + int(value.length - 1);
      return { bytes: value, chunks: [cut, value.length - cut] };
    }
    return { bytes: value };
  };
  const array = (items: Item[]): Item =>
    chance(0.2)
      ? { array: items, indefinite: true }
      : { array: items, size: sizeFor() };
  const map = (entries: [Item, Item][]): Item =>
    chance(0.2)
      ? { map: entries, indefinite: true }
      : { map: entries, size: sizeFor() };
  /** Sets with and without tag 258; ledger sets keep their elements unique. */
  const set = (items: Item[]): Item =>
    chance(0.5)
      ? { tag: 258n, item: array(items), size: sizeFor() }
      : array(items);
  const many = <T>(min: number, max: number, make: () => T): T[] =>
    Array.from({ length: min + int(max - min + 1) }, make);

  const plutusData = (depth = 0): Item => {
    const leaf = depth > 3 || chance(0.4);
    switch (leaf ? pick([3, 4]) : int(5)) {
      case 0: {
        const alternative = int(140);
        const fields = array(many(0, 3, () => plutusData(depth + 1)));
        if (alternative < 7)
          return { tag: 121n + BigInt(alternative), item: fields };
        if (alternative < 128 && chance(0.7)) {
          return { tag: 1280n + BigInt(alternative - 7), item: fields };
        }
        return { tag: 102n, item: array([uint(alternative), fields]) };
      }
      case 1:
        // Keys out of canonical order, and occasionally repeated.
        return map(
          many(0, 4, () => [plutusData(depth + 1), plutusData(depth + 1)]),
        );
      case 2:
        return array(many(0, 4, () => plutusData(depth + 1)));
      case 3: {
        const r = int(6);
        if (r === 0) return { nint: -1n - BigInt(int(1000)), size: sizeFor() };
        if (r === 1) {
          // A bignum.
          return {
            tag: pick([2n, 3n]),
            item: {
              bytes: Uint8Array.of(1 + int(255), ...randomBytes(8 + int(4))),
            },
          };
        }
        return uint(int(r === 2 ? 2 ** 31 : 30));
      }
      default: {
        const length = pick([0, 3, 28, 32, 64, 70, 130]);
        const value = randomBytes(length);
        if (length > 64) {
          // Byte strings over 64 bytes must be chunked.
          const chunks: number[] = [];
          for (let left = length; left > 0; left -= 64)
            chunks.push(Math.min(64, left));
          return { bytes: value, chunks };
        }
        return bytes(value);
      }
    }
  };

  const keyHash = () => bytes(randomBytes(28));
  const txHash = () => bytes(randomBytes(32));
  const input = (): Item => array([txHash(), uint(int(4))]);
  const inputs = (min: number) => set(many(min, 3, input));
  const address = (): Item =>
    chance(0.5)
      ? bytes(Uint8Array.of(pick([0x60, 0x61, 0x70, 0x71]), ...randomBytes(28)))
      : bytes(
          Uint8Array.of(pick([0x00, 0x01, 0x10, 0x31]), ...randomBytes(56)),
        );
  const multiAsset = (amount: () => Item): Item =>
    map(
      many(1, 2, () => [
        bytes(randomBytes(28)),
        map(many(1, 3, () => [bytes(randomBytes(int(33))), amount()])),
      ]),
    );
  const value = (): Item =>
    chance(0.5)
      ? uint(1_000_000 + int(10_000_000))
      : array([
          uint(1_000_000 + int(10_000_000)),
          multiAsset(() => uint(1 + int(1000))),
        ]);
  const nativeScript = (depth = 0): Item =>
    depth > 1 || chance(0.6)
      ? array([uint(0), keyHash()])
      : array([
          uint(pick([1, 2])),
          array(many(0, 2, () => nativeScript(depth + 1))),
        ]);
  const scriptRef = (): Item => {
    const script = chance(0.3)
      ? array([uint(0), nativeScript()])
      : array([uint(1 + int(3)), bytes(randomBytes(10 + int(40)))]);
    return { tag: 24n, item: { embedded: script } };
  };
  const datumOption = (): Item =>
    keptDatumOption(
      chance(0.3)
        ? array([uint(0), txHash()])
        : array([uint(1), { tag: 24n, item: { embedded: plutusData() } }]),
    );
  const output = (): Item => {
    const address_ = address();
    if (chance(0.3)) {
      return array(
        chance(0.5) ? [address_, value()] : [address_, value(), txHash()],
      );
    }
    const entries: [Item, Item][] = [
      [uint(0), address_],
      [uint(1), value()],
    ];
    if (chance(0.7)) entries.push([uint(2), datumOption()]);
    if (chance(0.3)) entries.push([uint(3), scriptRef()]);
    return map(entries);
  };
  const rewardAccount = () =>
    bytes(Uint8Array.of(pick([0xe0, 0xe1, 0xf0, 0xf1]), ...randomBytes(28)));
  const anchor = (): Item =>
    array([{ text: "https://example.com/" + int(100) }, txHash()]);
  const certificate = (): Item =>
    pick([
      () => array([uint(0), array([uint(0), keyHash()])]),
      () => array([uint(1), array([uint(int(2)), keyHash()])]),
      () => array([uint(2), array([uint(0), keyHash()]), keyHash()]),
    ])();
  const votingProcedures = (): Item =>
    map(
      many(1, 2, () => [
        array([uint(int(5)), keyHash()]),
        map(
          many(1, 2, () => [
            array([txHash(), uint(int(3))]),
            array([uint(int(3)), chance(0.5) ? { simple: "null" } : anchor()]),
          ]),
        ),
      ]),
    );
  const proposal = (): Item =>
    array([uint(100_000_000_000), rewardAccount(), array([uint(6)]), anchor()]);

  const body = (): Item => {
    const entries: [Item, Item][] = [
      [uint(0), inputs(1)],
      [uint(1), array(many(1, 4, output))],
      [uint(2), uint(150_000 + int(500_000))],
    ];
    const optional: [number, () => Item][] = [
      [3, () => uint(int(10_000_000))],
      [4, () => set(many(1, 2, certificate))],
      [5, () => map(many(1, 2, () => [rewardAccount(), uint(int(1_000_000))]))],
      [7, txHash],
      [8, () => uint(int(10_000_000))],
      [
        9,
        () =>
          multiAsset(() =>
            chance(0.3) ? { nint: -1n - BigInt(int(50)) } : uint(1 + int(50)),
          ),
      ],
      [11, txHash],
      [13, () => inputs(1)],
      [14, () => set(many(1, 3, keyHash))],
      [15, () => uint(int(2))],
      [16, output],
      [17, () => uint(int(10_000_000))],
      [18, () => inputs(1)],
      [19, votingProcedures],
      [20, () => set(many(1, 2, proposal))],
      [21, () => uint(int(10_000_000))],
      [22, () => uint(1 + int(10_000_000))],
    ];
    for (const [key, make] of optional) {
      if (chance(0.35)) entries.push([uint(key), make()]);
    }
    // Fields in a random order.
    return map(chance(0.3) ? shuffle(entries) : entries);
  };

  const exUnits = () =>
    array([uint(int(14_000_000)), uint(int(10_000_000_000))]);
  const redeemers = (): Item => {
    const keys = new Set<string>();
    const unique = many(1, 4, () => [int(6), int(4)] as const).filter(
      ([tag, index]) => {
        const key = `${tag}:${index}`;
        if (keys.has(key)) return false;
        keys.add(key);
        return true;
      },
    );
    if (chance(0.5)) {
      return array(
        unique.map(([tag, index]) =>
          array([
            uint(tag),
            uint(index),
            keptPlutusData(plutusData()),
            exUnits(),
          ]),
        ),
      );
    }
    return map(
      unique.map(([tag, index]) => [
        array([uint(tag), uint(index)]),
        array([keptPlutusData(plutusData()), exUnits()]),
      ]),
    );
  };

  const witnessSet = (): Item => {
    const entries: [Item, Item][] = [];
    if (chance(0.5)) {
      entries.push([
        uint(0),
        set(
          many(1, 2, () =>
            array([bytes(randomBytes(32)), bytes(randomBytes(64))]),
          ),
        ),
      ]);
    }
    if (chance(0.3))
      entries.push([uint(1), set(many(1, 2, () => nativeScript()))]);
    for (const key of [3, 6, 7]) {
      if (chance(0.25)) {
        entries.push([
          uint(key),
          set(many(1, 2, () => bytes(randomBytes(10 + int(30))))),
        ]);
      }
    }
    if (chance(0.6)) {
      entries.push([
        uint(4),
        set(many(1, 3, () => keptPlutusData(plutusData()))),
      ]);
    }
    if (chance(0.7)) entries.push([uint(5), redeemers()]);
    return map(chance(0.3) ? shuffle(entries) : entries);
  };

  const metadatum = (depth = 0): Item =>
    depth > 1 || chance(0.5)
      ? pick([
          () => uint(int(1000)),
          () => ({ text: "m" + int(100) }),
          () => bytes(randomBytes(int(8))),
        ])()
      : chance(0.5)
        ? array(many(0, 3, () => metadatum(depth + 1)))
        : map(many(0, 3, () => [metadatum(depth + 1), metadatum(depth + 1)]));

  const transaction = (): Item =>
    array([
      body(),
      witnessSet(),
      { simple: chance(0.9) ? "true" : "false" },
      chance(0.3)
        ? map(many(1, 3, () => [uint(int(1000)), metadatum()]))
        : { simple: "null" },
    ]);

  return transaction();
};

// ---------------------------------------------------------------------------
// What canonicalTransaction keeps from the original.

/** The major type, additional info, argument and size of the head at `at`. */
const readHead = (cbor: Uint8Array, at: number) => {
  const major = cbor[at] >> 5;
  const info = cbor[at] & 31;
  if (info < 24 || info === 31) {
    return { major, info, value: BigInt(info), size: 1 };
  }
  const bytes = 2 ** (info - 24);
  let value = 0n;
  for (let i = 1; i <= bytes; i++) value = (value << 8n) | BigInt(cbor[at + i]);
  return { major, info, value, size: 1 + bytes };
};

/**
 * Walks the CBOR item at `at` and returns where it ends. Its bytes, but for
 * every tag 258, go to `out`.
 */
const walk = (cbor: Uint8Array, at: number, out: number[] = []): number => {
  const { major, info, value, size } = readHead(cbor, at);
  if (major === 6 && value === 258n) return walk(cbor, at + size, out);
  out.push(...cbor.subarray(at, at + size));
  at += size;
  if (info === 31) {
    // An indefinite-length item, up to its break.
    while (cbor[at] !== 0xff) at = walk(cbor, at, out);
    out.push(cbor[at]);
    return at + 1;
  }
  if (major === 2 || major === 3) {
    out.push(...cbor.subarray(at, at + Number(value)));
    return at + Number(value);
  }
  if (major === 4 || major === 5) {
    const items = major === 4 ? value : 2n * value;
    for (let i = 0n; i < items; i++) at = walk(cbor, at, out);
  } else if (major === 6) {
    at = walk(cbor, at, out);
  }
  return at;
};

/**
 * The CBOR with every tag 258 dropped. The result tags its ledger sets
 * whether or not the original did, which is the one change to the value.
 */
const withoutSetTags = (cbor: Uint8Array): string => {
  const out: number[] = [];
  walk(cbor, 0, out);
  return toHex(Uint8Array.from(out));
};

/**
 * Body fields that are ledger sets: inputs, certificates, collateral inputs,
 * required signers, reference inputs and proposal procedures.
 */
const BODY_SETS = new Set([0n, 4n, 13n, 14n, 18n, 20n]);
const WITNESS_DATUMS = new Set([4n]);

/** For each ledger set in a transaction, whether it has tag 258. */
const ledgerSetTags = (cbor: Uint8Array): boolean[] => {
  const tagged: boolean[] = [];
  const fields = (at: number, sets: Set<bigint>): number => {
    const map = readHead(cbor, at);
    at += map.size;
    for (let i = 0n; map.info === 31 ? cbor[at] !== 0xff : i < map.value; i++) {
      const key = readHead(cbor, at);
      at = walk(cbor, at);
      if (sets.has(key.value)) {
        const value = readHead(cbor, at);
        tagged.push(value.major === 6 && value.value === 258n);
      }
      at = walk(cbor, at);
    }
    return map.info === 31 ? at + 1 : at;
  };
  fields(fields(readHead(cbor, 0).size, BODY_SETS), WITNESS_DATUMS);
  return tagged;
};

/** Datums of Conway-format outputs and collateral return, which keep theirs. */
const outputDatums = (own: CMLOwn, tx: CML.Transaction) => {
  const body = own(tx.body());
  const outputs = own(body.outputs());
  const collateralReturn = own(body.collateral_return());
  return [
    ...Array.from({ length: outputs.len() }, (_, i) => own(outputs.get(i))),
    ...(collateralReturn ? [collateralReturn] : []),
  ].map((output) =>
    own(output.as_conway_format_tx_out())
      ? own(output.datum())?.to_cbor_hex()
      : undefined,
  );
};

const witnessDatums = (own: CMLOwn, tx: CML.Transaction) => {
  const datums = own(own(tx.witness_set()).plutus_datums());
  return Array.from({ length: datums?.len() ?? 0 }, (_, i) =>
    own(datums?.get(i))?.to_cbor_hex(),
  );
};

/** Each redeemer's CBOR and Plutus value, by tag and index. */
const redeemers = (own: CMLOwn, tx: CML.Transaction) => {
  const entries = new Map<string, { cbor: string; value: string }>();
  const redeemers = own(own(tx.witness_set()).redeemers());
  const map = own(redeemers?.as_map_redeemer_key_to_redeemer_val());
  const keys = own(map?.keys());
  for (let i = 0; i < (keys?.len() ?? 0); i++) {
    const key = own(keys?.get(i));
    const redeemer = key && own(map?.get(key));
    if (!key || !redeemer) continue;
    entries.set(`${key.tag()}:${key.index()}`, {
      cbor: redeemer.to_cbor_hex(),
      value: own(redeemer.data()).to_json(),
    });
  }
  const list = own(redeemers?.as_arr_legacy_redeemer());
  for (let i = 0; i < (list?.len() ?? 0); i++) {
    const redeemer = own(list?.get(i));
    if (!redeemer) continue;
    entries.set(`${redeemer.tag()}:${redeemer.index()}`, {
      cbor: redeemer.to_cbor_hex(),
      value: own(redeemer.data()).to_json(),
    });
  }
  return entries;
};

/**
 * A redeemer is the canonical one if that has the same Plutus value, and the
 * original one otherwise.
 */
const expectedRedeemers = (own: CMLOwn, tx: CML.Transaction) => {
  const canonical = redeemers(
    own,
    own(CML.Transaction.from_cbor_bytes(tx.to_canonical_cbor_bytes())),
  );
  return new Map(
    [...redeemers(own, tx)].map(([key, original]) => {
      const candidate = canonical.get(key);
      return [
        key,
        candidate?.value === original.value ? candidate.cbor : original.cbor,
      ];
    }),
  );
};

const cborOf = (entries: Map<string, { cbor: string }>) =>
  new Map([...entries].map(([key, { cbor }]) => [key, cbor]));

// ---------------------------------------------------------------------------

describe("canonicalTransaction", () => {
  test("keeps Plutus data and canonicalises everything else", () => {
    let withRedeemers = 0;
    let changed = 0;
    let untagged = 0;
    FastCheck.assert(
      FastCheck.property(FastCheck.gen(), (g) =>
        withCMLScope((own) => {
          const item = randomTransaction(g);
          let tx: CML.Transaction;
          try {
            tx = own(CML.Transaction.from_cbor_bytes(encode(item)));
          } catch {
            // A few random transactions are not valid ledger CBOR.
            return FastCheck.pre(false);
          }
          const result = own(canonicalTransaction(tx));

          // The same transaction, but for tag 258 on sets, which every
          // ledger set has.
          expect(withoutSetTags(result.to_canonical_cbor_bytes())).toBe(
            withoutSetTags(tx.to_canonical_cbor_bytes()),
          );
          expect(ledgerSetTags(result.to_cbor_bytes())).not.toContain(false);
          // Plutus data keeps its encoding: datums always, and redeemers
          // whose value canonical encoding would change.
          expect(outputDatums(own, result)).toEqual(outputDatums(own, tx));
          expect(witnessDatums(own, result)).toEqual(witnessDatums(own, tx));
          expect(cborOf(redeemers(own, result))).toEqual(
            expectedRedeemers(own, tx),
          );
          // Everything else is canonical: with canonical Plutus data in, the
          // result is canonical CBOR throughout.
          const canonicalData = own(
            CML.Transaction.from_cbor_bytes(encode(item, true)),
          );
          const canonicalDataResult = own(canonicalTransaction(canonicalData));
          expect(canonicalDataResult.to_cbor_hex()).toBe(
            canonicalDataResult.to_canonical_cbor_hex(),
          );
          // And a canonical transaction is left as it is.
          expect(own(canonicalTransaction(result)).to_cbor_hex()).toBe(
            result.to_cbor_hex(),
          );

          if (own(own(tx.witness_set()).redeemers())) withRedeemers++;
          if (ledgerSetTags(tx.to_cbor_bytes()).includes(false)) untagged++;
          if (result.to_cbor_hex() !== tx.to_cbor_hex()) changed++;
        }),
      ),
      { numRuns: 3000 },
    );
    // Most random transactions have redeemers and a set without tag 258,
    // and canonical encoding changes them.
    expect(withRedeemers).toBeGreaterThan(1500);
    expect(untagged).toBeGreaterThan(2000);
    expect(changed).toBeGreaterThan(2400);
  });
});
