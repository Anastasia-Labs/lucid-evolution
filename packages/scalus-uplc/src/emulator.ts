import {
  Address,
  Assets,
  Credential,
  Datum,
  DatumHash,
  Delegation,
  EvalRedeemer,
  EvaluatorAdapter,
  Lovelace,
  OutRef,
  OutputData,
  PoolId,
  ProtocolParameters,
  Provider,
  RewardAccountState,
  RewardAddress,
  Script,
  Transaction,
  TransactionStatus,
  TransactionStatusOptions,
  TxHash,
  Unit,
  UnixTime,
  UTxO,
} from "@lucid-evolution/core-types";
import { fromHex, toHex, withCMLScope } from "@lucid-evolution/core-utils";
import * as CML from "@lucid-evolution/cml";
import * as scalus from "scalus";
import { mapScalusTag, toScalusUtxo } from "./convert.js";

const EMULATOR_PROVIDER_BRAND = Symbol.for(
  "@lucid-evolution/provider/Emulator",
);
const GENESIS_HASH = "00".repeat(32);
const SLOTS_PER_BLOCK = 20;

const blockOf = (slot: number): number => Math.floor(slot / SLOTS_PER_BLOCK);

/** A genesis account; `generateEmulatorAccount` of Lucid returns one. */
export type ScalusEmulatorAccount = {
  address: Address;
  assets: Assets;
  outputData?: OutputData;
};

export type ScalusEmulatorOptions = {
  /** Bech32 pool ids to register at start. */
  pools?: PoolId[];
};

/** Lucid parameter names against Scalus ones. */
const PARAMETER_NAMES = [
  ["minFeeA", "txFeePerByte"],
  ["minFeeB", "txFeeFixed"],
  ["maxTxSize", "maxTxSize"],
  ["maxValSize", "maxValueSize"],
  ["keyDeposit", "stakeAddressDeposit"],
  ["poolDeposit", "stakePoolDeposit"],
  ["drepDeposit", "dRepDeposit"],
  ["govActionDeposit", "govActionDeposit"],
  ["priceMem", "priceMemory"],
  ["priceStep", "priceSteps"],
  ["maxTxExMem", "maxTxExecutionMemory"],
  ["maxTxExSteps", "maxTxExecutionSteps"],
  ["coinsPerUtxoByte", "utxoCostPerByte"],
  ["collateralPercentage", "collateralPercentage"],
  ["maxCollateralInputs", "maxCollateralInputs"],
  ["minFeeRefScriptCostPerByte", "minFeeRefScriptCostPerByte"],
  ["protocolMajorVersion", "protocolMajorVersion"],
  ["costModels", "costModels"],
] as const satisfies readonly (readonly [
  keyof ProtocolParameters,
  keyof scalus.ProtocolParamsLike,
])[];

/** As the Lucid Emulator assumes, when the parameters carry no version. */
const DEFAULT_PROTOCOL_MAJOR_VERSION = 11;

const toScalusParameters = (
  parameters: ProtocolParameters,
): Partial<scalus.ProtocolParamsLike> => {
  const withVersion = {
    ...parameters,
    protocolMajorVersion:
      parameters.protocolMajorVersion ?? DEFAULT_PROTOCOL_MAJOR_VERSION,
  };
  return Object.fromEntries(
    PARAMETER_NAMES.map(([lucid, scalus]) => [scalus, withVersion[lucid]]),
  );
};

const fromScalusParameters = (
  parameters: scalus.ProtocolParams,
): ProtocolParameters =>
  Object.fromEntries(
    PARAMETER_NAMES.map(([lucid, scalus]) => [lucid, parameters[scalus]]),
  ) as ProtocolParameters;

/** The protocol parameters of the Scalus preset for `network`. */
export const protocolParameters = (
  network: "Mainnet" | "Preprod" | "Preview",
): ProtocolParameters =>
  fromScalusParameters(cardanoInfo(network).protocolParams);

const cardanoInfo = (network: "Mainnet" | "Preprod" | "Preview") =>
  ({
    Mainnet: scalus.CardanoInfo.mainnet,
    Preprod: scalus.CardanoInfo.preprod,
    Preview: scalus.CardanoInfo.preview,
  })[network]();

const toFilter = (
  addressOrCredential: Address | Credential,
): scalus.UtxoFilter =>
  typeof addressOrCredential === "string"
    ? { address: addressOrCredential }
    : {
        paymentCredential: addressOrCredential.hash,
        paymentCredentialType:
          addressOrCredential.type === "Key" ? "key" : "script",
      };

const toBech32PoolId = (poolKeyHash: string): PoolId =>
  withCMLScope((own) =>
    own(CML.Ed25519KeyHash.from_hex(poolKeyHash)).to_bech32("pool"),
  );

const poolRegistrations = ({ pools = [] }: ScalusEmulatorOptions) =>
  pools.map((poolId) => ({
    poolId: withCMLScope((own) =>
      own(CML.Ed25519KeyHash.from_bech32(poolId)).to_hex(),
    ),
  }));

const datumHash = (datum: Datum): DatumHash =>
  withCMLScope((own) =>
    own(
      CML.hash_plutus_data(own(CML.PlutusData.from_cbor_hex(datum))),
    ).to_hex(),
  );

const fromScalusUtxo = (utxo: scalus.Utxo): UTxO => {
  const {
    txHash,
    outputIndex,
    address,
    value,
    datumHash: hash,
    inlineDatum,
    script,
  } = utxo.toObject();
  if (script?.type === "PlutusV4")
    throw new Error(
      `UTxO ${txHash}#${outputIndex} carries a PlutusV4 script, which Lucid has no script type for.`,
    );
  const assets: Assets = { lovelace: value.coin };
  for (const { unit, quantity } of value.assets) assets[unit] = quantity;
  return {
    txHash,
    outputIndex,
    address,
    assets,
    // An absent field is undefined, as Lucid's own providers return it.
    datumHash: hash,
    datum: inlineDatum && toHex(inlineDatum),
    scriptRef: script as Script | undefined,
  };
};

const genesisUtxo = (
  { address, assets, outputData }: ScalusEmulatorAccount,
  outputIndex: number,
): UTxO => {
  if (
    [outputData?.hash, outputData?.asHash, outputData?.inline].filter(Boolean)
      .length > 1
  )
    throw new Error(
      "Not allowed to set hash, asHash and inline at the same time.",
    );
  return {
    txHash: GENESIS_HASH,
    outputIndex,
    address,
    assets,
    datumHash: outputData?.asHash
      ? datumHash(outputData.asHash)
      : outputData?.hash,
    // With a hash, the datum is only its resolved value; see `datumsOf`.
    datum: outputData?.asHash ?? outputData?.inline,
    scriptRef: outputData?.scriptRef,
  };
};

/**
 * The datum store entries of the UTxOs that carry a datum hash and its datum,
 * so that `getDatum` resolves the hash and Lucid can spend the UTxO.
 */
const datumsOf = (utxos: UTxO[]): scalus.DatumEntry[] =>
  utxos.flatMap(({ datumHash, datum }) =>
    datumHash && datum ? [{ hash: datumHash, datum }] : [],
  );

/** A rejected `submitTx`: the Scalus `SubmitResult` of the rejection. */
export class ScalusEmulatorError extends Error {
  /** The rejecting condition, stable enough to assert on, e.g. `FeesOk`. */
  readonly errorRule: string;
  /** What Scalus reported, in prose. */
  readonly error: string;
  /** Script trace logs, oldest first. */
  readonly logs: string[];

  constructor({ errorRule = "", error = "", logs }: scalus.SubmitResult) {
    super(`${errorRule}: ${error}`);
    this.name = "ScalusEmulatorError";
    this.errorRule = errorRule;
    this.error = error;
    this.logs = logs;
  }
}

/**
 * A Lucid provider over the Scalus ledger emulator, which applies the ledger
 * rules and runs Plutus scripts on submission.
 *
 * `new ScalusEmulator(...)` keeps a manual clock that only `awaitSlot` and
 * `awaitBlock` move, and Lucid takes its time from it, as from the Lucid
 * Emulator. `ScalusEmulator.forNetwork` follows the wall clock instead.
 */
export class ScalusEmulator implements Provider {
  /** The wrapped Scalus emulator. */
  declare readonly scalus: scalus.Emulator;
  /**
   * An evaluator over this emulator's ledger, parameters and clock, for
   * `Lucid(emulator, "Custom", { evaluator: emulator.evaluator })`.
   */
  declare readonly evaluator: EvaluatorAdapter;
  declare private readonly wallClock: boolean;

  constructor(
    accounts: ScalusEmulatorAccount[],
    protocolParameters: ProtocolParameters,
    treasury: Lovelace = 0n,
    options: ScalusEmulatorOptions = {},
  ) {
    const utxos = accounts.map(genesisUtxo);
    const info = scalus.CardanoInfo.custom(
      "testnet",
      new scalus.SlotConfig(Date.now(), 0, 1000),
      scalus.CardanoInfo.preprod().protocolParams,
    );
    ScalusEmulator.init(
      this,
      scalus.Emulator.create(info, {
        utxos: utxos.map((utxo) => toScalusUtxo(scalus, utxo)),
        slot: 0,
        datums: datumsOf(utxos),
        treasury,
        protocolParams: toScalusParameters(protocolParameters),
        poolRegistrations: poolRegistrations(options),
      }),
      false,
    );
  }

  /**
   * An emulator that follows the wall clock, for a test written against a
   * real network: `Lucid(emulator, network)` then builds validity intervals
   * from `Date.now()` and the network's slot configuration, and the ledger
   * moves to the current slot before it evaluates or applies a transaction.
   */
  static forNetwork(
    network: "Mainnet" | "Preprod" | "Preview",
    options: {
      utxos: UTxO[];
      protocolParameters?: ProtocolParameters;
      treasury?: Lovelace;
    } & ScalusEmulatorOptions,
  ): ScalusEmulator {
    const emulator = scalus.Emulator.create(cardanoInfo(network), {
      utxos: options.utxos.map((utxo) => toScalusUtxo(scalus, utxo)),
      datums: datumsOf(options.utxos),
      treasury: options.treasury,
      protocolParams:
        options.protocolParameters &&
        toScalusParameters(options.protocolParameters),
      poolRegistrations: poolRegistrations(options),
      clock: "wall",
    });
    return ScalusEmulator.init(
      Object.create(ScalusEmulator.prototype),
      emulator,
      true,
    );
  }

  private static init(
    target: ScalusEmulator,
    emulator: scalus.Emulator,
    wallClock: boolean,
  ): ScalusEmulator {
    const evaluator: EvaluatorAdapter = {
      name: "scalus-emulator",
      evaluate: ({ tx, additionalUTxOs }) =>
        target.evaluateTx(tx, additionalUTxOs),
    };
    Object.assign(target, { scalus: emulator, evaluator, wallClock });
    // Lucid then takes the slot and the time from this emulator.
    if (!wallClock) Object.assign(target, { [EMULATOR_PROVIDER_BRAND]: true });
    return target;
  }

  /**
   * The current slot.
   *
   * On a wall-clock emulator (`forNetwork`), this is the slot of the last
   * submit or evaluation, or of the construction before the first one, not of
   * the current time. Use `Date.now()` for the current time.
   */
  get slot(): number {
    return this.scalus.getSlot();
  }

  /**
   * The block that holds the current slot, 20 slots a block.
   *
   * On a wall-clock emulator (`forNetwork`), this is the block of the last
   * submit or evaluation, or of the construction before the first one, not of
   * the current time. Use `Date.now()` for the current time.
   */
  get blockHeight(): number {
    return blockOf(this.slot);
  }

  /**
   * The start time of the current slot, in POSIX milliseconds.
   *
   * On a wall-clock emulator (`forNetwork`), this is the slot time of the last
   * submit or evaluation, or of the construction before the first one, not of
   * the current time. Use `Date.now()` for the current time.
   */
  now(): UnixTime {
    return this.scalus.getTime();
  }

  private assertManualClock(): void {
    if (this.wallClock)
      throw new Error("A wall-clock ScalusEmulator follows Date.now().");
  }

  awaitSlot(length = 1): void {
    this.assertManualClock();
    this.scalus.tick(length);
  }

  awaitBlock(height = 1): void {
    this.awaitSlot(height * SLOTS_PER_BLOCK);
  }

  private query(filter: scalus.UtxoFilter): UTxO[] {
    return this.scalus.getUtxos(filter).map(fromScalusUtxo);
  }

  async getUtxos(addressOrCredential: Address | Credential): Promise<UTxO[]> {
    return this.query(toFilter(addressOrCredential));
  }

  async getUtxosWithUnit(
    addressOrCredential: Address | Credential,
    unit: Unit,
  ): Promise<UTxO[]> {
    return this.query({ ...toFilter(addressOrCredential), unit });
  }

  async getUtxosByOutRef(outRefs: OutRef[]): Promise<UTxO[]> {
    return this.query({ outRefs });
  }

  async getUtxoByUnit(unit: Unit): Promise<UTxO> {
    const utxos = this.query({ unit, limit: 2 });
    if (utxos.length > 1)
      throw new Error("Unit needs to be an NFT or only held by one address.");
    return utxos[0];
  }

  async getProtocolParameters(): Promise<ProtocolParameters> {
    return fromScalusParameters(this.scalus.getProtocolParameters());
  }

  async getTreasury(): Promise<bigint> {
    return this.scalus.getTreasury();
  }

  async getDelegation(rewardAddress: RewardAddress): Promise<Delegation> {
    const { poolId, rewards } = this.scalus.getDelegation(rewardAddress);
    return { poolId: poolId ? toBech32PoolId(poolId) : null, rewards };
  }

  async getRewardAccount(
    rewardAddress: RewardAddress,
  ): Promise<RewardAccountState> {
    const account = this.scalus.getAccount(rewardAddress);
    return {
      registered: account !== undefined,
      poolId: account?.poolId ? toBech32PoolId(account.poolId) : null,
      rewards: account?.balance ?? 0n,
    };
  }

  async getDatum(datumHash: DatumHash): Promise<Datum> {
    const datum = this.scalus.getDatum(datumHash);
    return (datum && toHex(datum)) as Datum;
  }

  /** Whether this emulator applied the transaction. Never moves the clock. */
  async awaitTx(txHash: TxHash): Promise<boolean> {
    return this.scalus.hasTx(txHash);
  }

  async getTransactionStatus(
    txHash: TxHash,
    options: TransactionStatusOptions = {},
  ): Promise<TransactionStatus> {
    if (options.signal?.aborted)
      throw options.signal.reason instanceof Error
        ? options.signal.reason
        : new DOMException("The operation was aborted.", "AbortError");
    const applied = this.scalus
      .getAppliedTxs()
      .find((tx) => tx.txHash === txHash);
    if (!applied) return { status: "not_found", txHash };
    const { slot } = applied;
    const blockHeight = blockOf(slot);
    // The wall clock moves the ledger only on submission and evaluation.
    const currentSlot = this.wallClock
      ? Math.max(
          this.slot,
          this.scalus.getCardanoInfo().slotConfig.timeToSlot(Date.now()),
        )
      : this.slot;
    return {
      status: "confirmed",
      txHash,
      confirmation: {
        txHash,
        blockHeight,
        slot,
        confirmations: blockOf(currentSlot) - blockHeight + 1,
      },
    };
  }

  async submitTx(tx: Transaction): Promise<TxHash> {
    const result = this.scalus.submitTx(fromHex(tx));
    if (!result.isSuccess) throw new ScalusEmulatorError(result);
    return result.txHash!;
  }

  /** @throws PlutusScriptEvaluationError from Scalus, when a script fails. */
  async evaluateTx(
    tx: Transaction,
    additionalUTxOs: UTxO[] = [],
  ): Promise<EvalRedeemer[]> {
    return this.scalus
      .evaluateTx(
        fromHex(tx),
        additionalUTxOs.map((utxo) => toScalusUtxo(scalus, utxo)),
      )
      .map(({ tag, index, budget }) => ({
        redeemer_tag: mapScalusTag(tag),
        redeemer_index: index,
        ex_units: { mem: Number(budget.memory), steps: Number(budget.steps) },
      }));
  }

  /**
   * Pays `rewards` to every registered account that delegates to a pool,
   * as an epoch boundary does, then moves one block on.
   */
  distributeRewards(rewards: Lovelace): void {
    this.assertManualClock();
    for (const { rewardAddress, pool } of this.scalus.getStakeDistribution())
      if (pool) this.scalus.addRewards(rewardAddress, rewards);
    this.awaitBlock();
  }

  /** An independent copy of this emulator: ledger, clock and all. */
  snapshot(): ScalusEmulator {
    return ScalusEmulator.init(
      Object.create(ScalusEmulator.prototype),
      this.scalus.snapshot(),
      this.wallClock,
    );
  }

  /**
   * Puts `utxo` into the ledger, with no transaction. For a UTxO with a datum
   * hash and its datum, it also stores the datum, so `getDatum` finds it.
   *
   * @throws Error if the hash of `utxo.datum` is not `utxo.datumHash`.
   */
  addUtxo(utxo: UTxO): void {
    const { txHash, outputIndex, datumHash: hash, datum } = utxo;
    if (datum && hash && this.scalus.addDatum(datum) !== hash)
      throw new Error(
        `The datum of UTxO ${txHash}#${outputIndex} does not match its datum hash ${hash}.`,
      );
    this.scalus.addUtxo(toScalusUtxo(scalus, utxo));
  }
}
