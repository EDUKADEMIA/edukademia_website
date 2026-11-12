import { STEPS } from './content';

export default function ExamSteps() {
  return (
    <section id="how-it-works" className="section cgpa-onboarding">
      <div className="section-inner">
        <div className="section-header">
          <p className="eyebrow">How it works</p>
          <h2>Getting started is easy</h2>
          <p>No lengthy application. Register in a few minutes and continue on WhatsApp.</p>
        </div>

        <ol className="onboarding-steps">
          {STEPS.map((step, i) => (
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
