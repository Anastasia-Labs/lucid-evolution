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
#set text(15pt); Testing Suite for Lucid-Evolution ]

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

#pagebreak()











#v(20pt)
/ Project Name: Lucid Evolution: Redefining Off-Chain Transactions in Cardano
/ URL: #link("https://projectcatalyst.io/funds/11/cardano-open-developers/anastasia-labs-lucid-evolution-redefining-off-chain-transactions-in-cardano")[Catalyst Proposal]


#v(25pt)
= Testing Suite
#v(25pt)
Our testing suite, integrated into the Lucid Evolution library through GitHub Actions, automatically runs on `push` to the main branch and during pullrequest events. It includes tests in order to ensure each function performs as expected. 

Automated tests are triggered to validate code functionality.
#v(45pt)

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

#align(center)[== GIF Testrun

#link("https://github.com/Anastasia-Labs/lucid-evolution/blob/main/assets/images/tests.gif")[Test Result]
\
\

This GIF, *an automated test* running in terminal,
showcases \ that our test packages are working as intended by running succesful test cases

]

#pagebreak()
#v(35pt)

== Test cases overview
#v(35pt)
To summarize our testing process, you can find the descriptions for our test cases for each test cluster. Our testing suite verifies that the added functionalities to lucid-evolution work as intended and we are always on the lookout for additional findings to improve our library with.

#v(35pt)
=== Lucid

==== Coin Selection

This test case ensures the functionality of the `coinSelection`. By checking for various scenarios, each test case focuses on specific aspects of the selection algorithm, ensuring that the function works correctly under different conditions and efficiently selects the appropriate UTxOs based on the input criteria

==== Onchain Tests

This comprehensive test suite ensures that various functionalities related to transactions, staking, minting, burning, and parameterized contracts work as expected in the lucid-evolution library

==== Read Tests

In order to ensure that the library correctly integrates with a provider API to perform operations like wallet selection, UTxO retrieval

==== Tx Test

This scripts is designed to validate the minting and burning functions of tokens by verifying transaction creation signing and submission.

==== Tx Hash Test

It ensures the correctness of the transaction signing and hash computation-. It uses a predefined transaction and signs it with a selected wallet, than computes the hash in order to compare the computed hash with the signed transaction hash

==== Wallet Test

To validate wallet management. Things like switching providers, generating seed phrases and correctly selecting a wallet

#pagebreak()
#v(35pt)

=== Utility

==== Apply Parameters
Its designed to validate if the functionality to apply parameters to a script using `applyParamsToScript`. It tests if the function correctly embeds paramteres into a given script

==== CBOR Test

Ensures the functionality of the `applyDoubleCborEncoding`, to check CBOR strings encoding consistency and accuracy

==== Native Test

`parseCMLNative`needs to accurately parse native scripts, by the verifying the interpretation of a complext script we confirm the functions reliability in handling this scenario

==== UTxO Test

We check for the accurate deserialization by `coreToUtxo` of CBOR ecnoded UTxO data into JS objects.

#v(35pt)
=== Provider
==== Koios
The Koios API will be called for various functionalities like `koios.getProtocolParameters()`, `koios.getUtxos(address)` etc. to ensure reliability
==== Kupmios
We verify the kupmios service to interact with the blockchain. Tests for retrieval of parameters, UTxOs, delegations, datums and more are included to see the resillience