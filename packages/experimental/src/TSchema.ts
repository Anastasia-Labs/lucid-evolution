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
 * import { TSchema , Data } from "@evolution-sdk/experimental";
 * import assert from "assert";
 *
 * const Token = TSchema.ByteArray;
 * type TokenType = typeof Token.Type; // string
 *
 * const encoded = Data.encodeDataOrThrow("deadbeef", Token);
 * assert(encoded._tag === "ByteArray");
 * assert(encoded.bytearray === "deadbeef");
 *
 * const decoded = Data.decodeDataOrThrow(encoded, Token);
 * assert(decoded === "deadbeef");
 *
 * // CBOR encoding and decoding
 * const cborHex = Data.encodeCBOROrThrow("deadbeef", Token);
 * assert(cborHex === "44deadbeef");
 *
 * const decodedFromCBOR = Data.decodeCBOROrThrow(cborHex, Token);
 * assert(decodedFromCBOR === "deadbeef");
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
 * import { TSchema, Data } from "@evolution-sdk/experimental";
 * import assert from "assert";
 *
 * const Token = TSchema.Integer;
 * type TokenType = typeof Token.Type; // bigint
 *
 * const encoded = Data.encodeDataOrThrow( 1000n, Token );
 * assert(encoded._tag === "Integer");
 * assert(encoded.integer === 1000n);
 *
 * const decoded = Data.decodeDataOrThrow( encoded, Token );
 * assert(decoded === 1000n);
 *
 * // CBOR encoding and decoding
 * const cborHex = Data.encodeCBOROrThrow(1000n, Token);
 * assert(cborHex === "1903e8");
 *
 * const decodedFromCBOR = Data.decodeCBOROrThrow(cborHex, Token);
 * assert(decodedFromCBOR === 1000n);
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
 * import { TSchema , Data } from "@evolution-sdk/experimental";
 * import assert from "assert";
 *
 * const RedeemAction = TSchema.Literal("spend", "mint", "withdraw");
 * type RedeemActionType = typeof RedeemAction.Type; // "spend" | "mint" | "withdraw"
 *
 * const encoded = Data.encodeDataOrThrow( "spend", RedeemAction );
 * assert(encoded.index === 0n);
 * assert(encoded.fields.length === 0);
 *
 * const decoded = Data.decodeDataOrThrow( encoded, RedeemAction );
 * assert(decoded === "spend");
 *
 * // CBOR encoding and decoding
 * const cborHex = Data.encodeCBOROrThrow("spend", RedeemAction);
 * assert(cborHex === "d87980");
 *
 * const decodedFromCBOR = Data.decodeCBOROrThrow(cborHex, RedeemAction);
 * assert(decodedFromCBOR === "spend");
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
 * import { TSchema, Data } from "@evolution-sdk/experimental";
 * import assert from "assert";
 *
 * const TokenList = TSchema.Array( TSchema.ByteArray );
 * type TokenListType = typeof TokenList.Type; // string[]
 *
 * const encoded = Data.encodeDataOrThrow( ["deadbeef", "cafe"], TokenList );
 * assert(encoded._tag === "List");
 * assert(encoded.list.length === 2);
 * assert(Data.isEqual(encoded.list[0], Data.mkByte("deadbeef")));
 * assert(Data.isEqual(encoded.list[1], Data.mkByte("cafe")));
 *
 * const decoded = Data.decodeDataOrThrow( encoded, TokenList );
 * assert(Array.isArray(decoded));
 * assert(decoded.length === 2);
 * assert(decoded[0] === "deadbeef");
 * assert(decoded[1] === "cafe");
 *
 * // CBOR encoding and decoding
 * const cborHex = Data.encodeCBOROrThrow(["deadbeef", "cafe"], TokenList);
 * assert(cborHex === "9f44deadbeef42cafeff");
 *
 * const decodedFromCBOR = Data.decodeCBOROrThrow(cborHex, TokenList);
 * assert(decodedFromCBOR[0] === "deadbeef");
 * assert(decodedFromCBOR[1] === "cafe");
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
 * import { TSchema, Data } from "@evolution-sdk/experimental";
 * import assert from "assert";
 *
 * const TokenMap = TSchema.Map(TSchema.ByteArray, TSchema.Integer);
 * type TokenMapType = typeof TokenMap.Type; // Map<string, bigint>
 *
 * const input = new Map([
 *   ["deadbeef", 1n],
 *   ["cafe", 2n],
 * ]);
 *
 * const encoded = Data.encodeDataOrThrow(input, TokenMap);
 * assert(encoded._tag === "Map");
 * assert(encoded.entries.length === 2);
 * assert(Data.isEqual(encoded.entries[0].k, Data.mkByte("deadbeef")));
 * assert(Data.isEqual(encoded.entries[0].v, Data.mkInt(1n)));
 * assert(Data.isEqual(encoded.entries[1].k, Data.mkByte("cafe")));
 * assert(Data.isEqual(encoded.entries[1].v, Data.mkInt(2n)));
 *
 * const decoded = Data.decodeDataOrThrow(encoded, TokenMap);
 * assert(decoded instanceof Map);
 * assert(decoded.size === 2);
 * assert(decoded.get("deadbeef") === 1n);
 * assert(decoded.get("cafe") === 2n);
 *
 * // CBOR encoding and decoding
 * const cborHex = Data.encodeCBOROrThrow(input, TokenMap);
 * assert(cborHex === "bf42cafe0244deadbeef01ff");
 *
 * const decodedFromCBOR = Data.decodeCBOROrThrow(cborHex, TokenMap);
 * assert(decodedFromCBOR instanceof Map);
 * assert(decodedFromCBOR.get("deadbeef") === 1n);
 * assert(decodedFromCBOR.get("cafe") === 2n);
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
 * import { TSchema, Data } from "@evolution-sdk/experimental";
 * import assert from "assert";
 *
 * const MaybeDeadline = TSchema.NullOr(TSchema.Integer);
 * type MaybeDeadlineType = typeof MaybeDeadline.Type; // bigint | null
 *
 * const just = Data.encodeDataOrThrow( 1000n, MaybeDeadline );
 * assert(just.index === 0n);
 * assert(just.fields.length === 1);
 * assert(Data.isEqual(just.fields[0], Data.mkInt(1000n)));
 *
 * const nothing = Data.encodeDataOrThrow( null, MaybeDeadline );
 * assert(nothing.index === 1n);
 * assert(nothing.fields.length === 0);
 *
 * const justDecoded = Data.decodeDataOrThrow( just, MaybeDeadline );
 * assert(justDecoded === 1000n);
 *
 * const nothingDecoded = Data.decodeDataOrThrow( nothing, MaybeDeadline );
 * assert(nothingDecoded === null);
 *
 * // CBOR encoding and decoding
 * const justCbor = Data.encodeCBOROrThrow(1000n, MaybeDeadline);
 * assert(justCbor === "d8799f1903e8ff");
 *
 * const nothingCbor = Data.encodeCBOROrThrow(null, MaybeDeadline);
 * assert(nothingCbor === "d87a80");
 *
 * const justFromCBOR = Data.decodeCBOROrThrow(justCbor, MaybeDeadline);
 * assert(justFromCBOR === 1000n);
 *
 * const nothingFromCBOR = Data.decodeCBOROrThrow(nothingCbor, MaybeDeadline);
 * assert(nothingFromCBOR === null);
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
 * import { TSchema, Data } from "@evolution-sdk/experimental";
 * import assert from "assert";
 *
 * const MaybeDeadline = TSchema.UndefinedOr(TSchema.Integer);
 * type MaybeDeadlineType = typeof MaybeDeadline.Type; // bigint | undefined
 *
 * const just = Data.encodeDataOrThrow( 1000n, MaybeDeadline );
 * assert(just.index === 0n);
 * assert(just.fields.length === 1);
 * assert(Data.isEqual(just.fields[0], Data.mkInt(1000n)));
 *
 * const nothing = Data.encodeDataOrThrow( undefined, MaybeDeadline );
 * assert(nothing.index === 1n);
 * assert(nothing.fields.length === 0);
 *
 * const justDecoded = Data.decodeDataOrThrow( just, MaybeDeadline );
 * assert(justDecoded === 1000n);
 *
 * const nothingDecoded = Data.decodeDataOrThrow( nothing, MaybeDeadline );
 * assert(nothingDecoded === undefined);
 *
 * // CBOR encoding and decoding
 * const justCbor = Data.encodeCBOROrThrow(1000n, MaybeDeadline);
 * assert(justCbor === "d8799f1903e8ff");
 *
 * const nothingCbor = Data.encodeCBOROrThrow(undefined, MaybeDeadline);
 * assert(nothingCbor === "d87a80");
 *
 * const justFromCBOR = Data.decodeCBOROrThrow(justCbor, MaybeDeadline);
 * assert(justFromCBOR === 1000n);
 *
 * const nothingFromCBOR = Data.decodeCBOROrThrow(nothingCbor, MaybeDeadline);
 * assert(nothingFromCBOR === undefined);
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
 * import { TSchema , Data } from "@evolution-sdk/experimental";
 * import assert from "assert";
 *
 * const BoolSchema = TSchema.Boolean;
 * type BoolType = typeof BoolSchema.Type; // boolean
 *
 * const encoded = Data.encodeDataOrThrow(true, BoolSchema);
 * assert(encoded.index === 1n);
 * assert(encoded.fields.length === 0);
 *
 * const decoded = Data.decodeDataOrThrow(encoded, BoolSchema);
 * assert(decoded === true);
 *
 * const falseEncoded = Data.encodeDataOrThrow(false, BoolSchema);
 * assert(falseEncoded.index === 0n);
 * assert(falseEncoded.fields.length === 0);
 *
 * const falseDecoded = Data.decodeDataOrThrow(falseEncoded, BoolSchema);
 * assert(falseDecoded === false);
 *
 * // CBOR encoding and decoding
 * const trueCbor = Data.encodeCBOROrThrow(true, BoolSchema);
 * assert(trueCbor === "d87a80");
 *
 * const falseCbor = Data.encodeCBOROrThrow(false, BoolSchema);
 * assert(falseCbor === "d87980");
 *
 * const trueFromCBOR = Data.decodeCBOROrThrow(trueCbor, BoolSchema);
 * assert(trueFromCBOR === true);
 *
 * const falseFromCBOR = Data.decodeCBOROrThrow(falseCbor, BoolSchema);
 * assert(falseFromCBOR === false);
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
 * import { TSchema , Data } from "@evolution-sdk/experimental";
 * import assert from "assert";
 *
 * const Token = TSchema.Struct({
 *   policyId: TSchema.ByteArray,
 *   assetName: TSchema.ByteArray,
 *   amount: TSchema.Integer
 * });
 *
 * type TokenType = typeof Token.Type; // { policyId: string; assetName: string; amount: bigint }
 *
 * const input = {
 *   policyId: "deadbeef",
 *   assetName: "cafe",
 *   amount: 1000n
 * };
 *
 * const encoded = Data.encodeDataOrThrow(input, Token );
 * assert(encoded.index === 0n);
 * assert(encoded.fields.length === 3);
 * assert(Data.isEqual(encoded.fields[0], Data.mkByte("deadbeef")));
 * assert(Data.isEqual(encoded.fields[1], Data.mkByte("cafe")));
 * assert(Data.isEqual(encoded.fields[2], Data.mkInt(1000n)));
 *
 * const decoded = Data.decodeDataOrThrow(encoded, Token);
 * assert(decoded.policyId === "deadbeef");
 * assert(decoded.assetName === "cafe");
 * assert(decoded.amount === 1000n);
 *
 * // CBOR encoding and decoding
 * const cborHex = Data.encodeCBOROrThrow(input, Token);
 * assert(cborHex === "d8799f44deadbeef42cafe1903e8ff");
 *
 * const decodedFromCBOR = Data.decodeCBOROrThrow(cborHex, Token);
 * assert(decodedFromCBOR.policyId === "deadbeef");
 * assert(decodedFromCBOR.assetName === "cafe");
 * assert(decodedFromCBOR.amount === 1000n);
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
 * import { TSchema, Data } from "@evolution-sdk/experimental";
 * import assert from "assert";
 *
 * const MintRedeem = TSchema.Struct({
 *   policyId: TSchema.ByteArray,
 *   assetName: TSchema.ByteArray,
 *   amount: TSchema.Integer,
 * });
 * const isMintRedeem = TSchema.is(MintRedeem);
 *
 * const SpendRedeem = TSchema.Struct({
 *   address: TSchema.ByteArray,
 *   amount: TSchema.Integer,
 * });
 * const isSpendRedeem = TSchema.is(SpendRedeem);
 *
 * const RedeemAction = TSchema.Union(MintRedeem, SpendRedeem);
 * type RedeemActionType = typeof RedeemAction.Type; // { policyId: string; assetName: string; amount: bigint } | { address: string; amount: bigint }
 *
 * const mintInput = {
 *   policyId: "deadbeef",
 *   assetName: "cafe",
 *   amount: 1000n,
 * };
 * const mintEncoded = Data.encodeDataOrThrow(mintInput, RedeemAction);
 * assert(mintEncoded.index === 0n);
 * assert(mintEncoded.fields.length === 1);
 * assert(Data.isEqual(mintEncoded.fields[0], Data.mkConstr(0n, [
 *  Data.mkByte("deadbeef"),
 *  Data.mkByte("cafe"),
 *  Data.mkInt(1000n),
 * ])));
 *
 * const mintDecoded = Data.decodeDataOrThrow(mintEncoded, RedeemAction);
 * if (isMintRedeem(mintDecoded)) {
 *   assert(mintDecoded.policyId === "deadbeef");
 *   assert(mintDecoded.assetName === "cafe");
 *   assert(mintDecoded.amount === 1000n);
 * }
 *
 * const spendInput = {
 *   address: "cafe0123",
 *   amount: 500n,
 * };
 * const spendEncoded = Data.encodeDataOrThrow(spendInput, RedeemAction);
 * assert(
 *  Data.isEqual(
 *     spendEncoded,
 *     Data.mkConstr(1n, [
 *       Data.mkConstr(0n, [Data.mkByte("cafe0123"), Data.mkInt(500n)]),
 *     ])
 *   )
 * );
 *
 * // CBOR encoding and decoding
 * const mintCborHex = Data.encodeCBOROrThrow(mintInput, RedeemAction);
 * assert(mintCborHex === "d8799fd8799f44deadbeef42cafe1903e8ffff");
 *
 * const mintDecodedFromCBOR = Data.decodeCBOROrThrow(mintCborHex, RedeemAction);
 * if (isMintRedeem(mintDecodedFromCBOR)) {
 *   assert(mintDecodedFromCBOR.policyId === "deadbeef");
 *   assert(mintDecodedFromCBOR.assetName === "cafe");
 *   assert(mintDecodedFromCBOR.amount === 1000n);
 * }
 *
 * const spendCborHex = Data.encodeCBOROrThrow(spendInput, RedeemAction);
 * assert(spendCborHex === "d87a9fd8799f44cafe01231901f4ffff");
 *
 * const spendDecodedFromCBOR = Data.decodeCBOROrThrow(spendCborHex, RedeemAction);
 * if (isSpendRedeem(spendDecodedFromCBOR)) {
 *   assert(spendDecodedFromCBOR.address === "cafe0123");
 *   assert(spendDecodedFromCBOR.amount === 500n);
 * }
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
 * import { TSchema , Data } from "@evolution-sdk/experimental";
 * import assert from "assert";
 *
 * const Token = TSchema.Tuple([
 *   TSchema.ByteArray,
 *   TSchema.Integer,
 *   TSchema.Boolean ]
 * );
 * type TokenType = typeof Token.Type; // [string, bigint, boolean]
 *
 * const input = ["deadbeef", 1000n, true];
 * const encoded = Data.encodeDataOrThrow(input, Token);
 * assert(encoded._tag === "List");
 * assert(encoded.list.length === 3);
 * assert(Data.isEqual(encoded.list[0], Data.mkByte("deadbeef")));
 * assert(Data.isEqual(encoded.list[1], Data.mkInt(1000n)));
 * assert(Data.isEqual(encoded.list[2], Data.mkConstr(1n, [])));
 *
 * const decoded = Data.decodeDataOrThrow(encoded, Token);
 * assert(Array.isArray(decoded));
 * assert(decoded.length === 3);
 * assert(decoded[0] === "deadbeef");
 * assert(decoded[1] === 1000n);
 * assert(decoded[2] === true);
 *
 * // CBOR encoding and decoding
 * const cborHex = Data.encodeCBOROrThrow(input, Token);
 * assert(cborHex === "9f44deadbeef1903e8d87a80ff");
 *
 * const decodedFromCBOR = Data.decodeCBOROrThrow(cborHex, Token);
 * assert(Array.isArray(decodedFromCBOR));
 * assert(decodedFromCBOR.length === 3);
 * assert(decodedFromCBOR[0] === "deadbeef");
 * assert(decodedFromCBOR[1] === 1000n);
 * assert(decodedFromCBOR[2] === true);
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

export const is = Schema.is;
