export interface GuideRequest {
  fullName: string;
  email: string;
  phone: string;
  level: string;
  marketingConsent: boolean;
  /** Honeypot; always empty for real visitors. */
  website: string;
}

export async function requestGuide(data: GuideRequest) {
  const res = await fetch('/api/guide/request', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (res.status === 429) throw new Error('rate-limited');
  if (!res.ok) throw new Error('request-failed');
  return res.json() as Promise<{ downloadUrl: string }>;
}
