import { AT_A_GLANCE } from './content';

export default function SchoolHero() {
  return (
    <section className="hero">
      <div className="hero-inner has-visual">
        <div className="hero-content">
          <p className="eyebrow">School Partnership</p>
          <h1>Structured academic mentorship for your students.</h1>
          <p className="hero-lede">
            Edukademia works with schools, colleges and universities to run our
            mentorship, coaching and counselling programme alongside your existing
            student support services.
          </p>
          <div className="hero-ctas">
            <a href="#enquiry" className="btn btn-gold btn-lg">Make an enquiry</a>
            <a href="#options" className="btn btn-outline-light btn-lg">Compare options</a>
          </div>
        </div>

        <div className="hero-visual">
          <img
            src="/cgpa/cgpa-future-readiness.jpg"
            alt="A group of students reviewing documents and working on laptops together"
            width="1200"
            height="900"
          />
          <aside className="hero-overlay" aria-label="Partnership at a glance">
            <p className="hero-overlay-title">Partnership at a glance</p>
            <dl className="overlay-facts">
              {AT_A_GLANCE.map((f) => (
                <div key={f.label}>
                  <dt>{f.label}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </div>
    </section>
  );
}
