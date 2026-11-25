"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

const ease = [0.76, 0, 0.24, 1] as const;

/** 화면에 들어오면 아래에서 떠오르는 블록 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.9, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

/** 단어 단위로 아래에서 밀려 올라오는 텍스트 */
export function WordReveal({ text, className }: { text: string; className?: string }) {
  const words = text.split(" ");
  return (
    <motion.p
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px" }}
    >
      {words.map((word, i) => (
        <span key={i} className="relative mr-[0.25em] inline-flex overflow-hidden">
          <motion.span
            variants={{
              hidden: { y: "100%" },
              show: { y: "0%", transition: { duration: 0.6, ease, delay: 0.015 * i } },
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.p>
  );
}
