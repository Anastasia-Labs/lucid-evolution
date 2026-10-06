import { fromHex, toHex } from "@lucid-evolution/core-utils";
import { CML } from "./core.js";
import { Datum, DatumJson } from "@lucid-evolution/core-types";
import { decode, encode } from "cbor-x";
import { ScriptCache } from "./script-cache.js";

// 1st byte (58) 0101(major type 2) , 1000 (additional info)
// 2n byte byte represents the lenght of the content
// 3rd byte represents bytestring content
// https://www.rfc-editor.org/rfc/rfc7049#section-2.1
// Apply double bytestring enconding of type `major type 2`
export const applyDoubleCborEncoding = (script: string): string => {
  // Let the original implementation report a non-string argument.
  if (typeof script !== "string") return decodingDoubleCborEncoding(script);
  const cached = doubleCborCache.get("", script);
  if (cached !== undefined) return cached;
  const encoded = doubleCborEncoding(script);
  doubleCborCache.set("", script, encoded);
  return encoded;
};

/**
 * The original implementation: decodes with cbor-x to find how many bytestring
 * layers `script` has. Kept for inputs whose layout the header check below
 * cannot settle.
 */
const decodingDoubleCborEncoding = (script: string) => {
  try {
    decode(decode(fromHex(script)));
    return script;
  } catch (error) {
    try {
      decode(fromHex(script));
      return toHex(Uint8Array.from(encode(fromHex(script).buffer)));
    } catch (error) {
      return toHex(Uint8Array.from(encode(encode(fromHex(script).buffer))));
    }
  }
};

const doubleCborEncoding = (script: string): string => {
  const layers = bytestringLayers(script);
  switch (layers) {
    case 2:
      return script;
    case 1:
      return bytestringHeaderHex(script.length / 2) + script.toLowerCase();
    case 0: {
      const inner = bytestringHeaderHex(script.length / 2);
      const innerLength = script.length / 2 + inner.length / 2;
      return bytestringHeaderHex(innerLength) + inner + script.toLowerCase();
    }
    default:
      return decodingDoubleCborEncoding(script);
  }
};

const doubleCborCache = new ScriptCache<string>(
  4096,
  64 * 1024 * 1024,
  // Overcounts a script that is already double encoded, whose result is the
  // key itself.
  (encoded) => encoded.length,
);

const NON_HEX = /[^0-9a-fA-F]/;

/** Byte `index` of a hex string, which must be valid hex. */
const hexByte = (hex: string, index: number): number =>
  parseInt(hex.slice(index * 2, index * 2 + 2), 16);

type ItemHeader = {
  readonly major: number;
  /** Header plus payload, in bytes. */
  readonly span: number;
  readonly headerLength: number;
};

/**
 * Reads the CBOR item header at byte `offset` of `hex` when the item's size
 * follows from the header alone: an integer, or a definite-length bytestring.
 * Returns `undefined` for anything else, including a header cut short by the
 * end of the input.
 */
const itemHeader = (
  hex: string,
  offset: number,
  end: number,
): ItemHeader | undefined => {
  if (offset >= end) return undefined;
  const token = hexByte(hex, offset);
  const major = token >> 5;
  if (major > 2) return undefined;
  const info = token & 0x1f;
  let argument: number;
  let headerLength: number;
  if (info < 24) {
    argument = info;
    headerLength = 1;
  } else if (info <= 26) {
    headerLength = 1 + (1 << (info - 24));
    if (offset + headerLength > end) return undefined;
    argument = 0;
    for (let index = offset + 1; index < offset + headerLength; index++) {
      argument = argument * 256 + hexByte(hex, index);
    }
  } else {
    return undefined;
  }
  const payload = major === 2 ? argument : 0;
  return { major, span: headerLength + payload, headerLength };
};

/**
 * How many bytestring layers wrap `script`, as the original cbor-x based
 * check would decide it: 2 when two layers decode, 1 when only the outer
 * item decodes, 0 when nothing decodes. `undefined` when the headers do not
 * settle the answer.
 *
 * cbor-x decodes a buffer only when its first item ends exactly at the end of
 * the buffer, and decoding a decoded value that is not a byte array fails.
 */
const bytestringLayers = (script: string): 0 | 1 | 2 | undefined => {
  if (script.length === 0 || script.length % 2 !== 0) return undefined;
  if (NON_HEX.test(script)) return undefined;
  const length = script.length / 2;
  const outer = itemHeader(script, 0, length);
  if (outer === undefined) return undefined;
  if (outer.span !== length) return 0;
  if (outer.major !== 2) return 1;
  if (outer.headerLength === length) return undefined;
  const inner = itemHeader(script, outer.headerLength, length);
  if (inner === undefined) return undefined;
  return inner.span === length - outer.headerLength ? 2 : 1;
};

/** The header cbor-x writes in front of a bytestring of `length` bytes. */
const bytestringHeaderHex = (length: number): string => {
  if (length < 0x18) return byteHex(0x40 + length);
  if (length < 0x100) return "58" + byteHex(length);
  if (length < 0x10000) return "59" + length.toString(16).padStart(4, "0");
  return "5a" + length.toString(16).padStart(8, "0");
};

const byteHex = (byte: number): string => byte.toString(16).padStart(2, "0");

export const applySingleCborEncoding = (script: string) => {
  try {
    decode(decode(fromHex(script)));
    return toHex(decode(fromHex(script)));
  } catch (error) {
    try {
      decode(fromHex(script));
      return script;
    } catch (error) {
      return toHex(Uint8Array.from(encode(fromHex(script).buffer)));
    }
  }
};

export const CBOREncodingLevel = (script: string): "double" | "single" => {
  try {
    decode(decode(fromHex(script)));
    return "double" as const;
  } catch (error) {
    try {
      decode(fromHex(script));
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
