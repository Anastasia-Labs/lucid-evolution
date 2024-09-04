// Set the background image for the page
#let image-background = image("images/Background-Carbon-Anastasia-Labs-01.jpg", height: 100%)
#set page(
  background: image-background,
  paper :"a4",
  margin: (left : 20mm,right : 20mm,top : 40mm,bottom : 30mm)
)

// Set default text style
#set text(22pt, font: "Barlow")

#v(3cm) // Add vertical space

// Center-align the logo
#align(center)[#box(width: 75%, image("images/Logo-Anastasia-Labs-V-Color02.png"))]

#v(1cm)

// Set text style for the report title
#set text(20pt, fill: white)

// Center-align the report title
#align(center)[#strong[Proof of Achievement - Milestone 1]\
#set text(15pt);Summary and Highlights]

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
    // Place logo in the header
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
    #align(center)[*Anastasia Labs* \ Lucid-Evolution Milestone 1]
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
/ URL: #link("https://projectcatalyst.io/funds/11/cardano-open-developers/anastasia-labs-lucid-evolution-redefining-off-chain-transactions-in-cardano")[Catalyst Proposal ]

#v(10pt)
= Introduction
#v(10pt)
This report outlines the achievements and developments of Lucid Evolution under *Milestone 1*, focusing on the transition and improvements from the original Lucid library. 

The Lucid Evolution project is designed to enhance Cardano's off-chain transaction capabilities by integrating advanced features and addressing previous limitations.
#v(10pt)
== Milestone 1 Objectives
#v(10pt)

- A List of all PRs that have not been reviewed or merged, including details such as PR number, title, author, and date created can be found

- A summary report highlighting the findings from the evaluation process, with specific mentions of issues addressed or improvements made can be found 

- List with confirmation of updates made to the forked repository, showcasing changes such as commits, branches, or pull requests related to compatibility fixes and conflict resolution can be found

- Log or record of PRs that have been successfully reviewed, tested, and merged into the maintained fork can be found 

#pagebreak()

#v(40pt)

= Process Overview
#v(10pt)
The methodology involved reviewing pull requests from the original Lucid library, identifying which enhancements were already covered by our new approach, and addressing uncovered needs. 

This process ensured that Lucid Evolution not only matched but surpassed the original library's capabilities.
#v(10pt)
== Pull Requests (PRs) extracted from legacy Lucid library
#v(10pt)
#table(
  columns: 5,
  table.header[*PR Nr.*][*Date*][*Title*][*Submitter*][*Link*],
  [234], [Nov 4, 2023], [Stop Leaking Memory], [yHSJ],[#link("https://github.com/spacebudz/lucid/pull/234")[Link]],
  [233], [Nov 3, 2023], [Fix memory leaks from Tx], [joacohoyos],[#link("https://github.com/spacebudz/lucid/pull/233")[Link]],
  [231], [Oct 30, 2023], [Feat: chaining of txs], [will-break-it],[#link("https://github.com/spacebudz/lucid/pull/231")[Link]],
  [220], [Sep 6, 2023], [Feat (Next.JS): Support server-side Next.JS usage], [thaddeusdiamond], [#link("https://github.com/spacebudz/lucid/pull/220")[Link]],
  [219], [Sep 3, 2023], [Add Koios Provider to Lucid], [edridudi],[#link("https://github.com/spacebudz/lucid/pull/219")[Link]],
  [218], [Aug 29, 2023], [Prototype Hydra provider], [Piefayth],[#link("https://github.com/spacebudz/lucid/pull/218")[Link]],
  [217], [Aug 28, 2023], [Wallet from seed should query both base and enterprise addresses on signing], [infrmtcs],[#link("https://github.com/spacebudz/lucid/pull/217")[Link]],
  [197], [Jun 7, 2023], [Fix typebox portable type annotation], [solidsnakedev],[#link("https://github.com/spacebudz/lucid/pull/197")[Link]],
  [111], [Oct 29, 2022], [Add graphql provider], [zachykling],[#link("https://github.com/spacebudz/lucid/pull/111")[Link]], 
)


#v(10pt)
#pagebreak()
#v(40pt)
= Evaluation Findings
#v(10pt)

Specific PRs from the legacy Lucid repository were addressed directly in Lucid Evolution or were found obsolete due to foundational improvements. As we have created Lucid-evolution from scratch a 1-1 match for every PR in the legacy repository would not be possible.

For example, the initial release preemptively fixed memory leaks addressed by PRs #link("https://github.com/spacebudz/lucid/pull/234")[#234] and #link("https://github.com/spacebudz/lucid/pull/233")[#233] due to the #link("https://github.com/dcSpark/cardano-multiplatform-lib/issues/142")[CML library] fixes from dcSpark.

A case of a 1-1 match would be that Lucid-evolution addresses provide the right tools to handle the scalability needs of dApps in our ecosystem. 

Together with popular providers like Maestro or Blockfrost the need for higher throughput can only be tackled with certain services such as a Koios provider. More information to our implementation regarding (#link("https://github.com/spacebudz/lucid/pull/219")[PR #219]) can be found under #link("https://github.com/Anastasia-Labs/lucid-evolution/tree/main/packages/provider/src/koios")[here].

#v(10pt)

= Community and Development Interaction
#v(10pt)
Lucid-evolution is created for the developers on Cardano, which means their feedback on our progress has been essential to determine the path we want to take forward during our development phase. 

As it can be observed in our #link("https://discord.gg/j2jQCDK2")[Discord channel], we have been discussing, evaluating, and gathering feedback from our developer community and even prioritizing certain queries to fast-track features that are essential for their own projects. We appreciate everyone who has been a part of the Evolution and encourage contributions. 

We want to create an atmosphere of collaborative efforts in addressing and integrating complex features and fixes.

#v(10pt)

= Closed PRs Overview
We have closed numerous PRs in the Lucid Evolution repository, showcasing extensive development work. The exhaustive list of PRs can be found in the #link("https://github.com/Anastasia-Labs/lucid-evolution")[Github repository] and also can be accessed #link("https://github.com/Anastasia-Labs/lucid-evolution/pulls?q=is%3Apr+is%3Aclosed")[here].


