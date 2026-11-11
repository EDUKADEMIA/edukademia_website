import { BENEFITS } from './content';

export default function Benefits() {
  return (
    <section className="section">
      <div className="section-inner">
        <div className="section-header">
          <p className="eyebrow">Why partner with us</p>
          <h2>Structured support that complements your own</h2>
          <p>
            Many students need more than lectures and exams to reach their potential.
            A partnership gives them structured support while your team keeps full
            visibility.
          </p>
        </div>

        <ol className="method-steps benefit-list">
          {BENEFITS.map((b) => (
            <li className="method-step" key={b.title}>
              <h3>{b.title}</h3>
              <p>{b.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
