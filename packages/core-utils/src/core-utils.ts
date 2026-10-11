// The following code is adapted from the noble-hashes library, available at:
// https://github.com/paulmillr/noble-hashes
//
// These utility functions have been specifically designed to ensure compatibility
// with browser environments. The original source can be found here:
// https://github.com/paulmillr/noble-hashes/blob/main/src/utils.ts

function assert_bytes(b: Uint8Array | undefined, ...lengths: number[]) {
  if (!isBytes(b)) throw new Error("Uint8Array expected");
  if (lengths.length > 0 && !lengths.includes(b.length))
    throw new Error(
      `Uint8Array expected of length ${lengths}, not of length=${b.length}`,
    );
}

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
 * Node's native hex codec, several times faster than the loops below on all
 * but the shortest inputs. `getBuiltinModule` loads it without a static
 * import, so bundles for other runtimes are unaffected. It is used only if
 * it encodes like `hexes` and stops at an invalid digit in either position,
 * which some `Buffer` polyfills do not.
 */
const nodeBuffer = (() => {
  try {
    const buffer =
      globalThis.process?.getBuiltinModule?.("node:buffer")?.Buffer;
    if (!buffer) return undefined;
    const bytes = Uint8Array.from(hexes, (_, i) => i);
    const view = buffer.from(bytes.buffer, 0, bytes.length);
    if (view.toString("hex") !== hexes.join("")) return undefined;
    const probe = new Uint8Array(2);
    const writes = ["0g", "g0", "1g00", "0f0G"].map((hex) =>
      buffer.from(probe.buffer, 0, hex.length / 2).write(hex, "hex"),
    );
    return writes.join() === "0,0,0,1" ? buffer : undefined;
  } catch {
    return undefined;
  }
})();

/**
 * @example fromHex('cafe0123') -> Uint8Array.from([0xca, 0xfe, 0x01, 0x23])
 */
export function fromHex(hex: string): Uint8Array {
  if (typeof hex !== "string")
    throw new Error("hex string expected, got " + typeof hex);
  const hl = hex.length;
  const al = hl / 2;
  if (hl % 2)
    throw new Error(
      "padded hex string expected, got unpadded hex of length " + hl,
    );
  const array = new Uint8Array(al);
  // Node's decoder stops at the first invalid digit, so a short write falls
  // through to the loop, which reports it. Two-byte characters are excluded
  // first: Node reads only their low byte.
  if (
    nodeBuffer &&
    hl > 64 &&
    nodeBuffer.byteLength(hex, "utf8") === hl &&
    nodeBuffer.from(array.buffer, 0, al).write(hex, "hex") === al
  ) {
    return array;
  }
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

/**
 * @example toHex(Uint8Array.from([0xca, 0xfe, 0x01, 0x23])) -> 'cafe0123'
 */
export function toHex(bytes: Uint8Array): string {
  assert_bytes(bytes);
  // Below about 20 bytes the loop is faster than a call into Node.
  if (nodeBuffer && bytes.length > 20 && bytes instanceof Uint8Array) {
    return nodeBuffer
      .from(bytes.buffer, bytes.byteOffset, bytes.length)
      .toString("hex");
  }
  // pre-caching improves the speed 6x
  let hex = "";
  for (let i = 0; i < bytes.length; i++) {
    hex += hexes[bytes[i]];
  }
  return hex;
}

/** Convert a Hex encoded string to a Utf-8 encoded string.
 * @example toText("6d79746f6b656e") -> 'mytoken'
 */
export function toText(hex: string): string {
  return new TextDecoder().decode(fromHex(hex)).toString();
}

/** Convert a Utf-8 encoded string to a Hex encoded string.
 * @example fromText("mytoken") -> 6d79746f6b656e
 */
export function fromText(text: string): string {
  return toHex(new TextEncoder().encode(text));
}

export const sleep = (ms: number = 1000) =>
  new Promise((r) => setTimeout(r, ms));
