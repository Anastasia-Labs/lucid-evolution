import { Schema, Data, FastCheck, Effect, ParseResult } from "effect";
import * as CBOR from "./CBOR.js";
import * as Bytes from "./Bytes.js";
import * as _Codec from "./Codec.js";

/**
 * Error class for ScriptRef related operations.
 *
 * @example
 * import { ScriptRef } from "@evolution-sdk/experimental";
 * import assert from "assert";
 *
 * const error = new ScriptRef.ScriptRefError({ message: "Invalid script ref" });
 * assert(error.message === "Invalid script ref");
 *
 * @since 2.0.0
 * @category errors
 */
export class ScriptRefError extends Data.TaggedError("ScriptRefError")<{
  message?: string;
  reason?: "InvalidFormat" | "EncodingError" | "DecodingError" | "InvalidTag";
}> {}

/**
 * Schema for ScriptRef representing a reference to a script in a transaction output.
 *
 * CDDL: script_ref = #6.24(bytes .cbor script)
 *
 * This is a branded hex string that represents the CBOR-encoded script bytes.
 * The script_ref uses CBOR tag 24 to indicate it contains CBOR-encoded script data.
 *
 * @example
 * import { ScriptRef } from "@evolution-sdk/experimental";
 * import { Schema } from "effect";
 *
 * const scriptRef = Schema.decodeSync(ScriptRef.ScriptRef)("deadbeef"); // hex bytes
 * console.log(scriptRef); // "deadbeef"
 *
 * @since 2.0.0
 * @category model
 */
export const ScriptRef = Bytes.HexSchema.pipe(Schema.brand("ScriptRef"));
export type ScriptRef = typeof ScriptRef.Type;

/**
 * Check if a value is a valid ScriptRef.
 *
 * @example
 * import { ScriptRef } from "@evolution-sdk/experimental";
 *
 * const scriptRef = ScriptRef.make("deadbeef");
 * const isValid = ScriptRef.isScriptRef(scriptRef); // true
 *
 * @since 2.0.0
 * @category predicates
 */
export const isScriptRef = Schema.is(ScriptRef);

/**
 * Check if two ScriptRef instances are equal.
 *
 * @example
 * import { ScriptRef } from "@evolution-sdk/experimental";
 *
 * const ref1 = ScriptRef.make("deadbeef");
 * const ref2 = ScriptRef.make("deadbeef");
 * const isEqual = ScriptRef.equals(ref1, ref2); // true
 *
 * @since 2.0.0
 * @category equality
 */
export const equals = (self: ScriptRef, that: ScriptRef): boolean =>
  self === that;

/**
 * FastCheck generator for ScriptRef instances.
 *
 * @since 2.0.0
 * @category generators
 */
export const generator = FastCheck.uint8Array({
  minLength: 1,
  maxLength: 100,
}).map((bytes) => Schema.decodeSync(ScriptRef)(Bytes.Encode.hex(bytes)));

/**
 * CDDL schema for ScriptRef following the Conway specification.
 * script_ref = #6.24(bytes .cbor script)
 *
 * This transforms between CBOR tag 24 structure and ScriptRef model.
 * The tag 24 contains bytes that represent a CBOR-encoded script.
 *
 * @since 2.0.0
 * @category schemas
 */
export const ScriptRefCDDLSchema = Schema.transformOrFail(CBOR.Tag, ScriptRef, {
  strict: true,
  encode: (_, __, ___, toA) =>
    Effect.gen(function* () {
      return new CBOR.Tag({
        tag: 24, // tag 24 for CBOR script reference
        value: yield* ParseResult.decode(Bytes.BytesSchema)(toA),
      });
    }),

  decode: (taggedValue, _, ast) =>
    Effect.gen(function* () {
      if (taggedValue.tag !== 24) {
        return yield* Effect.fail(
          new ParseResult.Type(
            ast,
            taggedValue,
            `Expected tag 24 for ScriptRef, got tag ${taggedValue.tag}`,
          ),
        );
      }

      if (!(taggedValue.value instanceof Uint8Array)) {
        return yield* Effect.fail(
          new ParseResult.Type(
            ast,
            taggedValue,
            `Expected Uint8Array for ScriptRef value, got ${typeof taggedValue.value}`,
          ),
        );
      }

      return ScriptRef.make(
        yield* ParseResult.encode(Bytes.BytesSchema)(taggedValue.value),
      );
    }),
});

/**
 * CBOR bytes transformation schema for ScriptRef.
 * Transforms between Uint8Array and ScriptRef using CBOR encoding.
 *
 * @since 2.0.0
 * @category schemas
 */
export const CBORBytesSchema = (
  options: CBOR.CodecOptions = CBOR.DEFAULT_OPTIONS,
) =>
  Schema.compose(
    CBOR.CBORBytesSchema(options), // Uint8Array → CBOR
    ScriptRefCDDLSchema, // CBOR → ScriptRef
  );

/**
 * CBOR hex transformation schema for ScriptRef.
 * Transforms between hex string and ScriptRef using CBOR encoding.
 *
 * @since 2.0.0
 * @category schemas
 */
export const CBORHexSchema = (
  options: CBOR.CodecOptions = CBOR.DEFAULT_OPTIONS,
) =>
  Schema.compose(
    Bytes.BytesSchema, // string → Uint8Array
    CBORBytesSchema(options), // Uint8Array → ScriptRef
  );

/**
 * Codec for ScriptRef with all encoding/decoding variants.
 *
 * @since 2.0.0
 * @category codecs
 */
export const Codec = (options: CBOR.CodecOptions = CBOR.DEFAULT_OPTIONS) =>
  _Codec.createCodec({
    cborBytes: CBORBytesSchema(options),
    cborHex: CBORHexSchema(options),
  });
