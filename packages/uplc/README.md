# Development Environment Setup

## 1. Enter Development Environment

To start working in the development environment, run the following command:

```bash
nix develop
```

## 2. Build the Rust Project & Generate WASM Files

Before continuing, please note that this step is not part of the CI process. You'll need to run it locally to build the Rust project and generate the required WASM files:

```bash
pnpm build-local
```

## 3. Build the UPLC Package

Once you've completed the previous step, you can build the UPLC package by running:

```
pnpm build
```

## Speed and size builds

The package ships two builds of the evaluator:

- **speed** (`-O3`, ~1.77 MB wasm): faster script evaluation.
- **size** (`-Oz`, ~0.94 MB wasm): smaller download.

`@lucid-evolution/uplc` resolves to the speed build on Node, Bun and Deno, and to the size build in browser bundles and edge runtimes (`browser`, `worker`, `workerd` and `edge-light` export conditions). To pick a variant explicitly, import `@lucid-evolution/uplc/speed` or `@lucid-evolution/uplc/size`.
