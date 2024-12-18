---
"@lucid-evolution/provider": patch
---

Upgrade kupmios and koios provider

# Koios

Before

```ts
const koios = new KoiosProvider("<api-url>");
```

After

```ts
const koios = new KoiosProvider("<koios-api-url>");
```

or

```ts
const koios = new KoiosProvider("<koios-api-url>", "<koios-bearer-token>");
```

# Kupmios

Before

```ts
const kupmios = new Kupmios("<kupo-api-url>", "<ogmios-api-url>");
```

After

```ts
const kupmios = new Kupmios("<kupo-api-url>", "<ogmios-api-url>", {
  kupoHeader: { "dmtr-api-key": "<kupo-api-key>" },
  ogmiosHeader: { "dmtr-api-key": "<ogmios-api-key>" },
});
```
