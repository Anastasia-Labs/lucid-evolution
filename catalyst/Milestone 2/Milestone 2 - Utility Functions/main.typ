// Set the background image for the page
#let image-background = image("images/Background-Carbon-Anastasia-Labs-01.jpg", height: 100%)
#set page(
  background: image-background,
  paper: "a4",
  margin: (left: 20mm, right: 20mm, top: 40mm, bottom: 30mm)
)

// Set default text style
#set text(22pt, font: "Barlow")
#set par(justify: true)
#v(3cm) // Add vertical space

// Center-align the logo
#align(center)[#box(width: 75%, image("images/Logo-Anastasia-Labs-V-Color02.png"))]

#v(1cm)

// Set text style for the report title
#set text(20pt, fill: white)

// Center-align the report title
#align(center)[#strong[Proof of Achievement - Milestone 2]\
#set text(15pt); Augmenting Lucid's Utility Library Functions ]

#v(6cm)

// Set text style for project details
#set text(13pt, fill: white)

// Display project details
#table(
  columns: 2,
  stroke: none,
  [*Project Number*], [1100024],
  [*Project Manager*], [Jonathan Rodriguez],
 
)

// Reset text style to default
#set text(fill: luma(0%))

// Configure the initial page layout
#set page(
  background: none,
  header: [
    // Place the logo in the header
    #place(right, dy: 12pt)[#box(image(height: 75%,"images/Logo-Anastasia-Labs-V-Color01.png"))]
    #line(length: 100%) // Add a line under the header
  ],
  header-ascent: 5%,
  footer: [
    #set text(11pt)
    #line(length: 100%) // Add a line above the footer
    #align(center)[*Anastasia Labs* \ Lucid-Evolution Milestone 1]
  ],
  footer-descent: 20%
)
// #set par(justify: true)
#show link: underline
#show outline.entry.where(level: 1): it => {
  v(12pt, weak: true)
  strong(it)
}

// Initialize page counter
#counter(page).update(0)

#set page(
  footer: [
    #set text(11pt)
    #line(length: 100%) // Add a line above the footer
    #align(center)[*Anastasia Labs* \ Lucid-Evolution Milestone 2]
    #place(right, dy:-7pt)[#counter(page).display("1/1", both: true)]
  ]
)
#v(100pt)

// Configure the outline depth and indentation
#outline(depth:2, indent: 1em)

// Page break
#pagebreak()
#set terms(separator: [: ],hanging-indent: 40pt)
#v(20pt)
/ Project Name: Lucid Evolution: Redefining Off-Chain Transactions in Cardano
/ URL: #link("https://projectcatalyst.io/funds/11/cardano-open-developers/anastasia-labs-lucid-evolution-redefining-off-chain-transactions-in-cardano")[Catalyst Proposal]










// Raw Text settings `text`(Inline Code)
#show raw.where(block: false): box.with(
  fill: luma(230),
  inset: (x: 3pt, y: 0pt),
  outset: (y: 3pt),
  radius: 2pt,
)



// Setting default text config before content
#set text(12pt, font: "Barlow")
#show heading.where(level: 1): set text(rgb("#c41112"))
#show heading.where(level: 2): set text(rgb("#c41112"))
#show heading.where(level: 3): set text(rgb("#c41112"))



// Codeblock settings
#import "@preview/codly:0.1.0": codly-init, codly, disable-codly
#show: codly-init.with()
#codly(
  stroke-width: 0.6pt,
  stroke-color: red,
)


















#v(110pt)
= Introduction
#v(35pt)

Our short-term goal with Lucid Evolution isn't to reinvent the wheel but to make it better. We're focusing on handling side effects, improving error control, offering unsafe, safe, and lazy APIs, and providing safe deserialization schemas. We have implemented an extensive utility function variety and we aim to make it easier for maintainers. 

#pagebreak()





#v(35pt)
== Function Design / Gap Identification
\


After evaluating the legacy lucid library and our initial implementations, we started working on identifying areas that needed enhancements.In this effort, a big portion of the library has been rewritten or created from scratch.

Lucid Evolution is like the legacy Lucid library but with improved APIs, better error handling, more structure, and the latest version of CML. Additionally, we’re planning to introduce an abstraction layer on top, allowing users to select the serialization library that best suits their needs. 

We restructured and refactored the library and have made changes to make We have a modified #link("https://github.com/Anastasia-Labs/lucid-evolution/blob/4abb197edb2641a7bf9ead11b18b2f76038619e1/packages/lucid/src/tx-builder/internal/CompleteTxBuilder.ts#L285")[coinSelection] algorithm, a new #link("https://github.com/Anastasia-Labs/lucid-evolution/blob/4abb197edb2641a7bf9ead11b18b2f76038619e1/packages/lucid/src/tx-builder/TxBuilder.ts")[TxBuilder] with its own function packages.

These can be grouped under 

#box(height: 120pt,
 columns[
   #set par(justify: true)
- #link("https://github.com/Anastasia-Labs/lucid-evolution/blob/4abb197edb2641a7bf9ead11b18b2f76038619e1/packages/lucid/src/tx-builder/internal/Attach.ts")[Attach.ts]
- #link("https://github.com/Anastasia-Labs/lucid-evolution/blob/4abb197edb2641a7bf9ead11b18b2f76038619e1/packages/lucid/src/tx-builder/internal/Collect.ts")[Collect.ts]
- #link("https://github.com/Anastasia-Labs/lucid-evolution/blob/4abb197edb2641a7bf9ead11b18b2f76038619e1/packages/lucid/src/tx-builder/internal/CompleteTxBuilder.ts")[CompleteTxBuilder.ts]
- #link("https://github.com/Anastasia-Labs/lucid-evolution/blob/4abb197edb2641a7bf9ead11b18b2f76038619e1/packages/lucid/src/tx-builder/internal/Governance.ts")[In work-Governance.ts]
- #link("https://github.com/Anastasia-Labs/lucid-evolution/blob/4abb197edb2641a7bf9ead11b18b2f76038619e1/packages/lucid/src/tx-builder/internal/Interval.ts")[Interval.ts]
- #link("https://github.com/Anastasia-Labs/lucid-evolution/blob/4abb197edb2641a7bf9ead11b18b2f76038619e1/packages/lucid/src/tx-builder/internal/Metadata.ts")[Metadata.ts]
- #link("https://github.com/Anastasia-Labs/lucid-evolution/blob/4abb197edb2641a7bf9ead11b18b2f76038619e1/packages/lucid/src/tx-builder/internal/Mint.ts")[Mint.ts]
- #link("https://github.com/Anastasia-Labs/lucid-evolution/blob/4abb197edb2641a7bf9ead11b18b2f76038619e1/packages/lucid/src/tx-builder/internal/Pay.ts")[Pay.ts]
- #link("https://github.com/Anastasia-Labs/lucid-evolution/blob/4abb197edb2641a7bf9ead11b18b2f76038619e1/packages/lucid/src/tx-builder/internal/Pool.ts")[Pool.ts]
- #link("https://github.com/Anastasia-Labs/lucid-evolution/blob/4abb197edb2641a7bf9ead11b18b2f76038619e1/packages/lucid/src/tx-builder/internal/Read.ts")[Read.ts]
- #link("https://github.com/Anastasia-Labs/lucid-evolution/blob/4abb197edb2641a7bf9ead11b18b2f76038619e1/packages/lucid/src/tx-builder/internal/Signer.ts")[Signer.ts]
- #link("https://github.com/Anastasia-Labs/lucid-evolution/blob/4abb197edb2641a7bf9ead11b18b2f76038619e1/packages/lucid/src/tx-builder/internal/Stake.ts")[Stake.ts]
- #link("https://github.com/Anastasia-Labs/lucid-evolution/blob/4abb197edb2641a7bf9ead11b18b2f76038619e1/packages/lucid/src/tx-builder/internal/TxUtils.ts")[TxUtils.ts ]
])




== For example

in order to highlight differences between the evolution library and the legacy lucid library, we can display an example of how the two libraries handle the same transaction submission scenario:

#columns[  
#box(height: 150pt,[
   #figure(
  image(fit: "contain","images/code-snapshots/Snapshot-12-tx-signed-evolution.png"),
  caption: "Lucid Evolution - TxSigned type"
)])

#box(height: 150pt,[
   #figure(
  image(fit: "contain","images/code-snapshots/Snapshot-13-tx-signed-lucid.png"),
  caption: "Lucid - TxSigned class"
)])
]

#pagebreak()
#v(35pt)

== Differences
\
We have adopted an implemented approach method closer to functional programming paradigms. We use `Effect` to handle promises and improve errors and use the latest `CML`.

As it can be seen in one of our #link("https://github.com/Anastasia-Labs/lucid-evolution/releases/tag/%40lucid-evolution%2Flucid%400.2.47")[latest release patch notes (0.2.47)], we are working on enhancing and upgrading the variability of tools and services available for developers using lucid evolution. 

By integrating and updating our compatibility, we are expanding the libraries reach to support different Cardano environments. We have addressed previous issues with TypeScript configuration, improving type declarations and enchancing the provider variability by integrating.

Transaction management saw significant improvements with sophisticated UTXO management, allowing efficient chaining of transactions within a single block. Memory management was optimized minimizing memory leaks and enhancing overall system stability.

These enhancements, reflect our commitment to addressing gaps and improving the library.

We want to create a library that allows, just like our #link("https://github.com/Anastasia-Labs/design-patterns")[design patterns repository], simplification of complex design patterns and giving developers an efficient tool. 

\
\


#pagebreak()

#v(25pt)
= Use Case Scenario
Here's how the Lucid Evolution enabled input indexing could look like, making #link("https://github.com/Anastasia-Labs/design-patterns/blob/main/stake-validator/STAKE-VALIDATOR.md")[Staking Validator Design Pattern] usage a breeze

```ts
withdraw (
  rewardAddress: RewardAddress,
  amount: Lovelace,
  redeemer?: string | RedeemerBuilder,
) => TxBuilder;

// The type which needs to be provided in case you want your redeemer to 
// have input indices but would like lucid to populate them for you 
// after doing the coin selection
export type RedeemerBuilder = {
  makeRedeemer: (inputIndices: bigint[]) => Redeemer;
  inputs: UTxO[];
};

const rdmrBuilder: RedeemerBuilder = {
  makeRedeemer: (inputIndices: bigint[]) => { 
    return Data.to({
    nodeIdxs: inputIndices,
    nodeOutIdxs: outputIndices, // you would have this already
  })},
  inputs: selectedUTxOs // any inputs that you wish to be indexed, the inputs must obviously be spent in the tx
}

const tx = lucid_evolution.
  .newTx()
  .collectFrom(selectUTxOs, redeemer)
  .withdraw(rewardAddress, 0n, rdmrBuilder)
  .attach.SpendingValidator(spend)
  .attach.WithdrawalValidator(stake)
  .completeProgram();
```  

#pagebreak()










#v(150pt)
= Outline Report for Utility Functions per Package 
#v(80pt)
In this following section you will find the utility packages we have under the #link("https://github.com/Anastasia-Labs/lucid-evolution")[lucid-evolution github] page with the following general format:

\

+ Title
+ Description
+ Key Functions
+ Code Snapshot

By clicking on the "GitHub Link" hyperlink you can view the dedicated repository section for the utility function package
#pagebreak()



























#v(35pt)
=== Description
#box(height: 120pt, 
 columns(gutter: 20pt)[
   The `bip39.ts` module implements functions related to BIP39, which defines a way to generate the mnemonic phrase (a series of easy-to-remember words) from a random seed

- This is a partial reimplementation of #link("https://github.com/bitcoinjs/bip39")[BIP39 in Deno]
- We only use the default Wordlist (english)
\ 
\
  #place(dy:20pt)[#table(
  columns: (1fr, 1fr),
  align: center,
  table.header[*Utility Package*][*Directory*],
  [== bip39.ts],[#link("https://github.com/Anastasia-Labs/lucid-evolution/blob/main/packages/bip39/src/bip39.ts")[GitHub Link]])]
])


   



#v(15pt)
#box(height: 425pt,
 columns(gutter: 20pt)[
   #set par(justify: true)
=== Key Functions
==== `mnemonicToEntropy`
Converts a mnemonic phrase back into its original entropy representation
==== `generateMnemonic`
Generates a new mnemonic phrase from random entropy. It can be used to create new wallets or regenerate existing ones from a known entropy source
==== `entropyToMnemonic`
Converts entropy into a mnemonic phrase using a specific wordlist for wallet recovery or setup


=== Code Snapshot
#v(8pt)
#box(height: 300pt,[
   #figure(
  image(fit: "contain", height: 100%, width: 100%,"images/code-snapshots/Snapshot-01-BIP39.png"),
  caption: "Snapshot-01-BIP39"
)])
])

#pagebreak()



































#v(35pt)
=== Description
#box(height: 110pt, 
 columns(gutter: 20pt)[
  The `address.ts` module is used to handle address-related operations within the Lucid Evolution library. Its functions allow the manipulation and conversion of various address types
\ 
\
\
\
\
  #place(dy:5pt)[#table(
  columns: (1fr, 1fr),
  align: center,
  table.header[*Utility Package*][*Directory*],
  [== address.ts],[#link("https://github.com/Anastasia-Labs/lucid-evolution/blob/main/packages/utils/src/address.ts")[GitHub Link]])]
])




#v(15pt)
#box(height: 425pt,
 columns(gutter: 20pt)[
   #set par(justify: true)
=== Key Functions

==== `addressFromHexOrBech32`
Converts an address from either hexadecimal or Bech32 format to a CML Address object

==== `credentialToRewardAddress`

Converts a stake credential into a reward address

==== `validatorToRewardAddress`

Converts a validator (either a certificate or withdrawal validator) into a reward address using the script hash derived from the validator

==== `getAddressDetails`

Extracts and returns detailed information about various address types (Base, Enterprise, Pointer, Reward, Byron), including payment and stake credentials

 
=== Code Snapshot
#box(height: 300pt,[
   #figure(
  image(fit: "contain", height: 100%, width: 100%,"images/code-snapshots/Snapshot-02-Address.png"),
  caption: "Snapshot-02-Address")
  ]
)
])
#pagebreak()























#v(35pt)
=== Description
#box(height: 110pt, 
 columns(gutter: 20pt)[  
The cbor.ts module within Lucid Evolution deals with functionalities related to CBOR (Concise Binary Object Representation), specifically focusing on encoding and decoding operations that adhere to the CBOR standard as defined in RFC 7049

\ 

  #place(dy:20pt)[#table(
  columns: (1fr, 1fr),
  align: center,
  table.header[*Utility Package*][*Directory*],
  [== cbor.ts],[#link("https://github.com/Anastasia-Labs/lucid-evolution/blob/main/packages/utils/src/cbor.ts")[GitHub Link]])]
])


=== Key Functions

==== `applyDoubleCborEncoding`

Implements a double encoding for CBOR bytestrings, which decodes an encoded string twice to ensure correct formatting

#v(25pt)
=== Code Snapshot
#v(15pt)
#box(height: 200pt,[
   #figure(
  image(fit: "contain", height: 100%, width: 100%,"images/code-snapshots/Snapshot-03-cbor.png"),
  caption: "Snapshot-03-Cbor"
)])

#pagebreak()
















































#v(35pt)
=== Description
#box(height: 110pt, 
 columns(gutter: 20pt)[
  The `cost_model.ts` module in Lucid Evolution deals with the configuration and management of cost models related to the execution of Plutus scripts on the blockchain. These cost models are used to in determine the computational and memory costs of running smart contracts
\ 
\ 
\ 
  #place(dy:0pt)[#table(
  columns: (1fr, 1fr),
  align: center,
  table.header[*Utility Package*][*Directory*],
  [== cost_model.ts],[#link("https://github.com/Anastasia-Labs/lucid-evolution/blob/main/packages/utils/src/cost_model.ts")[GitHub Link]])]
])

#v(15pt)
#box(height: 425pt,
 columns(gutter: 20pt)[
   #set par(justify: true)
=== Key Functions

==== `createCostModels`
Constructs a CostModels object that covers the various cost parameters for different versions of the Plutus scripts (PlutusV1, PlutusV2). 

This function populates cost models from predefined settings.

+ Initializes new cost model objects for each Plutus version
+ Iteratively fills these objects with cost data parsed from input parameters
+ Handles the memory management of these operations to prevent leaks and ensure efficiency

=== Code Snapshot
#box(height: 300pt,[
   #figure(
  image(fit: "contain", height: 100%, width: 100%,"images/code-snapshots/Snapshot-04-costmodel.png"),
  caption: "Snapshot-04-Costmodel")
  ]
)
])
#pagebreak()


























#v(35pt)
=== Description
#v(10pt)
#box(height: 110pt, 
 columns(gutter: 20pt)[
  The `credential.ts` module handles the creation and manipulation of credentials within the ecosystem. This module is for constructing addresses and managing their components.
\ 
\ 
\ 
\ 
  #place(dy:20pt)[#table(
  columns: (1fr, 1fr),
  align: center,
  table.header[*Utility Package*][*Directory*],
  [== credential.ts],[#link("https://github.com/Anastasia-Labs/lucid-evolution/blob/main/packages/utils/src/credential.ts")[GitHub Link]])]
])

#v(15pt)
#box(height: 425pt,
 columns(gutter: 20pt)[
   #set par(justify: true)
=== Key Functions

==== `credentialToAddress`
Converts payment and optionally stake credentials into an address

==== `scriptHashToCredential`
Wraps a script hash into a credential object, utilizing its use in other functions requiring a credential format

==== `keyHashToCredential`
Converts a key hash into a credential object, allowing for further operations that require credentials

==== `paymentCredentialOf`
Extracts the payment credential from an address, throwing an error if the address does not contain one

==== `stakeCredentialOf`
Retrieves the stake credential from a reward address

=== Code Snapshot
#box(height: 300pt,[
   #figure(
  image(fit: "contain", height: 100%, width: 100%,"images/code-snapshots/Snapshot-05-Credential.png"),
  caption: "Snapshot-05-Credential")
  ]
)
])
#pagebreak()










#v(35pt)
=== Description
#v(10pt)
#box(height: 110pt, 
 columns(gutter: 20pt)[
  The `datum.ts` module provides functionality for handling Plutus data on the blockchain. Specifically, it includes utilities for converting Plutus data (datum) into a format that is suitable for transaction processing, like generating a hash of the datum
\ 
\ 
\ 
  #place(dy:20pt)[#table(
  columns: (1fr, 1fr),
  align: center,
  table.header[*Utility Package*][*Directory*],
  [== datum.ts],[#link("https://github.com/Anastasia-Labs/lucid-evolution/blob/main/packages/utils/src/datum.ts")[GitHub Link]])]
])


=== Key Functions

==== `datumToHash`
Converts a datum object into its corresponding hash. This hash is used to refer to data stored off-chain.
+ Converts the datum from its CBOR hexadecimal representation to a Plutus data format
+ Uses the CML to calculate the hash of the Plutus data

#v(30pt)
=== Code Snapshot
#box(height: 160pt,[
   #figure(
  image(fit: "contain", height: 100%, width: 100%,"images/code-snapshots/Snapshot-06-Datum.png"),
  caption: "Snapshot-06-Datum")
  ]
)
#pagebreak()

















#v(35pt)
=== Description
#v(10pt)
#box(height: 90pt, 
 columns(gutter: 20pt)[
  The `keys.ts` deals with the generation and conversion of keys which are fundamental for secure transactions
\ 
\ 
\ 
\ 
\ 
  #place(dy:-25pt)[#table(
  columns: (1fr, 1fr),
  align: center,
  table.header[*Utility Package*][*Directory*],
  [== keys.ts],[#link("https://github.com/Anastasia-Labs/lucid-evolution/blob/main/packages/utils/src/keys.ts")[GitHub Link]])]
])

=== Key Functions
#v(5pt)
#box(height: 150pt,
 columns(gutter: 20pt)[
   #set par(justify: true)

==== `generatePrivateKey`
Generates a new private key using the ED25519 cryptographic algorithm. This key is used for signing transactions securely

==== `generateSeedPhrase`
Creates a mnemonic seed phrase based on the BIP39 standard

==== `toPublicKey`
Converts a given private key to its corresponding public key, allowing for the public key to be used in transaction verification without revealing the private key
])

An example of a key private -> public conversion would look like:

```typescript
CML.PrivateKey.from_bech32(privateKey).to_public().to_bech32();
```
#v(10pt)
=== Code Snapshot
#v(10pt)
#box(height: 150pt,[
#figure(
image(fit: "contain", height: 100%, width: 100%,"images/code-snapshots/Snapshot-07-Keys.png"),
caption: "Snapshot-07-Keys")
]
)
#pagebreak()


































#v(35pt)
=== Description
#v(10pt)
#box(height: 110pt, 
 columns(gutter: 20pt)[
  The `native.ts` module handles operations related to Cardano's native scripts, which are used for transaction validation without the execution of Plutus smart contracts. This module provides functionality to convert custom native script objects into Cardano's native script format
\ 
\ 
\ 
\ 
  #place(dy:-10pt)[#table(
  columns: (1fr, 1fr),
  align: center,
  table.header[*Utility Package*][*Directory*],
  [== native.ts],[#link("https://github.com/Anastasia-Labs/lucid-evolution/blob/main/packages/utils/src/native.ts")[GitHub Link]])]
])

#v(15pt)
#box(height: 385pt,
 columns(gutter: 20pt)[
   #set par(justify: true)
=== Key Functions

==== `toNativeScript`
Converts a high-level native script definition into a low-level script that the Cardano node can interpret. This function supports various types of native scripts including simple public key-based scripts, time-lock scripts, and complex multi-script conditions

==== `nativeJSFromJson`
Encapsulates the conversion of a Native script object into a script that is compatible with the ledger, serialized into CBOR hex format

=== Code Snapshot
#box(height: 260pt,[
   #figure(
  image(fit: "contain", height: 100%, width: 100%,"images/code-snapshots/Snapshot-08-Native.png"),
  caption: "Snapshot-08-Native"
)])
])


#pagebreak()








































#v(35pt)
=== Description
#v(10pt)
#box(height: 75pt,
 columns(gutter: 20pt)[
  The `network.ts` module is to map high-level network identifiers to their corresponding numeric identifiers
\ 
\ 
\ 
\  
  #place(dy:-5pt)[#table(
  columns: (1fr, 1fr),
  align: center,
  table.header[*Utility Package*][*Directory*],
  [== network.ts],[#link("https://github.com/Anastasia-Labs/lucid-evolution/blob/main/packages/utils/src/network.ts")[GitHub Link]])]
])

=== Key Functions
==== `networkToId`
Converts a network name into its corresponding numeric ID
#v(20pt)
=== Mapping process
#v(10pt)
```ts
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
```
This function's purpose is to ensure that transactions are correctly associated with the appropriate network

#pagebreak()




































#v(35pt)
=== Description

#box(height: 90pt, 
 columns(gutter: 20pt)[
  The `scripts.ts` module offers a range of functions to manage and transform scripts used in smart contracts. It handles various script types including native, Plutus V1, and Plutus V2 scripts, facilitating their usage in transactions and smart contracts
\ 
\ 
\ 

  #place(dy:-6pt)[#table(
  columns: (1fr, 1fr),
  align: center,
  table.header[*Utility Package*][*Directory*],
  [== scripts.ts],[#link("https://github.com/Anastasia-Labs/lucid-evolution/blob/443d2bfd61dc71533992ee3c1611357b05797e5f/packages/utils/src/scripts.ts")[GitHub Link]])]
])

#box(height: 480pt,
 columns(gutter: 20pt)[
   #set par(justify: true)
=== Key Functions

==== `validatorToAddress`
Converts a validator script into a Cardano address

==== `validatorToScriptHash`
Generates a script hash from a validator object. This function supports multiple script types including Native, Plutus V1, and Plutus V2

==== `toScriptRef / fromScriptRef`
Converts a script into a CML.Script object and vice versa, facilitating the use of scripts in a format suitable for transactions

==== `mintingPolicyToId`
Converts a minting policy into a policy ID using the script hash functionality

==== `nativeFromJson / nativeScriptFromJson`
Converts JSON representations of native scripts into script objects, so that scripts can be handled in a standardized format across the system

==== `applyParamsToScript`
Applies parameters to a Plutus script

=== Code Snapshot
#box(height: 300pt,[
   #figure(
  image(fit: "contain", height: 100%, width: 100%,"images/code-snapshots/Snapshot-09-Scripts.png"),
  caption: "Snapshot-09-Scripts"
)])
])
#pagebreak()












































#v(35pt)
=== Description
#v(10pt)
#box(height: 110pt, 
 columns(gutter: 20pt)[
  The `time.ts` module in our library handles the conversion between blockchain-specific slot numbers and Unix timestamps. This functionality is important for scheduling and timing events within the blockchain, where time is often expressed in terms of slots
\ 
\ 
\ 

  #place(dy:-5pt)[#table(
  columns: (1fr, 1fr),
  align: center,
  table.header[*Utility Package*][*Directory*],
  [== time.ts],[#link("https://github.com/Anastasia-Labs/lucid-evolution/blob/443d2bfd61dc71533992ee3c1611357b05797e5f/packages/utils/src/time.ts")[GitHub Link]])]
])

=== Key Functions
#v(10pt)
#box(height: 100pt,
 columns(gutter: 20pt)[
   #set par(justify: true)


==== `unixTimeToSlot`
Converts a Unix timestamp to the corresponding slot number in the blockchain. It is to determine when specific events or transactions should occur relative to blockchain time

==== `slotToUnixTime`
Converts a slot number to the corresponding Unix timestamp. This allows applications to interpret blockchain time in terms of real-world time

])
#v(45pt)
=== What are slots and how do they serve a role in time?
#v(3pt)
These functions use `SLOT_CONFIG_NETWORK`, a predefined mapping specific to each network configuration that defines the relationship between slot numbers and Unix time. This ensures accurate time calculations across different network settings

#v(15pt)
```ts
export function slotToUnixTime(network: Network, slot: Slot): UnixTime {
  return slotToBeginUnixTime(slot, SLOT_CONFIG_NETWORK[network]);
}
```
#pagebreak()
































#v(35pt)
=== Description
#box(height: 110pt, 
 columns(gutter: 20pt)[
  The `utxo.ts` module provides functionality for managing UTxOs. It supports creating transaction inputs and outputs, converting UTxOs to different formats, and sorting or selecting UTxOs based on specific criteria
\ 
\ 
\ 
\ 
  #place(dy:-5pt)[#table(
  columns: (1fr, 1fr),
  align: center,
  table.header[*Utility Package*][*Directory*],
  [== utxo.ts],[#link("https://github.com/Anastasia-Labs/lucid-evolution/blob/443d2bfd61dc71533992ee3c1611357b05797e5f/packages/utils/src/utxo.ts")[GitHub Link]])]
])

#v(5pt)
#box(height: 456pt,
 columns(gutter: 20pt)[
   #set par(justify: true)
=== Key Functions

==== `utxoToTransactionOutput` / `utxoToTransactionInput`
These functions convert UTxO data into transaction outputs and inputs, facilitating the integration of UTxOs into new transactions

==== `utxoToCore` / `utxosToCores`
Converts UTxOs to CML.TransactionUnspentOutput objects, standardizing UTxOs for transaction processing

==== `coreToUtxo` / `coresToUtxos`
Reverses the conversion process, transforming CML.TransactionUnspentOutput objects back into UTxO format

==== `selectUTxOs`
Selects UTxOs from a list that meet specified asset requirements, useful in transaction construction where specific asset amounts are required

==== `sortUTxOs`
Sorts an array of UTxOs according to a specified order, either largest first or smallest first, based on the amount of Lovelace

=== Code Snapshot
#box(height: 300pt,[
   #figure(
  image(fit: "contain", height: 100%, width: 100%,"images/code-snapshots/Snapshot-10-Utxo.png"),
  caption: "Snapshot-10-Utxo")
])


])
#pagebreak()




































#v(35pt)
=== Description
#v(10pt)
#box(height: 110pt, 
 columns(gutter: 20pt)[
  The `value.ts` module provides functions to manipulate and convert between the blockchain's internal value representation and a more accessible assets format. This serves the purpose for managing transaction outputs and state transitions in smart contracts
\ 
\ 
\ 
  #place(dy:10pt)[#table(
  columns: (1fr, 1fr),
  align: center,
  table.header[*Utility Package*][*Directory*],
  [== value.ts],[#link("https://github.com/Anastasia-Labs/lucid-evolution/blob/443d2bfd61dc71533992ee3c1611357b05797e5f/packages/utils/src/value.ts")[GitHub Link]])]
])

#v(15pt)
#box(height: 440pt,
 columns(gutter: 20pt)[
   #set par(justify: true)
=== Key Functions

==== `valueToAssets`
Converts a CML.Value object, which represents the amount of different tokens in a transaction output, into an Assets object that is easier to manipulate and display

==== `assetsToValue`
Converts an Assets object back into a CML.Value object for use in transaction creation or other on-chain activities

==== `fromUnit` / `toUnit`
These functions handle conversion between a unit representation (combining policy ID and asset names) and its constituent parts, helping in asset identification and manipulation

==== `addAssets`
Aggregates multiple Assets objects into a single object, summing up quantities of the same assets

=== Code Snapshot
#box(height: 300pt,[
   #figure(
  image(fit: "contain", height: 100%, width: 100%,"images/code-snapshots/Snapshot-11-Value.png"),
  caption: "Snapshot-11-Value")
])

])

#pagebreak()








#v(25pt)
= Testing Suite
#v(25pt)
Our testing suite, integrated into the Lucid Evolution library through GitHub Actions, automatically runs on `push` to the main branch and during `pull_request` events. It includes tests in order to ensure each function performs as expected. 

Automated tests are triggered to validate code functionality.
 #v(85pt)

== Packages
#v(25pt)
#box(height: 150pt,
 columns(3,gutter: 20pt)[

   
=== Lucid

- #link("https://github.com/Anastasia-Labs/lucid-evolution/blob/main/packages/lucid/test/coinselection.test.ts")[coinselection.test.ts]

- #link("https://github.com/Anastasia-Labs/lucid-evolution/blob/main/packages/lucid/test/onchain.test.ts")[onchain.test.ts]

- #link("https://github.com/Anastasia-Labs/lucid-evolution/blob/main/packages/lucid/test/read.test.ts")[read.test.ts]

- #link("https://github.com/Anastasia-Labs/lucid-evolution/blob/main/packages/lucid/test/tx.test.ts")[tx.test.ts]
- #link("https://github.com/Anastasia-Labs/lucid-evolution/blob/main/packages/lucid/test/txHash.test.ts")[txHash.test.ts]
- #link("https://github.com/Anastasia-Labs/lucid-evolution/blob/main/packages/lucid/test/wallet.test.ts")[wallet.test.ts]

=== Utils

- #link("https://github.com/Anastasia-Labs/lucid-evolution/blob/main/packages/utils/test/apply-param.test.ts")[apply-param.test.ts]

- #link("https://github.com/Anastasia-Labs/lucid-evolution/blob/main/packages/utils/test/cbor.test.ts")[cbor.test.ts]
- #link("https://github.com/Anastasia-Labs/lucid-evolution/blob/main/packages/utils/test/native.test.ts")[native.test.ts]
- #link("https://github.com/Anastasia-Labs/lucid-evolution/blob/main/packages/utils/test/utxo.test.ts")[utxo.test.ts]


\
\
=== Provider

- #link("https://github.com/Anastasia-Labs/lucid-evolution/blob/main/packages/provider/test/koios.test.ts")[koios.test.ts]
- #link("https://github.com/Anastasia-Labs/lucid-evolution/blob/main/packages/provider/test/kupmios.test.ts")[kupmios.test.ts]
])

\
\
\
\
#align(center)[== GIF Testrun

#link("https://github.com/Anastasia-Labs/lucid-evolution/blob/main/assets/images/tests.gif")[Test Result]
\
\

This GIF, *an automated test* running in terminal, \
showcases that our test packages are working as intended

]

#pagebreak()
#v(35pt)

== Brief overview of test cases in Lucid
#v(35pt)
=== Coin Selection

This test case ensures the functionality of the `coinSelection`. By checking for various scenarios, each test case focuses on specific aspects of the selection algorithm, ensuring that the function works correctly under different conditions and efficiently selects the appropriate UTxOs based on the input criteria

=== Onchain Tests

This comprehensive test suite ensures that various functionalities related to transactions, staking, minting, burning, and parameterized contracts work as expected in the lucid-evolution library

=== Read Tests

In order to ensure that the library correctly integrates with a provider API to perform operations like wallet selection, UTxO retrieval

=== Tx Test

This scripts is designed to validate the minting and burning functions of tokens by verifying transaction creation signing and submission.

=== Tx Hash Test

It ensures the correctness of the transaction signing and hash computation-. It uses a predefined transaction and signs it with a selected wallet, than computes the hash in order to compare the computed hash with the signed transaction hash

=== Wallet test

To validate wallet management. Things like switching providers, generating seed phrases and correctly selecting a wallet
