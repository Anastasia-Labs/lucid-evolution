import { Data, Effect } from "effect";
import Docker from "dockerode";
import * as fs from "fs";
import * as path from "path";
import * as os from "os";
import * as DevnetDefault from "./DevnetDefault.js";

export class CardanoDevNetError extends Data.TaggedError("CardanoDevNetError")<{
  reason:
    | "container_not_found"
    | "container_creation_failed"
    | "container_start_failed"
    | "container_stop_failed"
    | "container_removal_failed"
    | "container_inspection_failed"
    | "temp_directory_creation_failed"
    | "config_file_write_failed"
    | "file_permissions_failed"
    | "network_creation_failed"
    | "kupo_container_creation_failed"
    | "kupo_container_start_failed"
    | "kupo_container_stop_failed"
    | "ogmios_container_creation_failed"
    | "ogmios_container_start_failed"
    | "ogmios_container_stop_failed";
  message: string;
  cause?: unknown;
}> {}

export interface DevNetContainer {
  readonly id: string;
  readonly name: string;
}

export interface DevNetCluster {
  readonly cardanoNode: DevNetContainer;
  readonly kupo?: DevNetContainer;
  readonly ogmios?: DevNetContainer;
  readonly networkName: string;
}

/**
 * Internal utilities for DevNet operations.
 *
 * @since 2.0.0
 * @category utilities
 */
const Utils = {
  findContainer: (containerName: string) =>
    Effect.tryPromise({
      try: () => {
        const docker = new Docker();
        return docker.listContainers({ all: true }).then((containers) => {
          const found = containers.find((c) =>
            c.Names.includes(`/${containerName}`),
          );
          return found ? docker.getContainer(found.Id) : undefined;
        });
      },
      catch: (cause) =>
        new CardanoDevNetError({
          reason: "container_not_found",
          message: "Ensure Docker is running and accessible.",
          cause,
        }),
    }),

  writeConfigFiles: (config: Required<DevnetDefault.DevNetConfig>) =>
    Effect.gen(function* () {
      const tempDir = yield* Effect.tryPromise({
        try: () =>
          fs.promises.mkdtemp(path.join(os.tmpdir(), "cardano-devnet-")),
        catch: (cause) =>
          new CardanoDevNetError({
            reason: "temp_directory_creation_failed",
            message: "Check if the system temp directory is writable.",
            cause,
          }),
      });

      yield* Effect.logInfo(`Writing config files to: ${tempDir}`);

      const writeFile = (filename: string, content: unknown) =>
        Effect.tryPromise({
          try: () =>
            fs.promises.writeFile(
              path.join(tempDir, filename),
              JSON.stringify(content, null, 2),
            ),
          catch: (cause) =>
            new CardanoDevNetError({
              reason: "config_file_write_failed",
              message: `Ensure sufficient disk space and write permissions for ${filename}.`,
              cause,
            }),
        });

      const setFilePermissions = (filename: string, mode: number) =>
        Effect.tryPromise({
          try: () => fs.promises.chmod(path.join(tempDir, filename), mode),
          catch: (cause) =>
            new CardanoDevNetError({
              reason: "file_permissions_failed",
              message: `Check if the filesystem supports permission changes for ${filename}.`,
              cause,
            }),
        });

      const topology = {
        Producers: [],
      } as const;

      yield* Effect.all([
        writeFile("config.json", config.nodeConfig),
        writeFile("topology.json", topology),
        writeFile("genesis-byron.json", config.byronGenesis),
        writeFile("genesis-shelley.json", config.shelleyGenesis),
        writeFile("genesis-alonzo.json", config.alonzoGenesis),
        writeFile("genesis-conway.json", config.conwayGenesis),
        writeFile("kes.skey", config.kesKey),
        setFilePermissions("kes.skey", 0o600), // Owner read/write only
        writeFile("pool.cert", config.opCert),
        setFilePermissions("pool.cert", 0o600), // Owner read/write only
        writeFile("vrf.skey", config.vrfSkey),
        setFilePermissions("vrf.skey", 0o600), // Owner read/write only
      ]);

      return tempDir;
    }),

  createCardanoContainer: (
    config: Required<DevnetDefault.DevNetConfig>,
    networkName: string,
    tempDir: string,
  ) =>
    Effect.tryPromise({
      try: () => {
        const docker = new Docker();
        const volumeName = `${config.clusterName}-ipc`;
        return docker.createContainer({
          Image: config.image,
          name: `${config.clusterName}-cardano-node`,
          ExposedPorts: {
            [`${config.ports.node}/tcp`]: {},
            [`${config.ports.submit}/tcp`]: {},
          },
          HostConfig: {
            PortBindings: {
              [`${config.ports.node}/tcp`]: [
                { HostPort: String(config.ports.node) },
              ],
              [`${config.ports.submit}/tcp`]: [
                { HostPort: String(config.ports.submit) },
              ],
            },
            Binds: [
              `${tempDir}:/opt/cardano/config:ro`,
              `${tempDir}:/opt/cardano/keys:ro`,
              `${volumeName}:/opt/cardano/ipc`,
            ],
            // NetworkMode: networkName,
          },
          Env: [
            `CARDANO_NODE_SOCKET_PATH=/opt/cardano/ipc/node.socket`,
            `CARDANO_BLOCK_PRODUCER=true`,
            `CARDANO_NETWORK_MAGIC=${config.networkMagic}`,
          ],
          Cmd: [
            "run",
            "--topology",
            "/opt/cardano/config/topology.json",
            "--database-path",
            "/opt/cardano/data",
            "--socket-path",
            "/opt/cardano/ipc/node.socket",
            "--host-addr",
            "0.0.0.0",
            "--port",
            String(config.ports.node),
            "--config",
            "/opt/cardano/config/config.json",
            "--shelley-kes-key",
            "/opt/cardano/config/kes.skey",
            "--shelley-vrf-key",
            "/opt/cardano/config/vrf.skey",
            "--shelley-operational-certificate",
            "/opt/cardano/config/pool.cert",
          ],
        });
      },
      catch: (cause) =>
        new CardanoDevNetError({
          reason: "container_creation_failed",
          message:
            "Verify Docker daemon is running and the image is accessible.",
          cause,
        }),
    }),

  createKupoContainer: (
    config: Required<DevnetDefault.DevNetConfig>,
    networkName: string,
    tempDir: string,
  ) =>
    Effect.gen(function* () {
      if (!config.kupo.enabled) return undefined;

      const docker = new Docker();
      const kupoName = `${config.clusterName}-kupo`;
      const volumeName = `${config.clusterName}-ipc`;

      // Build command arguments with proper type checking
      const cmdArgs = [
        "--node-socket",
        "/ipc/node.socket",
        "--host",
        "0.0.0.0",
        "--port",
        String(config.kupo.port),
        "--log-level",
        config.kupo.logLevel || "Info",
        "--node-config",
        "/config/config.json",
        "--match",
        config.kupo.match || "*",
        "--since",
        config.kupo.since || "origin",
        "--workdir",
        "/db",
      ];

      // Add optional defer-db-indexes flag
      if (config.kupo.deferDbIndexes) {
        cmdArgs.push("--defer-db-indexes");
      }

      return yield* Effect.tryPromise({
        try: () =>
          docker.createContainer({
            Image: config.kupo.image || DevnetDefault.DEFAULT_KUPO_CONFIG.image,
            name: kupoName,
            ExposedPorts: {
              [`${config.kupo.port || DevnetDefault.DEFAULT_KUPO_CONFIG.port}/tcp`]:
                {},
            },
            HostConfig: {
              PortBindings: {
                [`${config.kupo.port || DevnetDefault.DEFAULT_KUPO_CONFIG.port}/tcp`]:
                  [
                    {
                      HostPort: String(
                        config.kupo.port ||
                          DevnetDefault.DEFAULT_KUPO_CONFIG.port,
                      ),
                    },
                  ],
              },
              // NetworkMode: networkName,
              Binds: [`${tempDir}:/config:ro`, `${volumeName}:/ipc`],
            },
            Env: [
              `CARDANO_NETWORK=custom`,
              `CARDANO_NODE_SOCKET_PATH=/ipc/node.socket`,
            ],
            Cmd: cmdArgs,
          }),
        catch: (cause) =>
          new CardanoDevNetError({
            reason: "kupo_container_creation_failed",
            message:
              "Failed to create Kupo container. Check Docker permissions and image availability.",
            cause,
          }),
      });
    }),

  createOgmiosContainer: (
    config: Required<DevnetDefault.DevNetConfig>,
    networkName: string,
    tempDir: string,
  ) =>
    Effect.gen(function* () {
      if (!config.ogmios.enabled) return undefined;

      const docker = new Docker();
      const ogmiosName = `${config.clusterName}-ogmios`;
      const volumeName = `${config.clusterName}-ipc`;

      return yield* Effect.tryPromise({
        try: () =>
          docker.createContainer({
            Image:
              config.ogmios.image || DevnetDefault.DEFAULT_OGMIOS_CONFIG.image,
            name: ogmiosName,
            ExposedPorts: {
              [`${config.ogmios.port || DevnetDefault.DEFAULT_OGMIOS_CONFIG.port}/tcp`]:
                {},
            },
            HostConfig: {
              PortBindings: {
                [`${config.ogmios.port || DevnetDefault.DEFAULT_OGMIOS_CONFIG.port}/tcp`]:
                  [
                    {
                      HostPort: String(
                        config.ogmios.port ||
                          DevnetDefault.DEFAULT_OGMIOS_CONFIG.port,
                      ),
                    },
                  ],
              },
              // NetworkMode: networkName,
              Binds: [`${tempDir}:/config:ro`, `${volumeName}:/ipc`],
            },
            Env: [
              `NETWORK=custom`,
              `CARDANO_NODE_SOCKET_PATH=/ipc/node.socket`,
            ],
            Cmd: [
              "--log-level",
              config.ogmios.logLevel ||
                DevnetDefault.DEFAULT_OGMIOS_CONFIG.logLevel,
              "--host",
              "0.0.0.0",
              "--port",
              String(
                config.ogmios.port || DevnetDefault.DEFAULT_OGMIOS_CONFIG.port,
              ),
              "--node-socket",
              "/ipc/node.socket",
              "--node-config",
              "/config/config.json",
            ],
          }),
        catch: (cause) =>
          new CardanoDevNetError({
            reason: "ogmios_container_creation_failed",
            message:
              "Failed to create Ogmios container. Check Docker permissions and image availability.",
            cause,
          }),
      });
    }),
} as const;

/**
 * Cluster management operations for Cardano DevNet.
 *
 * @since 2.0.0
 * @category cluster
 */
export const Cluster = {
  /**
   * Create a new cardano devnet cluster with optional Kupo and Ogmios containers.
   *
   * @since 2.0.0
   * @category constructors
   */
  make: (
    config: DevnetDefault.DevNetConfig = {},
  ): Effect.Effect<DevNetCluster, CardanoDevNetError> =>
    Effect.gen(function* () {
      const fullConfig: Required<DevnetDefault.DevNetConfig> = {
        clusterName:
          config.clusterName ?? DevnetDefault.DEFAULT_DEVNET_CONFIG.clusterName,
        image: config.image ?? DevnetDefault.DEFAULT_DEVNET_CONFIG.image,
        ports: {
          ...DevnetDefault.DEFAULT_DEVNET_CONFIG.ports,
          ...config.ports,
        },
        networkMagic:
          config.networkMagic ??
          DevnetDefault.DEFAULT_DEVNET_CONFIG.networkMagic,
        nodeConfig: {
          ...DevnetDefault.DEFAULT_DEVNET_CONFIG.nodeConfig,
          ...config.nodeConfig,
        },
        byronGenesis: {
          ...DevnetDefault.DEFAULT_DEVNET_CONFIG.byronGenesis,
          ...config.byronGenesis,
        },
        shelleyGenesis: {
          ...DevnetDefault.DEFAULT_DEVNET_CONFIG.shelleyGenesis,
          ...config.shelleyGenesis,
        },
        alonzoGenesis: {
          ...DevnetDefault.DEFAULT_DEVNET_CONFIG.alonzoGenesis,
          ...config.alonzoGenesis,
        },
        conwayGenesis: {
          ...DevnetDefault.DEFAULT_DEVNET_CONFIG.conwayGenesis,
          ...config.conwayGenesis,
        },
        kesKey: {
          ...DevnetDefault.DEFAULT_DEVNET_CONFIG.kesKey,
          ...config.kesKey,
        },
        opCert: {
          ...DevnetDefault.DEFAULT_DEVNET_CONFIG.opCert,
          ...config.opCert,
        },
        vrfSkey: {
          ...DevnetDefault.DEFAULT_DEVNET_CONFIG.vrfSkey,
          ...config.vrfSkey,
        },
        kupo: {
          ...DevnetDefault.DEFAULT_DEVNET_CONFIG.kupo,
          ...config.kupo,
        },
        ogmios: {
          ...DevnetDefault.DEFAULT_DEVNET_CONFIG.ogmios,
          ...config.ogmios,
        },
      };

      const networkName = `${fullConfig.clusterName}-network`;

      // Write configuration files
      const tempDir = yield* Utils.writeConfigFiles(fullConfig);

      // Remove existing containers if they exist
      const containerNames = [
        `${fullConfig.clusterName}-cardano-node`,
        `${fullConfig.clusterName}-kupo`,
        `${fullConfig.clusterName}-ogmios`,
      ];

      for (const containerName of containerNames) {
        const existingContainer = yield* Utils.findContainer(containerName);
        if (existingContainer) {
          const info = yield* Effect.tryPromise({
            try: () => existingContainer.inspect(),
            catch: (cause) =>
              new CardanoDevNetError({
                reason: "container_inspection_failed",
                message: "The container may be in an invalid state.",
                cause,
              }),
          });

          if (info.State.Running) {
            yield* Effect.tryPromise({
              try: () => existingContainer.stop(),
              catch: (cause) =>
                new CardanoDevNetError({
                  reason: "container_stop_failed",
                  message:
                    "Try manually stopping the container or restarting Docker.",
                  cause,
                }),
            });
          }

          yield* Effect.tryPromise({
            try: () => existingContainer.remove(),
            catch: (cause) =>
              new CardanoDevNetError({
                reason: "container_removal_failed",
                message: "Ensure no processes are using the container.",
                cause,
              }),
          });
        }
      }

      // Create containers
      const cardanoContainer = yield* Utils.createCardanoContainer(
        fullConfig,
        networkName,
        tempDir,
      );
      const kupoContainer = yield* Utils.createKupoContainer(
        fullConfig,
        networkName,
        tempDir,
      );
      const ogmiosContainer = yield* Utils.createOgmiosContainer(
        fullConfig,
        networkName,
        tempDir,
      );

      return {
        cardanoNode: {
          id: cardanoContainer.id,
          name: `${fullConfig.clusterName}-cardano-node`,
        },
        kupo: kupoContainer
          ? {
              id: kupoContainer.id,
              name: `${fullConfig.clusterName}-kupo`,
            }
          : undefined,
        ogmios: ogmiosContainer
          ? {
              id: ogmiosContainer.id,
              name: `${fullConfig.clusterName}-ogmios`,
            }
          : undefined,
        networkName,
      };
    }),

  /**
   * Create a new cardano devnet cluster, throws on error.
   *
   * @since 2.0.0
   * @category constructors
   */
  makeOrThrow: (config: DevnetDefault.DevNetConfig = {}) =>
    Effect.runPromise(Cluster.make(config)),

  /**
   * Start a devnet cluster (all containers).
   *
   * @since 2.0.0
   * @category lifecycle
   */
  start: (cluster: DevNetCluster): Effect.Effect<void, CardanoDevNetError> =>
    Effect.gen(function* () {
      // Start Cardano node first
      yield* Container.start(cluster.cardanoNode);

      // Wait a bit for the node to initialize
      yield* Effect.sleep(2000);

      // Start child containers
      if (cluster.kupo) {
        yield* Container.start(cluster.kupo);
      }
      if (cluster.ogmios) {
        yield* Container.start(cluster.ogmios);
      }
    }),

  /**
   * Start a devnet cluster, throws on error.
   *
   * @since 2.0.0
   * @category lifecycle
   */
  startOrThrow: (cluster: DevNetCluster) =>
    Effect.runPromise(Cluster.start(cluster)),

  /**
   * Stop a devnet cluster (all containers).
   *
   * @since 2.0.0
   * @category lifecycle
   */
  stop: (cluster: DevNetCluster): Effect.Effect<void, CardanoDevNetError> =>
    Effect.gen(function* () {
      // Stop child containers first
      if (cluster.kupo) {
        yield* Container.stop(cluster.kupo);
      }
      if (cluster.ogmios) {
        yield* Container.stop(cluster.ogmios);
      }

      // Stop Cardano node last
      yield* Container.stop(cluster.cardanoNode);
    }),

  /**
   * Stop a devnet cluster, throws on error.
   *
   * @since 2.0.0
   * @category lifecycle
   */
  stopOrThrow: (cluster: DevNetCluster) =>
    Effect.runPromise(Cluster.stop(cluster)),

  /**
   * Remove a devnet cluster (all containers and network).
   *
   * @since 2.0.0
   * @category lifecycle
   */
  remove: (cluster: DevNetCluster): Effect.Effect<void, CardanoDevNetError> =>
    Effect.gen(function* () {
      // Remove containers (removeContainer stops them first)
      yield* Container.remove(cluster.cardanoNode);
      if (cluster.kupo) {
        yield* Container.remove(cluster.kupo);
      }
      if (cluster.ogmios) {
        yield* Container.remove(cluster.ogmios);
      }
    }),

  /**
   * Remove a devnet cluster, throws on error.
   *
   * @since 2.0.0
   * @category lifecycle
   */
  removeOrThrow: (cluster: DevNetCluster) =>
    Effect.runPromise(Cluster.remove(cluster)),
} as const;

/**
 * Individual container management operations.
 *
 * @since 2.0.0
 * @category container
 */
export const Container = {
  /**
   * Start a specific devnet container.
   *
   * @since 2.0.0
   * @category lifecycle
   */
  start: (
    container: DevNetContainer,
  ): Effect.Effect<void, CardanoDevNetError> =>
    Effect.tryPromise({
      try: () => new Docker().getContainer(container.id).start(),
      catch: (cause) =>
        new CardanoDevNetError({
          reason: "container_start_failed",
          message:
            "Check if ports are available and Docker has sufficient resources.",
          cause,
        }),
    }),

  /**
   * Start a specific devnet container, throws on error.
   *
   * @since 2.0.0
   * @category lifecycle
   */
  startOrThrow: (container: DevNetContainer) =>
    Effect.runPromise(Container.start(container)),

  /**
   * Stop a specific devnet container.
   *
   * @since 2.0.0
   * @category lifecycle
   */
  stop: (container: DevNetContainer): Effect.Effect<void, CardanoDevNetError> =>
    Effect.gen(function* () {
      const docker = new Docker();
      const dockerContainer = docker.getContainer(container.id);

      const info = yield* Effect.tryPromise({
        try: () => dockerContainer.inspect(),
        catch: (cause) =>
          new CardanoDevNetError({
            reason: "container_inspection_failed",
            message: "The container may have been removed externally.",
            cause,
          }),
      });

      if (info.State.Running) {
        yield* Effect.tryPromise({
          try: () => dockerContainer.stop(),
          catch: (cause) =>
            new CardanoDevNetError({
              reason: "container_stop_failed",
              message:
                "Try force stopping with 'docker stop --force' or restart Docker.",
              cause,
            }),
        });
      }
    }),

  /**
   * Stop a specific devnet container, throws on error.
   *
   * @since 2.0.0
   * @category lifecycle
   */
  stopOrThrow: (container: DevNetContainer) =>
    Effect.runPromise(Container.stop(container)),

  /**
   * Remove a specific devnet container.
   *
   * @since 2.0.0
   * @category lifecycle
   */
  remove: (
    container: DevNetContainer,
  ): Effect.Effect<void, CardanoDevNetError> =>
    Effect.gen(function* () {
      yield* Container.stop(container);

      yield* Effect.tryPromise({
        try: () => new Docker().getContainer(container.id).remove(),
        catch: (cause) =>
          new CardanoDevNetError({
            reason: "container_removal_failed",
            message:
              "Ensure the container is stopped and no volumes are in use.",
            cause,
          }),
      });
    }),

  /**
   * Remove a specific devnet container, throws on error.
   *
   * @since 2.0.0
   * @category lifecycle
   */
  removeOrThrow: (container: DevNetContainer) =>
    Effect.runPromise(Container.remove(container)),

  /**
   * Get container status information.
   *
   * @since 2.0.0
   * @category inspection
   */
  getStatus: (
    container: DevNetContainer,
  ): Effect.Effect<
    Docker.ContainerInspectInfo | undefined,
    CardanoDevNetError
  > =>
    Effect.tryPromise({
      try: () => new Docker().getContainer(container.id).inspect(),
      catch: (cause) =>
        new CardanoDevNetError({
          reason: "container_inspection_failed",
          message: "The container may be corrupted or inaccessible.",
          cause,
        }),
    }),

  /**
   * Get container status information, throws on error.
   *
   * @since 2.0.0
   * @category inspection
   */
  getStatusOrThrow: (container: DevNetContainer) =>
    Effect.runPromise(Container.getStatus(container)),
} as const;
