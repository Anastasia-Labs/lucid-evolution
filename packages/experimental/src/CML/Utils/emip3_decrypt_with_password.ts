/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Error class for emip3_decrypt_with_password function
 *
 * This error is thrown when the emip3_decrypt_with_password function fails.
 *
 * @since 2.0.0
 * @category Errors
 */
export class Emip3DecryptWithPasswordError extends Data.TaggedError(
  "Emip3DecryptWithPasswordError",
)<{
  message?: string;
}> {}

/**
 * Wrapper for the emip3_decrypt_with_password function
 *
 * @since 2.0.0
 * @category Functions
 */
export const emip3DecryptWithPassword: (
  password: string,
  data: string,
) => Effect.Effect<string, Emip3DecryptWithPasswordError> = Effect.fn(
  function* (password: string, data: string) {
    return yield* Effect.try({
      try: () => CML.emip3_decrypt_with_password(password, data),
      catch: () =>
        new Emip3DecryptWithPasswordError({
          message: `emip3_decrypt_with_password failed with parameters: ${password}, ${data}.`,
        }),
    });
  },
);

/**
 * Unsafely calls emip3_decrypt_with_password function without Effect wrapper
 *
 * @since 2.0.0
 * @category FunctionsUnsafe
 */
export const emip3DecryptWithPasswordUnsafe = (
  password: string,
  data: string,
): string => Effect.runSync(emip3DecryptWithPassword(password, data));
