import { Devnet } from "@lucid-evolution/experimental";

const range = Array.from({ length: 4 }, (_, i) => i + 1);

const clusters = await Promise.all(
  range.map(async (cluster) => {
    return await Devnet.Cluster.makeOrThrow({
      clusterName: `devnet-${cluster}`,
      ports: {
        node: 4000 + cluster,
        submit: 5001 + cluster,
      },
      shelleyGenesis: {
        slotLength: 0.05, // 50ms
        epochLength: 1,
        initialFunds: {
          ["60e4b3a3b8cc86c12deb83cb3db865e8b23ba99fa143d8e604ec6076e0"]: 123456789, // use full address hex instead of keyhash
        },
      },
      kupo: {
        port: 6002 + cluster,
      },
      ogmios: {
        port: 7003 + cluster,
      },
    });
  }),
);

await Promise.all(
  clusters.map((cluster) => Devnet.Cluster.startOrThrow(cluster)),
);
