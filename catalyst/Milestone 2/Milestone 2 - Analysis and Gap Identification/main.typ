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
#set text(15pt); Highlighting Identified Gaps and Upgrades ]

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

In our following report for Milestone 2 we introduce our approach to the utility functions used in Lucid-evolution.

In this report, we briefly discuss our changes and highlight our progress, focusing on the gaps identified and addressed beyond the scope of our new utility packages detailed in the following report "Utility Functions"

#pagebreak()





#v(35pt)
== Function Design / Gap Identification


After evaluating the legacy Lucid library and our initial implementations, we identified areas needing enhancements. In this effort, a big portion of the legacy library has been rewritten or created from scratch.

Lucid Evolution is like the legacy Lucid library but with improved APIs, better error handling, more structure, and the latest version of CML. Additionally, we’re planning to introduce an abstraction layer on top, allowing users to select the serialization library that best suits their needs. 

We restructured and refactored the legacy library to bring it up to date with today’s resources. For example, we have a modified #link("https://github.com/Anastasia-Labs/lucid-evolution/blob/4abb197edb2641a7bf9ead11b18b2f76038619e1/packages/lucid/src/tx-builder/internal/CompleteTxBuilder.ts#L285")[coinSelection] algorithm, a new #link("https://github.com/Anastasia-Labs/lucid-evolution/blob/4abb197edb2641a7bf9ead11b18b2f76038619e1/packages/lucid/src/tx-builder/TxBuilder.ts")[TxBuilder] with its own function packages.

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




== An example

In order to highlight differences between the evolution library and the legacy lucid library, we can display an example of how the two libraries handle the same transaction signed type in different syntaxes:

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

== Highlights
\
We have adopted an approach closer to functional programming paradigms, using `Effect` to handle promises and improve error management, along with the latest version of `CML`.

As highlighted in our #link("https://github.com/Anastasia-Labs/lucid-evolution/releases/tag/%40lucid-evolution%2Flucid%400.2.47")[latest release patch notes (0.2.47)], we are working on enhancing and upgrading the variability of tools and services available for developers using lucid evolution.

By upgrading the compatibility, we are broadening the library’s reach to support various Cardano environments. We have addressed previous issues with TypeScript configuration, improving type declarations and enhancing provider variability through integration.

Transaction management has seen significant improvements, including sophisticated UTXO management that allows efficient  #link("https://github.com/Anastasia-Labs/lucid-evolution/pull/141/commits")[chaining of transactions] within a single block. #link("https://github.com/dcSpark/cardano-multiplatform-lib/pull/182")[Memory management was optimized] minimizing memory leaks and enhancing overall stability by upgrading to the latest CML versions.

These enhancements, reflect our commitment to addressing gaps and improving the library. We are constantly in communication with our community through #link("https://discord.gg/gdU4DAcS")[official social channels] and actively discuss about ways to improve Lucid Evolution

We are progressing towards implementing Conway functions to support developers with governance era functionalities. Additionally, we are developing a refined, dedicated documentation website to help more developers onboard Lucid Evolution into their workflow. We are keeping pace with Cardano’s evolution.

#v(155pt)
*We aim to create a library that, just like our #link("https://github.com/Anastasia-Labs/design-patterns")[design patterns repository], simplifies complex design patterns and provides developers with an efficient, modern tool.*



#pagebreak()

#v(25pt)
= Use Case Scenario
As an example of how lucid evolution could be used for common design patterns, Here's how the Lucid Evolution enabled input indexing could look like, making #link("https://github.com/Anastasia-Labs/design-patterns/blob/main/stake-validator/STAKE-VALIDATOR.md")[Staking Validator Design Pattern] an easy implementation

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