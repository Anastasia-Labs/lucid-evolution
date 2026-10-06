import { UTxO } from "@lucid-evolution/core-types";
import { describe, expect, test } from "vitest";
import { getAddressDetails } from "@lucid-evolution/utils";
import { CML } from "../src/core.js";
import { Emulator } from "../src/index.js";

/*
  `emulator.ledger` and `emulator.transactionHistory` are plain records that
  callers may edit in any way. Every query must answer what a scan of the
  ledger answers, in ledger order, however the records were edited.
*/

const keyHash = (byte: number) => byte.toString(16).padStart(2, "0").repeat(28);

const enterprise = (payment: number) =>
  CML.EnterpriseAddress.new(
    0,
    CML.Credential.new_pub_key(CML.Ed25519KeyHash.from_hex(keyHash(payment))),
  )
    .to_address()
    .to_bech32(undefined);

const NFT = "aa".repeat(28) + "01";

const newEmulator = () =>
  new Emulator([
    {
      address: enterprise(1),
      assets: { lovelace: 5_000_000n },
      seedPhrase: "",
      privateKey: "",
    },
    {
      address: enterprise(2),
      assets: { lovelace: 6_000_000n },
      seedPhrase: "",
      privateKey: "",
    },
  ]);

const entry = (txByte: string, outputIndex: number, address: string) => ({
  utxo: {
    txHash: txByte.repeat(32),
    outputIndex,
    address,
    assets: { lovelace: 1n },
  },
  spent: false,
});

/** A scan of the whole ledger, as the emulator used to answer queries. */
const scan = (emulator: Emulator, match: (utxo: UTxO) => boolean) =>
  Object.values(emulator.ledger).flatMap(({ utxo, spent }) =>
    !spent && match(utxo) ? [utxo] : [],
  );

describe("Emulator ledger edits", () => {
  test("an address edited in place moves the UTxO", async () => {
    const emulator = newEmulator();
    const key = Object.keys(emulator.ledger)[0];
    emulator.ledger[key].utxo.address = enterprise(3);
    expect(await emulator.getUtxos(enterprise(3))).toEqual([
      emulator.ledger[key].utxo,
    ]);
    expect(await emulator.getUtxos(enterprise(1))).toEqual([]);
    expect(
      await emulator.getUtxos({
        type: "Key",
        hash: getAddressDetails(enterprise(3)).paymentCredential!.hash,
      }),
    ).toEqual([emulator.ledger[key].utxo]);
  });

  test("a replaced utxo object moves the UTxO", async () => {
    const emulator = newEmulator();
    const key = Object.keys(emulator.ledger)[0];
    emulator.ledger[key].utxo = {
      ...emulator.ledger[key].utxo,
      address: enterprise(3),
    };
    expect(await emulator.getUtxos(enterprise(3))).toHaveLength(1);
    expect(await emulator.getUtxos(enterprise(1))).toEqual([]);
  });

  test("an asset added in place is found by unit", async () => {
    const emulator = newEmulator();
    const key = Object.keys(emulator.ledger)[0];
    emulator.ledger[key].utxo.assets[NFT] = 1n;
    expect((await emulator.getUtxoByUnit(NFT))?.outputIndex).toBe(0);
    expect(await emulator.getUtxosWithUnit(enterprise(1), NFT)).toHaveLength(1);
  });

  test("UTxOs returned by a query and then edited are re-read", async () => {
    const emulator = newEmulator();
    const [utxo] = await emulator.getUtxos(enterprise(1));
    utxo.address = enterprise(3);
    utxo.assets[NFT] = 1n;
    expect(await emulator.getUtxos(enterprise(3))).toEqual([utxo]);
    expect(await emulator.getUtxos(enterprise(1))).toEqual([]);
    expect(await emulator.getUtxoByUnit(NFT)).toBe(utxo);
    expect(await emulator.getUtxos(enterprise(3))).toEqual(
      scan(emulator, (u) => u.address === enterprise(3)),
    );
  });

  test("structuredClone takes a snapshot of the ledger", () => {
    const emulator = newEmulator();
    const snapshot = structuredClone(emulator.ledger);
    expect(snapshot).toEqual(emulator.ledger);
    expect(snapshot).not.toBe(emulator.ledger);
  });

  test("assigning undefined to an entry is a plain assignment", () => {
    const emulator = newEmulator();
    const key = Object.keys(emulator.ledger)[0];
    expect(() => {
      (emulator.ledger as Record<string, unknown>)[key] = undefined;
    }).not.toThrow();
    expect(emulator.ledger).toHaveProperty(key, undefined);
  });

  test("emulators sharing one ledger record see each other's writes", async () => {
    const a = newEmulator();
    const b = newEmulator();
    b.ledger = a.ledger;
    a.ledger["ff".repeat(32) + "9"] = entry("ff", 9, enterprise(7));
    a.mempool["ee".repeat(32) + "0"] = entry("ee", 0, enterprise(8));
    a.awaitBlock(1);
    expect({
      a7: (await a.getUtxos(enterprise(7))).length,
      b7: (await b.getUtxos(enterprise(7))).length,
      a8: (await a.getUtxos(enterprise(8))).length,
      b8: (await b.getUtxos(enterprise(8))).length,
    }).toEqual({ a7: 1, b7: 1, a8: 1, b8: 1 });
  });

  test("an entry added with defineProperty and then spent is dropped by a block", async () => {
    const emulator = newEmulator();
    const key = "dd".repeat(32) + "0";
    Object.defineProperty(emulator.ledger, key, {
      value: entry("dd", 0, enterprise(1)),
      enumerable: true,
      configurable: true,
      writable: true,
    });
    expect(await emulator.getUtxos(enterprise(1))).toHaveLength(2);
    emulator.ledger[key].spent = true;
    expect(await emulator.getUtxos(enterprise(1))).toHaveLength(1);
    emulator.awaitBlock(1);
    expect(key in emulator.ledger).toBe(false);
  });

  test("ledger and transactionHistory are own enumerable properties", () => {
    const emulator = newEmulator();
    expect(Object.keys(emulator)).toContain("ledger");
    expect(Object.keys(emulator)).toContain("transactionHistory");
    const copy = { ...emulator };
    expect(copy.ledger).toBe(emulator.ledger);
    expect(copy.transactionHistory).toBe(emulator.transactionHistory);
  });

  test("mempool keys the record orders specially keep ledger order", async () => {
    const emulator = newEmulator();
    emulator.mempool["7"] = entry("cc", 7, enterprise(1));
    emulator.awaitBlock(1);
    const utxos = await emulator.getUtxos(enterprise(1));
    expect(utxos).toEqual(scan(emulator, (u) => u.address === enterprise(1)));
    expect(utxos[0].outputIndex).toBe(7);
  });
});

describe("Emulator ledger maintained by blocks alone", () => {
  test("queries match a ledger scan through churn and compaction", async () => {
    const emulator = newEmulator();
    const addresses = [1, 2, 3].map(enterprise);
    const key = (i: number) => "f" + (i + 1).toString(16).padStart(63, "0") + 0;
    for (let i = 0; i < 300; i++) {
      emulator.mempool[key(i)] = {
        utxo: {
          ...entry("00", 0, addresses[i % 3]).utxo,
          txHash: key(i).slice(0, 64),
          assets: i % 5 === 0 ? { lovelace: 1n, [NFT]: 1n } : { lovelace: 1n },
        },
        spent: false,
      };
    }
    emulator.awaitBlock(1);
    // A spent mempool entry removes the ledger entry with the same key;
    // removing most entries compacts the mirror.
    for (let i = 0; i < 300; i++) {
      if (i % 4 === 3) continue;
      const [utxo] = await emulator.getUtxosByOutRef([
        { txHash: key(i).slice(0, 64), outputIndex: 0 },
      ]);
      emulator.mempool[key(i)] = { utxo, spent: true };
    }
    emulator.awaitBlock(1);
    for (let i = 0; i < 300; i++) {
      if (i % 4 === 3) continue;
      emulator.mempool[key(i)] = {
        utxo: { ...entry("00", 0, addresses[(i + 1) % 3]).utxo },
        spent: false,
      };
    }
    emulator.awaitBlock(1);
    const results = await Promise.all(
      addresses.flatMap((address) => [
        emulator.getUtxos(address),
        emulator.getUtxos({
          type: "Key",
          hash: getAddressDetails(address).paymentCredential!.hash,
        }),
        emulator.getUtxosWithUnit(address, NFT),
      ]),
    );
    // Reading `ledger` hands the record out; the scans run afterwards.
    expect(results).toEqual(
      addresses.flatMap((address) => [
        scan(emulator, (u) => u.address === address),
        scan(emulator, (u) => u.address === address),
        scan(emulator, (u) => u.address === address && u.assets[NFT] > 0n),
      ]),
    );
    expect(Object.keys(emulator.ledger)).toHaveLength(2 + 300);
  });
});

describe("Emulator transaction history edits", () => {
  test("a pending entry written by hand is confirmed by the next block", async () => {
    const emulator = newEmulator();
    const txHash = "ab".repeat(32);
    emulator.transactionHistory[txHash] = { status: "pending" };
    expect(await emulator.getTransactionStatus(txHash)).toEqual({
      status: "pending",
      txHash,
    });
    emulator.awaitBlock(1);
    expect(emulator.transactionHistory[txHash]).toEqual({
      status: "confirmed",
      blockHeight: 1,
      slot: 20,
    });
  });

  test("a replaced history record is confirmed by the next block", () => {
    const emulator = newEmulator();
    const txHash = "cd".repeat(32);
    emulator.transactionHistory = { [txHash]: { status: "pending" } };
    emulator.awaitSlot(20);
    expect(emulator.transactionHistory[txHash]).toEqual({
      status: "confirmed",
      blockHeight: 1,
      slot: 20,
    });
  });
});
