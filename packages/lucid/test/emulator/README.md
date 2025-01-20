In the context of transaction interactions with contracts, it is crucial to understand the roles of the executor and the builder:

Executor
The executor is responsible for:
Acting as a top-level layer, gathering and supplying external data required for the transaction-building process.
Handling the signing and submission of the transaction.
Confirming the completion of the transaction.
Managing errors during the transaction process, e.g retry logic, logging errors, etc.
Returning contextual information about the transaction, enabling its use in subsequent executions.

Builder
The builder is responsible for:
Constructing the transaction.
Assembling the transaction apis using the data provided by the executor.
Ensuring that all required inputs are correctly fulfilled.