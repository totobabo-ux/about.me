"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { PROFILE, type Content, type Locale } from "@/data/content";
import { cn } from "./cn";
import { LangSwitch } from "./LangSwitch";
import { Magnetic } from "./Magnetic";

const ease = [0.76, 0, 0.24, 1] as const;

/** 스크롤하면 나타나는 원형 메뉴 버튼 + 오른쪽에서 곡선과 함께 들어오는 메뉴 패널 */
export function FloatingMenu({ lang, t, base }: { lang: Locale; t: Content; base: string }) {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => setVisible(y > window.innerHeight * 0.4));

  const links = [
    { href: `/${lang}`, label: t.nav.home },
    { href: `${base}#work`, label: t.nav.work },
    { href: `${base}#about`, label: t.nav.about },
    { href: `${base}#contact`, label: t.nav.contact },
  ];

  return (
    <>
      <motion.div
        className="fixed top-5 right-5 z-[60] md:top-8 md:right-8"
        initial={false}
        animate={{ scale: visible || open ? 1 : 0 }}
        transition={{ duration: 0.35, ease }}
      >
        <Magnetic>
          <button
            type="button"
            aria-label={open ? t.nav.close : t.nav.menu}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className={cn(
              "fill-hover flex size-16 cursor-pointer items-center justify-center rounded-full ring-1 ring-white/15 md:size-20",
              open ? "bg-accent" : "bg-ink",
            )}
          >
            <span className="relative block h-3 w-6">
              <span
                className={cn(
                  "absolute left-0 h-px w-full bg-white transition-all duration-300",
                  open ? "top-1/2 rotate-45" : "top-0",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 h-px w-full bg-white transition-all duration-300",
                  open ? "top-1/2 -rotate-45" : "top-full",
                )}
              />
            </span>
          </button>
        </Magnetic>
      </motion.div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-[49] bg-black/30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              className="fixed top-0 right-0 z-50 flex h-svh w-full flex-col justify-between bg-ink px-10 pt-28 pb-12 text-white sm:w-[480px] md:px-20"
              initial={{ x: "calc(100% + 100px)" }}
              animate={{ x: 0, transition: { duration: 0.8, ease } }}
              exit={{ x: "calc(100% + 100px)", transition: { duration: 0.8, ease } }}
            >
              <svg
                className="absolute top-0 -left-[99px] hidden h-full w-[100px] fill-ink sm:block"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden
              >
                <motion.path
                  initial={{ d: "M100 0 L100 100 Q-100 50 100 0" }}
                  animate={{ d: "M100 0 L100 100 Q100 50 100 0", transition: { duration: 1, ease } }}
                  exit={{ d: "M100 0 L100 100 Q-100 50 100 0", transition: { duration: 0.8, ease } }}
                />
              </svg>
              <div>
                <p className="mb-10 border-b border-white/20 pb-6 text-xs label-track text-white/50 uppercase">
                  {t.nav.menu}
                </p>
                <ul className="flex flex-col gap-3">
                  {links.map((l, i) => (
                    <motion.li
                      key={l.href}
                      initial={{ x: 80 }}
                      animate={{ x: 0, transition: { duration: 0.8, ease, delay: 0.05 * i } }}
                      exit={{ x: 80, transition: { duration: 0.8, ease, delay: 0.05 * i } }}
                    >
                      <a
                        href={l.href}
                        onClick={() => setOpen(false)}
                        className="group flex items-center gap-5 text-5xl font-light md:text-6xl"
                      >
                        <span className="size-2.5 scale-0 rounded-full bg-white transition-transform duration-300 group-hover:scale-100" />
                        {l.label}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </div>
              <div className="flex items-end justify-between text-sm">
                <div>
                  <p className="mb-3 text-xs label-track text-white/50 uppercase">Socials</p>
                  <a href={PROFILE.github} target="_blank" rel="noreferrer" className="dot-link">
                    GitHub
                  </a>
                </div>
                <LangSwitch lang={lang} />
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
