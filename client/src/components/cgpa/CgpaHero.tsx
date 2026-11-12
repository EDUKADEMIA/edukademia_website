import { MENTEE_FORM_URL } from './content';

const PILLARS = ['Coaching', 'Mentorship', 'Accountability', 'Future readiness'];

export default function CgpaHero() {
  return (
    <section className="hero cgpa-hero">
      <div className="hero-inner">
        <div className="hero-content">
          <p className="eyebrow">CGPA Student Mentorship Programme</p>
          <h1>Build the student you need to become.</h1>
          <p className="hero-lede">
            A mentorship programme that takes students from academic foundations
            to consistent excellence and future readiness. Applications are now
            open for the next cohort, for mentees and mentors.
          </p>
          <div className="hero-ctas">
            <a href={MENTEE_FORM_URL} className="btn btn-gold btn-lg" target="_blank" rel="noopener noreferrer">
              Apply as a mentee
            </a>
            <a href="#mentors" className="btn btn-outline-light btn-lg">Call for mentors</a>
          </div>
          <ul className="cgpa-pillars" aria-label="What the programme includes">
            {PILLARS.map((p) => <li key={p}>{p}</li>)}
          </ul>
        </div>

        <figure className="cgpa-hero-media">
          <img
            src="/cgpa/cgpa-students-hero.jpg"
            alt="University students studying and solving problems together"
            width="1400"
            height="876"
          />
        </figure>
      </div>
    </section>
  );
}
