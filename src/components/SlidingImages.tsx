"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef } from "react";
import { SLIDER_ORDER, type Locale, type Project } from "@/data/content";

/**
 * 프로젝트 이미지 3장 + 아래 섹션으로 이어지는 곡선
 * - 데스크톱: 세 장이 한 화면에 보이며 스크롤에 따라 살짝 옆으로 흐름
 * - 모바일: 손가락으로 좌우로 넘기는 카드
 */
export function SlidingImages({ lang, projects }: { lang: Locale; projects: Project[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const isDesktop = useRef(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => (isDesktop.current = mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  const x = useTransform(scrollYProgress, (v) => (isDesktop.current ? `${3 - v * 6}%` : "0%"));
  const curve = useTransform(scrollYProgress, [0, 0.9], [60, 0]);

  const items = SLIDER_ORDER.map((slug) => projects.find((p) => p.slug === slug)).filter(
    (p): p is Project => Boolean(p),
  );

  return (
    <div ref={ref} className="relative z-10 overflow-x-clip bg-paper pt-16 md:pt-40">
      <div className="snap-x snap-mandatory overflow-x-auto px-6 [scrollbar-width:none] md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden">
        <motion.div style={{ x }} className="flex w-max gap-3 md:mx-auto md:w-[92vw] md:gap-[3vw]">
          {items.map((project) => (
            <Link
              key={project.slug}
              href={`/${lang}/work/${project.slug}`}
              aria-label={project.name}
              className="group relative flex aspect-[4/3] w-[76vw] shrink-0 snap-center items-center justify-center overflow-hidden md:w-auto md:flex-1"
              style={{ background: project.color }}
            >
              <div className="relative h-[80%] w-[80%] overflow-hidden">
                <Image
                  src={project.cover}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 76vw, 30vw"
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-105"
                />
              </div>
              <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs text-ink transition-all duration-500 md:bottom-6 md:left-6 md:translate-y-2 md:px-4 md:py-1.5 md:text-sm md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
                {project.name} ↗
              </span>
            </Link>
          ))}
        </motion.div>
      </div>
      <motion.div style={{ height: curve }} className="relative mt-12 md:mt-[6vw]">
        <div className="pointer-events-none absolute -left-[10%] h-[700%] w-[120%] rounded-[0_0_50%_50%] bg-paper shadow-[0_60px_50px_rgba(0,0,0,0.35)] md:h-[1550%]" />
      </motion.div>
    </div>
  );
}
