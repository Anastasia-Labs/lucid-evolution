export type ProviderTransportProtocol = "kupo" | "ogmios";

export type ProviderErrorKind =
  | "http"
  | "timeout"
  | "transport"
  | "decode"
  | "json_rpc"
  | "aborted"
  | "unknown";

export type KupmiosErrorOptions = {
  /** Optional only for compatibility with the former `{ cause }` constructor. */
  protocol?: ProviderTransportProtocol;
  /** Optional only for compatibility with the former `{ cause }` constructor. */
  operation?: string;
  cause?: unknown;
  kind?: ProviderErrorKind;
  status?: number;
  retryable?: boolean;
  retryAfterMs?: number;
  message?: string;
};

const asRecord = (value: unknown): Record<string, unknown> | undefined =>
  typeof value === "object" && value !== null
    ? (value as Record<string, unknown>)
    : undefined;

const responseStatus = (cause: unknown): number | undefined => {
  const response = asRecord(asRecord(cause)?.response);
  return typeof response?.status === "number" ? response.status : undefined;
};

export const retryAfterHeaderToMs = (
  value: string | undefined,
): number | undefined => {
  if (value === undefined) return undefined;

  const seconds = Number(value);
  if (Number.isFinite(seconds)) return Math.max(0, seconds * 1000);

  const timestamp = Date.parse(value);
  return Number.isNaN(timestamp)
    ? undefined
    : Math.max(0, timestamp - Date.now());
};

const retryAfter = (cause: unknown): number | undefined => {
  const response = asRecord(asRecord(cause)?.response);
  const headers = asRecord(response?.headers);
  const value = headers?.["retry-after"];
  return retryAfterHeaderToMs(typeof value === "string" ? value : undefined);
};

const errorTag = (cause: unknown): string => {
  const record = asRecord(cause);
  return [record?._tag, record?.name, record?.reason]
    .filter((value): value is string => typeof value === "string")
    .join(" ")
    .toLowerCase();
};

const inferKind = (
  cause: unknown,
  status: number | undefined,
): ProviderErrorKind => {
  const tag = errorTag(cause);
  if (tag.includes("timeout")) return "timeout";
  if (tag.includes("parse") || tag.includes("decode")) return "decode";
  if (status !== undefined) return "http";
  if (tag.includes("request") || tag.includes("transport")) return "transport";
  return "unknown";
};

const inferRetryable = (
  kind: ProviderErrorKind,
  status: number | undefined,
): boolean =>
  kind === "timeout" ||
  kind === "transport" ||
  status === 408 ||
  status === 425 ||
  status === 429 ||
  (status !== undefined && status >= 500);

export class KupmiosError extends Error {
  readonly _tag: string = "KupmiosError";
  readonly provider = "Kupmios" as const;
  readonly protocol?: ProviderTransportProtocol;
  readonly operation: string;
  readonly kind: ProviderErrorKind;
  readonly status?: number;
  readonly retryable: boolean;
  readonly retryAfterMs?: number;
  override readonly cause?: unknown;

  constructor(options: KupmiosErrorOptions) {
    const status = options.status ?? responseStatus(options.cause);
    const kind = options.kind ?? inferKind(options.cause, status);
    const retryable = options.retryable ?? inferRetryable(kind, status);
    const operation = options.operation ?? "unknown";
    const statusSuffix = status === undefined ? "" : ` (HTTP ${status})`;
    super(
      options.message ??
        `${options.protocol ?? "provider"} ${operation} failed${statusSuffix}`,
      {
        cause: options.cause,
      },
    );
    this.name = "KupmiosError";
    this.protocol = options.protocol;
    this.operation = operation;
    this.kind = kind;
    this.status = status;
    this.retryable = retryable;
    this.retryAfterMs = options.retryAfterMs ?? retryAfter(options.cause);
    this.cause = options.cause;
  }
}

export type OgmiosJsonRpcErrorOptions = {
  code: number;
  message: string;
  data?: unknown;
  method?: string;
  id: number | null;
  operation?: string;
  status?: number;
  retryAfterMs?: number;
  cause?: unknown;
};

export class OgmiosJsonRpcError extends KupmiosError {
  override readonly _tag = "OgmiosJsonRpcError";
  readonly code: number;
  readonly data?: unknown;
  readonly method?: string;
  readonly id: number | null;

  constructor(options: OgmiosJsonRpcErrorOptions) {
    const dataSuffix =
      options.data === undefined ? "" : `: ${JSON.stringify(options.data)}`;
    super({
      protocol: "ogmios",
      operation: options.operation ?? options.method ?? "unknown",
      kind: "json_rpc",
      status: options.status,
      retryAfterMs: options.retryAfterMs,
      cause: options.cause,
      message: `Ogmios JSON-RPC error ${options.code}: ${options.message}${dataSuffix}`,
    });
    this.name = "OgmiosJsonRpcError";
    this.code = options.code;
    this.data = options.data;
    this.method = options.method;
    this.id = options.id;
  }
}

export const toKupmiosError = (
  cause: unknown,
  protocol: ProviderTransportProtocol,
  operation: string,
): KupmiosError =>
  cause instanceof KupmiosError
    ? cause
    : new KupmiosError({ cause, protocol, operation });
