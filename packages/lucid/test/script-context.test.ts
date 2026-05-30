import { expect, test } from "vitest";
import { Data } from "@lucid-evolution/plutus";
import { applyParamsToScript } from "@lucid-evolution/utils";
import {
  Emulator,
  generateEmulatorAccount,
  Lucid,
  PROTOCOL_PARAMETERS_DEFAULT,
  applyDoubleCborEncoding,
  fromText,
  mintingPolicyToId,
} from "../src/index.js";
import scripts from "./specs/contracts/plutus.json" assert { type: "json" };
import { ScriptContextData } from "./specs/script-context.js";

const PUB_KEY_HASH = "11".repeat(28);
const SCRIPT_HASH = "22".repeat(28);
const TX_ID = "33".repeat(32);
const REF_TX_ID = "44".repeat(32);
const DATUM_HASH = "55".repeat(32);
const POLICY_ID = "66".repeat(28);
const TOKEN_NAME = fromText("SchemaToken");

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
