---
title: Devnet/Devnet.ts
nav_order: 297
parent: Modules
---

## Devnet overview

---

<h2 class="text-delta">Table of contents</h2>

- [cluster](#cluster)
  - [Cluster](#cluster-1)
- [container](#container)
  - [Container](#container-1)
- [utils](#utils)
  - [CardanoDevNetError (class)](#cardanodevneterror-class)
  - [DevNetCluster (interface)](#devnetcluster-interface)
  - [DevNetContainer (interface)](#devnetcontainer-interface)

---

# cluster

## Cluster

Cluster management operations for Cardano DevNet.

**Signature**

```ts
export declare const Cluster: {
  readonly make: (config?: DevnetDefault.DevNetConfig) => Effect.Effect<DevNetCluster, CardanoDevNetError>
  readonly makeOrThrow: (config?: DevnetDefault.DevNetConfig) => Promise<DevNetCluster>
  readonly start: (cluster: DevNetCluster) => Effect.Effect<void, CardanoDevNetError>
  readonly startOrThrow: (cluster: DevNetCluster) => Promise<void>
  readonly stop: (cluster: DevNetCluster) => Effect.Effect<void, CardanoDevNetError>
  readonly stopOrThrow: (cluster: DevNetCluster) => Promise<void>
  readonly remove: (cluster: DevNetCluster) => Effect.Effect<void, CardanoDevNetError>
  readonly removeOrThrow: (cluster: DevNetCluster) => Promise<void>
}
```

Added in v2.0.0

# container

## Container

Individual container management operations.

**Signature**

```ts
export declare const Container: {
  readonly start: (container: DevNetContainer) => Effect.Effect<void, CardanoDevNetError>
  readonly startOrThrow: (container: DevNetContainer) => Promise<void>
  readonly stop: (container: DevNetContainer) => Effect.Effect<void, CardanoDevNetError>
  readonly stopOrThrow: (container: DevNetContainer) => Promise<void>
  readonly remove: (container: DevNetContainer) => Effect.Effect<void, CardanoDevNetError>
  readonly removeOrThrow: (container: DevNetContainer) => Promise<void>
  readonly getStatus: (
    container: DevNetContainer
  ) => Effect.Effect<Docker.ContainerInspectInfo | undefined, CardanoDevNetError>
  readonly getStatusOrThrow: (container: DevNetContainer) => Promise<Docker.ContainerInspectInfo | undefined>
}
```

Added in v2.0.0

# utils

## CardanoDevNetError (class)

**Signature**

```ts
export declare class CardanoDevNetError
```

## DevNetCluster (interface)

**Signature**

```ts
export interface DevNetCluster {
  readonly cardanoNode: DevNetContainer
  readonly kupo?: DevNetContainer
  readonly ogmios?: DevNetContainer
  readonly networkName: string
}
```

## DevNetContainer (interface)

**Signature**

```ts
export interface DevNetContainer {
  readonly id: string
  readonly name: string
}
```
