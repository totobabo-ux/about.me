"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { SLIDER_ROWS } from "@/data/content";

const colors = ["#d4e3ec", "#e5e0e1", "#d7d4cf", "#e1dad6", "#d6d7dc", "#e2e4e5"];

/** 스크롤에 따라 서로 반대 방향으로 흐르는 이미지 두 줄 + 아래 섹션으로 이어지는 곡선 */
export function SlidingImages() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x1 = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["-12%", "0%"]);
  const curve = useTransform(scrollYProgress, [0, 0.9], [60, 0]);

  return (
    <div ref={ref} className="relative z-10 flex flex-col gap-[3vw] bg-paper pt-24 md:pt-40">
      {[
        { images: SLIDER_ROWS.top, x: x1 },
        { images: SLIDER_ROWS.bottom, x: x2 },
      ].map((row, r) => (
        <motion.div key={r} style={{ x: row.x }} className="relative -left-[6vw] flex w-[112vw] gap-[3vw]">
          {row.images.map((src, i) => (
            <div
              key={src + i}
              className="flex aspect-[4/3] w-1/4 shrink-0 items-center justify-center"
              style={{ background: colors[(i + r * 2) % colors.length] }}
            >
              <div className="relative h-[80%] w-[80%] overflow-hidden">
                <Image src={src} alt="" fill sizes="25vw" className="object-cover" />
              </div>
            </div>
          ))}
        </motion.div>
      ))}
      <motion.div style={{ height: curve }} className="relative mt-[6vw]">
        <div className="absolute -left-[10%] h-[1550%] w-[120%] rounded-[0_0_50%_50%] bg-paper shadow-[0_60px_50px_rgba(0,0,0,0.35)]" />
      </motion.div>
    </div>
  );
}
