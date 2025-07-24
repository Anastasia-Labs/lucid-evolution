/**
 * Simple codec factory for creating encoding utilities from schema records
 *
 * @since 2.0.0
 * @category utilities
 */

import { Schema, Effect, Either, ParseResult } from "effect";

/**
 * Creates encoding and decoding utilities with custom error mapping
 *
 * @since 2.0.0
 * @category constructors
 */
export const createEncoders = <
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends Record<string, Schema.Schema<any, any, never>>,
  ErrorClass extends {
    new (options: { message?: string; cause?: unknown }): unknown;
  },
>(
  schemas: T,
  ErrorClass: ErrorClass
) => {
  const createEncodeMethod = <A, I>(
    schema: Schema.Schema<A, I, never>,
    operationType: "encode" | "decode",
    formatName: string
  ) => {
    if (operationType === "encode") {
      return (input: A): I => {
        try {
          return Schema.encodeSync(schema)(input);
        } catch (cause) {
          throw new ErrorClass({
            message: `Failed to encode to ${formatName}`,
            cause,
          });
        }
      };
    } else {
      return (input: I): A => {
        try {
          return Schema.decodeSync(schema)(input);
        } catch (cause) {
          throw new ErrorClass({
            message: `Failed to decode ${formatName}`,
            cause,
          });
        }
      };
    }
  };

  const encodeSync = Object.fromEntries(
    Object.entries(schemas).map(([key, schema]) => [
      key,
      createEncodeMethod(schema, "encode", key),
    ])
  );

  const decodeSync = Object.fromEntries(
    Object.entries(schemas).map(([key, schema]) => [
      key,
      createEncodeMethod(schema, "decode", key),
    ])
  );

  const createEffectMethods = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fn: (schema: any) => any,
    operationType: "encode" | "decode"
  ) =>
    Object.fromEntries(
      Object.entries(schemas).map(([key, schema]) => [
        key,
        (input: unknown) =>
          fn(schema)(input).pipe(
            Effect.mapError(
              (cause: ParseResult.ParseError) =>
                new ErrorClass({
                  message: `Failed to ${operationType} ${key}`,
                  cause,
                })
            )
          ),
      ])
    );

  const createEitherMethods = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fn: (schema: any) => any,
    operationType: "encode" | "decode"
  ) =>
    Object.fromEntries(
      Object.entries(schemas).map(([key, schema]) => [
        key,
        (input: unknown) =>
          fn(schema)(input).pipe(
            Either.mapLeft(
              (cause: ParseResult.ParseError) =>
                new ErrorClass({
                  message: `Failed to ${operationType} ${key}`,
                  cause,
                })
            )
          ),
      ])
    );

  const encodeEffect = createEffectMethods(Schema.encode, "encode");
  const decodeEffect = createEffectMethods(Schema.decode, "decode");
  const encodeEither = createEitherMethods(Schema.encodeEither, "encode");
  const decodeEither = createEitherMethods(
    Schema.decodeUnknownEither,
    "decode"
  );

  return {
    Encode: encodeSync as {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      [K in keyof T]: T[K] extends Schema.Schema<infer A, infer I, any>
        ? (input: A) => I
        : never;
    },
    Decode: decodeSync as {
      [K in keyof T]: T[K] extends Schema.Schema<infer A, infer I>
        ? (input: I) => A
        : never;
    },
    EncodeEffect: encodeEffect as {
      [K in keyof T]: T[K] extends Schema.Schema<infer A, infer I>
        ? (input: A) => Effect.Effect<I, InstanceType<ErrorClass>>
        : never;
    },
    DecodeEffect: decodeEffect as {
      [K in keyof T]: T[K] extends Schema.Schema<infer A, infer I>
        ? (input: I) => Effect.Effect<A, InstanceType<ErrorClass>>
        : never;
    },
    EncodeEither: encodeEither as {
      [K in keyof T]: T[K] extends Schema.Schema<infer A, infer I>
        ? (input: A) => Either.Either<I, InstanceType<ErrorClass>>
        : never;
    },
    DecodeEither: decodeEither as {
      [K in keyof T]: T[K] extends Schema.Schema<infer A, infer I>
        ? (input: I) => Either.Either<A, InstanceType<ErrorClass>>
        : never;
    },
  };
};
