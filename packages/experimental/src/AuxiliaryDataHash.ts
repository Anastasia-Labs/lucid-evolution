import { Data } from "effect"

/**
 * CDDL specs
 * auxiliary_data_hash = $hash32
 */

/**
 * Error thrown when AuxiliaryDataHash operations fail
 *
 * @since 2.0.0
 * @category model
 */
export class AuxiliaryDataHashError extends Data.TaggedError("AuxiliaryDataHashError")<{
  message: string;
  cause?: unknown;
}> { }
