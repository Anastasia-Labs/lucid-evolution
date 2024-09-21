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
