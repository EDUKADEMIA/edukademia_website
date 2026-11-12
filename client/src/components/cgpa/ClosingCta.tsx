import { MENTEE_FORM_URL, MENTOR_FORM_URL } from './content';

export default function ClosingCta() {
  return (
    <section className="cgpa-closing">
      <div className="section-inner closing-inner">
        <div>
          <h2>Ready to start?</h2>
          <p>
            Apply for the next cohort as a mentee, or share your experience as a
            mentor and help a student build the systems and discipline to succeed.
          </p>
        </div>
        <div className="hero-ctas">
          <a href={MENTEE_FORM_URL} className="btn btn-primary btn-lg" target="_blank" rel="noopener noreferrer">
            Apply as a mentee
          </a>
          <a href={MENTOR_FORM_URL} className="btn btn-outline btn-lg" target="_blank" rel="noopener noreferrer">
            Become a mentor
          </a>
        </div>
      </div>
    </section>
  );
}
