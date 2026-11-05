"use client";
import Image from "next/image";
import { TARGET_REGIONS } from "@/lib/recruitment/constants";
export default function DestinationCards({
  onSelectDestination,
}: {
  onSelectDestination?: (name: string) => void;
}) {
  const select = (name: string) => {
    onSelectDestination?.(name);
    document
      .getElementById("cv-builder")
      ?.scrollIntoView({
        behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
      });
  };
  return (
    <section id="destinations-section" className="section-spacing">
      <div className="container-wide">
        <header className="regions-heading">
          <span className="label-editorial">Explore your possibilities</span>
          <h2 className="display-1">A wider world of work.</h2>
          <p className="lead-text">
            Explore our recruitment focus regions. Availability depends on
            employer requirements and destination processes.
          </p>
        </header>
        <div className="region-collection">
          {TARGET_REGIONS.map((card) => (
            <article key={card.id} className="region-story">
              <div className="region-photo">
                <Image
                  src={card.image}
                  alt={card.alt}
                  fill
                  sizes="(max-width: 800px) 100vw, 50vw"
                />
              </div>
              <div className="region-caption">
                <span>{card.tagline}</span>
                <h3>{card.region}</h3>
                <p>{card.copy}</p>
                <p className="region-industries">
                  {card.industries.join(" / ")}
                </p>
                <p className="caption">{card.focusAreas}</p>
                <button
                  className="collection-secondary"
                  type="button"
                  onClick={() => select(card.region)}
                >
                  Explore opportunities in {card.region}{" "}
                  <span aria-hidden="true">↗</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
