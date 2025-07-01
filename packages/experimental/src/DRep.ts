import { Schema, Data, FastCheck, Effect, ParseResult, pipe } from "effect";
import * as KeyHash from "./KeyHash.js";
import * as ScriptHash from "./ScriptHash.js";
import * as CBOR from "./CBOR.js";
import * as Bytes from "./Bytes.js";

/**
 * Error class for DRep related operations.
 *
 * @example
 * import { DRep } from "@lucid-evolution/experimental";
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
 * Schema for KeyHashDRep representing a key hash-based DRep.
 *
 * @since 2.0.0
 * @category model
 */
export class KeyHashDRep extends Schema.TaggedClass<KeyHashDRep>()(
  "KeyHashDRep",
  {
    keyHash: KeyHash.KeyHash,
  },
) {}

/**
 * Schema for ScriptHashDRep representing a script hash-based DRep.
 *
 * @since 2.0.0
 * @category model
 */
export class ScriptHashDRep extends Schema.TaggedClass<ScriptHashDRep>()(
  "ScriptHashDRep",
  {
    scriptHash: ScriptHash.ScriptHash,
  },
) {}

/**
 * Schema for AlwaysAbstainDRep representing an always abstain DRep.
 *
 * @since 2.0.0
 * @category model
 */
export class AlwaysAbstainDRep extends Schema.TaggedClass<AlwaysAbstainDRep>()(
  "AlwaysAbstainDRep",
  {},
) {}

/**
 * Schema for AlwaysNoConfidenceDRep representing an always no confidence DRep.
 *
 * @since 2.0.0
 * @category model
 */
export class AlwaysNoConfidenceDRep extends Schema.TaggedClass<AlwaysNoConfidenceDRep>()(
  "AlwaysNoConfidenceDRep",
  {},
) {}

/**
 * Union schema for DRep representing different DRep types.
 * drep = [0, addr_keyhash // 1, script_hash // 2 // 3]
 *
 * @since 2.0.0
 * @category schemas
 */
export const DRep = Schema.Union(
  KeyHashDRep,
  ScriptHashDRep,
  AlwaysAbstainDRep,
  AlwaysNoConfidenceDRep,
);

/**
 * Type alias for DRep.
 *
 * @since 2.0.0
 * @category model
 */
export type DRep = typeof DRep.Type;

/**
 * CDDL schema for DRep as tuple structure.
 * drep = [0, addr_keyhash] / [1, script_hash] / [2] / [3]
 *
 * @since 2.0.0
 * @category schemas
 */
export const DRepCDDLSchema = Schema.Union(
  Schema.Tuple(Schema.Literal(0), Schema.Uint8ArrayFromSelf),
  Schema.Tuple(Schema.Literal(1), Schema.Uint8ArrayFromSelf),
  Schema.Tuple(Schema.Literal(2)),
  Schema.Tuple(Schema.Literal(3)),
);

/**
 * CBOR bytes transformation schema for DRep.
 *
 * @since 2.0.0
 * @category schemas
 */
export const CBORBytesSchema = Schema.transformOrFail(
  Schema.Uint8ArrayFromSelf.annotations({
    identifier: "CBORBytes",
  }),
  DRep,
  {
    strict: true,
    encode: (_, __, ___, toA) => {
      switch (toA._tag) {
        case "KeyHashDRep":
          return ParseResult.succeed(
            CBOR.Encode().bytes([0, Bytes.Decode.hex(toA.keyHash.hash)]),
          );
        case "ScriptHashDRep":
          return ParseResult.succeed(
            CBOR.Encode().bytes([1, Bytes.Decode.hex(toA.scriptHash.hash)]),
          );
        case "AlwaysAbstainDRep":
          return ParseResult.succeed(CBOR.Encode().bytes([2]));
        case "AlwaysNoConfidenceDRep":
          return ParseResult.succeed(CBOR.Encode().bytes([3]));
      }
    },
    decode: (_, __, ___, fromA) =>
      pipe(
        ParseResult.decode(CBOR.makeCBORBytesSchema(DRepCDDLSchema))(fromA),
        Effect.flatMap((decoded) =>
          Effect.gen(function* () {
            if (Array.isArray(decoded) && decoded.length === 1) {
              // [2] or [3]
              const [tag] = decoded;
              if (tag === 2) {
                return new AlwaysAbstainDRep({});
              } else if (tag === 3) {
                return new AlwaysNoConfidenceDRep({});
              }
              return yield* ParseResult.fail(
                new ParseResult.Type(
                  Schema.typeSchema(DRep).ast,
                  decoded,
                  `Invalid DRep tag: ${tag}`,
                ),
              );
            } else if (Array.isArray(decoded) && decoded.length === 2) {
              // [0, keyhash] or [1, scripthash]
              const [tag, hashBytes] = decoded;
              if (tag === 0) {
                const keyHash = yield* ParseResult.decode(KeyHash.BytesSchema)(
                  hashBytes,
                );
                return new KeyHashDRep({ keyHash });
              } else if (tag === 1) {
                const scriptHash = yield* ParseResult.decode(
                  ScriptHash.BytesSchema,
                )(hashBytes);
                return new ScriptHashDRep({ scriptHash });
              }
              return yield* ParseResult.fail(
                new ParseResult.Type(
                  Schema.typeSchema(DRep).ast,
                  decoded,
                  `Invalid DRep tag: ${tag}`,
                ),
              );
            }
            return yield* ParseResult.fail(
              new ParseResult.Type(
                Schema.typeSchema(DRep).ast,
                decoded,
                `Invalid DRep structure`,
              ),
            );
          }),
        ),
      ),
  },
);

/**
 * CBOR hex transformation schema for DRep.
 *
 * @since 2.0.0
 * @category schemas
 */
export const CBORHexSchema = Schema.transformOrFail(
  Schema.String.annotations({
    identifier: "CBORHex",
  }),
  DRep,
  {
    strict: true,
    encode: (_, __, ___, toA) => {
      switch (toA._tag) {
        case "KeyHashDRep":
          return ParseResult.succeed(
            CBOR.Encode().hex([0, Bytes.Decode.hex(toA.keyHash.hash)]),
          );
        case "ScriptHashDRep":
          return ParseResult.succeed(
            CBOR.Encode().hex([1, Bytes.Decode.hex(toA.scriptHash.hash)]),
          );
        case "AlwaysAbstainDRep":
          return ParseResult.succeed(CBOR.Encode().hex([2]));
        case "AlwaysNoConfidenceDRep":
          return ParseResult.succeed(CBOR.Encode().hex([3]));
      }
    },
    decode: (_, __, ___, fromA) =>
      pipe(
        ParseResult.decode(CBOR.makeCBORHexSchema(DRepCDDLSchema))(fromA),
        Effect.flatMap((decoded) =>
          Effect.gen(function* () {
            if (Array.isArray(decoded) && decoded.length === 1) {
              // [2] or [3]
              const [tag] = decoded;
              if (tag === 2) {
                return new AlwaysAbstainDRep({});
              } else if (tag === 3) {
                return new AlwaysNoConfidenceDRep({});
              }
              return yield* ParseResult.fail(
                new ParseResult.Type(
                  Schema.typeSchema(DRep).ast,
                  decoded,
                  `Invalid DRep tag: ${tag}`,
                ),
              );
            } else if (Array.isArray(decoded) && decoded.length === 2) {
              // [0, keyhash] or [1, scripthash]
              const [tag, hashBytes] = decoded;
              if (tag === 0) {
                const keyHash = yield* ParseResult.decode(KeyHash.BytesSchema)(
                  hashBytes,
                );
                return new KeyHashDRep({ keyHash });
              } else if (tag === 1) {
                const scriptHash = yield* ParseResult.decode(
                  ScriptHash.BytesSchema,
                )(hashBytes);
                return new ScriptHashDRep({ scriptHash });
              }
              return yield* ParseResult.fail(
                new ParseResult.Type(
                  Schema.typeSchema(DRep).ast,
                  decoded,
                  `Invalid DRep tag: ${tag}`,
                ),
              );
            }
            return yield* ParseResult.fail(
              new ParseResult.Type(
                Schema.typeSchema(DRep).ast,
                decoded,
                `Invalid DRep structure`,
              ),
            );
          }),
        ),
      ),
  },
);

/**
 * Synchronous encoding utilities.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const Encode = {
  cborBytes: Schema.encodeSync(CBORBytesSchema),
  cborHex: Schema.encodeSync(CBORHexSchema),
};

/**
 * Synchronous decoding utilities.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const Decode = {
  cborBytes: Schema.decodeUnknownSync(CBORBytesSchema),
  cborHex: Schema.decodeUnknownSync(CBORHexSchema),
};

/**
 * Either encoding utilities.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const EncodeEither = {
  cborBytes: Schema.encodeEither(CBORBytesSchema),
  cborHex: Schema.encodeEither(CBORHexSchema),
};

/**
 * Either decoding utilities.
 *
 * @since 2.0.0
 * @category encoding/decoding
 */
export const DecodeEither = {
  cborBytes: Schema.decodeUnknownEither(CBORBytesSchema),
  cborHex: Schema.decodeUnknownEither(CBORHexSchema),
};

/**
 * Pattern match on a DRep to handle different DRep types.
 *
 * @example
 * import { DRep, KeyHash } from "@lucid-evolution/experimental";
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
 * import { DRep, KeyHash } from "@lucid-evolution/experimental";
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
 * import { DRep, ScriptHash } from "@lucid-evolution/experimental";
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
 * import { DRep } from "@lucid-evolution/experimental";
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
 * import { DRep } from "@lucid-evolution/experimental";
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
 * FastCheck generator for DRep instances.
 *
 * @since 2.0.0
 * @category generators
 */
export const generator = FastCheck.oneof(
  FastCheck.record({
    keyHash: KeyHash.generator,
  }).map((props) => new KeyHashDRep(props)),
  FastCheck.record({
    scriptHash: ScriptHash.generator,
  }).map((props) => new ScriptHashDRep(props)),
  FastCheck.record({}).map(() => new AlwaysAbstainDRep({})),
  FastCheck.record({}).map(() => new AlwaysNoConfidenceDRep({})),
);

/**
 * Check if two DRep instances are equal.
 *
 * @example
 * import { DRep, KeyHash } from "@lucid-evolution/experimental";
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
