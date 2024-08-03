import { Config, Context, Effect, Layer, pipe } from "effect";
import { Emulator, Kupmios } from "../src/index.js";
import {
  applyDoubleCborEncoding,
  generateSeedPhrase,
  validatorToAddress,
} from "@lucid-evolution/utils";
import { Assets, SpendingValidator } from "@lucid-evolution/core-types";
import { Lucid, walletFromSeed } from "../../lucid/src/index.js";
import { EmulatorAccount } from "../dist/index.cjs";

export const kupmios = await Effect.gen(function* () {
  const kupo = yield* Config.string("VITE_KUPO_KEY");
  const ogmios = yield* Config.string("VITE_OGMIOS_KEY");
  return new Kupmios(kupo, ogmios);
}).pipe(Effect.runPromise);

export const EMULATOR_ACCOUNT = generateAccount({ lovelace: 75000000000n });
export const EMULATOR_ACCOUNT_1 = generateAccount({ lovelace: 80000000000n });

export const emulator = await Effect.gen(function* () {
  return new Emulator([EMULATOR_ACCOUNT]);
}).pipe(Effect.runPromise);

function generateAccount(assets: Assets): EmulatorAccount {
  const seedPhrase = generateSeedPhrase();
  return {
    seedPhrase,
    address: walletFromSeed(seedPhrase, {
      addressType: "Base",
      accountIndex: 0,
      network: "Custom",
    }).address,
    assets,
  };
}

const makeUser = Effect.gen(function* ($) {
  const user = yield* Effect.tryPromise(() => Lucid(emulator, "Custom"));
  user.selectWallet.fromSeed(EMULATOR_ACCOUNT.seedPhrase);
  console.log(yield* Effect.promise(() => user.wallet().address()));
  return {
    user,
    emulator,
  };
});

export class User extends Context.Tag("User")<
  User,
  Effect.Effect.Success<typeof makeUser>
>() {
  static readonly layer = Layer.effect(User, makeUser);
}
