import { fromHex, toHex, withCMLScope } from "@lucid-evolution/core-utils";
import * as CML from "@lucid-evolution/cml";
import { Constr } from "./constr.js";
import type { Data } from "./data.js";

// Independent CML conversion for inputs the JavaScript codec leaves to CML.
// Only pending values are owned: parent copies and consumed children are freed
// at each step, so live native allocations do not grow with depth squared.

type EncodeTask =
  | { kind: "visit"; data: Data; depth: number }
  | {
      kind: "finish";
      data: Constr<Data> | Data[] | Map<Data, Data>;
      start: number;
      depth: number;
    };

/** Encodes `data` as CBOR hex, in cardano-node format unless `canonical`. */
export function cmlDataToCbor(data: Data, canonical: boolean): string {
  const tasks: EncodeTask[] = [{ kind: "visit", data, depth: 0 }];
  const values: CML.PlutusData[] = [];
  const owned = new Set<CML.PlutusData>();
  const active = new WeakSet<object>();
  const keep = (value: CML.PlutusData) => {
    owned.add(value);
    return value;
  };
  try {
    while (tasks.length > 0) {
      const task = tasks.pop()!;
      try {
        const data = task.data;
        if (task.kind === "visit") {
          if (typeof data === "bigint") {
            values.push(
              keep(
                withCMLScope((own) =>
                  CML.PlutusData.new_integer(
                    own(CML.BigInteger.from_str(data.toString())),
                  ),
                ),
              ),
            );
            continue;
          }
          if (typeof data === "string") {
            values.push(keep(CML.PlutusData.new_bytes(fromHex(data))));
            continue;
          }
          const children: Data[] = [];
          if (data instanceof Constr)
            data.fields.forEach((field) => children.push(field));
          else if (data instanceof Array)
            data.forEach((item) => children.push(item));
          else if (data instanceof Map)
            for (const [key, value] of data.entries())
              children.push(key, value);
          else throw new Error("Unsupported type");
          if (active.has(data)) throw new Error("Circular data");
          active.add(data);
          tasks.push({
            kind: "finish",
            data,
            start: values.length,
            depth: task.depth,
          });
          for (let i = children.length - 1; i >= 0; i--)
            tasks.push({
              kind: "visit",
              data: children[i],
              depth: task.depth + 1,
            });
          continue;
        }
        const children = values.splice(task.start);
        const result = withCMLScope((own) => {
          if (data instanceof Map) {
            const map = own(CML.PlutusMap.new());
            for (let i = 0; i < children.length; i += 2)
              map.set(children[i], children[i + 1]);
            return CML.PlutusData.new_map(map);
          }
          const list = own(CML.PlutusDataList.new());
          for (const child of children) list.add(child);
          if (data instanceof Constr) {
            const alternative = own(
              CML.BigInteger.from_str(data.index.toString()),
            );
            return CML.PlutusData.new_constr_plutus_data(
              own(CML.ConstrPlutusData.new(alternative.as_u64()!, list)),
            );
          }
          return CML.PlutusData.new_list(list);
        });
        values.push(keep(result));
        active.delete(task.data);
        for (const child of children) {
          owned.delete(child);
          child.free();
        }
      } catch (error) {
        // Retain the existing context for invalid values without recursively
        // catching and rebuilding an error at each ancestor.
        throw new Error(
          "Could not serialize the data: " +
            "Error: Could not serialize the data: ".repeat(task.depth) +
            error,
        );
      }
    }
    const serialized = values[0];
    return canonical
      ? serialized.to_canonical_cbor_hex()
      : withCMLScope((own) =>
          own(serialized.to_cardano_node_format()).to_cbor_hex(),
        );
  } finally {
    for (const value of owned) value.free();
  }
}

type DecodeTask =
  | { kind: "visit"; data: CML.PlutusData }
  | { kind: "list"; start: number }
  | { kind: "constr"; start: number; index: number }
  | { kind: "map"; start: number };

/** Decodes CBOR hex into Data, including CML's duplicate map-key semantics. */
export function cmlDataFromCbor(raw: string): Data {
  const owned = new Set<CML.PlutusData>();
  const keep = (value: CML.PlutusData) => {
    owned.add(value);
    return value;
  };
  const tasks: DecodeTask[] = [
    { kind: "visit", data: keep(CML.PlutusData.from_cbor_hex(raw)) },
  ];
  const values: Data[] = [];
  try {
    while (tasks.length > 0) {
      const task = tasks.pop()!;
      if (task.kind !== "visit") {
        const children = values.splice(task.start);
        if (task.kind === "list") values.push(children);
        else if (task.kind === "constr")
          values.push(new Constr(task.index, children));
        else {
          const map = new Map<Data, Data>();
          for (let i = 0; i < children.length; i += 2)
            map.set(children[i], children[i + 1]);
          values.push(map);
        }
        continue;
      }
      const data = task.data;
      owned.delete(data);
      withCMLScope((own) => {
        own(data);
        const children: CML.PlutusData[] = [];
        const kind = data.kind();
        if (kind === 0) {
          const constr = own(data.as_constr_plutus_data()!);
          const fields = own(constr.fields());
          tasks.push({
            kind: "constr",
            start: values.length,
            index: parseInt(constr.alternative().toString()),
          });
          for (let i = 0; i < fields.len(); i++)
            children.push(keep(fields.get(i)));
        } else if (kind === 1) {
          const map = own(data.as_map()!);
          const keys = own(map.keys());
          tasks.push({ kind: "map", start: values.length });
          for (let i = 0; i < keys.len(); i++) {
            const key = keep(keys.get(i));
            children.push(key, keep(map.get(key)!));
          }
        } else if (kind === 2) {
          const list = own(data.as_list()!);
          tasks.push({ kind: "list", start: values.length });
          for (let i = 0; i < list.len(); i++) children.push(keep(list.get(i)));
        } else if (kind === 3)
          values.push(BigInt(own(data.as_integer()!).to_str()));
        else if (kind === 4) values.push(toHex(data.as_bytes()!));
        else throw new Error("Unsupported type");
        for (let i = children.length - 1; i >= 0; i--)
          tasks.push({ kind: "visit", data: children[i] });
      });
    }
    return values[0];
  } finally {
    for (const value of owned) value.free();
  }
}
