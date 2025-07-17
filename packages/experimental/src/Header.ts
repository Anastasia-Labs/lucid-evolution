/**
 * Header module based on Conway CDDL specification
 *
 * CDDL: header = [header_body, body_signature : kes_signature]
 *
 * @since 2.0.0
 */
import { Data, Schema, ParseResult, Effect } from "effect";
import * as KesSignature from "./KesSignature.js";
import * as HeaderBody from "./HeaderBody.js";
import * as CBOR from "./CBOR.js";
import * as Bytes from "./Bytes.js";

/**
 * Error class for Header operations
 *
 * @since 2.0.0
 * @category errors
 */
export class HeaderError extends Data.TaggedError("HeaderError")<{
  message?: string;
  cause?: unknown;
}> {}

/**
 * Header implementation using HeaderBody and KesSignature
 *
 * CDDL: header = [header_body, body_signature : kes_signature]
 *
 * @since 2.0.0
 * @category model
 */
export class Header extends Schema.TaggedClass<Header>()("Header", {
  headerBody: HeaderBody.HeaderBody,
  bodySignature: KesSignature.KesSignature,
}) {}

/**
 * Check if two Header instances are equal.
 *
 * @example
 * import { Header } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * const header1 = new Header({
 *   headerBody: new HeaderBody.HeaderBody({ ... }),
 *   bodySignature: KesSignature.KesSignature.make("...")
 * });
 * const header2 = new Header({
 *   headerBody: new HeaderBody.HeaderBody({ ... }),
 *   bodySignature: KesSignature.KesSignature.make("...")
 * });
 * assert(Header.equals(header1, header2) === true);
 *
 * @since 2.0.0
 * @category equality
 */
export const equals = (a: Header, b: Header): boolean =>
  HeaderBody.equals(a.headerBody, b.headerBody) &&
  KesSignature.equals(a.bodySignature, b.bodySignature);

/**
 * Predicate to check if a value is a Header instance.
 *
 * @example
 * import { Header } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * const header = new Header({
 *   headerBody: new HeaderBody.HeaderBody({ ... }),
 *   bodySignature: "kes_signature_hex..."
 * });
 * assert(Header.isHeader(header) === true);
 *
 * @since 2.0.0
 * @category predicates
 */
export const isHeader = (value: unknown): value is Header =>
  value instanceof Header;

/**
 * CDDL schema for Header.
 * header = [header_body, body_signature : kes_signature]
 *
 * @since 2.0.0
 * @category schemas
 */
export const HeaderCDDLSchema = Schema.transformOrFail(
  Schema.Tuple(
    Schema.encodedSchema(HeaderBody.HeaderBodyCDDLSchema), // header_body using HeaderBody CDDL schema
    CBOR.ByteArray, // body_signature as bytes
  ),
  Schema.typeSchema(Header),
  {
    strict: true,
    encode: (toA) =>
      Effect.gen(function* () {
        const headerBodyCddl = yield* ParseResult.encode(
          HeaderBody.HeaderBodyCDDLSchema,
        )(toA.headerBody);
        const bodySignatureBytes = yield* ParseResult.encode(
          KesSignature.BytesSchema,
        )(toA.bodySignature);
        return [headerBodyCddl, bodySignatureBytes] as const;
      }),
    decode: ([headerBodyCddl, bodySignatureBytes]) =>
      Effect.gen(function* () {
        const headerBody = yield* ParseResult.decode(
          HeaderBody.HeaderBodyCDDLSchema,
        )(headerBodyCddl);
        const bodySignature = yield* ParseResult.decode(
          KesSignature.BytesSchema,
        )(bodySignatureBytes);
        return yield* ParseResult.decode(Header)({
          _tag: "Header",
          headerBody,
          bodySignature,
        });
      }),
  },
);

/**
 * CBOR bytes transformation schema for Header.
 *
 * @since 2.0.0
 * @category schemas
 */
export const CBORBytesSchema = (
  options: CBOR.CodecOptions = CBOR.DEFAULT_OPTIONS,
) =>
  Schema.compose(
    CBOR.CBORBytesSchema(options), // Uint8Array → CBOR
    HeaderCDDLSchema, // CBOR → Header
  );

/**
 * CBOR hex transformation schema for Header.
 *
 * @since 2.0.0
 * @category schemas
 */
export const CBORHexSchema = (
  options: CBOR.CodecOptions = CBOR.DEFAULT_OPTIONS,
) =>
  Schema.compose(
    Bytes.BytesSchema, // string → Uint8Array
    CBORBytesSchema(options), // Uint8Array → Header
  );

export const Codec = (options: CBOR.CodecOptions = CBOR.DEFAULT_OPTIONS) => ({
  Encode: {
    cborBytes: Schema.encodeSync(CBORBytesSchema(options)),
    cborHex: Schema.encodeSync(CBORHexSchema(options)),
  },
  Decode: {
    cborBytes: Schema.decodeUnknownSync(CBORBytesSchema(options)),
    cborHex: Schema.decodeUnknownSync(CBORHexSchema(options)),
  },
  EncodeEither: {
    cborBytes: Schema.encodeEither(CBORBytesSchema(options)),
    cborHex: Schema.encodeEither(CBORHexSchema(options)),
  },
  DecodeEither: {
    cborBytes: Schema.decodeEither(CBORBytesSchema(options)),
    cborHex: Schema.decodeEither(CBORHexSchema(options)),
  },
  EncodeEffect: {
    cborBytes: Schema.encode(CBORBytesSchema(options)),
    cborHex: Schema.encode(CBORHexSchema(options)),
  },
  DecodeEffect: {
    cborBytes: Schema.decode(CBORBytesSchema(options)),
    cborHex: Schema.decode(CBORHexSchema(options)),
  },
});
