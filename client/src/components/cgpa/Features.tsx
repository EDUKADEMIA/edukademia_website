import { FEATURES } from './content';

export default function Features() {
  return (
    <section className="section cgpa-features">
      <div className="section-inner">
        <div className="section-header">
          <p className="eyebrow">What makes CGPA different</p>
          <h2>Support that continues after the session ends</h2>
        </div>

        <dl className="feature-grid">
          {FEATURES.map((f) => (
            <div className="feature" key={f.title}>
              <dt>{f.title}</dt>
              <dd>{f.body}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
