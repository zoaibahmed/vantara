import { RECRUITMENT_FAQS } from '@/lib/recruitment/constants';

export default function RecruitmentFAQ() {
  return (
    <section className="journal-section recruitment-questions" id="faq-section">
      <div className="container-editorial">
        <span className="journal-label">Practical details</span>
        <h2>Before you register.</h2>
        <div className="inner-faq">
          {RECRUITMENT_FAQS.map(faq => (
            <details key={faq.question}>
              <summary>{faq.question}<span aria-hidden="true">+</span></summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
