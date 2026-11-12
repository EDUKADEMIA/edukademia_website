import { useState } from 'react';
import { panelId, tabId, tabKeyHandler } from '../../lib/tabs';
import { FOR_INSTITUTION, OPTIONS, type OptionId } from './content';

const PREFIX = 'option';
const IDS = OPTIONS.map((o) => o.id);

interface OptionsProps {
  /** Called when a visitor asks to enquire about a specific option. */
  onEnquire: (id: OptionId) => void;
}

export default function Options({ onEnquire }: OptionsProps) {
  const [active, setActive] = useState<OptionId>('both-full-partnership');
  const onKeyDown = tabKeyHandler(PREFIX, IDS, active, setActive);

  return (
    <section id="options" className="section">
      <div className="section-inner">
        <div className="section-header">
          <p className="eyebrow">Partnership options</p>
          <h2>Choose the support your students need</h2>
          <p>
            Every package is tailored to your institution. Pricing depends on the
            number of students and the support you choose. Select an option to see
            what it includes.
          </p>
        </div>

        <div className="option-tablist" role="tablist" aria-label="Partnership options" onKeyDown={onKeyDown}>
          {OPTIONS.map((o) => {
            const selected = o.id === active;
            return (
              <button
                key={o.id}
                type="button"
                role="tab"
                id={tabId(PREFIX, o.id)}
                aria-selected={selected}
                aria-controls={panelId(PREFIX, o.id)}
                tabIndex={selected ? 0 : -1}
                className="option-tab"
                onClick={() => setActive(o.id)}
              >
                <span className="option-tab-head">
                  <span className="option-tab-name">{o.name}</span>
                  {o.featured && <span className="tier-badge">Most complete</span>}
                </span>
                <span className="option-tab-body">{o.body}</span>
              </button>
            );
          })}
        </div>

        {OPTIONS.map((o) => (
          <div
            key={o.id}
            role="tabpanel"
            id={panelId(PREFIX, o.id)}
            aria-labelledby={tabId(PREFIX, o.id)}
            hidden={o.id !== active}
            className="option-panel"
          >
            <div>
              <h3>{o.name} includes</h3>
              <ul className="tier-features">
                {o.includes.map((item) => (
                  <li key={item}><span className="tier-feature-title">{item}</span></li>
                ))}
              </ul>
            </div>
            <div className="option-panel-side">
              <h3>Included with every partnership</h3>
              <ul className="option-standard">
                {FOR_INSTITUTION.map((item) => <li key={item}>{item}</li>)}
              </ul>
              <a href="#enquiry" className="btn btn-primary" onClick={() => onEnquire(o.id)}>
                Enquire about {o.name.toLowerCase()}
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
