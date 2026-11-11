import { PROCESS } from './content';

export default function Process() {
  return (
    <section id="process" className="section cgpa-onboarding">
      <div className="section-inner">
        <div className="section-header">
          <p className="eyebrow">How it works</p>
          <h2>From first conversation to delivery</h2>
        </div>

        <ol className="onboarding-steps process-steps">
          {PROCESS.map((step, i) => (
            <li key={step.title}>
              <span className="onboarding-num">{i + 1}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
