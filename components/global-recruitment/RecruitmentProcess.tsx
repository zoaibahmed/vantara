import { RECRUITMENT_PROCESS_STEPS } from '@/lib/recruitment/constants';

export default function RecruitmentProcess() {
  return (
    <section className="journal-section candidate-process" id="process-section">
      <div className="container-wide">
        <span className="journal-label">The candidate journey</span>
        <h2>From profile to review.</h2>
        <ol className="candidate-process-list">
          {RECRUITMENT_PROCESS_STEPS.map(step => (
            <li key={step.stepNumber}>
              <span>{step.stepNumber}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </li>
          ))}
        </ol>
        <p className="journey-disclaimer">Your submitted profile goes to the recruitment team for review. Registration expresses interest in suitable opportunities.</p>
      </div>
    </section>
  );
}
