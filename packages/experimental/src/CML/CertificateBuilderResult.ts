import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

export type CertificateBuilderResult = CML.CertificateBuilderResult;

export class CertificateBuilderResultError extends Data.TaggedError(
  "CertificateBuilderResultError",
)<{
  message?: string;
}> {}

/**
 * Method free of CertificateBuilderResult
 *
 * @example
 * import { CertificateBuilderResult } from "@lucid-evolution/experimental";
 * import { Effect } from "effect";
 *
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * // Assume we have a CertificateBuilderResult instance
 * const instance = ... ;
 *   const result = yield* CertificateBuilderResult.free(instance);
 *   console.log(result);
 * });
 *
 * @since 2.0.0
 * @category Methods
 */
export const free = Effect.fn(
  (
    instance: CML.CertificateBuilderResult,
  ): Effect.Effect<void, CertificateBuilderResultError> =>
    Effect.try({
      try: () => instance.free(),
      catch: () =>
        new CertificateBuilderResultError({
          message: `CertificateBuilderResult.free failed Hint: Check if you're calling free() more than once.`,
        }),
    }),
);

/**
 * Unsafely calls instance.free without Effect wrapper
 *
 * @example
 * import { CertificateBuilderResult } from "@lucid-evolution/experimental";
 *
 * // Assume we have a CertificateBuilderResult instance
 * const instance = ... ;
 *
 * // Using try/catch for error handling
 * try {
 *   const result = CertificateBuilderResult.unsafeFree(instance);
 *   console.log(result);
 * } catch (error) {
 *   console.error(`CertificateBuilderResult.unsafeFree failed: ${error.message}`);
 * }
 *
 * @since 2.0.0
 * @category Methods
 */
export const unsafeFree = (instance: CML.CertificateBuilderResult): void =>
  Effect.runSync(free(instance));
