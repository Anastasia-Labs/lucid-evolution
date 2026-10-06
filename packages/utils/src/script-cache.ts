/**
 * Bounded memo tables keyed by script text.
 *
 * Script hex strings are long (a typical Plutus validator is 10-40k hex
 * characters). V8 hashes a string longer than 16383 characters by its length
 * alone, so a `Map` keyed by the script text puts every script of the same
 * length in one hash bucket and a lookup can compare tens of kilobytes per
 * entry. Parameterized validators make that common: every instance has the
 * same length and differs only near the end. The tables here hash a short
 * fingerprint of the script instead and confirm a hit by comparing the full
 * text, keeping at most `MAX_CHAIN` scripts per fingerprint.
 *
 * Store only immutable values: strings, or byte arrays that are never handed
 * to callers (return copies). Never store CML objects. Eviction is first-in
 * first-out.
 */

const SHORT_SCRIPT_LENGTH = 1024;
const SAMPLE_COUNT = 32;
const SAMPLE_WIDTH = 16;
const TAIL_WIDTH = 512;
const MAX_CHAIN = 4;

/**
 * A key that is short enough for V8 to hash in full. Short scripts are their
 * own key; longer ones keep their length, head and tail, and evenly spaced
 * samples of the middle.
 */
const fingerprint = (namespace: string, script: string): string => {
  const length = script.length;
  if (length <= SHORT_SCRIPT_LENGTH) return namespace + ":" + script;
  const stride = Math.floor((length - TAIL_WIDTH) / SAMPLE_COUNT);
  let key = namespace + ":" + length + ":";
  for (let offset = 0; offset < SAMPLE_COUNT; offset++) {
    const start = offset * stride;
    key += script.slice(start, start + SAMPLE_WIDTH);
  }
  return key + script.slice(length - TAIL_WIDTH);
};

type Entry<V> = {
  readonly key: string;
  readonly script: string;
  readonly value: V;
  readonly weight: number;
};

/** A bounded memo table keyed by a namespace (such as the script type) and script text. */
export class ScriptCache<V> {
  private readonly buckets = new Map<string, Entry<V>[]>();
  /** Insertion order, for first-in first-out eviction. */
  private readonly order = new Set<Entry<V>>();
  private totalWeight = 0;

  /**
   * @param capacity maximum number of entries
   * @param maxWeight maximum total weight, see `weigh`
   * @param weigh approximate retained bytes of an entry besides its key
   */
  constructor(
    private readonly capacity: number,
    private readonly maxWeight: number,
    private readonly weigh: (value: V) => number = () => 0,
  ) {}

  get size(): number {
    return this.order.size;
  }

  get(namespace: string, script: string): V | undefined {
    const bucket = this.buckets.get(fingerprint(namespace, script));
    if (bucket === undefined) return undefined;
    for (const entry of bucket) {
      if (entry.script === script) return entry.value;
    }
    return undefined;
  }

  set(namespace: string, script: string, value: V): void {
    const weight = script.length + this.weigh(value);
    // An entry larger than the whole budget is not worth keeping.
    if (weight > this.maxWeight) return;
    const key = fingerprint(namespace, script);
    const previous = this.buckets.get(key);
    if (previous !== undefined) {
      const existing = previous.find((entry) => entry.script === script);
      if (existing !== undefined) this.remove(existing);
      if (previous.length >= MAX_CHAIN) this.remove(previous[0]);
    }
    const entry: Entry<V> = { key, script, value, weight };
    // `remove` drops a bucket once it is empty.
    const bucket = this.buckets.get(key);
    if (bucket === undefined) this.buckets.set(key, [entry]);
    else bucket.push(entry);
    this.order.add(entry);
    this.totalWeight += weight;
    while (
      this.order.size > this.capacity ||
      this.totalWeight > this.maxWeight
    ) {
      this.remove(this.order.values().next().value!);
    }
  }

  clear(): void {
    this.buckets.clear();
    this.order.clear();
    this.totalWeight = 0;
  }

  private remove(entry: Entry<V>): void {
    const bucket = this.buckets.get(entry.key);
    if (bucket !== undefined) {
      const index = bucket.indexOf(entry);
      if (index !== -1) bucket.splice(index, 1);
      if (bucket.length === 0) this.buckets.delete(entry.key);
    }
    if (this.order.delete(entry)) this.totalWeight -= entry.weight;
  }

  /**
   * Returns the cached value, or computes, stores and returns it. A `compute`
   * that throws stores nothing.
   */
  getOrCompute(namespace: string, script: string, compute: () => V): V {
    const cached = this.get(namespace, script);
    if (cached !== undefined) return cached;
    const value = compute();
    this.set(namespace, script, value);
    return value;
  }
}
