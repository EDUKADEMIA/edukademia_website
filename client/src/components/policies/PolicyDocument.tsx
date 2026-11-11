import { useEffect, useState, type ReactNode } from 'react';
import { CONTACT_EMAIL, LAST_UPDATED, POLICIES, REFERENCES, type Block, type Policy } from './content';

/** Turns the contact email inside policy text into a mailto link. */
function linkEmail(text: string): ReactNode {
  const parts = text.split(CONTACT_EMAIL);
  if (parts.length === 1) return text;
  return parts.flatMap((part, i) =>
    i === 0 ? [part] : [<a key={i} href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>, part],
  );
}

function renderBlock(block: Block, key: number) {
  switch (block.type) {
    case 'h3':
      return <h3 key={key}>{block.text}</h3>;
    case 'ul':
      return (
        <ul key={key}>
          {block.items.map((item) => <li key={item}>{linkEmail(item)}</li>)}
        </ul>
      );
    default:
      return <p key={key}>{linkEmail(block.text)}</p>;
  }
}

/** Tracks which policy section is currently being read, for the contents list. */
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      // A band near the top of the viewport, below the sticky nav.
      { rootMargin: '-90px 0px -60% 0px' },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

const IDS = POLICIES.map((p) => p.id);

export default function PolicyDocument() {
  const active = useActiveSection(IDS);

  return (
    <>
      <header className="policy-header">
        <div className="section-inner">
          <p className="eyebrow">Policies</p>
          <h1>CGPA Programme Policies</h1>
          <p className="policy-intro">
            These short policies explain how payments, personal information,
            certification and participation are handled.
          </p>
          <p className="policy-meta">Last updated: {LAST_UPDATED}</p>
        </div>
      </header>

      <div className="section policy-body">
        <div className="section-inner policy-layout">
          <nav className="policy-toc" aria-label="Policies on this page">
            <p className="policy-toc-title">On this page</p>
            <ol>
              {POLICIES.map((p) => (
                <li key={p.id}>
                  <a href={`#${p.id}`} aria-current={active === p.id ? 'location' : undefined}>
                    {p.navLabel}
                  </a>
                </li>
              ))}
            </ol>
            <p className="policy-toc-help">
              Questions? Email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            </p>
          </nav>

          <div className="policy-content">
            <p className="policy-law-note">
              These policies are intended to provide clear programme information and
              operate subject to applicable Nigerian consumer and data-protection law.
            </p>

            {POLICIES.map((policy: Policy) => (
              <section key={policy.id} id={policy.id} className="policy-section" aria-labelledby={`${policy.id}-title`}>
                <h2 id={`${policy.id}-title`}>{policy.title}</h2>
                {policy.blocks.map(renderBlock)}
              </section>
            ))}

            <p className="policy-references">
              This policy structure reflects transparency and data-subject rights promoted by
              the{' '}
              <a href={REFERENCES[0].href} target="_blank" rel="noopener noreferrer">{REFERENCES[0].label}</a>,
              fair-treatment and redress principles communicated by the{' '}
              <a href={REFERENCES[1].href} target="_blank" rel="noopener noreferrer">{REFERENCES[1].label}</a>,
              and Selar’s guidance on publishing clear{' '}
              <a href={REFERENCES[2].href} target="_blank" rel="noopener noreferrer">{REFERENCES[2].label}</a>.
            </p>

            <a href="/cgpa-mentorship/" className="btn btn-outline">Back to CGPA Mentorship</a>
          </div>
        </div>
      </div>
    </>
  );
}
