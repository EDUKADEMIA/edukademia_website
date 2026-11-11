const QUICK_LINKS = [
  {
    href: '/cgpa-mentorship/',
    audience: 'For students',
    title: 'CGPA Mentorship',
    meta: 'Applications open for the next cohort',
  },
  {
    href: '/exam-preparation/',
    audience: 'For secondary-school students',
    title: 'Exam Preparation',
    meta: 'WAEC, NECO, JAMB and English tests',
  },
  {
    href: '/school-partnership/',
    audience: 'For schools and universities',
    title: 'School Partnership',
    meta: 'Tailored to your institution',
  },
];

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-inner has-visual">
        <div className="hero-content">
          <p className="eyebrow">CGPA mentorship and student counselling</p>
          <h1>Academic excellence and personal growth, never treated separately.</h1>
          <p className="hero-lede">
            Edukademia combines data-led CGPA mentorship with professional coaching
            and counselling. We work with students directly and through partner schools.
          </p>
          <div className="hero-ctas">
            <a href="/cgpa-mentorship/" className="btn btn-gold btn-lg">Explore CGPA Mentorship</a>
            <a href="#method" className="btn btn-outline-light btn-lg">How we work</a>
          </div>
        </div>

        <div className="hero-visual">
          <img
            src="/cgpa/cgpa-mentorship-conversation.jpg"
            alt="A mentor reviewing a student's academic plan with her"
            width="1200"
            height="900"
          />
          <nav className="hero-overlay quick-links" aria-label="Our programmes">
            <p className="hero-overlay-title">Our programmes</p>
            <ul>
              {QUICK_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href}>
                    <span className="quick-link-audience">{l.audience}</span>
                    <span className="quick-link-title">{l.title}</span>
                    <span className="quick-link-meta">{l.meta}</span>
                    <span className="quick-link-arrow" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
}
