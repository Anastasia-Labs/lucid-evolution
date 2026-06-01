import { expect, test } from "vitest";
import { Constr, Data, type Data as PlutusData } from "@lucid-evolution/plutus";
import * as UPLC from "@lucid-evolution/uplc";
import {
  applyParamsToScript,
  utxoToTransactionInput,
  utxoToTransactionOutput,
} from "@lucid-evolution/utils";
import {
  CML,
  Emulator,
  EvaluatorAdapter,
  EvalRedeemer,
  generateEmulatorAccount,
  getAddressDetails,
  Lucid,
  PROTOCOL_PARAMETERS_DEFAULT,
  Script,
  ScriptContextData,
  SLOT_CONFIG_NETWORK,
  scriptFromNative,
  applyDoubleCborEncoding,
  credentialToRewardAddress,
  fromText,
  mintingPolicyToId,
  UTxO,
  validatorToAddress,
  validatorToRewardAddress,
} from "../src/index.js";
import scripts from "./specs/contracts/plutus.json" assert { type: "json" };
import { canonicalRedeemerEntries } from "../src/tx-builder/internal/RedeemerContext.js";
import { CONSTANTS } from "./emulator/Constants.js";

const PUB_KEY_HASH = "11".repeat(28);
const SCRIPT_HASH = "22".repeat(28);
const TX_ID = "33".repeat(32);
const REF_TX_ID = "44".repeat(32);
const DATUM_HASH = "55".repeat(32);
const POLICY_ID = "66".repeat(28);
const TOKEN_NAME = fromText("SchemaToken");
const ECHO_CBO_PREFIX = "LUCID_SCRIPT_CONTEXT_CBOR:";
const ECHO_HASH_PREFIX = "LUCID_SCRIPT_CONTEXT_HASH:";
const ECHO_REWARD = 100_000_000n;
const NATIVE_POLICY_EXPIRY_SLOT = 10_000_000;
const MAX_WORD64 = (1n << 64n) - 1n;

const pubKeyCredential = { PubKeyCredential: [PUB_KEY_HASH] };
const scriptCredential = { ScriptCredential: [SCRIPT_HASH] };
const governanceActionId = {
  gaidTxId: TX_ID,
  gaidGovActionIx: 7n,
};

const expectedValue = new Map([[POLICY_ID, new Map([[TOKEN_NAME, 3n]])]]);

const expectedOutput = {
  txOutAddress: {
    addressCredential: scriptCredential,
    addressStakingCredential: {
      StakingHash: [pubKeyCredential],
    },
  },
  txOutValue: expectedValue,
  txOutDatum: { OutputDatum: [88n] },
  txOutReferenceScript: SCRIPT_HASH,
};

const expectedInput = {
  txInInfoOutRef: {
    txOutRefId: TX_ID,
    txOutRefIdx: 0n,
  },
  txInInfoResolved: expectedOutput,
};

const expectedReferenceInput = {
  txInInfoOutRef: {
    txOutRefId: REF_TX_ID,
    txOutRefIdx: 1n,
  },
  txInInfoResolved: expectedOutput,
};

const expectedProposal = {
  ppDeposit: 5_000_000n,
  ppReturnAddr: pubKeyCredential,
  ppGovernanceAction: {
    HardForkInitiation: [
      governanceActionId,
      {
        pvMajor: 10n,
        pvMinor: 1n,
      },
    ],
  },
};

const expectedScriptContext = {
  scriptContextTxInfo: {
    txInfoInputs: [expectedInput],
    txInfoReferenceInputs: [expectedReferenceInput],
    txInfoOutputs: [expectedOutput],
    txInfoFee: 2_000_000n,
    txInfoMint: expectedValue,
    txInfoTxCerts: [{ TxCertRegDRep: [scriptCredential, 4_000_000n] }],
    txInfoWdrl: new Map([[scriptCredential, 9_000_000n]]),
    txInfoValidRange: {
      ivFrom: {
        lowerBoundLimit: { Finite: [1234n] },
        lowerBoundClosed: true,
      },
      ivTo: {
        upperBoundLimit: "PosInf",
        upperBoundClosed: true,
      },
    },
    txInfoSignatories: [PUB_KEY_HASH],
    txInfoRedeemers: new Map([[{ Minting: [POLICY_ID] }, 42n]]),
    txInfoData: new Map([[DATUM_HASH, 99n]]),
    txInfoId: TX_ID,
    txInfoVotes: new Map([
      [
        { DRepVoter: [pubKeyCredential] },
        new Map([[governanceActionId, "VoteYes"]]),
      ],
    ]),
    txInfoProposalProcedures: [expectedProposal],
    txInfoCurrentTreasuryAmount: 12_000_000n,
    txInfoTreasuryDonation: null,
  },
  scriptContextRedeemer: 42n,
  scriptContextScriptInfo: { MintingScript: [POLICY_ID] },
} as ScriptContextData;

type EchoTarget =
  | "MintingScript"
  | "SpendingScript"
  | "RewardingScript"
  | "CertifyingScript";

const scriptByTitle = (title: string): Script => {
  const compiledCode = scripts.validators.find(
    (validator) => validator.title === title,
  )?.compiledCode;
  if (!compiledCode) throw new Error(`Missing test script: ${title}`);
  return {
    type: "PlutusV3",
    script: applyDoubleCborEncoding(compiledCode),
  };
};

const echoRedeemer = (target: EchoTarget, purpose: EchoTarget) =>
  Data.to(new Constr(target === purpose ? 0 : 1, []));

const uniqueUtxos = (utxos: UTxO[]): UTxO[] => {
  const seen = new Set<string>();
  return utxos.filter((utxo) => {
    const key = `${utxo.txHash}#${utxo.outputIndex}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

const fixedBudgetEvaluator: EvaluatorAdapter = {
  name: "fixed-budget",
  evaluate: async ({ tx }) => {
    const redeemers = CML.Transaction.from_cbor_hex(tx)
      .witness_set()
      .redeemers();
    if (!redeemers) return [];
    return canonicalRedeemerEntries(redeemers).map(
      (entry): EvalRedeemer => ({
        redeemer_tag: entry.tag,
        redeemer_index: Number(entry.index),
        ex_units: { mem: 50_000_000, steps: 20_000_000_000 },
      }),
    );
  },
};

const evaluateExpectingEchoFailure = (
  tx: CML.Transaction,
  additionalUtxos: UTxO[],
  costModels: CML.CostModels,
  slotConfig: (typeof SLOT_CONFIG_NETWORK)["Custom"],
) => {
  const inputs = additionalUtxos.map(utxoToTransactionInput);
  const outputs = additionalUtxos.map(utxoToTransactionOutput);
  try {
    UPLC.eval_phase_two_raw(
      tx.to_cbor_bytes(),
      inputs.map((input) => input.to_cbor_bytes()),
      outputs.map((output) => output.to_cbor_bytes()),
      costModels.to_cbor_bytes(),
      50_000_000_000n,
      100_000_000n,
      BigInt(slotConfig.zeroTime),
      BigInt(slotConfig.zeroSlot),
      slotConfig.slotLength,
    );
  } catch (error) {
    return error instanceof Error
      ? `${error.message}\n${error.stack ?? ""}`
      : String(error);
  }
  throw new Error("Expected echo validator evaluation to fail.");
};

const extractTrace = (message: string, prefix: string): string => {
  const match = message.match(new RegExp(`${prefix}([0-9A-Fa-f]+)`));
  if (!match) throw new Error(`Missing trace prefix ${prefix}: ${message}`);
  return match[1].toLowerCase();
};

const hashScriptContextCbor = (contextCbor: string): string =>
  CML.hash_plutus_data(CML.PlutusData.from_cbor_hex(contextCbor)).to_hex();

const encodeCborHeader = (major: number, value: number | bigint): string => {
  const n = BigInt(value);
  if (major < 0 || major > 7 || n < 0n || n > MAX_WORD64) {
    throw new Error(`Invalid CBOR header major=${major} value=${value}`);
  }
  const prefix = BigInt(major * 32);
  if (n < 24n) return (prefix + n).toString(16).padStart(2, "0");
  if (n <= 0xffn) {
    return (
      (prefix + 24n).toString(16).padStart(2, "0") +
      n.toString(16).padStart(2, "0")
    );
  }
  if (n <= 0xffffn) {
    return (
      (prefix + 25n).toString(16).padStart(2, "0") +
      n.toString(16).padStart(4, "0")
    );
  }
  if (n <= 0xffffffffn) {
    return (
      (prefix + 26n).toString(16).padStart(2, "0") +
      n.toString(16).padStart(8, "0")
    );
  }
  if (n <= 0xffffffffffffffffn) {
    return (
      (prefix + 27n).toString(16).padStart(2, "0") +
      n.toString(16).padStart(16, "0")
    );
  }
  throw new Error("Unreachable CBOR header value.");
};

const integerToBytes = (value: bigint): string => {
  if (value < 0n) throw new Error("Cannot encode a negative magnitude.");
  if (value === 0n) return "";
  const hex = value.toString(16);
  return hex.length % 2 === 0 ? hex : `0${hex}`;
};

const encodeBytes = (hex: string): string => {
  if (hex.length % 2 !== 0) throw new Error("Byte string hex is not even.");
  const byteLength = hex.length / 2;
  if (byteLength <= 64) return encodeCborHeader(2, byteLength) + hex;
  const chunks: string[] = [];
  for (let offset = 0; offset < hex.length; offset += 128) {
    chunks.push(encodeBytes(hex.slice(offset, offset + 128)));
  }
  return `5f${chunks.join("")}ff`;
};

const encodeInteger = (value: bigint): string => {
  if (value >= 0n && value <= MAX_WORD64) return encodeCborHeader(0, value);
  if (value < 0n && value >= -1n - MAX_WORD64) {
    return encodeCborHeader(1, -1n - value);
  }
  if (value >= 0n) {
    return `${encodeCborHeader(6, 2)}${encodeBytes(integerToBytes(value))}`;
  }
  return `${encodeCborHeader(6, 3)}${encodeBytes(integerToBytes(-1n - value))}`;
};

const encodeList = (items: PlutusData[]): string => {
  if (items.length === 0) return "80";
  return `9f${items.map(builtinSerialiseData).join("")}ff`;
};

const encodeConstructorTag = (index: number): string => {
  if (!Number.isSafeInteger(index)) {
    throw new Error(`Constructor index ${index} is not a safe integer.`);
  }
  const tag = BigInt(index);
  if (tag >= 0n && tag < 7n) return encodeCborHeader(6, 121n + tag);
  if (tag >= 7n && tag < 128n) {
    return encodeCborHeader(6, 1280n + tag - 7n);
  }
  const encodedTag =
    tag >= 0n && tag <= MAX_WORD64
      ? encodeCborHeader(0, tag)
      : encodeInteger(tag);
  return `${encodeCborHeader(6, 102)}${encodeCborHeader(4, 2)}${encodedTag}`;
};

const builtinSerialiseData = (data: PlutusData): string => {
  if (typeof data === "bigint") return encodeInteger(data);
  if (typeof data === "string") {
    return encodeBytes(data.toLowerCase());
  }
  if (data instanceof Constr) {
    return `${encodeConstructorTag(data.index)}${encodeList(data.fields)}`;
  }
  if (data instanceof Array) {
    return encodeList(data);
  }
  if (data instanceof Map) {
    const entries = [...data.entries()]
      .map(
        ([key, value]) =>
          builtinSerialiseData(key) + builtinSerialiseData(value),
      )
      .join("");
    return `${encodeCborHeader(5, data.size)}${entries}`;
  }
  throw new Error("Unsupported ScriptContext data.");
};

const builtinSerialisedContext = (context: ScriptContextData): string =>
  builtinSerialiseData(Data.castTo(context, ScriptContextData));

const scriptInfoName = (context: ScriptContextData): string =>
  Object.keys(context.scriptContextScriptInfo)[0];

const expectHexEqual = (actual: string, expected: string, label: string) => {
  if (actual === expected) return;
  let index = 0;
  while (actual[index] === expected[index]) index += 1;
  throw new Error(
    `${label} mismatch at hex offset ${index}: actual=${actual.slice(
      Math.max(0, index - 80),
      index + 160,
    )} expected=${expected.slice(Math.max(0, index - 80), index + 160)}`,
  );
};

test("builtinSerialiseData encodes Plutus serialiseData edge cases", () => {
  expect(builtinSerialiseData(new Constr(0, []))).toBe("d87980");
  expect(builtinSerialiseData(new Constr(0, [1n, 2n]))).toBe("d8799f0102ff");
  expect(builtinSerialiseData(new Constr(128, []))).toBe("d86682188080");
  expect(builtinSerialiseData("ab".repeat(65))).toBe(
    `5f5840${"ab".repeat(64)}41abff`,
  );
  expect(builtinSerialiseData(1n << 64n)).toBe("c249010000000000000000");
  expect(builtinSerialiseData(-(1n << 64n) - 1n)).toBe(
    "c349010000000000000000",
  );
  expect(
    builtinSerialiseData(
      new Map<PlutusData, PlutusData>([
        [new Constr(1, []), 2n],
        [new Constr(0, []), 1n],
      ]),
    ),
  ).toBe("a2d87a8002d8798001");
});

test("ScriptContextData matches Aiken script_context structure in an emulator transaction", async () => {
  const account = generateEmulatorAccount({ lovelace: 75_000_000_000n });
  const emulator = new Emulator([account], PROTOCOL_PARAMETERS_DEFAULT);
  const lucid = await Lucid(emulator, "Custom");
  lucid.selectWallet.fromSeed(account.seedPhrase);

  const validator = scripts.validators.find(
    (script) =>
      script.title === "script_context_schema.script_context_schema.else",
  )!;
  const scriptContextParam = Data.from(
    Data.to(expectedScriptContext, ScriptContextData),
  );
  const appliedScript = applyParamsToScript(
    applyDoubleCborEncoding(validator.compiledCode),
    [scriptContextParam],
  );
  const mintingPolicy = {
    type: "PlutusV3",
    script: applyDoubleCborEncoding(appliedScript),
  } as const;
  const policyId = mintingPolicyToId(mintingPolicy);
  const unit = policyId + fromText("ScriptContext");

  const signBuilder = await lucid
    .newTx()
    .mintAssets({ [unit]: 1n }, Data.to(42n))
    .attach.MintingPolicy(mintingPolicy)
    .complete();
  const signed = await signBuilder.sign.withWallet().complete();
  const txHash = await signed.submit();

  expect(txHash).toMatch(/^[0-9a-f]{64}$/);
});

test("TxSignBuilder produces a ScriptContext accepted by the Aiken structure checker", async () => {
  const account = generateEmulatorAccount({ lovelace: 75_000_000_000n });
  const emulator = new Emulator([account], PROTOCOL_PARAMETERS_DEFAULT);
  const lucid = await Lucid(emulator, "Custom");
  lucid.selectWallet.fromSeed(account.seedPhrase);

  const mint = {
    type: "PlutusV3",
    script: applyDoubleCborEncoding(
      scripts.validators.find(
        (validator) => validator.title === "simple_mint.mint_policy.mint",
      )!.compiledCode,
    ),
  } as const;
  const policyId = mintingPolicyToId(mint);
  const signBuilder = await lucid
    .newTx()
    .mintAssets(
      { [policyId + fromText("MintWithdraw")]: 1n },
      Data.to(new Constr(0, [1n])),
    )
    .attach.MintingPolicy(mint)
    .complete();
  const scriptContext = signBuilder.toScriptContext({ Minting: [policyId] });

  expect(scriptContext.scriptContextRedeemer).toEqual(new Constr(0, [1n]));
  expect(scriptContext.scriptContextScriptInfo).toEqual({
    MintingScript: [policyId],
  });
  expect([...scriptContext.scriptContextTxInfo.txInfoRedeemers.keys()]).toEqual(
    [{ Minting: [policyId] }],
  );

  const checker = scripts.validators.find(
    (script) =>
      script.title ===
      "script_context_from_builder.script_context_from_builder.else",
  )!;
  const checkerParam = Data.from(Data.to(scriptContext, ScriptContextData));
  const appliedScript = applyParamsToScript(
    applyDoubleCborEncoding(checker.compiledCode),
    [checkerParam],
  );
  const mintingPolicy = {
    type: "PlutusV3",
    script: applyDoubleCborEncoding(appliedScript),
  } as const;
  const checkerPolicyId = mintingPolicyToId(mintingPolicy);
  const unit = checkerPolicyId + fromText("ScriptContext");

  const signed = await lucid
    .newTx()
    .mintAssets({ [unit]: 1n }, Data.to(42n))
    .attach.MintingPolicy(mintingPolicy)
    .complete()
    .then((tx) => tx.sign.withWallet().complete());
  const txHash = await signed.submit();

  expect(txHash).toMatch(/^[0-9a-f]{64}$/);
});

test("TxSignBuilder orders ScriptContexts and redeemers by ledger script purpose order", async () => {
  const account = generateEmulatorAccount({ lovelace: 75_000_000_000n });
  const emulator = new Emulator([account], PROTOCOL_PARAMETERS_DEFAULT);
  const lucid = await Lucid(emulator, "Custom");
  lucid.selectWallet.fromSeed(account.seedPhrase);

  const mint = {
    type: "PlutusV3",
    script: applyDoubleCborEncoding(
      scripts.validators.find(
        (validator) => validator.title === "simple_mint.mint_policy.mint",
      )!.compiledCode,
    ),
  } as const;
  const stake = {
    type: "PlutusV3",
    script: applyDoubleCborEncoding(
      scripts.validators.find(
        (validator) => validator.title === "simple_mint.mint_policy.withdraw",
      )!.compiledCode,
    ),
  } as const;

  const policyId = mintingPolicyToId(mint);
  const rewardAddress = validatorToRewardAddress("Custom", stake);
  const signBuilder = await lucid
    .newTx()
    .mintAssets(
      { [policyId + fromText("MintWithdraw")]: 1n },
      Data.to(new Constr(0, [1n])),
    )
    .withdraw(rewardAddress, 0n, Data.to(new Constr(0, [fromText("1")])))
    .attach.WithdrawalValidator(stake)
    .attach.MintingPolicy(mint)
    .complete();

  const contexts = signBuilder.toScriptContexts();
  expect(
    contexts.map((context) => Object.keys(context.scriptContextScriptInfo)[0]),
  ).toEqual(["MintingScript", "RewardingScript"]);
  expect(
    [...contexts[0].scriptContextTxInfo.txInfoRedeemers.keys()].map(
      (purpose) => Object.keys(purpose)[0],
    ),
  ).toEqual(["Minting", "Rewarding"]);
  expect(contexts[0].scriptContextRedeemer).toEqual(new Constr(0, [1n]));
  expect(contexts[1].scriptContextRedeemer).toEqual(
    new Constr(0, [fromText("1")]),
  );
});

test("TxSignBuilder ScriptContexts match serialized ledger ScriptContexts for complex transactions", async () => {
  const account = generateEmulatorAccount({ lovelace: 75_000_000_000n });
  const emulator = new Emulator([account], PROTOCOL_PARAMETERS_DEFAULT);
  const lucid = await Lucid(emulator, "Custom");
  lucid.selectWallet.fromSeed(account.seedPhrase);

  const echo = scriptByTitle(
    "script_context_echo_hash.script_context_echo_hash.else",
  );
  const walletAddress = await lucid.wallet().address();
  const owner = getAddressDetails(walletAddress).paymentCredential?.hash;
  if (!owner) throw new Error("Missing wallet payment credential.");

  const echoAddress = validatorToAddress("Custom", echo);
  const echoRewardAddress = validatorToRewardAddress("Custom", echo);
  const echoPolicyId = mintingPolicyToId(echo);
  const nativePolicy = scriptFromNative({
    type: "all",
    scripts: [
      { type: "before", slot: NATIVE_POLICY_EXPIRY_SLOT },
      { type: "sig", keyHash: owner },
    ],
  });
  const nativePolicyId = mintingPolicyToId(nativePolicy);
  const units = {
    markerA: nativePolicyId + fromText("CtxMarkerA"),
    markerB: nativePolicyId + fromText("CtxMarkerB"),
    markerC: nativePolicyId + fromText("CtxMarkerC"),
    echoA: echoPolicyId + fromText("CtxEchoA"),
    echoB: echoPolicyId + fromText("CtxEchoB"),
    echoC: echoPolicyId + fromText("CtxEchoC"),
    nativeA: nativePolicyId + fromText("CtxNativeA"),
    nativeB: nativePolicyId + fromText("CtxNativeB"),
  };

  const setup = await lucid
    .newTx()
    .mintAssets({
      [units.markerA]: 1n,
      [units.markerB]: 1n,
      [units.markerC]: 1n,
    })
    .registerStake(echoRewardAddress)
    .pay.ToAddressWithData(
      echoAddress,
      { kind: "inline", value: Data.to(11n) },
      { lovelace: 10_000_000n, [units.markerA]: 1n },
    )
    .pay.ToAddressWithData(
      echoAddress,
      { kind: "inline", value: Data.to(22n) },
      { lovelace: 11_000_000n, [units.markerB]: 1n },
    )
    .pay.ToAddressWithData(
      echoAddress,
      { kind: "inline", value: Data.to(33n) },
      { lovelace: 12_000_000n, [units.markerC]: 1n },
    )
    .pay.ToAddressWithData(
      walletAddress,
      { kind: "inline", value: Data.to(44n) },
      { lovelace: 15_000_000n },
      echo,
    )
    .validTo(emulator.now() + 300_000)
    .attach.MintingPolicy(nativePolicy)
    .addSigner(walletAddress)
    .complete();
  await setup.sign
    .withWallet()
    .complete()
    .then((tx) => tx.submit());
  emulator.awaitBlock(1);

  const rewardState = emulator.chain[echoRewardAddress];
  if (!rewardState?.registeredStake) {
    throw new Error("Echo setup did not register the reward account.");
  }
  rewardState.delegation = {
    poolId: CONSTANTS.EMULATOR_POOL_ID,
    rewards: ECHO_REWARD,
  };

  const scriptInputs = await lucid.utxosAt(echoAddress);
  const walletUtxos = await lucid.wallet().getUtxos();
  const referenceInput = walletUtxos.find(
    (utxo) => utxo.scriptRef?.script === echo.script,
  );
  if (!referenceInput) throw new Error("Missing echo reference script UTxO.");
  const keyRewardAddress = credentialToRewardAddress("Custom", {
    type: "Key",
    hash: "12".repeat(28),
  });
  const costModels = lucid.config().costModels;
  if (!costModels) throw new Error("Missing cost models.");

  for (const target of [
    "MintingScript",
    "SpendingScript",
    "RewardingScript",
    "CertifyingScript",
  ] as const satisfies readonly EchoTarget[]) {
    const signBuilder = await lucid
      .newTx()
      .readFrom([referenceInput])
      .collectFrom(scriptInputs, echoRedeemer(target, "SpendingScript"))
      .mintAssets(
        {
          [units.echoA]: 1n,
          [units.echoB]: 2n,
          [units.echoC]: 3n,
        },
        echoRedeemer(target, "MintingScript"),
      )
      .mintAssets({
        [units.nativeA]: 1n,
        [units.nativeB]: 1n,
      })
      .withdraw(
        echoRewardAddress,
        ECHO_REWARD,
        echoRedeemer(target, "RewardingScript"),
      )
      .register.Stake(keyRewardAddress)
      .deregister.Stake(
        echoRewardAddress,
        echoRedeemer(target, "CertifyingScript"),
      )
      .pay.ToAddressWithData(
        echoAddress,
        { kind: "inline", value: Data.to(55n) },
        { lovelace: 2_500_000n },
      )
      .pay.ToAddressWithData(
        echoAddress,
        { kind: "inline", value: Data.to(66n) },
        { lovelace: 2_600_000n },
      )
      .pay.ToAddress(walletAddress, {
        lovelace: 3_000_000n,
        [units.echoA]: 1n,
        [units.nativeA]: 1n,
      })
      .pay.ToAddress(walletAddress, {
        lovelace: 3_000_000n,
        [units.echoB]: 2n,
        [units.echoC]: 3n,
        [units.nativeB]: 1n,
      })
      .validFrom(emulator.now() - 1_000)
      .validTo(emulator.now() + 300_000)
      .attach.SpendingValidator(echo)
      .attach.MintingPolicy(echo)
      .attach.MintingPolicy(nativePolicy)
      .attach.WithdrawalValidator(echo)
      .attach.CertificateValidator(echo)
      .addSigner(walletAddress)
      .complete({ evaluator: fixedBudgetEvaluator });

    const contexts = signBuilder.toScriptContexts();
    const expectedContext = contexts.find(
      (context) => scriptInfoName(context) === target,
    );
    if (!expectedContext) {
      throw new Error(`Missing generated ScriptContext for ${target}.`);
    }
    const expectedCbor = builtinSerialisedContext(expectedContext);
    const expectedHash = hashScriptContextCbor(expectedCbor);
    const failure = evaluateExpectingEchoFailure(
      signBuilder.toTransaction(),
      uniqueUtxos([...walletUtxos, ...scriptInputs, referenceInput]),
      costModels,
      SLOT_CONFIG_NETWORK.Custom,
    );
    const actualCbor = extractTrace(failure, ECHO_CBO_PREFIX);

    expectHexEqual(actualCbor, expectedCbor, target);
    expect(extractTrace(failure, ECHO_HASH_PREFIX)).toBe(expectedHash);
  }
});
