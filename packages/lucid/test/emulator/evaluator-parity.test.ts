import { describe, expect, test } from "vitest";
import { Effect, Layer, pipe } from "effect";
import { createScalusEvaluator } from "@lucid-evolution/scalus-uplc";
import { EvaluationInput, EvaluatorAdapter, Lucid } from "../../src/index.js";
import { HelloContract } from "../specs/services.js";
import { User } from "./service/EmulatorUser.js";
import { EmulatorInstance } from "./service/EmulatorInstance.js";
import { CONSTANTS } from "./Constants.js";
import * as StakeExecutor from "./executor/StakeExecutor.js";
import * as PayExecutor from "./executor/PayExecutor.js";
import * as MintExecutor from "./executor/MintExecutor.js";
import * as HelloExecutor from "./executor/HelloExecutor.js";
import * as HelloFailsExecutor from "./executor/HelloFailsExecutor.js";
import * as GovExecutor from "./executor/GovExecutor.js";
import * as SignExecutor from "./executor/SignExecutor.js";

const AikenEnvironment = pipe(
  Layer.provide(User.layer, EmulatorInstance.layer),
  Layer.merge(EmulatorInstance.layer),
);

const makeCountingScalusEvaluator = (
  evaluated: EvaluationInput[],
): EvaluatorAdapter => {
  const scalus = createScalusEvaluator();
  return {
    name: scalus.name,
    evaluate: async (input) => {
      evaluated.push(input);
      return scalus.evaluate(input);
    },
  };
};

const makeScalusEnvironment = (evaluated: EvaluationInput[]) => {
  const makeScalusSeedUser = Effect.gen(function* () {
    const { emulator, ACCOUNTS } = yield* EmulatorInstance;
    const user = yield* Effect.promise(() =>
      Lucid(emulator, "Custom", {
        evaluator: makeCountingScalusEvaluator(evaluated),
      }),
    );
    user.selectWallet.fromSeed(ACCOUNTS.SEED_ACCOUNTS[0].seedPhrase);
    const getUtxos = Effect.promise(() => user.wallet().getUtxos());
    const rewardAddress = yield* pipe(
      Effect.promise(() => user.wallet().rewardAddress()),
      Effect.andThen(Effect.fromNullable),
    );
    return {
      user,
      getUtxos,
      rewardAddress,
    };
  });

  const ScalusUserLayer = Layer.effect(User, makeScalusSeedUser);

  return pipe(
    Layer.provide(ScalusUserLayer, EmulatorInstance.layer),
    Layer.merge(EmulatorInstance.layer),
  );
};

type ParityCase = {
  name: string;
  program: Effect.Effect<unknown, unknown, User | EmulatorInstance>;
  withHelloContract?: boolean;
  requiresScalusEvaluation?: boolean;
  expectedOutcome?: "Success" | "Failure";
};

const runCase = (
  program: ParityCase["program"],
  environment: Layer.Layer<User | EmulatorInstance>,
  withHelloContract = false,
) =>
  Effect.runPromiseExit(
    withHelloContract
      ? program.pipe(
          Effect.provide(environment),
          Effect.provide(HelloContract.layer),
        )
      : program.pipe(Effect.provide(environment)),
  );

const cases: ParityCase[] = [
  {
    name: "mint tokens with composed transaction",
    program: MintExecutor.mintAndPay(),
  },
  {
    name: "mint tokens and register stake address in one composed transaction",
    program: MintExecutor.mintAndStake(),
  },
  {
    name: "register and then deregister stake address",
    program: Effect.gen(function* () {
      yield* StakeExecutor.registerStake;
      yield* StakeExecutor.deregisterStake;
    }),
  },
  {
    name: "compose transaction with datum hash and inline datum",
    program: PayExecutor.withDatumHashAndInlineDatum,
  },
  {
    name: "mint tokens with correct quantity in valid slot range",
    program: MintExecutor.mintInSlotRange(),
  },
  {
    name: "register stake address",
    program: StakeExecutor.registerStake,
  },
  {
    name: "register script stake address with redeemer",
    program: StakeExecutor.registerScriptStakeWithRedeemer,
    requiresScalusEvaluation: true,
  },
  {
    name: "deposit funds to Hello contract and collect using readFrom",
    program: Effect.gen(function* () {
      yield* HelloExecutor.depositFunds;
      yield* HelloExecutor.collectFromReadFrom;
    }),
    withHelloContract: true,
    requiresScalusEvaluation: true,
  },
  {
    name: "Hello contract collect fails with an incorrect redeemer",
    program: HelloFailsExecutor.collectWithWrongRedeemer,
    withHelloContract: true,
    requiresScalusEvaluation: true,
    expectedOutcome: "Failure",
  },
  {
    name: "delegate to stake pool",
    program: Effect.gen(function* () {
      yield* StakeExecutor.registerStake;
      yield* StakeExecutor.delegateStake;
    }),
  },
  {
    name: "register DRep",
    program: GovExecutor.registerDRep,
  },
  {
    name: "delegate vote to always abstain",
    program: GovExecutor.delegateVoteToAlwaysAbstain,
  },
  {
    name: "register and retire stake pool",
    program: GovExecutor.registerAndRetirePool,
  },
  {
    name: "register, delegate, receive rewards, and withdraw them",
    program: Effect.gen(function* () {
      yield* StakeExecutor.registerStake;
      yield* StakeExecutor.delegateStake;
      yield* StakeExecutor.withdrawRewardAmount({
        rewardAmount: CONSTANTS.REWARD_AMOUNT,
      });
    }),
  },
  {
    name: "register, delegate, receive rewards, and withdraw 0 rewards",
    program: Effect.gen(function* () {
      yield* StakeExecutor.registerStake;
      yield* StakeExecutor.delegateStake;
      yield* StakeExecutor.withdrawRewardAmount({
        rewardAmount: 0n,
      });
    }),
  },
  {
    name: "send all funds to Hello contract",
    program: PayExecutor.sendAllFund,
    withHelloContract: true,
  },
  {
    name: "compose multiple transactions",
    program: PayExecutor.multiTxCompose,
  },
  {
    name: "compose mint and pay transactions",
    program: PayExecutor.mintAndPayTxCompose,
    requiresScalusEvaluation: true,
  },
  {
    name: "verify message",
    program: SignExecutor.verifySignedMessage,
  },
  {
    name: "verify add signer key",
    program: SignExecutor.verifyAddSignerKey,
  },
];

describe("emulator evaluator parity", () => {
  test.each(cases)(
    "$name has the same outcome with Aiken and Scalus evaluators",
    async ({
      program,
      expectedOutcome,
      requiresScalusEvaluation,
      withHelloContract,
    }) => {
      const scalusEvaluations: EvaluationInput[] = [];
      const aiken = await runCase(program, AikenEnvironment, withHelloContract);
      const scalus = await runCase(
        program,
        makeScalusEnvironment(scalusEvaluations),
        withHelloContract,
      );

      expect(scalus._tag).toBe(aiken._tag);
      if (expectedOutcome) {
        expect(aiken._tag).toBe(expectedOutcome);
      }
      if (requiresScalusEvaluation) {
        expect(scalusEvaluations.length).toBeGreaterThan(0);
      }
    },
  );
});
