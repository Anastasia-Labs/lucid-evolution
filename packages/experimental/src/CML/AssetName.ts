import { Data, Effect } from "effect";
import * as ErrorFormat from "../ErrorFormat.js";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

class CMLAssetNameError extends Data.TaggedError("CMLAssetNameError")<{
  cause?: unknown;
  message?: string;
}> {}

export const from_hex = (hex: string) =>
  Effect.try({
    try: () => CML.AssetName.from_hex(hex),
    catch: (cause) =>
      new CMLAssetNameError(
        ErrorFormat.make({
          message: `Oops! Looks like [${hex}] isn’t correct, ensure the string is a properly formatted as hex`,
          cause,
        })
      ),
  });

export const from_str = (utf8: string) =>
  Effect.try({
    try: () => CML.AssetName.from_str(utf8),
    catch: (cause) =>
      new CMLAssetNameError(
        ErrorFormat.make({
          message: `Oops! Looks like [${utf8}] isn’t correct, ensure the string is a properly formatted in UTF-8 and max 64 bytes in length`,
          cause,
        })
      ),
  });

export const from_cbor_bytes = (bytes: Uint8Array) =>
  Effect.try({
    try: () => CML.AssetName.from_cbor_bytes(bytes),
    catch: (cause) =>
      new CMLAssetNameError(
        ErrorFormat.make({
          message: `Oops! Looks like [${bytes}] isn’t correct`,
          cause,
        })
      ),
  });

export const from_cbor_hex = (hex: string) =>
  Effect.try({
    try: () => CML.AssetName.from_cbor_hex(hex),
    catch: (cause) =>
      new CMLAssetNameError(
        ErrorFormat.make({
          message: `Oops! Looks like [${hex}] isn’t correct`,
          cause,
        })
      ),
  });