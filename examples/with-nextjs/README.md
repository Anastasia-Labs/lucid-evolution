# Evolution SDK Next.js Example

This is a minimal starter kit for using [Evolution SDK](https://github.com/no-witness-labs/evolution-sdk) with Next.js 15.

## Getting Started

```bash
pnpm install
pnpm dev
```

> Open [http://localhost:3000](http://localhost:3000)

## How It Works

This template demonstrates the proper way to integrate WASM-based libraries in Next.js:

- **WebPack Configuration** `next.config.ts` file includes necessary WebAssembly support
- **Client Components** Components that need WASM are marked with `"use client"` and are dynamically imported with `{ ssr: false }`
- **Server-Side API** Transaction building happens in API routes on the server
- **Client-Side Signing** Transaction signing and submission happen in the browser
