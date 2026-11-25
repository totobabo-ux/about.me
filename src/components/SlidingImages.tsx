"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { SLIDER_ROWS, type Locale, type Project } from "@/data/content";

/** 스크롤에 따라 서로 반대 방향으로 흐르는 프로젝트 이미지 두 줄 + 아래 섹션으로 이어지는 곡선 */
export function SlidingImages({ lang, projects }: { lang: Locale; projects: Project[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x1 = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["-12%", "0%"]);
  const curve = useTransform(scrollYProgress, [0, 0.9], [60, 0]);

  const bySlug = new Map(projects.map((p) => [p.slug, p]));
  const rows = [
    { slugs: SLIDER_ROWS.top, x: x1 },
    { slugs: SLIDER_ROWS.bottom, x: x2 },
  ];

  return (
    <div ref={ref} className="relative z-10 flex flex-col gap-3 overflow-x-clip bg-paper pt-16 md:gap-[3vw] md:pt-40">
      {rows.map((row, r) => (
        <motion.div key={r} style={{ x: row.x }} className="relative -left-[30vw] flex w-[190vw] gap-3 md:-left-[6vw] md:w-[112vw] md:gap-[3vw]">
          {row.slugs.map((slug, i) => {
            const project = bySlug.get(slug);
            if (!project) return null;
            return (
              <Link
                key={`${slug}-${i}`}
                href={`/${lang}/work/${slug}`}
                aria-label={project.name}
                className="group relative flex aspect-[4/3] w-1/4 shrink-0 items-center justify-center overflow-hidden"
                style={{ background: project.color }}
              >
                <div className="relative h-[80%] w-[80%] overflow-hidden">
                  <Image
                    src={project.cover}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 48vw, 25vw"
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-105"
                  />
                </div>
                <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs text-ink transition-all duration-500 md:bottom-5 md:left-5 md:translate-y-2 md:px-4 md:py-1.5 md:text-sm md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
                  {project.name} ↗
                </span>
              </Link>
            );
          })}
        </motion.div>
      ))}
      <motion.div style={{ height: curve }} className="relative mt-12 md:mt-[6vw]">
        <div className="pointer-events-none absolute -left-[10%] h-[700%] w-[120%] rounded-[0_0_50%_50%] bg-paper shadow-[0_60px_50px_rgba(0,0,0,0.35)] md:h-[1550%]" />
      </motion.div>
    </div>
  );
}
