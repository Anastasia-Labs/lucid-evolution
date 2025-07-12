import { Effect, pipe } from "effect";
import { EmulatorInstance } from "../service/EmulatorInstance.js";
import { User } from "../service/EmulatorUser.js";
import * as MintBuilder from "../builder/MintBuilder.js";
import { mintingPolicyToId } from "@evolution-sdk/utils";
import { fromText } from "@evolution-sdk/core-utils";
import { handleSignSubmitWithoutValidation } from "../../specs/utils.js";

export const mintAndPay = ({ tokenName = "Wow", quantity = 123n } = {}) =>
  Effect.gen(function* () {
    const { emulator } = yield* EmulatorInstance;
    const { user } = yield* User;

    // Setup
    const address = yield* Effect.promise(() => user.wallet().address());
    const mintingPolicy = yield* MintBuilder.makeMintingPolicy({ address });
    const assetId = mintingPolicyToId(mintingPolicy) + fromText(tokenName);
    const currentTime = emulator.now();

    // Action
    yield* pipe(
      MintBuilder.composeMintAndPay({
        mintingPolicy,
        tokenName,
        quantity,
        currentTime,
      }),
      Effect.flatMap(handleSignSubmitWithoutValidation),
    );
    emulator.awaitBlock(1);

    const userUTxOs = yield* User.getUtxos;
    return {
      assetId,
      quantity,
      userUTxOs,
    } as const;
  });

export const mintAndStake = ({ tokenName = "Wow", quantity = 123n } = {}) =>
  Effect.gen(function* () {
    const { emulator } = yield* EmulatorInstance;
    const { user } = yield* User;
    const address = yield* Effect.promise(() => user.wallet().address());
    const mintingPolicy = yield* MintBuilder.makeMintingPolicy({
      address,
    });
    const assetId = mintingPolicyToId(mintingPolicy) + fromText(tokenName);
    const currentTime = emulator.now();
    yield* pipe(
      MintBuilder.composeMintAndStake({
        mintingPolicy,
        tokenName,
        quantity,
        currentTime,
      }),
      Effect.flatMap(handleSignSubmitWithoutValidation),
    );
    emulator.awaitBlock(1);
    const userUTxOs = yield* User.getUtxos;
    return {
      assetId,
      quantity,
      userUTxOs,
    } as const;
  });

export const mintInSlotRange = ({ tokenName = "Wow", quantity = 123n } = {}) =>
  Effect.gen(function* () {
    const { emulator } = yield* EmulatorInstance;
    const { user } = yield* User;
    const address = yield* Effect.promise(() => user.wallet().address());
    const mintingPolicy = yield* MintBuilder.makeMintingPolicy({
      address,
    });
    const assetId = mintingPolicyToId(mintingPolicy) + fromText(tokenName);
    const currentTime = emulator.now();
    yield* pipe(
      MintBuilder.mintInSlotRange({
        mintingPolicy,
        tokenName,
        quantity,
        currentTime,
      }),
      Effect.flatMap(handleSignSubmitWithoutValidation),
    );
    emulator.awaitBlock(1);
    const userUTxOs = yield* User.getUtxos;
    return {
      assetId,
      quantity,
      userUTxOs,
    } as const;
  }).pipe(Effect.orDie);
