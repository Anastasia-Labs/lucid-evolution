import { Schema, SchemaAST } from "effect";
import { NonEmptyReadonlyArray, ReadonlyArray } from "effect/Array";
import * as Data from "./Data.js";
import { ParseIssue } from "effect/ParseResult";

export { ByteArray } from "./Data.js";

export { Integer } from "./Data.js";
/**
 * Schema transformations between TypeScript types and Plutus Data
 *
 * This module provides bidirectional transformations:
 * 1. TypeScript types => Plutus Data type => CBOR hex
 * 2. CBOR hex => Plutus Data type => TypeScript types
 *
 * @since 1.0.0
 */

interface Literal<
  Literals extends NonEmptyReadonlyArray<SchemaAST.LiteralValue>,
> extends Schema.transform<typeof Data.Constr, Schema.Literal<[...Literals]>> {}

/**
 * Creates a schema for literal types with Plutus Data Constructor transformation
 *
 * @example
 * import { TSchema } from "@lucid-evolution/experimental";
 *
 * const RedeemAction = TSchema.Literal("spend", "mint", "withdraw");
 * const encoded = TSchema.unsafeEncode(RedeemAction, "spend"); // { index: 0n, fields: [] }
 * const decoded = TSchema.unsafeDecode(RedeemAction, encoded); // "spend"
 *
 * @since 1.0.0
 */
export const Literal = <
  Literals extends NonEmptyReadonlyArray<
    Exclude<SchemaAST.LiteralValue, null | bigint>
  >,
>(
  ...self: Literals
): Literal<Literals> =>
  Schema.transform(Data.Constr, Schema.Literal(...self), {
    strict: true,
    encode: (value: [...Literals][number]) => ({
      index: BigInt(self.indexOf(value)),
      fields: [],
    }),
    decode: (value: {
      readonly index: bigint;
      readonly fields: readonly any[];
    }) => self[Number(value.index)],
  });

interface Array<S extends Schema.Schema.Any> extends Schema.Array$<S> {}

/**
 * Creates a schema for arrays with Plutus list type annotation
 *
 * @example
 * import { TSchema } from "@lucid-evolution/experimental";
 *
 * const TokenList = TSchema.Array(TSchema.ByteArray);
 * const result = TSchema.unsafeDecode(TokenList, ["deadbeef", "cafe"]);
 *
 * @since 1.0.0
 */
export const Array = <S extends Schema.Schema.Any>(items: S) =>
  // Schema.Array(items).annotations({ identifier: "Array" });
  Schema.transform(Data.List, Schema.Array(items), {
    strict: false,
    encode: (value) => value,
    decode: (value) => value,
  });

export const Map = <K extends Schema.Schema.Any, V extends Schema.Schema.Any>(
  key: K,
  value: V
) =>
  Schema.transform(Data.Map, Schema.Map({ key, value }), {
    strict: false,
    encode: (entries) => {
      const map = new globalThis.Map();
      for (const [key, value] of entries) {
        map.set(key, value);
      }
      return map;
    },
    decode: (value) => {
      const array = globalThis.Array.from(value.entries());
      return array;
    },
  });
// .annotations({
//   message: (issue: ParseIssue) => {
//     return {
//       message: `Expected Map but got ${renderParseIssueAsString(issue)}.`,
//       override: true,
//     };
//   },
// });
const replacer = (_: string, value: any) => {
  if (typeof value === "bigint") {
    return value.toString() + "n";
  }
  return value;
};

const renderParseIssueAsString = ({ actual }: ParseIssue): string => {
  console.log("actual", actual);
  if (actual instanceof globalThis.Map) {
    const map = actual as Map<unknown, unknown>;
    return `Map(${map.size}) {${globalThis.Array.from(map.entries())
      .map(([key, value]) => ` '${key}' => ${JSON.stringify(value, replacer)}`)
      .join(",")} }`;
  }

  return JSON.stringify(actual);
};

interface Nullable<S extends Schema.Schema.All>
  extends Schema.transform<typeof Data.Constr, Schema.NullOr<S>> {}

/**
 * Creates a schema for nullable types that transforms to/from Plutus Data Constructor
 * Represents optional values as:
 * - Just(value) with index 0
 * - Nothing with index 1
 *
 * @example
 * import { TSchema } from "@lucid-evolution/experimental";
 *
 * const MaybeDeadline = TSchema.Nullable(TSchema.Integer);
 * const just = TSchema.unsafeEncode(MaybeDeadline, 1000n); // { index: 0n, fields: [1000n] }
 * const nothing = TSchema.unsafeEncode(MaybeDeadline, null); // { index: 1n, fields: [] }
 *
 * @since 1.0.0
 */
export const Nullable = <S extends Schema.Schema.All>(self: S): Nullable<S> =>
  Schema.transform(Data.Constr, Schema.NullOr(self), {
    strict: true,
    encode: (value) =>
      value ? { index: 0n, fields: [value] } : { index: 1n, fields: [] },
    decode: (value) =>
      value.index === 0n ? (value.fields[0] as Schema.Schema.Type<S>) : null,
  });

interface Boolean
  extends Schema.transform<
    typeof Data.Constr,
    Schema.SchemaClass<boolean, boolean, never>
  > {}

/**
 * Schema for boolean values using Plutus Data Constructor
 * - False with index 0
 * - True with index 1
 *
 * @example
 * import { TSchema } from "@lucid-evolution/experimental";
 *
 * const isLocked = TSchema.unsafeEncode(TSchema.Boolean, true); // { index: 1n, fields: [] }
 * const decoded = TSchema.unsafeDecode(TSchema.Boolean, isLocked); // true
 *
 * @since 1.0.0
 */
export const Boolean: Boolean = Schema.transform(
  Data.Constr.annotations({
    message: () =>
      // `please provide a constructor with index 0 or 1 and no fields`,
      ({
        message: `please provide a constructor with index 0 or 1 and no fields`,
        override: true,
      }),
  }),
  Schema.Boolean.annotations({
    message: () => `please provider a boolean value`,
    override: true,
  }),
  {
    strict: true,
    encode: (boolean) =>
      boolean ? { index: 1n, fields: [] } : { index: 0n, fields: [] },
    decode: ({ index }) => index === 1n,
  }
);

interface Struct<Fields extends Schema.Struct.Fields>
  extends Schema.transform<typeof Data.Constr, Schema.Struct<Fields>> {}

/**
 * Creates a schema for struct types using Plutus Data Constructor
 * Objects are represented as a constructor with index 0 and fields as an array
 *
 * @example
 * import { TSchema } from "@lucid-evolution/experimental";
 *
 * const Token = TSchema.Struct({
 *   policyId: TSchema.ByteArray,
 *   assetName: TSchema.ByteArray,
 *   amount: TSchema.Integer
 * });
 *
 * const encoded = TSchema.unsafeEncode(Token, {
 *   policyId: "deadbeef",
 *   assetName: "cafe",
 *   amount: 1000n
 * }); // { index: 0n, fields: ["deadbeef", "cafe", 1000n] }
 *
 * @since 1.0.0
 */
export const Struct = <Fields extends Schema.Struct.Fields>(
  fields: Fields
): Struct<Fields> =>
  Schema.transform(Data.Constr, Schema.Struct(fields), {
    strict: false,
    encode: (obj) => ({
      index: 0n,
      fields: Object.values(obj),
    }),
    decode: (constr: {
      readonly index: bigint;
      readonly fields: readonly any[];
    }) => {
      const keys = Object.keys(fields);
      return Object.fromEntries(
        keys.map((key, index) => [key, constr.fields[index]])
      );
    },
  });

interface Union<Members extends ReadonlyArray<Schema.Schema.Any>>
  extends Schema.transform<
    typeof Data.Constr,
    Schema.Schema<
      Schema.Schema.Type<[...Members][number]>,
      Schema.Schema.Encoded<[...Members][number]>,
      Schema.Schema.Context<[...Members][number]>
    >
  > {}

export const Union = <Members extends ReadonlyArray<Schema.Schema.Any>>(
  ...members: Members
): Union<Members> =>
  Schema.transform(Data.Constr, Schema.Union(...members), {
    strict: false,
    encode: (value, toA) => {
      const index = BigInt(
        members.findIndex((schema) => Schema.is(schema)(toA))
      );
      // Wrap value in an array if not already an array to handle multiple fields
      const fields = globalThis.Array.isArray(value) ? value : [value];
      return { index, fields };
    },
    decode: (value: {
      readonly index: bigint;
      readonly fields: readonly Data.Data[];
    }) => {
      // Return array if multiple fields, single value otherwise
      return value.fields.length === 1 ? value.fields[0] : value.fields;
    },
  });

export const Tuple = <Elements extends Schema.TupleType.Elements>(
  element: [...Elements]
) =>
  Schema.transform(Data.List, Schema.Tuple(...element), {
    strict: false,
    encode: (value) => value,
    decode: (value) => value,
  });
