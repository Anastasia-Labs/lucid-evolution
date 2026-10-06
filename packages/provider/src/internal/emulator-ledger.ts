import { Address, Unit, UTxO } from "@lucid-evolution/core-types";
import { getAddressDetails } from "@lucid-evolution/utils";

/** Concatenation of txHash + outputIndex */
export type FlatOutRef = string;

export type LedgerEntry = { utxo: UTxO; spent: boolean };

type Bucket = Map<FlatOutRef, LedgerEntry>;

const addToBucket = <K>(
  buckets: Map<K, Bucket>,
  key: K,
  outRef: FlatOutRef,
  entry: LedgerEntry,
) => {
  let bucket = buckets.get(key);
  if (!bucket) {
    bucket = new Map();
    buckets.set(key, bucket);
  }
  bucket.set(outRef, entry);
};

const removeFromBucket = <K>(
  buckets: Map<K, Bucket>,
  key: K,
  outRef: FlatOutRef,
) => {
  const bucket = buckets.get(key);
  if (!bucket) return;
  bucket.delete(outRef);
  if (bucket.size === 0) buckets.delete(key);
};

/**
 * The emulator's confirmed UTxO set, with secondary indexes by address,
 * payment credential hash and unit.
 *
 * `entries` is the plain record the emulator has always exposed as `ledger`,
 * and `view` is a proxy over it that keeps the indexes in step when callers
 * add, replace or delete entries directly. Every index bucket is a Map, so
 * it iterates in insertion order, which is the iteration order of
 * `entries`; query results therefore come back in the same order as a scan
 * of the whole ledger.
 *
 * Each entry's `spent` flag is an accessor that records the outref when it
 * is set, so a block can drop spent entries without scanning the ledger.
 */
export class EmulatorLedger {
  readonly entries: Record<FlatOutRef, LedgerEntry>;
  readonly view: Record<FlatOutRef, LedgerEntry>;
  private readonly spentOutRefs = new Set<FlatOutRef>();
  private readonly byAddress = new Map<Address, Bucket>();
  private readonly byPaymentHash = new Map<string, Bucket>();
  private readonly byUnit = new Map<Unit, Bucket>();
  private readonly paymentHashes = new Map<Address, string | undefined>();
  /** Set when a direct write may have broken index order; rebuilt lazily. */
  private stale = false;

  constructor(entries: Record<FlatOutRef, LedgerEntry> = {}) {
    this.entries = entries;
    for (const [outRef, entry] of Object.entries(entries)) {
      this.track(outRef, entry);
      this.index(outRef, entry);
    }
    this.view = new Proxy(entries, {
      set: (target, property, value, receiver) => {
        if (typeof property !== "string") {
          return Reflect.set(target, property, value, receiver);
        }
        this.set(property, value);
        return true;
      },
      deleteProperty: (target, property) => {
        if (typeof property !== "string") {
          return Reflect.deleteProperty(target, property);
        }
        this.delete(property);
        return true;
      },
      defineProperty: (target, property, descriptor) => {
        this.stale = true;
        return Reflect.defineProperty(target, property, descriptor);
      },
    });
  }

  get(outRef: FlatOutRef): LedgerEntry | undefined {
    return this.entries[outRef];
  }

  set(outRef: FlatOutRef, entry: LedgerEntry) {
    const previous = this.entries[outRef];
    this.entries[outRef] = entry;
    this.track(outRef, entry);
    if (previous === entry) return;
    if (previous) {
      // A replaced key keeps its position in the record, which an index
      // bucket cannot express when the address or units change.
      this.stale = true;
    } else if (!this.stale) {
      this.index(outRef, entry);
    }
  }

  delete(outRef: FlatOutRef) {
    const entry = this.entries[outRef];
    if (!entry) return;
    delete this.entries[outRef];
    if (!this.stale) this.unindex(outRef, entry);
  }

  /** Removes every entry whose `spent` flag was set. */
  deleteSpent() {
    for (const outRef of this.spentOutRefs) {
      if (this.entries[outRef]?.spent) this.delete(outRef);
    }
    this.spentOutRefs.clear();
  }

  byAddressEntries(address: Address): Iterable<LedgerEntry> {
    this.refresh();
    return this.live(this.byAddress.get(address));
  }

  byPaymentHashEntries(hash: string): Iterable<LedgerEntry> {
    this.refresh();
    return this.live(this.byPaymentHash.get(hash));
  }

  byUnitEntries(unit: Unit): Iterable<LedgerEntry> {
    this.refresh();
    return this.live(this.byUnit.get(unit));
  }

  /**
   * Yields the bucket's entries that are still in the ledger. A bucket can
   * hold a stale reference only if an entry's assets were edited in place
   * before it was removed.
   */
  private *live(bucket: Bucket | undefined): Iterable<LedgerEntry> {
    if (!bucket) return;
    for (const [outRef, entry] of bucket) {
      if (this.entries[outRef] === entry) yield entry;
    }
  }

  private track(outRef: FlatOutRef, entry: LedgerEntry) {
    let spent = entry.spent;
    const spentOutRefs = this.spentOutRefs;
    Object.defineProperty(entry, "spent", {
      configurable: true,
      enumerable: true,
      get: () => spent,
      set: (value: boolean) => {
        spent = value;
        if (value) spentOutRefs.add(outRef);
      },
    });
    if (spent) spentOutRefs.add(outRef);
  }

  private paymentHashOf(address: Address): string | undefined {
    if (this.paymentHashes.has(address)) return this.paymentHashes.get(address);
    let hash: string | undefined;
    try {
      hash = getAddressDetails(address).paymentCredential?.hash;
    } catch (_e) {
      hash = undefined;
    }
    this.paymentHashes.set(address, hash);
    return hash;
  }

  private index(outRef: FlatOutRef, entry: LedgerEntry) {
    const { address, assets } = entry.utxo;
    addToBucket(this.byAddress, address, outRef, entry);
    const paymentHash = this.paymentHashOf(address);
    if (paymentHash !== undefined) {
      addToBucket(this.byPaymentHash, paymentHash, outRef, entry);
    }
    for (const unit in assets) addToBucket(this.byUnit, unit, outRef, entry);
  }

  private unindex(outRef: FlatOutRef, entry: LedgerEntry) {
    const { address, assets } = entry.utxo;
    removeFromBucket(this.byAddress, address, outRef);
    const paymentHash = this.paymentHashOf(address);
    if (paymentHash !== undefined) {
      removeFromBucket(this.byPaymentHash, paymentHash, outRef);
    }
    for (const unit in assets) removeFromBucket(this.byUnit, unit, outRef);
  }

  private refresh() {
    if (!this.stale) return;
    this.byAddress.clear();
    this.byPaymentHash.clear();
    this.byUnit.clear();
    for (const [outRef, entry] of Object.entries(this.entries)) {
      this.index(outRef, entry);
    }
    this.stale = false;
  }
}
