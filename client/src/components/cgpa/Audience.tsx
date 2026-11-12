const AUDIENCES = [
  {
    label: 'Academic direction',
    title: 'For students who need a clearer way forward',
    body: 'Practical guidance, personal support and accountability that turn uncertainty into a workable academic plan.',
    img: '/cgpa/cgpa-mentorship-conversation.jpg',
    alt: 'A university student receiving personal academic guidance from a mentor',
  },
  {
    label: 'Future readiness',
    title: 'For students preparing for life after graduation',
    body: 'Build the habits, experience and confidence to pursue internships, scholarships, volunteering and graduate opportunities.',
    img: '/cgpa/cgpa-future-readiness.jpg',
    alt: 'University students preparing together for academic and career opportunities',
  },
];

export default function Audience() {
  return (
    <section className="section cgpa-audience">
      <div className="section-inner">
        <div className="section-header">
          <p className="eyebrow">Who it's for</p>
          <h2>Support for the person behind the grades</h2>
          <p>
            CGPA develops academically equipped, disciplined and future-ready
            students through practical tools, guided mentorship and sustained
            accountability. It is for students who want more than motivation: those
            ready to understand where they are, improve how they learn and prepare
            for what comes next.
          </p>
        </div>

        <div className="audience-grid">
          {AUDIENCES.map((a) => (
            <article className="audience-card" key={a.label}>
              <img src={a.img} alt={a.alt} width="1200" height="900" loading="lazy" />
              <div className="audience-body">
                <p className="path-tag">{a.label}</p>
                <h3>{a.title}</h3>
                <p>{a.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
