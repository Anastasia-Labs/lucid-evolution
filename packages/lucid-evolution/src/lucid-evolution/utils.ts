import { Json, Provider, UTxO, Unit } from "@anastasia-labs/core-types";
import * as CML from "@dcspark/cardano-multiplatform-lib-nodejs";
import { createCostModels, fromUnit, toUnit } from "@anastasia-labs/utils";
import { Constr, Data } from "@anastasia-labs/plutus";

export async function makeConfigBuilder(
  provider: Provider,
): Promise<CML.TransactionBuilderConfig> {
  const protocolParameters = await provider.getProtocolParameters();
  const txBuilderConfig = CML.TransactionBuilderConfigBuilder.new()
    .fee_algo(
      CML.LinearFee.new(
        BigInt(protocolParameters.minFeeA),
        BigInt(protocolParameters.minFeeB),
      ),
    )
    .coins_per_utxo_byte(protocolParameters.coinsPerUtxoByte)
    .pool_deposit(protocolParameters.poolDeposit)
    .key_deposit(protocolParameters.keyDeposit)
    .max_value_size(protocolParameters.maxValSize)
    .max_tx_size(protocolParameters.maxTxSize)
    .ex_unit_prices(
      CML.ExUnitPrices.new(
        CML.Rational.new(
          BigInt(protocolParameters.priceMem * 100_000_000),
          100_000_000n,
        ),
        CML.Rational.new(
          BigInt(protocolParameters.priceStep * 100_000_000),
          100_000_000n,
        ),
      ),
    )
    .collateral_percentage(protocolParameters.collateralPercentage)
    .max_collateral_inputs(protocolParameters.maxCollateralInputs)
    .cost_models(createCostModels(protocolParameters.costModels))
    .collateral_percentage(protocolParameters.collateralPercentage)
    .max_collateral_inputs(protocolParameters.maxCollateralInputs)
    .build();
  return txBuilderConfig;
}

export const datumOf =
  (provider: Provider) =>
  async <T = Data>(utxo: UTxO, type?: T): Promise<T> => {
    if (!utxo.datum) {
      if (!utxo.datumHash) {
        throw new Error("This UTxO does not have a datum hash.");
      }
      utxo.datum = await provider.getDatum(utxo.datumHash);
    }
    return Data.from<T>(utxo.datum, type);
  };

/** Query CIP-0068 metadata for a specifc asset. */
export const metadataOf =
  (provider: Provider) =>
  async <T = Json>(unit: Unit): Promise<T> => {
    const { policyId, name, label } = fromUnit(unit);
    switch (label) {
      case 222:
      case 333:
      case 444: {
        const utxo = await provider.getUtxoByUnit(toUnit(policyId, name, 100));
        const metadata = (await datumOf(provider)(utxo)) as Constr<Data>;
        return Data.toJson(metadata.fields[0]);
      }
      default:
        throw new Error("No variant matched.");
    }
  };
