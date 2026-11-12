import RegistrationForm from './RegistrationForm';
import { EXAMS, EXAM_GROUPS, SUBJECTS } from './content';

export default function ExamRegister() {
  return (
    <section id="register" className="section exam-subjects">
      <div className="section-inner planner-grid">
        <div className="planner-intro">
          <p className="eyebrow">Register for tutorials</p>
          <h2>Tell us what you are preparing for</h2>
          <p>
            Fill in the form and we will write your WhatsApp registration for you. All
            tutorials are delivered online, so you can join from anywhere.
          </p>

          {EXAM_GROUPS.map((group) => (
            <div className="exam-group" key={group.id}>
              <h3>{group.label}</h3>
              <ul className="subject-list">
                {EXAMS.filter((e) => e.group === group.id).map((e) => <li key={e.id}>{e.name}</li>)}
              </ul>
            </div>
          ))}

          <p className="exam-group-note">
            Subjects include {SUBJECTS.slice(0, -1).join(', ')} and {SUBJECTS[SUBJECTS.length - 1]},
            plus other key subjects. English test preparation covers listening, reading, writing
            and speaking.
          </p>
        </div>

        <RegistrationForm />
      </div>
    </section>
  );
}
