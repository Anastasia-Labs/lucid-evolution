import { Schema } from "effect";
import * as Data from "../DataTagged.js";
import { Struct } from "effect/Schema";

const RefSchema = Schema.TemplateLiteral("#/definitions/", Schema.String);

const bytearray = Schema.Struct({
  dataType: Schema.Literal("bytes"),
  title: Schema.optional(Schema.String),
});

const int = Schema.Struct({
  dataType: Schema.Literal("integer"),
});

const data = Schema.Struct({
  title: Schema.Literal("Data"),
  description: Schema.String,
});

const fields = Schema.Array(
  Schema.Struct({
    title: Schema.optional(Schema.String),
    $ref: RefSchema,
  })
);

const constructor = Schema.Struct({
  title: Schema.String,
  dataType: Schema.Literal("constructor"),
  index: Schema.Number,
  fields: fields,
});

const CoreTypesSchema = Schema.Union(
  bytearray,
  int,
  data,
  constructor,
  Schema.Struct({
    title: Schema.String,
    description: Schema.optional(Schema.String),
    anyOf: Schema.Array(Schema.Union(bytearray, int, constructor)),
  })
);

const DefinitionsSchema = Schema.Record({
  key: Schema.String,
  value: CoreTypesSchema,
});

const PreambleSchema = Schema.Struct({
  title: Schema.String,
  description: Schema.String,
  version: Schema.String,
  plutusVersion: Schema.String,
  compiler: Schema.optional(
    Schema.Struct({
      name: Schema.String,
      version: Schema.String,
    })
  ),
  license: Schema.optional(Schema.String),
});

const ValidatorSchema = Schema.Struct({
  title: Schema.String,
  datum: Schema.optional(
    Schema.Struct({
      title: Schema.optional(Schema.String),
      schema: Struct({
        $ref: RefSchema,
      }),
    })
  ),
  redeemer: Schema.Struct({
    title: Schema.optional(Schema.String),
    schema: Schema.Union(
      Struct({
        $ref: RefSchema,
      }),
      Schema.Struct({})
    ),
  }),
  parameters: Schema.optional(
    Schema.Array(
      Schema.Struct({
        title: Schema.String,
        schema: Struct({
          $ref: RefSchema,
        }),
      })
    )
  ),
  compiledCode: Schema.optional(Schema.String),
  hash: Schema.optional(Schema.String),
});

const PlutusSchema = Schema.Struct({
  preamble: PreambleSchema,
  validators: Schema.Array(ValidatorSchema),
  definitions: DefinitionsSchema,
});

type PlutusSchemaType = typeof PlutusSchema.Type;
type ValidatorSchemaType = typeof ValidatorSchema.Type;
type DefinitionsType = typeof DefinitionsSchema.Type;
type RefType = typeof RefSchema.Type;
type Coretype = typeof CoreTypesSchema.Type;
type fieldTypes = typeof fields.Type;
type ConstructorType = typeof constructor.Type;

const plutus = {
  preamble: {
    title: "aiken-lang/gift_card",
    description: "Create a gift card that can be used to redeem locked assets",
    version: "0.0.0",
    plutusVersion: "v3",
    compiler: {
      name: "Aiken",
      version: "v1.1.9+2217206",
    },
    license: "Apache-2.0",
  },
  validators: [
    {
      title: "multi.redeem.spend",
      datum: {
        title: "datum",
        schema: {
          $ref: "#/definitions/SpendTokenName",
        },
      },
      redeemer: {
        title: "_r",
        schema: {
          $ref: "#/definitions/Data",
        },
      },
      parameters: [
        {
          title: "creator",
          schema: {
            $ref: "#/definitions/ByteArray",
          },
        },
      ],
      compiledCode:
        "59040a01010032323232323232232253330043232323232323232325323233300f300100613233223232325333015300830163754002264a66602c6010602e6ea80044c94ccc05cc028c060dd5003099b8732325333019300b301a37540022900009bad301e301b375400264a666032601660346ea8004530103d87a8000132330010013756603e60386ea8008894ccc078004530103d87a8000132333222533301f337220100062a66603e66e3c02000c4c050cc08cdd400125eb80530103d87a8000133006006001375c603a0026eb4c078004c088008c080004cc030014008dd7180e180c9baa0064800458dd7180d980c1baa00116301a301737546034602e6ea8c068c06cc05cdd5180d180b9baa0011632330010013758603400644a6660320022980103d87a80001332253330183375e601c60346ea80080204c034cc0700092f5c0266008008002603600260380026eacc060c064c064c064c064004c050dd5006180a800980a980b00098089baa0071533300f3002006132323253330123005001132325333017301a00200416375a603000260286ea802c54ccc048c01000454ccc054c050dd50058010b0b18091baa00a1323232323232325333017300a3018375402026464a66603266002008466e3c0600044c8c8cc004004014894ccc07c004528899199911299981019804004919b8f00100415333020323300100100d22533302500114a026644a6660486464a66604c66ebcc0acc0b0c0b0008cdd2a4008660546ea40252f5c0266ebcc070c0a0dd50008068a50302a0013026375400429444cc010010004c09c004c0a000454ccc080c0480084cc0180180045280b0b1bae301e001375a603e0026046004604200266e9520023301d375201497ae014a044646600200200644a66603e00229404cc894ccc078c0140085288998020020009bae302100130220013232333001001375a603c60366ea80492f5c0444a666036601c0042002266600600666e0000920013301f37526e50cdc58010020009bb3300d3019375460380082646600200200444a66603800229444cc894ccc06ccdc39bad301d002480044cc010010004528180f000980f80099299980b9804980c1baa00114bd6f7b63009bab301c30193754002660146eacc06c01001cdd6180d180d980d980d980d8019bac30190033758603000660306030002602e602e00260246ea8028dd7180a18089baa00716370e90011b874800088c8cc00400400c894ccc04c0045300103d87a800013233322253330143372200e0062a66602866e3c01c00c4c024cc060dd300125eb80530103d87a8000133006006001375c60240026eacc04c004c05c008c054004dd2a40004602000260146ea8004c034c03800cc030008c02c008c02c004c018dd50008a4c26cac6eb80055cd2ab9d5573caae7d5d02ba15745",
      hash: "3fe854a1171108b9af1e064ee47af2f81c9788104a6f49213dec8bb7",
    },
    {
      title: "multi.redeem.mint",
      redeemer: {
        title: "rdmr",
        schema: {
          $ref: "#/definitions/multi~1Action",
        },
      },
      parameters: [
        {
          title: "creator",
          schema: {
            $ref: "#/definitions/ByteArray",
          },
        },
      ],
      compiledCode:
        "59040a01010032323232323232232253330043232323232323232325323233300f300100613233223232325333015300830163754002264a66602c6010602e6ea80044c94ccc05cc028c060dd5003099b8732325333019300b301a37540022900009bad301e301b375400264a666032601660346ea8004530103d87a8000132330010013756603e60386ea8008894ccc078004530103d87a8000132333222533301f337220100062a66603e66e3c02000c4c050cc08cdd400125eb80530103d87a8000133006006001375c603a0026eb4c078004c088008c080004cc030014008dd7180e180c9baa0064800458dd7180d980c1baa00116301a301737546034602e6ea8c068c06cc05cdd5180d180b9baa0011632330010013758603400644a6660320022980103d87a80001332253330183375e601c60346ea80080204c034cc0700092f5c0266008008002603600260380026eacc060c064c064c064c064004c050dd5006180a800980a980b00098089baa0071533300f3002006132323253330123005001132325333017301a00200416375a603000260286ea802c54ccc048c01000454ccc054c050dd50058010b0b18091baa00a1323232323232325333017300a3018375402026464a66603266002008466e3c0600044c8c8cc004004014894ccc07c004528899199911299981019804004919b8f00100415333020323300100100d22533302500114a026644a6660486464a66604c66ebcc0acc0b0c0b0008cdd2a4008660546ea40252f5c0266ebcc070c0a0dd50008068a50302a0013026375400429444cc010010004c09c004c0a000454ccc080c0480084cc0180180045280b0b1bae301e001375a603e0026046004604200266e9520023301d375201497ae014a044646600200200644a66603e00229404cc894ccc078c0140085288998020020009bae302100130220013232333001001375a603c60366ea80492f5c0444a666036601c0042002266600600666e0000920013301f37526e50cdc58010020009bb3300d3019375460380082646600200200444a66603800229444cc894ccc06ccdc39bad301d002480044cc010010004528180f000980f80099299980b9804980c1baa00114bd6f7b63009bab301c30193754002660146eacc06c01001cdd6180d180d980d980d980d8019bac30190033758603000660306030002602e602e00260246ea8028dd7180a18089baa00716370e90011b874800088c8cc00400400c894ccc04c0045300103d87a800013233322253330143372200e0062a66602866e3c01c00c4c024cc060dd300125eb80530103d87a8000133006006001375c60240026eacc04c004c05c008c054004dd2a40004602000260146ea8004c034c03800cc030008c02c008c02c004c018dd50008a4c26cac6eb80055cd2ab9d5573caae7d5d02ba15745",
      hash: "3fe854a1171108b9af1e064ee47af2f81c9788104a6f49213dec8bb7",
    },
    {
      title: "multi.redeem.else",
      redeemer: {
        schema: {},
      },
      parameters: [
        {
          title: "creator",
          schema: {
            $ref: "#/definitions/ByteArray",
          },
        },
      ],
      compiledCode:
        "59040a01010032323232323232232253330043232323232323232325323233300f300100613233223232325333015300830163754002264a66602c6010602e6ea80044c94ccc05cc028c060dd5003099b8732325333019300b301a37540022900009bad301e301b375400264a666032601660346ea8004530103d87a8000132330010013756603e60386ea8008894ccc078004530103d87a8000132333222533301f337220100062a66603e66e3c02000c4c050cc08cdd400125eb80530103d87a8000133006006001375c603a0026eb4c078004c088008c080004cc030014008dd7180e180c9baa0064800458dd7180d980c1baa00116301a301737546034602e6ea8c068c06cc05cdd5180d180b9baa0011632330010013758603400644a6660320022980103d87a80001332253330183375e601c60346ea80080204c034cc0700092f5c0266008008002603600260380026eacc060c064c064c064c064004c050dd5006180a800980a980b00098089baa0071533300f3002006132323253330123005001132325333017301a00200416375a603000260286ea802c54ccc048c01000454ccc054c050dd50058010b0b18091baa00a1323232323232325333017300a3018375402026464a66603266002008466e3c0600044c8c8cc004004014894ccc07c004528899199911299981019804004919b8f00100415333020323300100100d22533302500114a026644a6660486464a66604c66ebcc0acc0b0c0b0008cdd2a4008660546ea40252f5c0266ebcc070c0a0dd50008068a50302a0013026375400429444cc010010004c09c004c0a000454ccc080c0480084cc0180180045280b0b1bae301e001375a603e0026046004604200266e9520023301d375201497ae014a044646600200200644a66603e00229404cc894ccc078c0140085288998020020009bae302100130220013232333001001375a603c60366ea80492f5c0444a666036601c0042002266600600666e0000920013301f37526e50cdc58010020009bb3300d3019375460380082646600200200444a66603800229444cc894ccc06ccdc39bad301d002480044cc010010004528180f000980f80099299980b9804980c1baa00114bd6f7b63009bab301c30193754002660146eacc06c01001cdd6180d180d980d980d980d8019bac30190033758603000660306030002602e602e00260246ea8028dd7180a18089baa00716370e90011b874800088c8cc00400400c894ccc04c0045300103d87a800013233322253330143372200e0062a66602866e3c01c00c4c024cc060dd300125eb80530103d87a8000133006006001375c60240026eacc04c004c05c008c054004dd2a40004602000260146ea8004c034c03800cc030008c02c008c02c004c018dd50008a4c26cac6eb80055cd2ab9d5573caae7d5d02ba15745",
      hash: "3fe854a1171108b9af1e064ee47af2f81c9788104a6f49213dec8bb7",
    },
    {
      title: "oneshot.gift_card.spend",
      datum: {
        title: "_d",
        schema: {
          $ref: "#/definitions/Data",
        },
      },
      redeemer: {
        title: "_r",
        schema: {
          $ref: "#/definitions/Data",
        },
      },
      parameters: [
        {
          title: "token_name",
          schema: {
            $ref: "#/definitions/ByteArray",
          },
        },
        {
          title: "utxo_ref",
          schema: {
            $ref: "#/definitions/cardano~1transaction~1OutputReference",
          },
        },
      ],
      compiledCode:
        "5902730101003232323232323223222533300532323232323232323232532333010300500613233223232325333016300730173754002264a66602e601860306ea80044c8c94ccc070c07c0084c94ccc068cdc39bad301c002480044cdc780080c0a50375c60340022c603a002660160066eb8c070c064dd50008b1804980c1baa3009301837546036603860306ea8c06cc060dd50008b198039bac301a00223375e601260306ea8004014dd5980c980d180d180d180d000980a9baa00c3016001301630170013012375400e2a666020600200c2646464a66602660080022a66602c602a6ea802c0085854ccc04cc02000454ccc058c054dd50058010b0b18099baa00a1323232325333018301b00213232533301730083018375401e2a66602e601060306ea8cc0240148cdd79805980d1baa00101515333017300c00113371e00402a29405854ccc05ccdc3800a4002266e3c0080545281bad3018002375c602c0022c60320026600e6eacc060c064c064c064c06400800cdd6180b80098099baa00a375c602a60246ea801c58dc3a400044646600200200644a66602a0022980103d87a8000133225333014300500213374a90001980c00125eb804cc010010004c05c004c0600048c04c00488c94ccc03cc010c040dd50008a5eb7bdb1804dd5980a18089baa001323300100100322533301300114c103d87a800013233322253330143372200e0062a66602866e3c01c00c4cdd2a4000660306e980092f5c02980103d87a8000133006006001375c60240026eacc04c004c05c008c054004dc3a400460166ea8004c038c03c00cc034008c030008c030004c01cdd50008a4c26cac6eb80055cd2ab9d5573caae7d5d02ba15745",
      hash: "675eda685b40c32d3d2413fd2027d9f0cd7a07dcb3015fb70c5dc28d",
    },
    {
      title: "oneshot.gift_card.mint",
      redeemer: {
        title: "rdmr",
        schema: {
          $ref: "#/definitions/oneshot~1Action",
        },
      },
      parameters: [
        {
          title: "token_name",
          schema: {
            $ref: "#/definitions/ByteArray",
          },
        },
        {
          title: "utxo_ref",
          schema: {
            $ref: "#/definitions/cardano~1transaction~1OutputReference",
          },
        },
      ],
      compiledCode:
        "5902730101003232323232323223222533300532323232323232323232532333010300500613233223232325333016300730173754002264a66602e601860306ea80044c8c94ccc070c07c0084c94ccc068cdc39bad301c002480044cdc780080c0a50375c60340022c603a002660160066eb8c070c064dd50008b1804980c1baa3009301837546036603860306ea8c06cc060dd50008b198039bac301a00223375e601260306ea8004014dd5980c980d180d180d180d000980a9baa00c3016001301630170013012375400e2a666020600200c2646464a66602660080022a66602c602a6ea802c0085854ccc04cc02000454ccc058c054dd50058010b0b18099baa00a1323232325333018301b00213232533301730083018375401e2a66602e601060306ea8cc0240148cdd79805980d1baa00101515333017300c00113371e00402a29405854ccc05ccdc3800a4002266e3c0080545281bad3018002375c602c0022c60320026600e6eacc060c064c064c064c06400800cdd6180b80098099baa00a375c602a60246ea801c58dc3a400044646600200200644a66602a0022980103d87a8000133225333014300500213374a90001980c00125eb804cc010010004c05c004c0600048c04c00488c94ccc03cc010c040dd50008a5eb7bdb1804dd5980a18089baa001323300100100322533301300114c103d87a800013233322253330143372200e0062a66602866e3c01c00c4cdd2a4000660306e980092f5c02980103d87a8000133006006001375c60240026eacc04c004c05c008c054004dc3a400460166ea8004c038c03c00cc034008c030008c030004c01cdd50008a4c26cac6eb80055cd2ab9d5573caae7d5d02ba15745",
      hash: "675eda685b40c32d3d2413fd2027d9f0cd7a07dcb3015fb70c5dc28d",
    },
    {
      title: "oneshot.gift_card.else",
      redeemer: {
        schema: {},
      },
      parameters: [
        {
          title: "token_name",
          schema: {
            $ref: "#/definitions/ByteArray",
          },
        },
        {
          title: "utxo_ref",
          schema: {
            $ref: "#/definitions/cardano~1transaction~1OutputReference",
          },
        },
      ],
      compiledCode:
        "5902730101003232323232323223222533300532323232323232323232532333010300500613233223232325333016300730173754002264a66602e601860306ea80044c8c94ccc070c07c0084c94ccc068cdc39bad301c002480044cdc780080c0a50375c60340022c603a002660160066eb8c070c064dd50008b1804980c1baa3009301837546036603860306ea8c06cc060dd50008b198039bac301a00223375e601260306ea8004014dd5980c980d180d180d180d000980a9baa00c3016001301630170013012375400e2a666020600200c2646464a66602660080022a66602c602a6ea802c0085854ccc04cc02000454ccc058c054dd50058010b0b18099baa00a1323232325333018301b00213232533301730083018375401e2a66602e601060306ea8cc0240148cdd79805980d1baa00101515333017300c00113371e00402a29405854ccc05ccdc3800a4002266e3c0080545281bad3018002375c602c0022c60320026600e6eacc060c064c064c064c06400800cdd6180b80098099baa00a375c602a60246ea801c58dc3a400044646600200200644a66602a0022980103d87a8000133225333014300500213374a90001980c00125eb804cc010010004c05c004c0600048c04c00488c94ccc03cc010c040dd50008a5eb7bdb1804dd5980a18089baa001323300100100322533301300114c103d87a800013233322253330143372200e0062a66602866e3c01c00c4cdd2a4000660306e980092f5c02980103d87a8000133006006001375c60240026eacc04c004c05c008c054004dc3a400460166ea8004c038c03c00cc034008c030008c030004c01cdd50008a4c26cac6eb80055cd2ab9d5573caae7d5d02ba15745",
      hash: "675eda685b40c32d3d2413fd2027d9f0cd7a07dcb3015fb70c5dc28d",
    },
  ],
  definitions: {
    ByteArray: {
      dataType: "bytes",
    },
    Data: {
      title: "Data",
      description: "Any Plutus data.",
    },
    Int: {
      dataType: "integer",
    },
    SpendTokenName: {
      title: "SpendTokenName",
      dataType: "bytes",
    },
    "cardano/transaction/OutputReference": {
      title: "OutputReference",
      description:
        "An `OutputReference` is a unique reference to an output on-chain. The `output_index`\n corresponds to the position in the output list of the transaction (identified by its id)\n that produced that output",
      anyOf: [
        {
          title: "OutputReference",
          dataType: "constructor",
          index: 0,
          fields: [
            {
              title: "transaction_id",
              $ref: "#/definitions/ByteArray",
            },
            {
              title: "output_index",
              $ref: "#/definitions/Int",
            },
          ],
        },
      ],
    },
    "multi/Action": {
      title: "Action",
      anyOf: [
        {
          title: "Mint",
          dataType: "constructor",
          index: 0,
          fields: [
            {
              $ref: "#/definitions/Int",
            },
          ],
        },
        {
          title: "Burn",
          dataType: "constructor",
          index: 1,
          fields: [],
        },
      ],
    },
    "oneshot/Action": {
      title: "Action",
      anyOf: [
        {
          title: "Mint",
          dataType: "constructor",
          index: 0,
          fields: [],
        },
        {
          title: "Burn",
          dataType: "constructor",
          index: 1,
          fields: [],
        },
      ],
    },
  },
} as const;

// console.dir(Schema.decodeUnknownSync(definitions)(plutus.definitions), {
//   depth: 5,
// });
// console.log(Schema.decodeUnknownSync(preamble)(plutus.preamble));

// console.log("plutusSchema => ", Schema.decodeUnknownSync(plutusSchema)(plutus));

/**
 * Converts a string to PascalCase
 *
 * @param str The input string to convert
 * @returns The string converted to PascalCase
 *
 * @example
 * import { toPascalCase } from "@lucid-evolution/experimental";
 * toPascalCase("hello_world") // "HelloWorld"
 *
 * @since 1.0.0
 */
const toPascalCase = (str: string): string => {
  // Handle empty strings
  if (!str) return "";

  // Handle snake_case, kebab-case, and spaces
  return str
    .split(/[-_\s]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join("");
};

const plutusSchema = Schema.decodeUnknownSync(PlutusSchema)(plutus);

// How to interpret definitions:
// ByteArray: {
//   dataType: "bytes",
// } should be translated to `type ByteArray = Data.ByteArray;`
//
// Data: {
//   title: "Data",
//   description: "Any Plutus data.",
// } should be translated to `type Data = Data.Data;`
//
// Int: {
//   dataType: "integer",
// } should be translated to `type Int = Data.Integer;`
//
// SpendTokenName: {
//   title: "SpendTokenName",
//   dataType: "bytes",
// } this record should be translated to `type SpendTokenName = Data.ByteArray;`
//
// "cardano/transaction/OutputReference": {
//   title: "OutputReference",
//   description:
//     "An `OutputReference` is a unique reference to an output on-chain. The `output_index`\n corresponds to the position in the output list of the transaction (identified by its id)\n that produced that output",
//   anyOf: [
//     {
//       title: "OutputReference",
//       dataType: "constructor",
//       index: 0,
//       fields: [
//         {
//           title: "transaction_id",
//           $ref: "#/definitions/ByteArray",
//         },
//         {
//           title: "output_index",
//           $ref: "#/definitions/Int",
//         },
//       ],
//     },
//   ],
// }
// should be translated to
// `type OutputReference = Data.Constr<0n, [TransactionId, OutputIndex]>;`
// `type TransactionId = Data.ByteArray;`
// `type OutputIndex = Data.Integer;`
// when anyOf is a singleton array, just use the first element
// when anyOf is an array, use a union `|` on all elements
//
// "oneshot/Action": {
//   title: "Action",
//   anyOf: [
//     {
//       title: "Mint",
//       dataType: "constructor",
//       index: 0,
//       fields: [],
//     },
//     {
//       title: "Burn",
//       dataType: "constructor",
//       index: 1,
//       fields: [],
//     },
//   ],
// },
// should be translated to
// `type Action = Mint | Burn;`
// `type Mint = Data.Constr<0n, []>;`
// `type Burn = Data.Constr<1n, []>;`

// Example usage with direct Data type translation

// // Define specific Plutus Data types
// type Mint = Data.Constr<0n, [Data.Integer]>;
// type Burn = Data.Constr<1n, []>;

// // Create a strongly typed list with specific element types
// const mintList = Data.makeList<Mint>([
//   Data.makeConstr(0n, [Data.makeInteger(4n)]),
// ]);

// // Create a list with mixed element types
// const mixedList = Data.makeList<Data.Data>([
//   Data.makeConstr(0n, [Data.makeInteger(4n)]), // Mint
//   Data.makeByteArray("test"),
// ]);

// // A union type for the redeemer
// type Rdmr = Mint | Burn;

// // Create a Mint instance
// const mint: Mint = Data.makeConstr(0n, [Data.makeInteger(4n)]);

// // Verify the type guards work correctly
// console.log(Data.isConstr(mint)); // true
// console.log(Data.isList(mixedList)); // true

/**
 * Extracts the actual type name from a reference string
 *
 * @param ref The reference string in format "#/definitions/TypeName"
 * @returns The extracted type name
 *
 * @example
 * import { extractRefType } from "@lucid-evolution/experimental";
 * extractRefType("#/definitions/ByteArray") // "ByteArray"
 *
 * @since 1.0.0
 */
const extractRefType = (ref: RefType): string => {
  const refPath = ref.split("#/definitions/");
  return refPath[1].replace(/~1/g, "/");
};

/**
 * Generates a TypeScript type representation for a Plutus data type
 *
 * @param type The Plutus data type definition
 * @param definitions All available type definitions
 * @param namespaceName Optional namespace to prefix constructed types
 * @returns String representation of the TypeScript type
 *
 * @example
 * import { toDataTypeString } from "@lucid-evolution/experimental";
 * toDataTypeString(byteArrayDef, definitions) // "Data.ByteArray"
 *
 * @since 1.0.0
 */
const toDataTypeString = (
  type: Coretype,
  definitions: DefinitionsType,
  namespaceName: string = "Data"
): string => {
  if ("dataType" in type && type.dataType === "bytes") {
    return `${namespaceName}.ByteArray`;
  }
  if ("dataType" in type && type.dataType === "integer") {
    return `${namespaceName}.Integer`;
  }
  if ("title" in type && type.title === "Data") {
    return `${namespaceName}.Data`;
  }
  if (
    "title" in type &&
    "dataType" in type &&
    type.dataType === "constructor"
  ) {
    const { index, fields } = type;
    const fieldTypes = fields.map((field) => {
      if ("$ref" in field) {
        const refType = extractRefType(field.$ref);
        const refTypeDef = definitions[refType];
        return toDataTypeString(refTypeDef, definitions, namespaceName);
      }
      return `${namespaceName}.Data`;
    });
    return `${namespaceName}.Constr<${index}n, [${fieldTypes.join(", ")}]>`;
  }
  if ("anyOf" in type) {
    const anyOfTypes = type.anyOf.map((anyOfType) => {
      if (
        "title" in anyOfType &&
        "dataType" in anyOfType &&
        anyOfType.dataType === "constructor"
      ) {
        return anyOfType.title;
      }
      return toDataTypeString(anyOfType, definitions, namespaceName);
    });
    return anyOfTypes.join(" | ");
  }
  return `${namespaceName}.Data`;
};

/**
 * Generates TypeScript type definitions for a Plutus constructor's fields
 *
 * @param type The Plutus constructor type definition
 * @param definitions All available type definitions
 * @param namespaceName Optional namespace to prefix constructed types
 * @returns Array of strings with field type definitions
 *
 * @example
 * import { generateFieldTypes } from "@lucid-evolution/experimental";
 * const fieldTypes = generateFieldTypes(constructorDef, definitions);
 * // ["type TransactionId = Data.ByteArray;", "type OutputIndex = Data.Integer;"]
 *
 * @since 1.0.0
 */
const generateFieldTypes = (
  fields: fieldTypes,
  definitions: DefinitionsType,
  namespaceName: string = "Data"
): string[] => {
  const result: string[] = [];

  // if (!type.fields || type.fields.length === 0) {
  //   return result;
  // }

  fields.forEach((field) => {
    if ("$ref" in field && "title" in field && field.title) {
      const refType = extractRefType(field.$ref);
      const refTypeDef = definitions[refType];

      // Generate a PascalCase type name from the field title
      const fieldTypeName = toPascalCase(field.title);

      // Determine the appropriate data type
      let dataType: string;
      if ("dataType" in refTypeDef) {
        if (refTypeDef.dataType === "bytes") {
          dataType = `${namespaceName}.ByteArray`;
        } else if (refTypeDef.dataType === "integer") {
          dataType = `${namespaceName}.Integer`;
        } else {
          dataType = `${namespaceName}.Data`;
        }
      } else if ("title" in refTypeDef && refTypeDef.title === "Data") {
        dataType = `${namespaceName}.Data`;
      } else {
        dataType = toDataTypeString(refTypeDef, definitions, namespaceName);
      }

      result.push(`type ${fieldTypeName} = ${dataType};`);
    }
  });

  return result;
};

/**
 * Generates TypeScript type definitions for a Plutus constructor
 *
 * @param type The Plutus constructor type definition
 * @param definitions All available type definitions
 * @param namespaceName Optional namespace to prefix constructed types
 * @returns String representation of the TypeScript type
 *
 * @example
 * import { generateConstructorType } from "@lucid-evolution/experimental";
 * generateConstructorType(constructorDef, definitions) // "type Mint = Data.Constr<0n, [Data.Integer]>;"
 *
 * @since 1.0.0
 */
const generateConstructorType = (
  type: ConstructorType,
  definitions: DefinitionsType,
  namespaceName: string = "Data"
): string => {
  const { title, index, fields } = type;
  const fieldTypes = fields.map((field) => {
    if ("$ref" in field) {
      // If the field has a title, use the PascalCase version of that as the type
      if ("title" in field && field.title) {
        return toPascalCase(field.title);
      }
      // Otherwise fallback to the referenced type
      const refType = extractRefType(field.$ref);
      const refTypeDef = definitions[refType];
      return toDataTypeString(refTypeDef, definitions, namespaceName);
    }
    return `${namespaceName}.Data`;
  });

  return `type ${title} = ${namespaceName}.Constr<${index}n, [${fieldTypes.join(", ")}]>;`;
};

/**
 * Generates all TypeScript type definitions for a Plutus schema definition
 *
 * @param name The name of the type
 * @param type The Plutus type definition
 * @param definitions All available type definitions
 * @param namespaceName Optional namespace to prefix constructed types
 * @returns Array of string representations of TypeScript types
 *
 * @example
 * import { generateTypesForDefinition } from "@lucid-evolution/experimental";
 * generateTypesForDefinition("Action", actionDef, definitions)
 * // ["type Action = Mint | Burn;", "type Mint = Data.Constr<0n, [Data.Integer]>;", "type Burn = Data.Constr<1n, []>;"]
 *
 * @since 1.0.0
 */
const generateTypesForDefinition = (
  name: string,
  type: Coretype,
  definitions: DefinitionsType,
  namespaceName: string = "Data"
): string[] => {
  const result: string[] = [];

  // Handle simple data types
  if (
    "dataType" in type &&
    (type.dataType === "bytes" || type.dataType === "integer")
  ) {
    const typeName = "title" in type && type.title ? type.title : name;
    const dataType = type.dataType === "bytes" ? "ByteArray" : "Integer";
    result.push(`type ${typeName} = ${namespaceName}.${dataType};`);
    return result;
  }

  if ("title" in type && type.title === "Data") {
    result.push(`type ${name} = ${namespaceName}.Data;`);
    return result;
  }

  // Handle constructor types
  if (
    "title" in type &&
    "dataType" in type &&
    type.dataType === "constructor"
  ) {
    // First add field type definitions
    const fieldTypes = generateFieldTypes(
      type.fields,
      definitions,
      namespaceName
    );
    result.push(...fieldTypes);

    // Then add the constructor type
    result.push(
      generateConstructorType(type as any, definitions, namespaceName)
    );
    return result;
  }

  // Handle union types
  if ("anyOf" in type) {
    const unionName = type.title || name;
    const constructorNames: string[] = [];

    // Generate type for each constructor in the union
    type.anyOf.forEach((anyOfType) => {
      if (
        "title" in anyOfType &&
        "dataType" in anyOfType &&
        anyOfType.dataType === "constructor"
      ) {
        const constructorName = anyOfType.title;
        constructorNames.push(constructorName);

        // First add field type definitions for this constructor
        const fieldTypes = generateFieldTypes(
          anyOfType.fields,
          definitions,
          namespaceName
        );
        result.push(...fieldTypes);

        // Then add the constructor type
        result.push(
          generateConstructorType(anyOfType, definitions, namespaceName)
        );
      }
    });

    // Generate the union type
    result.unshift(`type ${unionName} = ${constructorNames.join(" | ")};`);
  }

  return result;
};

/**
 * Generates TypeScript type definitions for all definitions in a Plutus schema
 *
 * @param definitions All available type definitions from the Plutus schema
 * @param namespaceName Optional namespace to prefix constructed types
 * @returns String with all generated TypeScript type definitions
 *
 * @example
 * import { generateTypesFromDefinitions } from "@lucid-evolution/experimental";
 * const types = generateTypesFromDefinitions(plutus.definitions);
 * console.log(types);
 *
 * @since 1.0.0
 */
const generateTypesFromDefinitions = (
  definitions: DefinitionsType,
  namespaceName: string = "Data"
): string => {
  const allTypes: string[] = [];

  for (const [key, value] of Object.entries(definitions)) {
    // Handle namespace/path names like "oneshot/Action"
    const typeNameSegments = key.split("/");
    const typeName = typeNameSegments[typeNameSegments.length - 1];

    const generatedTypes = generateTypesForDefinition(
      typeName,
      value,
      definitions,
      namespaceName
    );

    allTypes.push(...generatedTypes);
  }

  return allTypes.join("\n");
};

/**
 * Generates TypeScript type definitions for a Plutus validator's datum, redeemer, and parameters
 *
 * @param validator The validator definition from a Plutus schema
 * @param definitions All available type definitions
 * @param namespaceName Optional namespace to prefix constructed types
 * @returns String with all generated TypeScript type definitions for the validator
 *
 * @example
 * import { generateValidatorTypes } from "@lucid-evolution/experimental";
 * const types = generateValidatorTypes(plutus.validators[0], plutus.definitions);
 * console.log(types);
 *
 * @since 1.0.0
 */
const generateValidatorTypes = (
  validator: ValidatorSchemaType,
  definitions: DefinitionsType,
  namespaceName: string = "Data"
): string => {
  const typeDefinitions: string[] = [];
  const { title, datum, redeemer, parameters } = validator;

  // Process datum
  if (datum && "$ref" in datum.schema) {
    const datumType = extractRefType(datum.schema.$ref);
    const extractedDatum = definitions[datumType];
    const datumTypeSegments = datumType.split("/");
    const datumTypeName = datumTypeSegments[datumTypeSegments.length - 1];

    const datumTypes = generateTypesForDefinition(
      datumTypeName,
      extractedDatum,
      definitions,
      namespaceName
    );
    typeDefinitions.push(...datumTypes);
  }

  // Process redeemer
  if ("$ref" in redeemer.schema) {
    const redeemerType = extractRefType(redeemer.schema.$ref);
    const extractedRedeemer = definitions[redeemerType];
    const redeemerTypeSegments = redeemerType.split("/");
    const redeemerTypeName =
      redeemerTypeSegments[redeemerTypeSegments.length - 1];

    const redeemerTypes = generateTypesForDefinition(
      redeemerTypeName,
      extractedRedeemer,
      definitions,
      namespaceName
    );
    typeDefinitions.push(...redeemerTypes);
  }

  // Process parameters
  if (parameters) {
    parameters.forEach((param) => {
      const paramType = extractRefType(param.schema.$ref);
      const extractedParam = definitions[paramType];
      const paramTypeSegments = paramType.split("/");
      const paramTypeName = paramTypeSegments[paramTypeSegments.length - 1];

      const paramTypes = generateTypesForDefinition(
        paramTypeName,
        extractedParam,
        definitions,
        namespaceName
      );
      typeDefinitions.push(...paramTypes);
    });
  }

  return typeDefinitions.join("\n");
};

// Example usage
//const validatorWithAction = plutus.validators[1]; // Using oneshot.gift_card.mint with Action type
//const generatedTypes = generateValidatorTypes(
//  validatorWithAction,
//  plutus.definitions
//);
//console.log(generatedTypes);

//const allTypesString = generateTypesFromDefinitions(plutus.definitions);
//console.log(allTypesString);

/**
 * Generates full TypeScript module code with type definitions from a Plutus schema
 * focusing on the validator datum, redeemer, and parameters
 *
 * @param plutusSchema The complete Plutus schema
 * @param namespaceName Optional namespace to prefix constructed types
 * @returns String with complete TypeScript module code
 *
 * @example
 * import { generateTypeScriptModule } from "@lucid-evolution/experimental";
 * const code = generateTypeScriptModule(plutus);
 * // This returns a complete TypeScript file content that can be written to disk
 *
 * @since 1.0.0
 */
const generateTypeScriptModule = (
  plutusSchema: PlutusSchemaType,
  namespaceName: string = "Data"
): string => {
  const { preamble, validators, definitions } = plutusSchema;

  // Generate imports and header
  let code = `// Generated from Plutus schema: ${preamble.title}\n`;
  code += `// Description: ${preamble.description}\n`;
  code += `// Version: ${preamble.version}\n\n`;
  code += `import * as ${namespaceName} from "../DataTagged.js";\n\n`;

  // Track types we've already generated to avoid duplicates
  const generatedTypes = new Set<string>();

  // For each validator, generate types for datum, redeemer, and parameters
  validators.forEach((validator) => {
    // Add validator information
    code += `// ${validator.title}\n`;
    if (validator.hash) {
      code += `// Hash: ${validator.hash}\n`;
    }

    // Process datum types
    if (validator.datum && "$ref" in validator.datum.schema) {
      const datumRef = validator.datum.schema.$ref;
      const datumType = extractRefType(datumRef);
      const datumDef = definitions[datumType];

      if (datumDef && !generatedTypes.has(datumType)) {
        const datumTypes = generateTypesForDefinition(
          datumType.split("/").pop() || datumType,
          datumDef,
          definitions,
          namespaceName
        );
        code += `\n// Datum type for ${validator.title}\n${datumTypes.join("\n")}\n`;
        generatedTypes.add(datumType);
      }
    }

    // Process redeemer types
    if ("$ref" in validator.redeemer.schema) {
      const redeemerRef = validator.redeemer.schema.$ref;
      const redeemerType = extractRefType(redeemerRef);
      const redeemerDef = definitions[redeemerType];

      if (redeemerDef && !generatedTypes.has(redeemerType)) {
        const redeemerTypes = generateTypesForDefinition(
          redeemerType.split("/").pop() || redeemerType,
          redeemerDef,
          definitions,
          namespaceName
        );
        code += `\n// Redeemer type for ${validator.title}\n${redeemerTypes.join("\n")}\n`;
        generatedTypes.add(redeemerType);
      }
    }

    // Process parameter types
    if (validator.parameters) {
      validator.parameters.forEach((param) => {
        if ("$ref" in param.schema) {
          const paramRef = param.schema.$ref;
          const paramType = extractRefType(paramRef);
          const paramDef = definitions[paramType];

          if (paramDef && !generatedTypes.has(paramType)) {
            const paramTypes = generateTypesForDefinition(
              paramType.split("/").pop() || paramType,
              paramDef,
              definitions,
              namespaceName
            );
            code += `\n// Parameter '${param.title}' type for ${validator.title}\n${paramTypes.join("\n")}\n`;
            generatedTypes.add(paramType);
          }
        }
      });
    }

    code += "\n";
  });

  // Add validator interface information
  code += `\n/* Validator Interfaces\n`;
  validators.forEach((validator) => {
    const validatorName = toPascalCase(validator.title.replace(/\./g, "_"));

    code += `\ntype ${validatorName}Validator = {\n`;
    code += `  title: "${validator.title}";\n`;
    code += `  hash: "${validator.hash || ""}";\n`;

    // Add datum type
    if (validator.datum && "$ref" in validator.datum.schema) {
      const datumType =
        extractRefType(validator.datum.schema.$ref).split("/").pop() ||
        "Data.Data";
      code += `  datum: ${datumType};\n`;
    } else {
      code += `  datum: ${namespaceName}.Data;\n`;
    }

    // Add redeemer type
    if ("$ref" in validator.redeemer.schema) {
      const redeemerType =
        extractRefType(validator.redeemer.schema.$ref).split("/").pop() ||
        "Data.Data";
      code += `  redeemer: ${redeemerType};\n`;
    } else {
      code += `  redeemer: Data.Data;\n`;
    }

    // Add parameters
    if (validator.parameters && validator.parameters.length > 0) {
      code += `  parameters: {\n`;
      validator.parameters.forEach((param) => {
        const paramType =
          "$ref" in param.schema
            ? extractRefType(param.schema.$ref).split("/").pop() || "Data.Data"
            : "Data.Data";
        code += `    ${param.title}: ${paramType};\n`;
      });
      code += `  };\n`;
    }

    code += `}\n`;
  });
  code += "*/\n";

  return code;
};

// Example of generating a full module
const moduleCode = generateTypeScriptModule(plutus);
console.log(moduleCode);

export {
  PlutusSchema,
  ValidatorSchema,
  PreambleSchema,
  toPascalCase,
  extractRefType,
  toDataTypeString,
  generateValidatorTypes,
  generateTypesFromDefinitions,
  generateTypeScriptModule,
  generateTypesForDefinition,
  generateFieldTypes,
};
