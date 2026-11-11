const POLICY_LINKS = [
  { href: '/policies/#refunds', label: 'Refunds and transfers' },
  { href: '/policies/#privacy', label: 'Privacy notice' },
  { href: '/policies/#certificate', label: 'Certificate requirements' },
  { href: '/policies/#participation', label: 'Participation expectations' },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <a href="/" className="brand">
              <img src="/logo-white.png" alt="" className="brand-mark" width="56" height="56" />
              <span className="brand-name">Edukademia</span>
            </a>
            <p className="footer-tagline">
              Mentorship, exam preparation and student support, from secondary school
              to university.
            </p>
          </div>

          <div className="footer-links">
            <div className="footer-col">
              <h4>Programmes</h4>
              <ul>
                <li><a href="/cgpa-mentorship/">CGPA Mentorship</a></li>
                <li><a href="/exam-preparation/">Exam Preparation</a></li>
                <li><a href="/school-partnership/">School Partnership</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>About</h4>
              <ul>
                <li><a href="/#vision">About us</a></li>
                <li><a href="/#method">Our approach</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Contact</h4>
              <ul>
                <li><a href="mailto:edukademia1@gmail.com">edukademia1@gmail.com</a></li>
                <li>
                  <a href="https://www.facebook.com/100065620054262/" target="_blank" rel="noopener noreferrer">
                    Facebook
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/edukademia_limited/" target="_blank" rel="noopener noreferrer">
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Edukademia. All rights reserved.</p>
          <ul className="footer-policies" aria-label="Policies">
            {POLICY_LINKS.map((l) => (
              <li key={l.href}><a href={l.href}>{l.label}</a></li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
