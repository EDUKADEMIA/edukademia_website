# Edukademia website

Marketing site and enquiry backend for Edukademia: CGPA Mentorship, Exam Preparation,
School Partnership and programme policies.

## Structure

```
client/          React + TypeScript + Vite (multi-page static site)
  index.html               Home
  cgpa-mentorship/         CGPA Mentorship programme
  exam-preparation/        WAEC, NECO, JAMB and English language exam tutorials
  school-partnership/      School partnership + enquiry form
  policies/                Refund, privacy, certificate and participation policies
  public/                  Images, video, logo, favicon
server/          Express + MongoDB API (enquiries, free-guide downloads)
  assets/                  Free guide PDF (served only after the guide form)
integrations/
  google-sheets/           Apps Script that saves exam-preparation registrations to a Google Sheet
```

## Getting started

Requires Node.js 20+.

```bash
npm install          # installs client and server (npm workspaces)
cp .env.example .env # then fill in the values
npm run dev          # API on :5000 and site on :5173
```

Run one side only with `npm run dev -w client` or `npm run dev -w server`.

## Environment variables

**Server** (`.env` at the repo root):

| Variable | Purpose |
| --- | --- |
| `MONGO_URI` | MongoDB connection string |
| `PORT` | API port (default `5000`) |
| `CLIENT_ORIGIN` | Allowed CORS origin, e.g. `https://edukademia.com` |
| `GUIDE_TOKEN_SECRET` | Long random string for signing free-guide download links |

**Client** (`client/.env.local` locally, or hosting provider settings):

| Variable | Purpose |
| --- | --- |
| `VITE_TUTORIALS_SHEET_URL` | Apps Script web app URL for exam registrations ([setup](integrations/google-sheets/README.md)) |
| `VITE_TUTORIALS_USE_API` | `true` to also save exam registrations through the API |

Never commit `.env` files. They are ignored by `.gitignore`.

## Build

```bash
npm run build        # builds server (server/dist) and client (client/dist)
```

`client/dist` is a static site with one folder per page, deployable to Netlify, Vercel,
Cloudflare Pages or similar. The API must be hosted separately and reachable at `/api`
(for example through a proxy or rewrite rule) for these features:

- School partnership enquiry form
- Free guide download on the CGPA page

Exam-preparation registrations work without the API once `VITE_TUTORIALS_SHEET_URL` is set.

## Content

Most page copy lives in `content.ts` files next to each page's components, e.g.
`client/src/components/cgpa/content.ts`. Policy wording in
`client/src/components/policies/content.ts` is legal text. Change it only with approval.
