/**
 * Minimal in-memory, per-key rate limiter for public form endpoints.
 * Resets on restart and is per-process; good enough to stop casual scripted spam.
 */
export function createRateLimiter(maxPerWindow: number, windowMs: number) {
  const hits = new Map<string, { count: number; resetAt: number }>();

  return function isLimited(key: string): boolean {
    const now = Date.now();
    const entry = hits.get(key);
    if (!entry || entry.resetAt < now) {
      hits.set(key, { count: 1, resetAt: now + windowMs });
      return false;
    }
    entry.count += 1;
    return entry.count > maxPerWindow;
  };
}
