import {
  PoolId,
  PoolParams,
  Redeemer,
  RewardAddress,
} from "@evolution-sdk/core-types";
import { ERROR_MESSAGE, TxBuilderError } from "../../Errors.js";
import * as TxBuilder from "../TxBuilder.js";
import { Effect, pipe } from "effect";
import {
  toCMLAddress,
  toPartial,
  toV1,
  toV2,
  toV3,
  validateAddressDetails,
} from "./TxUtils.js";
import * as CML from "@anastasia-labs/cardano-multiplatform-lib-nodejs";
import { LucidConfig } from "../../evolution-sdk/LucidEvolution.js";
import { fromText } from "@evolution-sdk/core-utils";
import { TxConfig } from "./Service.js";

export const poolError = (cause: unknown) =>
  new TxBuilderError({ cause: `{ Pool : ${cause} }` });

export const delegateTo = (
  rewardAddress: RewardAddress,
  poolId: PoolId,
  redeemer?: Redeemer,
) =>
  Effect.gen(function* () {
    const { config } = yield* TxConfig;
    const addressDetails = yield* pipe(
      validateAddressDetails(rewardAddress, config.lucidConfig),
      Effect.andThen((address) =>
        address.type !== "Reward"
          ? poolError(ERROR_MESSAGE.MISSING_REWARD_TYPE)
          : Effect.succeed(address),
      ),
    );

    const stakeCredential = yield* pipe(
      Effect.fromNullable(addressDetails.stakeCredential),
      Effect.orElseFail(() =>
        poolError(ERROR_MESSAGE.MISSING_STAKE_CREDENTIAL),
      ),
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
            poolError(ERROR_MESSAGE.MISSING_SCRIPT(stakeCredential.hash)),
          ),
        );
        const handleRedeemer = () =>
          pipe(
            Effect.fromNullable(redeemer),
            Effect.orElseFail(() => poolError(ERROR_MESSAGE.MISSING_REDEEMER)),
          );
        switch (script.type) {
          case "PlutusV1": {
            const red = yield* handleRedeemer();
            config.txBuilder.add_cert(
              certBuilder.plutus_script(
                toPartial(toV1(script.script), red),
                CML.Ed25519KeyHashList.new(),
              ),
            );
            break;
          }

          case "PlutusV2": {
            const red = yield* handleRedeemer();
            config.txBuilder.add_cert(
              certBuilder.plutus_script(
                toPartial(toV2(script.script), red),
                CML.Ed25519KeyHashList.new(),
              ),
            );
            break;
          }

          case "PlutusV3": {
            const red = yield* handleRedeemer();
            config.txBuilder.add_cert(
              certBuilder.plutus_script(
                toPartial(toV3(script.script), red),
                CML.Ed25519KeyHashList.new(),
              ),
            );
            break;
          }
          case "Native": {
            config.txBuilder.add_cert(
              certBuilder.native_script(
                CML.NativeScript.from_cbor_hex(script.script),
                CML.NativeScriptWitnessInfo.assume_signature_count(),
              ),
            );
            break;
          }
        }
      }
    }
  });

/** Register a stake pool. A pool deposit is required. The metadataUrl needs to be hosted already before making the registration. */
export const registerPool = (poolParams: PoolParams) =>
  Effect.gen(function* () {
    const { config } = yield* TxConfig;
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
        Effect.orElseFail(() =>
          poolError(ERROR_MESSAGE.MISSING_STAKE_CREDENTIAL),
        ),
      );
      stakeCredential.type === "Key"
        ? poolOwners.add(CML.Ed25519KeyHash.from_hex(stakeCredential.hash))
        : poolError(ERROR_MESSAGE.SCRIPT_CREDENTIAL_NOT_ALLOWED);
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
              CML.DNSName.from_cbor_hex(fromText(relay.domainName!)),
            ),
          );
          break;
        }
        case "MultiHost": {
          relays.add(
            CML.Relay.new_multi_host_name(
              CML.DNSName.from_cbor_hex(fromText(relay.domainName!)),
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
          catch: (cause) => poolError(cause),
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
