import { fromHex, toHex } from "@lucid-evolution/core-utils";
import { decode, encode } from "cborg";
import { CML } from "./core.js";
import { Datum, DatumJson } from "@lucid-evolution/core-types";

// 1st byte (58) 0101(major type 2) , 1000 (additional info)
// 2n byte byte represents the lenght of the content
// 3rd byte represents bytestring content
// https://www.rfc-editor.org/rfc/rfc7049#section-2.1
// Apply double bytestring enconding of type `major type 2`
export const applyDoubleCborEncoding = (script: string) => {
  try {
    decode(decode(fromHex(script)));
    return script;
  } catch (error) {
    return toHex(encode(fromHex(script)));
  }
};

export function datumJsonToCbor(json: DatumJson): Datum {
  const convert = (json: any) => {
    if (!isNaN(json.int)) {
      const plutusBigInt = CML.BigInteger.from_str(json.int.toString());
      return CML.PlutusData.new_integer(plutusBigInt);
    } else if (json.bytes || !isNaN(Number(json.bytes))) {
      return CML.PlutusData.new_bytes(fromHex(json.bytes));
    } else if (json.list) {
      const l = CML.PlutusDataList.new();
      json.list.forEach((v: any) => {
        l.add(convert(v));
      });
      return CML.PlutusData.new_list(l);
    } else if (
      json.map &&
      json.map.length > 0 &&
      typeof json.map[0] === "object"
    ) {
      const m = CML.PlutusMap.new();
      json.map.forEach(({ k, v }: { k: any; v: any }) => {
        m.set(convert(k), convert(v));
      });
      return CML.PlutusData.new_map(m);
    } else if (json.map && typeof json.map === "function") {
      const l = CML.PlutusDataList.new();
      Object.values(json).forEach((value) => {
        l.add(convert(value));
      });
      return CML.PlutusData.new_list(l);
    } else if (!isNaN(json.constructor)) {
      const l = CML.PlutusDataList.new();
      json.fields.forEach((v: any) => {
        l.add(convert(v));
      });
      const bigInt = CML.BigInteger.from_str(
        json.constructor.toString(),
      ).as_u64()!;
      return CML.PlutusData.new_constr_plutus_data(
        CML.ConstrPlutusData.new(bigInt, l),
      );
    }
    throw new Error("Unsupported type");
  };
  return convert(json).to_cbor_hex();
}
