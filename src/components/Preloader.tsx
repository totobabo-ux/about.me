"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { PRELOADER_KEY } from "./preloader-key";

const ease = [0.76, 0, 0.24, 1] as const;

/** 첫 방문 시 여러 언어 인사말이 지나간 뒤 곡선을 그리며 위로 사라지는 로딩 화면 */
export function Preloader({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (index === words.length - 1) {
      const id = setTimeout(() => {
        setDone(true);
        try {
          sessionStorage.setItem(PRELOADER_KEY, "1");
        } catch {}
      }, 600);
      return () => clearTimeout(id);
    }
    const id = setTimeout(() => setIndex((i) => i + 1), index === 0 ? 1000 : 150);
    return () => clearTimeout(id);
  }, [index, words.length]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          data-preloader
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink text-white"
          exit={{ y: "-100vh", transition: { duration: 0.8, ease, delay: 0.2 } }}
        >
          <motion.p
            key={index}
            className="flex items-center gap-3 text-4xl md:text-5xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.85, transition: { duration: 0.6, delay: index === 0 ? 0.2 : 0 } }}
          >
            <span className="size-2.5 rounded-full bg-white" />
            {words[index]}
          </motion.p>
          <svg
            className="absolute top-full left-0 h-[20vh] w-full fill-ink"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden
          >
            <motion.path
              initial={{ d: "M0 0 L100 0 Q50 100 0 0" }}
              exit={{ d: "M0 0 L100 0 Q50 0 0 0", transition: { duration: 0.8, ease, delay: 0.3 } }}
            />
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
