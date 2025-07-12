// The following code is adapted from the noble-hashes library, available at:
// https://github.com/paulmillr/noble-hashes
//
// These utility functions have been specifically designed to ensure compatibility
// with browser environments. The original source can be found here:
// https://github.com/paulmillr/noble-hashes/blob/main/src/utils.ts

import { Data, Effect } from "effect";

export class BytesError extends Data.TaggedError("BytesError")<{
  message: string;
  cause?: unknown;
}> {}

/**
 * Asserts that the input is a Uint8Array and, if a length constraint is provided, that its length matches.
 * The length constraint can be:
 *   - a single number (exact length)
 *   - an array [min, max] (inclusive range)
 *   - an object { min?: number; max?: number }
 * Throws an Error if the assertion fails.
 *
 * @example
 * import { assert_bytes_unsafe } from "@evolution-sdk/experimental/Bytes";
 * assert_bytes_unsafe(new Uint8Array([1,2,3]), 3); // passes
 * assert_bytes_unsafe(new Uint8Array([1,2,3]), [2,4]); // passes
 * assert_bytes_unsafe(new Uint8Array([1,2,3]), { min: 2, max: 3 }); // passes
 * assert_bytes_unsafe(new Uint8Array([1,2,3]), { min: 4 }); // throws
 *
 * @since 1.0.0
 * @category predicates
 */
export const assert_bytes_or_throw = (
  b: Uint8Array | undefined,
  length?: number | [number, number] | { min?: number; max?: number },
): void => {
  if (!isBytes(b)) throw new Error("Uint8Array expected");
  if (length !== undefined) {
    const len = b.length;
    if (typeof length === "number") {
      if (len !== length)
        throw new Error(
          `Uint8Array expected of length ${length}, not of length=${len}`,
        );
    } else if (Array.isArray(length)) {
      const [min, max] = length;
      if (len < min || len > max)
        throw new Error(
          `Uint8Array expected of length in [${min},${max}], not of length=${len}`,
        );
    } else if (typeof length === "object") {
      if (
        (length.min !== undefined && len < length.min) ||
        (length.max !== undefined && len > length.max)
      ) {
        throw new Error(
          `Uint8Array expected of length` +
            (length.min !== undefined ? ` >= ${length.min}` : "") +
            (length.max !== undefined ? ` <= ${length.max}` : "") +
            `, not of length=${len}`,
        );
      }
    }
  }
};

/**
 * Asserts that the input is a Uint8Array and, if a length constraint is provided, that its length matches.
 * The length constraint can be:
 *   - a single number (exact length)
 *   - an array [min, max] (inclusive range)
 *   - an object { min?: number; max?: number }
 * Fails with BytesError if the assertion fails.
 *
 * @example
 * import { assert_bytes } from "@evolution-sdk/experimental/Bytes";
 * yield* assert_bytes(new Uint8Array([1,2,3]), 3); // passes
 * yield* assert_bytes(new Uint8Array([1,2,3]), [2,4]); // passes
 * yield* assert_bytes(new Uint8Array([1,2,3]), { min: 2, max: 3 }); // passes
 * yield* assert_bytes(new Uint8Array([1,2,3]), { min: 4 }); // fails
 *
 * @since 1.0.0
 * @category predicates
 */
export const assert_bytes = Effect.fn(function* (
  b: Uint8Array | undefined,
  length?: number | [number, number] | { min?: number; max?: number },
) {
  if (!isBytes(b)) {
    yield* new BytesError({ message: "Uint8Array expected" });
  }
  if (length !== undefined) {
    const len = b!.length;
    if (typeof length === "number") {
      if (len !== length) {
        yield* new BytesError({
          message: `Uint8Array expected of length ${length}, not of length=${len}`,
        });
      }
    } else if (Array.isArray(length)) {
      const [min, max] = length;
      if (len < min || len > max) {
        yield* new BytesError({
          message: `Uint8Array expected of length in [${min},${max}], not of length=${len}`,
        });
      }
    } else if (typeof length === "object") {
      if (
        (length.min !== undefined && len < length.min) ||
        (length.max !== undefined && len > length.max)
      ) {
        yield* new BytesError({
          message:
            `Uint8Array expected of length` +
            (length.min !== undefined ? ` >= ${length.min}` : "") +
            (length.max !== undefined ? ` <= ${length.max}` : "") +
            `, not of length=${len}`,
        });
      }
    }
  }
});

export function isBytes(a: unknown): a is Uint8Array {
  return (
    a instanceof Uint8Array ||
    (a != null && typeof a === "object" && a.constructor.name === "Uint8Array")
  );
}

// We use optimized technique to convert hex string to byte array
const asciis = { _0: 48, _9: 57, _A: 65, _F: 70, _a: 97, _f: 102 } as const;
function asciiToBase16(char: number): number | undefined {
  if (char >= asciis._0 && char <= asciis._9) return char - asciis._0;
  if (char >= asciis._A && char <= asciis._F) return char - (asciis._A - 10);
  if (char >= asciis._a && char <= asciis._f) return char - (asciis._a - 10);
  return;
}

// Array where index 0xf0 (240) is mapped to string 'f0'
const hexes = /* @__PURE__ */ Array.from({ length: 256 }, (_, i) =>
  i.toString(16).padStart(2, "0"),
);

/**
 * @example fromHex('cafe0123') -> Uint8Array.from([0xca, 0xfe, 0x01, 0x23])
 */
export function fromHexOrThrow(hex: string): Uint8Array {
  if (typeof hex !== "string")
    throw new Error("hex string expected, got " + typeof hex);
  const hl = hex.length;
  const al = hl / 2;
  if (hl % 2)
    throw new Error(
      "padded hex string expected, got unpadded hex of length " +
        hl +
        " " +
        hex,
    );
  const array = new Uint8Array(al);
  for (let ai = 0, hi = 0; ai < al; ai++, hi += 2) {
    const n1 = asciiToBase16(hex.charCodeAt(hi));
    const n2 = asciiToBase16(hex.charCodeAt(hi + 1));
    if (n1 === undefined || n2 === undefined) {
      const char = hex[hi] + hex[hi + 1];
      throw new Error(
        'hex string expected, got non-hex character "' +
          char +
          '" at index ' +
          hi,
      );
    }
    array[ai] = n1 * 16 + n2;
  }
  return array;
}

export const fromHex = Effect.fn(function* (hex: string) {
  if (typeof hex !== "string")
    yield* new BytesError({
      message: "hex string expected, got " + typeof hex,
    });
  const hl = hex.length;
  const al = hl / 2;
  if (hl % 2)
    yield* new BytesError({
      message: "padded hex string expected, got unpadded hex of length " + hl,
    });
  const array = new Uint8Array(al);
  for (let ai = 0, hi = 0; ai < al; ai++, hi += 2) {
    const n1 = asciiToBase16(hex.charCodeAt(hi));
    const n2 = asciiToBase16(hex.charCodeAt(hi + 1));
    if (n1 === undefined || n2 === undefined) {
      const char = hex[hi] + hex[hi + 1];
      yield* new BytesError({
        message:
          'hex string expected, got non-hex character "' +
          char +
          '" at index ' +
          hi,
      });
    }
    array[ai] = n1! * 16 + n2!;
  }
  return array;
});

/**
 * @example toHex(Uint8Array.from([0xca, 0xfe, 0x01, 0x23])) -> 'cafe0123'
 */
export function toHexOrThrow(bytes: Uint8Array, ...length: number[]): string {
  assert_bytes_or_throw(bytes, ...length);
  // pre-caching improves the speed 6x
  let hex = "";
  for (let i = 0; i < bytes.length; i++) {
    hex += hexes[bytes[i]];
  }
  return hex;
}

export const toHex = Effect.fnUntraced(function* (
  bytes: Uint8Array,
  ...lengths: number[]
) {
  yield* assert_bytes(bytes, ...lengths);
  // pre-caching improves the speed 6x
  let hex = "";
  for (let i = 0; i < bytes.length; i++) {
    hex += hexes[bytes[i]];
  }
  return hex;
});

/** Convert a Hex encoded string to a Utf-8 encoded string.
 * @example toText("6d79746f6b656e") -> 'mytoken'
 */
export function unsafeToText(hex: string): string {
  return new TextDecoder().decode(fromHexOrThrow(hex)).toString();
}

/** Convert a Utf-8 encoded string to a Hex encoded string.
 * @example fromText("mytoken") -> 6d79746f6b656e
 */
export function fromTextUnsafe(text: string): string {
  return toHexOrThrow(new TextEncoder().encode(text));
}

/**
 * Checks if a string is a valid hexadecimal string (lowercase, even length).
 *
 * @example
 * import { isHex } from "@evolution-sdk/experimental/Bytes";
 * isHex("deadbeef"); // true
 * isHex("DEADBEEF"); // false
 * isHex("abc"); // false
 *
 * @since 1.0.0
 * @category predicates
 */
export const isHex = (input: string): boolean =>
  typeof input === "string" &&
  input.length % 2 === 0 &&
  /^[0-9a-f]*$/.test(input);
