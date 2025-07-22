/**
 * Simple codec factory for creating encoding utilities from schema records
 *
 * @since 2.0.0
 * @category utilities
 */

import { Schema, Effect, Either } from "effect";
import type { ParseError } from "effect/ParseResult";

/**
 * Creates a simple codec with encode and decode methods
 *
 * @example
 * import { createCodec } from "@evolution-sdk/experimental/Codec";
 * import { Schema } from "effect";
 *
 * const codecs = createCodec({
 *   user: Schema.Struct({ name: Schema.String, age: Schema.Number }),
 *   json: Schema.parseJson(Schema.String),
 * });
 *
 * // Usage:
 * const encoded = codecs.Encode.user({ name: "John", age: 30 });
 * const decoded = codecs.Decode.user({ name: "Jane", age: 25 });
 *
 * @since 2.0.0
 * @category constructors
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createCodec = <T extends Record<string, Schema.Schema<any, any>>>(
  schemas: T,
) => {
  const createMethods = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fn: <A, I>(schema: Schema.Schema<A, I>) => any,
  ) =>
    Object.fromEntries(
      Object.entries(schemas).map(([key, schema]) => [key, fn(schema)]),
    );

  const encodeSync = createMethods(Schema.encodeSync);
  const decodeSync = createMethods(Schema.decodeUnknownSync);
  const encodeEffect = createMethods(Schema.encode);
  const decodeEffect = createMethods(Schema.decodeUnknown);
  const encodeEither = createMethods(Schema.encodeEither);
  const decodeEither = createMethods(Schema.decodeUnknownEither);

  return {
    Encode: encodeSync as {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      [K in keyof T]: T[K] extends Schema.Schema<infer A, infer I, any>
        ? (input: A) => I
        : never;
    },
    Decode: decodeSync as {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      [K in keyof T]: T[K] extends Schema.Schema<infer A, any, any>
        ? (input: unknown) => A
        : never;
    },
    EncodeEffect: encodeEffect as {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      [K in keyof T]: T[K] extends Schema.Schema<infer A, infer I, any>
        ? (input: A) => Effect.Effect<I, ParseError>
        : never;
    },
    DecodeEffect: decodeEffect as {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      [K in keyof T]: T[K] extends Schema.Schema<infer A, any, any>
        ? (input: unknown) => Effect.Effect<A, ParseError>
        : never;
    },
    EncodeEither: encodeEither as {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      [K in keyof T]: T[K] extends Schema.Schema<infer A, infer I, any>
        ? (input: A) => Either.Either<I, ParseError>
        : never;
    },
    DecodeEither: decodeEither as {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      [K in keyof T]: T[K] extends Schema.Schema<infer A, any, any>
        ? (input: unknown) => Either.Either<A, ParseError>
        : never;
    },
  };
};
