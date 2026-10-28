import { Constr, Data } from "@lucid-evolution/plutus";
import {
  alwaysYesDrepV3,
  dataSerialiseEchoV3,
  helloV2,
  helloWorldParamsV3,
  mintMultiValidatorV3,
  simpleMintV3,
  spendingV2,
  stakeMultiValidatorV3,
} from "./apply-params-scripts.js";

export type ApplyParamsCase = {
  readonly name: string;
  readonly script: string;
  readonly params: Data[];
  /** Passed as `applyParamsToScript`'s `type` argument when set. */
  readonly type?: unknown;
};

const hex = (bytes: number, seed: number): string =>
  Array.from({ length: bytes }, (_, i) =>
    ((seed + i * 37) % 256).toString(16).padStart(2, "0"),
  ).join("");

const integers: Data[] = [
  0n,
  1n,
  23n,
  24n,
  255n,
  256n,
  65_535n,
  65_536n,
  4_294_967_295n,
  4_294_967_296n,
  18_446_744_073_709_551_615n,
  -1n,
  -24n,
  -25n,
  -256n,
  -257n,
  -18_446_744_073_709_551_616n,
];

const bigIntegers: Data[] = [
  18_446_744_073_709_551_616n,
  -18_446_744_073_709_551_617n,
  2n ** 200n + 12_345n,
  -(2n ** 200n) - 12_345n,
  // Over 64 bytes of magnitude: a chunked CBOR bignum.
  2n ** 520n - 1n,
  -(2n ** 600n) + 7n,
];

const byteStrings: Data[] = [
  "",
  "00",
  hex(28, 1),
  hex(32, 2),
  hex(63, 3),
  hex(64, 4),
  hex(65, 5),
  hex(200, 6),
];

const constrs: Data[] = [
  new Constr(0, []),
  new Constr(1, [42n]),
  new Constr(6, ["cafe", -3n]),
  new Constr(7, []),
  new Constr(127, [new Constr(0, [])]),
  new Constr(128, [1n, 2n]),
  new Constr(1_000, [[]]),
  new Constr(65_536, [new Map()]),
];

const lists: Data[] = [
  [],
  [1n],
  [[], [1n, [2n, [3n, []]]]],
  Array.from({ length: 30 }, (_, i) => BigInt(i * i - 100)),
  [hex(70, 7), new Constr(3, [[hex(10, 8)]]), new Map([[1n, []]])],
];

const maps: Data[] = [
  new Map(),
  new Map<Data, Data>([
    [3n, "aa"],
    [1n, "bb"],
    [2n, "cc"],
  ]),
  new Map<Data, Data>([
    [hex(4, 9), 1n],
    ["", 2n],
    [hex(66, 10), 3n],
  ]),
  new Map<Data, Data>([
    [new Constr(0, [1n]), new Map<Data, Data>([[[], new Map()]])],
    [[1n, 2n], new Map<Data, Data>([["ff", [new Constr(2, [])]]])],
  ]),
];

const nested: Data = new Constr(0, [
  new Map<Data, Data>([
    [
      "deadbeef",
      [
        new Constr(1, [2n ** 70n, hex(80, 11)]),
        new Map<Data, Data>([[-5n, [[], [new Map()]]]]),
      ],
    ],
  ]),
  [new Constr(200, [[[[[1n]]]]]), -(2n ** 65n)],
  new Constr(5, []),
]);

const everyKind: Data[] = [
  7n,
  -(2n ** 80n),
  hex(100, 12),
  [],
  [1n, "ab"],
  new Map(),
  new Map<Data, Data>([[0n, 0n]]),
  new Constr(0, []),
  new Constr(130, [hex(3, 13)]),
  nested,
];

const OwnerSchema = Data.Object({
  owner: Data.Bytes(),
  amounts: Data.Array(Data.Integer()),
  limits: Data.Map(Data.Bytes(), Data.Integer()),
  flag: Data.Boolean(),
});

const ParamsSchema = Data.Tuple([OwnerSchema, Data.Bytes(), Data.Integer()]);

const each = (prefix: string, script: string, params: Data[]) =>
  params.map(
    (param, i): ApplyParamsCase => ({
      name: `${prefix} ${i}`,
      script,
      params: [param],
    }),
  );

export const applyParamsCases: readonly ApplyParamsCase[] = [
  // Every script with no parameters, one parameter and many parameters.
  ...[
    ["helloV2", helloV2],
    ["spendingV2", spendingV2],
    ["alwaysYesDrepV3", alwaysYesDrepV3],
    ["dataSerialiseEchoV3", dataSerialiseEchoV3],
    ["helloWorldParamsV3", helloWorldParamsV3],
    ["simpleMintV3", simpleMintV3],
    ["stakeMultiValidatorV3", stakeMultiValidatorV3],
    ["mintMultiValidatorV3", mintMultiValidatorV3],
  ].flatMap(([name, script]): ApplyParamsCase[] => [
    { name: `${name}, no parameters`, script, params: [] },
    {
      name: `${name}, one parameter`,
      script,
      params: [new Constr(0, [new Constr(1, [hex(28, 14)])])],
    },
    { name: `${name}, every kind`, script, params: everyKind },
  ]),
  {
    name: "helloWorldParamsV3, owner and message",
    script: helloWorldParamsV3,
    params: [hex(28, 15), "48656c6c6f2c20576f726c6421"],
  },
  // One parameter of each shape, on a V2 and a V3 script.
  ...each("helloV2, integer", helloV2, integers),
  ...each("alwaysYesDrepV3, integer", alwaysYesDrepV3, integers),
  ...each("helloV2, big integer", helloV2, bigIntegers),
  ...each("alwaysYesDrepV3, big integer", alwaysYesDrepV3, bigIntegers),
  ...each("alwaysYesDrepV3, bytes", alwaysYesDrepV3, byteStrings),
  ...each("helloV2, bytes", helloV2, byteStrings),
  ...each("alwaysYesDrepV3, constr", alwaysYesDrepV3, constrs),
  ...each("helloV2, constr", helloV2, constrs),
  ...each("alwaysYesDrepV3, list", alwaysYesDrepV3, lists),
  ...each("alwaysYesDrepV3, map", alwaysYesDrepV3, maps),
  ...each("helloV2, map", helloV2, maps),
  {
    name: "alwaysYesDrepV3, nested",
    script: alwaysYesDrepV3,
    params: [nested],
  },
  {
    name: "alwaysYesDrepV3, every integer",
    script: alwaysYesDrepV3,
    params: [...integers, ...bigIntegers],
  },
  {
    name: "alwaysYesDrepV3, typed parameters",
    script: alwaysYesDrepV3,
    params: [
      {
        owner: hex(28, 16),
        amounts: [1n, -2n, 2n ** 64n],
        limits: new Map([
          [hex(2, 17), 10n],
          [hex(70, 18), -(2n ** 66n)],
        ]),
        flag: true,
      },
      hex(64, 19),
      -1n,
    ] as unknown as Data[],
    type: ParamsSchema,
  },
];
