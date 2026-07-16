import type {
  Address,
  AwaitTransactionOptions,
  Credential,
  PolicyId,
  Provider,
  RewardAccountState,
  RewardAddress,
  TransactionConfirmation,
  TransactionStatus,
  TransactionStatusOptions,
  TxHash,
  UTxO,
} from "@lucid-evolution/core-types";
import { ProviderCapabilityError } from "../Errors.js";

const requireCapability = <T>(
  capability: string,
  implementation: T | undefined,
): T => {
  if (!implementation) throw new ProviderCapabilityError(capability);
  return implementation;
};

const normalizedPolicyId = (policyId: PolicyId): PolicyId => {
  if (!/^[0-9a-f]{56}$/i.test(policyId)) {
    throw new TypeError("policyId must be a 56-character hexadecimal string.");
  }
  return policyId.toLowerCase();
};

export const getUtxosWithPolicy = async (
  provider: Provider,
  addressOrCredential: Address | Credential,
  policyId: PolicyId,
): Promise<UTxO[]> => {
  const normalized = normalizedPolicyId(policyId);
  if (provider.getUtxosWithPolicy) {
    return provider.getUtxosWithPolicy(addressOrCredential, normalized);
  }

  const utxos = await provider.getUtxos(addressOrCredential);
  return utxos.filter((utxo) =>
    Object.entries(utxo.assets).some(
      ([unit, amount]) =>
        unit !== "lovelace" &&
        amount !== 0n &&
        unit.length >= 56 &&
        unit.slice(0, 56).toLowerCase() === normalized,
    ),
  );
};

export const getRewardAccount = async (
  provider: Provider,
  rewardAddress: RewardAddress,
): Promise<RewardAccountState> =>
  await requireCapability(
    "getRewardAccount",
    provider.getRewardAccount?.bind(provider),
  )(rewardAddress);

export const getTransactionStatus = async (
  provider: Provider,
  txHash: TxHash,
  options?: TransactionStatusOptions,
): Promise<TransactionStatus> =>
  await requireCapability(
    "getTransactionStatus",
    provider.getTransactionStatus?.bind(provider),
  )(txHash, options);

const abortError = (signal: AbortSignal): Error =>
  signal.reason instanceof Error
    ? signal.reason
    : new DOMException("The operation was aborted.", "AbortError");

const wait = (milliseconds: number, signal?: AbortSignal): Promise<void> =>
  new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(abortError(signal));
      return;
    }

    const timer = setTimeout(() => {
      signal?.removeEventListener("abort", onAbort);
      resolve();
    }, milliseconds);
    const onAbort = () => {
      clearTimeout(timer);
      signal?.removeEventListener("abort", onAbort);
      reject(abortError(signal!));
    };
    signal?.addEventListener("abort", onAbort, { once: true });
  });

const positiveNumber = (name: string, value: number): number => {
  if (!Number.isFinite(value) || value <= 0) {
    throw new RangeError(`${name} must be a positive finite number.`);
  }
  return value;
};

export const awaitTransactionConfirmation = async (
  provider: Provider,
  txHash: TxHash,
  options: AwaitTransactionOptions = {},
): Promise<TransactionConfirmation> => {
  const getStatus = requireCapability(
    "getTransactionStatus",
    provider.getTransactionStatus?.bind(provider),
  );
  const checkInterval = positiveNumber(
    "checkInterval",
    options.checkInterval ?? 3_000,
  );
  const timeout = positiveNumber("timeout", options.timeout ?? 160_000);
  const minimumConfirmations = positiveNumber(
    "minimumConfirmations",
    options.minimumConfirmations ?? 1,
  );
  if (!Number.isSafeInteger(minimumConfirmations)) {
    throw new RangeError(
      "minimumConfirmations must be a positive safe integer.",
    );
  }

  const timeoutError = () =>
    new Error(`Timed out waiting for transaction ${txHash}.`);
  const deadline = Date.now() + timeout;
  while (true) {
    if (options.signal?.aborted) throw abortError(options.signal);

    const queryTimeRemaining = deadline - Date.now();
    if (queryTimeRemaining <= 0) throw timeoutError();

    const queryController = new AbortController();
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    let onAbort: (() => void) | undefined;
    const queryTimeout = new Promise<never>((_, reject) => {
      timeoutId = setTimeout(() => {
        const error = timeoutError();
        queryController.abort(error);
        reject(error);
      }, queryTimeRemaining);
    });
    const queryAbort = new Promise<never>((_, reject) => {
      if (!options.signal) return;
      onAbort = () => {
        const error = abortError(options.signal!);
        queryController.abort(error);
        reject(error);
      };
      options.signal.addEventListener("abort", onAbort, { once: true });
    });

    let result: TransactionStatus;
    try {
      result = await Promise.race([
        getStatus(txHash, { signal: queryController.signal }),
        queryTimeout,
        queryAbort,
      ]);
    } finally {
      if (timeoutId !== undefined) clearTimeout(timeoutId);
      if (onAbort) options.signal?.removeEventListener("abort", onAbort);
    }
    if (result.status === "failed") {
      throw new Error(`Transaction ${txHash} failed.`, {
        cause: result.reason,
      });
    }
    if (result.status === "confirmed") {
      const confirmations = result.confirmation.confirmations;
      if (
        confirmations === undefined
          ? minimumConfirmations === 1
          : confirmations >= minimumConfirmations
      ) {
        return result.confirmation;
      }
    }

    const remaining = deadline - Date.now();
    if (remaining <= 0) {
      throw timeoutError();
    }
    await wait(Math.min(checkInterval, remaining), options.signal);
  }
};
