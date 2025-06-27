import { Data, Schema } from "effect";

export class HexError extends Data.TaggedError("HexError")<{
  message?: string;
  cause?: unknown;
}> {}

export const isHex = (input: string): boolean => {
  const len = input.length;
  if (len === 0) return false;

  if (len % 2 !== 0) return false;

  for (let i = 0; i < len; i++) {
    const cc = input.charCodeAt(i);
    if (
      !(
        (cc >= 48 && cc <= 57) || // '0'–'9'
        (cc >= 65 && cc <= 70) || // 'A'–'F'
        (cc >= 97 && cc <= 102) // 'a'–'f'
      )
    ) {
      return false;
    }
  }
  return true;
};

const hexes = /* @__PURE__ */ Array.from({ length: 256 }, (_, i) =>
  i.toString(16).padStart(2, "0"),
);

export const fromBytes = <T extends Hex>(bytes: Uint8Array) => {
  // pre-caching improves the speed 6x
  let hex = "";
  for (let i = 0; i < bytes.length; i++) {
    hex += hexes[bytes[i]];
  }
  return hex as T;
};

// We use optimized technique to convert hex string to byte array
const asciis = { _0: 48, _9: 57, _A: 65, _F: 70, _a: 97, _f: 102 } as const;

/**
 * Converts an ASCII character code to its base16 (hexadecimal) value.
 * For use with pre-validated hex strings.
 */
const asciiToBase16 = (char: number): number => {
  if (char >= asciis._0 && char <= asciis._9) return char - asciis._0;
  if (char >= asciis._A && char <= asciis._F) return char - (asciis._A - 10);
  if (char >= asciis._a && char <= asciis._f) return char - (asciis._a - 10);
  // Since Hex is already validated, this should never happen
  // but we return 0 to satisfy TypeScript
  return 0;
};

/**
 * Converts a branded Hex string to a Uint8Array.
 *
 * @since 1.0.0
 * @category encoding/decoding
 */
export const toBytes = (hex: Hex): Uint8Array => {
  const array = new Uint8Array(hex.length / 2);
  for (let ai = 0, hi = 0; ai < array.length; ai++, hi += 2) {
    const n1 = asciiToBase16(hex.charCodeAt(hi));
    const n2 = asciiToBase16(hex.charCodeAt(hi + 1));
    array[ai] = n1 * 16 + n2;
  }
  return array;
};

export const HexStringFilter = Schema.String.pipe(
  Schema.filter((a) => isHex(a)),
).annotations({ message: (issue) => `${issue.actual} must be a hex string` });

export const HexSchema = HexStringFilter.pipe(
  Schema.brand("Hex"),
  Schema.typeSchema,
);

export type Hex = typeof HexSchema.Type;

export const BytesSchema = Schema.transform(
  HexSchema,
  Schema.Uint8ArrayFromSelf,
  {
    strict: true,
    encode: (toA) => {
      let hex = "";
      for (let i = 0; i < toA.length; i++) {
        hex += hexes[toA[i]];
      }
      return hex as Hex;
    },
    decode: (fromA) => {
      const array = new Uint8Array(fromA.length / 2);
      for (let ai = 0, hi = 0; ai < array.length; ai++, hi += 2) {
        const n1 = asciiToBase16(fromA.charCodeAt(hi));
        const n2 = asciiToBase16(fromA.charCodeAt(hi + 1));
        array[ai] = n1 * 16 + n2;
      }
      return array;
    },
  },
);

export const Encode = {
  hex: Schema.encodeSync(BytesSchema),
};

export const Decode = {
  hex: Schema.decodeUnknownSync(BytesSchema),
};

export const EncodeEither = {
  hex: Schema.encodeEither(BytesSchema),
};

export const DecodeEither = {
  hex: Schema.decodeUnknownEither(BytesSchema),
};

export const EncodeEffect = {
  hex: Schema.encode(BytesSchema),
};

export const DecodeEffect = {
  hex: Schema.decodeUnknown(BytesSchema),
};
