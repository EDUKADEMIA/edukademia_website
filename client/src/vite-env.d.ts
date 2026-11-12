/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Google Apps Script web app URL that appends tutorial registrations to a Google Sheet. */
  readonly VITE_TUTORIALS_SHEET_URL?: string;
  /** Set to "true" to also store tutorial registrations through the Edukademia API. */
  readonly VITE_TUTORIALS_USE_API?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
