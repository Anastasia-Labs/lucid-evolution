import { Effect, pipe } from "effect";
import { User } from "../service/EmulatorUser.js";
import { EmulatorInstance } from "../service/EmulatorInstance.js";
import {
  getAddressDetails,
  mintingPolicyToId,
  scriptFromNative,
  unixTimeToSlot,
} from "@evolution-sdk/utils";
import { fromText } from "@evolution-sdk/core-utils";
import { Script } from "@evolution-sdk/core-types";
import { Data } from "@evolution-sdk/plutus";

export const mintInSlotRange = (config: {
  mintingPolicy: Script;
  tokenName: string;
  quantity: bigint;
  currentTime: number;
}) =>
  Effect.gen(function* () {
    const { user } = yield* User;
    const policyId = mintingPolicyToId(config.mintingPolicy);
    const signBuilder = yield* user
      .newTx()
      .mintAssets({
        [policyId + fromText(config.tokenName)]: config.quantity,
      })
      .validTo(config.currentTime + 330000)
      .attach.MintingPolicy(config.mintingPolicy)
      .completeProgram();
    return signBuilder;
  });

export const makeMintingPolicy = (config: { address: string }) =>
  Effect.gen(function* () {
    const { emulator } = yield* EmulatorInstance;
    const { paymentCredential } = getAddressDetails(config.address);
    const { hash } = yield* Effect.fromNullable(paymentCredential);

    return scriptFromNative({
      type: "all",
      scripts: [
        {
          type: "before",
          slot: unixTimeToSlot("Custom", emulator.now() + 360000),
        },
        { type: "sig", keyHash: hash },
      ],
    });
  });

/**
 * Composes a transaction that mints new tokens under a specified minting policy.
 *
 * This function performs the following steps:
 * 1. Creates an initial transaction paying to user's address with inline datum
 * 2. Creates a minting transaction with specified policy, token name and quantity
 * 3. Composes both transactions together
 * 4. Sets validity interval to current time + 30000 milliseconds
 */
export const composeMintAndPay = (config: {
  mintingPolicy: Script;
  tokenName: string;
  quantity: bigint;
  currentTime: number;
}) =>
  Effect.gen(function* () {
    const { user } = yield* User;
    const addr = yield* Effect.promise(() => user.wallet().address());
    const txCompA = user
      .newTx()
      .pay.ToAddressWithData(addr, { kind: "inline", value: Data.to(0n) }, {});

    const policyId = mintingPolicyToId(config.mintingPolicy);
    const txCompB = user
      .newTx()
      .mintAssets({
        [policyId + fromText(config.tokenName)]: config.quantity,
      })
      .validTo(config.currentTime + 30000)
      .attach.MintingPolicy(config.mintingPolicy);
    const tx = user.newTx().compose(txCompA).compose(txCompB);
    const signBuilder = yield* tx.completeProgram();
    return signBuilder;
  });

export const composeMintAndStake = (config: {
  mintingPolicy: Script;
  tokenName: string;
  quantity: bigint;
  currentTime: number;
}) =>
  Effect.gen(function* () {
    const { emulator } = yield* EmulatorInstance;
    const { user } = yield* User;
    const addr = yield* Effect.promise(() => user.wallet().address());
    const txCompA = user
      .newTx()
      .pay.ToAddressWithData(addr, { kind: "inline", value: Data.to(0n) }, {});

    const policyId = mintingPolicyToId(config.mintingPolicy);
    const txCompB = user
      .newTx()
      .mintAssets({
        [policyId + fromText("Wow")]: 123n,
      })
      .validTo(emulator.now() + 30000)
      .attach.MintingPolicy(config.mintingPolicy);
    const rewardAddress = yield* pipe(
      Effect.promise(() => user.wallet().rewardAddress()),
      Effect.andThen(Effect.fromNullable),
    );
    const txCompC = user.newTx().registerStake(rewardAddress);
    const tx = user.newTx().compose(txCompA).compose(txCompB).compose(txCompC);
    const signBuilder = yield* tx.completeProgram();
    return signBuilder;
  });
