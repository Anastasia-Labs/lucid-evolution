import { Constr } from "./constr.js";
import type { Data } from "./data.js";

// The writer walks the data with one frame per container instead of one call
// per node. Maps whose keys are all integers or lowercase bytes, the usual
// case, are ordered directly. Other maps need structural key identities and
// PlutusData order; those are computed iteratively and only for their keys.
const U64_MAX = 0xffff_ffff_ffff_ffffn;
const MAX_CHUNK_BYTES = 64;
const HEX_PATTERN = /^[0-9a-fA-F]*$/;
const LOWER_HEX_PATTERN = /^[0-9a-f]*$/;
const HEX_BYTE = Array.from({ length: 256 }, (_, i) =>
  i.toString(16).padStart(2, "0"),
);
/** Depth from which the writer looks for cycles on its path. */
const CYCLE_CHECK_DEPTH = 1_000;

/** Thrown internally when an input is left to the CML codec. */
class Decline {}
const DECLINE = new Decline();

const head = (major: number, value: number | bigint): string => {
  const initial = major << 5;
  if (typeof value === "number" && value <= 0xffff_ffff) {
    if (value < 24) return HEX_BYTE[initial | value];
    if (value < 0x100) return HEX_BYTE[initial | 24] + HEX_BYTE[value];
    if (value < 0x10000) {
      return HEX_BYTE[initial | 25] + value.toString(16).padStart(4, "0");
    }
    return HEX_BYTE[initial | 26] + value.toString(16).padStart(8, "0");
  }
  const big = BigInt(value);
  if (big <= 0xffff_ffffn) return head(major, Number(big));
  return HEX_BYTE[initial | 27] + big.toString(16).padStart(16, "0");
};

/** Encodes lowercase, even-length hex as a CBOR byte string. */
const encodeBytesHex = (hex: string): string => {
  const length = hex.length / 2;
  if (length <= MAX_CHUNK_BYTES) return head(2, length) + hex;
  let out = "5f";
  for (let i = 0; i < hex.length; i += MAX_CHUNK_BYTES * 2) {
    const chunk = hex.slice(i, i + MAX_CHUNK_BYTES * 2);
    out += head(2, chunk.length / 2) + chunk;
  }
  return out + "ff";
};

const encodeInteger = (value: bigint): string => {
  if (value >= 0n) {
    if (value <= U64_MAX) return head(0, value);
    return "c2" + encodeBytesHex(evenHex(value));
  }
  const magnitude = -1n - value;
  if (magnitude <= U64_MAX) return head(1, magnitude);
  return "c3" + encodeBytesHex(evenHex(magnitude));
};

const evenHex = (value: bigint): string => {
  const hex = value.toString(16);
  return hex.length % 2 === 0 ? hex : "0" + hex;
};

const bytesHex = (data: string): string => {
  if (data.length % 2 !== 0) throw DECLINE;
  if (LOWER_HEX_PATTERN.test(data)) return data;
  if (!HEX_PATTERN.test(data)) throw DECLINE;
  return data.toLowerCase();
};

/**
 * The constructor index as CML reads it, which is from the index's string
 * form: integral numbers below 1e21 and bigints within 64 bits.
 */
const constrAlternative = (constr: Constr<unknown>): bigint => {
  const { index } = constr;
  if (typeof index !== "number" && typeof index !== "bigint") throw DECLINE;
  const text = String(index);
  if (!/^\d+$/.test(text)) throw DECLINE;
  const alternative = BigInt(text);
  if (alternative > U64_MAX) throw DECLINE;
  return alternative;
};

/** The items `forEach` visits, which skips holes as CML's encoder did. */
const listItems = (list: unknown): Data[] => {
  if (!(list instanceof Array)) throw DECLINE;
  for (let i = 0; i < list.length; i++) {
    if (list[i] === undefined) {
      const items: Data[] = [];
      list.forEach((item) => items.push(item));
      return items;
    }
  }
  return list;
};

// ---------------------------------------------------------------------------
// Map keys other than integers and lowercase bytes

type Value =
  | { rank: 0; alternative: bigint; items: Value[]; id: number }
  | { rank: 1; sorted: [Value, Value][]; id: number }
  | { rank: 2; items: Value[]; id: number }
  | { rank: 3; integer: bigint; id: number }
  | { rank: 4; hex: string; id: number };

/** A container whose key value is being built. */
type KeyFrame = {
  source: Constr<Data> | Data[] | Map<Data, Data>;
  children: Data[];
  values: Value[];
  tracked: boolean;
};

/**
 * Structural identities and PlutusData order for map keys. Interned
 * identities describe child identities, so deep keys do not need a string of
 * the whole subtree at every level. Values are shared across one encoding.
 */
class Keys {
  private readonly ready = new Map<object, Value>();
  private readonly identities = new Map<string, number>();
  private path: Set<object> | undefined;

  private identity(key: string): number {
    let id = this.identities.get(key);
    if (id === undefined) {
      id = this.identities.size;
      this.identities.set(key, id);
    }
    return id;
  }

  /**
   * The entries a CML PlutusMap holds after setting each entry in turn: a
   * repeated key drops its earlier entry and is appended again.
   */
  stored(entries: [Data, Data][]): { key: Value; entry: [Data, Data] }[] {
    const keyed = entries.map((entry) => ({
      key: this.value(entry[0]),
      entry,
    }));
    const latest = new Map<number, number>();
    keyed.forEach(({ key }, i) => latest.set(key.id, i));
    return keyed.filter(({ key }, i) => latest.get(key.id) === i);
  }

  /** The value of an integer, bytes or a container already seen. */
  private known(data: Data): Value | undefined {
    if (typeof data === "bigint")
      return { rank: 3, integer: data, id: this.identity("i" + data) };
    if (typeof data === "string") {
      const hex = bytesHex(data);
      return { rank: 4, hex, id: this.identity("b" + hex) };
    }
    if (typeof data !== "object" || data === null) throw DECLINE;
    return this.ready.get(data);
  }

  value(root: Data): Value {
    const frames: KeyFrame[] = [];
    let data = root;
    for (;;) {
      let value = this.known(data);
      if (value === undefined) {
        let children: Data[];
        if (data instanceof Constr) {
          constrAlternative(data);
          children = listItems(data.fields);
        } else if (data instanceof Array) children = listItems(data);
        else if (data instanceof Map) {
          children = [];
          for (const [key, item] of data as Map<Data, Data>)
            children.push(key, item);
        } else throw DECLINE;
        // Only a cycle makes the path this deep twice over the same value.
        const tracked = frames.length >= CYCLE_CHECK_DEPTH;
        if (tracked) {
          this.path ??= new Set();
          if (this.path.has(data as object)) throw DECLINE;
          this.path.add(data as object);
        }
        frames.push({
          source: data as KeyFrame["source"],
          children,
          values: [],
          tracked,
        });
      }
      for (;;) {
        const frame = frames[frames.length - 1];
        if (frame === undefined) return value!;
        if (value !== undefined) frame.values.push(value);
        if (frame.values.length < frame.children.length) {
          data = frame.children[frame.values.length];
          break;
        }
        frames.pop();
        if (frame.tracked) this.path!.delete(frame.source);
        value = this.finish(frame);
      }
    }
  }

  private finish({ source, values }: KeyFrame): Value {
    let value: Value;
    if (source instanceof Constr) {
      const alternative = constrAlternative(source);
      value = {
        rank: 0,
        alternative,
        items: values,
        id: this.identity(
          `c${alternative}(${values.map((child) => child.id).join(",")})`,
        ),
      };
    } else if (source instanceof Array) {
      value = {
        rank: 2,
        items: values,
        id: this.identity(`l(${values.map((child) => child.id).join(",")})`),
      };
    } else {
      // Structural identities include the map's stored entry order.
      const latest = new Map<number, number>();
      for (let i = 0; i < values.length; i += 2) latest.set(values[i].id, i);
      const entries: [Value, Value][] = [];
      for (let i = 0; i < values.length; i += 2) {
        if (latest.get(values[i].id) === i)
          entries.push([values[i], values[i + 1]]);
      }
      value = {
        rank: 1,
        sorted: [...entries].sort(([a], [b]) => compare(a, b)),
        id: this.identity(
          `m(${entries.map(([key, item]) => `${key.id}:${item.id}`).join(",")})`,
        ),
      };
    }
    this.ready.set(source, value);
    return value;
  }
}

/** CML's PlutusData order after converting maps to node format. */
const compare = (left: Value, right: Value): number => {
  const pending: ([Value, Value] | number)[] = [[left, right]];
  while (pending.length > 0) {
    const next = pending.pop()!;
    if (typeof next === "number") {
      if (next !== 0) return next;
      continue;
    }
    const [a, b] = next;
    if (a.id === b.id) continue;
    if (a.rank !== b.rank) return a.rank - b.rank;
    if (a.rank === 3 && b.rank === 3) {
      if (a.integer !== b.integer) return a.integer < b.integer ? -1 : 1;
    } else if (a.rank === 4 && b.rank === 4) {
      if (a.hex !== b.hex) return a.hex < b.hex ? -1 : 1;
    } else if (
      (a.rank === 0 && b.rank === 0) ||
      (a.rank === 2 && b.rank === 2)
    ) {
      if (a.rank === 0 && b.rank === 0 && a.alternative !== b.alternative)
        return a.alternative < b.alternative ? -1 : 1;
      pending.push(a.items.length - b.items.length);
      for (let i = Math.min(a.items.length, b.items.length) - 1; i >= 0; i--)
        pending.push([a.items[i], b.items[i]]);
    } else if (a.rank === 1 && b.rank === 1) {
      pending.push(a.sorted.length - b.sorted.length);
      for (
        let i = Math.min(a.sorted.length, b.sorted.length) - 1;
        i >= 0;
        i--
      ) {
        pending.push([a.sorted[i][1], b.sorted[i][1]]);
        pending.push([a.sorted[i][0], b.sorted[i][0]]);
      }
    }
  }
  return 0;
};

/** Whether every key is an integer or lowercase bytes, merged by `Map`. */
const plainKeys = (entries: [Data, Data][]): boolean => {
  for (const [key] of entries) {
    if (typeof key === "bigint") continue;
    if (
      typeof key !== "string" ||
      key.length % 2 !== 0 ||
      !LOWER_HEX_PATTERN.test(key)
    )
      return false;
  }
  return true;
};

/** PlutusData order of integers (first) and lowercase bytes. */
const comparePlain = ([a]: [Data, Data], [b]: [Data, Data]): number => {
  if (typeof a !== typeof b) return typeof a === "bigint" ? -1 : 1;
  return a < b ? -1 : a > b ? 1 : 0;
};

const compareEncoded = ([a]: [string, Data], [b]: [string, Data]): number =>
  a.length - b.length || (a < b ? -1 : a > b ? 1 : 0);

// ---------------------------------------------------------------------------
// Writing

/** A container being written. */
class Frame {
  next: number;
  /** Encoded canonical map keys with their values, once ordered. */
  encoded: [string, Data][] | null = null;
  /** Canonical map entries whose composite keys are encoded first. */
  pending: [Data, Data][] | null = null;
  /** The output before the map whose keys are being encoded. */
  saved = "";
  /** Whether the frame is on the path checked for cycles. */
  tracked = false;
  constructor(
    readonly source: object,
    /** Children still to write, from `next` on. */
    readonly items: Data[],
    next: number,
    readonly close: string,
  ) {
    this.next = next;
  }
}

const encodeKey = (key: Data): string =>
  typeof key === "bigint"
    ? encodeInteger(key)
    : encodeBytesHex(bytesHex(key as string));

const NO_ITEMS: Data[] = [];

const encode = (root: Data, canonical: boolean): string => {
  let out = "";
  let keys: Keys | undefined;
  const frames: Frame[] = [];
  let path: Set<object> | undefined;
  let data = root;
  // Writes `data`, then moves to the next child, finishing containers.
  for (;;) {
    if (typeof data === "bigint") out += encodeInteger(data);
    else if (typeof data === "string") out += encodeBytesHex(bytesHex(data));
    else {
      let items: Data[];
      let close = "";
      let frame: Frame | undefined;
      if (data instanceof Constr) {
        const alternative = constrAlternative(data);
        items = listItems(data.fields);
        if (alternative <= 6n) out += head(6, 121 + Number(alternative));
        else if (alternative <= 127n)
          out += head(6, 1280 + Number(alternative) - 7);
        else if (canonical) out += "d86682" + head(0, alternative);
        else {
          out += "d8669f" + head(0, alternative);
          close = "ff";
        }
        if (items.length === 0) out += "80";
        else if (canonical) out += head(4, items.length);
        else {
          out += "9f";
          close += "ff";
        }
      } else if (data instanceof Array) {
        items = listItems(data);
        if (items.length === 0) out += "80";
        else if (canonical) out += head(4, items.length);
        else {
          out += "9f";
          close = "ff";
        }
      } else if (data instanceof Map) {
        let entries = [...(data as Map<Data, Data>)];
        const plain = entries.length < 2 || plainKeys(entries);
        if (!plain) {
          keys ??= new Keys();
          const stored = keys.stored(entries);
          if (!canonical) stored.sort((a, b) => compare(a.key, b.key));
          entries = stored.map(({ entry }) => entry);
        } else if (!canonical && entries.length > 1) entries.sort(comparePlain);
        if (entries.length === 0) {
          out += "a0";
          items = NO_ITEMS;
        } else if (!canonical || entries.length === 1) {
          out += canonical ? "a1" : "bf";
          if (!canonical) close = "ff";
          items = [];
          for (const [key, value] of entries) items.push(key, value);
        } else if (plain) {
          // Canonical CBOR orders keys by encoding: shorter first, then
          // bytewise, which for hex strings is the same as comparing them.
          const encoded = entries.map(([key, value]): [string, Data] => [
            encodeKey(key),
            value,
          ]);
          encoded.sort(compareEncoded);
          out += head(5, encoded.length);
          items = NO_ITEMS;
          frame = new Frame(data, items, 0, close);
          frame.encoded = encoded;
        } else {
          items = NO_ITEMS;
          frame = new Frame(data, items, 0, close);
          frame.pending = entries;
          frame.encoded = [];
          frame.saved = out;
          out = "";
        }
      } else throw DECLINE;
      if (frame === undefined) {
        // Write leading integers and bytes in place; a container of only
        // those needs no frame.
        let next = 0;
        while (next < items.length) {
          const item = items[next];
          if (typeof item === "bigint") out += encodeInteger(item);
          else if (typeof item === "string")
            out += encodeBytesHex(bytesHex(item));
          else break;
          next++;
        }
        if (next === items.length) out += close;
        else frame = new Frame(data, items, next, close);
      }
      if (frame !== undefined) {
        if (frames.length >= CYCLE_CHECK_DEPTH) {
          path ??= new Set();
          if (path.has(data)) throw DECLINE;
          path.add(data);
          frame.tracked = true;
        }
        frames.push(frame);
      }
    }
    // Find the next item to write.
    for (;;) {
      const frame = frames[frames.length - 1];
      if (frame === undefined) return out;
      const pending = frame.pending;
      if (pending !== null) {
        // Composite canonical keys order by their encoding, so encode them
        // first, each on its own.
        const encoded = frame.encoded!;
        if (frame.next > 0) encoded.push([out, pending[frame.next - 1][1]]);
        if (frame.next < pending.length) {
          out = "";
          data = pending[frame.next++][0];
          break;
        }
        encoded.sort(compareEncoded);
        out = frame.saved + head(5, encoded.length);
        frame.next = 0;
        frame.pending = null;
      }
      const encoded = frame.encoded;
      if (encoded !== null) {
        if (frame.next < encoded.length) {
          const [key, value] = encoded[frame.next++];
          out += key;
          data = value;
          break;
        }
      } else if (frame.next < frame.items.length) {
        data = frame.items[frame.next++];
        break;
      }
      out += frame.close;
      frames.pop();
      if (frame.tracked) path!.delete(frame.source);
    }
  }
};

/** Encodes as CML does, or leaves unsupported input to the CML codec. */
export const encodePlutusData = (
  data: Data,
  canonical: boolean,
): string | undefined => {
  try {
    return encode(data, canonical);
  } catch (_error) {
    return undefined;
  }
};
