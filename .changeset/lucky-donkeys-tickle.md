---
"@lucid-evolution/uplc": patch
---

Fix unbounded wasm memory growth by dropping the `wee_alloc` global allocator

`wee_alloc` has been unmaintained since 2019 and its free lists never return
freed blocks to the allocator, so every `apply_params_to_script` and
`eval_phase_two_raw` call grew wasm linear memory permanently. Because wasm
linear memory can only grow, a long-lived process walked monotonically into the
~4 GiB wasm32 ceiling, at which point Rust's allocator aborts and the next
evaluation surfaces to JavaScript as `EvaluatorError: unreachable` — a
WebAssembly trap that reads like an on-chain validator rejection.

Measured with `apply_params_to_script` over an 845-byte parameterized Plutus V3
script, 2000 calls:

|                      | growth per call       | after 2000 calls       | wall time |
| -------------------- | --------------------- | ---------------------- | --------- |
| `wee_alloc`          | 33,554 bytes          | 65.13 MiB and climbing | 502 ms    |
| default (`dlmalloc`) | 0 bytes after warm-up | 1.25 MiB, flat         | 277 ms    |

Removing the allocator costs 1,322 bytes of wasm (+0.14%) and makes the module
45% faster, since `wee_alloc` traded speed for a size win that no longer exists.
