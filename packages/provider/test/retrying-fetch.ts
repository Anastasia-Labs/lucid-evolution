export type Retry429Options = {
  maxRetries?: number;
  initialDelayMs?: number;
  maxDelayMs?: number;
  now?: () => number;
  sleep?: (delayMs: number) => Promise<void>;
};

const defaultSleep = (delayMs: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, delayMs));

const retryAfterDelayMs = (
  retryAfter: string | null,
  now: number,
): number | undefined => {
  if (retryAfter === null) return undefined;

  const value = retryAfter.trim();
  if (/^\d+(?:\.\d+)?$/.test(value)) {
    return Number(value) * 1_000;
  }

  const retryAt = Date.parse(value);
  return Number.isNaN(retryAt) ? undefined : Math.max(0, retryAt - now);
};

export const with429Retry = (
  fetchImpl: typeof fetch,
  {
    maxRetries = 3,
    initialDelayMs = 1_000,
    maxDelayMs = 30_000,
    now = Date.now,
    sleep = defaultSleep,
  }: Retry429Options = {},
): typeof fetch => {
  return async (...args: Parameters<typeof fetch>): Promise<Response> => {
    for (let retries = 0; ; retries++) {
      const response = await fetchImpl(...args);
      if (response.status !== 429 || retries >= maxRetries) return response;

      const requestedDelay = retryAfterDelayMs(
        response.headers.get("Retry-After"),
        now(),
      );
      const fallbackDelay = initialDelayMs * 2 ** retries;
      const delayMs = Math.min(requestedDelay ?? fallbackDelay, maxDelayMs);

      await response.body?.cancel().catch(() => undefined);
      await sleep(delayMs);
    }
  };
};
