use aiken/dict
use aiken/list
use aiken/transaction.{Mint, ScriptContext}
use aiken/transaction/value

validator {
  fn mint(_redeemer: Data, context: ScriptContext) -> Bool {
    expect ScriptContext { transaction, purpose: Mint(policy) } = context
    let quantities =
      transaction.mint
        |> value.from_minted_value
        |> value.tokens(policy)
        |> dict.values
    or {
      list.all(quantities, fn(quantity) { quantity > 0 }),
      list.all(quantities, fn(quantity) { quantity < 0 }),
    }
  }
}
