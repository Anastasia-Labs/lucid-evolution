"use strict";

// Recovers the Node.js bindings from a wasm trap. A trap or a stack overflow
// inside wasm unwinds without restoring the instance's stack pointer or
// releasing the state it was using, so every later call on that instance can
// fail. After a binding throws, the next call first replaces the instance with
// a fresh one (wasm-bindgen's `__wbg_reset_state`); the error itself is
// rethrown unchanged. Results that came from a replaced instance throw when
// read, and freeing them, explicitly or by garbage collection, leaves the
// current instance alone.
//
// Returns a function that wraps one binding of `bindings`.
module.exports = (bindings) => {
  let replaceInstance = false;
  // The results the current instance returned: only these are freed in it.
  let current = new WeakSet();

  for (const value of Object.values(bindings)) {
    const free = value?.prototype?.free;
    if (typeof free !== "function") continue;
    value.prototype.free = function () {
      if (current.has(this)) free.call(this);
    };
    if (Symbol.dispose) value.prototype[Symbol.dispose] = value.prototype.free;
  }

  return (binding) =>
    function (...args) {
      if (replaceInstance) {
        bindings.__wbg_reset_state();
        current = new WeakSet();
        replaceInstance = false;
      }
      let result;
      try {
        result = binding.apply(this, args);
      } catch (error) {
        replaceInstance = true;
        throw error;
      }
      if (typeof result === "object" && result !== null) current.add(result);
      return result;
    };
};
