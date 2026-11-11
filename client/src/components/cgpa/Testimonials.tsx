export default function Testimonials() {
  return (
    <section className="section cgpa-testimonials">
      <div className="section-inner">
        <div className="section-header">
          <p className="eyebrow">Participants</p>
          <h2>In their own words</h2>
          <p>Feedback from participants in the first CGPA cohort.</p>
        </div>

        <div className="testimonial-grid">
          <figure className="testimonial-video">
            <video
              controls
              playsInline
              preload="none"
              poster="/cgpa/shammah-testimonial-poster.jpg"
              aria-label="Shammah talks about her experience of the CGPA programme"
            >
              <source src="/cgpa/shammah-testimonial.mp4" type="video/mp4" />
            </video>
            <figcaption>
              <strong>Shammah</strong>
              <span>CGPA 1.0 participant · Video</span>
            </figcaption>
          </figure>

          <figure className="testimonial-quote">
            <blockquote>
              <p className="testimonial-lead">
                Academic excellence is not simply a gift; it is built through
                structured, disciplined and consistent learning habits.
              </p>
              <p>
                CGPA gave me new strategies for balancing my academic, personal and
                spiritual responsibilities and showed me that a bright, successful
                academic journey is possible.
              </p>
            </blockquote>
            <figcaption>
              <strong>Josephine</strong>
              <span>CGPA 1.0 participant</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
