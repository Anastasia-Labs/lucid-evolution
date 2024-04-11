import { fromHex, toHex } from "@lucid-evolution/core-utils";
import { decode, encode } from "cborg";

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
