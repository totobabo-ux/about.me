import Link from "next/link";
import type { Content, Locale } from "@/data/content";
import { cn } from "./cn";
import { LangSwitch } from "./LangSwitch";
import { Magnetic } from "./Magnetic";

/**
 * 페이지 상단 헤더 (스크롤하면 FloatingMenu 버튼이 대신 나타남)
 * base: 홈에서는 "" (같은 페이지 앵커), 상세 페이지에서는 "/ko" 처럼 홈 경로
 */
export function Header({
  lang,
  t,
  base,
  tone = "light",
}: {
  lang: Locale;
  t: Content;
  base: string;
  tone?: "light" | "dark";
}) {
  const links = [
    { href: `${base}#work`, label: t.nav.work },
    { href: `${base}#about`, label: t.nav.about },
    { href: `${base}#contact`, label: t.nav.contact },
  ];
  return (
    <header
      className={cn(
        "absolute top-0 left-0 z-30 flex w-full items-center justify-between px-6 py-7 md:px-10",
        tone === "light" ? "text-white" : "text-ink",
      )}
    >
      <Link href={`/${lang}`} className="group flex items-center gap-2 text-[15px] font-medium">
        <span className="inline-block transition-transform duration-700 group-hover:rotate-[360deg]">©</span>
        <span className="relative h-[1.4em] overflow-hidden whitespace-nowrap">
          <span className="block transition-transform duration-500 group-hover:-translate-y-full">
            Code by Hyeonseo
          </span>
          <span className="block transition-transform duration-500 group-hover:-translate-y-full">
            Hyeonseo Jang
          </span>
        </span>
      </Link>
      <nav className="flex items-center gap-2 md:gap-4">
        <ul className="hidden items-center md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Magnetic>
                <a href={l.href} className="dot-link block px-4 py-2 text-[15px]">
                  {l.label}
                </a>
              </Magnetic>
            </li>
          ))}
        </ul>
        <Magnetic>
          <LangSwitch
            lang={lang}
            className={cn(
              "rounded-full border px-4 py-2",
              tone === "light" ? "border-white/40" : "border-ink/25",
            )}
          />
        </Magnetic>
      </nav>
    </header>
  );
}
