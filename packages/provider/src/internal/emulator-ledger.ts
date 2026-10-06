import { Address, Credential, Unit, UTxO } from "@lucid-evolution/core-types";
import { getAddressDetails } from "@lucid-evolution/utils";

/** Concatenation of txHash + outputIndex */
export type FlatOutRef = string;

export type LedgerEntry = { utxo: UTxO; spent: boolean };

/**
 * True for keys that a plain object does not keep in insertion order
 * (array indices come first, in ascending order) or does not store as an
 * own property at all (`__proto__`).
 */
const isUnorderedKey = (key: string): boolean => {
  if (key === "__proto__") return true;
  if (key.length > 10) return false;
  const index = Number(key);
  return (
    Number.isInteger(index) && index < 2 ** 32 - 1 && String(index) === key
  );
};

/**
 * The emulator's confirmed UTxO set: the plain record exposed as
 * `emulator.ledger`.
 *
 * Every query answers exactly what a scan of the record answers, in record
 * order. While no caller holds a reference to the record, only the emulator
 * writes to it, so a dense array mirrors its keys and entries in record
 * order and queries walk that array instead of enumerating a large
 * dictionary-mode object. Entries are read live during the walk, so in-place
 * edits to a UTxO (its address, its assets, or `spent`) through a reference
 * obtained elsewhere are still seen.
 *
 * Once the record has been handed out (`expose`) or supplied by a caller
 * (`replace`), it may be changed in any way at any time, so the mirror is
 * dropped and every read enumerates the record itself, as the emulator
 * always did.
 */
export class EmulatorLedger {
  #record: Record<FlatOutRef, LedgerEntry> = {};
  #exposed = false;
  /** Record keys in record order; `undefined` marks a deleted slot. */
  #keys: (FlatOutRef | undefined)[] = [];
  /** Record entries, parallel to `#keys`. */
  #entries: (LedgerEntry | undefined)[] = [];
  #slots = new Map<FlatOutRef, number>();
  #holes = 0;
  /** Per slot, the address whose payment hash `#slotHashes` holds. */
  #slotHashAddresses: (Address | undefined)[] = [];
  #slotHashes: (string | undefined)[] = [];
  #paymentHashes = new Map<Address, string | undefined>();

  /** The record, for internal reads that do not let it escape. */
  get record(): Record<FlatOutRef, LedgerEntry> {
    return this.#record;
  }

  /** Returns the record to a caller, who may then change it at any time. */
  expose(): Record<FlatOutRef, LedgerEntry> {
    this.#dropMirror();
    return this.#record;
  }

  /** Adopts a record supplied by a caller. */
  replace(record: Record<FlatOutRef, LedgerEntry>) {
    this.#record = record;
    this.#dropMirror();
  }

  get(outRef: FlatOutRef): LedgerEntry | undefined {
    return this.#record[outRef];
  }

  set(outRef: FlatOutRef, entry: LedgerEntry) {
    this.#record[outRef] = entry;
    if (this.#exposed) return;
    if (isUnorderedKey(outRef)) {
      this.#dropMirror();
      return;
    }
    const slot = this.#slots.get(outRef);
    if (slot === undefined) {
      this.#slots.set(outRef, this.#keys.length);
      this.#keys.push(outRef);
      this.#entries.push(entry);
      this.#slotHashAddresses.push(undefined);
      this.#slotHashes.push(undefined);
    } else {
      this.#entries[slot] = entry;
    }
  }

  /**
   * Moves the mempool into the record, then deletes every entry marked
   * spent, as the emulator always has.
   */
  applyMempool(mempool: Record<FlatOutRef, LedgerEntry>) {
    for (const [outRef, { utxo, spent }] of Object.entries(mempool)) {
      this.set(outRef, { utxo, spent });
    }
    const record = this.#record;
    if (this.#exposed) {
      for (const [outRef, { spent }] of Object.entries(record)) {
        if (spent) delete record[outRef];
      }
      return;
    }
    const keys = this.#keys;
    const entries = this.#entries;
    for (let slot = 0; slot < entries.length; slot++) {
      const entry = entries[slot];
      if (entry === undefined || !entry.spent) continue;
      const outRef = keys[slot]!;
      delete record[outRef];
      this.#slots.delete(outRef);
      keys[slot] = undefined;
      entries[slot] = undefined;
      this.#holes++;
    }
    if (this.#holes > 64 && this.#holes * 2 > entries.length) this.#compact();
  }

  /**
   * Unspent UTxOs at an address or payment credential, optionally holding
   * `unit`, in record order.
   */
  utxosAt(addressOrCredential: Address | Credential, unit?: Unit): UTxO[] {
    const utxos: UTxO[] = [];
    const entries = this.#inOrder();
    if (typeof addressOrCredential === "string") {
      for (let i = 0; i < entries.length; i++) {
        const entry = entries[i];
        if (entry === undefined && !this.#exposed) continue;
        const { utxo, spent } = entry!;
        if (
          !spent &&
          utxo.address === addressOrCredential &&
          (unit === undefined || utxo.assets[unit] > 0n)
        ) {
          utxos.push(utxo);
        }
      }
      return utxos;
    }
    const hash = addressOrCredential.hash;
    // In the mirror, remember each slot's payment hash with the address it
    // came from, so the walk does not look addresses up in a map.
    const hashAddresses = this.#slotHashAddresses;
    const hashes = this.#slotHashes;
    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i];
      if (entry === undefined && !this.#exposed) continue;
      const { utxo, spent } = entry!;
      if (spent) continue;
      const address = utxo.address;
      let paymentHash: string | undefined;
      if (this.#exposed) {
        paymentHash = this.#paymentHashOf(address);
      } else if (hashAddresses[i] === address) {
        paymentHash = hashes[i];
      } else {
        paymentHash = this.#paymentHashOf(address);
        hashAddresses[i] = address;
        hashes[i] = paymentHash;
      }
      if (
        paymentHash === hash &&
        (unit === undefined || utxo.assets[unit] > 0n)
      ) {
        utxos.push(utxo);
      }
    }
    return utxos;
  }

  /** Unspent UTxOs holding `unit`, in record order. */
  utxosWithUnit(unit: Unit): UTxO[] {
    const utxos: UTxO[] = [];
    const entries = this.#inOrder();
    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i];
      if (entry === undefined && !this.#exposed) continue;
      const { utxo, spent } = entry!;
      if (!spent && utxo.assets[unit] > 0n) utxos.push(utxo);
    }
    return utxos;
  }

  /**
   * The record's entries in record order. From the mirror, deleted slots
   * are `undefined`; from an exposed record, every value is as stored, so a
   * malformed entry fails a query just as a scan of the record would.
   */
  #inOrder(): readonly (LedgerEntry | undefined)[] {
    if (!this.#exposed) return this.#entries;
    const record = this.#record;
    const keys = Object.keys(record);
    const entries = new Array<LedgerEntry>(keys.length);
    for (let i = 0; i < keys.length; i++) entries[i] = record[keys[i]];
    return entries;
  }

  /** Payment credential hash of an address; parse errors propagate. */
  #paymentHashOf(address: Address): string | undefined {
    if (this.#paymentHashes.has(address))
      return this.#paymentHashes.get(address);
    const hash = getAddressDetails(address).paymentCredential?.hash;
    this.#paymentHashes.set(address, hash);
    return hash;
  }

  #compact() {
    const keys: FlatOutRef[] = [];
    const entries: LedgerEntry[] = [];
    const hashAddresses: (Address | undefined)[] = [];
    const hashes: (string | undefined)[] = [];
    this.#slots.clear();
    for (let slot = 0; slot < this.#entries.length; slot++) {
      const entry = this.#entries[slot];
      if (entry === undefined) continue;
      const outRef = this.#keys[slot]!;
      this.#slots.set(outRef, keys.length);
      keys.push(outRef);
      entries.push(entry);
      hashAddresses.push(this.#slotHashAddresses[slot]);
      hashes.push(this.#slotHashes[slot]);
    }
    this.#keys = keys;
    this.#entries = entries;
    this.#slotHashAddresses = hashAddresses;
    this.#slotHashes = hashes;
    this.#holes = 0;
  }

  #dropMirror() {
    this.#exposed = true;
    this.#keys = [];
    this.#entries = [];
    this.#slots.clear();
    this.#slotHashAddresses = [];
    this.#slotHashes = [];
    this.#holes = 0;
  }
}
