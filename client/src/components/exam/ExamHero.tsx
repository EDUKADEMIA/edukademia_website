import { EXAMS, EXAM_GROUPS } from './content';

export default function ExamHero() {
  return (
    <section className="hero">
      <div className="hero-inner has-visual">
        <div className="hero-content">
          <p className="eyebrow">Exam preparation · Online tutorials</p>
          <h1>Prepare today for a brighter tomorrow.</h1>
          <p className="hero-lede">
            Quality guidance, better understanding and greater confidence for WAEC, NECO
            and JAMB, and for English language tests including IELTS and TOEFL. All
            tutorials are online.
          </p>
          <div className="hero-ctas">
            <a href="#register" className="btn btn-gold btn-lg">Register for tutorials</a>
            <a href="#how-it-works" className="btn btn-outline-light btn-lg">How it works</a>
          </div>
        </div>

        <div className="hero-visual exam-hero-visual">
          <img
            src="/exam-prep/student-studying.jpg"
            alt="A secondary-school student writing notes while studying"
            width="384"
            height="912"
          />
          <aside className="hero-overlay exam-quick" aria-label="Exams we prepare students for">
            <p className="hero-overlay-title">Exams we prepare for</p>
            {EXAM_GROUPS.map((group) => (
              <ul key={group.id} className="exam-tags" aria-label={group.label}>
                {EXAMS.filter((e) => e.group === group.id).map((e) => (
                  <li key={e.id} title={e.detail}>{e.name}</li>
                ))}
              </ul>
            ))}
          </aside>
        </div>
      </div>
    </section>
  );
}
