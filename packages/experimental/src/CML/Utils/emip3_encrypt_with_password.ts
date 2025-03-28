import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export class Emip3EncryptWithPasswordError extends Data.TaggedError(
  "Emip3EncryptWithPasswordError",
)<{
  message?: string;
}> {}

/**
 * Wrapper for the emip3_encrypt_with_password function
 *
 * @example
 * import { emip3EncryptWithPassword } from "@lucid-evolution/experimental/CML/functions";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *   const result = yield* emip3EncryptWithPassword("example", "example", "example", "example");
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Functions
 */
export const emip3EncryptWithPassword = Effect.fn(function* (
  password: string,
  salt: string,
  nonce: string,
  data: string,
) {
  return yield* Effect.try({
    try: () => CML.emip3_encrypt_with_password(password, salt, nonce, data),
    catch: () =>
      new Emip3EncryptWithPasswordError({
        message: `emip3_encrypt_with_password failed with parameters: ${password}, ${salt}, ${nonce}, ${data}.`,
      }),
  });
});

/**
 * Unsafely calls emip3_encrypt_with_password function without Effect wrapper
 *
 * @example
 * import { unsafeEmip3EncryptWithPassword } from "@lucid-evolution/experimental/CML/functions";
 *
 * try {
 *   const result = unsafeEmip3EncryptWithPassword("example", "example", "example", "example");
 *   console.log(result);
 * } catch (error) {
 *   console.error(`unsafeEmip3EncryptWithPassword failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Functions
 */
export const unsafeEmip3EncryptWithPassword = (
  password: string,
  salt: string,
  nonce: string,
  data: string,
): string =>
  Effect.runSync(emip3EncryptWithPassword(password, salt, nonce, data));
