import { bech32 } from "@scure/base";
import { Data, Effect, ParseResult, Schema } from "effect";

/**
 * @since 2.0.0
 * @category model
 */
export class Bech32Error extends Data.TaggedError("Bech32Error")<{
  message: string;
  cause?: unknown;
}> {}

const Bech32 = Schema.String.pipe(Schema.brand("Bech32"));
type Bech32 = typeof Bech32.Type;

const Bytes = (prefix: string = "addr") =>
  Schema.transformOrFail(Schema.Uint8ArrayFromSelf, Bech32, {
    strict: true,
    encode: (toI, options, ast, toA) =>
      Effect.try({
        try: () => bech32.decodeToBytes(toA).bytes,
        catch: (cause) =>
          new ParseResult.Type(
            ast,
            toA,
            ` ${toA} is not a valid Bech32 address`,
          ),
      }),
    decode: (fromA, options, ast, fromI) => {
      const words = bech32.toWords(fromI);
      return ParseResult.succeed(
        Bech32.make(bech32.encode(prefix, words, false)),
      );
    },
  });

export { Bech32, Bytes };
