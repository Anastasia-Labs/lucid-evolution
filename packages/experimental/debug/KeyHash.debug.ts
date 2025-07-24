import * as KeyHash from "../src/KeyHash.js";

console.log("=== KeyHash Debug - Testing Error Messages ===\n");

// Valid test data
const validHex = "a".repeat(56);

console.log("1. Valid Operations:");
console.log("==================");

try {
  const keyHash = KeyHash.Codec.Decode.string(validHex);
  console.log("✅ Valid hex decode:", keyHash);

  const encodedBytes = KeyHash.Codec.Encode.bytes(keyHash);
  console.log("✅ Encode to bytes:", encodedBytes.length, "bytes");

  const encodedHex = KeyHash.Codec.Encode.string(keyHash);
  console.log("✅ Encode to hex:", encodedHex);
} catch (error) {
  console.error(
    "❌ Unexpected error in valid operations:",
    (error as Error).message
  );
}

console.log("\n2. Invalid Hex String Errors:");
console.log("==============================");

// Test invalid hex characters
try {
  const invalidHex = "g".repeat(56);
  KeyHash.Codec.Decode.string(invalidHex);
} catch (error) {
  console.log("❌ Invalid hex characters error:");
  console.log(error)
}

// Test invalid hex length (too short)
try {
  const shortHex = "a".repeat(54);
  KeyHash.Codec.Decode.string(shortHex);
} catch (error) {
  console.log("\n❌ Invalid hex length (too short) error:");
  console.log(error);
}

// Test invalid hex length (too long)
try {
  const longHex = "a".repeat(58);
  KeyHash.Codec.Decode.string(longHex);
} catch (error) {
  console.log("\n❌ Invalid hex length (too long) error:");
  console.log(error);
}

console.log("\n3. Invalid Bytes Errors:");
console.log("=========================");

// Test invalid bytes length (too short)
try {
  const shortBytes = new Uint8Array(26).fill(170);
  KeyHash.Codec.Decode.bytes(shortBytes);
} catch (error) {
  console.log("❌ Invalid bytes length (too short) error:");
  console.log(error);
}

// Test invalid bytes length (too long)
try {
  const longBytes = new Uint8Array(30).fill(170);
  KeyHash.Codec.Decode.bytes(longBytes);
} catch (error) {
  console.log("\n❌ Invalid bytes length (too long) error:");
  console.log(error);
}

console.log("\n=== Debug Complete ===");

console.log("\n4. Either Methods Testing:");
console.log("==========================");

// Test valid operations with Either
console.log("✅ Valid Either operations:");
const hexEither = KeyHash.Codec.DecodeEither.string(validHex);
if (hexEither._tag === "Right") {
  console.log("✅ DecodeEither.hex success:", hexEither.right);
  
  const bytesEither = KeyHash.Codec.EncodeEither.bytes(hexEither.right);
  if (bytesEither._tag === "Right") {
    console.log("✅ EncodeEither.bytes success:", bytesEither.right.length, "bytes");
  } else {
    console.log("❌ EncodeEither.bytes failed:", bytesEither.left);
  }
  
  const hexEncodeEither = KeyHash.Codec.EncodeEither.string(hexEither.right);
  if (hexEncodeEither._tag === "Right") {
    console.log("✅ EncodeEither.hex success:", hexEncodeEither.right);
  } else {
    console.log("❌ EncodeEither.hex failed:", hexEncodeEither.left);
  }
} else {
  console.log("❌ DecodeEither.hex failed:", hexEither.left);
}

// Test invalid operations with Either
console.log("\n❌ Invalid Either operations:");
const invalidHexEither = KeyHash.Codec.DecodeEither.string("invalid");
if (invalidHexEither._tag === "Left") {
  console.log("❌ DecodeEither.hex with invalid hex:");
  console.log("Error type:", invalidHexEither.left._tag);
  console.log("Error message:", invalidHexEither.left.message);
} else {
  console.log("Unexpected success with invalid hex");
}

const invalidBytesEither = KeyHash.Codec.DecodeEither.bytes(new Uint8Array(10));
if (invalidBytesEither._tag === "Left") {
  console.log("\n❌ DecodeEither.bytes with invalid length:");
  console.log("Error type:", invalidBytesEither.left._tag);
  console.log("Error message:", invalidBytesEither.left.cause)
} else {
  console.log("Unexpected success with invalid bytes");
}
