import { Inspectable, Schema } from "effect";
import * as Natural from "./Natural.js";

/**
 * Schema for pointer to a stake registration certificate
 * Contains slot, transaction index, and certificate index information
 *
 * @since 2.0.0
 * @category schemas
 */
export class Pointer extends Schema.TaggedClass<Pointer>("Pointer")("Pointer", {
  slot: Natural.Natural,
  txIndex: Natural.Natural,
  certIndex: Natural.Natural,
}) {
  [Inspectable.NodeInspectSymbol]() {
    return {
      _tag: "Pointer",
      slot: this.slot,
      txIndex: this.txIndex,
      certIndex: this.certIndex,
    };
    // return `Pointer(${this.slot}, ${this.txIndex}, ${this.certIndex})`;
  }
}

/**
 * Check if the given value is a valid Pointer
 *
 * @example
 * import { Pointer , Natural } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * const pointer = Pointer.make(
 *   Natural.makeOrThrow(1),
 *   Natural.makeOrThrow(2),
 *   Natural.makeOrThrow(3),
 * );
 * const isValid = Pointer.isPointer(pointer);
 * assert(isValid === true);
 *
 * @since 2.0.0
 * @category predicates
 */
export const isPointer = Schema.is(Pointer);

/**
 * Create a new Pointer instance
 *
 * @example
 * import { Pointer , Natural } from "@lucid-evolution/experimental";
 * import assert from "assert";
 *
 * const pointer = Pointer.make(
 *   Natural.makeOrThrow(1),
 *   Natural.makeOrThrow(2),
 *   Natural.makeOrThrow(3),
 * );
 * assert(pointer instanceof Pointer.Pointer);
 *
 * @since 2.0.0
 * @category constructors
 */
export const make = (
  slot: Natural.Natural,
  txIndex: Natural.Natural,
  certIndex: Natural.Natural,
): Pointer => {
  return new Pointer(
    {
      slot,
      txIndex,
      certIndex,
    },
    { disableValidation: true },
  );
};
