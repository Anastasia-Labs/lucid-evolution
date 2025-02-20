# Example - DRep Delegation

A nice looking web interface for delegating voting power to a DRep. Easy to swap out the DRep ID and other config stuff for your own DRep/usecases and just use it as a starting point.

## User Interface

### Main Screen

![Main Screen](./public/readme/main.png)

### Voting History

![Voting History](./public/readme/vote-history.png)

### Initial Connect Wallet Screen

![Connect Wallet](./public/readme/before-connect.png)

### Wallet Selection Modal

![Wallet Modal](./public/readme/wallet-modal.png)

### Connected Wallet View

![Connected Wallet](./public/readme/after-connect.png)

## Setup

```bash
pnpm install

pnpm dev

pnpm build
```

## Environment Variables

In a `.env` file:

```
DREP_ID_PREPROD=drep_dummy_preprod
DREP_ID_MAINNET=drep_dummy_mainnet
```

## Flow

```mermaid
%%{init: {'theme': 'base', 'themeVariables': { 'fontSize': '16px' }}}%%
flowchart LR
    subgraph Phase3[" Connection "]
    direction TB
        User -->|Yes| D[Connect Wallet<br>CIP-30]
    end

    subgraph Phase4[" Delegation "]
    direction TB
        D --> E[Delegate Button]

        subgraph " Tx Building"
        direction TB
            E --> F1[Frontend Captures<br>Delegation Intent]

            F1 --> F2[Send Request<br>to Backend]

            F2 --> F3[Backend Builds<br>Tx]

            F3 --> F4[Return tx.cbor<br>to Frontend]
        end

        F4 --> G[Wallet Signs<br>tx.cbor]

        G --> H[Transaction<br>Confirmed]
    end

    style User fill:#f0f0f0,stroke:#333
    style H fill:#e6ffe6,stroke:#333
    style F1 fill:#fff4e6,stroke:#333
    style F2 fill:#fff4e6,stroke:#333
    style F3 fill:#fff4e6,stroke:#333
    style F4 fill:#fff4e6,stroke:#333

    classDef secureProcess fill:#fff4e6,stroke:#333;
    classDef default font-size:14px;
    classDef phase font-size:16px,font-weight:bold;
    class Phase1,Phase2,Phase3,Phase4 phase
```
