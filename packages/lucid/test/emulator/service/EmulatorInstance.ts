import {
  Emulator,
  EmulatorAccount,
  generateEmulatorAccount,
  generateEmulatorAccountFromPrivateKey,
} from "@evolution-sdk/provider";
import { Context, Effect, Layer } from "effect";
import { PROTOCOL_PARAMETERS_DEFAULT } from "../../../src/index.js";

const make = Effect.gen(function* () {
  const SEED_ACCOUNTS: EmulatorAccount[] = [
    generateEmulatorAccount({ lovelace: 75000000000n }),
    generateEmulatorAccount({ lovelace: 80000000000n }),
  ] as const;
  const PRIVATE_KEY_ACCOUNTS: EmulatorAccount[] = [
    generateEmulatorAccountFromPrivateKey({ lovelace: 90000000000n }),
  ] as const;
  const ACCOUNTS = { SEED_ACCOUNTS, PRIVATE_KEY_ACCOUNTS };
  const emulator: Emulator = new Emulator(
    [...SEED_ACCOUNTS, ...PRIVATE_KEY_ACCOUNTS],
    PROTOCOL_PARAMETERS_DEFAULT,
  );
  return {
    emulator,
    ACCOUNTS,
  };
});

export class EmulatorInstance extends Context.Tag("EmulatorInstance")<
  EmulatorInstance,
  Effect.Effect.Success<typeof make>
>() {
  static readonly layer = Layer.effect(EmulatorInstance, make);
}
