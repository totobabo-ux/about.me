"use client";

import Image from "next/image";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef } from "react";
import { IMAGES, type Content } from "@/data/content";

const ease = [0.76, 0, 0.24, 1] as const;

export function Hero({ t }: { t: Content }) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollY, scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // 스크롤 방향에 따라 이름 띠가 흐르는 방향이 바뀜
  const offset = useMotionValue(0);
  const direction = useRef(-1);
  useMotionValueEvent(scrollY, "change", (v) => {
    direction.current = v > (scrollY.getPrevious() ?? 0) ? -1 : 1;
  });
  useAnimationFrame((_, delta) => {
    let next = offset.get() + direction.current * delta * 0.0035;
    if (next <= -50) next += 50;
    if (next > 0) next -= 50;
    offset.set(next);
  });
  const marqueeX = useTransform(offset, (v) => `${v}%`);
  const photoY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);

  return (
    <section
      ref={sectionRef}
      className="relative h-svh min-h-[640px] overflow-hidden"
      style={{ backgroundColor: IMAGES.heroBackground }}
    >
      {/* 인물 사진: 배경색과 섞이도록 가장자리를 부드럽게 페이드 */}
      <motion.div
        style={{ y: photoY }}
        className="absolute inset-x-0 bottom-0 mx-auto h-[92%] w-full max-w-[820px] md:h-[100%]"
      >
        <Image
          src={IMAGES.profileFull}
          alt={t.name}
          fill
          priority
          sizes="(max-width: 820px) 100vw, 820px"
          className="object-cover object-top md:[mask-image:linear-gradient(to_right,transparent,black_18%,black_82%,transparent)]"
        />
      </motion.div>

      <motion.div style={{ y: contentY }} className="absolute inset-0">
        {/* 위치 배지 */}
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          transition={{ duration: 1, ease, delay: 0.4 }}
          className="absolute top-[38%] left-0 hidden items-center gap-6 rounded-r-full bg-ink py-4 pr-4 pl-8 text-white md:flex"
        >
          <p className="text-[15px] leading-snug">
            {t.hero.location[0]}
            <br />
            {t.hero.location[1]}
          </p>
          <span className="flex size-16 items-center justify-center rounded-full bg-white/10">
            <svg viewBox="0 0 24 24" className="size-7 animate-[spin_8s_linear_infinite]" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden>
              <circle cx="12" cy="12" r="9" />
              <ellipse cx="12" cy="12" rx="4" ry="9" />
              <path d="M3 12h18M5 7h14M5 17h14" />
            </svg>
          </span>
        </motion.div>

        {/* 직무 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease, delay: 0.6 }}
          className="absolute top-[48%] right-6 text-white md:top-[36%] md:right-[8%]"
        >
          <svg viewBox="0 0 24 24" className="mb-6 size-5 md:mb-10 md:size-6" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
            <path d="M5 5l14 14M19 8v11H8" />
          </svg>
          <p className="text-2xl leading-tight md:text-[2.6vw]">
            {t.hero.role[0]}
            <br />
            <span className="opacity-70">{t.hero.role[1]}</span>
          </p>
          {/* 모바일에서는 위치 배지 대신 한 줄로 표시 */}
          <p className="mt-4 text-sm opacity-70 md:hidden">
            {t.hero.location.join(" ")}
          </p>
        </motion.div>
      </motion.div>

      {/* 하단 대형 이름 띠 */}
      <div className="absolute bottom-[6%] left-0 w-full overflow-hidden">
        <motion.div style={{ x: marqueeX }} className="flex w-max whitespace-nowrap text-white">
          {[0, 1].map((i) => (
            <span key={i} aria-hidden={i === 1} className="pr-[3vw] text-[22vw] leading-none font-medium tracking-tight md:text-[14vw]">
              {t.hero.marquee}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
