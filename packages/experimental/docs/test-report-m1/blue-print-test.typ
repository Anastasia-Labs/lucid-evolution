#import "@preview/cetz:0.2.2"

#let image-background = image("./images/background-1.jpg", height: 100%, fit: "cover")
#let image-foreground = image("./images/Logo-Anastasia-Labs-V-Color02.png", width: 100%, fit: "contain")
#let image-header = image("./images/Logo-Anastasia-Labs-V-Color01.png", height: 75%, fit: "contain")

#let luid-evolution-link = link("https://anastasia-labs.github.io/lucid-evolution")[Lucid Evolution Website]
#let lucid-evolution-git-link = link("https://github.com/Anastasia-Labs/lucid-evolution")[Main Github Repo]
#let project_link = link("https://projectcatalyst.io/funds/13/cardano-open-developers/lucid-evolution-20-blueprint-and-enhanced-plutus-schema")[Catalyst Proposal]
#let milestone_link = link("https://milestones.projectcatalyst.io/projects/1300126/milestones/1")[Milestone 1]


#set page(
  background: image-background,
  paper :"a4",
  margin: (left : 20mm,right : 20mm,top : 40mm,bottom : 30mm)
)

// Set default text style
#set text(15pt, font: "Montserrat")

#v(3cm) // Add vertical space

#align(center)[
  #box(
    width: 60%,
    stroke: none,
    image-foreground,
  )
]

#v(1cm) // Add vertical space

// Set text style for the report title
#set text(20pt, fill: white)

// Center-align the report title
#align(center)[#strong[Lucid Evolution 2.0]]
#align(center)[Test Report - #milestone_link]

#v(5cm)

// Set text style for project details
#set text(13pt, fill: white)

#table(
  columns: 2,
  stroke: none,
  [*Project Id*], [1300126],
  [*Project Manager*], [Jonathan Rodriguez],
  [*Proposal Link*], [#project_link],
)


// Reset text style to default
#set text(fill: luma(0%))

// Display project details
#show link: underline
#set terms(separator:[: ],hanging-indent: 18mm)

#set par(justify: true)
#set page(
  paper: "a4",
  margin: (left: 20mm, right: 20mm, top: 40mm, bottom: 35mm),
  background: none,
  header: [
    #align(right)[
      #image("./images/Logo-Anastasia-Labs-V-Color01.png", width: 25%, fit: "contain")
    ]
    #v(-0.5cm)
    #line(length: 100%, stroke: 0.5pt)
  ],
)

#v(20mm)
#show link: underline
#show outline.entry.where(level: 1): it => {
  v(6mm, weak: true)
  strong(it)
}

#outline(depth:3, indent: 1em)
#pagebreak()
#set text(size: 11pt)  // Reset text size to 10pt
#set page(
   footer: [
    #line(length: 100%, stroke: 0.5pt)
    #v(-3mm)
    #align(center)[ 
      #set text(size: 11pt, fill: black)
      *Anastasia Labs – *
      #set text(size: 11pt, fill: gray)
      *Lucid Evolution 2.0*
      #v(-3mm)
      Blueprint & Enhanced Plutus Schema - Milestone 1 - Test Report
      #v(-3mm)
    ]
    #v(-6mm)
    #align(right)[
      #context counter(page).display( "1/1",both: true)]
  ] 
)

// Initialize page counter
#counter(page).update(1)
#v(50pt)
// Display project details
// #set terms(separator:[: ],hanging-indent: 18mm)
#align(center)[
  #set text(size: 18pt)
  #strong[Blueprint & Enhanced Plutus Schema]

  #strong[Core Schema Implementation - Test Report]]
#v(50pt)
#set heading(numbering: "1.")
// #show heading: set text(rgb("#c41112"))

= Overview

\
This document presents the results of rigorous unit and schema-based tests executed to verify the implementation of Lucid Evolution’s core data schema structures and utility functions using Effect Schema. The tests cover all Plutus primitive data types (*`Integer`*, *`ByteString`*, *`List`*, *`Map`*, *`Constr`*), encoding/decoding utilities, and schema combinators, demonstrating both compile-time safety and runtime validation., ensuring the reliability and functionality of the implementation.


#pagebreak()
#v(50pt)

= Test Suite Details
\
This test suite consists all core Plutus data types in Lucid Evolution 2.0 and their validation through comprehensive unit tests and ensure that:

+ The core schema structures supports the following Plutus data types:

  - *`Integer`*

  - *`ByteString`*
  - *`List`* (including nested lists)
  - *`Map`*
  - *`Constr`* (data with constructors)
  \
+ Utility functions (e.g., encoding and decoding) leverage Effect Schema for:

  - Compile-time type safety validation of Plutus Data.

  - Runtime type parsing to ensure Plutus data integrity during execution.
  - All core operations must pass comprehensive tests for roundtrip encoding and decoding.

\
== Test Environment


\
- Repository: Anastasia-Labs/lucid-evolution

- Package:*` @lucid-evolution/experimental`*

- Test Framework: https://github.com/vitest-dev/vitest

- Node.js Version: 18.x

\
== Running Tests
\
```sh
  pnpm test // runs all unit and property tests
```

\
#v(50pt)

= Test Summary
\
== Data Module Tests (41 tests)
\
#figure(
  image("./images/Data-test.png", width: 90%),
  caption: [
    All the test results for the core schema implementation.
  ],
)

#figure(
  image("./images/Data-test-01.png", width: 90%),
  caption: [
    All the test results for the core schema implementation continued.
  ],
)
\
The test suite for the core schema implementation includes a total of 41 tests, covering various aspects of the core schema structures and utility functions. The tests are designed to ensure that all data types are thoroughly validated and that the encoding and decoding processes work as expected.

\
To execute the tests, run the following command in the terminal:

```sh
  pnpm test test/Data.test.ts
```




#pagebreak()
== Data Links
\
- Data Module Github File:

    https://github.com/Anastasia-Labs/lucid-evolution/blob/main/packages/experimental/src/Data.ts

  \
- Data Module Github Test File:

  https://github.com/Anastasia-Labs/lucid-evolution/blob/main/packages/experimental/test/Data.test.ts









#pagebreak()
#v(50pt)

= Detailed Test Results

== Basic Types (36 tests)
\

Tests for the five core constructors (*`mkInt`*, *`mkByte`*, *`mkList`*, *`mkMap`*, *`mkConstr`*) and their schema validations.


=== Integer (11 tests)
\
This test validates arbitrary-precision *`Integer`* values from *`bigint`*, schema compliance, and proper rejection of non-bigint inputs at runtime.

\
#figure(
  image("./images/integer-test.png", width: 100%),
  caption: [
    The test results for the Integer data type.
  ],
)

\
==== Integer Links
\ 
- Integer Github link:

  https://github.com/Anastasia-Labs/lucid-evolution/blob/81c450f1773da6c6c283b959b027b93ccddcfd01/packages/experimental/src/Data.ts#L94-L120

  \
- Integer Github Test link:

  https://github.com/Anastasia-Labs/lucid-evolution/blob/81c450f1773da6c6c283b959b027b93ccddcfd01/packages/experimental/test/Data.test.ts#L50-L78

#pagebreak()

=== ByteArray (12 tests)
\
This test verifies hex-string parsing into *`ByteArray`*, rejects malformed strings, and schema validation.

\
#figure(
  image("./images/bytearray-test.png", width: 100%),
  caption: [
    The test results for the ByteArray data type.
  ],
)
\

==== ByteArray Links
\
- ByteArray Github link: 

  https://github.com/Anastasia-Labs/lucid-evolution/blob/81c450f1773da6c6c283b959b027b93ccddcfd01/packages/experimental/src/Data.ts#L123-L149

  \
- ByteArray Github test link:

  https://github.com/Anastasia-Labs/lucid-evolution/blob/81c450f1773da6c6c283b959b027b93ccddcfd01/packages/experimental/test/Data.test.ts#L12-L48

  

#pagebreak()

=== List (4 tests)

\
These test results confirms that *`List`* supports empty, homogeneous, and mixed-type collections, with nested lists validated by schema.

\
#figure(
  image("./images/list-test.png", width: 100%),
  caption: [
    The test results for the List data type.
  ],
)

\

==== List Links

\
- List Github link:

  https://github.com/Anastasia-Labs/lucid-evolution/blob/81c450f1773da6c6c283b959b027b93ccddcfd01/packages/experimental/src/Data.ts#L152-L182

  \
- List Github test link:

  https://github.com/Anastasia-Labs/lucid-evolution/blob/81c450f1773da6c6c283b959b027b93ccddcfd01/packages/experimental/test/Data.test.ts#L80-L109
#pagebreak()

=== Map (4 tests)

\
Tests *`Map`* construction with unique key–value pairs, nested maps, and proper schema parsing  to support on-chain state representations.

\
#figure(
  image("./images/map-test.png", width: 100%),
  caption: [
    The test results for the Map data type.
  ],
)

\
==== Map Links

\
- Map Github link:

  https://github.com/Anastasia-Labs/lucid-evolution/blob/81c450f1773da6c6c283b959b027b93ccddcfd01/packages/experimental/src/Data.ts#L207-L251

  \
- Map Github test link:

  https://github.com/Anastasia-Labs/lucid-evolution/blob/81c450f1773da6c6c283b959b027b93ccddcfd01/packages/experimental/test/Data.test.ts#L111-L144

#pagebreak()

=== Constr (5 tests)

\
Validates *`Constr`* creation with sum-type constructor index and fields, including nested constructors, rejecting invalid indices.

\
#figure(
  image("./images/constr-test.png", width: 100%),
  caption: [
    The test results for the Constr data type.
  ],
)

\
==== Constr Links

\
- Constr Github link:

  https://github.com/Anastasia-Labs/lucid-evolution/blob/81c450f1773da6c6c283b959b027b93ccddcfd01/packages/experimental/src/Data.ts#L254-L301

  \
- Constr Github test link:


  https://github.com/Anastasia-Labs/lucid-evolution/blob/81c450f1773da6c6c283b959b027b93ccddcfd01/packages/experimental/test/Data.test.ts#L146-L183

#pagebreak()
#v(50pt)

== CBOR Serialization & Error Handling (5 tests)

\
Validates roundtrip of Data to CBOR and Vice Versa with graceful handling of malformed input.

\
#figure(
  image("./images/cbor-ser-image.png", width: 100%),
  caption: [
    The test results for the CBOR serialization and error handling.
  ],
)

\
=== CBOR Serialization Links

\
- CBOR Serialization Github link:

  https://github.com/Anastasia-Labs/lucid-evolution/blob/81c450f1773da6c6c283b959b027b93ccddcfd01/packages/experimental/src/Data.ts#L382-L440

  \
- CBOR Serialization Github test link:

  https://github.com/Anastasia-Labs/lucid-evolution/blob/81c450f1773da6c6c283b959b027b93ccddcfd01/packages/experimental/test/Data.test.ts#L185-L242


#pagebreak()
#v(50pt)

== TypeTaggedSchema (25 tests)

\
Validates high‑level schema combinators against *`TSchema`* definitions, ensuring proper encoding/decoding of complex TypeScript objects.


#figure(
  image("./images/type-tagged.png", width: 90%),
  caption: [
    The test results for the CBOR serialization and error handling.
  ],
)

\
=== TypeTaggedSchema Links

\
- TypeTaggedSchema Github link:

  https://github.com/Anastasia-Labs/lucid-evolution/blob/81c450f1773da6c6c283b959b027b93ccddcfd01/packages/experimental/src/Data.ts#L698-L750

  \
- TypeTaggedSchema Github test link:

  https://github.com/Anastasia-Labs/lucid-evolution/blob/81c450f1773da6c6c283b959b027b93ccddcfd01/packages/experimental/test/Data.test.ts#L244-L278

#pagebreak()
#v(50pt)

= Test Coverage

\
- Core Schema Structures: 100% coverage for constructors and schemas of *`Integer`*, *`ByteString`*, *`List`*, *`Map`*, *`Constr`*.

- Encoding Utilities: 100% coverage for *`encodeDataOrThrow`*, *`decodeDataOrThrow`*, *`encodeCBOROrThrow`*, *`decodeCBOROrThrow`*.

- TSchema Modules: 100% coverage for all combinators and error paths.

#pagebreak()

= Conclusion
#v(50pt)

All acceptance criteria have been met. The implementation supports all required Plutus data types, enforces compile-time type safety via Effect Schema, validates data at runtime, and passes comprehensive bi-directional tests for encoding and decoding. The milestone is hereby considered complete and ready for review and integration.


