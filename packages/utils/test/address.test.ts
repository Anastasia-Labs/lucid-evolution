import { expect, test } from "vitest";
import { getAddressDetails } from "../src/address.js";

test("Address parsing - paymentCredential and stakeCredential in bech32", () => {
  const addressDetails = getAddressDetails(
    "addr_test1qpq0sac2x0vfqdn88n3yafgpeefusdhuuznjf97a724hlhvz4nd0684hr2k2kwj5g56v8ptavh32u95gxsunst4hskxqnwj6fq",
  );
  expect(addressDetails).toStrictEqual({
    type: "Base",
    networkId: 0,
    address: {
      bech32:
        "addr_test1qpq0sac2x0vfqdn88n3yafgpeefusdhuuznjf97a724hlhvz4nd0684hr2k2kwj5g56v8ptavh32u95gxsunst4hskxqnwj6fq",
      hex: "0040f8770a33d89036673ce24ea501ce53c836fce0a72497ddf2ab7fdd82acdafd1eb71aacab3a544534c3857d65e2ae16883439382eb7858c",
    },
    paymentCredential: {
      type: "Key",
      hash: "40f8770a33d89036673ce24ea501ce53c836fce0a72497ddf2ab7fdd",
    },
    stakeCredential: {
      type: "Key",
      hash: "82acdafd1eb71aacab3a544534c3857d65e2ae16883439382eb7858c",
    },
  });
});

test("Address parsing - paymentCredential and stakeCredential in hex", () => {
  const addressDetails = getAddressDetails(
    "0040f8770a33d89036673ce24ea501ce53c836fce0a72497ddf2ab7fdd82acdafd1eb71aacab3a544534c3857d65e2ae16883439382eb7858c",
  );
  expect(addressDetails).toStrictEqual({
    type: "Base",
    networkId: 0,
    address: {
      bech32:
        "addr_test1qpq0sac2x0vfqdn88n3yafgpeefusdhuuznjf97a724hlhvz4nd0684hr2k2kwj5g56v8ptavh32u95gxsunst4hskxqnwj6fq",
      hex: "0040f8770a33d89036673ce24ea501ce53c836fce0a72497ddf2ab7fdd82acdafd1eb71aacab3a544534c3857d65e2ae16883439382eb7858c",
    },
    paymentCredential: {
      type: "Key",
      hash: "40f8770a33d89036673ce24ea501ce53c836fce0a72497ddf2ab7fdd",
    },
    stakeCredential: {
      type: "Key",
      hash: "82acdafd1eb71aacab3a544534c3857d65e2ae16883439382eb7858c",
    },
  });
});

test("Address parsing - paymentCredential in bech32", () => {
  const addressDetails = getAddressDetails(
    "addr_test1vpq0sac2x0vfqdn88n3yafgpeefusdhuuznjf97a724hlhgc3l3we",
  );
  expect(addressDetails).toStrictEqual({
    type: "Enterprise",
    networkId: 0,
    address: {
      bech32: "addr_test1vpq0sac2x0vfqdn88n3yafgpeefusdhuuznjf97a724hlhgc3l3we",
      hex: "6040f8770a33d89036673ce24ea501ce53c836fce0a72497ddf2ab7fdd",
    },
    paymentCredential: {
      type: "Key",
      hash: "40f8770a33d89036673ce24ea501ce53c836fce0a72497ddf2ab7fdd",
    },
  });
});

test("Address parsing - paymentCredential in hex", () => {
  const addressDetails = getAddressDetails(
    "6040f8770a33d89036673ce24ea501ce53c836fce0a72497ddf2ab7fdd",
  );
  expect(addressDetails).toStrictEqual({
    type: "Enterprise",
    networkId: 0,
    address: {
      bech32: "addr_test1vpq0sac2x0vfqdn88n3yafgpeefusdhuuznjf97a724hlhgc3l3we",
      hex: "6040f8770a33d89036673ce24ea501ce53c836fce0a72497ddf2ab7fdd",
    },
    paymentCredential: {
      type: "Key",
      hash: "40f8770a33d89036673ce24ea501ce53c836fce0a72497ddf2ab7fdd",
    },
  });
});

test("Address parsing - stakeCredential in bech32", () => {
  const addressDetails = getAddressDetails(
    "stake_test1uzp2ekhar6m34t9t8f2y2dxrs47ktc4wz6yrgwfc96mctrqxdrmv4",
  );
  expect(addressDetails).toStrictEqual({
    type: "Reward",
    networkId: 0,
    address: {
      bech32:
        "stake_test1uzp2ekhar6m34t9t8f2y2dxrs47ktc4wz6yrgwfc96mctrqxdrmv4",
      hex: "e082acdafd1eb71aacab3a544534c3857d65e2ae16883439382eb7858c",
    },
    stakeCredential: {
      type: "Key",
      hash: "82acdafd1eb71aacab3a544534c3857d65e2ae16883439382eb7858c",
    },
  });
});

test("Address parsing - stakeCredential in hex", () => {
  const addressDetails = getAddressDetails(
    "e082acdafd1eb71aacab3a544534c3857d65e2ae16883439382eb7858c",
  );
  expect(addressDetails).toStrictEqual({
    type: "Reward",
    networkId: 0,
    address: {
      bech32:
        "stake_test1uzp2ekhar6m34t9t8f2y2dxrs47ktc4wz6yrgwfc96mctrqxdrmv4",
      hex: "e082acdafd1eb71aacab3a544534c3857d65e2ae16883439382eb7858c",
    },
    stakeCredential: {
      type: "Key",
      hash: "82acdafd1eb71aacab3a544534c3857d65e2ae16883439382eb7858c",
    },
  });
});
