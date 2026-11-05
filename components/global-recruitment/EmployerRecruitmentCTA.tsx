import Link from 'next/link';

export default function EmployerRecruitmentCTA() {
  return (
    <section className="journal-section responsible-close container-wide" id="employer-section">
      <span className="journal-label">For employers</span>
      <h2>Start with<br />your workforce brief.</h2>
      <div>
        <p>Tell us the roles you need to fill, how many people you need and when. We’ll discuss recruitment options and agree the scope around your operation.</p>
        <Link href="/contact" className="btn btn-primary">Request Workforce ↗</Link>
      </div>
    </section>
  );
}
