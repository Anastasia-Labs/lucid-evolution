/**
 * Header module based on Conway CDDL specification
 *
 * CDDL: header = [header_body, body_signature : kes_signature]
 *
 * @since 2.0.0
 */
import { Data, Schema } from "effect";
import * as KesSignature from "./KesSignature.js";
import * as HeaderBody from "./HeaderBody.js";

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
 * TODO: Implement proper CBOR encoding/decoding
 * Currently returns a placeholder error
 *
 * @since 2.0.0
 * @category schemas
 */
export const BytesSchema = Schema.transform(Schema.Uint8ArrayFromSelf, Header, {
  strict: true,
  encode: () => {
    throw new HeaderError({
      message:
        "Header CBOR encoding not implemented yet. Requires HeaderBody module and CBOR utilities.",
    });
  },
  decode: () => {
    throw new HeaderError({
      message:
        "Header CBOR decoding not implemented yet. Requires HeaderBody module and CBOR utilities.",
    });
  },
});

/**
 * TODO: Implement when BytesSchema is complete
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const Encode = {
  bytes: Schema.encodeSync(BytesSchema),
};

/**
 * TODO: Implement when BytesSchema is complete
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const Decode = {
  bytes: Schema.decodeUnknownSync(BytesSchema),
};

/**
 * TODO: Implement when BytesSchema is complete
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const EncodeEither = {
  bytes: Schema.encodeEither(BytesSchema),
};

/**
 * TODO: Implement when BytesSchema is complete
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const DecodeEither = {
  bytes: Schema.decodeUnknownEither(BytesSchema),
};
