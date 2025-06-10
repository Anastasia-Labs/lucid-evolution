import { describe, expect, it } from "vitest";
import { describeTransactionMetadatumLabel, TransactionMetadatumLabel, TransactionMetadatumLabels } from "../src/TransactionMetadatumLabels.js";

describe("TransactionMetadatumLabels Validation", () => {
  it("should behave as expected", () => {
    const labels: TransactionMetadatumLabels =
      new TransactionMetadatumLabels({
        fromLabels: [],
      });
    expect(labels.size()).toStrictEqual(0);
    expect(labels.get(0)).toStrictEqual(undefined);

    // Test add a label:
    labels.add(674);
    expect(labels.size()).toStrictEqual(1);
    expect(labels.get(0)).toStrictEqual(674);
    expect(labels.get(1)).toStrictEqual(undefined);

    // Test add another label:
    labels.add(721);
    expect(labels.size()).toStrictEqual(2);
    expect(labels.get(0)).toStrictEqual(674);
    expect(labels.get(1)).toStrictEqual(721);
    expect(labels.get(2)).toStrictEqual(undefined);

    // Test override labels:
    labels.set([61284, 61285, 61286]);
    expect(labels.size()).toStrictEqual(3);
    expect(labels.get(0)).toStrictEqual(61284);
    expect(labels.get(1)).toStrictEqual(61285);
    expect(labels.get(2)).toStrictEqual(61286);
    expect(labels.get(3)).toStrictEqual(undefined);

    // Test removeFirst:
    labels.set([674, 721, 721, 61284, 61285, 61286, 61285]);
    expect(labels.size()).toStrictEqual(7);
    labels.removeFirst(61285);
    expect(labels.size()).toStrictEqual(6);
    expect(labels.get(4)).toStrictEqual(61286);

    // Test removeLast:
    labels.set([674, 721, 721, 61284, 61285, 61286, 61285]);
    expect(labels.size()).toStrictEqual(7);
    labels.removeLast(61285);
    expect(labels.size()).toStrictEqual(6);
    expect(labels.get(4)).toStrictEqual(61285);

    // Test removeAll:
    labels.set([674, 721, 721, 61284, 61285, 61286, 61285]);
    expect(labels.size()).toStrictEqual(7);
    expect(labels.has(721)).to.be.true;
    labels.removeAll(721);
    expect(labels.has(721)).to.be.false;

    // Test removeAt:
    labels.set([674, 721, 721, 61284, 61285, 61286, 61285]);
    expect(labels.size()).toStrictEqual(7);
    labels.removeAt(3); // 61284
    expect(labels.size()).toStrictEqual(6);
    expect(labels.get(3)).toStrictEqual(61285);
  });

  it("should describe correctly", () => {
    const labels: TransactionMetadatumLabel[] =
      [674, 721, 721, 61284, 61285, 61286, 61285];

    const expectedDescriptions: string[] = [
      "CIP-0020 - Transaction message/comment metadata",
      "CIP-0025 - NFT Token Standard",
      "CIP-0025 - NFT Token Standard",
      "CIP-0015 - Catalyst registration",
      "CIP-0015 - Catalyst witness",
      "CIP-0015 - Catalyst deregistration",
      "CIP-0015 - Catalyst witness",
    ];

    for (let i = 0; i < labels.length; i++) {
      expect(
        describeTransactionMetadatumLabel(labels[i])
      ).toStrictEqual(expectedDescriptions[i]);
    }
  });
});
