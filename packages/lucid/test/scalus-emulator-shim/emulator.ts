import type { Lovelace, ProtocolParameters } from "@lucid-evolution/core-types";
import type { EmulatorAccount } from "@lucid-evolution/provider";
import { ScalusEmulator } from "@lucid-evolution/scalus-uplc/emulator";
import { PROTOCOL_PARAMETERS_DEFAULT } from "@lucid-evolution/utils";

/** ScalusEmulator with Lucid's Emulator signature. */
export class Emulator extends ScalusEmulator {
  constructor(
    accounts: EmulatorAccount[],
    protocolParameters: ProtocolParameters = PROTOCOL_PARAMETERS_DEFAULT,
    treasury: Lovelace = 0n,
  ) {
    super(accounts, protocolParameters, treasury);
  }
}
