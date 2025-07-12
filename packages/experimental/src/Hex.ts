import { Data, Effect, pipe, Schema } from "effect";

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

export const HexStringFilter = Schema.String.pipe(
  Schema.filter((a) => isHex(a)),
).annotations({ message: (issue) => `${issue.actual} must be a hex string` });

export const HexString = HexStringFilter.pipe(
  Schema.brand("HexString"),
  Schema.typeSchema,
);

export type HexString = typeof HexString.Type;

const hexes = /* @__PURE__ */ Array.from({ length: 256 }, (_, i) =>
  i.toString(16).padStart(2, "0"),
);

export const fromBytes = <T extends HexString>(bytes: Uint8Array) => {
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
 * @example
 * import { makeOrThrow, toBytes } from "@evolution-sdk/experimental/Hex";
 * const hex = makeOrThrow("deadbeef");
 * const bytes = toBytes(hex); // Uint8Array [222, 173, 190, 239]
 *
 * @since 1.0.0
 * @category encoding/decoding
 */
export const toBytes = (hex: HexString): Uint8Array => {
  const array = new Uint8Array(hex.length / 2);
  for (let ai = 0, hi = 0; ai < array.length; ai++, hi += 2) {
    const n1 = asciiToBase16(hex.charCodeAt(hi));
    const n2 = asciiToBase16(hex.charCodeAt(hi + 1));
    array[ai] = n1 * 16 + n2;
  }
  return array;
};

export const decode = (maybeHex: string) =>
  pipe(
    Schema.validate(HexString)(maybeHex),
    Effect.mapError((e) => new HexError({ message: `${e.message}` })),
  );

export const decodeOrThrow = (rawHex: string) => Effect.runSync(decode(rawHex));
