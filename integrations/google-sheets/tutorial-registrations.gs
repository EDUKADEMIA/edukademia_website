/**
 * Edukademia: exam-preparation registrations → Google Sheet
 *
 * Paste this into Extensions → Apps Script of the registrations spreadsheet,
 * then deploy it as a web app (see README.md in this folder).
 */

const SHEET_NAME = 'Registrations';

/** Who gets an email for each new registration. Set to '' to turn notifications off. */
const NOTIFY_EMAIL = 'edukademia1@gmail.com';

const HEADERS = [
  'Submitted at',
  'Full name',
  'Phone / WhatsApp',
  'Email',
  'Country',
  'Exam(s)',
  'Subjects',
  'Other subjects',
  'Preferred days',
  'Preferred times',
  'Schedule notes',
  'Learning format',
];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const data = JSON.parse(e.postData.contents);

    // Honeypot: bots fill the hidden "website" field. Pretend success, store nothing.
    if (data.website) return json({ ok: true });

    const missing = ['fullName', 'phone', 'email', 'country'].filter((k) => !clean(data[k]));
    if (missing.length || !list(data.exams).length || !list(data.days).length || !list(data.times).length) {
      return json({ ok: false, error: 'missing-fields' });
    }

    const row = [
      new Date(),
      clean(data.fullName),
      clean(data.phone),
      clean(data.email),
      clean(data.country),
      list(data.exams).join(', '),
      list(data.subjects).join(', '),
      list(data.otherSubjects).join(', '),
      list(data.days).join(', '),
      list(data.times).join(', '),
      clean(data.scheduleNotes),
      'Online',
    ];

    sheet().appendRow(row);
    notify(row);
    return json({ ok: true });
  } catch (err) {
    console.error(err);
    return json({ ok: false, error: 'server-error' });
  } finally {
    lock.releaseLock();
  }
}

/** Opening the web app URL in a browser shows this, which confirms the deployment works. */
function doGet() {
  return json({ ok: true, service: 'edukademia-tutorial-registrations' });
}

function sheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) {
    sh = ss.insertSheet(SHEET_NAME);
  }
  if (sh.getLastRow() === 0) {
    sh.appendRow(HEADERS);
    sh.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    sh.setFrozenRows(1);
  }
  return sh;
}

function notify(row) {
  if (!NOTIFY_EMAIL) return;
  const body = HEADERS.map((h, i) => `${h}: ${row[i] instanceof Date ? row[i].toLocaleString() : row[i]}`).join('\n');
  MailApp.sendEmail(NOTIFY_EMAIL, `New tutorial registration: ${row[1]} (${row[5]})`, body);
}

/**
 * Trims and limits text. A leading = + - or @ would make Sheets treat the value as a
 * formula (phone numbers start with "+"), so those values are stored as plain text.
 */
function clean(value) {
  const text = String(value == null ? '' : value).trim().slice(0, 300);
  return /^[=+\-@]/.test(text) ? `'${text}` : text;
}

function list(value) {
  return Array.isArray(value) ? value.slice(0, 20).map(clean).filter(Boolean) : [];
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
