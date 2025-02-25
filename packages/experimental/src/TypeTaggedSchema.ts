import { ParseResult, Schema, SchemaAST } from "effect";
import { NonEmptyReadonlyArray } from "effect/Array";
import * as DataTagged from "./DataTagged.js";
import { ParseIssue } from "effect/ParseResult";
import * as Data from "./Data.js";

interface ByteArray
  extends Schema.transform<typeof DataTagged.ByteArray, typeof Schema.String> {}

export const ByteArray: ByteArray = Schema.transform(
  DataTagged.ByteArray,
  Schema.String,
  {
    strict: true,
    encode: (value) => DataTagged.ByteArray.make({ bytearray: value }),
    decode: (value) => value.bytearray,
  }
).annotations({
  identifier: "ByteArray",
  message: (issue) => ({
    message: `I need a valid ByteArray, but got ${Data.renderNestedParseIssue(issue, 5)} instead`,
    override: true,
  }),
});

interface Integer
  extends Schema.transform<
    typeof DataTagged.Integer,
    typeof Schema.BigIntFromSelf
  > {}

export const Integer: Integer = Schema.transform(
  DataTagged.Integer,
  Schema.BigIntFromSelf,
  {
    strict: true,
    encode: (value) => DataTagged.Integer.make({ integer: value }),
    decode: (value) => value.integer,
  }
).annotations({
  identifier: "Integer",
});

/**
 * Schema transformations between TypeScript types and Plutus Data
 *
 * This module provides bidirectional transformations:
 * 1. TypeScript types => Plutus Data type => CBOR hex
 * 2. CBOR hex => Plutus Data type => TypeScript types
 *
 * @since 1.0.0
 */

// interface
// Literal<
//   Literals extends NonEmptyReadonlyArray<SchemaAST.LiteralValue>,
// >
// extends Schema.transform<
//     typeof DataTagged.Constr,
//     Schema.Literal<[...Literals]>
//   > {}

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
    }
  );

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
  Schema.transform(
    DataTagged.List.annotations({ identifier: "Data.List" }),
    Schema.Array(items).annotations({ identifier: "Array" }),
    {
      strict: false,
      encode: (value) => DataTagged.List.make({ list: value }),
      decode: (value) => value.list,
    }
  );

interface Map<K extends Schema.Schema.Any, V extends Schema.Schema.Any>
  extends Schema.transform<typeof DataTagged.Map, Schema.Map$<K, V>> {}

export const Map = <K extends Schema.Schema.Any, V extends Schema.Schema.Any>(
  key: K,
  value: V
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
        const map = new globalThis.Map();
        for (const [key, value] of entries) {
          map.set(key, value);
        }
        return DataTagged.Map.make({ map });
      },
      decode: (value) => {
        const array = globalThis.Array.from(value.map.entries());
        return array;
      },
    }
  );

const replacer = (_: string, value: any) => {
  if (typeof value === "bigint") {
    return value.toString() + "n";
  }
  return value;
};

const renderParseIssueAsString = ({ actual }: ParseIssue): string => {
  console.log("actual", actual);
  if (actual instanceof globalThis.Map) {
    const map = actual as globalThis.Map<unknown, unknown>;
    return `Map(${map.size}) {${globalThis.Array.from(map.entries())
      .map(([key, value]) => ` '${key}' => ${JSON.stringify(value, replacer)}`)
      .join(",")} }`;
  }

  return JSON.stringify(actual);
};

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
export const Nullable = <S extends Schema.Schema.All>(self: S): Nullable<S> =>
  Schema.transform(DataTagged.Constr, Schema.NullOr(self), {
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
  }).annotations({
    identifier: "Nullable",
    message: (issue) => ({
      message: `I need a null or ${self.ast.toString()} value, but got ${Data.renderNestedParseIssue(issue, 5)} instead`,
      override: true,
    }),
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
  DataTagged.Constr.annotations({
    identifier: "Data.Constr",
  }),
  Schema.Boolean.annotations({
    identifier: "Boolean",
  }),
  {
    strict: true,
    encode: (boolean) =>
      boolean
        ? ParseResult.succeed(DataTagged.Constr.make({ index: 1n, fields: [] }))
        : ParseResult.succeed(
            DataTagged.Constr.make({ index: 0n, fields: [] })
          ),
    decode: ({ index, fields }, _, ast) => {
      if (fields.length !== 0) {
        return ParseResult.fail(
          new ParseResult.Type(
            ast,
            { index, fields },
            "Expected a constructor with index 0 or 1 and no fields"
          )
        );
      }
      return ParseResult.succeed(index === 1n);
    },
  }
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
  fields: Fields
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
          keys.map((key, index) => [key, constr.fields[index]])
        );
      },
    }
  );

interface Union<Members extends ReadonlyArray<Schema.Schema.Any>>
  extends Schema.transform<
    typeof DataTagged.Constr,
    Schema.Schema<
      Schema.Schema.Type<[...Members][number]>,
      Schema.Schema.Encoded<[...Members][number]>,
      Schema.Schema.Context<[...Members][number]>
    >
  > {}

export const Union = <Members extends ReadonlyArray<Schema.Schema.Any>>(
  ...members: Members
): Union<Members> =>
  Schema.transform(DataTagged.Constr, Schema.Union(...members), {
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
      readonly fields: readonly DataTagged.Data[];
    }) => {
      // Return array if multiple fields, single value otherwise
      return value.fields.length === 1 ? value.fields[0] : value.fields;
    },
  });

export const Tuple = <Elements extends Schema.TupleType.Elements>(
  element: [...Elements]
) =>
  Schema.transform(
    DataTagged.List.annotations({
      identifier: "Data.List",
    }),
    Schema.Tuple(...element).annotations({
      identifier: "Tuple",
    }),
    {
      strict: false,
      encode: (value) => DataTagged.List.make({ list: value }),
      decode: (value) => value.list,
    }
  );
