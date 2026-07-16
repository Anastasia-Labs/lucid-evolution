import {
  AwaitTransactionOptions,
  Credential,
  Delegation,
  EvaluatorAdapter,
  Network,
  OutRef,
  PolicyId,
  PrivateKey,
  ProtocolParameters,
  Provider,
  RewardAccountState,
  Slot,
  SlotConfig,
  Transaction,
  TransactionConfirmation,
  TransactionStatus,
  TransactionStatusOptions,
  TxHash,
  Unit,
  UnixTime,
  UTxO,
  Wallet,
  WalletApi,
} from "@lucid-evolution/core-types";
import { CML } from "../core.js";
import { datumOf, metadataOf } from "./utils.js";
import {
  createCostModels,
  PROTOCOL_PARAMETERS_DEFAULT,
} from "@lucid-evolution/utils";
import * as TxBuilder from "../tx-builder/TxBuilder.js";
import * as TxConfig from "../tx-builder/TxConfig.js";
import * as TxSignBuilder from "../tx-sign-builder/TxSignBuilder.js";
import {
  Data,
  slotToBeginUnixTime,
  unixTimeToEnclosingSlot,
} from "@lucid-evolution/plutus";
import {
  makeWalletFromAddress,
  makeWalletFromAPI,
  makeWalletFromPrivateKey,
  makeWalletFromSeed,
} from "@lucid-evolution/wallet";
import { isEmulatorProvider } from "@lucid-evolution/provider";
import { resolveSlotConfig } from "./slotConfig.js";
import { Effect, pipe } from "effect";
import { NullableError } from "../Errors.js";
import {
  awaitTransactionConfirmation,
  getRewardAccount,
  getTransactionStatus,
  getUtxosWithPolicy,
} from "./providerCapabilities.js";

export type LucidEvolution = {
  config: () => Partial<LucidConfig>;
  wallet: () => Wallet;
  overrideUTxOs: (utxos: UTxO[]) => void;
  clearUTxOOverride: () => void;
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
  slotToUnixTime: (slot: Slot) => UnixTime;
  utxosAt: (addressOrCredential: string | Credential) => Promise<UTxO[]>;
  utxosAtWithUnit: (
    addressOrCredential: string | Credential,
    unit: string,
  ) => Promise<UTxO[]>;
  utxosAtWithPolicy: (
    addressOrCredential: string | Credential,
    policyId: PolicyId,
  ) => Promise<UTxO[]>;
  utxoByUnit: (unit: string) => Promise<UTxO>;
  utxosByOutRef: (outRefs: OutRef[]) => Promise<UTxO[]>;
  delegationAt: (rewardAddress: string) => Promise<Delegation>;
  rewardAccountAt: (rewardAddress: string) => Promise<RewardAccountState>;
  transactionStatus: (
    txHash: TxHash,
    options?: TransactionStatusOptions,
  ) => Promise<TransactionStatus>;
  awaitTx: (
    txHash: string,
    checkInterval?: number | undefined,
  ) => Promise<boolean>;
  awaitTxConfirmation: (
    txHash: TxHash,
    options?: AwaitTransactionOptions,
  ) => Promise<TransactionConfirmation>;
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
  evaluator?: EvaluatorAdapter;
  /**
   * Per-instance slot-to-time mapping. Low-level callers that omit it retain
   * the legacy network-table snapshot when constructing a transaction builder.
   */
  slotConfig?: SlotConfig;
};

export type LucidOptions = {
  /**
   * Predefined protocol parameters to use instead of retrieving them from the provider.
   * If not specified, it will fetch the latest protocol parameters from the provider.
   */
  presetProtocolParameters?: ProtocolParameters;
  /**
   * Local phase-two evaluator to use when local UPLC evaluation is enabled.
   * Defaults to the built-in Aiken/WASM-backed evaluator.
   */
  evaluator?: EvaluatorAdapter;
  /** Per-instance slot-to-time mapping. Required for uninitialized Custom networks. */
  slotConfig?: SlotConfig;
};

//TODO: turn this to Effect
export const Lucid = async (
  provider?: Provider | undefined,
  network?: Network,
  options: LucidOptions = {},
): Promise<LucidEvolution> => {
  const slotConfig = resolveSlotConfig(provider, network, options.slotConfig);
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
    evaluator: options.evaluator,
    slotConfig,
  };
  const configuredProvider = (): Provider => {
    if (!config.provider) {
      throw new NullableError({
        message: "Provider is not set in Lucid instance",
      });
    }
    return config.provider;
  };
  return {
    config: () => config,
    wallet: () => config.wallet as Wallet,
    overrideUTxOs: (utxos: UTxO[]) => config.wallet?.overrideUTxOs(utxos),
    clearUTxOOverride: () => config.wallet?.clearUTxOOverride?.(),
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
        const slotConfig = yield* validateNotNullable(
          config.slotConfig,
          "slotConfig is not set in Lucid instance",
        );
        return TxBuilder.makeTxBuilder({
          provider,
          network,
          wallet: config.wallet,
          costModels,
          txbuilderconfig,
          protocolParameters,
          evaluator: config.evaluator,
          slotConfig,
        });
      }).pipe(Effect.runSync),
    fromTx: (tx: Transaction) =>
      TxSignBuilder.makeTxSignBuilder(
        config.wallet,
        CML.Transaction.from_cbor_hex(tx),
        {
          slotConfig: config.slotConfig,
        },
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
    currentSlot: () => {
      if (isEmulatorProvider(config.provider)) return config.provider.slot;
      return pipe(
        validateNotNullable(config.slotConfig, "slotConfig is not set"),
        Effect.map((slotConfig) =>
          unixTimeToEnclosingSlot(Date.now(), slotConfig),
        ),
        Effect.runSync,
      );
    },
    unixTimeToSlot: (unixTime: UnixTime) =>
      pipe(
        validateNotNullable(config.slotConfig, "slotConfig is not set"),
        Effect.map((slotConfig) =>
          unixTimeToEnclosingSlot(unixTime, slotConfig),
        ),
        Effect.runSync,
      ),
    slotToUnixTime: (slot: Slot) =>
      pipe(
        validateNotNullable(config.slotConfig, "slotConfig is not set"),
        Effect.map((slotConfig) => slotToBeginUnixTime(slot, slotConfig)),
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
    utxosAtWithPolicy: (
      addressOrCredential: string | Credential,
      policyId: PolicyId,
    ) =>
      getUtxosWithPolicy(configuredProvider(), addressOrCredential, policyId),
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
    rewardAccountAt: (rewardAddress: string) =>
      getRewardAccount(configuredProvider(), rewardAddress),
    transactionStatus: (txHash: TxHash, options?: TransactionStatusOptions) =>
      getTransactionStatus(configuredProvider(), txHash, options),
    awaitTx: (txHash: TxHash, checkInterval?: number) =>
      pipe(
        validateNotNullableProvider(config.provider),
        Effect.flatMap((provider) =>
          Effect.promise(() => provider.awaitTx(txHash, checkInterval)),
        ),
        Effect.runPromise,
      ),
    awaitTxConfirmation: (txHash: TxHash, options?: AwaitTransactionOptions) =>
      awaitTransactionConfirmation(configuredProvider(), txHash, options),
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
