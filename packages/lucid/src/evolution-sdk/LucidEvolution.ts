import {
  Credential,
  Delegation,
  Network,
  OutRef,
  PrivateKey,
  ProtocolParameters,
  Provider,
  Transaction,
  TxHash,
  Unit,
  UnixTime,
  UTxO,
  Wallet,
  WalletApi,
} from "@evolution-sdk/core-types";
import { CML } from "../core.js";
import { datumOf, metadataOf } from "./utils.js";
import {
  createCostModels,
  PROTOCOL_PARAMETERS_DEFAULT,
  unixTimeToSlot,
} from "@evolution-sdk/utils";
import * as TxBuilder from "../tx-builder/TxBuilder.js";
import * as TxConfig from "../tx-builder/TxConfig.js";
import * as TxSignBuilder from "../tx-sign-builder/TxSignBuilder.js";
import { Data, SLOT_CONFIG_NETWORK } from "@evolution-sdk/plutus";
import {
  makeWalletFromAddress,
  makeWalletFromAPI,
  makeWalletFromPrivateKey,
  makeWalletFromSeed,
} from "@evolution-sdk/wallet";
import { Emulator } from "@evolution-sdk/provider";
import { Effect, pipe, Data as _Data } from "effect";
import { NullableError, UnauthorizedNetwork } from "../Errors.js";
import { TimeoutExceptionTypeId } from "effect/Cause";

export type LucidEvolution = {
  config: () => Partial<LucidConfig>;
  wallet: () => Wallet;
  overrideUTxOs: (utxos: UTxO[]) => void;
  switchProvider: (provider: Provider) => Promise<void>;
  newTx: () => TxBuilder.TxBuilder;
  fromTx: (tx: Transaction) => TxSignBuilder.TxSignBuilder;
  selectWallet: {
    fromSeed: (
      seed: string,
      options?: {
        addressType?: "Base" | "Enterprise";
        accountIndex?: number;
        password?: string;
      },
    ) => void;
    fromPrivateKey: (privateKey: PrivateKey) => void;
    fromAPI: (walletAPI: WalletApi) => void;
    fromAddress: (address: string, utxos: UTxO[]) => void;
  };
  currentSlot: () => number;
  unixTimeToSlot: (unixTime: UnixTime) => number;
  utxosAt: (addressOrCredential: string | Credential) => Promise<UTxO[]>;
  utxosAtWithUnit: (
    addressOrCredential: string | Credential,
    unit: string,
  ) => Promise<UTxO[]>;
  utxoByUnit: (unit: string) => Promise<UTxO>;
  utxosByOutRef: (outRefs: OutRef[]) => Promise<UTxO[]>;
  delegationAt: (rewardAddress: string) => Promise<Delegation>;
  awaitTx: (
    txHash: string,
    checkInterval?: number | undefined,
  ) => Promise<boolean>;
  datumOf: <T extends Data>(utxo: UTxO, type?: T | undefined) => Promise<T>;
  metadataOf: <T = any>(unit: string) => Promise<T>;
};

export type LucidConfig = {
  provider: Provider;
  network: Network;
  wallet: Wallet | undefined;
  txbuilderconfig: CML.TransactionBuilderConfig;
  costModels: CML.CostModels;
  protocolParameters: ProtocolParameters;
};

type LucidOptions = {
  /**
   * Predefined protocol parameters to use instead of retrieving them from the provider.
   * If not specified, it will fetch the latest protocol parameters from the provider.
   */
  presetProtocolParameters?: ProtocolParameters;
};

//TODO: turn this to Effect
export const Lucid = async (
  provider?: Provider | undefined,
  network?: Network,
  options: LucidOptions = {},
): Promise<LucidEvolution> => {
  const protocolParameters: ProtocolParameters | undefined =
    options.presetProtocolParameters ||
    (await provider?.getProtocolParameters());

  const costModels = protocolParameters
    ? createCostModels(protocolParameters.costModels)
    : undefined;
  const config: Partial<LucidConfig> = {
    provider: provider,
    network: network,
    wallet: undefined,
    costModels: costModels,
    txbuilderconfig:
      protocolParameters && costModels
        ? TxConfig.makeTxConfig(protocolParameters, costModels)
        : undefined,
    protocolParameters,
  };
  if (config.provider && "slot" in config.provider) {
    const emulator: Emulator = config.provider as Emulator;
    Effect.gen(function* () {
      const custom = yield* pipe(
        validateNotNullableNetwork(network),
        // Effect.filterOrFail(
        //   (network) => network === "Custom",
        //   () =>
        //     new UnauthorizedNetwork({
        //       message: `Expected Custom, received ${String(network)}`,
        //     }),
        // ),
      );
      SLOT_CONFIG_NETWORK[custom] = {
        zeroTime: emulator.now(),
        zeroSlot: 0,
        slotLength: 1000,
      };
    }).pipe(Effect.runSync);
  }
  return {
    config: () => config,
    wallet: () => config.wallet as Wallet,
    overrideUTxOs: (utxos: UTxO[]) => config.wallet?.overrideUTxOs(utxos),
    switchProvider: async (provider: Provider) => {
      const protocolParam = await provider.getProtocolParameters();
      const costModels = createCostModels(protocolParam.costModels);
      config.provider = provider;
      config.costModels = costModels;
      config.txbuilderconfig = TxConfig.makeTxConfig(protocolParam, costModels);
      config.protocolParameters = protocolParam;
    },
    newTx: (): TxBuilder.TxBuilder =>
      Effect.gen(function* () {
        const provider = yield* Effect.fromNullable(config.provider);
        const network = yield* Effect.fromNullable(config.network);
        const costModels = yield* validateNotNullable(
          config.costModels,
          "CostModels are not set in Lucid instance",
        );
        const txbuilderconfig = yield* validateNotNullable(
          config.txbuilderconfig,
          "txbuilderconfig is not set in Lucid instance",
        );
        const protocolParameters = yield* validateNotNullable(
          config.protocolParameters,
          "protocolParameters are not set in Lucid instance",
        );
        return TxBuilder.makeTxBuilder({
          provider,
          network,
          wallet: config.wallet,
          costModels,
          txbuilderconfig,
          protocolParameters,
        });
      }).pipe(Effect.runSync),
    fromTx: (tx: Transaction) =>
      TxSignBuilder.makeTxSignBuilder(
        config.wallet,
        CML.Transaction.from_cbor_hex(tx),
      ),
    selectWallet: {
      fromSeed: (
        seed: string,
        options?: {
          addressType?: "Base" | "Enterprise";
          accountIndex?: number;
          password?: string;
        },
      ) =>
        Effect.gen(function* () {
          config.wallet = makeWalletFromSeed(
            yield* validateNotNullableProvider(config.provider),
            yield* validateNotNullableNetwork(network),
            seed,
            options,
          );
        }).pipe(Effect.runSync),
      fromPrivateKey: (privateKey: PrivateKey) =>
        Effect.gen(function* () {
          config.wallet = makeWalletFromPrivateKey(
            yield* validateNotNullableProvider(config.provider),
            yield* validateNotNullableNetwork(network),
            privateKey,
          );
        }).pipe(Effect.runSync),
      fromAPI: (walletAPI: WalletApi) =>
        Effect.gen(function* () {
          config.wallet = makeWalletFromAPI(
            yield* validateNotNullableProvider(config.provider),
            walletAPI,
          );
        }).pipe(Effect.runSync),
      fromAddress: (address: string, utxos: UTxO[]) =>
        Effect.gen(function* () {
          config.wallet = makeWalletFromAddress(
            yield* validateNotNullableProvider(config.provider),
            yield* validateNotNullableNetwork(network),
            address,
            utxos,
          );
        }).pipe(Effect.runSync),
    },
    currentSlot: () =>
      pipe(
        validateNotNullableNetwork(config.network),
        Effect.map((network) => unixTimeToSlot(network, Date.now())),
        Effect.runSync,
      ),
    unixTimeToSlot: (unixTime: UnixTime) =>
      pipe(
        validateNotNullableNetwork(config.network),
        Effect.map((network) => unixTimeToSlot(network, unixTime)),
        Effect.runSync,
      ),
    utxosAt: (addressOrCredential: string | Credential) =>
      pipe(
        validateNotNullableProvider(config.provider),
        Effect.flatMap((provider) =>
          Effect.promise(() => provider.getUtxos(addressOrCredential)),
        ),
        Effect.runPromise,
      ),
    utxosAtWithUnit: (addressOrCredential: string | Credential, unit: Unit) =>
      pipe(
        validateNotNullableProvider(config.provider),
        Effect.flatMap((provider) =>
          Effect.promise(() =>
            provider.getUtxosWithUnit(addressOrCredential, unit),
          ),
        ),
        Effect.runPromise,
      ),
    utxoByUnit: (unit: Unit) =>
      pipe(
        validateNotNullableProvider(config.provider),
        Effect.flatMap((provider) =>
          Effect.promise(() => provider.getUtxoByUnit(unit)),
        ),
        Effect.runPromise,
      ),
    utxosByOutRef: (outRefs: OutRef[]) =>
      pipe(
        validateNotNullableProvider(config.provider),
        Effect.flatMap((provider) =>
          Effect.promise(() => provider.getUtxosByOutRef(outRefs)),
        ),
        Effect.runPromise,
      ),
    delegationAt: (rewardAddress: string) =>
      pipe(
        validateNotNullableProvider(config.provider),
        Effect.flatMap((provider) =>
          Effect.promise(() => provider.getDelegation(rewardAddress)),
        ),
        Effect.runPromise,
      ),
    awaitTx: (txHash: TxHash, checkInterval?: number) =>
      pipe(
        validateNotNullableProvider(config.provider),
        Effect.flatMap((provider) =>
          Effect.promise(() => provider.awaitTx(txHash, checkInterval)),
        ),
        Effect.runPromise,
      ),
    datumOf: <T extends Data>(utxo: UTxO, type?: T | undefined) =>
      pipe(
        validateNotNullableProvider(config.provider),
        Effect.flatMap((provider) =>
          Effect.promise(() => datumOf(provider, utxo, type)),
        ),
        Effect.runPromise,
      ),
    metadataOf: (unit: string) =>
      pipe(
        validateNotNullableProvider(config.provider),
        Effect.flatMap((provider) =>
          Effect.promise(() => metadataOf(provider, unit)),
        ),
        Effect.runPromise,
      ),
  };
};

const validateNotNullable = <T>(value: T | undefined, message: string) =>
  pipe(
    Effect.fromNullable(value),
    Effect.orElseFail(() => new NullableError({ message })),
  );

const validateNotNullableNetwork = (network: Network | undefined) =>
  validateNotNullable(network, "Network is not set in Lucid instance");
const validateNotNullableProvider = (provider: Provider | undefined) =>
  validateNotNullable(provider, "Provider is not set in Lucid instance");
