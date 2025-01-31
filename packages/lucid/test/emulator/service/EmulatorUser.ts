import { Effect, Layer, pipe } from "effect";
import { Lucid, LucidEvolution, UTxO } from "../../../src/index.js";
import { EmulatorInstance } from "./EmulatorInstance.js";

/**
 * Creates a new Lucid user instance connected to the emulator
 * using the first account's seed phrase from the emulator instance.
 */
const makeSeedUser = Effect.gen(function* () {
  const { emulator, ACCOUNTS } = yield* EmulatorInstance;
  const user = yield* Effect.promise(() => Lucid(emulator, "Custom"));
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

const makePrivateKeyUser = Effect.gen(function* () {
  const { emulator, ACCOUNTS } = yield* EmulatorInstance;
  const user = yield* Effect.promise(() => Lucid(emulator, "Custom"));
  user.selectWallet.fromPrivateKey(ACCOUNTS.PRIVATE_KEY_ACCOUNTS[0].privateKey);
  const getUtxos = Effect.promise(() => user.wallet().getUtxos());
  const rewardAddress = "";
  return {
    user,
    getUtxos,
    rewardAddress,
  };
});

export class User extends Effect.Tag("User")<
  User,
  {
    user: LucidEvolution;
    getUtxos: Effect.Effect<UTxO[]>;
    rewardAddress: string;
  }
>() {
  static readonly layer = Layer.effect(User, makeSeedUser);
  static readonly layerPrivateKeyUser = Layer.effect(User, makePrivateKeyUser);
}
