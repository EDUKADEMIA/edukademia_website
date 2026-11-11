import { useId, useState } from 'react';

type Scale = 5 | 4;

interface Inputs {
  current: string;
  completed: string;
  target: string;
  remaining: string;
}

type Result =
  | { kind: 'incomplete' }
  | { kind: 'invalid'; message: string }
  | { kind: 'on-track' | 'achievable' | 'stretch'; required: number }
  | { kind: 'out-of-reach'; best: number };

/** Average grade point needed on the remaining units to finish at the target CGPA. */
function calculate(v: Inputs, scale: Scale): Result {
  if (Object.values(v).some((x) => x.trim() === '')) return { kind: 'incomplete' };

  const current = Number(v.current);
  const target = Number(v.target);
  const completed = Number(v.completed);
  const remaining = Number(v.remaining);

  if ([current, target, completed, remaining].some(Number.isNaN)) {
    return { kind: 'invalid', message: 'Enter numbers only.' };
  }
  if (current < 0 || current > scale || target < 0 || target > scale) {
    return { kind: 'invalid', message: `CGPA values must be between 0 and ${scale}.` };
  }
  if (completed < 0) return { kind: 'invalid', message: 'Units completed cannot be negative.' };
  if (remaining <= 0) return { kind: 'invalid', message: 'Enter at least 1 remaining unit.' };

  const required = (target * (completed + remaining) - current * completed) / remaining;

  if (required > scale) {
    const best = (current * completed + scale * remaining) / (completed + remaining);
    return { kind: 'out-of-reach', best };
  }
  if (required <= current) return { kind: 'on-track', required: Math.max(required, 0) };
  if (required > scale * 0.85) return { kind: 'stretch', required };
  return { kind: 'achievable', required };
}

const MESSAGES = {
  'on-track': 'You are on track. Keep your average at or above this to reach your target.',
  achievable: 'Achievable with consistent work across your remaining courses.',
  stretch: 'Possible, but demanding. A structured plan and regular accountability make a real difference here.',
};

export default function GpaCalculator() {
  const uid = useId();
  const [scale, setScale] = useState<Scale>(5);
  const [values, setValues] = useState<Inputs>({
    current: '2.80',
    completed: '60',
    target: '3.50',
    remaining: '90',
  });

  const result = calculate(values, scale);

  function update(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  const fields: { name: keyof Inputs; label: string; step: string; max?: number }[] = [
    { name: 'current', label: 'Current CGPA', step: '0.01', max: scale },
    { name: 'completed', label: 'Units completed so far', step: '1' },
    { name: 'target', label: 'Target CGPA', step: '0.01', max: scale },
    { name: 'remaining', label: 'Units remaining', step: '1' },
  ];

  return (
    <section id="calculator" className="section calculator-section">
      <div className="section-inner calculator-grid">
        <div className="calculator-intro">
          <p className="eyebrow">Free tool</p>
          <h2>What CGPA do you need?</h2>
          <p>
            Enter your current position and your target. We will show the average
            grade point you need across your remaining courses.
          </p>
          <p className="calculator-note">
            Need help reaching your target? CGPA Mentorship pairs you with a mentor
            who helps you plan, stay focused and stay accountable.
          </p>
          <a href="/cgpa-mentorship/" className="btn btn-outline">Explore CGPA Mentorship</a>
        </div>

        <div className="calculator-card">
          <div className="calculator-scale" role="radiogroup" aria-label="Grading scale">
            {([5, 4] as Scale[]).map((s) => (
              <button
                key={s}
                type="button"
                role="radio"
                aria-checked={scale === s}
                className={scale === s ? 'is-active' : undefined}
                onClick={() => setScale(s)}
              >
                {s}.0 scale
              </button>
            ))}
          </div>

          <div className="calculator-fields">
            {fields.map((f) => (
              <div className="calc-field" key={f.name}>
                <label htmlFor={`${uid}-${f.name}`}>{f.label}</label>
                <input
                  id={`${uid}-${f.name}`}
                  name={f.name}
                  type="number"
                  inputMode="decimal"
                  min={0}
                  max={f.max}
                  step={f.step}
                  value={values[f.name]}
                  onChange={update}
                />
              </div>
            ))}
          </div>

          <div className={`calculator-result result-${result.kind}`} aria-live="polite">
            {(result.kind === 'on-track' || result.kind === 'achievable' || result.kind === 'stretch') && (
              <>
                <p className="result-label">Average needed on remaining units</p>
                <p className="result-value">
                  {result.required.toFixed(2)}
                  <span> / {scale}.00</span>
                </p>
                <div className="result-meter" aria-hidden="true">
                  <span style={{ width: `${(result.required / scale) * 100}%` }} />
                </div>
                <p className="result-message">{MESSAGES[result.kind]}</p>
              </>
            )}
            {result.kind === 'out-of-reach' && (
              <>
                <p className="result-label">Not reachable with the remaining units</p>
                <p className="result-value">
                  {result.best.toFixed(2)}
                  <span> highest possible</span>
                </p>
                <p className="result-message">
                  Even with a perfect score on every remaining unit, this is the highest
                  CGPA you could finish with. A mentor can help you set a realistic target.
                </p>
              </>
            )}
            {result.kind === 'invalid' && <p className="result-message">{result.message}</p>}
            {result.kind === 'incomplete' && (
              <p className="result-message">Fill in all four fields to see your result.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
