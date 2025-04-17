import { bech32 } from "@scure/base";
import { Data, Effect } from "effect";

/**
 * @since 2.0.0
 * @category model
 */
export class Bech32Error extends Data.TaggedError("Bech32Error")<{
  message: string;
  cause?: unknown;
}> {}

/**
 * Get raw bytes from address string (either format)
 *
 * @example
 * import { Bech32 } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 * import assert from "assert";
 *
 * const effect = Bech32.toBytes("addr1qx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3n0d3vllmyqwsx5wktcd8cc3sq835lu7drv2xwl2wywfgse35a3x");
 * const bytes = Effect.runSync(effect);
 * assert(bytes instanceof Uint8Array);
 * assert(bytes.length > 0);
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const toBytes = (
  bech32Address: string,
): Effect.Effect<Uint8Array, Bech32Error> =>
  Effect.try({
    try: () => bech32.decodeToBytes(bech32Address).bytes,
    catch: (cause) =>
      new Bech32Error({
        message: `${cause}`,
      }),
  });
