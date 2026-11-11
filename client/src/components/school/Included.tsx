import { FOR_STUDENTS } from './content';

export default function Included() {
  return (
    <section className="section school-included">
      <div className="section-inner student-band">
        <img
          src="/cgpa/cgpa-students-hero.jpg"
          alt="University students studying and solving problems together"
          className="student-band-photo"
          width="1400"
          height="876"
          loading="lazy"
        />
        <div className="student-band-body">
          <p className="eyebrow">What your students receive</p>
          <h2>The full CGPA programme, delivered to your cohort</h2>
          <p>
            Your students follow the same programme as our individual participants,
            with tools, sessions and accountability that continue between classes.
          </p>
          <ul className="tier-features">
            {FOR_STUDENTS.map((item) => (
              <li key={item}><span className="tier-feature-title">{item}</span></li>
            ))}
          </ul>
          <a href="/cgpa-mentorship/" className="included-link">See the CGPA Mentorship Programme</a>
        </div>
      </div>
    </section>
  );
}
