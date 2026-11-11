const PATHS = [
  {
    tag: 'For students',
    title: 'CGPA Mentorship Programme',
    body:
      'A community of support, growth and accountability that helps students reach their ' +
      'academic potential. Applications are open for the next cohort.',
    items: [
      'Build capacity: the mindset, skills and habits to thrive',
      'Set clear goals and turn them into actionable steps',
      'Practical strategies to improve productivity',
      'Mentors and peers who keep you accountable',
      'Guidance on internships, scholarships and opportunities',
    ],
    img: '/cgpa/cgpa-students-hero.jpg',
    alt: 'University students working through course material together',
    href: '/cgpa-mentorship/',
    cta: 'View programme details',
    primary: true,
  },
  {
    tag: 'For exam candidates',
    title: 'Exam Preparation',
    body:
      'Online tutorials for school, entrance and English language exams, with quality ' +
      'guidance that builds understanding and confidence.',
    items: [
      'WAEC, NECO and JAMB preparation',
      'TOEFL, IELTS, PTE, Duolingo English Test and Cambridge English',
      'Mathematics, English Language, the sciences and more',
      'Tutorials scheduled around your preferred days and times',
      'Register in minutes and continue on WhatsApp',
    ],
    img: '/exam-prep/student-studying.jpg',
    imgPosition: 'center 40%',
    alt: 'A secondary-school student writing notes while studying',
    href: '/exam-preparation/',
    cta: 'View exam preparation',
    primary: false,
  },
  {
    tag: 'For schools and universities',
    title: 'Institutional Partnership',
    body:
      'Run the Edukademia programme within your existing student support services, ' +
      'with a package tailored to your institution.',
    items: [
      'Delivery to a whole cohort or targeted groups',
      'Branded student portal',
      'Aggregate reporting for academic affairs teams',
      'Training for your counselling staff',
      'A dedicated account manager',
    ],
    img: '/cgpa/cgpa-future-readiness.jpg',
    alt: 'A group of students reviewing documents together',
    href: '/school-partnership/',
    cta: 'View partnership details',
    primary: false,
  },
];

export default function Paths() {
  return (
    <section id="paths" className="section paths">
      <div className="section-inner">
        <div className="section-header">
          <p className="eyebrow">Programmes</p>
          <h2>Support at every stage</h2>
          <p>
            From secondary-school exams to university results, for individual
            students and for whole institutions.
          </p>
        </div>

        <div className="paths-grid">
          {PATHS.map((p) => (
            <article className="path-card" key={p.href}>
              <a href={p.href} className="path-card-media" tabIndex={-1} aria-hidden="true">
                <img
                  src={p.img}
                  alt=""
                  width="1200"
                  height="900"
                  loading="lazy"
                  style={'imgPosition' in p ? { objectPosition: p.imgPosition } : undefined}
                />
              </a>
              <div className="path-card-body">
                <p className="path-tag">{p.tag}</p>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
                <ul>
                  {p.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
                <a href={p.href} className={p.primary ? 'btn btn-primary' : 'btn btn-outline'}>
                  {p.cta}
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
