import { useState, type ReactNode } from 'react';
import { panelId, tabId, tabKeyHandler } from '../lib/tabs';

type StepId = 'assessment' | 'coaching' | 'counselling';

const PREFIX = 'approach';

const STEPS: {
  id: StepId;
  title: string;
  summary: string;
  body: string;
  points: string[];
  visual: ReactNode;
}[] = [
  {
    id: 'assessment',
    title: 'Assessment',
    summary: 'Find out exactly where to focus.',
    body:
      "We begin by reviewing each student's academic record, study habits and " +
      'performance gaps using structured assessment tools.',
    points: ['Academic record and grade trends', 'Study habits and time use', 'Courses and skills that need attention'],
    visual: <SnapshotMock />,
  },
  {
    id: 'coaching',
    title: 'Academic coaching',
    summary: 'A plan built around the target CGPA.',
    body:
      'A dedicated coach builds a personal study plan, time-management routine and exam ' +
      "strategy matched to the student's target CGPA and course requirements.",
    points: ['Personal study and revision plan', 'Weekly time-management routine', 'Exam preparation strategy'],
    visual: <PlanMock />,
  },
  {
    id: 'counselling',
    title: 'Counselling',
    summary: 'Support that makes progress last.',
    body:
      'Licensed counsellors help students manage stress, motivation and personal ' +
      'challenges, so the progress made in coaching is sustained.',
    points: ['Managing stress and exam anxiety', 'Motivation and self-discipline', 'Personal challenges affecting study'],
    visual: <CheckInMock />,
  },
];

const IDS = STEPS.map((s) => s.id);

export default function Method() {
  const [active, setActive] = useState<StepId>('assessment');
  const onKeyDown = tabKeyHandler(PREFIX, IDS, active, setActive);

  return (
    <section id="method" className="section method">
      <div className="section-inner">
        <div className="section-header">
          <p className="eyebrow">Our approach</p>
          <h2>How the programme works</h2>
          <p>
            Every student moves through three stages, guided by a coach and a
            counsellor who work from the same plan. Select a stage to see what it involves.
          </p>
        </div>

        <div className="approach">
          <div className="approach-tablist" role="tablist" aria-label="Programme stages" onKeyDown={onKeyDown}>
            {STEPS.map((step, i) => {
              const selected = step.id === active;
              return (
                <button
                  key={step.id}
                  type="button"
                  role="tab"
                  id={tabId(PREFIX, step.id)}
                  aria-selected={selected}
                  aria-controls={panelId(PREFIX, step.id)}
                  tabIndex={selected ? 0 : -1}
                  className="approach-tab"
                  onClick={() => setActive(step.id)}
                >
                  <span className="approach-tab-num">Stage {i + 1}</span>
                  <span className="approach-tab-title">{step.title}</span>
                  <span className="approach-tab-summary">{step.summary}</span>
                </button>
              );
            })}
          </div>

          {STEPS.map((step) => (
            <div
              key={step.id}
              role="tabpanel"
              id={panelId(PREFIX, step.id)}
              aria-labelledby={tabId(PREFIX, step.id)}
              hidden={step.id !== active}
              className="approach-panel"
            >
              <div className="approach-panel-text">
                <h3>{step.title}</h3>
                <p>{step.body}</p>
                <ul className="tier-features">
                  {step.points.map((p) => (
                    <li key={p}><span className="tier-feature-title">{p}</span></li>
                  ))}
                </ul>
              </div>
              {step.visual}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Illustrative visuals (example data, labelled as such) ---------- */

function MockFrame({ title, children }: { title: string; children: ReactNode }) {
  return (
    <figure className="mock" aria-label={`${title} (illustrative example)`}>
      <figcaption className="mock-head">
        <span>{title}</span>
        <span className="mock-tag">Example</span>
      </figcaption>
      {children}
    </figure>
  );
}

const SEMESTERS = [
  { label: '100L 1st', gpa: 3.1 },
  { label: '100L 2nd', gpa: 2.7 },
  { label: '200L 1st', gpa: 2.4 },
  { label: '200L 2nd', gpa: 2.9 },
];

function SnapshotMock() {
  return (
    <MockFrame title="Academic snapshot">
      <div className="mock-stats">
        <div><span>Current CGPA</span><strong>2.78</strong></div>
        <div><span>Target CGPA</span><strong>3.50</strong></div>
      </div>
      <div className="mock-bars" aria-hidden="true">
        {SEMESTERS.map((s) => (
          <div className="mock-bar-col" key={s.label}>
            <div className="mock-bar" style={{ height: `${Math.round((s.gpa / 5) * 96)}px` }}>
              <span>{s.gpa.toFixed(1)}</span>
            </div>
            <span className="mock-bar-label">{s.label}</span>
          </div>
        ))}
      </div>
      <p className="mock-subhead">Focus areas</p>
      <ul className="mock-chips">
        <li>Time management</li>
        <li>Exam preparation</li>
        <li>MTH 201 carry-over</li>
      </ul>
    </MockFrame>
  );
}

const WEEK = [
  { day: 'Mon', blocks: [{ text: 'MTH 201 revision', tone: 'navy' }] },
  { day: 'Tue', blocks: [{ text: 'Lab report draft', tone: 'navy' }, { text: 'Coach check-in', tone: 'gold' }] },
  { day: 'Wed', blocks: [{ text: 'Past questions', tone: 'navy' }] },
  { day: 'Thu', blocks: [{ text: 'Group study', tone: 'navy' }] },
  { day: 'Fri', blocks: [{ text: 'Weekly review', tone: 'gold' }] },
];

function PlanMock() {
  return (
    <MockFrame title="Weekly study plan">
      <div className="mock-week">
        {WEEK.map((d) => (
          <div className="mock-day" key={d.day}>
            <span className="mock-day-label">{d.day}</span>
            {d.blocks.map((b) => (
              <span key={b.text} className={`mock-block mock-block-${b.tone}`}>{b.text}</span>
            ))}
          </div>
        ))}
      </div>
      <p className="mock-subhead">This week's goals</p>
      <ul className="mock-checklist">
        <li className="is-done">Finish two past-question papers</li>
        <li className="is-done">Submit lab report on time</li>
        <li>Revise MTH 201 chapters 4–6</li>
      </ul>
    </MockFrame>
  );
}

function CheckInMock() {
  return (
    <MockFrame title="Counselling check-in">
      <p className="mock-subhead">How manageable did this week feel?</p>
      <div className="mock-scale" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((n) => (
          <span key={n} className={n <= 3 ? 'is-filled' : undefined}>{n}</span>
        ))}
      </div>
      <dl className="mock-list">
        <div><dt>Focus</dt><dd>Managing anxiety before exams</dd></div>
        <div><dt>Agreed step</dt><dd>Short daily review instead of late-night cramming</dd></div>
        <div><dt>Next session</dt><dd>Thursday, 4:00 pm</dd></div>
      </dl>
    </MockFrame>
  );
}
