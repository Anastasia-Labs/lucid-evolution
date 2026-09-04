/**
 * Explicit ownership for CML (cardano-multiplatform-lib) objects.
 *
 * Every CML value is a wasm-bindgen wrapper around an allocation in the CML
 * wasm linear memory. That allocation is only returned to the allocator when
 * `free()` runs, either explicitly or from the FinalizationRegistry cleanup
 * that follows a *major* JavaScript garbage collection. The wrappers
 * themselves are tiny, so the JavaScript heap stays small and V8 rarely runs a
 * major collection, while the wasm arena keeps the full size of every
 * transaction, output, script and datum that was ever decoded. In long-lived
 * processes, and in test suites that build many transactions per process,
 * this shows up as steadily growing external memory and, once it exceeds
 * V8's external-memory limit, as a full compacting GC on almost every
 * allocation.
 *
 * Conventions:
 * - a function frees every CML object it created and does not return;
 * - CML arguments are borrowed: CML clones whatever it keeps, so the caller
 *   may free an argument as soon as the call returns;
 * - a returned CML object belongs to the caller.
 *
 * `withCMLScope` keeps that tidy in code that creates a chain of temporaries.
 */
export interface CMLFreeable {
  free(): void;
}

/**
 * Registers a CML temporary with the enclosing `withCMLScope` and returns it.
 * `undefined` passes through so optional CML getters can be registered
 * directly.
 */
export type CMLOwn = <T extends CMLFreeable | undefined>(object: T) => T;

/**
 * Runs `body` with an `own` function that registers CML temporaries. Every
 * registered object is freed when `body` returns or throws, in reverse order
 * of registration. The value `body` returns is never freed, so return only
 * objects that were not registered.
 */
export const withCMLScope = <T>(body: (own: CMLOwn) => T): T => {
  const owned: CMLFreeable[] = [];
  const own: CMLOwn = (object) => {
    if (object !== undefined) owned.push(object);
    return object;
  };
  try {
    return body(own);
  } finally {
    for (let i = owned.length - 1; i >= 0; i--) owned[i].free();
  }
};

/** Frees every defined object in `objects`. */
export const freeCML = (
  ...objects: ReadonlyArray<CMLFreeable | undefined | null>
): void => {
  // Helpers that return their input unchanged (no redeemers to rewrite, for
  // example) let the same object arrive twice; free each one once.
  for (const object of new Set(objects)) object?.free();
};
