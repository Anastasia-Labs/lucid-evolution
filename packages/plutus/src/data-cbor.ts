import { Constr } from "./constr.js";
import type { Data } from "./data.js";
export { encodePlutusData } from "./data-cbor-encode.js";

const MAX_CHUNK_BYTES = 64;
const HEX_PATTERN = /^[0-9a-fA-F]*$/;
class Decline {}
const DECLINE = new Decline();

// ---------------------------------------------------------------------------
// Decoding

type Cursor = { bytes: Uint8Array; hex: string; pos: number };

const nibble = (code: number): number =>
  code >= 48 && code <= 57 ? code - 48 : code - 87; // 0-9, a-f

/** Parses lowercase hex; anything else is declined. */
const hexToBytes = (hex: string): Uint8Array => {
  if (hex.length % 2 !== 0 || !HEX_PATTERN.test(hex)) throw DECLINE;
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0, j = 0; i < bytes.length; i++, j += 2) {
    bytes[i] = (nibble(hex.charCodeAt(j)) << 4) | nibble(hex.charCodeAt(j + 1));
  }
  return bytes;
};

const readByte = (cursor: Cursor): number => {
  if (cursor.pos >= cursor.bytes.length) throw DECLINE;
  return cursor.bytes[cursor.pos++];
};

/** Reads a head argument; additional info 31 (indefinite) is the caller's. */
const readArgument = (cursor: Cursor, info: number): bigint => {
  if (info < 24) return BigInt(info);
  const size = info === 24 ? 1 : info === 25 ? 2 : info === 26 ? 4 : 0;
  if (info === 27) {
    let value = 0n;
    for (let i = 0; i < 8; i++) {
      value = (value << 8n) | BigInt(readByte(cursor));
    }
    return value;
  }
  if (size === 0) throw DECLINE;
  let value = 0;
  for (let i = 0; i < size; i++) value = value * 256 + readByte(cursor);
  return BigInt(value);
};

const readLength = (cursor: Cursor, info: number): number => {
  const length = readArgument(cursor, info);
  if (length > BigInt(cursor.bytes.length)) throw DECLINE;
  return Number(length);
};

const isBreak = (cursor: Cursor): boolean => {
  if (cursor.pos >= cursor.bytes.length) throw DECLINE;
  if (cursor.bytes[cursor.pos] !== 0xff) return false;
  cursor.pos++;
  return true;
};

const readChunk = (cursor: Cursor, length: number): string => {
  if (length > MAX_CHUNK_BYTES) throw DECLINE;
  const start = cursor.pos;
  const end = start + length;
  if (end > cursor.bytes.length) throw DECLINE;
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

type Decoded = { data: Data; id: number };
type Frame =
  | { kind: "list"; items: Data[]; ids: number[]; remaining: number | null }
  | {
      kind: "constr";
      index: bigint;
      items: Data[];
      ids: number[];
      remaining: number | null;
      outerBreak: boolean;
    }
  | {
      kind: "map";
      map: Map<Data, Data>;
      ids: number[];
      firstValues: Map<number, Data>;
      key?: Decoded;
      remaining: number | null;
    };

const decode = (cursor: Cursor): Data => {
  const frames: Frame[] = [];
  const identities = new Map<string, number>();
  const identity = (key: string): number => {
    let id = identities.get(key);
    if (id === undefined) {
      id = identities.size;
      identities.set(key, id);
    }
    return id;
  };
  const length = (info: number) =>
    info === 31 ? null : readLength(cursor, info);
  const fieldsLength = () => {
    const initial = readByte(cursor);
    if (initial >> 5 !== 4) throw DECLINE;
    return length(initial & 31);
  };
  while (true) {
    const frame = frames[frames.length - 1];
    let decoded: Decoded;
    // CML accepts a break before the declared length of a definite container,
    // too. A map value is never an ending break.
    if (
      frame &&
      !(frame.kind === "map" && frame.key) &&
      (frame.remaining === 0 || isBreak(cursor))
    ) {
      frames.pop();
      if (frame.kind === "map") {
        decoded = {
          data: frame.map,
          id: identity(`m(${frame.ids.join(",")})`),
        };
      } else if (frame.kind === "constr") {
        if (frame.outerBreak && !isBreak(cursor)) throw DECLINE;
        decoded = {
          data: new Constr(Number(frame.index), frame.items),
          id: identity(`c${frame.index}(${frame.ids.join(",")})`),
        };
      } else {
        decoded = {
          data: frame.items,
          id: identity(`l(${frame.ids.join(",")})`),
        };
      }
    } else {
      const initial = readByte(cursor);
      const major = initial >> 5;
      const info = initial & 31;
      if (major === 0 || major === 1) {
        const magnitude = readArgument(cursor, info);
        const data = major === 0 ? magnitude : -1n - magnitude;
        decoded = { data, id: identity("i" + data) };
      } else if (major === 2) {
        const data = readBytes(cursor, info);
        decoded = { data, id: identity("b" + data) };
      } else if (major === 4) {
        frames.push({
          kind: "list",
          items: [],
          ids: [],
          remaining: length(info),
        });
        continue;
      } else if (major === 5) {
        frames.push({
          kind: "map",
          map: new Map(),
          ids: [],
          firstValues: new Map(),
          remaining: length(info),
        });
        continue;
      } else if (major === 6) {
        const tag = readArgument(cursor, info);
        if (tag === 2n || tag === 3n) {
          const payload = readByte(cursor);
          if (payload >> 5 !== 2) throw DECLINE;
          const hex = readBytes(cursor, payload & 31);
          const magnitude = hex.length === 0 ? 0n : BigInt("0x" + hex);
          const data = tag === 2n ? magnitude : -1n - magnitude;
          decoded = { data, id: identity("i" + data) };
        } else {
          let index: bigint;
          let outerBreak = false;
          if (tag >= 121n && tag <= 127n) index = tag - 121n;
          else if (tag >= 1280n && tag <= 1400n) index = tag - 1280n + 7n;
          else if (tag === 102n) {
            const array = readByte(cursor);
            if (array >> 5 !== 4) throw DECLINE;
            const count = length(array & 31);
            if (count !== null && count < 2) throw DECLINE;
            outerBreak = count === null;
            const initialIndex = readByte(cursor);
            if (initialIndex >> 5 !== 0) throw DECLINE;
            index = readArgument(cursor, initialIndex & 31);
          } else throw DECLINE;
          frames.push({
            kind: "constr",
            index,
            items: [],
            ids: [],
            remaining: fieldsLength(),
            outerBreak,
          });
          continue;
        }
      } else throw DECLINE;
    }
    const parent = frames[frames.length - 1];
    if (!parent) return decoded.data;
    if (parent.kind === "map") {
      if (!parent.key) {
        parent.key = decoded;
        continue;
      }
      // Lookup uses the first value for each structurally equal *raw* key.
      // Keep raw identities below even when the returned JavaScript Map
      // merges primitive keys, and clone repeated results like CML accessors.
      const first = parent.firstValues.get(parent.key.id);
      const value = first === undefined ? decoded.data : copyData(first);
      if (first === undefined)
        parent.firstValues.set(parent.key.id, decoded.data);
      parent.ids.push(parent.key.id, decoded.id);
      parent.map.set(parent.key.data, value);
      parent.key = undefined;
    } else {
      parent.items.push(decoded.data);
      parent.ids.push(decoded.id);
    }
    if (parent.remaining !== null) parent.remaining--;
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
    const hex = raw.toLowerCase();
    return decode({ bytes: hexToBytes(hex), hex, pos: 0 });
  } catch (_e) {
    return undefined;
  }
};
