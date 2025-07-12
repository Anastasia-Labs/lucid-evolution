import { ProtocolParameters } from "@evolution-sdk/core-types";
import { CML } from "../core.js";

export const makeTxConfig = (
  protocolParameters: ProtocolParameters,
  costModels: CML.CostModels,
): CML.TransactionBuilderConfig => {
  const exUnitsPrices = CML.ExUnitPrices.new(
    CML.Rational.new(
      BigInt(protocolParameters.priceMem * 100_000_000),
      100_000_000n,
    ),
    CML.Rational.new(
      BigInt(protocolParameters.priceStep * 100_000_000),
      100_000_000n,
    ),
  );
  const txBuilderConfig = CML.TransactionBuilderConfigBuilder.new()
    .fee_algo(
      CML.LinearFee.new(
        BigInt(protocolParameters.minFeeA),
        BigInt(protocolParameters.minFeeB),
        BigInt(protocolParameters.minFeeRefScriptCostPerByte),
      ),
    )
    .coins_per_utxo_byte(protocolParameters.coinsPerUtxoByte)
    .pool_deposit(protocolParameters.poolDeposit)
    .key_deposit(protocolParameters.keyDeposit)
    .max_value_size(protocolParameters.maxValSize)
    .max_tx_size(protocolParameters.maxTxSize)
    .ex_unit_prices(exUnitsPrices)
    .collateral_percentage(protocolParameters.collateralPercentage)
    .max_collateral_inputs(protocolParameters.maxCollateralInputs)
    .cost_models(costModels)
    .collateral_percentage(protocolParameters.collateralPercentage)
    .max_collateral_inputs(protocolParameters.maxCollateralInputs)
    .build();

  return txBuilderConfig;
};
