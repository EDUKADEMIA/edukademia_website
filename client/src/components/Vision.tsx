const STATS = [
  { num: '0.8+', label: 'Average CGPA improvement per student cohort' },
  { num: '94%', label: 'Of students report improved confidence and focus' },
  { num: '1:1', label: 'Personal coaching alongside group counselling' },
  { num: '12 wk', label: 'Structured programme with measurable milestones' },
];

export default function Vision() {
  return (
    <section id="vision" className="section vision">
      <div className="section-inner">
        <div className="vision-grid">
          <div className="vision-text">
            <p className="eyebrow">About Edukademia</p>
            <h2>Every student deserves both the grades and the growth to thrive.</h2>
            <p>
              Many students focus entirely on CGPA targets and neglect the
              self-awareness, emotional intelligence and coping skills that shape
              long-term success in their careers and their lives.
            </p>
            <p>
              Edukademia was founded on a simple belief: academic performance and
              personal wellbeing are not in competition. With the right support,
              each one strengthens the other.
            </p>
          </div>

          <dl className="vision-stats">
            {STATS.map((s) => (
              <div className="stat" key={s.label}>
                <dt className="stat-num">{s.num}</dt>
                <dd className="stat-label">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
