import crypto from 'crypto';

const TTL_MS = 60 * 60 * 1000; // 1 hour

/** Fallback when GUIDE_TOKEN_SECRET is missing (fine for local development only). */
const PROCESS_SECRET = crypto.randomBytes(32).toString('hex');
let warned = false;

function secret(): string {
  const fromEnv = process.env.GUIDE_TOKEN_SECRET;
  if (fromEnv) return fromEnv;
  if (!warned) {
    console.warn('GUIDE_TOKEN_SECRET is not set; using a per-process secret. Download links will stop working after a restart.');
    warned = true;
  }
  return PROCESS_SECRET;
}

function sign(payload: string): string {
  return crypto.createHmac('sha256', secret()).update(payload).digest('base64url');
}

/** Short-lived token proving the visitor submitted the guide form. */
export function createDownloadToken(): string {
  const expires = Date.now() + TTL_MS;
  return `${expires}.${sign(String(expires))}`;
}

export function isValidDownloadToken(token: unknown): boolean {
  if (typeof token !== 'string') return false;
  const [expires, signature] = token.split('.');
  if (!expires || !signature || Number(expires) < Date.now()) return false;

  const expected = Buffer.from(sign(expires));
  const actual = Buffer.from(signature);
  return expected.length === actual.length && crypto.timingSafeEqual(expected, actual);
}
