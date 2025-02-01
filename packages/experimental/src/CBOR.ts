import * as Bytes from "./Core/Bytes.js";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";
import { Datum, DatumJson } from "./Type.js";
import { decode, encode } from "cbor-x";
import { Data } from "./Data.js";

// 1st byte (58) 0101(major type 2) , 1000 (additional info)
// 2n byte byte represents the lenght of the content
// 3rd byte represents bytestring content
// https://www.rfc-editor.org/rfc/rfc7049#section-2.1
// Apply double bytestring enconding of type `major type 2`
export const applyDoubleCborEncoding = (script: string): string => {
  try {
    decode(decode(Bytes.fromHex(script)));
    return script;
  } catch (error) {
    try {
      decode(Bytes.fromHex(script));
      return Bytes.toHex(Uint8Array.from(encode(Bytes.fromHex(script).buffer)));
    } catch (error) {
      return Bytes.toHex(
        Uint8Array.from(encode(encode(Bytes.fromHex(script).buffer)))
      );
    }
  }
};

export const applySingleCborEncoding = (script: string): string => {
  try {
    decode(decode(Bytes.fromHex(script)));
    return Bytes.toHex(decode(Bytes.fromHex(script)));
  } catch (error) {
    try {
      decode(Bytes.fromHex(script));
      return script;
    } catch (error) {
      return Bytes.toHex(Uint8Array.from(encode(Bytes.fromHex(script).buffer)));
    }
  }
};

export const CBOREncodingLevel = (script: string): "double" | "single" => {
  try {
    decode(decode(Bytes.fromHex(script)));
    return "double" as const;
  } catch (error) {
    try {
      decode(Bytes.fromHex(script));
      return "single" as const;
    } catch (error) {
      throw new Error("Script is not CBOR-encoded or invalid format.");
    }
  }
};

export function datumJsonToCbor(json: DatumJson): Datum {
  const convert = (json: any) => {
    if (!isNaN(json.int)) {
      const plutusBigInt = CML.BigInteger.from_str(json.int.toString());
      return CML.PlutusData.new_integer(plutusBigInt);
    } else if (json.bytes || !isNaN(Number(json.bytes))) {
      return CML.PlutusData.new_bytes(Bytes.fromHex(json.bytes));
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
        json.constructor.toString()
      ).as_u64()!;
      return CML.PlutusData.new_constr_plutus_data(
        CML.ConstrPlutusData.new(bigInt, l)
      );
    }
    throw new Error("Unsupported type");
  };
  return convert(json).to_cbor_hex();
}

export const toCBOR = <D extends Data>(data: D): string => {
  switch (typeof data) {
    case "bigint":
      return CML.PlutusData.new_integer(
        CML.BigInteger.from_str(data.toString())
      ).to_cbor_hex();
    case "string":
      return CML.PlutusData.new_bytes(Bytes.fromHex(data)).to_cbor_hex();
    case "object":
      if (Array.isArray(data)) {
        const list = CML.PlutusDataList.new();
        data.forEach((item) =>
          list.add(CML.PlutusData.from_cbor_hex(toCBOR(item)))
        );
        return CML.PlutusData.new_list(list).to_cbor_hex();
      } else if (data instanceof Map) {
        const map = CML.PlutusMap.new();
        for (const [key, value] of data as Map<Data, Data>) {
          map.set(
            CML.PlutusData.from_cbor_hex(toCBOR(key)),
            CML.PlutusData.from_cbor_hex(toCBOR(value))
          );
        }
        return CML.PlutusData.new_map(map).to_cbor_hex();
      } else if ("fields" in data && "index" in data) {
        const fields = CML.PlutusDataList.new();
        data.fields.forEach((item) =>
          fields.add(CML.PlutusData.from_cbor_hex(toCBOR(item)))
        );
        return CML.PlutusData.new_constr_plutus_data(
          CML.ConstrPlutusData.new(
            CML.BigInteger.from_str(data.index.toString()).as_u64()!,
            fields
          )
        ).to_cbor_hex();
      } else {
        throw new Error("Invalid data structure");
      }

    default:
      throw new Error(`Unsupported type: ${typeof data}`);
  }
};

export const fromCBOR = (input: string): Data => {
  const data = CML.PlutusData.from_cbor_hex(input);
  switch (data.kind()) {
    case CML.PlutusDataKind.Integer:
      return BigInt(data.as_integer()!.to_str());
    case CML.PlutusDataKind.Bytes:
      return data.as_bytes()!.toString();
    case CML.PlutusDataKind.List: {
      const list = data.as_list()!;
      const result = [];
      for (let i = 0; i < list.len(); i++) {
        result.push(fromCBOR(list.get(i).to_cbor_hex()));
      }
      return result;
    }
    case CML.PlutusDataKind.Map: {
      const map = data.as_map()!;
      const result = new Map();
      const keys = map.keys();
      for (let i = 0; i < keys.len(); i++) {
        const key = fromCBOR(keys.get(i).to_cbor_hex());
        const value = fromCBOR(map.get(keys.get(i))!.to_cbor_hex());
        result.set(key, value);
      }
      return result;
    }
    case CML.PlutusDataKind.ConstrPlutusData: {
      const constr = data.as_constr_plutus_data()!;
      const fields = [];
      const list = constr.fields();
      for (let i = 0; i < list.len(); i++) {
        fields.push(fromCBOR(list.get(i).to_cbor_hex()));
      }
      return {
        index: constr.alternative(),
        fields,
      };
    }
    default:
      throw new Error(`Unsupported type: ${data.kind()}`);
  }
};
