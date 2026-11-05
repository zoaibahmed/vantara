"use client";
import Image from "next/image";
import { RECRUITMENT_INDUSTRIES } from "@/lib/recruitment/constants";
export default function RecruitmentIndustries({
  onSelectIndustry,
}: {
  onSelectIndustry?: (name: string) => void;
}) {
  const select = (name: string) => {
    onSelectIndustry?.(name);
    document
      .getElementById("cv-builder")
      ?.scrollIntoView({
        behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
      });
  };
  return (
    <section
      id="industries-section"
      className="section-spacing industry-directory"
    >
      <div className="container">
        <div className="directory-intro">
          <span className="label-editorial">Where your skills belong</span>
          <h2 className="display-1">
            Many industries.
            <br />
            Individual possibilities.
          </h2>
          <p className="lead-text">
            Explore the roles that match your experience, then tell us where you
            would like to go.
          </p>
        </div>
        <div className="industry-entries">
          {RECRUITMENT_INDUSTRIES.map((ind, index) => (
            <details key={ind.id} className="industry-entry" open={index === 0}>
              <summary>
                <span>{ind.name}</span>
                <span aria-hidden="true">+</span>
              </summary>
              <div className="industry-expanded">
                <div className="industry-photo">
                  <Image
                    src={ind.image}
                    alt={ind.alt}
                    fill
                    sizes="(max-width: 800px) 100vw, 40vw"
                  />
                </div>
                <div>
                  <p>{ind.description}</p>
                  <p className="industry-roles">
                    {ind.exampleRoles.join(" / ")}
                  </p>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => select(ind.name)}
                  >
                    Build your CV in {ind.name}
                    <span aria-hidden="true">↗</span>
                  </button>
                </div>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
