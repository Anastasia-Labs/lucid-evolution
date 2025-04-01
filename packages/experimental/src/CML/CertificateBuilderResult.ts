/**
 * @since 2.0.0
 */
import { Data, Effect } from "effect";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";

/**
 * Type alias for the CML CertificateBuilderResult class
 *
 * @since 2.0.0
 * @category Types
 */
export type CertificateBuilderResult = CML.CertificateBuilderResult;

/**
 * Error class for CertificateBuilderResult operations
 *
 * This error is thrown when operations on CertificateBuilderResult instances fail.
 *
 * @since 2.0.0
 * @category Errors
 */
export class CertificateBuilderResultError extends Data.TaggedError(
  "CertificateBuilderResultError",
)<{
  message?: string;
}> {}

/**
 * Method free of CertificateBuilderResult
 *
 * @since 2.0.0
 * @category Methods
 */
export const free: (
  instance: CML.CertificateBuilderResult,
) => Effect.Effect<void, CertificateBuilderResultError> = Effect.fn(
  (instance: CML.CertificateBuilderResult) =>
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
 * @since 2.0.0
 * @category MethodsUnsafe
 */
export const freeUnsafe = (instance: CML.CertificateBuilderResult): void =>
  Effect.runSync(free(instance));
