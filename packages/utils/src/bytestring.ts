/** The header cbor-x writes in front of a bytestring of `length` bytes. */
export const bytestringHeaderHex = (length: number): string => {
  if (length < 0x18) return byteHex(0x40 + length);
  if (length < 0x100) return "58" + byteHex(length);
  if (length < 0x10000) return "59" + length.toString(16).padStart(4, "0");
  return "5a" + length.toString(16).padStart(8, "0");
};

const byteHex = (byte: number): string => byte.toString(16).padStart(2, "0");
