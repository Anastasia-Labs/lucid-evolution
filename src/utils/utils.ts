import * as CML from "@dcspark/cardano-multiplatform-lib-nodejs";
import { Lucid, TxComplete } from "../lucid/mod.js";
import { generateMnemonic } from "../misc/bip39.js";
import { crc8 } from "../misc/crc8.js";
import { Data } from "../plutus/data.js";
import {
  SLOT_CONFIG_NETWORK,
  slotToBeginUnixTime,
  unixTimeToEnclosingSlot,
} from "../plutus/time.js";
import type {
  Address,
  AddressDetails,
  Assets,
  CertificateValidator,
  Credential,
  Datum,
  DatumHash,
  Exact,
  KeyHash,
  MintingPolicy,
  NativeScript,
  Network,
  OutRef,
  PolicyId,
  PrivateKey,
  PublicKey,
  RewardAddress,
  Script,
  ScriptHash,
  Slot,
  SpendingValidator,
  TxOutput,
  Unit,
  UnixTime,
  UTxO,
  Validator,
  WithdrawalValidator,
} from "../types/mod.js";

export class Utils {
  private lucid: Lucid;
  constructor(lucid: Lucid) {
    this.lucid = lucid;
  }

  validatorToAddress(
    validator: SpendingValidator,
    stakeCredential?: Credential
  ): Address {
    const validatorHash = this.validatorToScriptHash(validator);
    if (stakeCredential) {
      return CML.BaseAddress.new(
        networkToId(this.lucid.network),
        CML.Credential.new_script(CML.ScriptHash.from_hex(validatorHash)),
        stakeCredential.type === "Key"
          ? CML.Credential.new_pub_key(
              CML.Ed25519KeyHash.from_hex(stakeCredential.hash)
            )
          : CML.Credential.new_script(
              CML.ScriptHash.from_hex(stakeCredential.hash)
            )
      )
        .to_address()
        .to_bech32(undefined);
    } else {
      return CML.EnterpriseAddress.new(
        networkToId(this.lucid.network),
        CML.Credential.new_script(CML.ScriptHash.from_hex(validatorHash))
      )
        .to_address()
        .to_bech32(undefined);
    }
  }

  credentialToAddress(
    paymentCredential: Credential,
    stakeCredential?: Credential
  ): Address {
    if (stakeCredential) {
      return CML.BaseAddress.new(
        networkToId(this.lucid.network),
        paymentCredential.type === "Key"
          ? CML.Credential.new_pub_key(
              CML.Ed25519KeyHash.from_hex(paymentCredential.hash)
            )
          : CML.Credential.new_script(
              CML.ScriptHash.from_hex(paymentCredential.hash)
            ),
        stakeCredential.type === "Key"
          ? CML.Credential.new_pub_key(
              CML.Ed25519KeyHash.from_hex(stakeCredential.hash)
            )
          : CML.Credential.new_script(
              CML.ScriptHash.from_hex(stakeCredential.hash)
            )
      )
        .to_address()
        .to_bech32(undefined);
    } else {
      return CML.EnterpriseAddress.new(
        networkToId(this.lucid.network),
        paymentCredential.type === "Key"
          ? CML.Credential.new_pub_key(
              CML.Ed25519KeyHash.from_hex(paymentCredential.hash)
            )
          : CML.Credential.new_script(
              CML.ScriptHash.from_hex(paymentCredential.hash)
            )
      )
        .to_address()
        .to_bech32(undefined);
    }
  }

  validatorToRewardAddress(
    validator: CertificateValidator | WithdrawalValidator
  ): RewardAddress {
    const validatorHash = this.validatorToScriptHash(validator);
    return CML.RewardAddress.new(
      networkToId(this.lucid.network),
      CML.Credential.new_script(CML.ScriptHash.from_hex(validatorHash))
    )
      .to_address()
      .to_bech32(undefined);
  }

  credentialToRewardAddress(stakeCredential: Credential): RewardAddress {
    return CML.RewardAddress.new(
      networkToId(this.lucid.network),
      stakeCredential.type === "Key"
        ? CML.Credential.new_pub_key(
            CML.Ed25519KeyHash.from_hex(stakeCredential.hash)
          )
        : CML.Credential.new_script(
            CML.ScriptHash.from_hex(stakeCredential.hash)
          )
    )
      .to_address()
      .to_bech32(undefined);
  }

  validatorToScriptHash(validator: Validator): ScriptHash {
    switch (validator.type) {
      case "Native":
        return CML.NativeScript.from_cbor_hex(validator.script).hash().to_hex();
      case "PlutusV1":
        return CML.PlutusScript.from_v1(
          CML.PlutusV1Script.from_cbor_hex(
            applyDoubleCborEncoding(validator.script)
          )
        )
          .hash()
          .to_hex();
      case "PlutusV2":
        return CML.PlutusScript.from_v2(
          CML.PlutusV2Script.from_cbor_hex(
            applyDoubleCborEncoding(validator.script)
          )
        )
          .hash()
          .to_hex();
      default:
        throw new Error("No variant matched");
    }
  }

  mintingPolicyToId(mintingPolicy: MintingPolicy): PolicyId {
    return this.validatorToScriptHash(mintingPolicy);
  }

  datumToHash(datum: Datum): DatumHash {
    return CML.hash_plutus_data(CML.PlutusData.from_cbor_hex(datum)).to_hex();
  }

  scriptHashToCredential(scriptHash: ScriptHash): Credential {
    return {
      type: "Script",
      hash: scriptHash,
    };
  }

  keyHashToCredential(keyHash: KeyHash): Credential {
    return {
      type: "Key",
      hash: keyHash,
    };
  }

  generatePrivateKey(): PrivateKey {
    return generatePrivateKey();
  }

  generateSeedPhrase(): string {
    return generateSeedPhrase();
  }

  unixTimeToSlot(unixTime: UnixTime): Slot {
    return unixTimeToEnclosingSlot(
      unixTime,
      SLOT_CONFIG_NETWORK[this.lucid.network]
    );
  }

  slotToUnixTime(slot: Slot): UnixTime {
    return slotToBeginUnixTime(slot, SLOT_CONFIG_NETWORK[this.lucid.network]);
  }

  /** Address can be in Bech32 or Hex. */
  getAddressDetails(address: string): AddressDetails {
    return getAddressDetails(address);
  }

  /**
   * Convert a native script from Json to the Hex representation.
   * It follows this Json format: https://github.com/input-output-hk/cardano-node/blob/master/doc/reference/simple-scripts.md
   */
  nativeScriptFromJson(nativeScript: NativeScript): Script {
    return nativeScriptFromJson(nativeScript);
  }
  nativeFromJson(nativeScript: Native): Script {
    return nativeFromJson(nativeScript);
  }

  paymentCredentialOf(address: Address): Credential {
    return paymentCredentialOf(address);
  }

  stakeCredentialOf(rewardAddress: RewardAddress): Credential {
    return stakeCredentialOf(rewardAddress);
  }
}

function addressFromHexOrBech32(address: string): CML.Address {
  try {
    return CML.Address.from_hex(address);
  } catch (_e) {
    try {
      return CML.Address.from_bech32(address);
    } catch (_e) {
      throw new Error("Could not deserialize address.");
    }
  }
}

/** Address can be in Bech32 or Hex. */
export function getAddressDetails(address: string): AddressDetails {
  // Base Address
  try {
    // const parsedAddress = CML.BaseAddress.from_address(
    //   addressFromHexOrBech32(address),
    // )!;
    const parsedAddress = CML.BaseAddress.from_address(
      CML.Address.from_bech32(address)
    )!;
    const paymentCredential: Credential =
      parsedAddress.payment().kind() === 0
        ? {
            type: "Key",
            // hash: toHex(
            //   parsedAddress.payment_cred().to_keyhash()!.to_bytes(),
            // ),
            hash: parsedAddress.payment().as_pub_key()!.to_hex(),
          }
        : {
            type: "Script",
            // hash: toHex(
            //   parsedAddress.payment_cred().to_scripthash()!.to_bytes(),
            // ),
            hash: parsedAddress.payment().as_script()!.to_hex(),
          };
    const stakeCredential: Credential =
      parsedAddress.stake().kind() === 0
        ? // parsedAddress.stake_cred().kind() === 0
          {
            type: "Key",
            hash: parsedAddress.stake().as_pub_key()!.to_hex(),
            // hash: toHex(parsedAddress.stake_cred().to_keyhash()!.to_bytes()),
          }
        : {
            type: "Script",
            // hash: toHex(parsedAddress.stake_cred().to_scripthash()!.to_bytes()),
            hash: parsedAddress.stake().as_script()!.to_hex(),
          };
    return {
      type: "Base",
      networkId: parsedAddress.to_address().network_id(),
      address: {
        bech32: parsedAddress.to_address().to_bech32(undefined),
        // hex: toHex(parsedAddress.to_address().to_bytes()),
        hex: parsedAddress.to_address().to_hex(),
      },
      paymentCredential,
      stakeCredential,
    };
  } catch (_e) {
    /* pass */
  }

  // Enterprise Address
  try {
    // const parsedAddress = CML.EnterpriseAddress.from_address(
    //   addressFromHexOrBech32(address)
    // )!;
    const parsedAddress = CML.EnterpriseAddress.from_address(
      CML.Address.from_bech32(address)
    )!;
    const paymentCredential: Credential =
      parsedAddress.payment().kind() === 0
        ? {
            type: "Key",
            // hash: toHex(parsedAddress.payment_cred().to_keyhash()!.to_bytes()),
            hash: parsedAddress.payment().as_pub_key()!.to_hex(),
          }
        : {
            type: "Script",
            hash:
              // parsedAddress.payment_cred().to_scripthash()!.to_bytes()
              parsedAddress.payment().as_script()!.to_hex(),
          };
    return {
      type: "Enterprise",
      networkId: parsedAddress.to_address().network_id(),
      address: {
        bech32: parsedAddress.to_address().to_bech32(undefined),
        hex: parsedAddress.to_address().to_hex(),
      },
      paymentCredential,
    };
  } catch (_e) {
    /* pass */
  }

  // Pointer Address
  try {
    // const parsedAddress = CML.PointerAddress.from_address(
    //   addressFromHexOrBech32(address)
    // )!;
    const parsedAddress = CML.PointerAddress.from_address(
      CML.Address.from_bech32(address)
    )!;
    const paymentCredential: Credential =
      parsedAddress?.payment().kind() === 0
        ? {
            type: "Key",
            // hash: toHex(parsedAddress.payment_cred().to_keyhash()!.to_bytes()),
            hash: parsedAddress.payment().as_pub_key()!.to_hex(),
          }
        : {
            type: "Script",
            // hash: toHex( parsedAddress.payment_cred().to_scripthash()!.to_bytes()),
            hash: parsedAddress.payment().as_script()!.to_hex(),
          };
    return {
      type: "Pointer",
      networkId: parsedAddress.to_address().network_id(),
      address: {
        bech32: parsedAddress.to_address().to_bech32(undefined),
        // hex: toHex(parsedAddress.to_address().to_bytes()),
        hex: parsedAddress.to_address().to_hex(),
      },
      paymentCredential,
    };
  } catch (_e) {
    /* pass */
  }

  // Reward Address
  try {
    // const parsedAddress = CML.RewardAddress.from_address(
    //   addressFromHexOrBech32(address)
    // )!;
    const parsedAddress = CML.RewardAddress.from_address(
      CML.Address.from_bech32(address)
    )!;
    const stakeCredential: Credential =
      parsedAddress.payment().kind() === 0
        ? {
            type: "Key",
            hash: parsedAddress.payment().as_pub_key()!.to_hex(),
          }
        : {
            type: "Script",
            hash: parsedAddress.payment().as_script()!.to_hex(),
          };
    return {
      type: "Reward",
      networkId: parsedAddress.to_address().network_id(),
      address: {
        bech32: parsedAddress.to_address().to_bech32(undefined),
        // hex: toHex(parsedAddress.to_address().to_bytes()),
        hex: parsedAddress.to_address().to_hex(),
      },
      stakeCredential,
    };
  } catch (_e) {
    /* pass */
  }

  // Limited support for Byron addresses
  try {
    const parsedAddress = ((address: string): CML.ByronAddress => {
      try {
        // return CML.ByronAddress.from_bytes(fromHex(address));
        return CML.ByronAddress.from_cbor_hex(address);
      } catch (_e) {
        try {
          return CML.ByronAddress.from_base58(address);
        } catch (_e) {
          throw new Error("Could not deserialize address.");
        }
      }
    })(address);

    return {
      type: "Byron",
      networkId: parsedAddress.content().network_id(),
      address: {
        bech32: "",
        // hex: toHex(parsedAddress.to_address().to_bytes()),
        hex: parsedAddress.to_address().to_hex(),
      },
    };
  } catch (_e) {
    /* pass */
  }

  throw new Error("No address type matched for: " + address);
}

export function paymentCredentialOf(address: Address): Credential {
  const { paymentCredential } = getAddressDetails(address);
  if (!paymentCredential) {
    throw new Error(
      "The specified address does not contain a payment credential."
    );
  }
  return paymentCredential;
}

export function stakeCredentialOf(rewardAddress: RewardAddress): Credential {
  const { stakeCredential } = getAddressDetails(rewardAddress);
  if (!stakeCredential) {
    throw new Error(
      "The specified address does not contain a stake credential."
    );
  }
  return stakeCredential;
}

export function generatePrivateKey(): PrivateKey {
  return CML.PrivateKey.generate_ed25519().to_bech32();
}

export function generateSeedPhrase(): string {
  return generateMnemonic(256);
}

export function valueToAssets(value: CML.Value): Assets {
  const assets: Assets = {};
  assets["lovelace"] = value.coin();
  const ma = value.multi_asset();
  if (ma) {
    const multiAssets = ma.keys();
    for (let j = 0; j < multiAssets.len(); j++) {
      const policy = multiAssets.get(j);
      const policyAssets = ma.get_assets(policy)!;
      const assetNames = policyAssets.keys();
      for (let k = 0; k < assetNames.len(); k++) {
        const policyAsset = assetNames.get(k);
        const quantity = policyAssets.get(policyAsset)!;
        const unit = policy.to_hex() + policyAsset.to_cbor_hex();
        assets[unit] = quantity;
      }
    }
  }
  return assets;
}

export function assetsToValue(assets: Assets): CML.Value {
  const multiAsset = CML.MultiAsset.new();
  const lovelace = assets["lovelace"];
  const units = Object.keys(assets);
  const policies = Array.from(
    new Set(
      units
        .filter((unit) => unit !== "lovelace")
        .map((unit) => unit.slice(0, 56))
    )
  );
  policies.forEach((policy) => {
    const policyUnits = units.filter((unit) => unit.slice(0, 56) === policy);
    const assetsValue = CML.MapAssetNameToCoin.new();
    policyUnits.forEach((unit) => {
      assetsValue.insert(
        CML.AssetName.from_str(toText(unit.slice(56))),
        BigInt(assets[unit])
      );
    });
    multiAsset.insert_assets(CML.ScriptHash.from_hex(policy), assetsValue);
  });
  return CML.Value.new(lovelace, multiAsset);
}

export function fromScriptRef(scriptRef: CML.Script): Script {
  const kind = scriptRef.kind();
  switch (kind) {
    case 0:
      return {
        type: "Native",
        script: scriptRef.as_native()!.to_cbor_hex(),
      };
    case 1:
      return {
        type: "PlutusV1",
        script: scriptRef.as_plutus_v1()!.to_cbor_hex(),
      };
    case 2:
      return {
        type: "PlutusV2",
        script: scriptRef.as_plutus_v2()!.to_cbor_hex(),
      };
    default:
      throw new Error("No variant matched.");
  }
}

export function toScriptRef(script: Script): CML.Script {
  switch (script.type) {
    case "Native":
      return CML.Script.new_native(
        CML.NativeScript.from_cbor_hex(script.script)
      );
    case "PlutusV1":
      return CML.Script.new_plutus_v1(
        CML.PlutusV1Script.from_cbor_hex(applyDoubleCborEncoding(script.script))
      );
    case "PlutusV2":
      return CML.Script.new_plutus_v2(
        CML.PlutusV2Script.from_cbor_hex(applyDoubleCborEncoding(script.script))
      );
    default:
      throw new Error("No variant matched.");
  }
}

export function utxoToCore(utxo: UTxO): CML.TransactionUnspentOutput {
  const address: CML.Address = (() => {
    try {
      return CML.Address.from_bech32(utxo.address);
    } catch (_e) {
      return CML.ByronAddress.from_base58(utxo.address).to_address();
    }
  })();
  const datumOption = (() => {
    if (utxo.datumHash) {
      return CML.DatumOption.new_hash(CML.DatumHash.from_hex(utxo.datumHash));
    }
    // inline datum
    if (!utxo.datumHash && utxo.datum) {
      return CML.DatumOption.new_datum(
        CML.PlutusData.from_cbor_hex(utxo.datum)
      );
    }
  })();
  const scriptRef = (() => {
    if (utxo.scriptRef) {
      return toScriptRef(utxo.scriptRef);
    }
  })();
  const output = CML.TransactionOutput.new(
    address,
    assetsToValue(utxo.assets),
    datumOption,
    scriptRef
  );

  return CML.TransactionUnspentOutput.new(
    CML.TransactionInput.new(
      CML.TransactionHash.from_hex(utxo.txHash),
      BigInt(utxo.outputIndex)
    ),
    output
  );
}
export function utxosToCores(
  utxos: UTxO[]
): Array<CML.TransactionUnspentOutput> {
  const result: Array<CML.TransactionUnspentOutput> = [];
  utxos.map(utxoToCore).forEach((utxo) => result.push(utxo));
  return result;
}

export function coreToUtxo(coreUtxo: CML.TransactionUnspentOutput): UTxO {
  return {
    ...coreToOutRef(CML.TransactionInput.from_cbor_hex(coreUtxo.to_cbor_hex())),
    ...coreToTxOutput(
      CML.TransactionOutput.from_cbor_hex(coreUtxo.to_cbor_hex())
    ),
  };
}

export function coresToUtxos(
  utxos: Array<CML.TransactionUnspentOutput>
): UTxO[] {
  const result: UTxO[] = [];
  for (let i = 0; i < utxos.length; i++) {
    result.push(coreToUtxo(utxos[i]));
  }
  return result;
}

export function coreToOutRef(input: CML.TransactionInput): OutRef {
  return {
    txHash: input.transaction_id().to_hex(),
    outputIndex: parseInt(input.index().toString()),
  };
}

export function coresToOutRefs(inputs: Array<CML.TransactionInput>): OutRef[] {
  const result: OutRef[] = [];
  for (let i = 0; i < inputs.length; i++) {
    result.push(coreToOutRef(inputs[i]));
  }
  return result;
}

export function coreToTxOutput(output: CML.TransactionOutput): TxOutput {
  return {
    assets: valueToAssets(output.amount()),
    address: output.address().to_bech32(undefined),
    datumHash: output.datum()?.as_hash()?.to_hex(),
    datum: output.datum()?.as_datum()?.to_cbor_hex(),
    scriptRef: output.script_ref() && fromScriptRef(output.script_ref()!),
  };
}

export function coresToTxOutputs(
  outputs: Array<CML.TransactionOutput>
): TxOutput[] {
  const result: TxOutput[] = [];
  for (let i = 0; i < outputs.length; i++) {
    result.push(coreToTxOutput(outputs[i]));
  }
  return result;
}

export function producedUtxosFrom(unsignedTx: TxComplete): UTxO[] {
  const result: UTxO[] = [];
  const hash = unsignedTx.toHash();
  const outputs = unsignedTx.txComplete.body().outputs();
  const outputsArray = new Array<CML.TransactionOutput>(outputs.len()).map(
    (_, index) => outputs.get(index)
  );
  coresToTxOutputs(outputsArray).forEach((output, index) => {
    result.push({
      outputIndex: index,
      txHash: hash,
      ...output,
    });
  });
  return result;
}

export function networkToId(network: Network): number {
  switch (network) {
    case "Preview":
      return 0;
    case "Preprod":
      return 0;
    case "Custom":
      return 0;
    case "Mainnet":
      return 1;
    default:
      throw new Error("Network not found");
  }
}

export function fromHex(hex: string): Uint8Array {
  return Buffer.from(hex, "hex");
}

export function toHex(bytes: Uint8Array): string {
  return Buffer.from(bytes).toString("hex");
}

/** Convert a Hex encoded string to a Utf-8 encoded string. */
export function toText(hex: string): string {
  return Buffer.from(hex).toString("utf8");
}

/** Convert a Utf-8 encoded string to a Hex encoded string. */
export function fromText(text: string): string {
  return Buffer.from(text).toString("hex");
}

export function toPublicKey(privateKey: PrivateKey): PublicKey {
  return CML.PrivateKey.from_bech32(privateKey).to_public().to_bech32();
}

/** Padded number in Hex. */
function checksum(num: string): string {
  return crc8(fromHex(num)).toString(16).padStart(2, "0");
}

export function toLabel(num: number): string {
  if (num < 0 || num > 65535) {
    throw new Error(
      `Label ${num} out of range: min label 1 - max label 65535.`
    );
  }
  const numHex = num.toString(16).padStart(4, "0");
  return "0" + numHex + checksum(numHex) + "0";
}

export function fromLabel(label: string): number | null {
  if (label.length !== 8 || !(label[0] === "0" && label[7] === "0")) {
    return null;
  }
  const numHex = label.slice(1, 5);
  const num = parseInt(numHex, 16);
  const check = label.slice(5, 7);
  return check === checksum(numHex) ? num : null;
}

/**
 * @param name Hex encoded
 */
export function toUnit(
  policyId: PolicyId,
  name?: string | null,
  label?: number | null
): Unit {
  const hexLabel = Number.isInteger(label) ? toLabel(label!) : "";
  const n = name ? name : "";
  if ((n + hexLabel).length > 64) {
    throw new Error("Asset name size exceeds 32 bytes.");
  }
  if (policyId.length !== 56) {
    throw new Error(`Policy id invalid: ${policyId}.`);
  }
  return policyId + hexLabel + n;
}

/**
 * Splits unit into policy id, asset name (entire asset name), name (asset name without label) and label if applicable.
 * name will be returned in Hex.
 */
export function fromUnit(unit: Unit): {
  policyId: PolicyId;
  assetName: string | null;
  name: string | null;
  label: number | null;
} {
  const policyId = unit.slice(0, 56);
  const assetName = unit.slice(56) || null;
  const label = fromLabel(unit.slice(56, 64));
  const name = (() => {
    const hexName = Number.isInteger(label) ? unit.slice(64) : unit.slice(56);
    return hexName || null;
  })();
  return { policyId, assetName, name, label };
}

/**
 * Convert a native script from Json to the Hex representation.
 * It follows this Json format: https://github.com/input-output-hk/cardano-node/blob/master/doc/reference/simple-scripts.md
 */
export function nativeScriptFromJson(nativeScript: NativeScript): Script {
  return {
    type: "Native",
    script: CML.NativeScript.from_json(
      JSON.stringify(nativeScript)
    ).to_cbor_hex(),
  };
}
export function nativeFromJson(nativeScript: Native): Script {
  return {
    type: "Native",
    script: CML.NativeScript.from_json(
      JSON.stringify(nativeScript)
    ).to_cbor_hex(),
  };
}

// export function applyParamsToScript<T extends unknown[] = Data[]>(
//   plutusScript: string,
//   params: Exact<[...T]>,
//   type?: T
// ): string {
//   const p = (type ? Data.castTo<T>(params, type) : params) as Data[];
//   return toHex(
//     CML.apply_params_to_plutus_script(
//       CML.PlutusList.from_bytes(fromHex(Data.to<Data[]>(p))),
//       CML.PlutusScript.from_bytes(
//         fromHex(applyDoubleCborEncoding(plutusScript))
//       )
//     ).to_bytes()
//   );
// }

/** Returns double cbor encoded script. If script is already double cbor encoded it's returned as it is. */
export function applyDoubleCborEncoding(script: string): string {
  try {
    CML.PlutusScript.from_v2(
      CML.PlutusScript.from_v2(
        CML.PlutusV2Script.from_cbor_hex(script)
      ).as_v2()!
    );
    return script;
  } catch (_e) {
    return CML.PlutusScript.from_v2(CML.PlutusV2Script.from_cbor_hex(script))
      .as_v2()!
      .to_cbor_hex();
  }
}

export function addAssets(...assets: Assets[]): Assets {
  return assets.reduce((a, b) => {
    for (const k in b) {
      if (Object.hasOwn(b, k)) {
        a[k] = (a[k] || 0n) + b[k];
      }
    }
    return a;
  }, {});
}
