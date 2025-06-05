import { Data, Effect } from "effect";
import Docker from "dockerode";
import * as fs from "fs";
import * as path from "path";
import * as os from "os";
import * as DevNetConfig from "./DevnetConfig.js";

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
    | "file_permissions_failed";
  message: string;
  cause?: unknown;
}> {}

export interface DevNetContainer {
  readonly id: string;
  readonly name: string;
}

const findContainer = (containerName: string) =>
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
  });

const writeConfigFiles = (config: Required<DevNetConfig.DevNetConfig>) =>
  Effect.gen(function* () {
    const tempDir = yield* Effect.tryPromise({
      try: () => fs.promises.mkdtemp(path.join(os.tmpdir(), "cardano-devnet-")),
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
  });

const createDockerContainer = (config: Required<DevNetConfig.DevNetConfig>) =>
  Effect.gen(function* () {
    const tempDir = yield* writeConfigFiles(config);
    const docker = new Docker();

    return yield* Effect.tryPromise({
      try: () =>
        docker.createContainer({
          Image: config.image,
          name: config.containerName,
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
            ],
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
        }),
      catch: (cause) =>
        new CardanoDevNetError({
          reason: "container_creation_failed",
          message:
            "Verify Docker daemon is running and the image is accessible.",
          cause,
        }),
    });
  });

/**
 * Create a new cardano devnet container without starting it.
 *
 * @example
 * import { make } from "@lucid-evolution/experimental/CardanoNode/DevNet";
 * import { Effect } from "effect";
 *
 * // Create a container with default config
 * const container1 = yield* make();
 *
 * // Create multiple containers with different configs
 * const container2 = yield* make({
 *   containerName: "devnet-test-2",
 *   ports: { node: 4002, submit: 8091 }
 * });
 *
 * @since 2.0.0
 * @category constructors
 */
export const make = (
  config: DevNetConfig.DevNetConfig = {},
): Effect.Effect<DevNetContainer, CardanoDevNetError> =>
  Effect.gen(function* () {
    const fullConfig: Required<DevNetConfig.DevNetConfig> = {
      containerName:
        config.containerName ??
        DevNetConfig.DEFAULT_DEVNET_CONFIG.containerName,
      image: config.image ?? DevNetConfig.DEFAULT_DEVNET_CONFIG.image,
      ports: { ...DevNetConfig.DEFAULT_DEVNET_CONFIG.ports, ...config.ports },
      networkMagic:
        config.networkMagic ?? DevNetConfig.DEFAULT_DEVNET_CONFIG.networkMagic,
      nodeConfig: {
        ...DevNetConfig.DEFAULT_DEVNET_CONFIG.nodeConfig,
        ...config.nodeConfig,
      },
      byronGenesis: {
        ...DevNetConfig.DEFAULT_DEVNET_CONFIG.byronGenesis,
        ...config.byronGenesis,
      },
      shelleyGenesis: {
        ...DevNetConfig.DEFAULT_DEVNET_CONFIG.shelleyGenesis,
        ...config.shelleyGenesis,
      },
      alonzoGenesis: {
        ...DevNetConfig.DEFAULT_DEVNET_CONFIG.alonzoGenesis,
        ...config.alonzoGenesis,
      },
      conwayGenesis: {
        ...DevNetConfig.DEFAULT_DEVNET_CONFIG.conwayGenesis,
        ...config.conwayGenesis,
      },
      kesKey: {
        ...DevNetConfig.DEFAULT_DEVNET_CONFIG.kesKey,
        ...config.kesKey,
      },
      opCert: {
        ...DevNetConfig.DEFAULT_DEVNET_CONFIG.opCert,
        ...config.opCert,
      },
      vrfSkey: {
        ...DevNetConfig.DEFAULT_DEVNET_CONFIG.vrfSkey,
        ...config.vrfSkey,
      },
    };

    // Remove existing container if it exists
    const existingContainer = yield* findContainer(fullConfig.containerName);
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

    const dockerContainer = yield* createDockerContainer(fullConfig);

    return {
      id: dockerContainer.id,
      name: fullConfig.containerName,
    };
  });

export const makeOrThrow = (config: DevNetConfig.DevNetConfig = {}) =>
  Effect.runPromise(make(config));

/**
 * Start a specific devnet container.
 *
 * @example
 * import { make, startContainer } from "@lucid-evolution/experimental/CardanoNode/DevNet";
 * import { Effect } from "effect";
 *
 * const container = yield* make({ containerName: "my-devnet" });
 * yield* startContainer(container);
 *
 * @since 2.0.0
 * @category lifecycle
 */
export const startContainer = (
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
  });

/**
 * Stop a specific devnet container.
 *
 * @example
 * import { stopContainer } from "@lucid-evolution/experimental/CardanoNode/DevNet";
 * import { Effect } from "effect";
 *
 * yield* stopContainer(container);
 *
 * @since 2.0.0
 * @category lifecycle
 */
export const stopContainer = (
  container: DevNetContainer,
): Effect.Effect<void, CardanoDevNetError> =>
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
  });

export const startContainerOrThrow = (container: DevNetContainer) =>
  Effect.runPromise(startContainer(container));

/**
 * Remove a specific devnet container.
 *
 * @example
 * import { removeContainer } from "@lucid-evolution/experimental/CardanoNode/DevNet";
 * import { Effect } from "effect";
 *
 * yield* removeContainer(container);
 *
 * @since 2.0.0
 * @category lifecycle
 */
export const removeContainer = (
  container: DevNetContainer,
): Effect.Effect<void, CardanoDevNetError> =>
  Effect.gen(function* () {
    yield* stopContainer(container);

    yield* Effect.tryPromise({
      try: () => new Docker().getContainer(container.id).remove(),
      catch: (cause) =>
        new CardanoDevNetError({
          reason: "container_removal_failed",
          message: "Ensure the container is stopped and no volumes are in use.",
          cause,
        }),
    });
  });

export const removeContainerOrThrow = (container: DevNetContainer) =>
  Effect.runPromise(removeContainer(container));

export const getContainerStatus = (
  container: DevNetContainer,
): Effect.Effect<Docker.ContainerInspectInfo | undefined, CardanoDevNetError> =>
  Effect.tryPromise({
    try: () => new Docker().getContainer(container.id).inspect(),
    catch: (cause) =>
      new CardanoDevNetError({
        reason: "container_inspection_failed",
        message: "The container may be corrupted or inaccessible.",
        cause,
      }),
  });
