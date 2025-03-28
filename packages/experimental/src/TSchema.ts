import { ParseResult, Schema, SchemaAST } from "effect";
import { NonEmptyReadonlyArray } from "effect/Array";
import * as DataTagged from "./Data.js";
import * as Combinator from "./Combinator.js";

/**
 * Schema transformations between TypeScript types and Plutus Data
 *
 * This module provides bidirectional transformations:
 * 1. TypeScript types => Plutus Data type => CBOR hex
 * 2. CBOR hex => Plutus Data type => TypeScript types
 *
 * @since 1.0.0
 */

interface ByteArray
  extends Schema.transform<
    typeof DataTagged.ByteArray,
    Schema.Schema<string, string>
  > {}

export const ByteArray: ByteArray = Schema.transform(
  DataTagged.ByteArray,
  Schema.String.pipe(Combinator.HexString),
  {
    strict: true,
    encode: (value) => DataTagged.ByteArray.make({ value: value }),
    decode: (value) => value.value,
  },
);

interface Integer
  extends Schema.transform<
    typeof DataTagged.Integer,
    typeof Schema.BigIntFromSelf
  > {}

export const Integer: Integer = Schema.transform(
  DataTagged.Integer,
  Schema.BigIntFromSelf.annotations({
    identifier: "Integer",
  }),
  {
    strict: true,
    encode: (value) => DataTagged.Integer.make({ value }),
    decode: ({ value }) => value,
  },
);

interface Literal<
  Literals extends NonEmptyReadonlyArray<SchemaAST.LiteralValue>,
> extends Schema.transform<
    typeof DataTagged.Constr,
    Schema.Literal<[...Literals]>
  > {}

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
  Schema.transform(
    DataTagged.Constr.annotations({
      identifier: "Data.Constr",
    }),
    Schema.Literal(...self).annotations({
      identifier: "Literal",
    }),
    {
      strict: true,
      encode: (value) =>
        DataTagged.Constr.make({
          index: BigInt(self.indexOf(value)),
          fields: [],
        }),
      decode: (value) => self[Number(value.index)],
    },
  );

interface OneLiteral<
  Single extends Exclude<SchemaAST.LiteralValue, null | bigint>,
> extends Schema.transform<
    typeof DataTagged.Constr,
    Schema.Literal<[Single]>
  > {}

export const OneLiteral = <
  Single extends Exclude<SchemaAST.LiteralValue, null | bigint>,
>(
  self: Single,
): OneLiteral<Single> =>
  Schema.transform(
    DataTagged.Constr.annotations({
      identifier: "Data.Constr",
    }),
    Schema.Literal(self).annotations({
      identifier: "Literal",
    }),
    {
      strict: true,
      encode: (value) =>
        DataTagged.Constr.make({
          index: 0n,
          fields: [],
        }),
      decode: (value) => self,
    },
  );

interface Array<S extends Schema.Schema.Any>
  extends Schema.transform<typeof DataTagged.List, Schema.Array$<S>> {}

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
export const Array = <S extends Schema.Schema.Any>(items: S): Array<S> =>
  Schema.transform(
    DataTagged.List.annotations({ identifier: "Data.List" }),
    Schema.Array(items).annotations({ identifier: "Array" }),
    {
      strict: false,
      encode: (value) => DataTagged.List.make({ value }),
      decode: ({ value }) => value,
    },
  );

interface Map<K extends Schema.Schema.Any, V extends Schema.Schema.Any>
  extends Schema.transform<typeof DataTagged.Map, Schema.Map$<K, V>> {}

export const Map = <K extends Schema.Schema.Any, V extends Schema.Schema.Any>(
  key: K,
  value: V,
): Map<K, V> =>
  Schema.transform(
    DataTagged.Map.annotations({
      identifier: "Data.Map",
    }),
    Schema.Map({ key, value }).annotations({
      identifier: "Map",
    }),
    {
      strict: false,
      encode: (entries) => {
        return DataTagged.Map.make({
          value: entries.map(([key, value]) => [key, value] as const),
        });
      },
      decode: ({ value: entries }) => {
        return entries;
      },
    },
  );

interface Nullable<S extends Schema.Schema.All>
  extends Schema.transform<typeof DataTagged.Constr, Schema.NullOr<S>> {}

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
export const NullOr = <S extends Schema.Schema.All>(self: S): Nullable<S> =>
  Schema.transform(
    DataTagged.Constr.annotations({
      identifier: "Data.Constr",
    }),
    Schema.NullOr(self),
    {
      strict: true,
      encode: (value) =>
        value === null
          ? DataTagged.Constr.make({ index: 1n, fields: [] })
          : DataTagged.Constr.make({
              index: 0n,
              fields: [value],
            }),
      decode: (value) =>
        value.index === 1n ? null : (value.fields[0] as Schema.Schema.Type<S>),
    },
  );

interface Undefined<S extends Schema.Schema.Any>
  extends Schema.transform<typeof DataTagged.Constr, Schema.UndefinedOr<S>> {}

export const UndefinedOr = <S extends Schema.Schema.Any>(
  self: S,
): Undefined<S> =>
  Schema.transform(DataTagged.Constr, Schema.UndefinedOr(self), {
    strict: true,
    encode: (value) =>
      value === undefined
        ? DataTagged.Constr.make({ index: 1n, fields: [] })
        : DataTagged.Constr.make({
            index: 0n,
            fields: [value],
          }),
    decode: (value) =>
      value.index === 1n
        ? undefined
        : (value.fields[0] as Schema.Schema.Type<S>),
  });

interface Boolean
  extends Schema.transform<
    typeof DataTagged.Constr,
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
export const Boolean: Boolean = Schema.transformOrFail(
  DataTagged.Constr,
  Schema.Boolean,
  {
    strict: true,
    encode: (boolean) =>
      boolean
        ? ParseResult.succeed(DataTagged.Constr.make({ index: 1n, fields: [] }))
        : ParseResult.succeed(
            DataTagged.Constr.make({ index: 0n, fields: [] }),
          ),
    decode: ({ index, fields }, _, ast) => {
      if (index !== 0n && index !== 1n) {
        return ParseResult.fail(
          new ParseResult.Type(
            ast,
            { index, fields },
            `Expected constructor index to be 0 or 1, got ${index}`,
          ),
        );
      }
      if (fields.length !== 0) {
        return ParseResult.fail(
          new ParseResult.Type(
            ast,
            { index, fields },
            "Expected a constructor with no fields",
          ),
        );
      }
      return ParseResult.succeed(index === 1n);
    },
  },
);

interface Struct<Fields extends Schema.Struct.Fields>
  extends Schema.transform<typeof DataTagged.Constr, Schema.Struct<Fields>> {}

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
  fields: Fields,
): Struct<Fields> =>
  Schema.transform(
    DataTagged.Constr.annotations({
      identifier: "Data.Constr",
    }),
    Schema.Struct(fields).annotations({
      identifier: "Struct",
    }),
    {
      strict: false,
      encode: (obj) =>
        DataTagged.Constr.make({
          index: 0n,
          fields: Object.values(obj),
        }),
      decode: (constr: {
        readonly index: bigint;
        readonly fields: readonly any[];
      }) => {
        const keys = Object.keys(fields);
        return Object.fromEntries(
          keys.map((key, index) => [key, constr.fields[index]]),
        );
      },
    },
  );

interface Union<Members extends ReadonlyArray<Schema.Schema.Any>>
  extends Schema.transformOrFail<
    typeof DataTagged.Constr,
    Schema.SchemaClass<
      Schema.Schema.Type<[...Members][number]>,
      Schema.Schema.Type<[...Members][number]>,
      never
    >,
    never
  > {}

export const Union = <Members extends ReadonlyArray<Schema.Schema.Any>>(
  ...members: Members
): Union<Members> => {
  return Schema.transformOrFail(
    DataTagged.Constr,
    Schema.typeSchema(Schema.Union(...members)),
    {
      strict: false,
      encode: (value, _, ast, toA) => {
        const index = members.findIndex((schema) => Schema.is(schema)(toA));
        return ParseResult.encode(
          members[index] as Schema.Schema<any, any, never>,
        )(value).pipe(
          ParseResult.map((value) => {
            const fields = [value];
            return {
              _tag: "Constr",
              index: BigInt(index),
              fields,
            };
          }),
        );
      },
      decode: (value, _, ast) => {
        const memberIndex = Number(value.index);
        // Check if index is valid for the members array
        if (memberIndex < 0 || memberIndex >= members.length) {
          return ParseResult.fail(
            new ParseResult.Type(
              ast,
              value,
              `Invalid union index: ${memberIndex}. Expected index between 0 and ${
                members.length - 1
              }`,
            ),
          );
        }
        // Get the member schema for this index
        const member = members[memberIndex] as Schema.Schema<any, any, never>;
        return ParseResult.decode(member)(value.fields[0]);
      },
    },
  );
};

interface Tuple<Elements extends Schema.TupleType.Elements>
  extends Schema.transform<typeof DataTagged.List, Schema.Tuple<Elements>> {}

export const Tuple = <Elements extends Schema.TupleType.Elements>(
  element: [...Elements],
): Tuple<Elements> =>
  Schema.transform(
    DataTagged.List.annotations({
      identifier: "Data.List",
    }),
    Schema.Tuple(...element).annotations({
      identifier: "Tuple",
    }),
    {
      strict: false,
      encode: (value) => DataTagged.List.make({ value }),
      decode: ({ value }) => value,
    },
  );

export const compose = Schema.compose;
export const filter = Schema.filter;
