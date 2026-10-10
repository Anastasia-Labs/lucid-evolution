import { fromHex, toHex, withCMLScope } from "@lucid-evolution/core-utils";
import * as CML from "@lucid-evolution/cml";
import { Constr } from "./constr.js";
import type { Data } from "./data.js";

/*
  The CML-based Plutus data codec that Data.to and Data.from used before the
  JavaScript codec in data-cbor.ts. Data.to and Data.from still fall back to
  it for any input the JavaScript codec does not handle itself, which keeps
  their results and error messages unchanged for malformed input. Not
  exported from the package.
*/

/** Encodes `data` as CBOR hex, in cardano-node format unless `canonical`. */
export function cmlDataToCbor(data: Data, canonical: boolean): string {
  // CML containers clone what is added to them, so every intermediate
  // PlutusData is freed as soon as it has been copied into its parent.
  function serialize(data: Data): CML.PlutusData {
    try {
      return withCMLScope((own) => {
        if (typeof data === "bigint") {
          return CML.PlutusData.new_integer(
            own(CML.BigInteger.from_str(data.toString())),
          );
        } else if (typeof data === "string") {
          return CML.PlutusData.new_bytes(fromHex(data));
        } else if (data instanceof Constr) {
          const { index, fields } = data;
          const plutusList = own(CML.PlutusDataList.new());

          fields.forEach((field) => plutusList.add(own(serialize(field))));

          const alternative = own(CML.BigInteger.from_str(index.toString()));
          return CML.PlutusData.new_constr_plutus_data(
            own(CML.ConstrPlutusData.new(alternative.as_u64()!, plutusList)),
          );
        } else if (data instanceof Array) {
          const plutusList = own(CML.PlutusDataList.new());

          data.forEach((arg) => plutusList.add(own(serialize(arg))));

          return CML.PlutusData.new_list(plutusList);
        } else if (data instanceof Map) {
          const plutusMap = own(CML.PlutusMap.new());

          for (const [key, value] of data.entries()) {
            plutusMap.set(own(serialize(key)), own(serialize(value)));
          }

          return CML.PlutusData.new_map(plutusMap);
        }
        throw new Error("Unsupported type");
      });
    } catch (error) {
      throw new Error("Could not serialize the data: " + error);
    }
  }
  return withCMLScope((own) => {
    const serialized = own(serialize(data));
    return canonical
      ? serialized.to_canonical_cbor_hex()
      : own(serialized.to_cardano_node_format()).to_cbor_hex();
  });
}

/** Decodes CBOR hex into Data. */
export function cmlDataFromCbor(raw: string): Data {
  // `data` is borrowed from the caller; every accessor result is a fresh CML
  // copy and is freed once it has been converted.
  function deserialize(data: CML.PlutusData): Data {
    return withCMLScope((own) => {
      if (data.kind() === 0) {
        const constr = own(data.as_constr_plutus_data()!);
        const l = own(constr.fields());
        const desL = [];
        for (let i = 0; i < l.len(); i++) {
          desL.push(deserialize(own(l.get(i))));
        }
        return new Constr(parseInt(constr.alternative().toString()), desL);
      } else if (data.kind() === 1) {
        const m = own(data.as_map()!);
        const desM: Map<Data, Data> = new Map();
        const keys = own(m.keys());
        for (let i = 0; i < keys.len(); i++) {
          const key = own(keys.get(i));
          desM.set(deserialize(key), deserialize(own(m.get(key)!)));
        }
        return desM;
      } else if (data.kind() === 2) {
        const l = own(data.as_list()!);
        const desL = [];
        for (let i = 0; i < l.len(); i++) {
          desL.push(deserialize(own(l.get(i))));
        }
        return desL;
      } else if (data.kind() === 3) {
        return BigInt(own(data.as_integer()!).to_str());
      } else if (data.kind() === 4) {
        return toHex(data.as_bytes()!);
      }
      throw new Error("Unsupported type");
    });
  }
  return withCMLScope((own) =>
    deserialize(own(CML.PlutusData.from_cbor_hex(raw))),
  );
}
