import { HOW_TO_APPLY, WHATSAPP_URL } from './content';

export default function Onboarding() {
  return (
    <section className="section cgpa-onboarding">
      <div className="section-inner">
        <div className="section-header">
          <p className="eyebrow">How to apply</p>
          <h2>From application to your first session</h2>
        </div>

        <ol className="onboarding-steps">
          {HOW_TO_APPLY.map((step, i) => (
            <li key={step.title}>
              <span className="onboarding-num">{i + 1}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            </li>
          ))}
        </ol>

        <p className="onboarding-help">
          Have a question about applying?{' '}
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
            Contact Edukademia on WhatsApp
          </a>
          .
        </p>
      </div>
    </section>
  );
}
