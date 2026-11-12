import { useState } from 'react';
import { submitTutorialRegistration, type TutorialEnquiry } from '../../api/tutorials';
import {
  COUNTRIES,
  DAYS,
  ENGLISH_SKILLS,
  EXAMS,
  EXAM_GROUPS,
  LEARNING_FORMAT,
  SUBJECTS,
  TIME_SLOTS,
  WHATSAPP_DIRECT_URL,
  whatsappUrl,
} from './content';

type ErrorKey = 'fullName' | 'phone' | 'email' | 'country' | 'exams' | 'subjects' | 'days' | 'times';
type Errors = Partial<Record<ErrorKey, string>>;
type Status = 'editing' | 'saving' | 'saved' | 'error';

const EMPTY: TutorialEnquiry = {
  fullName: '',
  phone: '',
  email: '',
  country: 'Nigeria',
  exams: [],
  subjects: [],
  otherSubjects: [],
  days: [],
  times: [],
  scheduleNotes: '',
  website: '',
};

const toggle = (list: string[], item: string) =>
  list.includes(item) ? list.filter((x) => x !== item) : [...list, item];

const MAX_OTHER_SUBJECTS = 10;

/** Subjects and skills that apply to the exams currently selected. */
function availableSubjects(exams: string[]) {
  const groups = new Set(EXAMS.filter((e) => exams.includes(e.id)).map((e) => e.group));
  return {
    school: groups.has('school') ? SUBJECTS : [],
    english: groups.has('english') ? ENGLISH_SKILLS : [],
  };
}

/**
 * Adds a typed subject. If it matches a listed subject or skill (any case), that one is
 * ticked instead, so the same subject never appears twice.
 */
function addOtherSubject(form: TutorialEnquiry, raw: string): TutorialEnquiry {
  const name = raw.trim().replace(/\s+/g, ' ');
  if (!name) return form;

  const { school, english } = availableSubjects(form.exams);
  const listed = [...school, ...english].find((s) => s.toLowerCase() === name.toLowerCase());
  if (listed) {
    return form.subjects.includes(listed) ? form : { ...form, subjects: [...form.subjects, listed] };
  }

  const exists = form.otherSubjects.some((s) => s.toLowerCase() === name.toLowerCase());
  if (exists || form.otherSubjects.length >= MAX_OTHER_SUBJECTS) return form;
  return { ...form, otherSubjects: [...form.otherSubjects, name] };
}

/** Drops subjects left over from an exam the visitor has since deselected. */
function selectedSubjects(form: TutorialEnquiry) {
  const { school, english } = availableSubjects(form.exams);
  return form.subjects.filter((s) => school.includes(s) || english.includes(s));
}

function validate(form: TutorialEnquiry): Errors {
  const errors: Errors = {};
  if (!form.fullName.trim()) errors.fullName = 'Enter your full name.';
  if (form.phone.replace(/\D/g, '').length < 7) errors.phone = 'Enter a phone or WhatsApp number.';
  if (!form.email.trim()) errors.email = 'Enter your email address.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Enter a valid email address.';
  if (!form.country.trim()) errors.country = 'Enter your country.';
  if (form.exams.length === 0) errors.exams = 'Choose at least one exam.';
  else if (selectedSubjects(form).length === 0 && form.otherSubjects.length === 0) {
    errors.subjects = 'Tick at least one subject, or add your own below.';
  }
  if (form.days.length === 0) errors.days = 'Choose at least one day.';
  if (form.times.length === 0) errors.times = 'Choose at least one time of day.';
  return errors;
}

function buildMessage(form: TutorialEnquiry) {
  const examNames = EXAMS.filter((e) => form.exams.includes(e.id)).map((e) => e.name);
  const subjects = [...selectedSubjects(form), ...form.otherSubjects];
  const times = TIME_SLOTS.filter((t) => form.times.includes(t.id)).map((t) => `${t.label} (${t.hours})`);
  const days = DAYS.filter((d) => form.days.includes(d));

  const lines = [
    'Hello Edukademia! I would like to register for exam preparation tutorials.',
    '',
    `Name: ${form.fullName.trim()}`,
    `Phone/WhatsApp: ${form.phone.trim()}`,
    `Email: ${form.email.trim()}`,
    `Country: ${form.country.trim()}`,
    `Exam(s): ${examNames.join(', ')}`,
    `Subjects: ${subjects.join(', ')}`,
    `Preferred days: ${days.join(', ')}`,
    `Preferred times: ${times.join(', ')}`,
  ];
  if (form.scheduleNotes.trim()) lines.push(`Schedule notes: ${form.scheduleNotes.trim()}`);
  lines.push(`Learning format: ${LEARNING_FORMAT}`);
  return lines.join('\n');
}

export default function RegistrationForm() {
  const [form, setForm] = useState<TutorialEnquiry>(EMPTY);
  const [showErrors, setShowErrors] = useState(false);
  const [status, setStatus] = useState<Status>('editing');
  const [otherDraft, setOtherDraft] = useState('');

  const errors = validate(form);
  const { school, english } = availableSubjects(form.exams);

  const set = <K extends keyof TutorialEnquiry>(key: K, value: TutorialEnquiry[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const err = (key: ErrorKey) =>
    showErrors && errors[key] ? (
      <span className="error-msg" id={`reg-${key}-error`} role="alert">{errors[key]}</span>
    ) : null;

  const fieldClass = (key: ErrorKey) => (showErrors && errors[key] ? 'field invalid' : 'field');

  const describedBy = (key: ErrorKey) => (showErrors && errors[key] ? `reg-${key}-error` : undefined);

  function addDraftSubject() {
    setForm((prev) => addOtherSubject(prev, otherDraft));
    setOtherDraft('');
  }

  const removeOtherSubject = (name: string) =>
    set('otherSubjects', form.otherSubjects.filter((s) => s !== name));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setShowErrors(true);

    // A subject typed but not yet added still counts.
    const finalForm = otherDraft.trim() ? addOtherSubject(form, otherDraft) : form;
    if (otherDraft.trim()) {
      setForm(finalForm);
      setOtherDraft('');
    }

    if (Object.keys(validate(finalForm)).length > 0) {
      // After the errors render, take keyboard and screen-reader users to the first problem.
      requestAnimationFrame(() => {
        const field = document.querySelector<HTMLElement>('.reg-form [aria-invalid="true"]');
        if (field) field.focus();
        else document.querySelector('.reg-form .error-msg')?.scrollIntoView({ block: 'center', behavior: 'smooth' });
      });
      return;
    }

    setStatus('saving');
    try {
      await submitTutorialRegistration({ ...finalForm, subjects: selectedSubjects(finalForm) });
      setStatus('saved');
      requestAnimationFrame(() =>
        document.getElementById('register')?.scrollIntoView({ behavior: 'smooth', block: 'start' }),
      );
    } catch {
      setStatus('error');
    }
  }

  // WhatsApp is only offered once the registration has been saved.
  if (status === 'saved') {
    const message = buildMessage(form);
    return (
      <div className="planner-card reg-done" role="status">
        <p className="reg-done-step">Step 1 of 2 complete</p>
        <h3>Registration received. Now send it on WhatsApp.</h3>
        <p>
          Your details have been saved. To finish, send them to us on WhatsApp. The message
          is already written for you, and we will reply about availability and your schedule.
        </p>
        <div className="planner-preview">
          <p className="planner-preview-label">Your message</p>
          <pre className="planner-message">{message}</pre>
        </div>
        <div className="reg-done-actions">
          <a href={whatsappUrl(message)} className="btn btn-primary btn-lg" target="_blank" rel="noopener noreferrer">
            Send on WhatsApp
          </a>
          <button type="button" className="btn btn-outline" onClick={() => setStatus('editing')}>
            Edit my details
          </button>
        </div>
        <p className="reg-fallback">
          WhatsApp not opening?{' '}
          <a href={WHATSAPP_DIRECT_URL} target="_blank" rel="noopener noreferrer">Open our WhatsApp chat</a>{' '}
          and paste the message above.
        </p>
      </div>
    );
  }

  return (
    <form className="planner-card reg-form" onSubmit={handleSubmit} noValidate>
      <fieldset className="planner-step">
        <legend><span className="planner-num">1</span>Your details</legend>
        <div className="form-grid">
          <div className={fieldClass('fullName')}>
            <label htmlFor="reg-fullName">Full name <span className="req">*</span></label>
            <input
              id="reg-fullName" type="text" autoComplete="name" value={form.fullName}
              onChange={(e) => set('fullName', e.target.value)}
              aria-invalid={Boolean(describedBy('fullName')) || undefined} aria-describedby={describedBy('fullName')}
            />
            {err('fullName')}
          </div>
          <div className={fieldClass('phone')}>
            <label htmlFor="reg-phone">Phone / WhatsApp number <span className="req">*</span></label>
            <input
              id="reg-phone" type="tel" autoComplete="tel" placeholder="e.g. +234 801 234 5678" value={form.phone}
              onChange={(e) => set('phone', e.target.value)}
              aria-invalid={Boolean(describedBy('phone')) || undefined} aria-describedby={describedBy('phone')}
            />
            {err('phone')}
          </div>
          <div className={fieldClass('email')}>
            <label htmlFor="reg-email">Email address <span className="req">*</span></label>
            <input
              id="reg-email" type="email" autoComplete="email" value={form.email}
              onChange={(e) => set('email', e.target.value)}
              aria-invalid={Boolean(describedBy('email')) || undefined} aria-describedby={describedBy('email')}
            />
            {err('email')}
          </div>
          <div className={fieldClass('country')}>
            <label htmlFor="reg-country">Country <span className="req">*</span></label>
            <input
              id="reg-country" type="text" autoComplete="country-name" list="reg-country-list" value={form.country}
              onChange={(e) => set('country', e.target.value)}
              aria-invalid={Boolean(describedBy('country')) || undefined} aria-describedby={describedBy('country')}
            />
            <datalist id="reg-country-list">
              {COUNTRIES.map((c) => <option key={c} value={c} />)}
            </datalist>
            {err('country')}
          </div>
        </div>
      </fieldset>

      <fieldset className="planner-step" aria-describedby={describedBy('exams')}>
        <legend><span className="planner-num">2</span>Examination you are preparing for</legend>
        <p className="planner-hint">Choose one or more.</p>
        {EXAM_GROUPS.map((group) => (
          <div className="chip-section" key={group.id}>
            <p className="chip-section-label">{group.label}</p>
            <div className="chip-group">
              {EXAMS.filter((exam) => exam.group === group.id).map((exam) => (
                <label key={exam.id} className="chip" title={exam.detail}>
                  <input
                    type="checkbox"
                    checked={form.exams.includes(exam.id)}
                    onChange={() => set('exams', toggle(form.exams, exam.id))}
                  />
                  <span>{exam.name}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
        {err('exams')}
      </fieldset>

      <fieldset className="planner-step" aria-describedby={describedBy('subjects')}>
        <legend><span className="planner-num">3</span>Subjects you need tutorials for</legend>
        {form.exams.length === 0 && <p className="planner-hint">Choose an exam above to see the subjects.</p>}
        {school.length > 0 && (
          <div className="chip-section">
            <p className="chip-section-label">WAEC, NECO and JAMB subjects</p>
            <div className="chip-group">
              {school.map((subject) => (
                <label key={subject} className="chip">
                  <input
                    type="checkbox"
                    checked={form.subjects.includes(subject)}
                    onChange={() => set('subjects', toggle(form.subjects, subject))}
                  />
                  <span>{subject}</span>
                </label>
              ))}
            </div>
          </div>
        )}
        {english.length > 0 && (
          <div className="chip-section">
            <p className="chip-section-label">English test skills</p>
            <div className="chip-group">
              {english.map((skill) => (
                <label key={skill} className="chip">
                  <input
                    type="checkbox"
                    checked={form.subjects.includes(skill)}
                    onChange={() => set('subjects', toggle(form.subjects, skill))}
                  />
                  <span>{skill}</span>
                </label>
              ))}
            </div>
          </div>
        )}
        {form.exams.length > 0 && (
          <div className="planner-other">
            <label htmlFor="reg-other">Other subjects or topics <span className="optional">(optional)</span></label>
            <div className="add-field">
              <input
                id="reg-other" type="text" maxLength={60} placeholder="e.g. Literature in English"
                value={otherDraft}
                onChange={(e) => setOtherDraft(e.target.value)}
                onKeyDown={(e) => {
                  // Enter adds the subject instead of submitting the whole form.
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addDraftSubject();
                  }
                }}
                disabled={form.otherSubjects.length >= MAX_OTHER_SUBJECTS}
                aria-describedby="reg-other-hint"
              />
              <button
                type="button"
                className="btn btn-outline"
                onClick={addDraftSubject}
                disabled={!otherDraft.trim() || form.otherSubjects.length >= MAX_OTHER_SUBJECTS}
              >
                Add
              </button>
            </div>
            <p className="planner-hint add-hint" id="reg-other-hint">
              Type a subject, then press Add or Enter. You can add up to {MAX_OTHER_SUBJECTS}.
            </p>
            {form.otherSubjects.length > 0 && (
              <ul className="chip-group added-subjects" aria-label="Subjects you added">
                {form.otherSubjects.map((name) => (
                  <li key={name} className="added-chip">
                    <span>{name}</span>
                    <button type="button" onClick={() => removeOtherSubject(name)} aria-label={`Remove ${name}`}>
                      <span aria-hidden="true">×</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
        {err('subjects')}
      </fieldset>

      <fieldset className="planner-step">
        <legend><span className="planner-num">4</span>Preferred tutorial schedule</legend>
        <div className="chip-section" aria-describedby={describedBy('days')}>
          <p className="chip-section-label">Days</p>
          <div className="chip-group">
            {DAYS.map((day) => (
              <label key={day} className="chip">
                <input type="checkbox" checked={form.days.includes(day)} onChange={() => set('days', toggle(form.days, day))} />
                <span>{day.slice(0, 3)}<span className="visually-hidden">{day.slice(3)}</span></span>
              </label>
            ))}
          </div>
          {err('days')}
        </div>
        <div className="chip-section" aria-describedby={describedBy('times')}>
          <p className="chip-section-label">Times <span className="optional">(your local time)</span></p>
          <div className="chip-group">
            {TIME_SLOTS.map((slot) => (
              <label key={slot.id} className="chip">
                <input type="checkbox" checked={form.times.includes(slot.id)} onChange={() => set('times', toggle(form.times, slot.id))} />
                <span>{slot.label} <small>{slot.hours}</small></span>
              </label>
            ))}
          </div>
          {err('times')}
        </div>
        <div className="planner-other">
          <label htmlFor="reg-notes">Anything else about your schedule? <span className="optional">(optional)</span></label>
          <input
            id="reg-notes" type="text" maxLength={300} placeholder="e.g. Weekends only during school term"
            value={form.scheduleNotes} onChange={(e) => set('scheduleNotes', e.target.value)}
          />
        </div>
      </fieldset>

      <div className="planner-step reg-format">
        <p className="reg-format-label"><span className="planner-num">5</span>Learning format</p>
        <p className="reg-format-value">
          <span className="reg-format-badge">{LEARNING_FORMAT}</span>
          All tutorials are delivered online.
        </p>
      </div>

      {/* Honeypot: hidden from people and screen readers, filled only by bots. */}
      <div className="hp-field" aria-hidden="true">
        <label htmlFor="reg-website">Website</label>
        <input id="reg-website" type="text" tabIndex={-1} autoComplete="off" value={form.website} onChange={(e) => set('website', e.target.value)} />
      </div>

      <p className="form-privacy">
        Your details are saved by Edukademia so we can arrange your tutorials, and you will
        then send them to us on WhatsApp. See our <a href="/policies/#privacy">privacy notice</a>.
      </p>
      <div className="form-actions">
        <button type="submit" className="btn btn-primary btn-lg" disabled={status === 'saving'}>
          {status === 'saving' ? 'Saving your registration…' : 'Submit registration'}
        </button>
      </div>
      {status === 'error' && (
        <div className="reg-error" role="alert">
          <p>
            We couldn’t save your registration. Please check your internet connection and
            press <strong>Submit registration</strong> again.
          </p>
          <p>
            Still not working?{' '}
            <a href={whatsappUrl(buildMessage(form))} target="_blank" rel="noopener noreferrer">
              Send your details on WhatsApp instead
            </a>
            .
          </p>
        </div>
      )}
    </form>
  );
}
