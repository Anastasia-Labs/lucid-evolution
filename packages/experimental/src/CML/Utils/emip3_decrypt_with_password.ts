import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export class Emip3DecryptWithPasswordError extends Data.TaggedError(
  "Emip3DecryptWithPasswordError",
)<{
  message?: string;
}> {}

/**
 * Wrapper for the emip3_decrypt_with_password function
 *
 * @example
 * import { emip3DecryptWithPassword } from "@lucid-evolution/experimental/CML/functions";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *   const result = yield* emip3DecryptWithPassword("example", "example");
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Functions
 */
export const emip3DecryptWithPassword = Effect.fn(function* (
  password: string,
  data: string,
) {
  return yield* Effect.try({
    try: () => CML.emip3_decrypt_with_password(password, data),
    catch: () =>
      new Emip3DecryptWithPasswordError({
        message: `emip3_decrypt_with_password failed with parameters: ${password}, ${data}.`,
      }),
  });
});

/**
 * Unsafely calls emip3_decrypt_with_password function without Effect wrapper
 *
 * @example
 * import { unsafeEmip3DecryptWithPassword } from "@lucid-evolution/experimental/CML/functions";
 *
 * try {
 *   const result = unsafeEmip3DecryptWithPassword("example", "example");
 *   console.log(result);
 * } catch (error) {
 *   console.error(`unsafeEmip3DecryptWithPassword failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Functions
 */
export const unsafeEmip3DecryptWithPassword = (
  password: string,
  data: string,
): string => Effect.runSync(emip3DecryptWithPassword(password, data));
