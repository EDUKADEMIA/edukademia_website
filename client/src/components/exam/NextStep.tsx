/** Bridges secondary-school exam preparation to the university programme. */
export default function NextStep() {
  return (
    <section className="section exam-next">
      <div className="section-inner next-panel">
        <div>
          <p className="eyebrow">After your exams</p>
          <h2>Heading to university next?</h2>
          <p>
            Edukademia supports students beyond their entrance exams. Start university
            with our free Academic Success Starter Guide, and join the CGPA Mentorship
            Programme for guidance, structure and accountability once you are there.
          </p>
        </div>
        <div className="next-links">
          <a href="/cgpa-mentorship/#guide" className="next-link">
            <span className="next-link-label">Free resource</span>
            <span className="next-link-title">Academic Success Starter Guide</span>
            <span className="quick-link-arrow" aria-hidden="true" />
          </a>
          <a href="/cgpa-mentorship/" className="next-link">
            <span className="next-link-label">For university students</span>
            <span className="next-link-title">CGPA Mentorship Programme</span>
            <span className="quick-link-arrow" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
