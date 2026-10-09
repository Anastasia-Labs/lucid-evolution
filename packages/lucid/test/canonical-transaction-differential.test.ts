import { describe, expect, test } from "vitest";
import { withCMLScope, type CMLOwn } from "@lucid-evolution/core-utils";
import { CML } from "../src/index.js";
import { canonicalTransaction } from "../src/CanonicalTransaction.js";

/*
  canonicalTransaction used to be written in TypeScript against CML's wasm
  API; it is now one CML call. The previous implementation is kept below as
  the reference, and both run on random transactions whose CBOR uses
  non-canonical encodings throughout: indefinite lengths, oversized integer
  heads, chunked byte strings, sets with and without tag 258, unsorted maps
  and Plutus data that canonical encoding would reorder.
*/

// ---------------------------------------------------------------------------
// The previous implementation.

const copyOptional = <T>(
  value: T | undefined,
  set: (value: T) => void,
): void => {
  if (value !== undefined) set(value);
};

const restoreOutputDatum = (
  own: CMLOwn,
  canonical: CML.TransactionOutput,
  original: CML.TransactionOutput,
): CML.TransactionOutput => {
  const conway = own(canonical.as_conway_format_tx_out());
  const datum = own(original.datum());
  if (!conway || !datum) return canonical;
  conway.set_datum_option(datum);
  return own(CML.TransactionOutput.new_conway_format_tx_out(conway));
};

const copyCanonicalBody = (
  own: CMLOwn,
  original: CML.TransactionBody,
  canonical: CML.TransactionBody,
): CML.TransactionBody => {
  const originalOutputs = own(original.outputs());
  const canonicalOutputs = own(canonical.outputs());
  const outputs = own(CML.TransactionOutputList.new());
  for (let index = 0; index < canonicalOutputs.len(); index++) {
    outputs.add(
      restoreOutputDatum(
        own,
        own(canonicalOutputs.get(index)),
        own(originalOutputs.get(index)),
      ),
    );
  }
  const body = own(
    CML.TransactionBody.new(own(canonical.inputs()), outputs, canonical.fee()),
  );
  copyOptional(own(canonical.auxiliary_data_hash()), (value) =>
    body.set_auxiliary_data_hash(value),
  );
  copyOptional(own(canonical.certs()), (value) => body.set_certs(value));
  copyOptional(own(canonical.collateral_inputs()), (value) =>
    body.set_collateral_inputs(value),
  );
  const canonicalCollateralReturn = own(canonical.collateral_return());
  const originalCollateralReturn = own(original.collateral_return());
  if (canonicalCollateralReturn && originalCollateralReturn) {
    body.set_collateral_return(
      restoreOutputDatum(
        own,
        canonicalCollateralReturn,
        originalCollateralReturn,
      ),
    );
  }
  copyOptional(canonical.current_treasury_value(), (value) =>
    body.set_current_treasury_value(value),
  );
  copyOptional(canonical.donation(), (value) => body.set_donation(value));
  copyOptional(own(canonical.mint()), (value) => body.set_mint(value));
  copyOptional(own(canonical.network_id()), (value) =>
    body.set_network_id(value),
  );
  copyOptional(own(canonical.proposal_procedures()), (value) =>
    body.set_proposal_procedures(value),
  );
  copyOptional(own(canonical.reference_inputs()), (value) =>
    body.set_reference_inputs(value),
  );
  copyOptional(own(canonical.required_signers()), (value) =>
    body.set_required_signers(value),
  );
  copyOptional(own(canonical.script_data_hash()), (value) =>
    body.set_script_data_hash(value),
  );
  copyOptional(canonical.total_collateral(), (value) =>
    body.set_total_collateral(value),
  );
  copyOptional(canonical.ttl(), (value) => body.set_ttl(value));
  copyOptional(canonical.validity_interval_start(), (value) =>
    body.set_validity_interval_start(value),
  );
  copyOptional(own(canonical.voting_procedures()), (value) =>
    body.set_voting_procedures(value),
  );
  copyOptional(own(canonical.withdrawals()), (value) =>
    body.set_withdrawals(value),
  );
  return body;
};

const samePlutusValue = (
  own: CMLOwn,
  left: CML.PlutusData,
  right: CML.PlutusData,
): boolean => own(left).to_json() === own(right).to_json();

const restoreRedeemerData = (
  own: CMLOwn,
  original: CML.Redeemers,
  canonical: CML.Redeemers,
): CML.Redeemers | undefined => {
  const originalMap = own(original.as_map_redeemer_key_to_redeemer_val());
  const canonicalMap = own(canonical.as_map_redeemer_key_to_redeemer_val());
  if (originalMap && canonicalMap) {
    const restored = own(CML.MapRedeemerKeyToRedeemerVal.new());
    const keys = own(canonicalMap.keys());
    for (let index = 0; index < keys.len(); index++) {
      const key = own(keys.get(index));
      const canonicalValue = own(canonicalMap.get(key))!;
      const originalValue = own(originalMap.get(key));
      restored.insert(
        key,
        originalValue &&
          !samePlutusValue(own, originalValue.data(), canonicalValue.data())
          ? originalValue
          : canonicalValue,
      );
    }
    return CML.Redeemers.new_map_redeemer_key_to_redeemer_val(restored);
  }
  const originalList = own(original.as_arr_legacy_redeemer());
  const canonicalList = own(canonical.as_arr_legacy_redeemer());
  if (!originalList || !canonicalList) return undefined;
  const restored = own(CML.LegacyRedeemerList.new());
  for (let index = 0; index < canonicalList.len(); index++) {
    const canonicalRedeemer = own(canonicalList.get(index));
    const originalRedeemer = own(originalList.get(index));
    restored.add(
      samePlutusValue(own, originalRedeemer.data(), canonicalRedeemer.data())
        ? canonicalRedeemer
        : originalRedeemer,
    );
  }
  return CML.Redeemers.new_arr_legacy_redeemer(restored);
};

const referenceCanonicalTransaction = (tx: CML.Transaction): CML.Transaction =>
  withCMLScope((own) => {
    const canonical = own(
      CML.Transaction.from_cbor_bytes(tx.to_canonical_cbor_bytes()),
    );
    const body = copyCanonicalBody(own, own(tx.body()), own(canonical.body()));
    const witnesses = own(canonical.witness_set());
    const originalWitnesses = own(tx.witness_set());
    const datums = own(originalWitnesses.plutus_datums());
    if (datums) witnesses.set_plutus_datums(datums);
    const originalRedeemers = own(originalWitnesses.redeemers());
    const canonicalRedeemers = own(witnesses.redeemers());
    const redeemers =
      originalRedeemers && canonicalRedeemers
        ? own(restoreRedeemerData(own, originalRedeemers, canonicalRedeemers))
        : undefined;
    if (redeemers) witnesses.set_redeemers(redeemers);
    return CML.Transaction.new(
      body,
      witnesses,
      canonical.is_valid(),
      canonical.auxiliary_data(),
    );
  });

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
  | { simple: "true" | "false" | "null" };

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
  const info = { 1: 24, 2: 25, 4: 26, 8: 27 }[width]!;
  const out = [(major << 5) | info];
  for (let i = width - 1; i >= 0; i--) {
    out.push(Number((value >> BigInt(8 * i)) & 0xffn));
  }
  return out;
};

const encodeItem = (item: Item, out: number[]): void => {
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
    item.array.forEach((element) => encodeItem(element, out));
    if (item.indefinite) out.push(0xff);
  } else if ("map" in item) {
    if (item.indefinite) out.push(0xbf);
    else out.push(...head(5, BigInt(item.map.length), item.size));
    item.map.forEach(([key, value]) => {
      encodeItem(key, out);
      encodeItem(value, out);
    });
    if (item.indefinite) out.push(0xff);
  } else if ("tag" in item) {
    out.push(...head(6, item.tag, item.size));
    encodeItem(item.item, out);
  } else {
    out.push({ false: 0xf4, true: 0xf5, null: 0xf6 }[item.simple]);
  }
};

const encode = (item: Item): Uint8Array => {
  const out: number[] = [];
  encodeItem(item, out);
  return Uint8Array.from(out);
};

// ---------------------------------------------------------------------------
// Random transactions.

let seed = 0x1badb002;
const random = () => {
  seed ^= seed << 13;
  seed ^= seed >>> 17;
  seed ^= seed << 5;
  return (seed >>> 0) / 2 ** 32;
};
const int = (n: number) => Math.floor(random() * n);
const chance = (p: number) => random() < p;
const pick = <T>(values: T[]): T => values[int(values.length)];
const randomBytes = (length: number) =>
  Uint8Array.from({ length }, () => int(256));

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
    : bytes(Uint8Array.of(pick([0x00, 0x01, 0x10, 0x31]), ...randomBytes(56)));
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
  return { tag: 24n, item: { bytes: encode(script) } };
};
const datumOption = (): Item =>
  chance(0.3)
    ? array([uint(0), txHash()])
    : array([uint(1), { tag: 24n, item: { bytes: encode(plutusData()) } }]);
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
  if (chance(0.3)) entries.sort(() => random() - 0.5);
  return map(entries);
};

const exUnits = () => array([uint(int(14_000_000)), uint(int(10_000_000_000))]);
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
        array([uint(tag), uint(index), plutusData(), exUnits()]),
      ),
    );
  }
  return map(
    unique.map(([tag, index]) => [
      array([uint(tag), uint(index)]),
      array([plutusData(), exUnits()]),
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
  if (chance(0.6)) entries.push([uint(4), set(many(1, 3, () => plutusData()))]);
  if (chance(0.7)) entries.push([uint(5), redeemers()]);
  if (chance(0.3)) entries.sort(() => random() - 0.5);
  return map(entries);
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

// ---------------------------------------------------------------------------

const outcome = (run: () => CML.Transaction): string => {
  try {
    const tx = run();
    try {
      return tx.to_cbor_hex();
    } finally {
      tx.free();
    }
  } catch (error) {
    return `error: ${String(error)}`;
  }
};

describe("canonicalTransaction", () => {
  test("matches the previous implementation on random transactions", () => {
    let decoded = 0;
    let withRedeemers = 0;
    let changed = 0;
    for (let i = 0; i < 3000; i++) {
      const cbor = encode(transaction());
      let tx: CML.Transaction;
      try {
        tx = CML.Transaction.from_cbor_bytes(cbor);
      } catch {
        continue;
      }
      decoded++;
      if (tx.witness_set().redeemers()) withRedeemers++;
      const expected = outcome(() => referenceCanonicalTransaction(tx));
      const actual = outcome(() => canonicalTransaction(tx));
      expect(actual, Buffer.from(cbor).toString("hex")).toBe(expected);
      if (expected !== tx.to_cbor_hex()) changed++;
      tx.free();
    }
    // Most random transactions decode, and canonical encoding changes them.
    expect(decoded).toBeGreaterThan(2500);
    expect(withRedeemers).toBeGreaterThan(1500);
    expect(changed).toBeGreaterThan(2400);
  });
});
