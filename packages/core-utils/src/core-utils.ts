import { Buffer } from "buffer/";

export function fromHex(hex: string): Uint8Array {
  return new Uint8Array(Buffer.from(hex, "hex"));
}

export function toHex(bytes: Uint8Array): string {
  return Buffer.from(bytes).toString("hex");
}

/** Convert a Hex encoded string to a Utf-8 encoded string. */
export function toText(hex: string): string {
  return Buffer.from(hex, "hex").toString();
}

/** Convert a Utf-8 encoded string to a Hex encoded string. */
export function fromText(text: string): string {
  return Buffer.from(text).toString("hex");
}
