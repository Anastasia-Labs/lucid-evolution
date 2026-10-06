import { Credential, UTxO } from "@lucid-evolution/core-types";
import { describe, expect, test } from "vitest";
import { getAddressDetails } from "@lucid-evolution/utils";
import { CML } from "../src/core.js";
import { Emulator } from "../src/index.js";

/*
  The emulator answers UTxO queries without enumerating the ledger record
  while only the emulator writes to it. These tests compare every query
  with a scan of the whole ledger (the previous implementation) after the
  kinds of direct ledger edits tests make.
*/

const keyHash = (byte: number) => byte.toString(16).padStart(2, "0").repeat(28);

const credential = (byte: number) =>
  CML.Credential.new_pub_key(CML.Ed25519KeyHash.from_hex(keyHash(byte)));

const enterprise = (payment: number) =>
  CML.EnterpriseAddress.new(0, credential(payment))
    .to_address()
    .to_bech32(undefined);

const base = (payment: number, stake: number) =>
  CML.BaseAddress.new(0, credential(payment), credential(stake))
    .to_address()
    .to_bech32(undefined);

// Several addresses share payment credential 1.
const ADDRESSES = [
  enterprise(1),
  base(1, 2),
  base(1, 3),
  enterprise(4),
  base(5, 2),
];
const UNITS = ["lovelace", "aa".repeat(28) + "01", "bb".repeat(28)];

const scan = (emulator: Emulator, match: (utxo: UTxO) => boolean): UTxO[] =>
  Object.values(emulator.ledger).flatMap(({ utxo, spent }) =>
    !spent && match(utxo) ? [utxo] : [],
  );

const paymentHash = (address: string) =>
  getAddressDetails(address).paymentCredential?.hash;

const expectQueriesMatchScan = async (emulator: Emulator) => {
  for (const address of ADDRESSES) {
    expect(await emulator.getUtxos(address)).toEqual(
      scan(emulator, (utxo) => utxo.address === address),
    );
    const paymentCredential: Credential = {
      type: "Key",
      hash: paymentHash(address)!,
    };
    expect(await emulator.getUtxos(paymentCredential)).toEqual(
      scan(
        emulator,
        (utxo) => paymentHash(utxo.address) === paymentCredential.hash,
      ),
    );
    for (const unit of UNITS) {
      expect(await emulator.getUtxosWithUnit(address, unit)).toEqual(
        scan(
          emulator,
          (utxo) => utxo.address === address && utxo.assets[unit] > 0n,
        ),
      );
      expect(await emulator.getUtxosWithUnit(paymentCredential, unit)).toEqual(
        scan(
          emulator,
          (utxo) =>
            paymentHash(utxo.address) === paymentCredential.hash &&
            utxo.assets[unit] > 0n,
        ),
      );
    }
  }
  const nft = UNITS[2];
  const holders = scan(emulator, (utxo) => utxo.assets[nft] > 0n);
  if (holders.length <= 1) {
    expect(await emulator.getUtxoByUnit(nft)).toEqual(holders[0]);
  } else {
    expect(() => emulator.getUtxoByUnit(nft)).toThrow();
  }
};

let counter = 0;
const entry = (address: string, units: string[], spent = false) => {
  const txHash = (++counter).toString(16).padStart(64, "c");
  const utxo: UTxO = {
    txHash,
    outputIndex: counter % 3,
    address,
    assets: Object.fromEntries(units.map((unit) => [unit, 1n])),
  };
  return [txHash + utxo.outputIndex, { utxo, spent }] as const;
};

describe("Emulator UTxO indexes", () => {
  test("queries match a ledger scan, in ledger order, through direct edits", async () => {
    const emulator = new Emulator(
      ADDRESSES.map((address) => ({
        address,
        assets: { lovelace: 1_000_000n },
        seedPhrase: "",
        privateKey: "",
      })),
    );
    await expectQueriesMatchScan(emulator);

    // Interleave addresses so ordering within each bucket matters.
    for (let i = 0; i < 40; i++) {
      const [key, value] = entry(ADDRESSES[(i * 7) % ADDRESSES.length], [
        "lovelace",
        ...(i % 3 === 0 ? [UNITS[1]] : []),
      ]);
      emulator.ledger[key] = value;
    }
    await expectQueriesMatchScan(emulator);

    // Spend some entries in place; queries hide them, blocks drop them.
    const keys = Object.keys(emulator.ledger);
    for (const key of keys.filter((_, i) => i % 4 === 1)) {
      emulator.ledger[key].spent = true;
    }
    await expectQueriesMatchScan(emulator);
    emulator.awaitBlock();
    for (const key of keys.filter((_, i) => i % 4 === 1)) {
      expect(emulator.ledger).not.toHaveProperty(key);
    }
    await expectQueriesMatchScan(emulator);

    // Replace an existing key with an entry at another address; the key
    // keeps its place in the ledger.
    const replaced = Object.keys(emulator.ledger)[2];
    emulator.ledger[replaced] = {
      utxo: {
        ...emulator.ledger[replaced].utxo,
        address: ADDRESSES[4],
        assets: { lovelace: 5n, [UNITS[2]]: 1n },
      },
      spent: false,
    };
    await expectQueriesMatchScan(emulator);

    // Delete directly.
    delete emulator.ledger[Object.keys(emulator.ledger)[5]];
    await expectQueriesMatchScan(emulator);

    // Replace the whole ledger.
    const [extraKey, extraValue] = entry(ADDRESSES[1], [UNITS[2]]);
    emulator.ledger = { [extraKey]: extraValue, ...emulator.ledger };
    await expectQueriesMatchScan(emulator);

    // Mempool entries join the ledger after existing entries; spent ones
    // never do.
    const [mempoolKey, mempoolValue] = entry(ADDRESSES[0], ["lovelace"]);
    const [spentKey, spentValue] = entry(ADDRESSES[0], ["lovelace"], true);
    emulator.mempool[mempoolKey] = mempoolValue;
    emulator.mempool[spentKey] = spentValue;
    emulator.awaitBlock();
    expect(Object.keys(emulator.ledger).at(-1)).toBe(mempoolKey);
    expect(emulator.ledger).not.toHaveProperty(spentKey);
    await expectQueriesMatchScan(emulator);
  });
});
