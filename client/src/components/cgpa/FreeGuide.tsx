import { useState } from 'react';
import { requestGuide, type GuideRequest } from '../../api/guide';

type Status = 'closed' | 'open' | 'submitting' | 'ready' | 'error' | 'rate-limited';
type Errors = Partial<Record<'fullName' | 'email' | 'level', string>>;

const STORAGE_KEY = 'edukademia.guide.details';

const LEVELS = [
  { value: 'secondary-school', label: 'Secondary school student' },
  { value: 'undergraduate', label: 'Undergraduate' },
  { value: 'postgraduate', label: 'Postgraduate' },
  { value: 'parent-guardian', label: 'Parent or guardian' },
  { value: 'other', label: 'Other' },
];

const EMPTY: GuideRequest = {
  fullName: '',
  email: '',
  phone: '',
  level: '',
  marketingConsent: false,
  website: '',
};

/** Prefill for returning visitors. Storage can be unavailable (private mode, blocked). */
function loadSaved(): GuideRequest {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? 'null');
    return saved ? { ...EMPTY, ...saved, website: '' } : EMPTY;
  } catch {
    return EMPTY;
  }
}

function save(data: GuideRequest) {
  try {
    const { website: _honeypot, ...details } = data;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(details));
  } catch {
    /* non-essential */
  }
}

function validate(d: GuideRequest): Errors {
  const errors: Errors = {};
  if (!d.fullName.trim()) errors.fullName = 'Enter your name.';
  if (!d.email.trim()) errors.email = 'Enter your email address.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) errors.email = 'Enter a valid email address.';
  if (!d.level) errors.level = 'Select where you are in your studies.';
  return errors;
}

export default function FreeGuide() {
  const [status, setStatus] = useState<Status>('closed');
  const [form, setForm] = useState<GuideRequest>(loadSaved);
  const [showErrors, setShowErrors] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState('');

  const errors = validate(form);

  function update(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value, type } = e.target;
    const next = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setForm((prev) => ({ ...prev, [name]: next }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setShowErrors(true);
    if (Object.keys(errors).length > 0) return;

    setStatus('submitting');
    try {
      const { downloadUrl: url } = await requestGuide(form);
      save(form);
      setDownloadUrl(url);
      setStatus('ready');
      // The server responds with Content-Disposition: attachment, so the page stays put.
      window.location.assign(url);
    } catch (err) {
      setStatus(err instanceof Error && err.message === 'rate-limited' ? 'rate-limited' : 'error');
    }
  }

  const fieldError = (name: keyof Errors) =>
    showErrors && errors[name] ? (
      <span className="error-msg" id={`guide-${name}-error`}>{errors[name]}</span>
    ) : null;

  const invalid = (name: keyof Errors) => (showErrors && errors[name] ? 'field invalid' : 'field');

  return (
    <section id="guide" className="section cgpa-guide">
      <div className="section-inner">
        <div className="guide-panel">
          <img
            src="/cgpa/academic-success-starter-guide-cover.jpg"
            alt="Cover of the Edukademia Academic Success Starter Guide"
            className="guide-cover"
            width="600"
            height="776"
            loading="lazy"
          />
          <div className="guide-body">
            <p className="eyebrow">Free resource</p>
            <h2>Academic Success Starter Guide</h2>
            <p>
              A practical 10-page guide to building the mindset, habits and systems
              that support academic success, starting from your first semester.
            </p>
            <ul className="guide-topics">
              <li>Right mindset</li>
              <li>Winning habits</li>
              <li>First-semester roadmap</li>
            </ul>

            {status === 'closed' && (
              <div className="guide-actions">
                <button type="button" className="btn btn-primary" onClick={() => setStatus('open')}>
                  Get the free guide (PDF)
                </button>
                <span className="guide-note">Free. Enter a few details and it downloads straight away.</span>
              </div>
            )}

            {status === 'ready' && (
              <div className="guide-ready" role="status">
                <p className="guide-ready-title">Thank you, {form.fullName.split(' ')[0]}. Your download has started.</p>
                <p>
                  If it didn’t start, <a href={downloadUrl}>download the guide here</a>. The link
                  works for one hour.
                </p>
              </div>
            )}

            {(status === 'open' || status === 'submitting' || status === 'error' || status === 'rate-limited') && (
              <form className="guide-form" onSubmit={handleSubmit} noValidate>
                <div className="form-grid">
                  <div className={invalid('fullName')}>
                    <label htmlFor="guide-fullName">Full name <span className="req">*</span></label>
                    <input
                      id="guide-fullName" name="fullName" type="text" autoComplete="name"
                      value={form.fullName} onChange={update}
                      aria-invalid={Boolean(showErrors && errors.fullName) || undefined}
                      aria-describedby={showErrors && errors.fullName ? 'guide-fullName-error' : undefined}
                    />
                    {fieldError('fullName')}
                  </div>

                  <div className={invalid('email')}>
                    <label htmlFor="guide-email">Email address <span className="req">*</span></label>
                    <input
                      id="guide-email" name="email" type="email" autoComplete="email"
                      value={form.email} onChange={update}
                      aria-invalid={Boolean(showErrors && errors.email) || undefined}
                      aria-describedby={showErrors && errors.email ? 'guide-email-error' : undefined}
                    />
                    {fieldError('email')}
                  </div>

                  <div className="field">
                    <label htmlFor="guide-phone">WhatsApp number <span className="optional">(optional)</span></label>
                    <input
                      id="guide-phone" name="phone" type="tel" autoComplete="tel"
                      value={form.phone} onChange={update}
                    />
                  </div>

                  <div className={invalid('level')}>
                    <label htmlFor="guide-level">I am a <span className="req">*</span></label>
                    <select
                      id="guide-level" name="level" value={form.level} onChange={update}
                      aria-invalid={Boolean(showErrors && errors.level) || undefined}
                      aria-describedby={showErrors && errors.level ? 'guide-level-error' : undefined}
                    >
                      <option value="">Select an option</option>
                      {LEVELS.map((l) => <option key={l.value} value={l.value}>{l.label}</option>)}
                    </select>
                    {fieldError('level')}
                  </div>
                </div>

                {/* Honeypot: hidden from people and screen readers, filled only by bots. */}
                <div className="hp-field" aria-hidden="true">
                  <label htmlFor="guide-website">Website</label>
                  <input
                    id="guide-website" name="website" type="text" tabIndex={-1} autoComplete="off"
                    value={form.website} onChange={update}
                  />
                </div>

                <label className="checkbox-field">
                  <input type="checkbox" name="marketingConsent" checked={form.marketingConsent} onChange={update} />
                  <span>Send me occasional emails about CGPA Mentorship and new study resources.</span>
                </label>

                <p className="form-privacy">
                  We use your details to send the guide and, if you agree, programme updates.
                  You can unsubscribe at any time. See our <a href="/policies/#privacy">privacy notice</a>.
                </p>

                <div className="form-actions">
                  <button type="submit" className="btn btn-primary" disabled={status === 'submitting'}>
                    {status === 'submitting' ? 'Preparing your download…' : 'Download the guide'}
                  </button>
                  {status === 'error' && (
                    <span className="form-status fail" role="alert">
                      Something went wrong. Please try again in a moment.
                    </span>
                  )}
                  {status === 'rate-limited' && (
                    <span className="form-status fail" role="alert">
                      Too many requests from this connection. Please try again later.
                    </span>
                  )}
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
