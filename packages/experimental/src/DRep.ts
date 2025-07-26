import { Effect, Schema, Data, FastCheck, ParseResult } from "effect";
import * as KeyHash from "./KeyHash.js";
import * as ScriptHash from "./ScriptHash.js";
import * as CBOR from "./CBOR.js";
import * as Bytes from "./Bytes.js";

/**
 * Error class for DRep related operations.
 *
 * @example
 * import { DRep } from "@evolution-sdk/experimental";
 * import assert from "assert";
 *
 * const error = new DRep.DRepError({ message: "Invalid DRep" });
 * assert(error.message === "Invalid DRep");
 *
 * @since 2.0.0
 * @category errors
 */
export class DRepError extends Data.TaggedError("DRepError")<{
  message?: string;
  reason?: "InvalidStructure" | "UnsupportedType";
}> {}

/**
 * Union schema for DRep representing different DRep types.
 *
 * drep = [0, addr_keyhash] / [1, script_hash] / [2] / [3]
 *
 * @since 2.0.0
 * @category schemas
 */
export const DRep = Schema.Union(
  Schema.TaggedStruct("KeyHashDRep", {
    keyHash: KeyHash.KeyHash,
  }),
  Schema.TaggedStruct("ScriptHashDRep", {
    scriptHash: ScriptHash.ScriptHash,
  }),
  Schema.TaggedStruct("AlwaysAbstainDRep", {}),
  Schema.TaggedStruct("AlwaysNoConfidenceDRep", {}),
);

/**
 * Type alias for DRep.
 *
 * @since 2.0.0
 * @category model
 */
export type DRep = typeof DRep.Type;

/**
 * CDDL schema for DRep with proper transformation.
 * drep = [0, addr_keyhash] / [1, script_hash] / [2] / [3]
 *
 * @since 2.0.0
 * @category schemas
 */
export const DRepCDDLSchema = Schema.transformOrFail(
  Schema.Union(
    Schema.Tuple(Schema.Literal(0), Schema.Uint8ArrayFromSelf),
    Schema.Tuple(Schema.Literal(1), Schema.Uint8ArrayFromSelf),
    Schema.Tuple(Schema.Literal(2)),
    Schema.Tuple(Schema.Literal(3)),
  ),
  Schema.typeSchema(DRep),
  {
    strict: true,
    encode: (toA) =>
      Effect.gen(function* () {
        switch (toA._tag) {
          case "KeyHashDRep": {
            const keyHashBytes = yield* ParseResult.encode(KeyHash.FromBytes)(
              toA.keyHash,
            );
            return [0, keyHashBytes] as const;
          }
          case "ScriptHashDRep": {
            const scriptHashBytes = yield* ParseResult.encode(
              ScriptHash.BytesSchema,
            )(toA.scriptHash);
            return [1, scriptHashBytes] as const;
          }
          case "AlwaysAbstainDRep":
            return [2] as const;
          case "AlwaysNoConfidenceDRep":
            return [3] as const;
        }
      }),
    decode: (fromA) =>
      Effect.gen(function* () {
        const [tag, ...rest] = fromA;
        switch (tag) {
          case 0: {
            const keyHash = yield* ParseResult.decode(KeyHash.FromBytes)(
              rest[0] as Uint8Array,
            );
            return yield* ParseResult.decode(DRep)({
              _tag: "KeyHashDRep",
              keyHash,
            });
          }
          case 1: {
            const scriptHash = yield* ParseResult.decode(
              ScriptHash.BytesSchema,
            )(rest[0] as Uint8Array);
            return yield* ParseResult.decode(DRep)({
              _tag: "ScriptHashDRep",
              scriptHash,
            });
          }
          case 2:
            return yield* ParseResult.decode(DRep)({
              _tag: "AlwaysAbstainDRep",
            });
          case 3:
            return yield* ParseResult.decode(DRep)({
              _tag: "AlwaysNoConfidenceDRep",
            });
          default:
            return yield* ParseResult.fail(
              new ParseResult.Type(
                Schema.typeSchema(DRep).ast,
                fromA,
                `Invalid DRep tag: ${tag}`,
              ),
            );
        }
      }),
  },
);

/**
 * Type alias for KeyHashDRep.
 *
 * @since 2.0.0
 * @category model
 */
export type KeyHashDRep = Extract<DRep, { _tag: "KeyHashDRep" }>;

/**
 * Type alias for ScriptHashDRep.
 *
 * @since 2.0.0
 * @category model
 */
export type ScriptHashDRep = Extract<DRep, { _tag: "ScriptHashDRep" }>;

/**
 * Type alias for AlwaysAbstainDRep.
 *
 * @since 2.0.0
 * @category model
 */
export type AlwaysAbstainDRep = Extract<DRep, { _tag: "AlwaysAbstainDRep" }>;

/**
 * Type alias for AlwaysNoConfidenceDRep.
 *
 * @since 2.0.0
 * @category model
 */
export type AlwaysNoConfidenceDRep = Extract<
  DRep,
  { _tag: "AlwaysNoConfidenceDRep" }
>;

/**
 * CBOR bytes transformation schema for DRep.
 *
 * @since 2.0.0
 * @category schemas
 */
export const CBORBytesSchema = (
  options: CBOR.CodecOptions = CBOR.DEFAULT_OPTIONS,
) =>
  Schema.compose(
    CBOR.FromBytes(options), // Uint8Array → CBOR
    DRepCDDLSchema, // CBOR → DRep
  );

/**
 * CBOR hex transformation schema for DRep.
 *
 * @since 2.0.0
 * @category schemas
 */
export const CBORHexSchema = (
  options: CBOR.CodecOptions = CBOR.DEFAULT_OPTIONS,
) =>
  Schema.compose(
    Bytes.FromBytes, // string → Uint8Array
    CBORBytesSchema(options), // Uint8Array → DRep
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
    cborBytes: Schema.decodeUnknownEither(CBORBytesSchema(options)),
    cborHex: Schema.decodeUnknownEither(CBORHexSchema(options)),
  },
  EncodeEffect: {
    cborBytes: Schema.encode(CBORBytesSchema(options)),
    cborHex: Schema.encode(CBORHexSchema(options)),
  },
  DecodeEffect: {
    cborBytes: Schema.decodeUnknown(CBORBytesSchema(options)),
    cborHex: Schema.decodeUnknown(CBORHexSchema(options)),
  },
});

/**
 * Pattern match on a DRep to handle different DRep types.
 *
 * @example
 * import { DRep, KeyHash } from "@evolution-sdk/experimental";
 *
 * const keyHash = new KeyHash.KeyHash({ hash: "1234567890123456789012345678901234567890123456789012345678901234" });
 * const drep = DRep.fromKeyHash(keyHash);
 *
 * const result = DRep.match(drep, {
 *   KeyHashDRep: (d) => `Key hash DRep: ${d.keyHash.hash}`,
 *   ScriptHashDRep: (d) => `Script hash DRep: ${d.scriptHash.hash}`,
 *   AlwaysAbstainDRep: () => "Always abstain DRep",
 *   AlwaysNoConfidenceDRep: () => "Always no confidence DRep"
 * });
 *
 * @since 2.0.0
 * @category transformation
 */
export const match = <A, B, C, D>(
  drep: DRep,
  cases: {
    KeyHashDRep: (drep: KeyHashDRep) => A;
    ScriptHashDRep: (drep: ScriptHashDRep) => B;
    AlwaysAbstainDRep: (drep: AlwaysAbstainDRep) => C;
    AlwaysNoConfidenceDRep: (drep: AlwaysNoConfidenceDRep) => D;
  },
): A | B | C | D => {
  switch (drep._tag) {
    case "KeyHashDRep":
      return cases.KeyHashDRep(drep);
    case "ScriptHashDRep":
      return cases.ScriptHashDRep(drep);
    case "AlwaysAbstainDRep":
      return cases.AlwaysAbstainDRep(drep);
    case "AlwaysNoConfidenceDRep":
      return cases.AlwaysNoConfidenceDRep(drep);
    default:
      throw new Error(
        `Exhaustive check failed: Unhandled case '${(drep as { _tag: string })._tag}' encountered.`,
      );
  }
};

/**
 * Check if a DRep is a KeyHashDRep.
 *
 * @example
 * import { DRep, KeyHash } from "@evolution-sdk/experimental";
 *
 * const keyHash = new KeyHash.KeyHash({ hash: "1234567890123456789012345678901234567890123456789012345678901234" });
 * const drep = DRep.fromKeyHash(keyHash);
 * console.log(DRep.isKeyHashDRep(drep)); // true
 *
 * @since 2.0.0
 * @category predicates
 */
export const isKeyHashDRep = (drep: DRep): drep is KeyHashDRep =>
  drep._tag === "KeyHashDRep";

/**
 * Check if a DRep is a ScriptHashDRep.
 *
 * @example
 * import { DRep, ScriptHash } from "@evolution-sdk/experimental";
 *
 * const scriptHash = new ScriptHash.ScriptHash({ hash: "1234567890123456789012345678901234567890123456789012345678901234" });
 * const drep = DRep.fromScriptHash(scriptHash);
 * console.log(DRep.isScriptHashDRep(drep)); // true
 *
 * @since 2.0.0
 * @category predicates
 */
export const isScriptHashDRep = (drep: DRep): drep is ScriptHashDRep =>
  drep._tag === "ScriptHashDRep";

/**
 * Check if a DRep is an AlwaysAbstainDRep.
 *
 * @example
 * import { DRep } from "@evolution-sdk/experimental";
 *
 * const drep = DRep.alwaysAbstain();
 * console.log(DRep.isAlwaysAbstainDRep(drep)); // true
 *
 * @since 2.0.0
 * @category predicates
 */
export const isAlwaysAbstainDRep = (drep: DRep): drep is AlwaysAbstainDRep =>
  drep._tag === "AlwaysAbstainDRep";

/**
 * Check if a DRep is an AlwaysNoConfidenceDRep.
 *
 * @example
 * import { DRep } from "@evolution-sdk/experimental";
 *
 * const drep = DRep.alwaysNoConfidence();
 * console.log(DRep.isAlwaysNoConfidenceDRep(drep)); // true
 *
 * @since 2.0.0
 * @category predicates
 */
export const isAlwaysNoConfidenceDRep = (
  drep: DRep,
): drep is AlwaysNoConfidenceDRep => drep._tag === "AlwaysNoConfidenceDRep";

/**
 * Check if the given value is a valid DRep
 *
 * @since 2.0.0
 * @category predicates
 */
export const isDRep = Schema.is(DRep);

/**
 * FastCheck generator for DRep instances.
 *
 * @since 2.0.0
 * @category generators
 */
export const generator = FastCheck.oneof(
  FastCheck.record({
    keyHash: KeyHash.generator,
  }).map((props) => ({ _tag: "KeyHashDRep" as const, ...props })),
  FastCheck.record({
    scriptHash: ScriptHash.generator,
  }).map((props) => ({ _tag: "ScriptHashDRep" as const, ...props })),
  FastCheck.record({}).map(() => ({ _tag: "AlwaysAbstainDRep" as const })),
  FastCheck.record({}).map(() => ({ _tag: "AlwaysNoConfidenceDRep" as const })),
);

/**
 * Check if two DRep instances are equal.
 *
 * @example
 * import { DRep, KeyHash } from "@evolution-sdk/experimental";
 *
 * const keyHash = new KeyHash.KeyHash({ hash: "1234567890123456789012345678901234567890123456789012345678901234" });
 * const drep1 = DRep.fromKeyHash(keyHash);
 * const drep2 = DRep.fromKeyHash(keyHash);
 * const isEqual = DRep.equals(drep1, drep2); // true
 *
 * @since 2.0.0
 * @category equality
 */
export const equals = (self: DRep, that: DRep): boolean => {
  if (self._tag !== that._tag) return false;

  switch (self._tag) {
    case "KeyHashDRep":
      return KeyHash.equals(self.keyHash, (that as KeyHashDRep).keyHash);
    case "ScriptHashDRep":
      return ScriptHash.equals(
        self.scriptHash,
        (that as ScriptHashDRep).scriptHash,
      );
    case "AlwaysAbstainDRep":
    case "AlwaysNoConfidenceDRep":
      return true; // These have no additional data to compare
    default:
      return false;
  }
};

/**
 * Create a KeyHashDRep from a KeyHash.
 *
 * @example
 * import { DRep, KeyHash } from "@evolution-sdk/experimental";
 *
 * const keyHash = new KeyHash.KeyHash({ hash: "1234567890123456789012345678901234567890123456789012345678901234" });
 * const drep = DRep.fromKeyHash(keyHash);
 *
 * @since 2.0.0
 * @category constructors
 */
export const fromKeyHash = (keyHash: KeyHash.KeyHash): KeyHashDRep => ({
  _tag: "KeyHashDRep",
  keyHash,
});

/**
 * Create a ScriptHashDRep from a ScriptHash.
 *
 * @example
 * import { DRep, ScriptHash } from "@evolution-sdk/experimental";
 *
 * const scriptHash = new ScriptHash.ScriptHash({ hash: "1234567890123456789012345678901234567890123456789012345678901234" });
 * const drep = DRep.fromScriptHash(scriptHash);
 *
 * @since 2.0.0
 * @category constructors
 */
export const fromScriptHash = (
  scriptHash: ScriptHash.ScriptHash,
): ScriptHashDRep => ({
  _tag: "ScriptHashDRep",
  scriptHash,
});

/**
 * Create an AlwaysAbstainDRep.
 *
 * @example
 * import { DRep } from "@evolution-sdk/experimental";
 *
 * const drep = DRep.alwaysAbstain();
 *
 * @since 2.0.0
 * @category constructors
 */
export const alwaysAbstain = (): AlwaysAbstainDRep => ({
  _tag: "AlwaysAbstainDRep",
});

/**
 * Create an AlwaysNoConfidenceDRep.
 *
 * @example
 * import { DRep } from "@evolution-sdk/experimental";
 *
 * const drep = DRep.alwaysNoConfidence();
 *
 * @since 2.0.0
 * @category constructors
 */
export const alwaysNoConfidence = (): AlwaysNoConfidenceDRep => ({
  _tag: "AlwaysNoConfidenceDRep",
});
