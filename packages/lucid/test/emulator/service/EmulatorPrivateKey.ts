import {
  Emulator,
  EmulatorAccount,
  generateEmulatorAccountFromPrivateKey,
} from "@evolution-sdk/provider";
import { Context, Effect, Layer } from "effect";
import { Lucid } from "../../../src";

const make = Effect.gen(function* () {
  const ACCOUNTS: EmulatorAccount[] = [
    generateEmulatorAccountFromPrivateKey({
      lovelace: 90000000000n,
    }),
  ] as const;
  const emulator: Emulator = new Emulator([ACCOUNTS[0]]);
  const user = yield* Effect.promise(() => Lucid(emulator, "Custom"));
  user.selectWallet.fromPrivateKey(ACCOUNTS[0].privateKey);
  return {
    emulator,
    user,
  };
});

export class EmulatorInstance extends Context.Tag("EmulatorInstance")<
  EmulatorInstance,
  Effect.Effect.Success<typeof make>
>() {
  static readonly layer = Layer.effect(EmulatorInstance, make);
}
