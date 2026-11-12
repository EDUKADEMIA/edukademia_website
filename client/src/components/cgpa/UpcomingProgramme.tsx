import {
  MENTEE_BENEFITS,
  MENTEE_FORM_URL,
  MENTOR_FORM_URL,
  MENTOR_REQUIREMENTS,
  MENTOR_ROLE,
  PHONE_DISPLAY,
  PHONE_HREF,
  WHATSAPP_URL,
} from './content';

const external = { target: '_blank', rel: 'noopener noreferrer' } as const;

export default function UpcomingProgramme() {
  return (
    <section id="join" className="section cgpa-join">
      <div className="section-inner">
        <div className="section-header">
          <p className="eyebrow">Upcoming programme</p>
          <h2>Applications are open for the next CGPA cohort</h2>
          <p>
            The CGPA Mentorship Programme is a community of support, growth and
            accountability. We are now accepting applications from students who want
            to be mentored, and from experienced people who want to mentor them.
          </p>
        </div>

        <div className="join-grid">
          <article id="mentees" className="join-card join-card-featured" aria-labelledby="mentee-title">
            <div className="join-card-head">
              <p className="path-tag">For students</p>
              <span className="join-status">Applications open</span>
            </div>
            <h3 id="mentee-title">Become a CGPA mentee</h3>
            <p className="join-lede">
              Maximise your academic potential, build practical skills and make real
              progress towards your goals, with a mentor beside you.
            </p>

            <h4 className="join-subhead">As a mentee, you will</h4>
            <dl className="join-benefits">
              {MENTEE_BENEFITS.map((b) => (
                <div key={b.title}>
                  <dt>{b.title}</dt>
                  <dd>{b.body}</dd>
                </div>
              ))}
            </dl>

            <div className="join-cta">
              <a href={MENTEE_FORM_URL} className="btn btn-primary btn-lg" {...external}>
                Apply as a mentee
              </a>
              <span className="join-cta-note">Opens the application form in a new tab</span>
            </div>
          </article>

          <article id="mentors" className="join-card" aria-labelledby="mentor-title">
            <div className="join-card-head">
              <p className="path-tag">Call for mentors</p>
              <span className="join-status">Applications open</span>
            </div>
            <h3 id="mentor-title">Become a CGPA mentor</h3>
            <p className="join-lede">
              Share your experience, guide a student and make a lasting impact.
            </p>

            <h4 className="join-subhead">As a mentor, you will</h4>
            <ul className="tier-features">
              {MENTOR_ROLE.map((r) => (
                <li key={r.title}>
                  <span className="tier-feature-title">{r.title}</span>
                  <span className="tier-feature-detail">{r.body}</span>
                </li>
              ))}
            </ul>

            <h4 className="join-subhead">Mentor requirements</h4>
            <ol className="join-requirements">
              {MENTOR_REQUIREMENTS.map((req) => <li key={req}>{req}</li>)}
            </ol>

            <div className="join-cta">
              <a href={MENTOR_FORM_URL} className="btn btn-outline btn-lg" {...external}>
                Apply to become a mentor
              </a>
              <span className="join-cta-note">Opens the application form in a new tab</span>
            </div>
          </article>
        </div>

        <p className="join-contact">
          For more information, call <a href={PHONE_HREF}>{PHONE_DISPLAY}</a> or{' '}
          <a href={WHATSAPP_URL} {...external}>chat with us on WhatsApp</a>.
        </p>
      </div>
    </section>
  );
}
