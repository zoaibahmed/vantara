import PageOpening from "@/components/editorial/PageOpening";
export default function GlobalRecruitmentHero() {
  return (
    <PageOpening
      chapter="Global opportunities"
      title="Your next chapter starts here."
      description="Bring your skills to new places. Explore international recruitment opportunities, create your professional CV and register your interest."
      image="/images/journal/technical.jpg"
      alt="Electrical technician installing a wall fitting"
      variant="portrait" caption="Skills in focus / Electrical installation"
      primary={{ label: "Build your CV", href: "#cv-builder" }}
      secondary={{ label: "For employers", href: "#employer-section" }}
    />
  );
}
