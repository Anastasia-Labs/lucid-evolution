import { Constr } from "./constr.js";
import type { Data } from "./data.js";
export { encodePlutusData } from "./data-cbor-encode.js";

const MAX_CHUNK_BYTES = 64;
const MAX_SAFE_INDEX = BigInt(Number.MAX_SAFE_INTEGER);
class Decline {}
const DECLINE = new Decline();

// ---------------------------------------------------------------------------
// Decoding

/** Reads CBOR from validated lowercase hex, a byte at a time. */
type Cursor = {
  hex: string;
  /** The input length, in bytes. */
  length: number;
  pos: number;
  identities?: Identities;
};

const LOWER_HEX_PATTERN = /^[0-9a-f]*$/;
const HEX_PATTERN = /^[0-9a-fA-F]*$/;

/** Hex digit values by character code. */
const NIBBLES = new Uint8Array(103);
for (let i = 0; i < 16; i++) NIBBLES["0123456789abcdef".charCodeAt(i)] = i;

/** A cursor over hex in either case; anything else is declined. */
const hexCursor = (raw: string): Cursor => {
  if (raw.length % 2 !== 0) throw DECLINE;
  let hex = raw;
  if (!LOWER_HEX_PATTERN.test(hex)) {
    if (!HEX_PATTERN.test(hex)) throw DECLINE;
    hex = hex.toLowerCase();
  }
  return { hex, length: hex.length / 2, pos: 0 };
};

const byteAt = (hex: string, pos: number): number =>
  (NIBBLES[hex.charCodeAt(2 * pos)] << 4) |
  NIBBLES[hex.charCodeAt(2 * pos + 1)];

const SMALL_INTEGERS = Array.from({ length: 24 }, (_, i) => BigInt(i));

const readByte = (cursor: Cursor): number => {
  if (cursor.pos >= cursor.length) throw DECLINE;
  return byteAt(cursor.hex, cursor.pos++);
};

/** Reads a head argument; additional info 31 (indefinite) is the caller's. */
const readArgument = (cursor: Cursor, info: number): bigint => {
  if (info < 24) return SMALL_INTEGERS[info];
  if (info === 27) {
    let value = 0n;
    for (let i = 0; i < 8; i++) {
      value = (value << 8n) | BigInt(readByte(cursor));
    }
    return value;
  }
  const size = info === 24 ? 1 : info === 25 ? 2 : info === 26 ? 4 : 0;
  if (size === 0) throw DECLINE;
  let value = 0;
  for (let i = 0; i < size; i++) value = value * 256 + readByte(cursor);
  return BigInt(value);
};

const readLength = (cursor: Cursor, info: number): number => {
  const length = readArgument(cursor, info);
  if (length > BigInt(cursor.length)) throw DECLINE;
  return Number(length);
};

const isBreak = (cursor: Cursor): boolean => {
  if (cursor.pos >= cursor.length) throw DECLINE;
  if (byteAt(cursor.hex, cursor.pos) !== 0xff) return false;
  cursor.pos++;
  return true;
};

const readChunk = (cursor: Cursor, length: number): string => {
  if (length > MAX_CHUNK_BYTES) throw DECLINE;
  const start = cursor.pos;
  const end = start + length;
  if (end > cursor.length) throw DECLINE;
  cursor.pos = end;
  return cursor.hex.slice(start * 2, end * 2);
};

/** Reads a byte string whose initial byte (major type 2) was consumed. */
const readBytes = (cursor: Cursor, info: number): string => {
  if (info !== 31) return readChunk(cursor, readLength(cursor, info));
  let hex = "";
  while (!isBreak(cursor)) {
    const initial = readByte(cursor);
    if (initial >> 5 !== 2 || (initial & 31) === 31) throw DECLINE;
    hex += readChunk(cursor, readLength(cursor, initial & 31));
  }
  return hex;
};

/** CML returns an independent value for each repeated-key lookup. */
const copyData = (root: Data): Data => {
  type Task =
    | { kind: "copy"; data: Data; assign: (value: Data) => void }
    | { kind: "entry"; target: Map<Data, Data>; pair: Data[] };
  let result: Data = 0n;
  const tasks: Task[] = [
    {
      kind: "copy",
      data: root,
      assign: (value) => {
        result = value;
      },
    },
  ];
  while (tasks.length > 0) {
    const task = tasks.pop()!;
    if (task.kind === "entry") {
      task.target.set(task.pair[0], task.pair[1]);
      continue;
    }
    const { data, assign } = task;
    if (typeof data === "bigint" || typeof data === "string") {
      assign(data);
      continue;
    }
    if (data instanceof Map) {
      const target = new Map<Data, Data>();
      assign(target);
      const entries = [...data.entries()];
      for (let i = entries.length - 1; i >= 0; i--) {
        const pair: Data[] = [];
        tasks.push({ kind: "entry", target, pair });
        tasks.push({
          kind: "copy",
          data: entries[i][1],
          assign: (value) => {
            pair[1] = value;
          },
        });
        tasks.push({
          kind: "copy",
          data: entries[i][0],
          assign: (value) => {
            pair[0] = value;
          },
        });
      }
    } else {
      const source = data instanceof Constr ? data.fields : data;
      const target: Data[] = [];
      assign(data instanceof Constr ? new Constr(data.index, target) : target);
      for (let i = source.length - 1; i >= 0; i--)
        tasks.push({
          kind: "copy",
          data: source[i],
          assign: (value) => {
            target[i] = value;
          },
        });
    }
  }
  return result;
};

/** A map's keys and values, alternating. */
const flatten = (map: Map<Data, Data>): Data[] => {
  const items: Data[] = [];
  for (const [key, value] of map) items.push(key, value);
  return items;
};

/**
 * Structural identities of decoded map keys, under which CML treats two keys
 * as one. They are computed only for keys other than integers and bytes. A
 * container's identity names its children, and a key nested in another key
 * by an interned number, so a deep key needs no string of its whole subtree
 * at every level. The tables live for one decoding.
 */
class Identities {
  private readonly ids = new Map<string, number>();
  /** Interned identities of keys inside other keys. */
  private readonly known = new Map<object, string>();
  /** Every entry of decoded maps that repeated a key, as CML holds them. */
  readonly rawEntries = new Map<Map<Data, Data>, Data[]>();
  /** Constructor indices that a JavaScript number does not hold exactly. */
  readonly rawIndex = new Map<Constr<Data>, bigint>();

  /** The identity of an integer, bytes or a known key, as a part of another. */
  private part(data: Data): string | undefined {
    if (typeof data === "bigint") return "i" + data;
    if (typeof data === "string") return "b" + data;
    return this.known.get(data);
  }

  private intern(text: string): string {
    let id = this.ids.get(text);
    if (id === undefined) {
      id = this.ids.size;
      this.ids.set(text, id);
    }
    return "#" + id;
  }

  private children(node: object): Data[] {
    if (node instanceof Map) return this.rawEntries.get(node) ?? flatten(node);
    return node instanceof Constr ? node.fields : (node as Data[]);
  }

  private text(node: object, parts: string[]): string {
    return (
      (node instanceof Map
        ? "m("
        : node instanceof Constr
          ? `c${node.index > Number.MAX_SAFE_INTEGER ? this.rawIndex.get(node) : node.index}(`
          : "l(") +
      parts.join(",") +
      ")"
    );
  }

  /**
   * The identity of a key. Keys inside another key, which later names them,
   * are `nested`; other identities are not interned.
   */
  of(key: Data, nested: boolean): string {
    if (typeof key !== "object") return this.part(key)!;
    // Most composite keys hold only integers and bytes.
    const children = this.children(key);
    const parts: string[] = [];
    for (const child of children) {
      const part = this.part(child);
      if (part === undefined) break;
      parts.push(part);
    }
    const text =
      parts.length === children.length
        ? this.text(key, parts)
        : this.composite(key);
    if (!nested) return text;
    // The identity of the key around this one names it.
    const interned = this.intern(text);
    this.known.set(key, interned);
    return interned;
  }

  private composite(key: object): string {
    type Frame = { node: object; children: Data[]; parts: string[] };
    const frames: Frame[] = [];
    let node = key;
    for (;;) {
      let frame: Frame | undefined = {
        node,
        children: this.children(node),
        parts: [],
      };
      frames.push(frame);
      while (frame !== undefined) {
        const { parts, children } = frame;
        while (parts.length < children.length) {
          const part = this.part(children[parts.length]);
          if (part === undefined) break;
          parts.push(part);
        }
        if (parts.length < children.length) {
          node = children[parts.length] as object;
          break;
        }
        frames.pop();
        const text = this.text(frame.node, parts);
        frame = frames[frames.length - 1];
        if (frame === undefined) return text;
        frame.parts.push(this.intern(text));
      }
    }
  }
}

const LIST = 0;
const CONSTR = 1;
const MAP = 2;
/** The `remaining` count of an indefinite-length container. */
const INDEFINITE = -1;

/** Duplicate-key bookkeeping, only for maps that need it. */
type KeyState = {
  /** First value of each composite key's identity. */
  firstValues: Map<string, Data> | null;
  /** All entries once a key repeated, which the map no longer shows. */
  raw: Data[] | null;
};

/** A container being decoded. One shape for all kinds keeps access fast. */
class Frame {
  readonly items: Data[] | null;
  readonly map: Map<Data, Data> | null;
  key: Data | undefined = undefined;
  hasKey = false;
  keyState: KeyState | null = null;
  /** Whether the container is inside a map key. */
  readonly nested: boolean;
  constructor(
    readonly kind: number,
    public remaining: number,
    readonly parent: Frame | undefined,
    items: Data[] | null,
    readonly index: bigint,
    readonly outerBreak: boolean,
  ) {
    this.items = items;
    this.map = kind === MAP ? new Map() : null;
    this.nested =
      parent !== undefined &&
      (parent.nested || (parent.kind === MAP && !parent.hasKey));
  }
}

const readContainerLength = (cursor: Cursor, info: number): number =>
  info === 31 ? INDEFINITE : readLength(cursor, info);

const identitiesOf = (cursor: Cursor): Identities =>
  (cursor.identities ??= new Identities());

const finish = (cursor: Cursor, frame: Frame): Data => {
  if (frame.kind === MAP) {
    const raw = frame.keyState?.raw;
    if (raw) identitiesOf(cursor).rawEntries.set(frame.map!, raw);
    return frame.map!;
  }
  if (frame.kind === LIST) return frame.items!;
  return constr(cursor, frame.index, frame.items!, frame.outerBreak);
};

const constr = (
  cursor: Cursor,
  index: bigint,
  fields: Data[],
  outerBreak: boolean,
): Constr<Data> => {
  if (outerBreak && !isBreak(cursor)) throw DECLINE;
  const data = new Constr(Number(index), fields);
  if (index > MAX_SAFE_INDEX) identitiesOf(cursor).rawIndex.set(data, index);
  return data;
};

/**
 * Reads the leading integers and byte strings of a list in place, so a list
 * of only those needs no frame. Returns whether the list ended, or leaves
 * the cursor at the first item that is a container.
 */
const readPlainItems = (
  cursor: Cursor,
  items: Data[],
  length: number,
): boolean => {
  const { hex } = cursor;
  while (length === INDEFINITE || items.length < length) {
    if (cursor.pos >= cursor.length) throw DECLINE;
    const initial = byteAt(hex, cursor.pos);
    const major = initial >> 5;
    if (major === 0) {
      cursor.pos++;
      items.push(readArgument(cursor, initial & 31));
    } else if (major === 2) {
      cursor.pos++;
      items.push(readBytes(cursor, initial & 31));
    } else if (major === 1) {
      cursor.pos++;
      items.push(-1n - readArgument(cursor, initial & 31));
    } else if (initial === 0xff) {
      // CML also accepts a break before a definite length.
      cursor.pos++;
      return true;
    } else return false;
  }
  return true;
};

const remainingAfter = (length: number, items: Data[]): number =>
  length === INDEFINITE ? INDEFINITE : length - items.length;

/** Adds a map entry as CML reads it, keeping its duplicate-key semantics. */
const addEntry = (cursor: Cursor, frame: Frame, key: Data, value: Data) => {
  const map = frame.map!;
  // Lookup uses the first value for each structurally equal *raw* key,
  // and CML accessors return an independent copy for each repeated key.
  let first: Data | undefined;
  if (typeof key === "object") {
    // A first key repeats nothing; its identity waits for a composite key
    // to compare with.
    if (map.size === 0) {
      map.set(key, value);
      return;
    }
    const identities = identitiesOf(cursor);
    const state = (frame.keyState ??= { firstValues: null, raw: null });
    let firstValues = state.firstValues;
    if (firstValues === null) {
      firstValues = state.firstValues = new Map();
      // Only the first key can be composite and without an identity yet.
      const [earlier, earlierValue] = map.entries().next().value!;
      if (typeof earlier === "object")
        firstValues.set(identities.of(earlier, frame.nested), earlierValue);
    }
    const identity = identities.of(key, frame.nested);
    first = firstValues.get(identity);
    if (first === undefined) firstValues.set(identity, value);
  } else {
    first = map.get(key);
    if (first === undefined && frame.keyState === null) {
      map.set(key, value);
      return;
    }
  }
  const state = (frame.keyState ??= { firstValues: null, raw: null });
  if (first !== undefined && state.raw === null) state.raw = flatten(map);
  state.raw?.push(key, value);
  map.set(key, first === undefined ? value : copyData(first));
};

const decode = (cursor: Cursor): Data => {
  const { hex } = cursor;
  let frame: Frame | undefined;
  for (;;) {
    let data: Data;
    // CML accepts a break before the declared length of a definite container,
    // too. A map value is never an ending break.
    if (frame !== undefined && !frame.hasKey && frame.remaining === 0) {
      data = finish(cursor, frame);
      frame = frame.parent;
    } else {
      if (cursor.pos >= cursor.length) throw DECLINE;
      const initial = byteAt(hex, cursor.pos++);
      const major = initial >> 5;
      const info = initial & 31;
      if (major === 0) data = readArgument(cursor, info);
      else if (major === 2) data = readBytes(cursor, info);
      else if (major === 4) {
        const length = readContainerLength(cursor, info);
        const items: Data[] = [];
        if (readPlainItems(cursor, items, length)) data = items;
        else {
          const remaining = remainingAfter(length, items);
          frame = new Frame(LIST, remaining, frame, items, 0n, false);
          continue;
        }
      } else if (major === 6) {
        const tag = readArgument(cursor, info);
        if (tag === 2n || tag === 3n) {
          const payload = readByte(cursor);
          if (payload >> 5 !== 2) throw DECLINE;
          const digits = readBytes(cursor, payload & 31);
          const magnitude = digits.length === 0 ? 0n : BigInt("0x" + digits);
          data = tag === 2n ? magnitude : -1n - magnitude;
        } else {
          let index: bigint;
          let outerBreak = false;
          if (tag >= 121n && tag <= 127n) index = tag - 121n;
          else if (tag >= 1280n && tag <= 1400n) index = tag - 1280n + 7n;
          else if (tag === 102n) {
            const array = readByte(cursor);
            if (array >> 5 !== 4) throw DECLINE;
            const count = readContainerLength(cursor, array & 31);
            if (count !== INDEFINITE && count < 2) throw DECLINE;
            outerBreak = count === INDEFINITE;
            const initialIndex = readByte(cursor);
            if (initialIndex >> 5 !== 0) throw DECLINE;
            index = readArgument(cursor, initialIndex & 31);
          } else throw DECLINE;
          const fields = readByte(cursor);
          if (fields >> 5 !== 4) throw DECLINE;
          const length = readContainerLength(cursor, fields & 31);
          const items: Data[] = [];
          if (readPlainItems(cursor, items, length))
            data = constr(cursor, index, items, outerBreak);
          else {
            const remaining = remainingAfter(length, items);
            frame = new Frame(
              CONSTR,
              remaining,
              frame,
              items,
              index,
              outerBreak,
            );
            continue;
          }
        }
      } else if (major === 5) {
        const length = readContainerLength(cursor, info);
        frame = new Frame(MAP, length, frame, null, 0n, false);
        continue;
      } else if (major === 1) data = -1n - readArgument(cursor, info);
      else if (initial === 0xff && frame !== undefined && !frame.hasKey) {
        data = finish(cursor, frame);
        frame = frame.parent;
      } else throw DECLINE;
    }
    if (frame === undefined) return data;
    if (frame.kind === MAP) {
      if (frame.hasKey) {
        addEntry(cursor, frame, frame.key!, data);
        frame.key = undefined;
        frame.hasKey = false;
      } else {
        frame.key = data;
        frame.hasKey = true;
        continue;
      }
    } else frame.items!.push(data);
    if (frame.remaining !== INDEFINITE) frame.remaining--;
  }
};

/**
 * Decodes CBOR hex into Plutus data exactly as CML does, or returns
 * `undefined` for input it leaves to CML. Like CML, it ignores bytes after
 * the first data item.
 */
export const decodePlutusData = (raw: string): Data | undefined => {
  try {
    if (typeof raw !== "string") return undefined;
    return decode(hexCursor(raw));
  } catch (_error) {
    return undefined;
  }
};
