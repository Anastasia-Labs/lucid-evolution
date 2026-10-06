import { Constr } from "./constr.js";
import type { Data } from "./data.js";

/*
  A JavaScript CBOR codec for Plutus data that reproduces CML byte for byte.

  Encoding follows CML's cardano-node format (or CML's canonical format):
    - integers within 64 bits use major types 0 and 1; larger ones use
      bignum tags 2 and 3;
    - byte strings longer than 64 bytes, including bignum payloads, become
      indefinite byte strings of 64-byte chunks;
    - constructors 0-6 use tags 121-127, 7-127 use tags 1280-1400, and
      larger ones use tag 102 with an [index, fields] array;
    - non-empty lists, constructor fields, maps and tag 102 arrays are
      indefinite-length in node format and definite in canonical format;
      empty ones are always definite;
    - maps follow CML's PlutusMap. Setting a key that is already present
      removes the old entry and appends the new one, where keys are equal
      when they are structurally equal (maps compared entry by entry in
      that stored order). Encoding then stably sorts the entries by key: in
      node format by PlutusData order (constructor < map < list < integer <
      bytes, then by contents, maps by their sorted entries), in canonical
      format by encoded key (shorter first, then bytewise).

  Both directions return `undefined` instead of guessing whenever the input
  is outside what they reproduce exactly (malformed values, unusual CBOR,
  duplicate map keys on decode, ...). Callers then use the CML codec, which
  yields the same result or error as before.
*/

const U64_MAX = 0xffff_ffff_ffff_ffffn;
const MAX_CHUNK_BYTES = 64;
const HEX_PATTERN = /^[0-9a-fA-F]*$/;
const HEX_BYTE = Array.from({ length: 256 }, (_, i) =>
  i.toString(16).padStart(2, "0"),
);

/** Thrown internally when an input is left to the CML codec. */
class Decline {}
const DECLINE = new Decline();

// ---------------------------------------------------------------------------
// Encoding

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
  if (data.length % 2 !== 0 || !HEX_PATTERN.test(data)) throw DECLINE;
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
  const items: Data[] = [];
  list.forEach((item) => items.push(item));
  return items;
};

const kindRank = (data: Data): number => {
  if (typeof data === "bigint") return 3;
  if (typeof data === "string") return 4;
  if (data instanceof Constr) return 0;
  if (data instanceof Array) return 2;
  if (data instanceof Map) return 1;
  throw DECLINE;
};

const compareSequences = <T>(
  a: T[],
  b: T[],
  compare: (x: T, y: T) => number,
): number => {
  const length = Math.min(a.length, b.length);
  for (let i = 0; i < length; i++) {
    const order = compare(a[i], b[i]);
    if (order !== 0) return order;
  }
  return a.length - b.length;
};

/** PlutusData order, as CML's PlutusMap sorts its keys. */
const compareData = (a: Data, b: Data): number => {
  const rankA = kindRank(a);
  const rankB = kindRank(b);
  if (rankA !== rankB) return rankA - rankB;
  switch (rankA) {
    case 3:
      return (a as bigint) < (b as bigint)
        ? -1
        : (a as bigint) > (b as bigint)
          ? 1
          : 0;
    case 4: {
      const x = bytesHex(a as string);
      const y = bytesHex(b as string);
      return x < y ? -1 : x > y ? 1 : 0;
    }
    case 0: {
      const x = constrAlternative(a as Constr<Data>);
      const y = constrAlternative(b as Constr<Data>);
      if (x !== y) return x < y ? -1 : 1;
      return compareSequences(
        listItems((a as Constr<Data>).fields),
        listItems((b as Constr<Data>).fields),
        compareData,
      );
    }
    case 2:
      return compareSequences(listItems(a), listItems(b), compareData);
    default:
      return compareSequences(
        sortedEntries(a as Map<Data, Data>),
        sortedEntries(b as Map<Data, Data>),
        (x, y) => compareData(x[0], y[0]) || compareData(x[1], y[1]),
      );
  }
};

/** Structural identity: equal for exactly the values CML treats as equal. */
const identity = (data: Data): string => {
  if (typeof data === "bigint") return "i" + data;
  if (typeof data === "string") return "b" + bytesHex(data);
  if (data instanceof Constr) {
    return (
      "c" +
      constrAlternative(data) +
      "(" +
      listItems(data.fields).map(identity).join(",") +
      ")"
    );
  }
  if (data instanceof Array) {
    return "l(" + listItems(data).map(identity).join(",") + ")";
  }
  if (data instanceof Map) {
    return (
      "m(" +
      storedEntries(data)
        .map(([key, value]) => identity(key) + ":" + identity(value))
        .join(",") +
      ")"
    );
  }
  throw DECLINE;
};

const isPrimitive = (data: Data) =>
  typeof data === "bigint" || typeof data === "string";

/**
 * The entries a CML PlutusMap holds after setting each entry in turn: a
 * repeated key drops its earlier entry and is appended again.
 */
const storedEntries = (map: Map<Data, Data>): [Data, Data][] => {
  const entries = [...map.entries()];
  // A JavaScript Map already merges equal bigints; only bytes that differ
  // in letter case and non-primitive keys can repeat.
  const lowercase = (key: Data) =>
    typeof key !== "string" || bytesHex(key) === key;
  if (entries.every(([key]) => isPrimitive(key) && lowercase(key))) {
    return entries;
  }
  const latest = new Map<string, number>();
  entries.forEach(([key], i) => latest.set(identity(key), i));
  return entries.filter(([key], i) => latest.get(identity(key)) === i);
};

/** Stored entries, stably sorted by key in PlutusData order. */
const sortedEntries = (map: Map<Data, Data>): [Data, Data][] =>
  storedEntries(map).sort((x, y) => compareData(x[0], y[0]));

const encodeList = (items: Data[], canonical: boolean): string => {
  if (items.length === 0) return "80";
  let body = "";
  for (const item of items) body += encode(item, canonical);
  return canonical ? head(4, items.length) + body : "9f" + body + "ff";
};

const encodeMap = (map: Map<Data, Data>, canonical: boolean): string => {
  if (map.size === 0) return "a0";
  if (!canonical) {
    let body = "";
    for (const [key, value] of sortedEntries(map)) {
      body += encode(key, false) + encode(value, false);
    }
    return "bf" + body + "ff";
  }
  // Canonical CBOR orders keys by encoding: shorter first, then bytewise,
  // which for hex strings is the same as comparing the strings.
  const encoded = storedEntries(map).map(
    ([key, value]) => [encode(key, true), value] as const,
  );
  encoded.sort(([x], [y]) =>
    x.length !== y.length ? x.length - y.length : x < y ? -1 : x > y ? 1 : 0,
  );
  let body = "";
  for (const [key, value] of encoded) body += key + encode(value, true);
  return head(5, encoded.length) + body;
};

const encode = (data: Data, canonical: boolean): string => {
  if (typeof data === "bigint") return encodeInteger(data);
  if (typeof data === "string") return encodeBytesHex(bytesHex(data));
  if (data instanceof Constr) {
    const alternative = constrAlternative(data);
    const fields = encodeList(listItems(data.fields), canonical);
    if (alternative <= 6n) return head(6, 121 + Number(alternative)) + fields;
    if (alternative <= 127n) {
      return head(6, 1280 + Number(alternative) - 7) + fields;
    }
    return canonical
      ? "d86682" + head(0, alternative) + fields
      : "d8669f" + head(0, alternative) + fields + "ff";
  }
  if (data instanceof Array) return encodeList(listItems(data), canonical);
  if (data instanceof Map) return encodeMap(data, canonical);
  throw DECLINE;
};

/**
 * Encodes Plutus data as CBOR hex exactly as CML does, or returns
 * `undefined` for input it leaves to CML.
 */
export const encodePlutusData = (
  data: Data,
  canonical: boolean,
): string | undefined => {
  try {
    return encode(data, canonical);
  } catch (_e) {
    return undefined;
  }
};

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

/** Reads an array of data items, definite or indefinite. */
const readList = (cursor: Cursor): Data[] => {
  const initial = readByte(cursor);
  if (initial >> 5 !== 4) throw DECLINE;
  return readListBody(cursor, initial & 31);
};

const readListBody = (cursor: Cursor, info: number): Data[] => {
  const items: Data[] = [];
  if (info === 31) {
    while (!isBreak(cursor)) items.push(decode(cursor));
  } else {
    const length = readLength(cursor, info);
    for (let i = 0; i < length; i++) items.push(decode(cursor));
  }
  return items;
};

/** Structural identity, under which CML could treat two keys as one. */
const keyIdentity = (key: Data): string => {
  if (typeof key === "bigint") return "i" + key;
  if (typeof key === "string") return "b" + key;
  if (key instanceof Constr) {
    return "c" + key.index + "(" + key.fields.map(keyIdentity).join(",") + ")";
  }
  if (key instanceof Array) return "l(" + key.map(keyIdentity).join(",") + ")";
  return (
    "m(" +
    [...(key as Map<Data, Data>).entries()]
      .map(([k, v]) => keyIdentity(k) + ":" + keyIdentity(v))
      .join(",") +
    ")"
  );
};

const readMapBody = (cursor: Cursor, info: number): Map<Data, Data> => {
  const map = new Map<Data, Data>();
  const seen = new Set<string>();
  const readEntry = () => {
    const key = decode(cursor);
    const value = decode(cursor);
    // CML keeps repeated keys and looks values up by key; leave that to it.
    const identity = keyIdentity(key);
    if (seen.has(identity)) throw DECLINE;
    seen.add(identity);
    map.set(key, value);
  };
  if (info === 31) {
    while (!isBreak(cursor)) readEntry();
  } else {
    const length = readLength(cursor, info);
    for (let i = 0; i < length; i++) readEntry();
  }
  return map;
};

/** Tag 102: a two-item array of an unsigned index and the fields. */
const readGeneralConstr = (cursor: Cursor): Constr<Data> => {
  const initial = readByte(cursor);
  if (initial !== 0x82 && initial !== 0x9f) throw DECLINE;
  const indexInitial = readByte(cursor);
  if (indexInitial >> 5 !== 0 || (indexInitial & 31) === 31) throw DECLINE;
  const index = readArgument(cursor, indexInitial & 31);
  const fields = readList(cursor);
  if (initial === 0x9f && !isBreak(cursor)) throw DECLINE;
  return new Constr(Number(index), fields);
};

const decode = (cursor: Cursor): Data => {
  const initial = readByte(cursor);
  const major = initial >> 5;
  const info = initial & 31;
  switch (major) {
    case 0:
      if (info === 31) throw DECLINE;
      return readArgument(cursor, info);
    case 1:
      if (info === 31) throw DECLINE;
      return -1n - readArgument(cursor, info);
    case 2:
      return readBytes(cursor, info);
    case 4:
      return readListBody(cursor, info);
    case 5:
      return readMapBody(cursor, info);
    case 6: {
      if (info === 31) throw DECLINE;
      const tag = readArgument(cursor, info);
      if (tag === 2n || tag === 3n) {
        const payloadInitial = readByte(cursor);
        if (payloadInitial >> 5 !== 2) throw DECLINE;
        const hex = readBytes(cursor, payloadInitial & 31);
        const magnitude = hex.length === 0 ? 0n : BigInt("0x" + hex);
        return tag === 2n ? magnitude : -1n - magnitude;
      }
      if (tag >= 121n && tag <= 127n) {
        return new Constr(Number(tag) - 121, readList(cursor));
      }
      if (tag >= 1280n && tag <= 1400n) {
        return new Constr(Number(tag) - 1280 + 7, readList(cursor));
      }
      if (tag === 102n) return readGeneralConstr(cursor);
      throw DECLINE;
    }
    default:
      throw DECLINE;
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
