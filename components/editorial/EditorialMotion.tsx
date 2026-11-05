"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { animate } from "framer-motion";

// Content is readable before JS. Reveal only elements below the viewport.
export default function EditorialMotion() {
  const pathname = usePathname();
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const controls: Array<{ stop: () => void }> = [];
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>(
        "main section h2, main .collection-media, main .role-composition-block, main .atlas-stage",
      ),
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          observer.unobserve(el);
          if (!preference.matches)
            controls.push(
              animate(
                el,
                { opacity: [0.4, 1], y: [24, 0] },
                { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
              ),
            );
        });
      },
      { threshold: 0.08 },
    );
    targets.forEach((el) => {
      if (el.getBoundingClientRect().top > window.innerHeight)
        observer.observe(el);
    });
    const stop = () => {
      if (preference.matches) {
        controls.forEach((c) => c.stop());
        targets.forEach((el) => {
          el.style.opacity = "1";
          el.style.transform = "none";
        });
      }
    };
    preference.addEventListener("change", stop);
    return () => {
      observer.disconnect();
      controls.forEach((c) => c.stop());
      preference.removeEventListener("change", stop);
    };
  }, [pathname]);
  return null;
}
