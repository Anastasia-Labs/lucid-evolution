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
#align(center)[#strong[Proof of Achievement - Milestone 3]\
#set text(15pt); Documentation - Conway Era ]

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
    #align(center)[*Anastasia Labs* \ Lucid-Evolution Milestone 3]
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
    #align(center)[*Anastasia Labs* \ Lucid-Evolution Milestone 3 \ Conway Era]
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












#v(115pt)
= Function Design / Gap Identification (Conway Era)
#v(15pt)
In the Conway era, the Cardano blockchain is introducing significant governance features on-chain. These enhancements, as described in #link("https://github.com/cardano-foundation/CIPs/tree/master/CIP-1694")[CIP-1694], enable ADA holders to participate in various on-chain decisions. Key changes include new script purposes, centralized data structures like committees, and new transaction features.

#v(15pt)

== Requirements Identification

In our analysis for the Conway era, we identified several key requirements that needed to be addressed in the Lucid Evolution library. These included the ability to delegate voting power to Delegated Representatives (DReps), register and manage DReps, combine stake and vote delegation, support different voting strategies, enable script-based DRep functionality for programmatic voting, and integrate seamlessly with existing stake delegation features we had before.

#pagebreak()
#v(35pt)
== Function Design
#v(15pt)

Based on these requirements, we designed and implemented a comprehensive set of functions to support the new governance features. 

- For delegation, we created `delegate.VoteToDRep` for delegating voting power to a DRep, and `delegate.VoteToPoolAndDRep` for combined stake and vote delegation. These functions allow users to participate in governance by choosing their representatives or directly influencing the network's direction.

- To streamline the process of entering the governance system, we developed registration and delegation functions that combine multiple actions. These include `registerAndDelegate.ToDRep` for registering and delegating to a DRep in one action, `registerAndDelegate.ToPool` for registering and delegating stake to a pool, and `registerAndDelegate.ToPoolAndDRep` for registering and delegating both stake and voting power simultaneously.

- For DRep management, we implemented `register.DRep` for registering as a DRep, `updateDRep` for updating DRep information, and `deregister.DRep` for deregistering as a DRep. These functions provide the necessary tools for individuals or entities to participate as representatives in the governance system.

- We extended our DRep functionality to support script-based DReps. This includes variations of `register.DRep` with script attachment capabilities and corresponding `deregister.DRep` functions for script-based DReps.

#pagebreak()
#v(35pt)
== Gap Analysis and Solutions
#v(15pt)
During our design phase, we identified and addressed several gaps in the initial implementation and changed/rewrote our previously determined plan. One significant challenge was representing different voting strategies, such as Always Abstain and Always No Confidence. We solved this by implementing a `__typename` property in the DRep object, allowing users to specify these strategies easily.

Another gap we addressed was the need for combined operations. Users often need to perform multiple actions, such as registering, delegating stake, and delegating votes, in single transactions. Our solution was to design combined functions like `registerAndDelegate.ToPoolAndDRep`, which make it easy for user interactions and reduce the complexity of participating in governance.

The requirement for script-based DReps presented another challenge. To support programmatic voting behavior, we extended the `register.DRep` function to include script attachment capabilities. This enhancement allows for more complex and automated governance participation strategies.

== Integration with Existing Features

In our design we wanted to make it a seamless integration of the new governance functions with Lucid's existing transaction building capabilities. Users can now construct complex transactions that include both governance actions and regular activities, all within a single, cohesive framework.


#pagebreak()

#v(115pt)
= Conway Era
#v(15pt)
For Milestone 3 of our proposal one of the highlighted topics would be Conway Era functions. These are covered under the title "Keeping pace with Cardano" under our documentation page

=== Highlight

We would like to highlight and showcase that its already possible to use Lucid Evolution for governance functions on mainnet.

*The first Aiken Script-based DRep on Cardano ever*, has been registered on-chain using Lucid Evolution

=== Transaction Proof
https://cardanoscan.io/transaction/503b81bfb17a0d904fcf6c4000191ce62ae31a929b67a51126dd838543748b8d?tab=referenceinputs

- #link("https://x.com/AdamRusch/status/1834555539516244250")[Link to social media post highlighting this achievement]

=== Video Demonstration (Introduction and Conway-Era Functions)

Code examples in a short video style demonstrating the usage of Conway functions within the Lucid framework can be found with the link provided on Proof of Achievement submission. 

We prepared a brief introduction with few core concepts at the beginning of the video and progressed to conway era functions. A wallet has registered its stake address, queried its reward address, registered this reward address as a DRep, and cast its vote as "Always Abstain".

Along the way, we tried to provide as many hints as possible to not only target Cardano developers but also to a new developer who might have just started looking into building on Cardano. 


#pagebreak()
#v(35pt)
== Keeping pace with Cardano
#v(15pt)
We have implemented and successfully tested a comprehensive set of Conway era functions in Lucid Evolution. These functions provide essential support for the new governance features introduced in the Conway era. Below is a list of the implemented functions along with a brief description of their purpose:

#box(height: 235pt,
 columns(gutter: 10pt)[
   #set par(justify: true)

- *delegate.VoteToDRep*: Delegates voting power from a reward address to a DRep.
- *delegate.VoteToPoolAndDRep*: Delegates both stake to a pool and voting power to a DRep in one action.
- *registerAndDelegate.ToDRep*: Registers a stake address and delegates voting power to a DRep in one action.
- *registerAndDelegate.ToPool*: Registers a stake address and delegates stake to a pool.
- *registerAndDelegate.ToPoolAndDRep*: Registers a stake address, delegates stake to a pool, and voting power to a DRep in one action.
- *register.DRep*: Registers a stake address as a DRep.
- *updateDRep*: Updates the information of a DRep.
- *deregister.DRep*: Deregisters a stake address as a DRep.
- *register.DRep* (with script attachment): Registers a script-based DRep, allowing for programmatic voting behavior.
- *deregister.DRep* (for script-based DRep): Deregisters a script-based DRep.
])


These functions have been thoroughly tested in an on-chain environment, with each function successfully executing and confirming transactions on the blockchain. The comprehensive suite of functions enables developers to interact with all aspects of the Conway era governance system using Lucid Evolution









