interface FaqProps {
  items: { q: string; a: string }[];
  title?: string;
  /** Use the off-white section background, for alternating with a white section above. */
  tinted?: boolean;
}

export default function Faq({ items, title = 'Frequently asked questions', tinted = false }: FaqProps) {
  return (
    <section id="faq" className={tinted ? 'section cgpa-faq faq-tinted' : 'section cgpa-faq'}>
      <div className="section-inner faq-grid">
        <div className="section-header">
          <p className="eyebrow">FAQs</p>
          <h2>{title}</h2>
        </div>

        <div className="faq-list">
          {items.map((item) => (
            <details key={item.q}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
