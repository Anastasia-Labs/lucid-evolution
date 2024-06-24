import {
  PoolId,
  PoolParams,
  Redeemer,
  RewardAddress,
} from "@lucid-evolution/core-types";
import {
  ERROR_MESSAGE,
  TxBuilderError,
  TxBuilderErrorCause,
} from "../../Errors.js";
import * as TxBuilder from "../TxBuilder.js";
import { Effect, pipe } from "effect";
import {
  toCMLAddress,
  toPartial,
  toV1,
  toV2,
  validateAddressDetails,
} from "./TxUtils.js";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";
import { LucidConfig } from "../../lucid-evolution/LucidEvolution.js";
import { fromText } from "@lucid-evolution/core-utils";

export const poolError = (cause: TxBuilderErrorCause, message?: string) =>
  new TxBuilderError({ cause, module: "Pool", message });

export const delegateTo = (
  config: TxBuilder.TxBuilderConfig,
  rewardAddress: RewardAddress,
  poolId: PoolId,
  redeemer?: Redeemer,
): Effect.Effect<void, TxBuilderError> =>
  Effect.gen(function* () {
    const addressDetails = yield* pipe(
      validateAddressDetails(rewardAddress, config.lucidConfig),
      Effect.andThen((address) =>
        address.type !== "Reward"
          ? poolError("InvalidCredential", "Address type must be Reward type.")
          : Effect.succeed(address),
      ),
    );

    const stakeCredential = yield* pipe(
      Effect.fromNullable(addressDetails.stakeCredential),
      Effect.orElseFail(() => poolError("MissingStakeCredential")),
    );

    switch (stakeCredential.type) {
      case "Key": {
        const credential = CML.Credential.new_pub_key(
          CML.Ed25519KeyHash.from_hex(stakeCredential.hash),
        );
        const certBuilder = CML.SingleCertificateBuilder.new(
          CML.Certificate.new_stake_delegation(
            credential,
            CML.Ed25519KeyHash.from_bech32(poolId),
          ),
        );
        config.txBuilder.add_cert(certBuilder.payment_key());
        break;
      }

      case "Script": {
        const credential = CML.Credential.new_script(
          CML.ScriptHash.from_hex(stakeCredential.hash),
        );
        const certBuilder = CML.SingleCertificateBuilder.new(
          CML.Certificate.new_stake_delegation(
            credential,
            CML.Ed25519KeyHash.from_bech32(poolId),
          ),
        );
        const script = yield* pipe(
          Effect.fromNullable(config.scripts.get(stakeCredential.hash)),
          Effect.orElseFail(() =>
            poolError(
              "MissingScript",
              `No script found, script hash: ${stakeCredential.hash}, consider using attach modules`,
            ),
          ),
        );
        const red = yield* pipe(
          Effect.fromNullable(redeemer),
          Effect.orElseFail(() =>
            poolError("MissingRedeemer", ERROR_MESSAGE.MISSING_REDEEMER),
          ),
        );
        switch (script.type) {
          case "PlutusV1": {
            config.txBuilder.add_cert(
              certBuilder.plutus_script(
                toPartial(toV1(script.script), red),
                CML.Ed25519KeyHashList.new(),
              ),
            );
            break;
          }

          case "PlutusV2": {
            config.txBuilder.add_cert(
              certBuilder.plutus_script(
                toPartial(toV2(script.script), red),
                CML.Ed25519KeyHashList.new(),
              ),
            );
            break;
          }
          case "Native": {
            yield* poolError("NotFound");
            break;
          }
        }
      }
    }
  });

/** Register a stake pool. A pool deposit is required. The metadataUrl needs to be hosted already before making the registration. */
export const registerPool = (
  config: TxBuilder.TxBuilderConfig,
  poolParams: PoolParams,
) =>
  Effect.gen(function* () {
    const poolRegistration = yield* createPoolRegistration(
      poolParams,
      config.lucidConfig,
    );
    const certBuilder = CML.SingleCertificateBuilder.new(
      CML.Certificate.new_pool_registration(poolRegistration.pool_params()),
    );

    config.txBuilder.add_cert(certBuilder.skip_witness());
  });

const createPoolRegistration = (poolParams: PoolParams, lucid: LucidConfig) =>
  Effect.gen(function* () {
    const poolOwners = CML.Ed25519KeyHashList.new();
    for (const owner of poolParams.owners) {
      const addressDetails = yield* validateAddressDetails(owner, lucid);
      const stakeCredential = yield* pipe(
        Effect.fromNullable(addressDetails.stakeCredential),
        Effect.orElseFail(() => poolError("MissingStakeCredential")),
      );
      stakeCredential.type === "Key"
        ? poolOwners.add(CML.Ed25519KeyHash.from_hex(stakeCredential.hash))
        : poolError(
            "InvalidCredential",
            "Only key hashes allowed for pool owners.",
          );
    }
    const metadataHash = yield* getMetadataHash(poolParams.metadataUrl);
    const relays = CML.RelayList.new();
    for (const relay of poolParams.relays) {
      switch (relay.type) {
        case "SingleHostIp": {
          //TODO: missing test
          const ipV4 = relay.ipV4
            ? CML.Ipv4.from_cbor_bytes(
                new Uint8Array(relay.ipV4.split(".").map((b) => parseInt(b))),
              )
            : undefined;
          //TODO: missing test
          const ipV6 = relay.ipV6
            ? CML.Ipv6.from_cbor_hex(relay.ipV6.replaceAll(":", ""))
            : undefined;
          relays.add(CML.Relay.new_single_host_addr(relay.port, ipV4, ipV6));
          break;
        }
        //TODO: missing test
        case "SingleHostDomainName": {
          relays.add(
            CML.Relay.new_single_host_name(
              relay.port,
              CML.DnsName.from_cbor_hex(fromText(relay.domainName!)),
            ),
          );
          break;
        }
        case "MultiHost": {
          relays.add(
            CML.Relay.new_multi_host_name(
              CML.DnsName.from_cbor_hex(fromText(relay.domainName!)),
            ),
          );
          break;
        }
      }
    }
    return CML.PoolRegistration.new(
      CML.PoolParams.new(
        CML.Ed25519KeyHash.from_bech32(poolParams.poolId),
        CML.VRFKeyHash.from_hex(poolParams.vrfKeyHash),
        poolParams.pledge,
        poolParams.cost,
        CML.UnitInterval.new(
          BigInt(poolParams.margin),
          BigInt(poolParams.margin),
        ),
        CML.RewardAddress.from_address(
          yield* toCMLAddress(poolParams.rewardAddress, lucid),
        )!,
        poolOwners,
        relays,
        metadataHash
          ? CML.PoolMetadata.new(
              CML.Url.from_cbor_hex(fromText(poolParams.metadataUrl!)),
              metadataHash,
            )
          : undefined,
      ),
    );
  });

const getMetadataHash = (metadataUrl?: string) =>
  Effect.gen(function* () {
    if (metadataUrl) {
      const metadata = yield* pipe(
        Effect.tryPromise({
          try: () => fetch(metadataUrl),
          catch: (error) => poolError("InvalidMetadata", String(error)),
        }),
        Effect.andThen((resp) => Effect.promise(() => resp.arrayBuffer())),
      );
      const metadataHash = CML.PoolMetadataHash.from_raw_bytes(
        new Uint8Array(metadata),
      );
      return metadataHash;
    } else {
      return null;
    }
  });
