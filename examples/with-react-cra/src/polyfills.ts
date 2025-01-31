import { Buffer } from "buffer";

window.Buffer = Buffer;

// Add Buffer to the global type
declare global {
  interface Window {
    Buffer: typeof Buffer;
  }
}
