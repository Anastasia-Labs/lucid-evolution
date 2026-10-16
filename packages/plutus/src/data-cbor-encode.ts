import { Constr } from "./constr.js";
import type { Data } from "./data.js";

// Normalization, structural map identity and CBOR writing are iterative. An
// interned identity describes child identities, so deep keys do not require
// a string containing the whole subtree at every level.
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

type Value =
  | { rank: 0; alternative: bigint; items: Value[]; id: number }
  | { rank: 1; entries: [Value, Value][]; sorted: [Value, Value][]; id: number }
  | { rank: 2; items: Value[]; id: number }
  | { rank: 3; integer: bigint; id: number }
  | { rank: 4; hex: string; id: number };

type PrepareTask =
  | { kind: "visit"; data: Data }
  | { kind: "list"; source: object; start: number }
  | { kind: "constr"; source: object; start: number; alternative: bigint }
  | { kind: "map"; source: object; start: number };

const prepare = (root: Data): Value => {
  const tasks: PrepareTask[] = [{ kind: "visit", data: root }];
  const values: Value[] = [];
  const ready = new WeakMap<object, Value>();
  const active = new WeakSet<object>();
  const identities = new Map<string, number>();
  const identity = (key: string): number => {
    let id = identities.get(key);
    if (id === undefined) {
      id = identities.size;
      identities.set(key, id);
    }
    return id;
  };
  while (tasks.length > 0) {
    const task = tasks.pop()!;
    if (task.kind === "visit") {
      const data = task.data;
      if (typeof data === "bigint") {
        values.push({ rank: 3, integer: data, id: identity("i" + data) });
        continue;
      }
      if (typeof data === "string") {
        const hex = bytesHex(data);
        values.push({ rank: 4, hex, id: identity("b" + hex) });
        continue;
      }
      if (typeof data !== "object" || data === null) throw DECLINE;
      const cached = ready.get(data);
      if (cached) {
        values.push(cached);
        continue;
      }
      if (active.has(data)) throw DECLINE;
      active.add(data);
      let children: Data[];
      if (data instanceof Constr) {
        children = listItems(data.fields);
        tasks.push({
          kind: "constr",
          source: data,
          start: values.length,
          alternative: constrAlternative(data),
        });
      } else if (data instanceof Array) {
        children = listItems(data);
        tasks.push({ kind: "list", source: data, start: values.length });
      } else if (data instanceof Map) {
        children = [...data.entries()].flat();
        tasks.push({ kind: "map", source: data, start: values.length });
      } else {
        throw DECLINE;
      }
      for (let i = children.length - 1; i >= 0; i--) {
        tasks.push({ kind: "visit", data: children[i] });
      }
      continue;
    }
    const children = values.splice(task.start);
    let value: Value;
    if (task.kind === "constr") {
      value = {
        rank: 0,
        alternative: task.alternative,
        items: children,
        id: identity(
          `c${task.alternative}(${children.map((child) => child.id).join(",")})`,
        ),
      };
    } else if (task.kind === "list") {
      value = {
        rank: 2,
        items: children,
        id: identity(`l(${children.map((child) => child.id).join(",")})`),
      };
    } else {
      // PlutusMap.set removes every previous equal key and appends the new
      // entry. Structural identities include the map's stored entry order.
      const latest = new Map<number, number>();
      for (let i = 0; i < children.length; i += 2)
        latest.set(children[i].id, i);
      const entries: [Value, Value][] = [];
      for (let i = 0; i < children.length; i += 2) {
        if (latest.get(children[i].id) === i)
          entries.push([children[i], children[i + 1]]);
      }
      value = {
        rank: 1,
        entries,
        sorted: [...entries].sort(([a], [b]) => compare(a, b)),
        id: identity(
          `m(${entries.map(([key, item]) => `${key.id}:${item.id}`).join(",")})`,
        ),
      };
    }
    active.delete(task.source);
    ready.set(task.source, value);
    values.push(value);
  }
  return values[0];
};

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
    } else if (a.rank === 0 && b.rank === 0) {
      if (a.alternative !== b.alternative)
        return a.alternative < b.alternative ? -1 : 1;
      pending.push(a.items.length - b.items.length);
      for (let i = Math.min(a.items.length, b.items.length) - 1; i >= 0; i--)
        pending.push([a.items[i], b.items[i]]);
    } else if (a.rank === 2 && b.rank === 2) {
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

type EncodeTask =
  | { kind: "value"; value: Value }
  | { kind: "text"; text: string }
  | { kind: "key"; key: Value; value: Value }
  | { kind: "finish-key"; value: Value }
  | { kind: "map"; length: number };

const encode = (root: Value, canonical: boolean): string => {
  const tasks: EncodeTask[] = [{ kind: "value", value: root }];
  const outputs: string[][] = [[]];
  const maps: [string, Value][][] = [];
  const write = (text: string) => outputs[outputs.length - 1].push(text);
  const list = (items: Value[]) => {
    write(items.length === 0 ? "80" : canonical ? head(4, items.length) : "9f");
    if (items.length > 0 && !canonical)
      tasks.push({ kind: "text", text: "ff" });
    for (let i = items.length - 1; i >= 0; i--)
      tasks.push({ kind: "value", value: items[i] });
  };
  while (tasks.length > 0) {
    const task = tasks.pop()!;
    if (task.kind === "text") {
      write(task.text);
      continue;
    }
    if (task.kind === "key") {
      outputs.push([]);
      tasks.push({ kind: "finish-key", value: task.value });
      tasks.push({ kind: "value", value: task.key });
      continue;
    }
    if (task.kind === "finish-key") {
      maps[maps.length - 1].push([outputs.pop()!.join(""), task.value]);
      continue;
    }
    if (task.kind === "map") {
      const keys = maps.pop()!;
      keys.sort(
        ([a], [b]) => a.length - b.length || (a < b ? -1 : a > b ? 1 : 0),
      );
      write(head(5, task.length));
      for (let i = keys.length - 1; i >= 0; i--) {
        tasks.push({ kind: "value", value: keys[i][1] });
        tasks.push({ kind: "text", text: keys[i][0] });
      }
      continue;
    }
    const value = task.value;
    switch (value.rank) {
      case 3:
        write(encodeInteger(value.integer));
        break;
      case 4:
        write(encodeBytesHex(value.hex));
        break;
      case 0: {
        const index = value.alternative;
        if (index <= 6n) write(head(6, 121 + Number(index)));
        else if (index <= 127n) write(head(6, 1280 + Number(index) - 7));
        else {
          write((canonical ? "d86682" : "d8669f") + head(0, index));
          if (!canonical) tasks.push({ kind: "text", text: "ff" });
        }
        list(value.items);
        break;
      }
      case 2:
        list(value.items);
        break;
      case 1: {
        if (canonical && value.entries.length > 1) {
          maps.push([]);
          tasks.push({ kind: "map", length: value.entries.length });
          for (let i = value.entries.length - 1; i >= 0; i--)
            tasks.push({
              kind: "key",
              key: value.entries[i][0],
              value: value.entries[i][1],
            });
        } else {
          const entries = canonical ? value.entries : value.sorted;
          write(
            entries.length === 0
              ? "a0"
              : canonical
                ? head(5, entries.length)
                : "bf",
          );
          if (entries.length > 0 && !canonical)
            tasks.push({ kind: "text", text: "ff" });
          for (let i = entries.length - 1; i >= 0; i--) {
            tasks.push({ kind: "value", value: entries[i][1] });
            tasks.push({ kind: "value", value: entries[i][0] });
          }
        }
      }
    }
  }
  return outputs[0].join("");
};

/** Encodes as CML does, or leaves unsupported input to the CML codec. */
export const encodePlutusData = (
  data: Data,
  canonical: boolean,
): string | undefined => {
  try {
    return encode(prepare(data), canonical);
  } catch (_error) {
    return undefined;
  }
};
