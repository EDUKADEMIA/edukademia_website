export interface TutorialEnquiry {
  fullName: string;
  phone: string;
  email: string;
  country: string;
  exams: string[];
  subjects: string[];
  /** Subjects typed in by the visitor, beyond the listed ones. */
  otherSubjects: string[];
  days: string[];
  times: string[];
  scheduleNotes: string;
  /** Honeypot; always empty for real visitors. */
  website: string;
}

const SHEET_URL = import.meta.env.VITE_TUTORIALS_SHEET_URL?.trim();
const USE_API = import.meta.env.VITE_TUTORIALS_USE_API === 'true';

/** Appends the registration to the Google Sheet via the Apps Script web app. */
async function saveToSheet(url: string, data: TutorialEnquiry) {
  // text/plain keeps this a "simple" request, so no CORS preflight (which Apps Script can't answer).
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(data),
  });
  const result = (await res.json().catch(() => null)) as { ok?: boolean } | null;
  if (!res.ok || !result?.ok) throw new Error('sheet-save-failed');
}

async function saveToApi(data: TutorialEnquiry) {
  const res = await fetch('/api/tutorials/enquiry', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('api-save-failed');
}

/**
 * Saves a tutorial registration. The Google Sheet is the record of truth for now;
 * the API copy is optional and never blocks the visitor when the sheet succeeds.
 */
export async function submitTutorialRegistration(data: TutorialEnquiry) {
  if (SHEET_URL) {
    await saveToSheet(SHEET_URL, data);
    if (USE_API) saveToApi(data).catch(() => { /* secondary copy */ });
    return;
  }

  if (USE_API) {
    await saveToApi(data);
    return;
  }

  if (import.meta.env.DEV) {
    console.warn('VITE_TUTORIALS_SHEET_URL is not set; registration was not saved (development only).');
    return;
  }
  throw new Error('not-configured');
}
