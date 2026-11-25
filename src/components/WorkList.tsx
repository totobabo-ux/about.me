"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useSpring } from "motion/react";
import { useState } from "react";
import type { Content, Locale } from "@/data/content";
import { cn } from "./cn";

const follow = { stiffness: 300, damping: 30, mass: 0.5 };
const followSlow = { stiffness: 200, damping: 30, mass: 0.6 };

/** 프로젝트 목록. 행에 마우스를 올리면 커서를 따라다니는 미리보기가 나타남 */
export function WorkList({ lang, t }: { lang: Locale; t: Content }) {
  const [active, setActive] = useState<number | null>(null);
  const x = useSpring(0, followSlow);
  const y = useSpring(0, followSlow);
  const cx = useSpring(0, follow);
  const cy = useSpring(0, follow);

  const move = (e: React.MouseEvent) => {
    x.set(e.clientX);
    y.set(e.clientY);
    cx.set(e.clientX);
    cy.set(e.clientY);
  };

  return (
    <div onMouseMove={move} onMouseLeave={() => setActive(null)}>
      <div className="hidden grid-cols-[1fr_auto] px-2 pb-6 text-xs label-track text-muted uppercase md:grid md:px-10">
        <span>{t.work.colProject}</span>
        <span>{t.work.colRole}</span>
      </div>
      <ul className="border-b border-line">
        {t.projects.map((p, i) => (
          <li key={p.slug} className="border-t border-line">
            <Link
              href={`/${lang}/work/${p.slug}`}
              onMouseEnter={() => setActive(i)}
              className="group flex flex-col gap-3 px-2 py-10 transition-opacity duration-300 md:flex-row md:items-center md:justify-between md:px-10 md:py-14 md:hover:opacity-40"
            >
              <span className="text-5xl font-normal tracking-tight transition-transform duration-500 md:text-7xl md:group-hover:-translate-x-3">
                {p.name}
              </span>
              <span className="flex flex-col text-[15px] transition-transform duration-500 md:items-end md:group-hover:translate-x-3">
                <span>{p.category}</span>
                <span className="text-muted">{p.kind}</span>
              </span>
              {/* 모바일에서는 이미지를 바로 보여줌 */}
              <span className="relative mt-4 block aspect-[16/10] w-full overflow-hidden md:hidden" style={{ background: p.color }}>
                <Image src={p.cover} alt="" fill sizes="100vw" className="object-cover p-6" />
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {/* 커서를 따라다니는 미리보기 (데스크톱) */}
      <motion.div
        style={{ left: x, top: y }}
        animate={{ scale: active === null ? 0 : 1 }}
        transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
        className="pointer-events-none fixed z-40 hidden h-[300px] w-[400px] -translate-x-1/2 -translate-y-1/2 overflow-hidden md:block"
      >
        <div
          className="h-full w-full transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
          style={{ transform: `translateY(${(active ?? 0) * -100}%)` }}
        >
          {t.projects.map((p) => (
            <div key={p.slug} className="relative flex h-full w-full items-center justify-center" style={{ background: p.color }}>
              <div className="relative h-[70%] w-[80%]">
                <Image src={p.cover} alt="" fill sizes="400px" className="object-cover" />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
      <motion.div
        style={{ left: cx, top: cy }}
        animate={{ scale: active === null ? 0 : 1 }}
        transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
        className={cn(
          "pointer-events-none fixed z-40 hidden size-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent text-sm text-white md:flex",
        )}
      >
        {t.work.view}
      </motion.div>
    </div>
  );
}
