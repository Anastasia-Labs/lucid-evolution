import { ParseResult, Schema, SchemaAST } from "effect";
import { NonEmptyReadonlyArray } from "effect/Array";
import * as Data from "./Data.js";
import * as Combinator from "./Combinator.js";

/**
 * Schema transformations between TypeScript types and Plutus Data
 *
 * This module provides bidirectional transformations:
 * 1. TypeScript types => Plutus Data type => CBOR hex
 * 2. CBOR hex => Plutus Data type => TypeScript types
 */

interface ByteArray
  extends Schema.transform<
    typeof Data.ByteArray,
    Schema.Schema<string, string>
  > {}

/**
 * Creates a schema for byte arrays using Plutus Data ByteArray transformation
 * The byte array is represented as a hex string
 *
 * @example
 * import { TSchema , Data } from "@lucid-evolution/experimental";
 *
 * const Token = TSchema.ByteArray;
 * const encoded = Data.encodeDataUnsafe(Token, "deadbeef"); // { _tag : "ByteArray", bytes: "deadbeef" }
 * const decoded = Data.decodeDataUnsafe(Token, encoded); // "deadbeef"
 *
 * @since 2.0.0
 */
export const ByteArray: ByteArray = Schema.transform(
  Data.ByteArray,
  Schema.String.pipe(Combinator.HexStringFilter),
  {
    strict: true,
    encode: (value) => Data.mkByte(value),
    decode: (value) => value.bytearray,
  },
);

interface Integer
  extends Schema.transform<typeof Data.Integer, typeof Schema.BigIntFromSelf> {}

/**
 * Creates a schema for integers using Plutus Data Integer transformation
 * The integer is represented as a BigInt
 *
 * @example
 * import { TSchema } from "@lucid-evolution/experimental";
 *
 * const Token = TSchema.Integer;
 * const encoded = Data.encodeDataUnsafe(Token, 1000n); // { _tag : "Integer", integer: 1000n }
 * const decoded = Data.decodeDataUnsafe(Token, encoded); // 1000n
 *
 * @since 2.0.0
 */
export const Integer: Integer = Schema.transform(
  Data.Integer,
  Schema.BigIntFromSelf.annotations({
    identifier: "Integer",
  }),
  {
    strict: true,
    encode: (value) => Data.mkInt(value),
    decode: (value) => value.integer,
  },
);

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
 * const encoded = Data.encodeDataUnsafe(RedeemAction, "spend"); // { index: 0n, fields: [] }
 * const decoded = Data.decodeDataUnsafe(RedeemAction, encoded); // "spend"
 *
 * @since 2.0.0
 */
export const Literal = <
  Literals extends NonEmptyReadonlyArray<
    Exclude<SchemaAST.LiteralValue, null | bigint>
  >,
>(
  ...self: Literals
): Literal<Literals> =>
  Schema.transform(
    Data.Constr.annotations({
      identifier: "Data.Constr",
    }),
    Schema.Literal(...self).annotations({
      identifier: "Literal",
    }),
    {
      strict: true,
      encode: (value) => Data.mkConstr(BigInt(self.indexOf(value)), []),
      decode: (value) => self[Number(value.index)],
    },
  );

interface OneLiteral<
  Single extends Exclude<SchemaAST.LiteralValue, null | bigint>,
> extends Schema.transform<typeof Data.Constr, Schema.Literal<[Single]>> {}

export const OneLiteral = <
  Single extends Exclude<SchemaAST.LiteralValue, null | bigint>,
>(
  self: Single,
): OneLiteral<Single> =>
  Schema.transform(
    Data.Constr.annotations({
      identifier: "Data.Constr",
    }),
    Schema.Literal(self).annotations({
      identifier: "Literal",
    }),
    {
      strict: true,
      encode: (value) => Data.mkConstr(0n, []),
      decode: (value) => self,
    },
  );

interface Array<S extends Schema.Schema.Any>
  extends Schema.transform<typeof Data.List, Schema.Array$<S>> {}

/**
 * Creates a schema for arrays with Plutus list type annotation
 *
 * @example
 * import { TSchema } from "@lucid-evolution/experimental";
 *
 * const TokenList = TSchema.Array(TSchema.ByteArray);
 * const result = Data.encodeDataUnsafe(TokenList, ["deadbeef", "cafe"]); // { _tag : "List", list: ["deadbeef", "cafe"] }
 *
 * @since 1.0.0
 */
export const Array = <S extends Schema.Schema.Any>(items: S): Array<S> =>
  Schema.transform(
    Data.List.annotations({ identifier: "Data.List" }),
    Schema.Array(items).annotations({ identifier: "Array" }),
    {
      strict: false,
      encode: (value) => Data.mkList(value),
      decode: (value) => value.list,
    },
  );

interface Map<K extends Schema.Schema.Any, V extends Schema.Schema.Any>
  extends Schema.transform<typeof Data.Map, Schema.Map$<K, V>> {}

/**
 * Creates a schema for maps with Plutus Map type annotation
 * Maps are represented as a constructor with index 0 and fields as an array of key-value pairs
 *
 * @example
 * import { TSchema } from "@lucid-evolution/experimental";
 *
 *  const TokenMap = TSchema.Map(TSchema.ByteArray, TSchema.Integer);
 *  const input = new Map([
 *    ["deadbeef", 1n],
 *    ["cafe", 2n],
 *  ]);
 *
 *  const encoded = Data.unsafeEncodeData(input, TokenMap); // { _tag: "Map", map: [{ k: "deadbeef", v: 1n }, { k: "cafe", v: 2n }] }
 *
 * @since 2.0.0
 */
export const Map = <K extends Schema.Schema.Any, V extends Schema.Schema.Any>(
  key: K,
  value: V,
): Map<K, V> =>
  Schema.transform(
    Data.Map.annotations({
      identifier: "Data.Map",
    }),
    Schema.Map({ key, value }).annotations({
      identifier: "Map",
    }),
    {
      strict: true,
      encode: (entries) => {
        return Data.mkMap(entries.map(([k, v]) => ({ k, v })));
      },
      decode: (value) => {
        return value.entries.map((entry) => [entry.k, entry.v]) as [
          Schema.Schema.Type<K>,
          Schema.Schema.Type<V>,
        ];
      },
    },
  );

interface NullOr<S extends Schema.Schema.All>
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
 * const MaybeDeadline = TSchema.NullOr(TSchema.Integer);
 * const just = Data.encodeDataUnsafe(MaybeDeadline, 1000n); // { index: 0n, fields: [1000n] }
 * const nothing = Data.encodeDataUnsafe(MaybeDeadline, null); // { index: 1n, fields: [] }
 *
 * @since 2.0.0
 */
export const NullOr = <S extends Schema.Schema.All>(self: S): NullOr<S> =>
  Schema.transform(
    Data.Constr.annotations({
      identifier: "Data.Constr",
    }),
    Schema.NullOr(self),
    {
      strict: true,
      encode: (value) =>
        value === null ? Data.mkConstr(1n, []) : Data.mkConstr(0n, [value]),
      decode: (value) =>
        value.index === 1n ? null : (value.fields[0] as Schema.Schema.Type<S>),
    },
  );

interface UndefineOr<S extends Schema.Schema.Any>
  extends Schema.transform<typeof Data.Constr, Schema.UndefinedOr<S>> {}

/**
 * Creates a schema for undefined types that transforms to/from Plutus Data Constructor
 * Represents optional values as:
 * - Just(value) with index 0
 * - Nothing with index 1
 *
 * @example
 * import { TSchema } from "@lucid-evolution/experimental";
 *
 * const MaybeDeadline = TSchema.UndefinedOr(TSchema.Integer);
 * const just = Data.encodeDataUnsafe(MaybeDeadline, 1000n); // { index: 0n, fields: [1000n] }
 * const nothing = Data.encodeDataUnsafe(MaybeDeadline, undefined); // { index: 1n, fields: [] }
 *
 * @since 2.0.0
 */
export const UndefinedOr = <S extends Schema.Schema.Any>(
  self: S,
): UndefineOr<S> =>
  Schema.transform(Data.Constr, Schema.UndefinedOr(self), {
    strict: true,
    encode: (value) =>
      value === undefined ? Data.mkConstr(1n, []) : Data.mkConstr(0n, [value]),
    decode: (value) =>
      value.index === 1n
        ? undefined
        : (value.fields[0] as Schema.Schema.Type<S>),
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
 * const isLocked = Data.encodeDataUnsafe(TSchema.Boolean, true); // { index: 1n, fields: [] }
 * const decoded = Data.decodeDataUnsafe(TSchema.Boolean, isLocked); // true
 *
 * @since 2.0.0
 */
export const Boolean: Boolean = Schema.transformOrFail(
  Data.Constr,
  Schema.Boolean,
  {
    strict: true,
    encode: (boolean) =>
      boolean
        ? ParseResult.succeed(Data.mkConstr(1n, []))
        : ParseResult.succeed(Data.mkConstr(0n, [])),
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
 * const encoded = Data.encodeDataUnsafe(Token, {
 *   policyId: "deadbeef",
 *   assetName: "cafe",
 *   amount: 1000n
 * }); // { index: 0n, fields: ["deadbeef", "cafe", 1000n] }
 *
 * @since 2.0.0
 */
export const Struct = <Fields extends Schema.Struct.Fields>(
  fields: Fields,
): Struct<Fields> =>
  Schema.transform(
    Data.Constr.annotations({
      identifier: "Data.Constr",
    }),
    Schema.Struct(fields).annotations({
      identifier: "Struct",
    }),
    {
      strict: false,
      encode: (obj) =>
        Data.mkConstr(0n, Object.values(obj) as readonly Data.Data[]),
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
    typeof Data.Constr,
    Schema.SchemaClass<
      Schema.Schema.Type<[...Members][number]>,
      Schema.Schema.Type<[...Members][number]>,
      never
    >,
    never
  > {}

/**
 * Creates a schema for union types using Plutus Data Constructor
 * Unions are represented as a constructor with index 0 and fields as an array
 *
 * @example
 * import { TSchema } from "@lucid-evolution/experimental";
 *
 * const MintRedeem = TSchema.Struct({
 *   policyId: TSchema.ByteArray,
 *   assetName: TSchema.ByteArray,
 *   amount: TSchema.Integer,
 * });
 * const SpendRedeem = TSchema.Struct({
 *   address: TSchema.ByteArray,
 *   amount: TSchema.Integer,
 * });
 *
 * const RedeemAction = TSchema.Union(MintRedeem, SpendRedeem);
 *
 * const mintInput = {
 *   policyId: "deadbeef",
 *   assetName: "cafe",
 *   amount: 1000n,
 * };
 * const mintEncoded = Data.unsafeEncodeData(mintInput, RedeemAction); // { index: 0n, fields: ["deadbeef", "cafe", 1000n] }
 * const mintDecoded = Data.unsafeDecodeData(mintEncoded, RedeemAction); // { policyId: "deadbeef", assetName: "cafe", amount: 1000n }
 *
 * @since 2.0.0
 */
export const Union = <Members extends ReadonlyArray<Schema.Schema.Any>>(
  ...members: Members
): Union<Members> => {
  return Schema.transformOrFail(
    Data.Constr,
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
            return Data.mkConstr(BigInt(index), fields);
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
  extends Schema.transform<typeof Data.List, Schema.Tuple<Elements>> {}
/**
 * Creates a schema for tuple types using Plutus Data List transformation
 * Tuples are represented as a constructor with index 0 and fields as an array
 *
 * @example
 * import { TSchema } from "@lucid-evolution/experimental";
 *
 * const Token = TSchema.Tuple(
 *   TSchema.ByteArray,
 *   TSchema.Integer,
 *   TSchema.Boolean
 * );
 * const encoded = Data.encodeDataUnsafe(Token, [
 *   "deadbeef",
 *   1000n,
 *   true,
 * ]); // { index: 0n, fields: ["deadbeef", 1000n, true] }
 * const decoded = Data.decodeDataUnsafe(Token, encoded); // ["deadbeef", 1000n, true]
 *
 * @since 2.0.0
 */
export const Tuple = <Elements extends Schema.TupleType.Elements>(
  element: [...Elements],
): Tuple<Elements> =>
  Schema.transform(
    Data.List.annotations({
      identifier: "Data.List",
    }),
    Schema.Tuple(...element).annotations({
      identifier: "Tuple",
    }),
    {
      strict: false,
      encode: (value) => Data.mkList(value),
      decode: (value) => value.list,
    },
  );

export const compose = Schema.compose;

export const filter = Schema.filter;
