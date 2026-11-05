"use client";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useMotionPreference } from '@/components/animations/useMotionPreference';
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";

interface Props {
  chapter: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  variant: "landscape" | "portrait" | "manifesto" | "invitation";
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
  caption?: string;
}
export default function PageOpening({
  chapter,
  title,
  description,
  image,
  alt,
  variant,
  primary,
  secondary,
  caption = 'People. Skills. International opportunity.',
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useMotionPreference();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 60]);
  return (
    <section
      ref={ref}
      className={`collection-opening collection-opening--${variant}`}
      aria-labelledby="page-title"
    >
      <div className="collection-heading">
        <div className="collection-chapter">
          <Link href="/">Viaferra</Link>
          <span aria-hidden="true">/</span>
          <span>{chapter}</span>
        </div>
        <h1 id="page-title">{title}</h1>
        <div className="collection-introduction">
          <p>{description}</p>
          <div className="collection-actions">
            <Link className="btn btn-primary" href={primary.href}>
              {primary.label}
              <span aria-hidden="true">↗</span>
            </Link>
            {secondary && (
              <Link className="collection-secondary" href={secondary.href}>
                {secondary.label}
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className="collection-media">
        <motion.div
          className="collection-media-inner"
          style={{ y: reduced ? 0 : y }}
        >
          <Image
            src={image}
            alt={alt}
            fill
            priority
            sizes="(max-width: 800px) 100vw, 85vw"
          />
        </motion.div>
        <span className="collection-photo-caption">
          {caption}
        </span>
      </div>
      <div className="collection-endnote">
        <span>International workforce solutions</span>
        <a href="#page-story">
          Explore this chapter <span aria-hidden="true">↓</span>
        </a>
      </div>
    </section>
  );
}
